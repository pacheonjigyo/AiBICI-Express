import * as React from "react";

import { useObserver } from "mobx-react";
import { ThemeButton } from "../../common/ThemeButton.js";
import { AppContext } from "../../stores/index.js";

import { Box, Container, Link, Typography } from "@mui/material";
import { wordList } from "../../data/words.js";

export default function Footer(): JSX.Element {
  const { commonStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      {window.location.pathname.includes("branding/create") ? null : (
        <Box
          sx={{
            bgcolor: "background.paper",
            color: "#8f8f8f",
          }}
        >
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
            }}
            maxWidth="lg"
          >
            {commonStore.isDesktop ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  height: 250,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    width: 700,
                    height: 200,
                  }}
                >
                  <Typography
                    sx={{
                      lineHeight: 2,
                    }}
                    fontSize={12}
                  >
                    {
                      wordList["주식회사 심도컴퍼니"][
                        commonStore.appInfo.language
                      ]
                    }{" "}
                    | {wordList["대표: 심도형"][commonStore.appInfo.language]} |{" "}
                    {
                      wordList[
                        "울산광역시 남구 테크노산업로 55번길 10 UNIST관 AI Innovation Park, 203호"
                      ][commonStore.appInfo.language]
                    }
                    {commonStore.appInfo.language === "ko" ? <br /> : " | "}
                    {wordList["사업자등록번호"][commonStore.appInfo.language]}:
                    458-86-01634 |{" "}
                    {
                      wordList["통신판매업신고번호"][
                        commonStore.appInfo.language
                      ]
                    }
                    : 제2023-울산남구-0645호 |{" "}
                    {wordList["고객센터"][commonStore.appInfo.language]}:
                    052-920-9001
                    <br />
                    Copyright © AiBICI All rights reserved.
                    <br />
                    <br />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mr: 3,
                        }}
                      >
                        <ThemeButton />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Link
                          href="http://simdocompany.com"
                          target="_blank"
                          color="inherit"
                          underline="none"
                        >
                          <Typography
                            sx={{
                              mr: 3,
                            }}
                            fontSize={12}
                          >
                            {wordList["회사소개"][commonStore.appInfo.language]}
                          </Typography>
                        </Link>
                        <Link
                          sx={{
                            mr: 3,
                          }}
                          href="/login/admin"
                          color="inherit"
                          underline="none"
                        >
                          <Typography fontSize={12}>
                            {wordList["관리자"][commonStore.appInfo.language]}
                          </Typography>
                        </Link>

                        {/* <Link
                        color="inherit"
                        underline="none"
                        onClick={() => {
                          APIGateway(
                            {
                              query: "sysop/register",
                              data: {
                                email: "adididi",
                                password: "ehgud3355#",
                                phone_number: "0529209001",
                              },
                              method: "POST",
                              auth: true,
                            },
                            false,
                          );
                        }}
                      >
                        <Typography
                          sx={{
                            mr: 3,
                          }}
                          color="#8f8f8f"
                          fontSize={commonStore.device === "mobile" ? 12 : 14}
                        >
                          슈퍼어드민
                        </Typography>
                      </Link> */}
                      </Box>
                    </Box>
                  </Typography>
                </Box>

                <Box
                  sx={{
                    height: 200,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "right",
                      flexWrap: "wrap",
                    }}
                  >
                    <Link
                      href="/terms"
                      target="_blank"
                      color="inherit"
                      underline="none"
                    >
                      <Typography
                        sx={{
                          mr: 3,
                        }}
                        fontSize={12}
                      >
                        {wordList["이용약관"][commonStore.appInfo.language]}
                      </Typography>
                    </Link>

                    <Link
                      href="/privacy"
                      target="_blank"
                      color="inherit"
                      underline="none"
                    >
                      <Typography
                        sx={{
                          mr: 3,
                        }}
                        fontSize={12}
                      >
                        {
                          wordList["개인정보처리방침"][
                            commonStore.appInfo.language
                          ]
                        }
                      </Typography>
                    </Link>

                    <Link
                      href="/license"
                      target="_blank"
                      color="inherit"
                      underline="none"
                    >
                      <Typography
                        sx={{
                          mr: 3,
                        }}
                        fontSize={12}
                      >
                        {wordList["라이선스"][commonStore.appInfo.language]}
                      </Typography>
                    </Link>

                    <Link
                      href="/ai-image-terms"
                      target="_blank"
                      color="inherit"
                      underline="none"
                    >
                      <Typography fontSize={12}>
                        {
                          wordList["인공지능이용약관"][
                            commonStore.appInfo.language
                          ]
                        }
                      </Typography>
                    </Link>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "left",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: 50,
                  }}
                >
                  <Link
                    href="/terms"
                    target="_blank"
                    color="inherit"
                    underline="none"
                  >
                    <Typography
                      sx={{
                        mr: 2,
                      }}
                      fontSize={12}
                    >
                      {wordList["이용약관"][commonStore.appInfo.language]}
                    </Typography>
                  </Link>

                  <Link
                    href="/privacy"
                    target="_blank"
                    color="inherit"
                    underline="none"
                  >
                    <Typography
                      sx={{
                        mr: 2,
                      }}
                      fontSize={12}
                    >
                      {
                        wordList["개인정보처리방침"][
                          commonStore.appInfo.language
                        ]
                      }
                    </Typography>
                  </Link>

                  <Link
                    href="/license"
                    target="_blank"
                    color="inherit"
                    underline="none"
                  >
                    <Typography
                      sx={{
                        mr: 2,
                      }}
                      fontSize={12}
                    >
                      {wordList["라이선스"][commonStore.appInfo.language]}
                    </Typography>
                  </Link>

                  <Link
                    href="/ai-image-terms"
                    target="_blank"
                    color="inherit"
                    underline="none"
                  >
                    <Typography fontSize={12}>
                      {
                        wordList["인공지능이용약관"][
                          commonStore.appInfo.language
                        ]
                      }
                    </Typography>
                  </Link>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: 250,
                  }}
                >
                  <Typography
                    sx={{
                      lineHeight: 2,
                    }}
                    fontSize={commonStore.device === "mobile" ? 12 : 14}
                  >
                    (주)심도컴퍼니 | 대표: 심도형{" "}
                    {commonStore.isDesktop ? "|" : <br />} 울산광역시 남구
                    테크노산업로 55번길 10 UNIST관 AI Innovation Park, 203호
                    <br />
                    사업자등록번호: 458-86-01634{" "}
                    {commonStore.isDesktop ? "|" : <br />} 통신판매업신고번호:
                    제2023-울산남구-0645호{" "}
                    {commonStore.isDesktop ? "|" : <br />} 고객센터:
                    052-920-9001
                    <br />
                    Copyright © AiBICI All rights reserved.
                    <br />
                    <br />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mr: 2,
                        }}
                      >
                        <ThemeButton />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Link
                          href="http://simdocompany.com"
                          target="_blank"
                          color="inherit"
                          underline="none"
                        >
                          <Typography
                            sx={{
                              mr: 2,
                            }}
                            fontSize={12}
                          >
                            {wordList["회사소개"][commonStore.appInfo.language]}
                          </Typography>
                        </Link>
                        <Link
                          href="/login/admin"
                          color="inherit"
                          underline="none"
                        >
                          <Typography color="#8f8f8f" fontSize={12}>
                            {wordList["관리자"][commonStore.appInfo.language]}
                          </Typography>
                        </Link>
                      </Box>
                    </Box>
                  </Typography>
                </Box>
              </Box>
            )}
          </Container>
        </Box>
      )}
    </>
  ));
}
