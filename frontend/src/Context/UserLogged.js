import React, { createContext, useState, useContext } from 'react';

const UserLoggedContext = createContext();



export default function UserLoggedProvider({ children }) {
  const localToken = localStorage.getItem('token') || null;

  const logged = !!localToken;
  const [isLoggedIn, setIsLoggedIn] = useState(logged);

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
