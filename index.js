const http = require("http");
const fs = require("fs");
const path = require("path");

const hostname = "localhost";
const port = 3333;

const server = http.createServer((req, res) => {
  console.log(`Request for ${req.url} by method ${req.method}`);

  if (req.method === "GET") {
    const fileUrl = req.url === "/" ? "/index.html" : req.url;
    const filePath = path.resolve(`./public${fileUrl}`);
    const fileExt = path.extname(filePath);
    if (fileExt === ".html") {
      fs.access(filePath, (exists) => {
        if (exists === false) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.end(`<h1>404 Page Not Found</h1><p>${fileUrl}</p>`);
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          fs.createReadStream(filePath).pipe(res);
        }
      });
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(`<h1>404 Not An HTML FIle</h1><p>${fileUrl}</p>`);
    }
  } else {
    res.statusCode = 405;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(`<h1>405 Method Not Supported</h1>`);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server listening on port http://${hostname}:${port}`);
});
