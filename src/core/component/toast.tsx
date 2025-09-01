import React, { createContext, useContext, useCallback } from "react";
import Toast from "react-native-toast-message";

type NotifyType = "success" | "error" | "info";

type NotifyFn = (type: NotifyType, message: string, title?: string) => void;

const NotifyContext = createContext<NotifyFn>(() => {});

export const NotifyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const notify: NotifyFn = useCallback((type, message, title = "") => {
    Toast.show({
      type,
      text1: title || (type === "success" ? "Success" : type === "error" ? "Error" : "Info"),
      text2: message,
    });
  }, []);

  return (
    <NotifyContext.Provider value={notify}>
      {children}
      <Toast />
    </NotifyContext.Provider>
  );
};

export const useNotify = () => useContext(NotifyContext);
