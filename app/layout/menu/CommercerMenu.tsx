import * as React from "react";

import { Chat, CurrencyExchange, Home } from "@mui/icons-material";
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
import { stringAvatar } from "../../common/StringAvatar.js";
import { GPTDrawer } from "../drawer/GPTDrawer.js";
import { MyPagePopOver } from "../popover/MyPagePopOver.js";

const menuData = [
  {
    icon: <Home />,
    name: "홈",
    path: "feed",
  },

  {
    icon: <CurrencyExchange />,
    name: "거래소",
    path: "shop",
  },

  {
    icon: <Chat />,
    name: "커뮤니티",
    path: "community",
  },
];

export function CommercerMenu(): JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();

  const userRef = React.useRef(null);

  const { commonStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Box
        sx={{
          bgcolor: "#333333",
          // borderRight: 1,
          // borderColor: "divider",

          boxShadow: `0px 3px 7px 0px ${
            theme.palette.mode === "light"
              ? "rgba(0,0,0,.1)"
              : "rgba(255,255,255,.1)"
          }`,
          width: 80,
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
            height: commonStore.baseInfo.height - 240,
            overflowY: "auto",
          }}
        >
          {menuData.map((v, i) => {
            return (
              <ListItem
                key={i}
                disablePadding
                sx={
                  {
                    // mb: commonStore.isDesktop ? 1 : 0,
                  }
                }
              >
                {v.path === "inquiry" || v.path === "profile" ? (
                  <Button
                    color={
                      window.location.pathname === `/commercer/${v.path}`
                        ? "inherit"
                        : "info"
                    }
                    variant="contained"
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
                      window.location.pathname === `/commercer/${v.path}`
                        ? "inherit"
                        : "info"
                    }
                    variant="contained"
                    href={`/commercer/${v.path}`}
                    component={NavLink}
                    sx={{
                      borderRadius: 0,

                      minWidth: 80,
                      height: 80,
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
                      {v.name}
                    </Box>
                  </Button>
                )}
              </ListItem>
            );
          })}
        </List>

        <Button
          variant="text"
          sx={{
            mr: 3,

            fontSize: 18,
            fontWeight: "bold",

            width: 80,
            height: 80,
          }}
          onClick={() => {
            commonStore.setGptDrawer(true);
          }}
        >
          GPT
        </Button>

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

      <GPTDrawer />

      <MyPagePopOver userRef={userRef} />
    </>
  ));
}
