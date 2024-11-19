const fs = require("fs");
const { Router } = require("express");

const router = Router();

const publickey = fs.readFileSync("src/keys/public/publickey.pem");

router.get("/public-key", async (req, res, next) => {
  try {
    res.send(publickey);
  } catch (error) {
    next(error);
  }
});

router.get("/upload", async (req, res, next) => {
  try {
    res.send("Okay, running with https");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
