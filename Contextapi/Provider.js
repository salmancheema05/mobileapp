import React, { createContext,useState } from "react";
const Context = createContext();
const Provider = ({ children }) => {
    const [isLogin,setLogin] = useState(false)
    const [openMenu,setOpenMenu] =useState(false)
  return (
    <Context.Provider value={{ isLogin,setLogin,openMenu,setOpenMenu}}>
        {children}
    </Context.Provider>
  );
};
export  {Provider,  Context }