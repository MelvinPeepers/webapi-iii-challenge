const express = require("express");

// const postRouter = require("./posts/postRouter.js");
// const userRouter = require("./users/userRouter.js");

const server = express();

// middleware - converts the data to JSON
server.use(express.json());

// server.use("/api/posts", postRouter);
// server.use("/api/users", userRouter);

server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const currentTime = new Date().toISOString();
  console.log(
    `Request: ${req.method}, Request URL: ${
      req.url
    }, Timestamp: ${currentTime} `
  );
  next();
}
// tested in postman
module.exports = server;
