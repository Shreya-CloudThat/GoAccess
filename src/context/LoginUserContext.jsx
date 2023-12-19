import React, { createContext, useContext, useEffect, useState } from 'react';

const UserDetailsContext = createContext();

export function UserDetailsProvider({ children }) {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Call your API function here and set userDetails
    let username = JSON.parse(localStorage.getItem('user'))?.username || null;
    callApiForUserDetails(username)
      .then((userData) => {
        setUserDetails(userData);
        localStorage.setItem('access', userData);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, []); // You might want to trigger this effect when specific dependencies change

  return (
    <UserDetailsContext.Provider value={userDetails}>
      {children}
    </UserDetailsContext.Provider>
  );
}

export function useUserDetails() {
  return useContext(UserDetailsContext);
}
