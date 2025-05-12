const express = require("express");
const protect = require("../middlewares/authMiddleware");
const {
  addExpense,
  getAllExpense,
  downloadExpenseExcel,
  deleteExpense,
} = require("../controllers/expenseController");

const router = express.Router();

// APIs
router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.get("/download", protect, downloadExpenseExcel);
router.delete("/:id", protect, deleteExpense);

module.exports = router;
