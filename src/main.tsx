import { CssBaseline, createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import AuthContextProvider from "./context/AuthContext.tsx";
import { UserContextProvider } from "./context/UserContext.tsx";
import "./index.css";

const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    allVariants: {
      fontFamily: "Itim",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthContextProvider>
          <UserContextProvider>
            <CssBaseline />
            <App />
          </UserContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
