const express = require("express");

//import the db helper files
const Users = require("./userDb.js");
const Posts = require("../posts/postDb.js");

// imports express router
const router = express.Router();

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", async (req, res) => {
  try {
    const users = await Users.get(req.query);
    // console.log("query", req.query);
    res.status(200).json(users);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "The user information could not be retrieved."
    });
  }
});
// tested with Postman

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.getById(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "The user information could not be retrieved."
    });
  }
});
// tested with Postman

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

// valdiates the user id on every request that expects a user id parameter
// if the id parameter is valid, store that user object as req.user
// if id parameter does not match any user id, cancel the request
// and respond with status 400 and { message: "invalid user id" }
function validateUserId(req, res, next) {}

//  validates the body on a request to create a new user
// if the request body is missing, cancel the request and respond with
// status 400 and { message: "missing user data" }
// if the request body is missing the required name field, cancel the
// request and respond with status 400 and { message: "missing required name field" }
function validateUser(req, res, next) {}

// validatePost validates the body on a request to create a new post
// if the request body is missing, cancel the request and respond
// with status 400 and { message: "missing post data" }
// if the request body is missing the required text field,
//cancel the request and respond with status 400 and { message: "missing required text field" }
function validatePost(req, res, next) {}

module.exports = router;
