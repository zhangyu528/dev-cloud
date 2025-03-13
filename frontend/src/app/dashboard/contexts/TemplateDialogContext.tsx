import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import SelectTemplateDialog from './SelectTemplateDialog';
import { TemplatesProvider } from "@/contexts/TemplateContext";

// Define types for context
interface TemplateDialogContextType {
  isTemplateDialogOpen: boolean;
  openTemplateDialog: () => void;
  closeTemplateDialog: () => void;
}

// 创建 Context
const TemplateDialogContext = createContext<TemplateDialogContextType | undefined>(undefined);

// 创建 Provider 组件
export const TemplateDialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);

  const openTemplateDialog = useCallback(() => setIsTemplateDialogOpen(true), []);
  const closeTemplateDialog = useCallback(() => setIsTemplateDialogOpen(false), []);

  return (
    <TemplateDialogContext.Provider value={{ isTemplateDialogOpen, openTemplateDialog, closeTemplateDialog }}>
      {/* 子组件 */}
      {children}

      {/* 对话框 */}
      <TemplatesProvider>
      <SelectTemplateDialog
        isOpen={isTemplateDialogOpen}
        onClose={closeTemplateDialog}
        onSelectTemplate={templateId => {
          // Structured logging
          console.info('Selected template:', templateId);
          closeTemplateDialog();
        }}
      />
    </TemplatesProvider>
    </TemplateDialogContext.Provider>
  );
};

// 创建自定义 Hook
export const useTemplateDialog = () => {
  const context = useContext(TemplateDialogContext);
  if (!context) {
    throw new Error('useTemplateDialog must be used within a TemplateDialogProvider');
  }
  return context;
};