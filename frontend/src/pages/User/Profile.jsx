import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { InfoCard } from "../../components/Cards/InfoCard";
import { IoMdCard } from "react-icons/io";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { RxUpdate } from "react-icons/rx";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { RecentIncome } from "../../components/Dashboard/RecentIncome";
import { ExpenseTransactions } from "../../components/Dashboard/ExpenseTransactions";

const Profile = () => {
  useUserAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong> PLease try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Profile">
      <div className="my-5 mx-auto">
        <div className="grid grid-col-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={dashboardData?.totalBalance || 0}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={dashboardData?.totalIncome || 0}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={dashboardData?.totalExpense || 0}
            color="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions}
            onSeeMore={() => navigate("/income")}
          />

          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />
        </div>

        <div className="card mt-6">
          <div className="flex items-center justify-between">
            <div className="">
              <h5 className="text-lg">Profile Overview</h5>
              <p className="text-xs text-gray-400 mt-0.5">
                Easily view and update your profile details to keep your
                information accurate and up-to-date
              </p>
            </div>

            <button className="add-btn">
              <RxUpdate className="text-lg" />
              Update Profile
            </button>

            
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
