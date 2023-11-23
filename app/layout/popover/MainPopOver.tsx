import * as React from "react";

import { useObserver } from "mobx-react";
import { AppContext } from "../../stores/index.js";

import { Add, ArrowUpward, Close } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";

export function MainPopOver(): JSX.Element {
  const { commonStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Box
        sx={{
          position: "fixed",
          right: 30,
          bottom: 30,

          zIndex: 9999,
        }}
      >
        <Fab
          color="secondary"
          onClick={() => {
            commonStore.setMainPopOver(!commonStore.mainPopOver);
          }}
          sx={{
            width: 70,
            height: 70,
          }}
        >
          {commonStore.mainPopOver ? <Close /> : <Add />}
        </Fab>
      </Box>

      <Box
        sx={{
          display: commonStore.mainPopOver ? "" : "none",
          position: "fixed",
          right: 30,
          bottom: 130,

          zIndex: 9999,
        }}
      >
        <Fab
          color="primary"
          sx={{
            width: 60,
            height: 60,
          }}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <ArrowUpward />
        </Fab>
      </Box>

      <Box
        sx={{
          display: commonStore.mainPopOver ? "" : "none",
          position: "fixed",

          right: 100,
          bottom: 100,

          zIndex: 9999,
        }}
      >
        <Fab
          color="primary"
          sx={{
            width: 60,
            height: 60,
          }}
          onClick={() => {
            const chatButton = document.getElementById("custom-button");

            if (!chatButton) {
              return;
            }

            chatButton?.click();
          }}
        >
          <img src="/resources/channel_bot.png" width={80} height={80} />
        </Fab>
      </Box>

      <Box
        sx={{
          display: commonStore.mainPopOver ? "" : "none",
          position: "fixed",

          right: 130,
          bottom: 30,

          zIndex: 9999,
        }}
      >
        <Fab
          onClick={() => {
            window.open("https://youtu.be/Z9nd5uh3hBg");
          }}
          sx={{
            width: 60,
            height: 60,
          }}
        >
          <img src="/resources/youtube.svg" width={60} height={60} />
        </Fab>
      </Box>
    </>
  ));
}
