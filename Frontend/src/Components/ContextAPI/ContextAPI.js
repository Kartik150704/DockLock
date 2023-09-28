import React, { createContext, useContext, useState } from 'react';


const CommonValueContext = createContext();


export function CommonValueProvider({ children }) {
  const [commonValues, setCommonValues] = useState({});


  const saveCommonValue = (variableName, value) => {
    setCommonValues((prevCommonValues) => ({
      ...prevCommonValues,
      [variableName]: value,
    }));
  };


  const getCommonValue = (variableName) => {
    return commonValues[variableName];
  };

  return (
    <CommonValueContext.Provider value={{ saveCommonValue, getCommonValue }}>
      {children}
    </CommonValueContext.Provider>
  );
}


export function useCommonValue() {
  return useContext(CommonValueContext);
}

