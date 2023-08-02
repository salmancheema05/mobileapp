import React, { createContext,useState } from "react";
const Context = createContext();
const Provider = ({ children }) => {
    const [isLogin,setLogin] = useState(false)
  return (
    <Context.Provider value={{ isLogin,setLogin}}>
        {children}
    </Context.Provider>
  );
};
export  {Provider,  Context }