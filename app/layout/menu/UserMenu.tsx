import * as React from "react";

import {
  ArrowBack,
  CurrencyExchange,
  Image,
  Inventory,
  Settings,
  Work,
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
import { Language } from "../../common/Language.js";
import { stringAvatar } from "../../common/StringAvatar.js";

const menuData = [
  {
    icon: <Image />,
    name: "디자인",
    path: "design",
  },

  {
    icon: <Inventory />,
    name: "브랜드",
    path: "brand",
  },

  {
    icon: <CurrencyExchange />,
    name: "거래소",
    path: "exchange",
  },

  {
    icon: <Work />,
    name: "창업",
    path: "startup",
  },

  // {
  //   icon: <Face />,
  //   name: "프로필",
  //   path: "profile",
  // },

  {
    icon: <Settings />,
    name: "설정",
    path: "settings",
  },
];

export function UserMenu(): JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();

  const userRef = React.useRef(null);

  const { commonStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",

          display: commonStore.appInfo.userType === "creator" ? "" : "none",

          borderRight: 1,
          borderColor: "divider",
          borderRadius: 0,

          // boxShadow: `0px 3px 7px 0px ${
          //   theme.palette.mode === "light"
          //     ? "rgba(0,0,0,.1)"
          //     : "rgba(255,255,255,.1)"
          // }`,

          width: 80,
          height: commonStore.baseInfo.height,

          // mx: "10px",
          // mt: "10px",

          // position: "fixed",

          // top: "50%",
          // left: 10,

          // transform: "translate(0%, -50%)",

          // zIndex: 10,
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
            navigate("/creator/brand");
          }}
        >
          <img src="/favicon.ico" alt="아비치파비콘" width={40} height={40} />
        </Box>

        <List
          className="hideScroll"
          sx={{
            overflowY: "auto",
            p: 0,

            height: commonStore.baseInfo.height - 160,
          }}
        >
          <ListItem disablePadding>
            <Button
              variant="text"
              color="inherit"
              sx={{
                minWidth: 80,
                height: 80,
              }}
              onClick={() => {
                commonStore.setAppInfo({
                  ...commonStore.appInfo,

                  userType: "user",
                });

                navigate("/home");
              }}
            >
              <ArrowBack />
            </Button>
          </ListItem>

          {menuData.map((v, i) => {
            return (
              <ListItem
                key={i}
                disablePadding
                sx={{
                  // mb: commonStore.isDesktop ? 1 : 0,
                  p: 1,
                }}
              >
                {v.path === "inquiry" || v.path === "profile" ? (
                  <Button
                    sx={{
                      borderRadius: 0,

                      minWidth: 80,
                      height: 80,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      p: 0,
                    }}
                    onClick={() => {
                      alert("준비 중입니다.");
                    }}
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
                ) : (
                  <Button
                    color={
                      window.location.pathname === `/creator/${v.path}`
                        ? "info"
                        : "inherit"
                    }
                    variant={
                      window.location.pathname === `/creator/${v.path}`
                        ? "contained"
                        : "text"
                    }
                    href={`/creator/${v.path}`}
                    component={NavLink}
                    sx={{
                      borderRadius: 1,

                      minWidth: 64,
                      height: 64,
                      p: 0,
                    }}
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
                      <Language label={v.name} />
                    </Box>
                  </Button>
                )}
              </ListItem>
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
        </Box>
      </Box>
    </>
  ));
}
