import React, { createContext, useContext } from "react";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

type ToastContextType = {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

type ToastProviderProps = {
  children: React.ReactNode;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const showSuccess = (message: string) => {
    notifications.show({
      title: "Success",
      message: message,
      withBorder: true,
      autoClose: 3000,
      color: "teal",
      icon: <IconCheck />,
    });
  };

  const showError = (message: string) => {
    notifications.show({
      title: "Failed",
      message: message,
      withBorder: true,
      autoClose: 3000,
      color: "red",
      icon: <IconX />,
    });
  };

  return (
    <ToastContext.Provider value={{ showSuccess, showError }}>
      {children}
    </ToastContext.Provider>
  );
};
