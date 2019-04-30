import express from "express";
import { UNPROCESSABLE_ENTITY, CREATED } from "http-status-codes";
import { check, validationResult } from "express-validator/check";

const router = express.Router();

const debug = require("debug")("app:api");

router.get("/", (req, res) => {
  res.sendStatus(200);
});

router.post(
  "/",
  [check("title").isString().not().isEmpty(), check("content").isString()],
  (req, res) => {
    validationResult(req).throw();

    res.sendStatus(CREATED);
  }
);

export default router;
