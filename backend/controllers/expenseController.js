const xlsx = require("xlsx");
const Expense = require("../models/expenseModel");

// Add an Expense Source
const addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;

    if (!category || !amount) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: date ? new Date(date) : new Date(),
    });

    await newExpense.save();
    res.status(200).json({
      newExpense,
      message: "Expense added successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

// Get All Expense Sources
const getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expense);
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

// Delete an Expense Source
const deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({
        message: "Expense does not exist with this ID",
      });
    }

    res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

// Download All Expense Source as an Excel File
const downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, "Expense_details.xlsx");
    res.download("Expense_details.xlsx");
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

module.exports = {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
};
