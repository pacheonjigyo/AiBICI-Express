import AOS from "aos";
import * as React from "react";
import ScrollToTop from "../common/ScrollToTop.js";

import { Box, useMediaQuery } from "@mui/material";
import { useObserver } from "mobx-react";
import { Outlet, useNavigate } from "react-router-dom";
import Entrance from "../common/Entrance.js";
import { initEnvironment } from "../common/Environment.js";
import { AppContext } from "../stores/index.js";
import { GPTDrawer } from "./drawer/GPTDrawer.js";
import Footer from "./footer/Footer.js";
import LoadingModal from "./modal/LoadingModal.js";
import { BaseToolbar } from "./toolbar/BaseToolbar.js";

export function NormalLayout(): JSX.Element {
  const navigate = useNavigate();

  const { commonStore } = React.useContext(AppContext);

  const isDesktop = useMediaQuery("(min-width:1280px)");
  const isTablet = useMediaQuery("(min-width:768px)");

  commonStore.setDesktop(isDesktop);
  commonStore.setDevice(isDesktop ? "desktop" : isTablet ? "tablet" : "mobile");

  React.useEffect(() => {
    AOS.init({ once: true });

    initEnvironment(commonStore);

    commonStore.checkProfile(false).then((res) => {
      {
        if (!res) {
          navigate("/login/user");
        }
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <React.Fragment>
      <ScrollToTop />

      <BaseToolbar />

      <Box
        sx={{
          display: "flex",
          flexDirection: commonStore.isDesktop ? "unset" : "column",
        }}
      >
        <Box
          sx={{
            width: commonStore.baseInfo.width,
            height: commonStore.baseInfo.height - 110,
            // overflowY: "auto",
          }}
        >
          <React.Suspense>
            <Outlet />
          </React.Suspense>

          <Footer />
        </Box>
      </Box>

      <GPTDrawer />

      <Entrance mode={"login"} />

      <LoadingModal />
    </React.Fragment>
  ));
}
