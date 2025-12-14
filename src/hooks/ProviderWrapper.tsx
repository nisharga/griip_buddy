"use client";
import store from "@/redux/store";
import React, { FC } from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

const ProviderWrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
      <Toaster position="top-center" richColors />
    </Provider>
  );
};

export default ProviderWrapper;
