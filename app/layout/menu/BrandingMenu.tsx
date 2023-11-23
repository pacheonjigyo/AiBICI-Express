import * as React from "react";

import {
  Box,
  Chip,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListSubheader,
  Typography,
} from "@mui/material";
import { AppContext } from "../../stores/index.js";

export function BrandingMenu(): JSX.Element {
  const { commonStore } = React.useContext(AppContext);

  const [intro, setIntro] = React.useState(false);
  const [naming, setNaming] = React.useState(false);
  const [story, setStory] = React.useState(false);
  const [mission, setMission] = React.useState(false);
  const [vision, setVision] = React.useState(false);
  const [essense, setEssense] = React.useState(false);
  const [slogan, setSlogan] = React.useState(false);
  const [coreValue, setCoreValue] = React.useState(false);
  const [logo, setLogo] = React.useState(false);
  const [marketing, setMarketing] = React.useState(false);
  const [trade, setTrade] = React.useState(false);
  const [challenge, setChallenge] = React.useState(false);

  const [openSecondLevel, setOpenSecondLevel] = React.useState(true);

  const handleIntro = () => {
    window.location.href = "/ai-branding/create#/intro";

    setIntro(!intro);
  };

  const handleNaming = () => {
    setNaming(!naming);
  };

  const handleStory = () => {
    setStory(!story);
  };

  const handleMission = () => {
    setMission(!mission);
  };

  const handleVision = () => {
    setVision(!vision);
  };

  const handleEssense = () => {
    setEssense(!essense);
  };

  const handleSlogan = () => {
    setSlogan(!slogan);
  };

  const handleCoreValue = () => {
    setCoreValue(!coreValue);
  };

  const handleLogo = () => {
    setLogo(!logo);
  };

  const handleMarketing = () => {
    setMarketing(!marketing);
  };

  const handleTrade = () => {
    setTrade(!trade);
  };

  const handleChallenge = () => {
    setChallenge(!challenge);
  };

  const handleClickSecondLevel = () => {
    setOpenSecondLevel(!openSecondLevel);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 1,

        // marginTop: "60px",

        width: 300,
        height: commonStore.baseInfo.height - 64,

        overflowY: "auto",

        zIndex: 1000,
      }}
    >
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            AI 브랜딩
          </ListSubheader>
        }
      >
        <ListItem disablePadding onClick={handleIntro}>
          <ListItemButton>
            <Chip size="small" label="설정됨" color="success" sx={{ mr: 1 }} />

            <Typography fontSize={14}>브랜드 소개서</Typography>
          </ListItemButton>
        </ListItem>

        <Collapse in={intro} timeout="auto" unmountOnExit>
          <ListItem
            onClick={() => {
              window.location.href = "/ai-branding/create#/intro-gpt";
            }}
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>제공하는 형태</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem
            onClick={() => {
              window.location.href = "/ai-branding/create#/intro-form";
            }}
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>제공하는 형태</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                소개서 작성 가이드 - 빈칸입력
              </Typography>
            </ListItemButton>
          </ListItem>

          {/* <ListItem
            onClick={handleClickSecondLevel}
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>소개서 작성 가이드</Typography>
            </ListItemButton>
          </ListItem>

          <Collapse in={openSecondLevel} timeout="auto" unmountOnExit>
            <ListItem
              sx={{
                p: 0,
                pl: 4,
              }}
            >
              <ListItemButton>
                <Typography fontSize={14}>2</Typography>
              </ListItemButton>
            </ListItem>
          </Collapse> */}
        </Collapse>

        <ListItem disablePadding onClick={handleNaming}>
          <ListItemButton>
            <Chip size="small" label="진행중" color="warning" sx={{ mr: 1 }} />

            <Typography fontSize={14}>네이밍 - GPT / 수동 / 단어장</Typography>
          </ListItemButton>
        </ListItem>

        <Collapse in={naming} timeout="auto" unmountOnExit>
          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>GPT로 생성하기 - 추천</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                네이밍 생성 가이드 - 빈칸입력
              </Typography>
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>단어장 - 저장공간</Typography>
            </ListItemButton>
          </ListItem>
        </Collapse>

        <ListItem disablePadding onClick={handleStory}>
          <ListItemButton>
            <Chip size="small" label="미진행" color="default" sx={{ mr: 1 }} />

            <Typography fontSize={14}>스토리 - GPT / 수동</Typography>
          </ListItemButton>
        </ListItem>

        <Collapse in={story} timeout="auto" unmountOnExit>
          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>GPT로 생성하기 - 추천</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                스토리 생성 가이드 - 빈칸입력
              </Typography>
            </ListItemButton>
          </ListItem>
        </Collapse>

        <ListItem disablePadding onClick={handleMission}>
          <ListItemButton>
            <Chip size="small" label="미진행" color="default" sx={{ mr: 1 }} />

            <Typography fontSize={14}>미션 - GPT / 수동</Typography>
          </ListItemButton>
        </ListItem>

        <Collapse in={mission} timeout="auto" unmountOnExit>
          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>GPT로 생성하기 - 추천</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>미션 생성 가이드 - 빈칸입력</Typography>
            </ListItemButton>
          </ListItem>
        </Collapse>

        <ListItem disablePadding onClick={handleVision}>
          <ListItemButton>
            <Chip size="small" label="미진행" color="default" sx={{ mr: 1 }} />

            <Typography fontSize={14}>비전 - GPT / 수동</Typography>
          </ListItemButton>
        </ListItem>

        <Collapse in={vision} timeout="auto" unmountOnExit>
          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>GPT로 생성하기 - 추천</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>비전 생성 가이드 - 빈칸입력</Typography>
            </ListItemButton>
          </ListItem>
        </Collapse>

        <ListItem disablePadding onClick={handleEssense}>
          <ListItemButton>
            <Chip size="small" label="미진행" color="default" sx={{ mr: 1 }} />

            <Typography fontSize={14}>에센스 - GPT / 수동</Typography>
          </ListItemButton>
        </ListItem>

        <Collapse in={essense} timeout="auto" unmountOnExit>
          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>GPT로 생성하기 - 추천</Typography>
            </ListItemButton>
          </ListItem>
        </Collapse>

        <ListItem disablePadding onClick={handleSlogan}>
          <ListItemButton>
            <Chip size="small" label="미진행" color="default" sx={{ mr: 1 }} />

            <Typography fontSize={14}>슬로건 - GPT / 수동</Typography>
          </ListItemButton>
        </ListItem>

        <Collapse in={slogan} timeout="auto" unmountOnExit>
          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>GPT로 생성하기 - 추천</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                슬로건 생성 가이드 - 빈칸입력
              </Typography>
            </ListItemButton>
          </ListItem>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton onClick={handleCoreValue}>
            <Chip size="small" label="미진행" color="default" sx={{ mr: 1 }} />

            <Typography fontSize={14}>핵심가치 - GPT / 수동</Typography>
          </ListItemButton>
        </ListItem>

        <Collapse in={coreValue} timeout="auto" unmountOnExit>
          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>GPT로 생성하기 - 추천</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                핵심가치 생성 가이드 - 빈칸입력
              </Typography>
            </ListItemButton>
          </ListItem>
        </Collapse>

        <ListItem disablePadding onClick={handleLogo}>
          <ListItemButton>
            <Chip size="small" label="미진행" color="default" sx={{ mr: 1 }} />

            <Typography fontSize={14}>로고 - SD / 수동</Typography>
          </ListItemButton>
        </ListItem>

        <Collapse in={logo} timeout="auto" unmountOnExit>
          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>
                Stable Diffusion으로 생성하기 - 추천
              </Typography>
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>로고 생성 가이드 - 빈칸입력</Typography>
            </ListItemButton>
          </ListItem>
        </Collapse>

        <ListItem disablePadding onClick={handleMarketing}>
          <ListItemButton disabled>
            <Chip size="small" label="개발중" color="default" sx={{ mr: 1 }} />

            <Typography fontSize={14}>마케팅</Typography>
          </ListItemButton>
        </ListItem>

        <Collapse in={marketing} timeout="auto" unmountOnExit>
          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>웹사이트 만들기 - 추천</Typography>
            </ListItemButton>
          </ListItem>
        </Collapse>

        <ListItem disablePadding onClick={handleTrade}>
          <ListItemButton disabled>
            <Chip size="small" label="개발중" color="default" sx={{ mr: 1 }} />

            <Typography fontSize={14}>브랜드거래소</Typography>
          </ListItemButton>
        </ListItem>

        <Collapse in={trade} timeout="auto" unmountOnExit>
          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>지갑 만들기 - 블록체인</Typography>
            </ListItemButton>
          </ListItem>

          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>NFT 등록하기 - NFT</Typography>
            </ListItemButton>
          </ListItem>
        </Collapse>

        <ListItem disablePadding onClick={handleChallenge}>
          <ListItemButton disabled>
            <Chip size="small" label="개발중" color="default" sx={{ mr: 1 }} />

            <Typography fontSize={14}>창업도전</Typography>
          </ListItemButton>
        </ListItem>

        <Collapse in={challenge} timeout="auto" unmountOnExit>
          <ListItem
            sx={{
              p: 0,
              pl: 2,
            }}
          >
            <ListItemButton>
              <Typography fontSize={14}>창업도전 가이드</Typography>
            </ListItemButton>
          </ListItem>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton disabled>
            <Chip size="small" label="개발중" color="default" sx={{ mr: 1 }} />

            <Typography fontSize={14}>페르소나</Typography>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton disabled>
            <Chip size="small" label="개발중" color="default" sx={{ mr: 1 }} />

            <Typography fontSize={14}>인테리어</Typography>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton disabled>
            <Chip size="small" label="개발중" color="default" sx={{ mr: 1 }} />

            <Typography fontSize={14}>패키지</Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
