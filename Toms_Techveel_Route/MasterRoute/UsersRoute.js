const express = require("express");
const UsersController = require("../../Toms_Techveel_Controller/MasterController/UsersController");

const router = express.Router();
const jwt = require("jsonwebtoken");
function verifytoken(req, res, next) {
  const beareHeader = req.headers["authorization"];
  if (typeof beareHeader != "undefined") {
    const bearer = beareHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(bearerToken, "secretkey", (err, user) => {
      if (err) {
        res.json({ error: "unauthorzhied user" });
      } else {
        next();
      }
    });
  } else {
    res.json({
      error: "Unauthorized user",
    });
  }
}

router.get("/GetAllUsers", UsersController.GetAllUsers);
router.get("/GetOneUsers/:id", verifytoken, UsersController.GetOneUsers);
router.post("/InsertUsers", verifytoken, UsersController.InsertUsers);
router.put("/UpdateUsers/:id", verifytoken, UsersController.UpdateUsers);
router.delete("/DeleteUsers/:id", verifytoken, UsersController.DeleteUsers);

module.exports = {
  Toms_Techveel_Route: router,
};
