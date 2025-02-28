const express = require("express")
const {register, login, giveAdminAccess, deleteUser, isTokenValid} = require("./auth");
const { adminAuth } = require("../middlewares/auth");

const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/checkToken").get(isTokenValid);
authRouter.route("/updateToAdmin").put(adminAuth, giveAdminAccess);
authRouter.route("/delete").delete(adminAuth, deleteUser);
authRouter.route("/test").get(adminAuth, (req, res)=>{res.send("working")});

module.exports = {authRouter}