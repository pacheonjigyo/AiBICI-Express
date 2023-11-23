import AOS from "aos";
import * as React from "react";
import ScrollToTop from "../common/ScrollToTop.js";

import { Box, Container, useMediaQuery } from "@mui/material";
import { useObserver } from "mobx-react";
import { Outlet, useNavigate } from "react-router-dom";
import Entrance from "../common/Entrance.js";
import { initEnvironment } from "../common/Environment.js";
import { AppContext } from "../stores/index.js";
import { CommercerMenu } from "./menu/CommercerMenu.js";
import LoadingModal from "./modal/LoadingModal.js";

export function CommercerLayout(): JSX.Element {
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

      <Box
        sx={{
          display: "flex",
        }}
      >
        <CommercerMenu />

        <Box
          sx={{
            width: commonStore.isDesktop
              ? commonStore.drawerBaseState
                ? commonStore.baseInfo.width - 80
                : commonStore.baseInfo.width
              : commonStore.baseInfo.width,
            height: commonStore.baseInfo.height,
            overflowY: "auto",
          }}
        >
          <Container
            maxWidth={
              window.location.pathname === "/commercer/feed" ? "lg" : "lg"
            }
          >
            <React.Suspense>
              <Outlet />
            </React.Suspense>
          </Container>
        </Box>
      </Box>

      <Entrance mode={"login"} />

      <LoadingModal />
    </React.Fragment>
  ));
}
