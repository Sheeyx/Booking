import express from "express";
import path from "path";
import cors from "cors";
import router from "./router.js"; // must include .js in ESM

// 1-ENTRANCE
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

// 3-VIEWS
app.set("view engine", "ejs");

// 4-ROUTERS
app.use("/", router);


export default app;
