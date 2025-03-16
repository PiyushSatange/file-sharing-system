const express = require("express");
const {
  register,
  login,
  giveAdminAccess,
  deleteUser,
  isTokenValid,
  logout,
} = require("./auth");
const { adminAuth } = require("../middlewares/auth");

const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/checkToken").get(isTokenValid);
authRouter.route("/updateToAdmin").put(giveAdminAccess);
authRouter.route("/delete").delete(deleteUser);
authRouter.route("/test").get((req, res) => {
  res.send("working");
});
authRouter.route("/logout").get(logout);

module.exports = { authRouter };
