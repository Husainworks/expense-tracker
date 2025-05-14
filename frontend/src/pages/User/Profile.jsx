import React from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const Profile = () => {
  useUserAuth();
  return (
    <DashboardLayout activeMenu="Profile">
      <div className="my-5 mx-auto"></div>
    </DashboardLayout>
  );
};

export default Profile;
