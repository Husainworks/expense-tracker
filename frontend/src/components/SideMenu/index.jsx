import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router";
import { getSideMenuData } from "../../utils/data"; // replace SIDE_MENU_DATA
import CharAvatar from "../Cards/CharAvatar";

export const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }

    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <>
      <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20 ">
        <div className="flex flex-col justify-center items-center gap-3 my-3">
          {user?.profileImgURL ? (
            <img
              src={user?.profileImgURL || ""}
              alt="Profile Image"
              className="w-20 h-20 bg-slate-400 rounded-full"
            />
          ) : (
            <CharAvatar
              fullName={user?.fullName}
              width="w-20"
              height="h-20"
              style="text-xl"
            />
          )}

          <h5 className="text-gray-950 font-medium leading-6">
            {user?.fullName || ""}
          </h5>
        </div>

        {getSideMenuData(user?._id).map((data, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] ${
              activeMenu == data.label ? "text-white bg-primary" : ""
            } py-3 px-6 rounded-lg mb-3 cursor-pointer`}
            onClick={() => handleClick(data.path)}
          >
            <data.icon className="text-xl" />
            {data.label}
          </button>
        ))}
      </div>
    </>
  );
};
