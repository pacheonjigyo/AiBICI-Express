import AOS from "aos";
import * as React from "react";
import ScrollToTop from "../common/ScrollToTop.js";

import { GlobalStyles, useMediaQuery, useTheme } from "@mui/material";
import { useObserver } from "mobx-react";
import { Outlet } from "react-router-dom";
import Entrance from "../common/Entrance.js";
import { initEnvironment } from "../common/Environment.js";
import { AppContext } from "../stores/index.js";
import LoadingModal from "./modal/LoadingModal.js";

export function SimpleLayout(): JSX.Element {
  const theme = useTheme();

  const { commonStore } = React.useContext(AppContext);

  const isDesktop = useMediaQuery("(min-width:1280px)");
  const isTablet = useMediaQuery("(min-width:768px)");

  commonStore.setDesktop(isDesktop);
  commonStore.setDevice(isDesktop ? "desktop" : isTablet ? "tablet" : "mobile");

  React.useEffect(() => {
    AOS.init({ once: true });

    initEnvironment(commonStore);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <React.Fragment>
      <ScrollToTop />

      <GlobalStyles
        styles={{
          "#root": {
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          },
        }}
      />

      <React.Suspense>
        <Outlet />
      </React.Suspense>

      {/* <MainPopOver /> */}

      <Entrance mode={"login"} />

      <LoadingModal />
    </React.Fragment>
  ));
}
