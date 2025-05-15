import React, { useContext, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { SideMenu } from "../SideMenu";
import { Link } from "react-router";
import { UserContext } from "../../context/UserContext";
import CharAvatar from "../Cards/CharAvatar";
import { getInitials } from "../../utils/helper";

export const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const { user, clearUser } = useContext(UserContext);

  return (
    <>
      <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
        <button
          className="block lg:hidden text-black"
          onClick={() => {
            setOpenSideMenu(!openSideMenu);
          }}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <div className="w-full flex items-center justify-between">
          <h2 className="text-lg font-medium text-black">
            <Link to="/dashboard">Expense Tracker</Link>
          </h2>

          <Link to={`/profile/${user?._id}`}>
            {user?.profileImgURL ? (
              <img
                src={user?.profileImgURL || ""}
                alt="Profile Image"
                className="w-15 h-15 bg-slate-400 rounded-full"
              />
            ) : (
              <>
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}
                >
                  {getInitials(user?.fullName || "")}
                </div>
              </>
            )}
          </Link>
        </div>

        {openSideMenu && (
          <div className="fixed top-[61px] -ml-4 bg-white">
            <SideMenu activeMenu={activeMenu} />
          </div>
        )}
      </div>
    </>
  );
};
