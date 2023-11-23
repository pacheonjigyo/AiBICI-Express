import * as React from "react";

import { useObserver } from "mobx-react";
import { Link as NavLink } from "../../common/Link.js";
import { AppContext } from "../../stores/index.js";

import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Popover,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { wordList } from "../../data/words.js";

export function MyPagePopOver(props): JSX.Element {
  const { commonStore } = React.useContext(AppContext);

  const navigate = useNavigate();

  return useObserver(() => (
    <>
      <Popover
        id={"mypage"}
        open={commonStore.userPopOver}
        anchorEl={props.userRef.current}
        onClose={() => {
          commonStore.setUserPopOver(false);
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Paper
          sx={{
            p: 3,

            width: 300,
          }}
        >
          <>
            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <Grid container spacing={2}>
                {commonStore.appInfo.accessToken !== "" ? (
                  <>
                    <Grid
                      item
                      xs={3}
                      sx={{
                        m: "auto",
                        textAlign: "left",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                        }}
                      >
                        {wordList["계정"][commonStore.appInfo.language]}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={9}
                      sx={{
                        m: "auto",
                        textAlign: "right",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                        }}
                      >
                        {commonStore.appInfo.isAdmin
                          ? commonStore.userInfo?.adminemail
                          : commonStore.userInfo?.user?.useremail ?? "unknown"}
                      </Typography>
                    </Grid>

                    {commonStore.appInfo.isAdmin ? null : (
                      <>
                        <Grid
                          item
                          xs={3}
                          sx={{
                            m: "auto",
                            textAlign: "left",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 14,
                            }}
                          >
                            {wordList["요금제"][commonStore.appInfo.language]}
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          xs={9}
                          sx={{
                            m: "auto",
                            textAlign: "right",
                          }}
                        >
                          {commonStore.userInfo?.allCount?.viewGrade ? (
                            <Chip
                              label={
                                commonStore.userInfo?.allCount.viewGrade
                                  .grade === 1
                                  ? wordList["베이직"][
                                      commonStore.appInfo.language
                                    ]
                                  : commonStore.userInfo?.allCount.viewGrade
                                      .grade === 2
                                  ? wordList["비즈니스"][
                                      commonStore.appInfo.language
                                    ]
                                  : commonStore.userInfo?.allCount.viewGrade
                                      .grade === 3
                                  ? wordList["엔터프라이즈"][
                                      commonStore.appInfo.language
                                    ]
                                  : wordList["무제한"][
                                      commonStore.appInfo.language
                                    ]
                              }
                              color="info"
                            />
                          ) : null}
                        </Grid>
                      </>
                    )}

                    <Grid
                      item
                      xs={6}
                      sx={{
                        m: "auto",
                      }}
                    >
                      <Button
                        variant="contained"
                        href={commonStore.appInfo.isAdmin ? "/admin" : `/home`}
                        component={NavLink}
                        fullWidth
                        sx={{
                          height: 40,
                        }}
                        onClick={() => {
                          commonStore.setUserPopOver(false);
                        }}
                      >
                        {commonStore.appInfo.isAdmin
                          ? wordList["관리페이지"][commonStore.appInfo.language]
                          : wordList["마이페이지"][
                              commonStore.appInfo.language
                            ]}
                      </Button>
                    </Grid>

                    <Grid
                      item
                      xs={6}
                      sx={{
                        m: "auto",
                      }}
                    >
                      <Button
                        color="inherit"
                        variant="contained"
                        href="/"
                        component={NavLink}
                        fullWidth
                        sx={{
                          height: 40,
                        }}
                        onClick={() => {
                          commonStore.initAppInfo();
                          commonStore.setUserPopOver(false);
                        }}
                      >
                        {wordList["로그아웃"][commonStore.appInfo.language]}
                      </Button>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        m: "auto",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                        }}
                      >
                        {
                          wordList["로그인 후 이용해주세요."][
                            commonStore.appInfo.language
                          ]
                        }
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sx={{
                        m: "auto",
                      }}
                    >
                      <Button
                        color="primary"
                        variant="contained"
                        fullWidth
                        sx={{
                          height: 40,
                        }}
                        onClick={() => {
                          commonStore.setEntrance(true);
                          commonStore.setUserPopOver(false);
                        }}
                      >
                        {wordList["로그인"][commonStore.appInfo.language]}
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
          </>
        </Paper>
      </Popover>
    </>
  ));
}
