const fs = require("fs");
const { Router } = require("express");

const DocsController = require("./controller");
const docsInstance = new DocsController();

const router = Router();

const publickey = fs.readFileSync("src/keys/public/publickey.pem");
const privatekey = fs.readFileSync("src/keys/private/privatekey.pem", "utf-8");

router.get("/public-key", async (req, res, next) => {
  try {
    res.send(publickey);
  } catch (error) {
    next(error);
  }
});

router.post("/upload/chunks", async (req, res, next) => {
  try {
    const body = req.body;

    console.log(body[0].length);

    const response = await docsInstance.handleFile(body, privatekey);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
