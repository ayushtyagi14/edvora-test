import React, { createContext, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children, value }) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function UserValue() {
  return useContext(UserContext);
}