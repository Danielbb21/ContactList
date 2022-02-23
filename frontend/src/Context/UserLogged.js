import React, { createContext, useState, useContext } from 'react';

const UserLoggedContext = createContext();



export default function UserLoggedProvider({ children }) {
  const localToken = localStorage.getItem('token') || null;

  const logged = !!localToken;
  const [isLoggedIn, setIsLoggedIn] = useState(logged);
  const [userContacts, setUserContacts] = useState([]);

  return (
    <UserLoggedContext.Provider value={{ isLoggedIn, setIsLoggedIn, userContacts, setUserContacts }}>
      {children}
    </UserLoggedContext.Provider>
  )
}

export function UseLogged() {
  const context = useContext(UserLoggedContext);
  const { isLoggedIn, setIsLoggedIn } = context;
  return { isLoggedIn, setIsLoggedIn };
}

export function useContacts() {
  const context = useContext(UserLoggedContext);
  const { userContacts, setUserContacts } = context;
  return { userContacts, setUserContacts };
}
