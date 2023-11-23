import * as React from "react";

import {
  Article,
  Dataset,
  Inventory,
  People,
  SupportAgent,
} from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { Link as NavLink } from "../../common/Link.js";
import { AppContext } from "../../stores/index.js";

import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MyPagePopOver } from "../popover/MyPagePopOver.js";

const menuData = [
  // {
  //   icon: <Dashboard />,
  //   name: "대시보드",
  //   path: "dashboard",
  // },

  {
    icon: <People />,
    name: "사용자",
    path: "users",
  },

  {
    icon: <Dataset />,
    name: "엔진",
    path: "engine",
  },

  {
    icon: <Inventory />,
    name: "슬롯",
    path: "service",
  },

  {
    icon: <Article />,
    name: "게시판",
    path: "board",
  },

  {
    icon: <SupportAgent />,
    name: "창업도전",
    path: "challenge",
  },
];

export function AdminMenu(): JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();

  const userRef = React.useRef(null);

  const { commonStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Box
        sx={{
          borderRadius: 1,
          border: 1,
          borderColor: "divider",

          bgcolor: "background.paper",
          boxShadow: `0px 3px 7px 0px ${
            theme.palette.mode === "light"
              ? "rgba(0,0,0,.1)"
              : "rgba(255,255,255,.1)"
          }`,

          width: commonStore.isDesktop
            ? commonStore.drawerBaseState
              ? 80
              : 0
            : commonStore.baseInfo.width,
          height: commonStore.baseInfo.height - 20,

          // mt: commonStore.isDesktop ? "0px" : "110px",
          // mb: "0px",

          // position: "fixed",
          // left: 10,
          // top: "50%",

          // transform: "translate(0%, -50%)",

          // zIndex: 1,

          mx: "10px",
          mt: "10px",
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          <img src="/favicon.ico" alt="아비치파비콘" width={40} height={40} />
        </Box>

        <List
          className="hideScroll"
          sx={{
            height: commonStore.isDesktop
              ? commonStore.baseInfo.height - 180
              : "auto",
            overflow: "auto",

            display: commonStore.isDesktop ? "" : "flex",
          }}
        >
          {menuData.map((v, i) => {
            return (
              <>
                <ListItem
                  key={i}
                  disablePadding
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 1,
                  }}
                >
                  <Button
                    color={
                      window.location.pathname === `/admin/${v.path}`
                        ? "info"
                        : "inherit"
                    }
                    variant={
                      window.location.pathname === `/admin/${v.path}`
                        ? "contained"
                        : "text"
                    }
                    sx={{
                      // borderRadius: 0,
                      minWidth: 64,
                      height: 64,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      p: 0,
                    }}
                    href={`/admin/${v.path}`}
                    component={NavLink}
                  >
                    <Box
                      sx={{
                        fontSize: 11,
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {v.icon}
                      <br />
                      {v.name}
                    </Box>
                  </Button>
                </ListItem>
              </>
            );
          })}
        </List>

        <Box
          sx={{
            width: 80,
            height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            ref={userRef}
            children={
              commonStore.userInfo ? (
                <Avatar
                // {...stringAvatar(
                //   commonStore.appInfo.isAdmin
                //     ? commonStore.userInfo?.adminemail
                //     : commonStore.userInfo?.user?.useremail ?? "unknown",
                // )}
                />
              ) : (
                <Avatar />
              )
            }
            onClick={() => {
              commonStore.setUserPopOver(!commonStore.userPopOver);
            }}
          />
        </Box>
      </Box>

      <MyPagePopOver userRef={userRef} />
    </>
  ));
}
