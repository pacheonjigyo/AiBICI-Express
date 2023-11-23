import * as React from "react";
import Editor from "./Editor.js";

import { InfoOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { usePageEffect } from "../../core/page.js";
import { wordList } from "../../data/words.js";
import { AppContext } from "../../stores/index.js";

export default function Viewer(): JSX.Element {
  const { commonStore } = React.useContext(AppContext);

  usePageEffect({
    title: wordList["로고"][commonStore.appInfo.language],
  });

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useObserver(() => (
    <>
      <Box>
        <Box
          sx={{
            height: commonStore.baseInfo.height,
            overflowY: "auto",
          }}
        >
          {commonStore.device === "mobile" ? (
            <Box
              sx={{
                display: "flex",
                position: "relative",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                height: commonStore.baseInfo.height,
              }}
            >
              <InfoOutlined
                sx={{
                  fontSize: 100,
                  mb: 3,
                }}
              />

              <Typography
                fontSize={24}
                sx={{
                  mb: 3,
                }}
              >
                모바일에서 이용하실 수 없어요.
              </Typography>

              <Typography fontSize={12}>
                PC를 통해 접속하시면 정상적으로 이용이 가능해요.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                position: "relative",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                }}
              >
                <Editor />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  ));
}
