import * as React from "react";

import { ArrowBack, DesignServices } from "@mui/icons-material";
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
    icon: <DesignServices />,
    name: "에디터",
    path: "editor",
  },
];

export function DesignMenu(props: any): JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();

  const userRef = React.useRef(null);

  const { commonStore } = React.useContext(AppContext);

  const id = props.id;

  return useObserver(() => (
    <>
      <Box
        sx={{
          bgcolor: "#333333",
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
          <ListItem key={id} disablePadding>
            <Button
              variant="text"
              color="primary"
              sx={{
                minWidth: 80,
                height: 80,
              }}
              href="/creator/design"
              component={NavLink}
            >
              <ArrowBack />
            </Button>
          </ListItem>

          {menuData.map((v, i) => {
            return (
              <>
                <ListItem
                  key={i}
                  disablePadding
                  sx={{
                    mb: commonStore.isDesktop
                      ? i === menuData.length - 1
                        ? 0
                        : 1
                      : 0,
                    mr: commonStore.isDesktop
                      ? i === menuData.length - 1
                        ? 0
                        : 1
                      : 1,
                  }}
                >
                  <Button
                    color={
                      window.location.pathname === `/design/${id}/${v.path}`
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
                    href={`/design/${id}/${v.path}`}
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
