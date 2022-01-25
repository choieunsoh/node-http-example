const express = require("express");
const http = require("http");
const morgan = require("morgan");

const hostname = "localhost";
const port = 3000;

const app = express();

app.use((req, res, next) => {
  // Middleware
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end("Hello from Express");
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log(`Express server listening on http://${hostname}:${port}`);
});
