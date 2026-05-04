import express from "express";
import {
  createStudent,
  getStudents,
  getStudent
} from "../controllers/student.controller.js";

import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post("/", createStudent);
router.get("/", getStudents);
router.get("/:id", validate, getStudent);


export default router;