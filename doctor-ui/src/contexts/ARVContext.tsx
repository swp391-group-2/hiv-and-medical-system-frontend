import { createContext, useContext } from "react";

interface LatestTestResult {
  cd4: number | string;
  viralLoad: number | string;
  date: string;
}

interface ARVContextType {
  result: LatestTestResult;
  setResult: React.Dispatch<React.SetStateAction<LatestTestResult>>;
}

export const ARVContext = createContext<ARVContextType | undefined>(undefined);

export const useARVContext = () => {
  const context = useContext(ARVContext);
  if (!context) {
    throw new Error("useARVContext phải được dùng trong ARVContext.Provider");
  }
  return context;
};
