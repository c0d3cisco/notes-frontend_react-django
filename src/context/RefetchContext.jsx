import { createContext, useState } from 'react';

export const RefetchContext = createContext();

export const RefetchProvider = ({ children }) => {
  const [refetchSignal, setRefetchSignal] = useState(false);

  // Function to toggle refetchSignal
  const toggleRefetch = () => setRefetchSignal(prev => !prev);

  return (
    <RefetchContext.Provider value={{ refetchSignal, toggleRefetch }}>
      {children}
    </RefetchContext.Provider>
  );
};
