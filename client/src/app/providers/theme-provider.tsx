import { ReactNode } from "react";
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
      {children}
    </ThemeMuiProvider>
  );
}
