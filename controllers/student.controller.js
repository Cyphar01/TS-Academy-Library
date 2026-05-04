import Student from "../models/student.model.js";

// CREATE
export const createStudent = async (req, res) => {
  try {
    const { email, studentId } = req.body;

    if (await Student.findOne({ email })) {
      return res.status(400).json({ error: "Email already exists" });
    }

    if (await Student.findOne({ studentId })) {
      return res.status(400).json({ error: "Student ID already exists" });
    }

    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE
export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};