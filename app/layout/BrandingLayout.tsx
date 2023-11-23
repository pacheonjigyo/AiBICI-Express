import AOS from "aos";
import * as React from "react";
import ScrollToTop from "../common/ScrollToTop.js";

import { useMediaQuery } from "@mui/material";
import { useObserver } from "mobx-react";
import { Outlet } from "react-router-dom";
import Entrance from "../common/Entrance.js";
import { initEnvironment } from "../common/Environment.js";
import { AppContext } from "../stores/index.js";
import { GPTDrawer } from "./drawer/GPTDrawer.js";
import ConfirmModal from "./modal/ConfirmModal.js";
import LoadingModal from "./modal/LoadingModal.js";
import { MainPopOver } from "./popover/MainPopOver.js";

export function BrandingLayout(): JSX.Element {
  const { commonStore } = React.useContext(AppContext);

  const isDesktop = useMediaQuery("(min-width:1280px)");
  const isTablet = useMediaQuery("(min-width:768px)");

  commonStore.setDesktop(isDesktop);
  commonStore.setDevice(isDesktop ? "desktop" : isTablet ? "tablet" : "mobile");

  React.useEffect(() => {
    AOS.init({ once: true });

    initEnvironment(commonStore);

    // commonStore.syncAppInfo(commonStore.appInfo.isAdmin, true, "");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <React.Fragment>
      <ScrollToTop />

      {/* <BrandingToolbar /> */}

      {/*
      <Drawer
        anchor={commonStore.isDesktop ? "left" : "top"}
        open={commonStore.drawerBaseState}
        onClose={() => {
          commonStore.setDrawerBaseState(false);
        }}
      >
      </Drawer> */}

      <React.Suspense>
        <Outlet />
      </React.Suspense>

      <MainPopOver />

      <GPTDrawer />
      <ConfirmModal />

      <Entrance mode={"login"} />

      <LoadingModal />
    </React.Fragment>
  ));
}
