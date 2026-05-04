import Book from "../models/book.model.js";
import Author from "../models/author.model.js";
import Student from "../models/student.model.js";
import Attendant from "../models/attendant.model.js";

// CREATE BOOK
export const createBook = async (req, res) => {
  try {
    const { isbn, authors } = req.body;

    if (await Book.findOne({ isbn })) {
      return res.status(400).json({ error: "Duplicate ISBN" });
    }

    const validAuthors = await Author.find({ _id: { $in: authors } });
    if (validAuthors.length !== authors.length) {
      return res.status(400).json({ error: "Invalid authors" });
    }

    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET BOOKS
export const getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const query = {};

    if (search) {
      const authors = await Author.find({ name: new RegExp(search, "i") });
      const ids = authors.map(a => a._id);

      query.$or = [
        { title: new RegExp(search, "i") },
        { authors: { $in: ids } }
      ];
    }

    const books = await Book.find(query)
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Book.countDocuments(query);

    res.json({ total, page, books });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE
export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy");

    if (!book) return res.status(404).json({ error: "Not found" });

    const overdue =
      book.status === "OUT" &&
      book.returnDate &&
      new Date() > book.returnDate;

    res.json({ ...book.toObject(), overdue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// BORROW
export const borrowBook = async (req, res) => {
  try {
    const { studentId, attendantId, returnDate } = req.body;

    const book = await Book.findById(req.params.id);
    if (!book || book.status === "OUT") {
      return res.status(400).json({ error: "Unavailable" });
    }

    const student = await Student.findById(studentId);
    const attendant = await Attendant.findById(attendantId);

    if (!student || !attendant) {
      return res.status(400).json({ error: "Invalid user" });
    }

    book.status = "OUT";
    book.borrowedBy = studentId;
    book.issuedBy = attendantId;
    book.returnDate = new Date(returnDate);

    await book.save();

    const populated = await book.populate("authors borrowedBy issuedBy");
    res.json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// RETURN
export const returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book || book.status === "IN") {
      return res.status(400).json({ error: "Invalid operation" });
    }

    book.status = "IN";
    book.borrowedBy = null;
    book.issuedBy = null;
    book.returnDate = null;

    await book.save();

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
export const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};