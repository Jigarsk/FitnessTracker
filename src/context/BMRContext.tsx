import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";
const BMRContext = createContext();

export const useBMR = () => useContext(BMRContext);



export const BMRProvider = ({ children }: { children: ReactNode }) => {
  const [weight, setWeight] = useState(() => {
    return localStorage.getItem("bmrWeight") || "";
  });

  const updateWeight = (newWeight: string) => {
    setWeight(newWeight);
    localStorage.setItem("bmrWeight", newWeight);
  };

  return (
    <BMRContext.Provider value={{ weight, updateWeight }}>
      {children}
    </BMRContext.Provider>
  );
};
