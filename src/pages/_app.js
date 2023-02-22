import "@/styles/globals.css";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import store from "@/redux/store";
import { userService } from "@/services/user.services";
import { ip_data_API } from "@/utils/constants/app_config";
import theme from "@/utils/Theme/theme";

export default function App({ Component, pageProps }) {
  const user = userService.userValue;
  useEffect(() => {
    if (user) {
      userService.updateUserCountry(ip_data_API);
    }
  });
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
