import React, { createContext, useState, useContext } from 'react';

const UserLoggedContext = createContext();



export default function UserLoggedProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserLoggedContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserLoggedContext.Provider>
  )
}

export function UseLogged() {
  const context = useContext(UserLoggedContext);
  const { isLoggedIn, setIsLoggedIn } = context;
  return { isLoggedIn, setIsLoggedIn };
} 
