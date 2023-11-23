import * as React from "react";
import Image from "../../common/Image.js";

import { AlternateEmail } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { APIGateway } from "../../common/Gateway.js";
import { Link as NavLink } from "../../common/Link.js";
import { usePageEffect } from "../../core/page.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";
import { LoginType } from "../../types.js";
import { Notice } from "./Notice.js";

import {
  Box,
  Button,
  CircularProgress,
  Link,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Language } from "../../common/Language.js";

export default function Login(props: LoginType): JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();

  const { commonStore } = React.useContext(AppContext);
  const { type } = useParams();

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const isAdmin = type === "admin";

  usePageEffect({
    title:
      props.mode === "signup"
        ? wordList["회원가입"][commonStore.appInfo.language]
        : props.mode === "password"
        ? wordList["비밀번호 초기화"][commonStore.appInfo.language]
        : wordList["로그인"][commonStore.appInfo.language],
  });

  React.useEffect(() => {
    commonStore.setNavigate(navigate);
    commonStore.setLoginStep(1);
    commonStore.setAppInfo({
      ...commonStore.appInfo,
    });

    commonStore.setLoginType(isAdmin ? "website" : "website");

    if (!token) {
      return;
    }

    APIGateway(
      {
        query: `${
          props.mode === "signup" ? "signUp" : "resetPassword"
        }?token=${token}`,
        data: null,
        method: "GET",
        auth: false,
      },
      true,
    ).then((res) => {
      if (res.error) {
        alert(
          wordList["인증이 만료되었습니다. 다시 시도해주세요."][
            commonStore.appInfo.language
          ],
        );

        window.close();

        return;
      }

      commonStore.setAppInfo({
        ...commonStore.appInfo,

        email: res.data,
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <Box
      sx={{
        width: commonStore.isDesktop ? 450 : commonStore.baseInfo.width,
        m: "auto",
        p: 3,
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          border: "none",
          borderRadius: "1rem",
          boxShadow: "0px 3px 7px 0px rgba(0,0,0,.1)",
          display: "flex",
          flexDirection: commonStore.isDesktop ? "unset" : "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: commonStore.isDesktop ? "100%" : "100%",
            p: 3,
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
              justifyContent: "center",
              mb: 5,
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

          {!isAdmin && props.mode === "login" && commonStore.loginStep === 1 ? (
            <>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Button
                  fullWidth
                  color={
                    commonStore.loginType === "google" ? "secondary" : "info"
                  }
                  variant={"outlined"}
                  sx={{
                    border: 1,
                    borderColor: "divider",

                    height: 60,
                    p: 1,
                    mr: 1,
                  }}
                  startIcon={
                    <Image
                      src="/resources/google_logo.svg"
                      width={32}
                      height={32}
                      style={{
                        borderRadius: "50%",
                      }}
                    />
                  }
                  children={
                    <>
                      <Typography
                        color="#333333"
                        fontSize={14}
                        fontWeight="bold"
                      >
                        <Language label="구글" />
                      </Typography>
                    </>
                  }
                  onClick={async () => {
                    commonStore.setLoginType("google");

                    const url = await APIGateway(
                      {
                        query: "google",
                        method: "GET",
                        data: null,
                        auth: false,
                      },
                      true,
                    );

                    const popup = window.open(
                      url.url,
                      "_blank",
                      "height=400,width=377,top=100,left=200,scrollbars=yes,resizable=yes",
                    );

                    commonStore.setPopup(popup);
                  }}
                />
                <Button
                  fullWidth
                  color={
                    commonStore.loginType === "kakao" ? "secondary" : "info"
                  }
                  variant={"outlined"}
                  sx={{
                    border: 1,
                    borderColor: "divider",

                    height: 60,
                    p: 1,
                  }}
                  startIcon={
                    <Image
                      src="/resources/kakao_logo.svg"
                      width={32}
                      height={32}
                      style={{
                        borderRadius: "50%",
                      }}
                    />
                  }
                  children={
                    <>
                      <Typography
                        color="#333333"
                        fontSize={14}
                        fontWeight="bold"
                      >
                        <Language label="카카오" />
                      </Typography>
                    </>
                  }
                  onClick={async () => {
                    commonStore.setLoginType("kakao");

                    const url = await APIGateway(
                      {
                        query: "kakao",
                        method: "GET",
                        data: null,
                        auth: false,
                      },
                      true,
                    );

                    const popup = window.open(
                      url.url,
                      "_blank",
                      "height=400,width=377,top=100,left=200,scrollbars=yes,resizable=yes",
                    );

                    commonStore.setPopup(popup);
                  }}
                />
                {/* <Button
                  disabled
                  fullWidth
                  color="info"
                  variant="outlined"
                  sx={{
                    boxShadow: `0px 3px 7px 0px ${
                      theme.palette.mode === "light"
                        ? "rgba(0,0,0,.1)"
                        : "rgba(255,255,255,.1)"
                    }`,
                    height: 60,
                    mb: 1,
                    p: 1,
                  }}
                  children={
                    <>
                      <Image
                        src="/resources/naver_logo.svg"
                        width={32}
                        height={32}
                        style={{
                          borderRadius: "50%",
                        }}
                      />
                      &nbsp;{wordList["네이버"][commonStore.appInfo.language]}
                    </>
                  }
                  onClick={async () => {
                    const url = await APIGateway(
                      {
                        query: "google",
                        method: "GET",
                        data: null,
                        auth: false,
                      },
                      true,
                    );

                    const popup = window.open(
                      url.url,
                      "_blank",
                      "height=400,width=377,top=100,left=200,scrollbars=yes,resizable=yes",
                    );

                    commonStore.setPopup(popup);
                  }}
                /> */}
              </Box>

              <Button
                fullWidth
                color={
                  commonStore.loginType === "website" ? "secondary" : "info"
                }
                variant={"outlined"}
                sx={{
                  border: 1,
                  borderColor: "divider",

                  height: 60,
                  mt: 1,
                  p: 1,
                }}
                startIcon={<AlternateEmail />}
                children={
                  <>
                    <Typography color="#333333" fontSize={14} fontWeight="bold">
                      <Language label="이메일로 계속하기" />
                    </Typography>
                  </>
                }
                onClick={async () => {
                  commonStore.setLoginType("website");
                }}
              />
            </>
          ) : null}

          {commonStore.loginType === "website" ||
          props.mode === "signup" ||
          props.mode === "password" ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 3,
                  mb: 1,
                }}
              >
                {props.mode === "signup" || props.mode === "password" ? (
                  <>
                    <TextField
                      id="Login_Email"
                      autoFocus
                      label={
                        isAdmin
                          ? wordList["관리자 이메일"][
                              commonStore.appInfo.language
                            ]
                          : wordList["이메일을 입력해주세요."][
                              commonStore.appInfo.language
                            ]
                      }
                      color="secondary"
                      variant="outlined"
                      disabled={true}
                      fullWidth
                      inputProps={{ style: { fontSize: 18 } }}
                      sx={{
                        mb: 1,
                      }}
                      value={commonStore.appInfo.email}
                      onChange={(e) => {
                        commonStore.setAppInfo({
                          ...commonStore.appInfo,

                          email: e.target.value,
                        });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          commonStore.setLoginStep(2);
                        }
                      }}
                    />
                  </>
                ) : commonStore.loginStep === 1 ? (
                  <TextField
                    id="Login_Email"
                    autoFocus
                    label={
                      isAdmin
                        ? wordList["관리자 이메일"][
                            commonStore.appInfo.language
                          ]
                        : wordList["이메일을 입력해주세요."][
                            commonStore.appInfo.language
                          ]
                    }
                    color="secondary"
                    variant="outlined"
                    disabled={commonStore.signFlighting}
                    fullWidth
                    inputProps={{ style: { fontSize: 18 } }}
                    value={commonStore.appInfo.email}
                    onChange={(e) => {
                      commonStore.setAppInfo({
                        ...commonStore.appInfo,

                        email: e.target.value,
                      });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        props.mode === "signup"
                          ? commonStore.signUp(isAdmin)
                          : commonStore.checkEmail();
                      }
                    }}
                  />
                ) : null}
              </Box>

              {props.mode === "signup" ||
              props.mode === "password" ||
              commonStore.loginStep === 2 ? (
                <TextField
                  autoFocus
                  id="Login_Password"
                  color="secondary"
                  type="password"
                  variant="outlined"
                  label={
                    isAdmin
                      ? wordList["관리자 비밀번호"][
                          commonStore.appInfo.language
                        ]
                      : wordList["비밀번호를 입력해주세요."][
                          commonStore.appInfo.language
                        ]
                  }
                  disabled={commonStore.signFlighting}
                  fullWidth
                  inputProps={{ style: { fontSize: 18 } }}
                  sx={{
                    mb: 1,
                  }}
                  onChange={(e) => {
                    commonStore.setAppInfo({
                      ...commonStore.appInfo,

                      password: e.target.value,
                    });
                  }}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      if (props.mode === "signup") {
                        commonStore.signUp(isAdmin);
                      } else {
                        commonStore.signIn(isAdmin);
                      }
                    }
                  }}
                />
              ) : null}

              {props.mode === "signup" ? null : (
                <>
                  {commonStore.loginStep === 1
                    ? // <Link
                      //   color="inherit"
                      //   href=""
                      //   component={NavLink}
                      //   sx={{
                      //     fontSize: 14,
                      //     textAlign: "center",
                      //   }}
                      // >
                      //   {commonStore.appInfo.language === "ko"
                      //     ? "이메일을 잊으셨나요?"
                      //     : "Did you forget your email?"}
                      // </Link>
                      null
                    : null}

                  {commonStore.loginStep === 2 ? (
                    <Link
                      color="inherit"
                      href=""
                      component={NavLink}
                      sx={{
                        fontSize: 14,
                        textAlign: "center",
                      }}
                      onClick={async () => {
                        const mailData = await APIGateway(
                          {
                            query: `password`,
                            data: {
                              email: commonStore.appInfo.email,
                            },
                            method: "POST",
                            auth: false,
                          },
                          true,
                        );

                        if (mailData.error) {
                          alert(mailData.error.message);

                          return;
                        }

                        alert("입력하신 이메일로 인증 링크를 보내드렸어요.");
                      }}
                    >
                      {
                        wordList["비밀번호를 잊으셨나요?"][
                          commonStore.appInfo.language
                        ]
                      }
                    </Link>
                  ) : null}
                </>
              )}

              {props.mode === "signup" || props.mode === "password" ? (
                <>
                  <TextField
                    id="Login_PasswordConfirm"
                    color="secondary"
                    type="password"
                    variant="outlined"
                    label={
                      wordList["비밀번호를 한번 더 입력해주세요."][
                        commonStore.appInfo.language
                      ]
                    }
                    disabled={commonStore.signFlighting}
                    fullWidth
                    inputProps={{ style: { fontSize: 18 } }}
                    sx={{
                      mb: 3,
                    }}
                    onChange={(e) => {
                      commonStore.setAppInfo({
                        ...commonStore.appInfo,

                        passwordConfirm: e.target.value,
                      });
                    }}
                    onKeyDown={async (e) => {
                      if (e.key === "Enter") {
                        if (props.mode === "signup") {
                          commonStore.signUp(isAdmin);
                        } else {
                          commonStore.signIn(isAdmin);
                        }
                      }
                    }}
                  />
                </>
              ) : null}

              {props.mode === "signup" ? (
                <>
                  <TextField
                    id="Login_Phone"
                    color="secondary"
                    variant="outlined"
                    label={wordList["연락처"][commonStore.appInfo.language]}
                    disabled={commonStore.signFlighting}
                    fullWidth
                    inputProps={{ style: { fontSize: 18 } }}
                    sx={{
                      mb: 3,
                    }}
                    onChange={(e) => {
                      commonStore.setAppInfo({
                        ...commonStore.appInfo,

                        phone: e.target.value,
                      });
                    }}
                    onKeyDown={async (e) => {
                      if (e.key === "Enter") {
                        if (props.mode === "signup") {
                          commonStore.signUp(isAdmin);
                        } else {
                          commonStore.signIn(isAdmin);
                        }
                      }
                    }}
                  />
                </>
              ) : // <FormControlLabel
              //   control={
              //     <Checkbox
              //       color="secondary"
              //       icon={<RadioButtonUnchecked />}
              //       checkedIcon={<CheckCircle />}
              //     />
              //   }
              //   label={commonStore.appInfo.language === "ko" ? "로그인 유지" : "Keep Login"}
              // />
              null}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  my: 3,
                }}
              >
                {commonStore.loginStep === 1 ? (
                  <>
                    {props.mode === "signup" || props.mode === "password" ? (
                      <>
                        <Button
                          color="secondary"
                          component={NavLink}
                          sx={{
                            fontSize: 18,
                            width: "50%",
                            height: 60,
                          }}
                          disabled={commonStore.loginLoading}
                          onClick={() => {
                            window.close();
                          }}
                        >
                          {wordList["닫기"][commonStore.appInfo.language]}
                        </Button>
                      </>
                    ) : (
                      <Button
                        color="secondary"
                        component={NavLink}
                        sx={{
                          fontSize: 16,
                          width: "50%",
                          height: 60,
                        }}
                        disabled={commonStore.loginLoading}
                        onClick={() => {
                          commonStore.verifyEmail();
                        }}
                      >
                        {wordList["회원가입"][commonStore.appInfo.language]}
                      </Button>
                    )}
                    &nbsp;
                    <Button
                      variant="contained"
                      color="secondary"
                      children={
                        commonStore.loginLoading ? (
                          <CircularProgress color="secondary" size="1.2rem" />
                        ) : props.mode === "signup" ? (
                          wordList["회원가입"][commonStore.appInfo.language]
                        ) : props.mode === "password" ? (
                          wordList["재설정"][commonStore.appInfo.language]
                        ) : (
                          wordList["다음"][commonStore.appInfo.language]
                        )
                      }
                      disabled={commonStore.loginLoading}
                      fullWidth
                      sx={{
                        fontSize: 16,
                        width: "50%",
                        height: 60,
                      }}
                      onClick={() =>
                        props.mode === "signup"
                          ? commonStore.signUp(isAdmin)
                          : props.mode === "password"
                          ? commonStore.resetPassword(token)
                          : commonStore.checkEmail()
                      }
                    />
                  </>
                ) : null}

                {commonStore.loginStep === 2 ? (
                  <>
                    <Button
                      color="secondary"
                      sx={{
                        fontSize: 16,
                        width: "50%",
                        height: 60,
                      }}
                      disabled={commonStore.signFlighting}
                      children={wordList["이전"][commonStore.appInfo.language]}
                      onClick={() => {
                        commonStore.setLoginStep(1);
                      }}
                    />
                    &nbsp;
                    <Button
                      variant="contained"
                      color="secondary"
                      form="login-form"
                      type="submit"
                      size="large"
                      children={
                        commonStore.signFlighting ? (
                          <CircularProgress color="secondary" size="1.2rem" />
                        ) : (
                          wordList["로그인"][commonStore.appInfo.language]
                        )
                      }
                      disabled={commonStore.signFlighting}
                      fullWidth
                      sx={{
                        fontSize: 16,
                        width: "50%",
                        height: 60,
                      }}
                      onClick={async () => {
                        {
                          if (props.mode === "signup") {
                            commonStore.signUp(isAdmin);
                          } else {
                            commonStore.signIn(isAdmin);
                          }
                        }
                      }}
                    />
                  </>
                ) : null}
              </Box>

              {props.mode === "signup" ? <Notice sx={{ mt: 5 }} /> : null}
            </>
          ) : null}
        </Box>
      </Paper>
    </Box>
  ));
}
