// code away!

// installed dotenv and created .env file checked to ensure
// .env is added to gitignore
require("dotenv").config();

const server = require("./server.js");

// access the enviroment from node
const port = process.env.PORT;

// dynamic ports
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
