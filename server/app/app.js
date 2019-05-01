import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import { UNPROCESSABLE_ENTITY } from "http-status-codes";

const debug = require("debug")("app:");

import api from "./api";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api/1.0/markdowns", api);

app.use((err, req, res, next) => {
  if (err.message === "Validation failed") {
    if (!err.isEmpty()) {
      return res.status(UNPROCESSABLE_ENTITY).json({ errors: err.array() });
    }
  }
  next();
});

mongoose
  .connect(process.env.DATABASE_URL || "mongodb://localhost:27017/lab5", {
    useNewUrlParser: true
  })
  .then(
    () => debug("Successfully connected to mongodb"),
    () => debug("Unable connect to mongodb")
  );

app.listen(3000, () => {
  debug("App is listening on port 3000");
});
