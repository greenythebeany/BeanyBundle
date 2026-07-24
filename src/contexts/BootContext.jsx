import { createContext, useContext, useState } from 'react';

const BootContext = createContext(null);

export function BootProvider({ children }) {
  const [booting, setBooting] = useState(true);
  return (
    <BootContext.Provider value={{ booting, setBooting }}>
      {children}
    </BootContext.Provider>
  );
}

export function useBoot() {
  return useContext(BootContext);
}
