import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const useUserAuth = () => {
  const { user, clearUser, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

        if (response.data && isMounted) {
          updateUser(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch user info:", err);
        if (!isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [updateUser, clearUser, navigate]);
};
