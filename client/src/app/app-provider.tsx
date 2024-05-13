import { ReactNode } from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function AppProvider({ children }: { children?: ReactNode }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
}
