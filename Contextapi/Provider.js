import React, { createContext, useState } from "react";
const Context = createContext();
const Provider = ({ children }) => {
  const [isLogin, setLogin] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [allFriends, setAllFriends] = useState([]);
  const [loginbuttonClicked, setLoginButtonClicked] = useState(false);
  const [Messages, setMessages] = useState([]);
  const [allRequest, setAllRequest] = useState(null);
  const [requestsCount, setRequestsCount] = useState(0);
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
        Messages,
        setMessages,
        allRequest,
        setAllRequest,
        requestsCount,
        setRequestsCount,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export { Provider, Context };
