import React, { createContext, useState } from "react";
const Context = createContext();
const Provider = ({ children }) => {
  const [isLogin, setLogin] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [allFriends, setAllFriends] = useState([]);
  return (
    <Context.Provider
      value={{
        isLogin,
        setLogin,
        openMenu,
        setOpenMenu,
        allFriends,
        setAllFriends,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export { Provider, Context };
