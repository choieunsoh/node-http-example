const http = require("http");
const hostname = "localhost";
const port = 3333;

const server = http.createServer((req, res) => {
  console.log(req.headers);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end("<h1>Hello, World</h1>");
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
