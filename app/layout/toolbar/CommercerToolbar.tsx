import * as React from "react";
import Image from "../../common/Image.js";

import { useObserver } from "mobx-react";
import { Link as NavLink } from "../../common/Link.js";
import { stringAvatar } from "../../common/StringAvatar.js";
import { AppContext } from "../../stores/index.js";
import { MyPagePopOver } from "../popover/MyPagePopOver.js";

import {
  AppBar,
  AppBarProps,
  Avatar,
  Grid,
  IconButton,
  Link,
  Toolbar,
  useTheme,
} from "@mui/material";

export function CommercerToolbar(props: AppBarProps): JSX.Element {
  const theme = useTheme();
  const { commonStore } = React.useContext(AppContext);

  const userRef = React.useRef(null);

  return useObserver(() => (
    <AppBar
      sx={{
        bgcolor: "background.paper",
        boxShadow: `0px 3px 7px 0px ${
          theme.palette.mode === "light"
            ? "rgba(0,0,0,.1)"
            : "rgba(255,255,255,.1)"
        }`,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      elevation={0}
      {...props}
    >
      <Toolbar
        sx={{
          height: 80,
        }}
      >
        <Grid container>
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              color="primary"
              children={
                <Image src="/favicon.ico" alt="아비치파비콘" width={40} />
              }
              onClick={() => {
                commonStore.setDrawerBaseState(!commonStore.drawerBaseState);
              }}
            />
          </Grid>

          <Grid
            item
            xs={8}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link
              color="inherit"
              underline="none"
              href="/"
              component={NavLink}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image
                src={
                  theme.palette.mode === "light"
                    ? "/resources/logo_color.svg"
                    : "/resources/logo_white.png"
                }
                style={{ height: commonStore.isDesktop ? 66 : 44 }}
                alt="아비치컬러로고"
              />
            </Link>
          </Grid>

          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
            }}
          >
            <IconButton
              ref={userRef}
              children={
                commonStore.userInfo ? (
                  <Avatar
                    {...stringAvatar(
                      commonStore.appInfo.isAdmin
                        ? commonStore.userInfo?.adminemail
                        : commonStore.userInfo?.user?.useremail ?? "unknown",
                    )}
                  />
                ) : (
                  <Avatar />
                )
              }
              onClick={() => {
                commonStore.setUserPopOver(!commonStore.userPopOver);
              }}
            />
          </Grid>
        </Grid>
      </Toolbar>

      <MyPagePopOver userRef={userRef} />
    </AppBar>
  ));
}
