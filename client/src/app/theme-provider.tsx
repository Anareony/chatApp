import { ReactNode } from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import { ThemeProvider as ThemeMuiProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function ThemeProvider({ children }: { children?: ReactNode }) {
  return (
    <ThemeMuiProvider theme={darkTheme}>
      <CssBaseline />
      <Provider store={store}>{children}</Provider>
    </ThemeMuiProvider>
  );
}
