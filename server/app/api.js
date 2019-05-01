import express from "express";
import mongoose from "mongoose";
import { CREATED, OK } from "http-status-codes";
import { check, validationResult } from "express-validator/check";
import MarkdownEntity from "./markdown";

const router = express.Router();

const debug = require("debug")("app:api");

router.get("/", (req, res) => {
  res.sendStatus(200);
});

const isObjectId = value => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error("Id is not ObjectId");
  }
  return true;
};

router.get("/:id", [check("id").custom(isObjectId)], (req, res) => {
  validationResult(req).throw();
  MarkdownEntity.findById(req.params.id, (err, entity) => {
    res.json(entity);
  });
});

router.post(
  "/",
  [
    check("title")
      .isString()
      .not()
      .isEmpty(),
    check("content").isString()
  ],
  (req, res) => {
    validationResult(req).throw();
    const { title, content } = req.body;

    new MarkdownEntity({ title, content }).save((err, entity) => {
      res.status(CREATED).json(entity);
    });
  }
);

router.put(
  "/:id",
  [
    check("title")
      .isString()
      .not()
      .isEmpty(),
    check("content").isString(),
    check("id").custom(isObjectId)
  ],
  (req, res) => {
    validationResult(req).throw();
    const { id } = req.params;
    const { title, content } = req.body;

    MarkdownEntity.findByIdAndUpdate(
      id,
      { title, content },
      { new: true },
      (err, entity) => {
        res.status(OK).json(entity);
      }
    );
  }
);

router.delete("/:id", [check("id").custom(isObjectId)], (req, res) => {
  validationResult(req).throw();
  const { id } = req.params;
  MarkdownEntity.findByIdAndDelete(id, () => {
    res.sendStatus(OK);
  });
});

export default router;
