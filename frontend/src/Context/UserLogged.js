import React, { createContext, useState, useContext } from 'react';

const UserLoggedContext = createContext();



export default function UserLoggedProvider({ children }) {
  const localToken = localStorage.getItem('token') || null;

  const logged = !!localToken;
  const [isLoggedIn, setIsLoggedIn] = useState(logged);
  const [userContacts, setUserContacts] = useState([]);
  const [updateData, setUpdateData] = useState();
  const [actualPage, setActualPage] = useState(1);
  const [allPages, setAllPages] = useState([]);
  return (
    <UserLoggedContext.Provider value={{ isLoggedIn, setIsLoggedIn, userContacts, setUserContacts, updateData, setUpdateData, actualPage, setActualPage, allPages, setAllPages }}>
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
  const { updateData, setUpdateData } = context;
  return { updateData, setUpdateData };
}

export function usePage() {
  const context = useContext(UserLoggedContext);
  const { actualPage, setActualPage } = context;
  return { actualPage, setActualPage };
}

export function useAllPages() {
  const context = useContext(UserLoggedContext);
  const { allPages, setAllPages } = context;
  return { allPages, setAllPages };
}
