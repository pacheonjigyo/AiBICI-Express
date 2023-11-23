import * as React from "react";

import {
  ChevronLeft,
  ChevronRight,
  RedoOutlined,
  UndoOutlined,
} from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useObserver } from "mobx-react";
import { AppContext } from "../../stores/index.js";

export default function EditorCore(): JSX.Element {
  const { commonStore, canvasStore } = React.useContext(AppContext);

  return useObserver(() => (
    <Box
      id="fabric-canvas-wrapper"
      sx={{
        display: canvasStore.logoMenu === 5 ? "none" : "unset",
        // background:
        //   theme.palette.mode === "dark"
        //     ? "black"
        //     : `url(
        //         "/resources/checker_board.png")`,

        bgcolor: "lightgray",
        // borderLeft: 1,
        // borderRight: 1,
        // borderColor: "divider",

        width: canvasStore.drawer
          ? commonStore.baseInfo.width - 800
          : commonStore.baseInfo.width - 380,
        height: commonStore.baseInfo.height - 60,
        // overflow: "auto",

        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",

          left: "50%",
          top: 10,

          transform: "translateX(-50%)",

          zIndex: 100,
        }}
      >
        <Box>
          <Button
            color="inherit"
            variant="contained"
            sx={{
              p: 0,

              minWidth: 40,
              height: 40,

              borderRadius: "50%",
            }}
            disabled={canvasStore.canvasState.undo.length < 1}
            // size="large"
            onClick={() => {
              canvasStore.canvas.playCanvas("undo");
            }}
          >
            <UndoOutlined
              sx={{
                fontSize: 16,
              }}
            />
          </Button>

          <Button
            color="inherit"
            variant="contained"
            sx={{
              ml: 1,

              p: 0,

              minWidth: 40,
              height: 40,

              borderRadius: "50%",
            }}
            disabled={canvasStore.canvasState?.redo.length < 1}
            size="large"
            onClick={() => {
              canvasStore.canvas.playCanvas("redo");
            }}
          >
            <RedoOutlined
              sx={{
                fontSize: 16,
              }}
            />
          </Button>
        </Box>
      </Box>

      <canvas
        id="main"
        width={
          canvasStore.drawer
            ? commonStore.baseInfo.width - 800
            : commonStore.baseInfo.width - 380
        }
        height={commonStore.baseInfo.height - 60}
      ></canvas>

      <Box
        sx={{
          bgcolor: "background.paper",
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          borderLeft: 1,
          borderTop: 1,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Button
          color="info"
          onClick={async () => {
            //
            canvasStore.setDrawer(!canvasStore.drawer);
          }}
          sx={{
            minWidth: 20,
            height: 90,
            p: 0,
          }}
        >
          {canvasStore.drawer ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </Box>
    </Box>
  ));
}
