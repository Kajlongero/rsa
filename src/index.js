const express = require("express");
const https = require("https");
const path = require("path");
const fs = require("fs");
const app = express();

const ApiRouter = require("./routes");
const generatePair = require("./functions/generate.key.pair");

const privateKeyRoute = path.join(__dirname, "keys", "private", "private.pem");
const publicKeyRoute = path.join(__dirname, "keys", "public", "public.pem");

app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

// const opts = {
//   cert: fs.readFileSync(path.join(__dirname, "certs", "cert.pem")),
//   key: fs.readFileSync(path.join(__dirname, "certs", "key.pem")),
// };

generatePair(
  path.join(__dirname, "keys", "public"),
  path.join(__dirname, "keys", "private")
);

// const httpsServer = https.createServer(opts, app);

// httpsServer.listen(8081, () => {
//   console.log("Server running at port", 8081);
// });

app.use("/public-key", express.static(path.join(__dirname, "keys", "public")));

app.use(express.static(publicKeyRoute));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  } catch (error) {
    next(error);
  }
});

ApiRouter(app);

app.listen(3000, () => {
  console.log("App running at port 3000");
});
