// SelectedIdContext.js
// import { createContext, useContext, useState,useEffect } from 'react';

// const SelectedIdContext = createContext();

// export const useSelectedId = () => {
//   return useContext(SelectedIdContext);
// };

// export const SelectedIdProvider = ({ children }) => {
//   const [selectedId, setSelectedId] = useState(null);

//   const setContextSelectedId = (Id) => {
//     setSelectedId(Id);
//   };
//   console.log('selectedid---', selectedId);
//  useEffect(() => {
//    localStorage.setItem('id', JSON.stringify(selectedId));
//  }, [selectedId]);
//   return (
//     <SelectedIdContext.Provider value={{ selectedId, setContextSelectedId }}>
//       {children}
//     </SelectedIdContext.Provider>
//   );
// };
// DataContext.js
// import { createContext, useContext, useReducer } from 'react';

// const DataContext = createContext();

// const SelectedIdProvider = ({ children }) => {
//   const [selectedId, setSelectedId] = useReducer(dataReducer, null); // assuming you have a reducer

//   return (
//     <SelectedIdContext.Provider value={{ selectedId, setSelectedId }}>
//       {children}
//     </SelectedIdContext.Provider>
//   );
// };

// export const useData = () => {
//   return useContext(DataContext);
// };
// export default SelectedIdProvider;


// DataContext.js
import React, { createContext, useReducer, useContext } from 'react';

const DataStateContext = createContext();
const DataDispatchContext = createContext();

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export const DataStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, { data: null });
  console.log("state-->",state)
  return (
    <DataStateContext.Provider value={state}>
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataStateContext.Provider>
  );
};

export const useDataState = () => {
  return useContext(DataStateContext);
};

export const useDataDispatch = () => {
  return useContext(DataDispatchContext);
};

