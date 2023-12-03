import express from "express";
import userController from "../controller/user-controller.js";
import {authMiddleware} from "../middleware/auth-middleware.js";

export const userRouter = new express.Router();

userRouter.post('/api/users/register', userController.register);
userRouter.post('/api/users/login', userController.login);
userRouter.post('/api/users/addFeedback', authMiddleware, userController.addFeedback);