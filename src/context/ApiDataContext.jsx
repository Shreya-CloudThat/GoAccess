import React, { createContext, useContext, useState } from 'react';

const ApiDataContext = createContext();

export function ApiDataProvider({ children }) {
  const [apiData, setApiData] = useState([]);

  return (
    <ApiDataContext.Provider value={{ apiData, setApiData }}>
      {children}
    </ApiDataContext.Provider>
  );
}

export function useApiData() {
  return useContext(ApiDataContext);
}
