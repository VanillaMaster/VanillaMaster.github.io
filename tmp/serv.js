const http = require('http');
const fs = require('fs');

const requestListener = function (req, res) {

  try {
    if (fs.existsSync(`./resources${req.url}`)){
      res.writeHead(200);
      res.end(fs.readFileSync(`./resources${req.url}`));
    } else {
      res.writeHead(404);
      res.end('not found');
    }
  } catch (e) {
    console.log(e);
    res.writeHead(500);
    res.end('error');
  }

}

const server = http.createServer(requestListener);
server.listen(80);
