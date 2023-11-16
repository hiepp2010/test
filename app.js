const express = require("express");
const axios = require("axios");
const app = express();
const fs = require("fs");
const csv = require("csv-parser");

const port = 4001;

const results = [];

app.listen(port, async () => {
  fs.createReadStream("./combined_data.csv")
    .pipe(csv())
    .on("data", (data) => {
      // Process each row of data
      results.push(data);
    })
    .on("end", async () => {
      // CSV parsing is complete
      // console.log(results);
      results.map(async (value, index) => {
        await setTimeout(async () => {
          await axios
            .post("http://localhost:4000", value)
            .then((response) => {
              //receive response
              console.log("ok", JSON.stringify(value));
            })
            .catch((error) => {
              console.log(error);
            });
        }, 1000 * index);
      });
    });
});
