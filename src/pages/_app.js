import "@/styles/globals.css";

import { Container, NoSsr } from "@mui/material";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import Navbar from "@/components/Navbar";
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
        <NoSsr>
          <Navbar />
          <div style={{ height: "64px" }}></div>
          <Container>
            <Component {...pageProps} />
          </Container>
        </NoSsr>
      </ThemeProvider>
    </Provider>
  );
}
