const express = require("express");

//import the db helper files
const Users = require("./userDb.js");
const Posts = require("../posts/postDb.js");

// imports express router
const router = express.Router();

// REQUEST HANDLERS

router.post("/", validateUser, async (req, res) => {
  try {
    if (req.body.name) {
      const user = await Users.insert(req.body);
      res.status(201).json(user);
    } else {
      res.status(400).json({
        message: "Body missing 'name' field"
      });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error adding the user"
    });
  }
});
// tested with Postman

router.post("/:id/posts", async (req, res) => {
  //   const postInfo = { ...req.body, user_id: req.params.id };

  //   try {
  //     const savedPost = await Posts.insert(postInfo);
  //     res.status(201).json(savedPost);
  //   } catch (error) {
  //     // log error to database
  //     console.log(error.message);
  //     res.status(500).json({
  //       message: "Error saving post message"
  //     });
  //   }
  // couldn't get the above to work, not sure why need to look into this more...

  const newPost = req.body;

  Posts.insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: "Error saving post message"
      });
    });
});
// tested with Postman

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
    res.status(200).json(user);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "The user information could not be retrieved."
    });
  }
});
// tested with Postman

router.get("/:id/posts", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Users.getUserPosts(id);

    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  }
});
// tested with Postman

router.delete("/:id", async (req, res) => {
  try {
    const user = await Users.remove(req.params.id);
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
      message: "The user could not be removed."
    });
  }
});
// tested with Postman

router.put("/:id", async (req, res) => {
  try {
    const user = await Users.update(req.params.id, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "The user could not be found." });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error updating the user."
    });
  }
});
// tested with Postman

//custom middleware

// valdiates the user id on every request that expects a user id parameter
// if the id parameter is valid, store that user object as req.user
// if id parameter does not match any user id, cancel the request
// and respond with status 400 and { message: "invalid user id" }
function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.getById(id).then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: "invalid user id" });
    }
  });
  next();
}

//  validates the body on a request to create a new user
// if the request body is missing, cancel the request and respond with
// status 400 and { message: "missing user data" }
// if the request body is missing the required name field, cancel the
// request and respond with status 400 and { message: "missing required name field" }
function validateUser(req, res, next) {
  const body = req.body;
  const name = req.body.name;
  if (!body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

// validatePost validates the body on a request to create a new post
// if the request body is missing, cancel the request and respond
// with status 400 and { message: "missing post data" }
// if the request body is missing the required text field,
//cancel the request and respond with status 400 and { message: "missing required text field" }
function validatePost(req, res, next) {
  const body = req.body;
  const text = req.body.text;
  if (!body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
