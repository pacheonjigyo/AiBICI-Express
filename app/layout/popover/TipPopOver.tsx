import * as React from "react";
import Image from "../../common/Image.js";

import { Close, Info } from "@mui/icons-material";
import { Box, Button, IconButton, Popover, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";

export function TipPopOver(props): JSX.Element {
  const { commonStore, engineStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Popover
        id={"mypage"}
        open={engineStore.floatingTips}
        anchorEl={props.tipRef.current}
        onClose={() => {
          engineStore.setFloatingTips(false);
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            p: 3,
            width: commonStore.isDesktop ? 400 : "100%",
            height: 400,
          }}
          role="presentation"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Info />
              &nbsp; TIP
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => {
                  engineStore.setFloatingTips(false);
                }}
              >
                <Close />
              </IconButton>
            </Box>
          </Box>

          <br />

          {engineStore.step === 1 ? (
            <Box>
              <Typography>
                {
                  wordList["브랜드와 기업에 맞춤 솔루션을 각각 제공해드려요."][
                    commonStore.appInfo.language
                  ]
                }
              </Typography>
              <br />
              <Typography>
                {
                  wordList[
                    "선택하신 항목에 따라 제공되는 목업 이미지가 다를 수 있어요."
                  ][commonStore.appInfo.language]
                }
              </Typography>
            </Box>
          ) : null}

          {engineStore.step === 2 ? (
            <Box>
              <Typography>
                {
                  wordList[
                    "로고를 통해 브랜드 또는 기업을 연상할 수 있는 이미지를 결정해요. 브랜드 또는 기업에 맞는 텍스트를 입력해주세요."
                  ][commonStore.appInfo.language]
                }
              </Typography>
              <br />
              <Typography>
                {
                  wordList[
                    "간단명료한 상징물과 자세하게 묘사된 내용을 추가하면 좋은 결과를 얻을 수 있어요."
                  ][commonStore.appInfo.language]
                }
              </Typography>
              <br />
              <Typography>
                {
                  wordList[
                    `ex) "네모난 피자", "왕눈이 개구리", "정장을 입은 한 남자가 꽃을 들고 일어서 있다."`
                  ][commonStore.appInfo.language]
                }
              </Typography>
            </Box>
          ) : null}

          {engineStore.step === 3 ? (
            <Box>
              <Typography>
                {
                  wordList[
                    "브랜드 업종을 입력하기 위해서는, 상단 카테고리를 먼저 선택해주셔야 해요."
                  ][commonStore.appInfo.language]
                }
              </Typography>
              <br />
              <Typography>
                {
                  wordList[
                    "카테고리를 선택하시면 하단에서 세부업종을 선택하실 수 있어요."
                  ][commonStore.appInfo.language]
                }
              </Typography>
              <br />
              <Typography>
                {
                  wordList[
                    "찾기가 어려운 경우 선택 항목 창을 마우스로 클릭하여 검색어를 직접 입력해서 업종을 찾으실 수 있어요."
                  ][commonStore.appInfo.language]
                }
              </Typography>
            </Box>
          ) : null}

          {engineStore.step === 4 ? (
            <Box>
              <Typography>
                {
                  wordList["브랜드의 텍스트 부분을 결정하는 부분이에요."][
                    commonStore.appInfo.language
                  ]
                }
              </Typography>
              <br />
              <Typography>
                {
                  wordList[
                    "지금 당장 떠오르는 특장점이 없다면, 가이드라인을 참고하여 유사한 항목을 선택하실 수 있어요."
                  ][commonStore.appInfo.language]
                }
              </Typography>
            </Box>
          ) : null}

          {engineStore.step === 5 ? (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  mb: 3,
                }}
              >
                <Image
                  src="/resources/logo_error-01.png"
                  alt=""
                  width="100%"
                  style={{
                    padding: 10,
                  }}
                />
                <Image
                  src="/resources/logo_error-02.png"
                  alt=""
                  width="100%"
                  style={{
                    padding: 10,
                  }}
                />
                <Image
                  src="/resources/logo_error-03.png"
                  alt=""
                  width="100%"
                  style={{
                    padding: 10,
                  }}
                />
              </Box>

              <Typography
                sx={{
                  mb: 3,
                }}
              >
                {
                  wordList[
                    "다음과 같이 알 수 없는 모양의 이미지가 나타나시나요?"
                  ][commonStore.appInfo.language]
                }{" "}
                {
                  wordList["브랜드 상징을 조금 더 자세하게 묘사해보세요!"][
                    commonStore.appInfo.language
                  ]
                }
              </Typography>
            </Box>
          ) : null}

          <Box
            sx={{
              mt: 3,
            }}
          >
            {engineStore.step === 5 ? (
              <>
                <Button
                  color="info"
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    engineStore.setStep(2);
                  }}
                  sx={{
                    mb: 1,
                  }}
                >
                  {wordList["수정하러 가기"][commonStore.appInfo.language]}
                </Button>
              </>
            ) : null}

            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                engineStore.setFloatingTips(false);
              }}
            >
              {wordList["알겠습니다."][commonStore.appInfo.language]}
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  ));
}
