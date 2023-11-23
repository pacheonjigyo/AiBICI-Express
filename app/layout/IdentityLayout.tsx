import AOS from "aos";
import * as React from "react";
import ScrollToTop from "../common/ScrollToTop.js";

import { Box, useMediaQuery } from "@mui/material";
import { useObserver } from "mobx-react";
import { Outlet, useParams } from "react-router-dom";
import Entrance from "../common/Entrance.js";
import { initEnvironment } from "../common/Environment.js";
import { AppContext } from "../stores/index.js";
import LoadingModal from "./modal/LoadingModal.js";

export function IdentityLayout(): JSX.Element {
  const { id } = useParams();
  const { commonStore } = React.useContext(AppContext);

  const isDesktop = useMediaQuery("(min-width:1280px)");
  const isTablet = useMediaQuery("(min-width:768px)");

  commonStore.setDesktop(isDesktop);
  commonStore.setDevice(isDesktop ? "desktop" : isTablet ? "tablet" : "mobile");

  React.useEffect(() => {
    AOS.init({ once: true });

    initEnvironment(commonStore);

    commonStore.syncAppInfo(commonStore.appInfo.isAdmin, true, "");

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
        {/* <IdentityMenu id={id} /> */}

        <Box
          sx={{
            width: commonStore.baseInfo.width,
            height: commonStore.baseInfo.height,
            overflowY: "auto",
          }}
        >
          <React.Suspense>
            <Outlet />
          </React.Suspense>
        </Box>
      </Box>

      <Entrance mode={"login"} />

      <LoadingModal />
    </React.Fragment>
  ));
}
