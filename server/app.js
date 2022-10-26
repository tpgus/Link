const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false })); //기본적으로 next() 포함
app.use(logger("dev"));

app.use((_, res) => {
  res.status(404).send("<h1>Page Not Found!</h1>");
});

app.listen(3000, () => {
  console.log(`This server is running with port ${PORT}`);
});
