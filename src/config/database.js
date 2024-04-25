const mongoose = require("mongoose");
const uri =
  process.env.NODE_ENV === "test"
    ? process.env.DB_TEST_URL
    : process.env.DB_URL;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db = mongoose.connection;

db.once("open", () => {
  console.log("Connection Successful");
});

db.on("error", () => {
  console.log("Error in mongodb connection");
});

module.exports = mongoose;
