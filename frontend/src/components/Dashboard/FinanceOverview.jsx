import React from "react";
import { COLORS } from "../../utils/data";
import { CustomPieChart } from "../Charts/CustomPieChart";

export const FinanceOverview = ({
  totalBalance,
  totalIncome,
  totalExpense,
}) => {
  const balanceData = [
    {
      name: "Total Balance",
      amount: totalBalance,
    },
    {
      name: "Total Income",
      amount: totalIncome,
    },
    {
      name: "Total Expense",
      amount: totalExpense,
    },
  ];
  return (
    <>
      <div className="card">
        <div className="flex items-center justify-center">
          <h5 className="text-lg">Financial Overview</h5>
        </div>

        <CustomPieChart
          data={balanceData}
          label="Total Balance"
          totalAmount={`$${totalBalance}`}
          colors={COLORS}
          showTextAnchor
        />
      </div>
    </>
  );
};
