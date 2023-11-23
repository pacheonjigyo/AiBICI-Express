import * as React from "react";

import { Box, Button, ButtonGroup, Divider, Popover } from "@mui/material";
import { useObserver } from "mobx-react";
import { AppContext } from "../../stores/index.js";

import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
} from "@mui/icons-material";

export function EditorAlignPopOver(props): JSX.Element {
  const { canvasStore } = React.useContext(AppContext);

  return useObserver(() => (
    <>
      <Popover
        id={"mypage"}
        open={canvasStore.alignPopOver}
        anchorEl={props.alignRef.current}
        onClose={() => {
          canvasStore.setAlignPopOver(false);
        }}
        anchorOrigin={{
          vertical: 0,
          horizontal: 76,
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
          }}
        >
          <ButtonGroup
            sx={{
              width: 190,
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
                  <FormatAlignLeft />
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
                  왼쪽
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
                  가운데
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
                  <FormatAlignRight />
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
                  오른쪽
                </Box>
              </Box>
            </Button>
          </ButtonGroup>
        </Box>
      </Popover>
    </>
  ));
}
