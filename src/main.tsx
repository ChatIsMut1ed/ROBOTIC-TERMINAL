import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme.ts";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./global/lib/auth/context.tsx";
import { TerminalContextProvider } from "react-terminal";
import { ToastProvider } from "./global/lib/toast/ToastContext.tsx";
import { Notifications } from "@mantine/notifications";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Notifications position="top-right" />
        <BrowserRouter>
          <AuthProvider>
            <ToastProvider>
              <TerminalContextProvider>
                <App />
              </TerminalContextProvider>
            </ToastProvider>
          </AuthProvider>
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
