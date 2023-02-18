import "@/styles/globals.css";

import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import store from "@/redux/store";
import theme from "@/utils/Theme/theme";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
