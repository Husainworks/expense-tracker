const xlsx = require("xlsx");
const Income = require("../models/incomeModel");

// Add an Income Source
const addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: date ? new Date(date) : new Date(),
    });

    await newIncome.save();
    res.status(200).json({
      newIncome,
      message: "Income added successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

// Get All Income Sources
const getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.json(income);
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

// Delete an Income Source
const deleteIncome = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedIncome = await Income.findByIdAndDelete(id);

    if (!deletedIncome) {
      return res.status(404).json({
        message: "Income does not exist with this ID",
      });
    }

    res.status(200).json({
      message: "Income deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

// Download All Income Source as an Excel File
const downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "Income_details.xlsx");
    res.download("Income_details.xlsx");
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

module.exports = { addIncome, getAllIncome, deleteIncome, downloadIncomeExcel };
