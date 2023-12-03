import "dotenv/config";
import express from "express";
import {errorMiddleware} from "../middleware/error-middleware.js";
import {userRouter} from "../route/user-router.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
	res.send("Home");
})

app.use(userRouter)

app.all("/*", (req, res, next) => {
	res.status(404).json({status: "error", message: "Request Not Found!"});
});

app.use(errorMiddleware);