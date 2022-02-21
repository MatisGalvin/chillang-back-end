const result = require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

console.log("process.env", process.env);

if (result.error) {
  throw result.error;
}
