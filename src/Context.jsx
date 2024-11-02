import React, { useContext, useReducer } from "react";
import reducer, { initState } from "./reducers";

const AppContext = React.createContext({});

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
