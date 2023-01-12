import { createContext, useEffect } from "react";
import React, { useState } from "react";

export const UserContext = createContext();

const UserStore = ({ children }) => {
  const [startDate, setStartDate] = useState("2022.08");
  const [productData, setProductData] = useState({});

  return (
    <UserContext.Provider
      value={{
        startDate,
        setStartDate,
        productData,
        setProductData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserStore;
