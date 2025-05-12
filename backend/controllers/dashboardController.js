const Income = require("../models/incomeModel");
const Expense = require("../models/expenseModel");
const { Types, isValidObjectId } = require("mongoose");

// Get Dashboard Data
const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    console.log("Total Income", {
      totalIncome,
      userId: isValidObjectId(userId),
    });

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Get Income transaction of the last 60 days
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // Get total Income of last 60days
    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, transactions) => sum + transactions.amount,
      0
    );

    // Get Expense Transactions of last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // Get total Expenses of last 30days
    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, transactions) => sum + transactions.amount,
      0
    );

    // Fetch last 5 transactions (income + expense)
    const lastTransaction = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({ ...txn.toObject(), type: "income" })
      ),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({ ...txn.toObject(), type: "Expense" })
      ),
    ].sort((a, b) => b.date - a.date); //sort latest first

    // Final Response
    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransaction,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

module.exports = {
  getDashboardData,
};
