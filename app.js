const express = require("express");
const http = require("http");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

const hostname = "localhost";
const port = 3000;

const accessLog = fs.createWriteStream(
  path.join(__dirname, "log", "access.log"),
  { flags: "a" }
);

const app = express();
app.use(morgan("combined", { stream: accessLog }));

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
