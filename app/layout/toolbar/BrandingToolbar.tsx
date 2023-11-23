import * as React from "react";
import Image from "../../common/Image.js";

import { useObserver } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { Link as NavLink } from "../../common/Link.js";
import { stringAvatar } from "../../common/StringAvatar.js";
import { initToolbarEvent } from "../../common/ToolbarEvent.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";
import { MyPagePopOver } from "../popover/MyPagePopOver.js";

import {
  AppBarProps,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import { Language } from "../../common/Language.js";

export function BrandingToolbar(props: AppToolbarProps): JSX.Element {
  const brandingRef = React.useRef(null);
  // const workRef = React.useRef(null);
  // const infoRef = React.useRef(null);
  // const aboutRef = React.useRef(null);

  const theme = useTheme();
  const navigate = useNavigate();

  const { commonStore } = React.useContext(AppContext);
  const { sx, ...other } = props;

  const userRef = React.useRef(null);
  const elRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    initToolbarEvent(elRef);

    commonStore.syncAppInfo(commonStore.appInfo.isAdmin, false, "");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      <Drawer
        anchor={"top"}
        open={commonStore.drawerAppState}
        onClose={() => {
          commonStore.setDrawerAppState(false);
        }}
      >
        <Box
          sx={{
            width: commonStore.baseInfo.width,
          }}
          role="presentation"
        >
          <List
            sx={{
              p: 1,
            }}
          >
            <ListItem key={"language"} disablePadding>
              <Select
                value={commonStore.appInfo.language}
                fullWidth
                onChange={(e) => {
                  commonStore.setAppInfo({
                    ...commonStore.appInfo,

                    language: e.target.value,
                  });
                }}
              >
                <MenuItem value="en">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    English
                  </Box>
                </MenuItem>
                <MenuItem value="ko">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    한국어
                  </Box>
                </MenuItem>
              </Select>
            </ListItem>

            <Divider sx={{ my: 1 }} />

            <ListItem key={"home"} disablePadding>
              <ListItemButton href="/" component={NavLink}>
                <ListItemText primary={"HOME"} />
              </ListItemButton>
            </ListItem>

            <Divider sx={{ my: 1 }} />

            <ListItem key={"work"} disablePadding>
              <ListItemButton href="/branding/artwork" component={NavLink}>
                <ListItemText primary={"WORK"} />
              </ListItemButton>
            </ListItem>

            {/* <ListItem key={"pricing"} disablePadding>
              <ListItemButton href="/pricing" component={NavLink}>
                <ListItemText primary={"PRICE"} />
              </ListItemButton>
            </ListItem> */}

            <ListItem key={"information"} disablePadding>
              <ListItemButton href="/info" component={NavLink}>
                <ListItemText primary={"INFO"} />
              </ListItemButton>
            </ListItem>

            <ListItem key={"about"} disablePadding>
              <ListItemButton href="/about" component={NavLink}>
                <ListItemText primary={"ABOUT"} />
              </ListItemButton>
            </ListItem>

            <Divider sx={{ my: 1 }} />

            <ListItem key={"login"} disablePadding>
              <ListItemButton href="/login/user" component={NavLink}>
                <ListItemText
                  primary={wordList["로그인"][commonStore.appInfo.language]}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box
        sx={{
          bgcolor: "background.paper",
          display: commonStore.appInfo.userType === "creator" ? "none" : "auto",

          position: "fixed",
          top: 0,
          left: 0,
          width: commonStore.baseInfo.width,
          height: 60,
          zIndex: 2,
          // overflowY: "auto",

          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg" sx={{}}>
          <Box
            sx={{
              position: "relative",

              // borderBottomLeftRadius: "1rem",
              // borderBottomRightRadius: "1rem",

              height: 60,

              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",

              py: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image
                src={
                  theme.palette.mode === "light"
                    ? "/resources/logo_color.png"
                    : "/resources/logo_white.png"
                }
                style={{
                  cursor: "pointer",
                  height: commonStore.isDesktop ? 33 : 33,
                }}
                alt="아비치컬러로고"
                onClick={() => {
                  const url = `/home`;

                  commonStore
                    .checkProfile(commonStore.appInfo.isAdmin)
                    .then((res) => {
                      if (res) {
                        navigate(url);
                      } else {
                        navigate("/");
                      }
                    });
                }}
              />

              {commonStore.isDesktop ? (
                <>
                  <Button
                    href="/ai-branding"
                    component={NavLink}
                    sx={{
                      ml: 5,

                      // fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    <Language label="AI 브랜딩" />
                  </Button>

                  <Button
                    href="/shop"
                    component={NavLink}
                    sx={{
                      ml: 3,

                      // fontSize: 18,
                      fontWeight: "bold",
                    }}
                    onClick={() => {
                      //
                    }}
                  >
                    <Language label="브랜드거래소" />
                  </Button>

                  <Button
                    href="/startup-challenge"
                    component={NavLink}
                    sx={{
                      ml: 3,

                      // fontSize: 18,
                      fontWeight: "bold",
                    }}
                    onClick={() => {
                      //
                    }}
                  >
                    <Language label="창업도전" />
                  </Button>
                </>
              ) : null}
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {commonStore.isDesktop ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mr: 5,
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => {
                        commonStore.setAppInfo({
                          ...commonStore.appInfo,

                          userType: "creator",
                        });

                        navigate("/creator/brand");
                      }}
                    >
                      크리에이터룸
                    </Button>
                  </Box>

                  {/* <Button
                    color="info"
                    sx={{
                      mr: 3,

                      // fontSize: 18,
                      fontWeight: "bold",
                    }}
                    onClick={async () => {
                      window.open(
                        "https://aibici.channel.io/lounge",
                        "_blank",
                        "height=680,width=370,top=100,left=200,scrollbars=yes,resizable=yes",
                      );
                    }}
                  >
                    문의하기
                  </Button>
                  &nbsp; */}
                  {commonStore.appInfo.accessToken === "" ? (
                    <Button
                      sx={{
                        // fontSize: 18,
                        fontWeight: "bold",
                      }}
                      onClick={async () => {
                        const url = `/home`;

                        const result = await commonStore.syncAppInfo(
                          commonStore.appInfo.isAdmin,
                          true,
                          url,
                        );

                        if (!result) {
                          return;
                        }

                        navigate(url);
                      }}
                    >
                      <Language label="로그인" />
                    </Button>
                  ) : (
                    <IconButton
                      ref={userRef}
                      children={
                        commonStore.userInfo ? (
                          <Avatar
                            {...stringAvatar(
                              commonStore.appInfo.isAdmin
                                ? commonStore.userInfo?.adminemail
                                : commonStore.userInfo?.user?.useremail ??
                                    "unknown",
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
                  )}
                </>
              ) : null}

              <Button
                variant="contained"
                sx={{
                  display: "none",
                  ml: 5,
                  fontSize: 18,
                  fontWeight: "bold",
                  minWidth: commonStore.isDesktop ? 100 : "100%",
                }}
                onClick={async () => {
                  const url = `/home`;

                  const result = await commonStore.syncAppInfo(
                    commonStore.appInfo.isAdmin,
                    true,
                    url,
                  );

                  if (!result) {
                    return;
                  }

                  navigate(url);
                }}
              >
                <Language label="무료로 시작하기" />
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <MyPagePopOver userRef={userRef} />
    </>
  ));
}

type AppToolbarProps = Omit<AppBarProps, "children">;
