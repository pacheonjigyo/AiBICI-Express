import AOS from "aos";
import * as React from "react";
import ScrollToTop from "../common/ScrollToTop.js";
import Question from "../routes/ai-branding/create/quest/Main.js";

import { useObserver } from "mobx-react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { initEnvironment } from "../common/Environment.js";
import { AppContext } from "../stores/index.js";
import { AdminMenu } from "./menu/AdminMenu.js";

import {
  Box,
  Container,
  Drawer,
  GlobalStyles,
  useMediaQuery,
} from "@mui/material";
import Entrance from "../common/Entrance.js";
import LoadingModal from "./modal/LoadingModal.js";

export function AdminLayout(): JSX.Element {
  const navigate = useNavigate();

  const { id } = useParams();
  const { commonStore } = React.useContext(AppContext);

  const isDesktop = useMediaQuery("(min-width:1280px)");
  const isTablet = useMediaQuery("(min-width:768px)");

  commonStore.setDesktop(isDesktop);
  commonStore.setDevice(isDesktop ? "desktop" : isTablet ? "tablet" : "mobile");

  React.useEffect(() => {
    AOS.init({ once: true });

    initEnvironment(commonStore);

    commonStore.checkProfile(true).then((res) => {
      {
        if (!res) {
          navigate("/login/admin");
        }
      }
    });

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

      {id === "create" ? (
        <Question />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: commonStore.isDesktop ? "row" : "column",
          }}
        >
          {commonStore.isDesktop ? (
            <AdminMenu />
          ) : (
            <Drawer
              anchor={commonStore.isDesktop ? "left" : "top"}
              open={commonStore.drawerBaseState}
              onClose={() => {
                commonStore.setDrawerBaseState(false);
              }}
            >
              <AdminMenu />
            </Drawer>
          )}

          <Box
            sx={{
              width: commonStore.baseInfo.width - 100,
              height: commonStore.baseInfo.height,
              overflowY: "auto",
            }}
          >
            <Container maxWidth="xl">
              <React.Suspense>
                <Outlet />
              </React.Suspense>
            </Container>
          </Box>
        </Box>
      )}

      <Entrance mode={"login"} />

      <LoadingModal />
    </React.Fragment>
  ));
}
