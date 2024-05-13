import type { AppProps } from "next/app";
import { ThemeProvider } from "./theme-provider";

export function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
