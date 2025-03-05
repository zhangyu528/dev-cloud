// src/components/ide/context/WorkspaceContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';

interface IdeContextType {
  workspaceName: string;
}

const IdeContext = createContext<IdeContextType | undefined>(undefined);

export const IdeProvider: React.FC<{ 
  children: ReactNode, 
  workspaceName: string 
}> = ({ children, workspaceName }) => {
  return (
    <IdeContext.Provider value={{ workspaceName }}>
      {children}
    </IdeContext.Provider>
  );
};

export const useIdeContext = () => {
  const context = useContext(IdeContext);
  if (context === undefined) {
    throw new Error('useIdeContext must be used within a IdeProvider');
  }
  return context;
};