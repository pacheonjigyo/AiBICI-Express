import * as React from "react";

import { useObserver } from "mobx-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { TabPanel } from "../../common/Tabpanel.js";
import { usePageEffect } from "../../core/page.js";
import { AppContext } from "../../stores/index.js";

import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";

import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper.min.css";

import SwiperCore, {
  Autoplay,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper";

SwiperCore.use([Autoplay, Navigation, Pagination, Keyboard, Mousewheel]);

import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { BigButton } from "../../common/BigButton.js";
import Footer from "../../layout/footer/Footer.js";
import MakeModal from "../../layout/modal/MakeModal.js";

function TabNavigator(props: any) {
  return (
    <>
      <>
        <Button
          disabled={props.disabled}
          sx={{
            p: 0,

            bgcolor: "background.paper",
            borderRadius: "1rem",

            mr: 3,
          }}
        >
          <Box
            sx={{
              border: props.disabled ? "none" : "2px solid #8265ff",
              borderRadius: "1rem",
              boxShadow: "3px 3px 6px #00000029",

              width: 180,
              height: 180,

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={props.image}
              height={120}
              style={{
                opacity: props.disabled ? 0.5 : 1.0,
              }}
            />

            <Typography fontSize={20}>{props.label}</Typography>
          </Box>
        </Button>
      </>
    </>
  );
}

export default function Main(): JSX.Element {
  usePageEffect({ title: "아비디" });

  const { commonStore, canvasStore } = React.useContext(AppContext);
  const navigate = useNavigate();

  return useObserver(() => (
    <>
      <Box
        sx={{
          mb: 10,
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: "flex",
                // flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",

                height: 60,
              }}
            >
              <Button
                color="inherit"
                variant="text"
                onClick={() => {
                  window.open("https://www.aibici.co.kr");
                }}
                sx={{
                  color: "text.secondary",
                  fontSize: 18,
                }}
              >
                아비치
              </Button>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Button
                  color="inherit"
                  variant="text"
                  sx={{
                    color: "text.secondary",
                    fontSize: 18,
                  }}
                >
                  내디자인
                </Button>
                <Button
                  color="inherit"
                  variant="text"
                  sx={{
                    ml: "40px",

                    color: "text.secondary",
                    fontSize: 18,
                  }}
                >
                  로그인
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>

        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              height: 133,
            }}
          >
            <img
              src="/resources/logo.svg"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/");
              }}
            />
          </Box>

          <Box
            sx={{
              // width: 400,

              borderTop: 1,
              borderColor: "divider",

              display: "flex",

              py: "28px",
            }}
          >
            <TabNavigator image="/resources/papercup.svg" label="종이컵" />
            <TabNavigator
              disabled
              image="/resources/tissue.svg"
              label="각티슈"
            />
          </Box>

          <Box
            sx={{
              mt: "7px",

              // p: 3,

              // border: 1,
              // borderColor: "divider",
              borderRadius: "1rem",
            }}
          >
            <TabPanel value={0} index={0}>
              <Box>
                <Box
                  sx={{
                    bgcolor: "whitesmoke",
                    borderRadius: "1rem",

                    display: "flex",

                    height: 432,

                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: 432,
                    }}
                  >
                    <Swiper
                      autoplay={{
                        delay: 5000,
                        // disableOnInteraction: true,
                      }}
                      spaceBetween={84}
                      slidesPerView={1}
                      centeredSlides={true}
                      keyboard={true}
                      pagination={{
                        clickable: true,
                      }}
                      loopedSlides={true}
                      mousewheel={true}
                      scrollbar={{ draggable: true }}
                    >
                      <SwiperSlide
                        style={{
                          background: "transparent",

                          width: 432,
                          height: 432,
                        }}
                      >
                        <img
                          src={"/dp/papercup/01.jpg"}
                          style={{
                            borderRadius: "1rem",
                          }}
                        />
                      </SwiperSlide>

                      <SwiperSlide
                        style={{
                          background: "transparent",

                          width: 432,
                          height: 432,
                        }}
                      >
                        <img
                          src={"/dp/papercup/02.jpeg"}
                          style={{
                            borderRadius: "1rem",
                          }}
                        />
                      </SwiperSlide>

                      <SwiperSlide
                        style={{
                          background: "transparent",

                          width: 432,
                          height: 432,
                        }}
                      >
                        <img
                          src={"/dp/papercup/03.jpg"}
                          style={{
                            borderRadius: "1rem",
                          }}
                        />
                      </SwiperSlide>

                      <SwiperSlide
                        style={{
                          background: "transparent",

                          width: 432,
                          height: 432,
                        }}
                      >
                        <img
                          src={"/dp/papercup/04.jpeg"}
                          style={{
                            borderRadius: "1rem",
                          }}
                        />
                      </SwiperSlide>

                      <SwiperSlide
                        style={{
                          background: "transparent",

                          width: 432,
                          height: 432,
                        }}
                      >
                        <img
                          src={"/dp/papercup/05.jpg"}
                          style={{
                            borderRadius: "1rem",
                          }}
                        />
                      </SwiperSlide>

                      <SwiperSlide
                        style={{
                          background: "transparent",

                          width: 432,
                          height: 432,
                        }}
                      >
                        <img
                          src={"/dp/papercup/06.jpg"}
                          style={{
                            borderRadius: "1rem",
                          }}
                        />
                      </SwiperSlide>

                      <SwiperSlide
                        style={{
                          background: "transparent",

                          width: 432,
                          height: 432,
                        }}
                      >
                        <img
                          src={"/dp/papercup/07.jpg"}
                          style={{
                            borderRadius: "1rem",
                          }}
                        />
                      </SwiperSlide>

                      <SwiperSlide
                        style={{
                          background: "transparent",

                          width: 432,
                          height: 432,
                        }}
                      >
                        <img
                          src={"/dp/papercup/08.jpg"}
                          style={{
                            borderRadius: "1rem",
                          }}
                        />
                      </SwiperSlide>

                      <SwiperSlide
                        style={{
                          background: "transparent",

                          width: 432,
                          height: 432,
                        }}
                      >
                        <img
                          src={"/dp/papercup/09.jpeg"}
                          style={{
                            borderRadius: "1rem",
                          }}
                        />
                      </SwiperSlide>

                      <SwiperSlide
                        style={{
                          background: "transparent",

                          width: 432,
                          height: 432,
                        }}
                      >
                        <img
                          src={"/dp/papercup/10.jpg"}
                          style={{
                            borderRadius: "1rem",
                          }}
                        />
                      </SwiperSlide>
                    </Swiper>
                  </Box>

                  <Box
                    sx={{
                      width: 768,

                      p: "34px",

                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",

                        top: -100,
                        right: -100,
                      }}
                    >
                      <img src="/resources/pencil.svg" width={150} />
                    </Box>

                    <Box
                      sx={{
                        borderBottom: 1,
                        borderColor: "divider",

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",

                        pb: "16px",
                      }}
                    >
                      <Typography fontSize={20} fontWeight={700}>
                        나만의 종이컵을 제작해 보세요!
                      </Typography>

                      <BigButton
                        variant="contained"
                        onClick={() => {
                          // window.open(
                          //   `/editor/${canvasStore.templateInfo.type}/${canvasStore.templateInfo.index}`,
                          // );

                          commonStore.setModalInfo({
                            ...commonStore.modalInfo,

                            make: true,
                          });
                        }}
                        sx={{
                          ml: 3,
                        }}
                      >
                        제작하기
                      </BigButton>
                    </Box>

                    <Box
                      sx={{
                        mt: "30px",

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",

                        pb: "29px",
                      }}
                    >
                      <Typography fontSize={18} fontWeight={500}>
                        템플릿을 눌러 무료로 구경해보세요!
                      </Typography>

                      <Link color="text.secondary" fontSize={14} href="/">
                        더보기
                      </Link>
                    </Box>

                    <Grid container spacing={2}>
                      {new Array(8).fill(null).map((v, i) => (
                        <Grid key={i} item xs={3}>
                          <Button
                            sx={{
                              background:
                                i === 0
                                  ? `url("/templates/papercup/${i}.svg")`
                                  : "#DBDBDB",
                              backgroundSize: "400px",
                              backgroundPosition: "45%",

                              p: 0,
                              borderRadius: "4px",
                              position: "relative",

                              width: "100%",
                              height: 100,
                            }}
                            fullWidth
                            onClick={() => {
                              canvasStore.setTemplateInfo({
                                ...canvasStore.templateInfo,

                                index: i,
                              });
                            }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                              }}
                            >
                              <Checkbox
                                checked={canvasStore.templateInfo.index === i}
                              />
                            </Box>
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </TabPanel>
          </Box>
        </Container>
      </Box>

      <Footer />

      <MakeModal />
    </>
  ));
}
