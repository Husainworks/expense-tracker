import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { InfoCard } from "../../components/Cards/InfoCard";
import { IoMdCard } from "react-icons/io";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { RecentIncome } from "../../components/Dashboard/RecentIncome";
import { ExpenseTransactions } from "../../components/Dashboard/ExpenseTransactions";

const Profile = () => {
  useUserAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicURL, setProfilePicURL] = useState("");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const fetchUserData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.AUTH.GET_USER_INFO}`
      );

      const { email, fullName, profileImgURL } = response.data.user;
      setFullName(fullName);
      setEmail(email);
      setProfilePicURL(profileImgURL);
    } catch (error) {
      console.log("Something went wrong> PLease try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchUserData();
    return () => {};
  }, [profilePicURL]);

  return (
    <DashboardLayout activeMenu="Profile">
      <div className="my-5 mx-auto">
        <div className="card mt-6">
          <div className="flex items-center justify-between">
            <div className="">
              <h5 className="text-lg">Profile Overview</h5>
              <p className="text-xs text-gray-400 mt-0.5">
                Easily view your profile details to keep your information
                accurate and up-to-date
              </p>
            </div>

            <button
              className="delete-btn"
              onClick={() => setShowDeleteModal(true)}
            >
              <MdOutlineDelete className="text-lg" />
              Delete Profile
            </button>
          </div>

          <div className="mt-10">
            <p className="text-gray-400">
              Full Name: <span className="text-black ml-2.5">{fullName}</span>
            </p>
            <p className="text-gray-400">
              Email: <span className="text-black ml-2.5">{email}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-col-1 md:grid-cols-3 gap-6 mt-6">
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
      </div>
    </DashboardLayout>
  );
};

export default Profile;
