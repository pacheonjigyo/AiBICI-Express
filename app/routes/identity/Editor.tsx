import * as React from "react";
import Image from "../../common/Image.js";
import EditorCore from "./EditorCore.js";

import {
  Add,
  AutoAwesome,
  AutoAwesomeOutlined,
  BorderAll,
  DeleteOutline,
  EditOutlined,
  FormatAlignCenter,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  ImageOutlined,
  InterestsOutlined,
  LayersOutlined,
  LockOpenOutlined,
  LockOutlined,
  Refresh,
  ShapeLine,
  TextFieldsOutlined,
} from "@mui/icons-material";

import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Slider,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { useObserver } from "mobx-react";
import { useNavigate, useParams } from "react-router-dom";
import { BigButton } from "../../common/BigButton.js";
import { CanvasEditor } from "../../common/CanvasEditor.js";
import { Cover } from "../../common/Cover.js";
import { readAsDataURLAsync } from "../../common/FileManager.js";
import { uploadToS3 } from "../../common/FileUpload.js";
import { hasKorean } from "../../common/Functions.js";
import { EngineGateway } from "../../common/Gateway.js";
import { useHorizontalScroll } from "../../common/HorizontalScroll.js";
import { papagoTranslation } from "../../common/Translator.js";
import { usePageEffect } from "../../core/page.js";
import { fontList } from "../../data/fontList.js";
import { EditorAlignPopOver } from "../../layout/popover/EditorAlignPopOver.js";
import { EditorPlacePopOver } from "../../layout/popover/EditorPlacePopOver.js";
import { AppContext } from "../../stores/index.js";
import Preview from "./Preview.js";

export default function Editor(props: any): JSX.Element {
  const { index, type } = useParams();

  const scrollRef1 = useHorizontalScroll();
  const scrollRef2 = useHorizontalScroll();
  const scrollRef3 = useHorizontalScroll();

  const theme = useTheme();

  const placeRef = React.useRef(null);
  const alignRef = React.useRef(null);

  const { commonStore, canvasStore } = React.useContext(AppContext);

  const navigate = useNavigate();

  usePageEffect({
    // title: wordList["소개"][commonStore.appInfo.language],
    title: "종이컵 제작",
  });

  let test = 0;

  React.useEffect(() => {
    test++;

    if (test === 2) {
      return;
    }

    const editor = new CanvasEditor(commonStore, canvasStore);

    editor.init(type, index);

    canvasStore.setCanvas(editor);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      <Box
        sx={{
          height: commonStore.baseInfo.height,
        }}
      >
        <Box
          sx={{
            height: 60,

            borderBottom: 1,
            borderColor: "divider",

            display: "flex",
          }}
        >
          <Box
            sx={{
              width: commonStore.baseInfo.width,

              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid container padding={2}>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src="/resources/logo.svg"
                  style={{
                    cursor: "pointer",
                  }}
                  height={33}
                  onClick={() => {
                    navigate("/");
                  }}
                />

                {/* <Typography
                  fontSize={11}
                  fontWeight="bold"
                  sx={{
                    mr: 1,
                  }}
                >
                  확대/축소
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1,
                  }}
                >
                  <IconButton
                    disabled
                    color="info"
                    size="small"
                    onClick={async () => {
                      canvasStore.canvas.zoomOut();
                      canvasStore.updateZoom();
                    }}
                  >
                    <RemoveCircle />
                  </IconButton>
                  <Typography fontSize={11} fontWeight="bold">
                    {canvasStore.canvasPreview} %
                  </Typography>
                  <IconButton
                    disabled
                    color="info"
                    size="small"
                    onClick={async () => {
                      canvasStore.canvas.zoomIn();
                      canvasStore.updateZoom();
                    }}
                  >
                    <AddCircle />
                  </IconButton>
                </Box>

                <Typography
                  fontSize={11}
                  fontWeight="bold"
                  sx={{
                    ml: 3,
                    mr: 1,
                  }}
                >
                  작업
                </Typography> */}
              </Grid>

              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></Grid>

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
                  // color="secondary"
                  variant="contained"
                  onClick={async () => {
                    const data = canvasStore.canvas.convertToSVG();

                    // Blob 생성
                    const blob = new Blob([data], {
                      type: "image/svg+xml",
                    });

                    // URL 생성
                    const url = URL.createObjectURL(blob);

                    // 링크 생성
                    const a = document.createElement("a");
                    a.href = url;
                    a.download =
                      canvasStore.cupSize === 0
                        ? "cup_65.svg"
                        : canvasStore.cupSize === 1
                        ? "cup_100.svg"
                        : canvasStore.cupSize === 2
                        ? "cup_130.svg"
                        : "cup_160.svg"; // 다운로드될 파일의 이름 지정

                    // 링크를 클릭하여 다운로드 실행
                    document.body.appendChild(a);
                    a.click();

                    // 사용이 끝난 URL 및 링크 삭제
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    console.log(data);
                  }}
                >
                  SVG 다운로드
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            position: "relative",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: commonStore.baseInfo.height - 60,
            }}
          >
            <Box
              className="hideScroll"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                height: "100%",

                overflowY: "auto",
                width: 60,

                borderRight: 1,
                borderColor: "divider",
              }}
            >
              <Box
                sx={{
                  height: commonStore.baseInfo.height - 60,
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    my: 2,
                  }}
                >
                  <Button
                    color={canvasStore.logoMenu === 0 ? "primary" : "inherit"}
                    variant={canvasStore.logoMenu === 0 ? "text" : "text"}
                    sx={{
                      minWidth: 60,
                      height: 60,

                      borderRadius: 0,

                      p: 0,
                    }}
                    onClick={() => {
                      canvasStore.setLogoMenu(0);
                      canvasStore.canvas.setFocusOff();
                    }}
                  >
                    <Box>
                      <EditOutlined />

                      <Typography fontSize={11} fontWeight="bold">
                        디자인
                      </Typography>
                    </Box>
                  </Button>
                </Box>

                <Box
                  sx={{
                    width: 60,
                    mb: 2,
                  }}
                >
                  <Button
                    color={canvasStore.logoMenu === 1 ? "primary" : "inherit"}
                    variant={canvasStore.logoMenu === 1 ? "text" : "text"}
                    sx={{
                      minWidth: 60,
                      height: 60,

                      borderRadius: 0,

                      p: 0,
                    }}
                    onClick={() => {
                      canvasStore.setLogoMenu(1);
                      canvasStore.canvas.setFocusOff();
                    }}
                  >
                    <Box>
                      <ImageOutlined />

                      <Typography fontSize={11} fontWeight="bold">
                        이미지
                      </Typography>
                    </Box>
                  </Button>
                </Box>

                <Box
                  sx={{
                    width: 60,
                    mb: 2,
                  }}
                >
                  <Button
                    color={canvasStore.logoMenu === 2 ? "primary" : "inherit"}
                    variant={canvasStore.logoMenu === 2 ? "text" : "text"}
                    sx={{
                      minWidth: 60,
                      height: 60,

                      borderRadius: 0,

                      p: 0,
                    }}
                    onClick={() => {
                      canvasStore.setLogoMenu(2);
                      canvasStore.canvas.setFocusOff();
                    }}
                  >
                    <Box>
                      <InterestsOutlined />

                      <Typography fontSize={11} fontWeight="bold">
                        도형
                      </Typography>
                    </Box>
                  </Button>
                </Box>

                <Box
                  sx={{
                    width: 60,
                    mb: 2,
                  }}
                >
                  <Button
                    color={canvasStore.logoMenu === 3 ? "primary" : "inherit"}
                    variant={canvasStore.logoMenu === 3 ? "text" : "text"}
                    sx={{
                      minWidth: 60,
                      height: 60,

                      borderRadius: 0,

                      p: 0,
                    }}
                    onClick={() => {
                      canvasStore.setLogoMenu(3);
                      canvasStore.canvas.setFocusOff();
                    }}
                  >
                    <Box>
                      <TextFieldsOutlined />

                      <Typography fontSize={11} fontWeight="bold">
                        텍스트
                      </Typography>
                    </Box>
                  </Button>
                </Box>

                <Box
                  sx={{
                    width: 60,
                    mb: 2,
                  }}
                >
                  <Button
                    color={canvasStore.logoMenu === 4 ? "primary" : "inherit"}
                    variant={canvasStore.logoMenu === 4 ? "text" : "text"}
                    sx={{
                      minWidth: 60,
                      height: 60,

                      borderRadius: 0,

                      p: 0,
                    }}
                    onClick={() => {
                      canvasStore.setLogoMenu(4);
                      canvasStore.canvas.setFocusOff();
                    }}
                  >
                    <Box>
                      <AutoAwesome />

                      <Typography fontSize={11} fontWeight="bold">
                        AI 툴
                      </Typography>
                    </Box>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box
              className="hideScroll"
              sx={{
                display: canvasStore.logoMenu === 5 ? "none" : "unset",
                // bgcolor: "#ebebeb",
                // borderRight: 1,
                // borderColor: "divider",

                width: 320,
                height: commonStore.baseInfo.height - 60,
                overflowY: "scroll",
              }}
            >
              {(canvasStore.logoMenu === 1 ||
                canvasStore.logoMenu === 2 ||
                canvasStore.logoMenu === 3) &&
              canvasStore.layerCurrentId > -1 ? (
                <>
                  <Box
                    sx={{
                      px: 3,
                      pt: 3,
                      pb: 0,
                    }}
                  >
                    <Typography
                      fontSize={16}
                      fontWeight="bold"
                      sx={{
                        mb: 3,
                      }}
                    >
                      {canvasStore.layers[canvasStore.layerCurrentId]?.type ===
                      "image"
                        ? "이미지"
                        : canvasStore.layers[canvasStore.layerCurrentId]
                            ?.type === "i-text"
                        ? "텍스트"
                        : "도형"}
                    </Typography>

                    <Box sx={{}}>
                      <Typography
                        fontSize={12}
                        fontWeight="bold"
                        sx={{
                          mb: 1,
                        }}
                      >
                        개체 설정
                      </Typography>

                      <Grid container spacing={1}>
                        <Grid item xs={4}>
                          <Button
                            disabled={canvasStore.layerCurrentId < 0}
                            color={
                              canvasStore.layers[canvasStore.layerCurrentId]
                                ?.locked
                                ? "primary"
                                : "inherit"
                            }
                            variant="contained"
                            fullWidth
                            sx={{
                              p: 0,
                            }}
                            onClick={() => {
                              canvasStore.canvas.setLocked(
                                canvasStore.layers[canvasStore.layerCurrentId]
                                  ?.id,
                              );
                            }}
                          >
                            <Box
                              sx={{
                                p: 1,
                                width: "100%",
                                height: 80,
                              }}
                            >
                              <Box>
                                {canvasStore.layers[canvasStore.layerCurrentId]
                                  ?.locked ? (
                                  <LockOutlined />
                                ) : (
                                  <LockOpenOutlined />
                                )}
                              </Box>

                              <Divider
                                sx={{
                                  mb: 1,
                                }}
                              />

                              <Box
                                sx={{
                                  fontSize: 12,
                                }}
                              >
                                {canvasStore.layers[canvasStore.layerCurrentId]
                                  ?.locked
                                  ? "보호중"
                                  : "보호"}
                              </Box>
                            </Box>
                          </Button>
                        </Grid>

                        <Grid
                          item
                          xs={4}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            ref={placeRef}
                            disabled={canvasStore.layerCurrentId < 0}
                            color="inherit"
                            variant="contained"
                            fullWidth
                            sx={{
                              p: 0,
                            }}
                            onClick={() => {
                              canvasStore.setPlacePopOver(true);
                            }}
                          >
                            <Box
                              sx={{
                                p: 1,
                                width: "100%",
                                height: 80,
                              }}
                            >
                              <Box>
                                <LayersOutlined />
                              </Box>

                              <Divider
                                sx={{
                                  mb: 1,
                                }}
                              />

                              <Box
                                sx={{
                                  fontSize: 12,
                                }}
                              >
                                배치
                              </Box>
                            </Box>
                          </Button>
                        </Grid>

                        <Grid
                          item
                          xs={4}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            ref={alignRef}
                            disabled={true}
                            color="inherit"
                            variant="contained"
                            fullWidth
                            sx={{
                              p: 0,
                            }}
                            onClick={() => {
                              canvasStore.setAlignPopOver(true);
                            }}
                          >
                            <Box
                              sx={{
                                p: 1,
                                width: "100%",
                                height: 80,
                              }}
                            >
                              <Box>
                                <FormatAlignCenter />
                              </Box>

                              <Divider
                                sx={{
                                  mb: 1,
                                }}
                              />

                              <Box
                                sx={{
                                  fontSize: 12,
                                }}
                              >
                                정렬
                              </Box>
                            </Box>
                          </Button>
                        </Grid>

                        {canvasStore.layers[canvasStore.layerCurrentId]
                          ?.type === "image" ? null : (
                          <Grid
                            item
                            xs={4}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              disabled={canvasStore.layerCurrentId < 0}
                              color={
                                canvasStore.layers[canvasStore.layerCurrentId]
                                  ?.stroke
                                  ? "primary"
                                  : "inherit"
                              }
                              variant="contained"
                              fullWidth
                              sx={{
                                p: 0,
                              }}
                              onClick={() => {
                                canvasStore.canvas.setStroke(
                                  canvasStore.layers[canvasStore.layerCurrentId]
                                    ?.id,
                                );
                              }}
                            >
                              <Box
                                sx={{
                                  p: 1,
                                  width: "100%",
                                  height: 80,
                                }}
                              >
                                <Box>
                                  <BorderAll />
                                </Box>

                                <Divider
                                  sx={{
                                    mb: 1,
                                  }}
                                />

                                <Box
                                  sx={{
                                    fontSize: 12,
                                  }}
                                >
                                  테두리
                                </Box>
                              </Box>
                            </Button>
                          </Grid>
                        )}

                        {canvasStore.layers[canvasStore.layerCurrentId]
                          ?.type === "image" ? (
                          <Grid
                            item
                            xs={4}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              disabled={canvasStore.layerCurrentId < 0}
                              variant="contained"
                              color={
                                canvasStore.layers[canvasStore.layerCurrentId]
                                  ?.morph === "rectangle"
                                  ? "inherit"
                                  : "primary"
                              }
                              fullWidth
                              sx={{
                                p: 0,
                              }}
                              onClick={() => {
                                switch (
                                  canvasStore.layers[canvasStore.layerCurrentId]
                                    ?.morph
                                ) {
                                  case "rectangle": {
                                    canvasStore.canvas.setLogoShape(
                                      canvasStore.layers[
                                        canvasStore.layerCurrentId
                                      ]?.id,
                                      "circle",
                                    );

                                    break;
                                  }

                                  case "circle": {
                                    canvasStore.canvas.setLogoShape(
                                      canvasStore.layers[
                                        canvasStore.layerCurrentId
                                      ]?.id,
                                      "triangle",
                                    );

                                    break;
                                  }

                                  case "triangle": {
                                    canvasStore.canvas.setLogoShape(
                                      canvasStore.layers[
                                        canvasStore.layerCurrentId
                                      ]?.id,
                                      "heart",
                                    );

                                    break;
                                  }

                                  case "heart": {
                                    canvasStore.canvas.setLogoShape(
                                      canvasStore.layers[
                                        canvasStore.layerCurrentId
                                      ]?.id,
                                      "rectangle",
                                    );

                                    break;
                                  }
                                }
                              }}
                            >
                              <Box
                                sx={{
                                  p: 1,
                                  width: "100%",
                                  height: 80,
                                }}
                              >
                                <Box>
                                  <ShapeLine />
                                </Box>

                                <Divider
                                  sx={{
                                    mb: 1,
                                  }}
                                />

                                <Box
                                  sx={{
                                    fontSize: 12,
                                  }}
                                >
                                  {canvasStore.layerCurrentId < 0
                                    ? "변형"
                                    : canvasStore.layers[
                                        canvasStore.layerCurrentId
                                      ]?.morph === "circle"
                                    ? "원"
                                    : canvasStore.layers[
                                        canvasStore.layerCurrentId
                                      ]?.morph === "triangle"
                                    ? "삼각형"
                                    : canvasStore.layers[
                                        canvasStore.layerCurrentId
                                      ]?.morph === "heart"
                                    ? "하트"
                                    : "변형"}
                                </Box>
                              </Box>
                            </Button>
                          </Grid>
                        ) : null}

                        {canvasStore.layers[canvasStore.layerCurrentId]
                          ?.type === "image" ? (
                          <Grid
                            item
                            xs={4}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              disabled={
                                canvasStore.layerCurrentId < 0 ||
                                canvasStore.layers[canvasStore.layerCurrentId]
                                  ?.backgroundRemoved
                              }
                              variant="contained"
                              color="inherit"
                              fullWidth
                              sx={{
                                p: 0,
                              }}
                              onClick={() => {
                                canvasStore.canvas.setImageRemoveBackground(
                                  canvasStore.layers[canvasStore.layerCurrentId]
                                    ?.id,
                                );
                              }}
                            >
                              <Box
                                sx={{
                                  p: 1,
                                  width: "100%",
                                  height: 80,
                                }}
                              >
                                {canvasStore.layers[canvasStore.layerCurrentId]
                                  ?.backgroundRemoved ? (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      height: 64,
                                    }}
                                  >
                                    <CircularProgress
                                      color="primary"
                                      size="2rem"
                                    />
                                  </Box>
                                ) : (
                                  <>
                                    <Box>
                                      <AutoAwesomeOutlined />
                                    </Box>

                                    <Divider
                                      sx={{
                                        mb: 1,
                                      }}
                                    />

                                    <Box
                                      sx={{
                                        fontSize: 12,
                                      }}
                                    >
                                      배경제거
                                    </Box>
                                  </>
                                )}
                              </Box>
                            </Button>
                          </Grid>
                        ) : null}

                        <Grid
                          item
                          xs={4}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            disabled={
                              canvasStore.layerCurrentId < 0 ||
                              canvasStore.layers[canvasStore.layerCurrentId]
                                ?.backgroundRemoved
                            }
                            variant="contained"
                            color="inherit"
                            fullWidth
                            sx={{
                              p: 0,
                            }}
                            onClick={() => {
                              canvasStore.canvas.removeObject(
                                canvasStore.layers[canvasStore.layerCurrentId]
                                  ?.id,
                              );
                            }}
                          >
                            <Box
                              sx={{
                                p: 1,
                                width: "100%",
                                height: 80,
                              }}
                            >
                              <Box>
                                <DeleteOutline />
                              </Box>

                              <Divider
                                sx={{
                                  mb: 1,
                                }}
                              />

                              <Box
                                sx={{
                                  fontSize: 12,
                                }}
                              >
                                삭제
                              </Box>
                            </Box>
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </>
              ) : null}

              {canvasStore.group ||
              canvasStore.layerCurrentId > -1 ||
              canvasStore.layerCurrentId === -1 ? (
                <Box>
                  <Box>
                    {canvasStore.logoMenu === 1 && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          p: 3,
                        }}
                      >
                        <Typography fontSize={12} fontWeight="bold">
                          이미지 업로드
                        </Typography>

                        <Button
                          component="label"
                          color="inherit"
                          variant="contained"
                          // fullWidth
                          sx={{
                            fontSize: 12,
                          }}
                          endIcon={<Add />}
                        >
                          파일 업로드
                          <input
                            type="file"
                            hidden
                            onChange={async (e: any) => {
                              const file = e.target.files[0];

                              if (!file) {
                                return;
                              }

                              const base64: any = await readAsDataURLAsync(
                                file,
                              );
                              const url: any = await uploadToS3(
                                base64.split(",")[1],
                                `test/images_${new Date().getTime()}`,
                                file.name.split(".")[1],
                                file.type,
                              );

                              canvasStore.canvas.createImage(url, true, null);
                            }}
                          />
                        </Button>
                      </Box>
                    )}

                    {canvasStore.logoMenu === 2 && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",

                          p: 3,
                        }}
                      >
                        <Typography
                          fontSize={12}
                          fontWeight="bold"
                          sx={{
                            mb: 1,
                          }}
                        >
                          도형 생성
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            color="inherit"
                            variant="contained"
                            fullWidth
                            sx={{
                              p: 0,
                            }}
                            onClick={() => {
                              canvasStore.canvas.createRect();
                            }}
                          >
                            <Box
                              sx={{
                                p: 1,
                                width: "100%",
                                height: 40,
                              }}
                            >
                              사각형
                            </Box>
                          </Button>

                          <Button
                            color="inherit"
                            variant="contained"
                            fullWidth
                            sx={{
                              ml: 1,
                              p: 0,
                            }}
                            onClick={() => {
                              canvasStore.canvas.createTriangle();
                            }}
                          >
                            <Box
                              sx={{
                                p: 1,
                                width: "100%",
                                height: 40,
                              }}
                            >
                              삼각형
                            </Box>
                          </Button>

                          <Button
                            color="inherit"
                            variant="contained"
                            fullWidth
                            sx={{
                              ml: 1,
                              p: 0,
                            }}
                            onClick={() => {
                              canvasStore.canvas.createOval();
                            }}
                          >
                            <Box
                              sx={{
                                p: 1,
                                width: "100%",
                                height: 40,
                              }}
                            >
                              원
                            </Box>
                          </Button>
                        </Box>

                        <Typography
                          fontSize={12}
                          fontWeight="bold"
                          sx={{
                            mt: 3,
                            mb: 1,
                          }}
                        >
                          라운드 설정
                        </Typography>

                        <Slider
                          aria-label="Default"
                          valueLabelDisplay="auto"
                          value={
                            canvasStore.layers[canvasStore.layerCurrentId]
                              ?.rounded
                          }
                          onChange={(e: any) => {
                            canvasStore.canvas.setRoundBorder(
                              canvasStore.layers[canvasStore.layerCurrentId]
                                ?.id,
                              e.target.value,
                            );
                          }}
                        />
                      </Box>
                    )}

                    {canvasStore.logoMenu === 3 && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",

                          px: 3,
                          pt: 0,
                          pb: 3,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",

                            mt: 3,
                            mb: 1,
                          }}
                        >
                          <Typography fontSize={12} fontWeight="bold">
                            텍스트 생성
                          </Typography>

                          <Button
                            variant="contained"
                            color="inherit"
                            onClick={() => {
                              canvasStore.canvas.createText(
                                canvasStore.textData,
                                "",
                              );
                            }}
                            endIcon={<Add />}
                          >
                            생성
                          </Button>
                        </Box>

                        <Cover>
                          <TextField
                            multiline
                            rows={3}
                            size="small"
                            fullWidth
                            value={canvasStore.textData}
                            onChange={(e) => {
                              canvasStore.setTextData(e.target.value);
                            }}
                            inputProps={{
                              style: {
                                fontSize: 12,
                              },
                            }}
                          />
                        </Cover>

                        <Typography
                          fontSize={12}
                          fontWeight="bold"
                          sx={{
                            mt: 3,
                            mb: 1,
                          }}
                        >
                          크기 설정
                        </Typography>

                        <Box
                          sx={{
                            bgcolor: "background.paper",
                          }}
                        >
                          <TextField
                            type="number"
                            fullWidth
                            size="small"
                            id="fontSize"
                            value={
                              canvasStore.layers[canvasStore.layerCurrentId]
                                ?.fontSize
                            }
                            onChange={(e) => {
                              canvasStore.canvas.setFontSize(
                                canvasStore.layers[canvasStore.layerCurrentId]
                                  ?.id,
                                e.target.value,
                              );
                            }}
                          />
                        </Box>

                        <Typography
                          fontSize={12}
                          fontWeight="bold"
                          sx={{
                            mt: 3,
                            mb: 1,
                          }}
                        >
                          폰트 설정
                        </Typography>

                        <Cover>
                          <Select
                            color="primary"
                            size="small"
                            fullWidth
                            sx={{
                              fontSize: 12,
                            }}
                            onChange={(e) => {
                              canvasStore.canvas.setFontFamily(
                                canvasStore.layers[canvasStore.layerCurrentId]
                                  ?.id,
                                e.target.value,
                              );
                            }}
                            value={
                              canvasStore.layers[canvasStore.layerCurrentId]
                                ?.fontFamily ?? ""
                            }
                          >
                            {fontList.map((v, i) => {
                              return (
                                <MenuItem key={i} value={v.value}>
                                  {v.nameKor}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </Cover>

                        <Typography
                          fontSize={12}
                          fontWeight="bold"
                          sx={{
                            mt: 3,
                            mb: 1,
                          }}
                        >
                          스타일 설정
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            color={
                              canvasStore.layers[canvasStore.layerCurrentId]
                                ?.fontBold
                                ? "primary"
                                : "inherit"
                            }
                            variant="contained"
                            fullWidth
                            sx={{
                              p: 0,
                            }}
                            onClick={() => {
                              canvasStore.canvas.setFontBold(
                                canvasStore.layers[canvasStore.layerCurrentId]
                                  ?.id,
                              );
                            }}
                          >
                            <Box
                              sx={{
                                p: 1,
                                width: "100%",
                                height: 40,
                              }}
                            >
                              <Box>
                                <FormatBold />
                              </Box>
                            </Box>
                          </Button>
                          <Button
                            color={
                              canvasStore.layers[canvasStore.layerCurrentId]
                                ?.fontStyle
                                ? "primary"
                                : "inherit"
                            }
                            variant="contained"
                            fullWidth
                            sx={{
                              ml: 1,

                              p: 0,
                            }}
                            onClick={() => {
                              canvasStore.canvas.setFontItalic(
                                canvasStore.layers[canvasStore.layerCurrentId]
                                  ?.id,
                              );
                            }}
                          >
                            <Box
                              sx={{
                                p: 1,
                                width: "100%",
                                height: 40,
                              }}
                            >
                              <Box>
                                <FormatItalic />
                              </Box>
                            </Box>
                          </Button>
                          <Button
                            color={
                              canvasStore.layers[canvasStore.layerCurrentId]
                                ?.fontUnderline
                                ? "primary"
                                : "inherit"
                            }
                            variant="contained"
                            fullWidth
                            sx={{
                              ml: 1,
                              p: 0,
                            }}
                            onClick={() => {
                              canvasStore.canvas.setFontUnderline(
                                canvasStore.layers[canvasStore.layerCurrentId]
                                  ?.id,
                              );
                            }}
                          >
                            <Box
                              sx={{
                                p: 1,
                                width: "100%",
                                height: 40,
                              }}
                            >
                              <Box>
                                <FormatUnderlined />
                              </Box>
                            </Box>
                          </Button>
                        </Box>
                      </Box>
                    )}

                    {(canvasStore.logoMenu === 1 ||
                      canvasStore.logoMenu === 2 ||
                      canvasStore.logoMenu === 3) && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",

                          p: 3,
                        }}
                      >
                        <Typography
                          fontSize={16}
                          fontWeight="bold"
                          sx={{
                            mb: 3,
                          }}
                        >
                          색상
                        </Typography>

                        <Typography
                          fontSize={12}
                          fontWeight="bold"
                          sx={{
                            mb: 1,
                          }}
                        >
                          배경색
                        </Typography>

                        <Box
                          sx={{
                            bgcolor: "#f5f5f5",
                            borderRadius: 1,

                            display: "flex",
                            alignItems: "center",

                            p: 1,
                          }}
                        >
                          <Button
                            component="label"
                            color="info"
                            variant="text"
                            sx={{
                              p: 0,
                              minWidth: 40,
                              height: 40,
                            }}
                          >
                            <div id="swatch" className="small">
                              <input
                                type="color"
                                id="color"
                                name="color"
                                value={
                                  canvasStore.layerCurrentId < 0
                                    ? "#ffffff"
                                    : canvasStore.layers[
                                        canvasStore.layerCurrentId
                                      ]?.colorMain
                                }
                                onInput={(
                                  e: React.ChangeEvent<HTMLInputElement>,
                                ) => {
                                  canvasStore.canvas.setMainColor(
                                    canvasStore.layers[
                                      canvasStore.layerCurrentId
                                    ]?.id,
                                    e.target.value,
                                  );
                                }}
                              />

                              <div className="info">
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Typography fontSize={12}>
                                    {
                                      canvasStore.layers[
                                        canvasStore.layerCurrentId
                                      ]?.colorMain
                                    }
                                  </Typography>
                                </Box>
                              </div>
                            </div>
                          </Button>
                        </Box>

                        <Typography
                          fontSize={12}
                          fontWeight="bold"
                          sx={{
                            mt: 3,
                            mb: 1,
                          }}
                        >
                          글자색
                        </Typography>

                        <Box
                          sx={{
                            bgcolor: "#f5f5f5",
                            borderRadius: 1,

                            display: "flex",
                            alignItems: "center",

                            p: 1,
                          }}
                        >
                          <Button
                            component="label"
                            color="info"
                            variant="text"
                            sx={{
                              p: 0,
                              minWidth: 40,
                              height: 40,
                            }}
                          >
                            <div id="swatch" className="small">
                              <input
                                type="color"
                                id="color"
                                name="color"
                                value={
                                  canvasStore.layerCurrentId < 0
                                    ? "#ffffff"
                                    : canvasStore.layers[
                                        canvasStore.layerCurrentId
                                      ]?.colorText
                                }
                                onInput={(
                                  e: React.ChangeEvent<HTMLInputElement>,
                                ) => {
                                  canvasStore.canvas.setTextColor(
                                    canvasStore.layers[
                                      canvasStore.layerCurrentId
                                    ]?.id,
                                    e.target.value,
                                  );
                                }}
                              />

                              <div className="info">
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Typography fontSize={12}>
                                    {
                                      canvasStore.layers[
                                        canvasStore.layerCurrentId
                                      ]?.colorText
                                    }
                                  </Typography>
                                </Box>
                              </div>
                            </div>
                          </Button>
                        </Box>

                        <Typography
                          fontSize={12}
                          fontWeight="bold"
                          sx={{
                            mt: 3,
                            mb: 1,
                          }}
                        >
                          테두리색
                        </Typography>

                        <Box
                          sx={{
                            bgcolor: "#f5f5f5",
                            borderRadius: 1,

                            display: "flex",
                            alignItems: "center",

                            p: 1,
                          }}
                        >
                          <Button
                            component="label"
                            color="info"
                            variant="text"
                            sx={{
                              p: 0,
                              minWidth: 40,
                              height: 40,
                            }}
                          >
                            <div id="swatch" className="small">
                              <input
                                type="color"
                                id="color"
                                name="color"
                                value={
                                  canvasStore.layerCurrentId < 0
                                    ? "#ffffff"
                                    : canvasStore.layers[
                                        canvasStore.layerCurrentId
                                      ]?.colorSub
                                }
                                onInput={(
                                  e: React.ChangeEvent<HTMLInputElement>,
                                ) => {
                                  canvasStore.canvas.setSubColor(
                                    canvasStore.layers[
                                      canvasStore.layerCurrentId
                                    ]?.id,
                                    e.target.value,
                                  );
                                }}
                              />

                              <div className="info">
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Typography fontSize={12}>
                                    {
                                      canvasStore.layers[
                                        canvasStore.layerCurrentId
                                      ]?.colorSub
                                    }
                                  </Typography>
                                </Box>
                              </div>
                            </div>
                          </Button>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
              ) : null}

              {canvasStore.logoMenu === 0 ? (
                <Box
                  sx={{
                    p: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      mb: 1,
                    }}
                  >
                    <Typography
                      fontSize={16}
                      fontWeight="bold"
                      sx={{
                        mb: 3,
                      }}
                    >
                      템플릿
                    </Typography>

                    {/* <Typography
                      fontSize={12}
                      fontWeight="bold"
                      sx={{
                        mb: 1,
                      }}
                    >
                      기본 템플릿
                    </Typography>

                    <Paper
                      variant="outlined"
                      ref={scrollRef3}
                      sx={{
                        bgcolor: "background.paper",
                        width: "100%",
                        height: 100,
                        whiteSpace: "nowrap",
                        overflowX: "auto",

                        p: 1,

                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        {libraryDataStore.libraryData
                          ? libraryDataStore.libraryData.pagination.map(
                              (v: any, i: number) => {
                                return (
                                  <Image
                                    key={i}
                                    src={v.selectLogo}
                                    width={"100%"}
                                    alt="test"
                                    style={{
                                      border: "1px solid lightgray",
                                      cursor: "pointer",

                                      width: 65,
                                      height: 65,
                                      objectFit: "cover",

                                      marginRight: 8,
                                    }}
                                    onClick={async () => {
                                      canvasStore.canvas.createImage(
                                        v.selectLogo,
                                        true,
                                        null,
                                      );
                                    }}
                                  />
                                );
                              },
                            )
                          : null}
                      </Box>
                    </Paper> */}
                  </Box>
                </Box>
              ) : canvasStore.logoMenu === 4 ? (
                <Box sx={{}}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      p: 3,
                    }}
                  >
                    <Typography
                      fontSize={16}
                      fontWeight="bold"
                      sx={{
                        mb: 3,
                      }}
                    >
                      AI 이미지 만들기
                    </Typography>

                    <Paper
                      variant="outlined"
                      sx={{
                        bgcolor: "whitesmoke",
                        p: 1,
                        mb: 3,
                      }}
                    >
                      <Typography fontSize={12}>
                        아래 입력창에 키워드를 입력하여 필요한 일러스트를
                        생성해보세요.
                      </Typography>
                    </Paper>

                    <Box
                      sx={{
                        mb: 1,
                      }}
                    >
                      <Cover>
                        <TextField
                          disabled={canvasStore.drawingData.loading}
                          color="primary"
                          label="키워드"
                          fullWidth
                          size="small"
                          onChange={(e) => {
                            canvasStore.setDrawingData({
                              ...canvasStore.drawingData,

                              prompt: e.target.value,
                            });
                          }}
                          value={canvasStore.drawingData.prompt}
                          InputLabelProps={{
                            style: {
                              fontSize: 12,
                            },
                          }}
                          inputProps={{
                            style: {
                              fontSize: 12,
                            },
                          }}
                        />
                      </Cover>

                      <Button
                        disabled={canvasStore.drawingData.loading}
                        color="inherit"
                        sx={{
                          mt: 1,
                        }}
                        onClick={async () => {
                          canvasStore.setDrawingData({
                            ...canvasStore.drawingData,

                            data: "",
                            loading: true,
                          });

                          let prompt = canvasStore.drawingData.prompt;

                          if (hasKorean(prompt)) {
                            prompt = await papagoTranslation(
                              "ko",
                              "en",
                              prompt,
                            );
                          }

                          const output = await EngineGateway({
                            query: "logo/v1",
                            method: "POST",
                            data: {
                              category: "Stable-Diffusion-v1.5",
                              num_images: "4",
                              num_inference_steps: "50",
                              engine: "test_v2",
                              prompt: `${prompt} illustration`,
                              pixel_resolution: "512",
                              compression_format: "PNG",
                            },
                            auth: false,
                          });

                          canvasStore.setDrawingData({
                            ...canvasStore.drawingData,

                            data: output.result.predictions,
                            loading: false,
                          });
                        }}
                        variant="contained"
                        fullWidth
                      >
                        {canvasStore.drawingData.loading ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <CircularProgress size="0.8rem" color="inherit" />
                            &nbsp; 생성 중...
                          </Box>
                        ) : (
                          "AI 일러스트 생성"
                        )}
                      </Button>
                    </Box>

                    {canvasStore.drawingData.data ? (
                      <>
                        <Paper
                          variant="outlined"
                          sx={{
                            bgcolor: "whitesmoke",
                            p: 1,
                            mb: 1,
                          }}
                        >
                          <Typography
                            fontSize={12}
                            sx={{
                              mb: 1,
                            }}
                          >
                            일러스트 선택 후 [로고에 넣기] 버튼을 클릭해주세요.
                          </Typography>

                          <Grid container>
                            {canvasStore.drawingData.data.map((v, i) => {
                              return (
                                <Grid key={i} xs={6}>
                                  <Image
                                    src={v}
                                    width={"100%"}
                                    style={{
                                      border:
                                        canvasStore.drawingData.selected === i
                                          ? "2px solid #8265ff"
                                          : "2px solid white",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      canvasStore.setDrawingData({
                                        ...canvasStore.drawingData,

                                        selected: i,
                                      });
                                    }}
                                  />
                                </Grid>
                              );
                            })}
                          </Grid>

                          <Button
                            disabled={canvasStore.drawingData.loading}
                            color="primary"
                            onClick={async () => {
                              canvasStore.canvas.createImage(
                                canvasStore.drawingData.data[
                                  canvasStore.drawingData.selected
                                ],
                                true,
                                null,
                              );
                            }}
                            variant="contained"
                            fullWidth
                            sx={{
                              mt: 1,
                            }}
                          >
                            로고에 넣기
                          </Button>
                        </Paper>
                      </>
                    ) : null}
                  </Box>
                </Box>
              ) : null}
            </Box>
          </Box>

          <EditorCore />

          <Box
            sx={{
              display: canvasStore.drawer ? "" : "none", // 수정
            }}
          >
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                // bgcolor: "#ebebeb",

                width: 420,
                height: commonStore.baseInfo.height - 236,

                overflowY: "auto",
              }}
            >
              <Box
                sx={{
                  height: 405,
                }}
              >
                <Preview />
              </Box>

              <Box
                sx={{
                  p: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography fontSize={16} fontWeight="bold">
                    미리보기
                  </Typography>

                  <IconButton
                    variant="contained"
                    size="small"
                    onClick={() => {
                      canvasStore.canvas.updateMaterial();
                    }}
                    sx={{
                      mr: 1,
                    }}
                  >
                    <Refresh />
                  </IconButton>
                </Box>
              </Box>

              <Box
                sx={{
                  p: 3,
                }}
              >
                <Typography fontSize={16} fontWeight="bold">
                  컵 사이즈
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "background.paper",

                    mt: 1,
                    mb: 3,
                  }}
                >
                  <Select
                    fullWidth
                    value={canvasStore.cupSize}
                    onChange={(e) => {
                      const accept = confirm(
                        "작업 중인 내용이 사라집니다. 변경하시겠습니까?",
                      );

                      if (!accept) {
                        return;
                      }

                      const value = Number(e.target.value);

                      canvasStore.setCupSize(value);
                      canvasStore.canvas.init(type, index);
                    }}
                  >
                    <MenuItem value={0}>종이컵 6.5 온스</MenuItem>
                    <MenuItem value={1}>종이컵 10 온스</MenuItem>
                    <MenuItem value={2}>종이컵 13 온스</MenuItem>
                    <MenuItem value={3}>종이컵 16 온스</MenuItem>
                  </Select>
                </Box>

                <Typography fontSize={16} fontWeight="bold">
                  뚜껑
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "background.paper",

                    mt: 1,
                    mb: 3,
                  }}
                >
                  <Select fullWidth defaultValue={0}>
                    <MenuItem value={0}>없음</MenuItem>
                    <MenuItem value={1}>일반형 뚜껑</MenuItem>
                  </Select>
                </Box>

                <Typography fontSize={16} fontWeight="bold">
                  수량
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "background.paper",

                    mt: 1,
                    mb: 3,
                  }}
                >
                  <Select fullWidth defaultValue={1000}>
                    <MenuItem value={1000}>1000</MenuItem>
                    <MenuItem value={2000}>2000</MenuItem>
                    <MenuItem value={3000}>3000</MenuItem>
                    <MenuItem value={4000}>4000</MenuItem>
                    <MenuItem value={5000}>5000</MenuItem>
                  </Select>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                p: 3,
              }}
            >
              <BigButton
                color="primary"
                variant="contained"
                fullWidth
                sx={{
                  mb: 1,
                }}
                onClick={() => {
                  const accept = confirm("작업물 의뢰를 요청하시겠습니까?");

                  if (!accept) {
                    return;
                  }
                }}
              >
                의뢰하기
              </BigButton>

              <BigButton
                fullWidth
                color="inherit"
                variant="contained"
                size="small"
                onClick={async () => {
                  window.open(
                    "https://smartstore.naver.com/pudle/products/9490925771",
                  );
                }}
              >
                스토어 바로가기
              </BigButton>
            </Box>
          </Box>
        </Box>
      </Box>

      <EditorPlacePopOver placeRef={placeRef} />
      <EditorAlignPopOver alignRef={alignRef} />
    </>
  ));
}
