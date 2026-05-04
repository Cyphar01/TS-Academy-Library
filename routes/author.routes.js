import express from "express";
import {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor
} from "../controllers/author.controller.js";

import { validate } from "../middleware/validate.js";

const router = express.Router();

// CRUD
router.post("/", createAuthor);
router.get("/", getAuthors);
router.get("/:id", validate, getAuthor);
router.put("/:id", validate, updateAuthor);
router.delete("/:id", validate, deleteAuthor);

export default router;