const express = require("express");
const {
  addIncome,
  getAllIncome,
  downloadIncomeExcel,
  deleteIncome,
} = require("../controllers/incomeController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

// APIs
router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/download", protect, downloadIncomeExcel);
router.delete("/:id", protect, deleteIncome);

module.exports = router;
