import * as React from "react";

import {
  ArrowBack,
  Dashboard,
  DesignServices,
  EmojiEvents,
  Photo,
  Sell,
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
import { stringAvatar } from "../../common/StringAvatar.js";
import { GPTDrawer } from "../drawer/GPTDrawer.js";
import { MyPagePopOver } from "../popover/MyPagePopOver.js";

const menuData = [
  {
    icon: <Dashboard />,
    name: "상세정보",
    path: "detail",
  },

  {
    icon: <DesignServices />,
    name: "에디터",
    path: "editor",
  },

  {
    icon: <Photo />,
    name: "목업뷰어",
    path: "mockup",
  },

  {
    icon: <Sell />,
    name: "판매관리",
    path: "sell",
  },

  {
    icon: <EmojiEvents />,
    name: "챌린지",
    path: "challenge",
  },

  // {
  //   icon: <Book />,
  //   name: "템플릿",
  //   path: "template",
  // },

  // {
  //   icon: <BarChart />,
  //   name: "레포트",
  //   path: "report",
  // },

  // {
  //   icon: <Campaign />,
  //   name: "캠페인",
  //   path: "campaign",
  // },
];

export function IdentityMenu(props: any): JSX.Element {
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
              href="/creator/brand"
              component={NavLink}
            >
              <ArrowBack />
            </Button>
          </ListItem>

          {menuData.map((v, i) => {
            return (
              <>
                <ListItem key={i} disablePadding>
                  {v.path === "template" ||
                  v.path === "report" ||
                  v.path === "campaign" ? (
                    <Button
                      color={
                        window.location.pathname === `/identity/${id}/${v.path}`
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
                        window.location.pathname === `/identity/${id}/${v.path}`
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
                      href={`/identity/${id}/${v.path}`}
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
                  )}
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

      <MyPagePopOver userRef={userRef} />

      <GPTDrawer />
    </>
  ));
}
