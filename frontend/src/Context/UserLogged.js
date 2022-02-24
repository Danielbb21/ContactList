import React, { createContext, useState, useContext } from 'react';

const UserLoggedContext = createContext();



export default function UserLoggedProvider({ children }) {
  const localToken = localStorage.getItem('token') || null;

  const logged = !!localToken;
  const [isLoggedIn, setIsLoggedIn] = useState(logged);
  const [userContacts, setUserContacts] = useState([]);
  const [updateData, setUpdateData] = useState();

  return (
    <UserLoggedContext.Provider value={{ isLoggedIn, setIsLoggedIn, userContacts, setUserContacts, updateData, setUpdateData }}>
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

export function useUpdateData() {
  const context = useContext(UserLoggedContext);
  const { updateData,  setUpdateData} = context;
  return { updateData, setUpdateData };
}
