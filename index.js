const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const pdfcreater = require("html-pdf");
const fs = require("fs");
const config = require("./Config");

//  masters
const UsersRoute = require("./Toms_Techveel_Route/MasterRoute/UsersRoute");

const app = express();
app.use(cors());
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(express.static("Public"));

//  masters
app.use("/api", UsersRoute.Toms_Techveel_Route);


app.listen(config.port, () => {
  console.log("app listening on url http://localhost:" + config.port);
});
