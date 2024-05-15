import type { AppProps } from "next/app";
import { ThemeProvider } from "./providers/theme-provider";
import { ReduxProvider } from "./providers/redux-provider";
import { SocketProvider } from "./providers/socket-provider";

export function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <SocketProvider>
          <Component {...pageProps} />
        </SocketProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}
