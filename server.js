import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import bookRoutes from "./routes/book.routes.js";
import authorRoutes from "./routes/author.routes.js";
import studentRoutes from "./routes/student.routes.js";
import attendantRoutes from "./routes/attendant.routes.js";

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Health check route (important for testing)
app.get("/", (req, res) => {
  res.send("Library API is running...");
});

// ✅ Routes
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendants", attendantRoutes);

// ❌ 404 Handler (very important)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ❌ Global Error Handler (very important)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || "Server error" });
});

// ✅ Start Server AFTER DB connects
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  });

 import swaggerSpec from "./config/swagger.js";
import swaggerUi from "swagger-ui-express";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));