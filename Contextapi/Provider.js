import React, { createContext, useState } from "react";
const Context = createContext();
const Provider = ({ children }) => {
  const [isLogin, setLogin] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [allFriends, setAllFriends] = useState([]);
  const [loginbuttonClicked, setLoginButtonClicked] = useState(false);
  return (
    <Context.Provider
      value={{
        isLogin,
        setLogin,
        openMenu,
        setOpenMenu,
        allFriends,
        setAllFriends,
        loginbuttonClicked,
        setLoginButtonClicked,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export { Provider, Context };
