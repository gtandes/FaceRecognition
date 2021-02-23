const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "d2b2e05020ec412193332ea0d8dca8b1",
});

const handleAPICall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json("Unable to work with API");
    });
};

const handleImage = (req, res, db) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("Unable to get entry count."));
};

module.exports = { handleImage, handleAPICall };
