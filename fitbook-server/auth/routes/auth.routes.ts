import express from "express"
import authController from "../controller/auth.controller";

const authRouter = express.Router();

authRouter.route("/login").post(authController.login);
authRouter.route("/logout").post(authController.logout);
authRouter.route("/create").post(authController.registerUser);
authRouter.route("/session").get(authController.getSession)

export default authRouter