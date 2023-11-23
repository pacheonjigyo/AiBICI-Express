import * as React from "react";

import { useObserver } from "mobx-react";
import { AppContext } from "../../stores/index.js";

import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { Box, Button, ButtonGroup, Divider, Popover } from "@mui/material";

export function EditorPlacePopOver(props): JSX.Element {
  const { canvasStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Popover
        id={"mypage"}
        open={canvasStore.placePopOver}
        anchorEl={props.placeRef.current}
        onClose={() => {
          canvasStore.setPlacePopOver(false);
        }}
        anchorOrigin={{
          vertical: -90,
          horizontal: 0,
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
          }}
        >
          <ButtonGroup
            sx={{
              width: 260,
              height: 80,
            }}
          >
            <Button
              color="info"
              variant="outlined"
              fullWidth
              sx={{
                p: 0,
              }}
              onClick={() => {
                canvasStore.canvas.setPlacement(
                  canvasStore.layers[canvasStore.layerCurrentId]?.id,
                  "doubleFront",
                );
              }}
            >
              <Box
                sx={{
                  p: 1,
                  width: "100%",
                }}
              >
                <Box>
                  <KeyboardDoubleArrowLeft />
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
                  가장 앞
                </Box>
              </Box>
            </Button>

            <Button
              color="info"
              variant="outlined"
              fullWidth
              sx={{
                p: 0,
              }}
              onClick={() => {
                canvasStore.canvas.setPlacement(
                  canvasStore.layers[canvasStore.layerCurrentId]?.id,
                  "front",
                );
              }}
            >
              <Box
                sx={{
                  p: 1,
                  width: "100%",
                }}
              >
                <Box>
                  <KeyboardArrowLeft />
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
                  앞으로
                </Box>
              </Box>
            </Button>

            <Button
              color="info"
              variant="outlined"
              fullWidth
              sx={{
                p: 0,
              }}
              onClick={() => {
                canvasStore.canvas.setPlacement(
                  canvasStore.layers[canvasStore.layerCurrentId]?.id,
                  "back",
                );
              }}
            >
              <Box
                sx={{
                  p: 1,
                  width: "100%",
                }}
              >
                <Box>
                  <KeyboardArrowRight />
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
                  뒤로
                </Box>
              </Box>
            </Button>

            <Button
              color="info"
              variant="outlined"
              fullWidth
              sx={{
                p: 0,
              }}
              onClick={() => {
                canvasStore.canvas.setPlacement(
                  canvasStore.layers[canvasStore.layerCurrentId]?.id,
                  "doubleBack",
                );
              }}
            >
              <Box
                sx={{
                  p: 1,
                  width: "100%",
                }}
              >
                <Box>
                  <KeyboardDoubleArrowRight />
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
                  가장 뒤
                </Box>
              </Box>
            </Button>
          </ButtonGroup>
        </Box>
      </Popover>
    </>
  ));
}
