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

import { KeyboardArrowLeft } from "@mui/icons-material";
import {
  AppBarProps,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Toolbar,
  useTheme,
} from "@mui/material";
import { APIGateway } from "../../common/Gateway.js";

export function BaseToolbar(props: AppToolbarProps): JSX.Element {
  const brandingRef = React.useRef(null);
  // const workRef = React.useRef(null);
  // const infoRef = React.useRef(null);
  // const aboutRef = React.useRef(null);

  const theme = useTheme();
  const navigate = useNavigate();

  const { commonStore, engineStore, engineDataStore } =
    React.useContext(AppContext);
  const { sx, ...other } = props;

  const userRef = React.useRef(null);
  const elRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    initToolbarEvent(elRef);
  }, []);

  return useObserver(() => (
    <Box
      sx={{
        bgcolor: "background.paper",

        borderBottom: 1,
        borderColor: "divider",
      }}
    >
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

      <Toolbar
        sx={{
          height: 109,
        }}
      >
        {commonStore.isDesktop ? (
          <Grid container>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                color="inherit"
                variant="contained"
                sx={{
                  fontSize: 18,
                  width: commonStore.isDesktop ? 180 : "100%",
                  height: 60,
                }}
                onClick={() => {
                  // onPrevious();

                  engineStore.setStep(0);

                  navigate("/ai-branding/create");
                }}
                startIcon={<KeyboardArrowLeft />}
              >
                뒤로가기
              </Button>
            </Grid>

            <Grid
              item
              xs={4}
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
                      ? "/resources/logo_color.png"
                      : "/resources/logo_white.png"
                  }
                  style={{ height: 66 }}
                  alt="아비치컬러로고"
                />
              </Link>
            </Grid>

            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "right",
              }}
            >
              <Button
                color="info"
                variant="text"
                sx={{
                  fontSize: 18,
                  fontWeight: "bold",

                  height: 60,
                }}
                onClick={() => {
                  commonStore.setGptDrawer(true);
                }}
              >
                GPT
              </Button>

              {/* {commonStore.appInfo.accessToken === "" ? (
                <Button
                  color="info"
                  variant="contained"
                  sx={{
                    fontSize: 20,
                    fontWeight: "bold",
                    height: 60,
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
                  로그인
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
              )} */}

              <Button
                variant="contained"
                color="secondary"
                sx={{
                  ml: 5,
                  fontSize: 18,
                  width: 180,
                  height: 60,
                }}
                onClick={async () => {
                  const brandJson = await APIGateway(
                    {
                      query: "serviceRegisters/upload",
                      method: "POST",
                      data: {
                        service: {
                          type: engineDataStore.brandInfo.identity,
                          category: engineDataStore.brandInfo.category,
                          industry: engineDataStore.brandInfo.industry,
                          name: engineDataStore.brandInfo.name,
                          color: engineDataStore.brandInfo.color,
                          font_family: engineDataStore.brandInfo.fontFamily,

                          logo: engineDataStore.brandInfo.logo,
                          slogan: engineDataStore.brandInfo.slogan,
                          core_value: engineDataStore.brandInfo.coreValue,

                          story: engineDataStore.brandInfo.story,
                          mission: engineDataStore.brandInfo.mission,
                          vision: engineDataStore.brandInfo.vision,

                          special: {
                            name: "",
                            nameKor: "",
                          },

                          description: "",
                        },
                      },
                      auth: true,
                    },
                    false,
                  );

                  if (brandJson.error) {
                    alert(brandJson.error.message);

                    return;
                  }

                  const accept = confirm(
                    "브랜드 정보가 저장되었어요.\n생성된 브랜드는 [마이페이지]에서 계속 관리할 수 있어요.\n\n[확인] 버튼을 클릭하시면 해당 브랜드의 프로필로 이동할게요.",
                  );

                  if (!accept) {
                    navigate(`/ai-branding/create`);

                    return;
                  }

                  navigate(`/identity/${brandJson.serviceInput.serviceId}`);
                }}
              >
                브랜드 저장하기
              </Button>
            </Grid>
          </Grid>
        ) : (
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
                children={
                  <Image src="/favicon.ico" alt="아비치파비콘" width={30} />
                }
                onClick={() => {
                  commonStore.setDrawerAppState(!commonStore.drawerAppState);
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
                  style={{ height: 44 }}
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
        )}
      </Toolbar>

      <MyPagePopOver userRef={userRef} />
    </Box>
  ));
}

type AppToolbarProps = Omit<AppBarProps, "children">;
