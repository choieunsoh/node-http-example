const express = require("express");
const http = require("http");
const morgan = require("morgan");
const path = require("path");
const rfs = require("rotating-file-stream");

const hostname = "localhost";
const port = 3000;

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: path.join(__dirname, "log"),
});

const app = express();
app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end("Hello from Express");
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log(`Express server listening on http://${hostname}:${port}`);
});
