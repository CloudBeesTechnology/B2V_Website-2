import { createContext, useContext, ReactNode, useState } from 'react';
import { RequestInternData } from '../internship/internshipTable'; // Import RequestInternData from types.ts

interface InternContextType {
  editIntern: RequestInternData | null;
  setEditIntern: (intern: RequestInternData | null) => void; // Allow null here
}

const InternContext = createContext<InternContextType | undefined>(undefined);

export const InternProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [editIntern, setEditIntern] = useState<RequestInternData | null>(null);

  return (
    <InternContext.Provider value={{ editIntern, setEditIntern }}>
      {children}
    </InternContext.Provider>
  );
};

export const useIntern = () => {
  const context = useContext(InternContext);
  if (!context) {
    throw new Error("useIntern must be used within InternProvider");
  }
  return context;
};
