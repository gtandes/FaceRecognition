const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res
      .status(400)
      .json("Incorrect form submission. Please check your info again.");
  }

  const hash = bcrypt.hashSync(password);

  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => {
    res
      .status(400)
      .json(
        "System detects that this account or user already exists. Unable to register."
      );
  });
};

module.exports = { handleRegister: handleRegister };
