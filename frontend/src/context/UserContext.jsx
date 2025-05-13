// import React, { createContext, useState } from "react";

// export const UserContext = createContext();

// const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   Function to update user data
//   const updateUser = (userData) => {
//     setUser(userData);
//   };

//   Function to clear user data e.g. when on logout
//   const clearUser = () => {
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider value={{ user, updateUser, clearUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserProvider;

import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data from localStorage when the app mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // If user data exists in localStorage, parse it
    }
  }, []);

  // Function to update user data
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Save user data to localStorage
  };

  // Function to clear user data e.g. when on logout
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user data from localStorage
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
