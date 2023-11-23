import * as React from "react";

import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import { useObserver } from "mobx-react";
import { AppContext } from "../../stores/index.js";

export default function LoadingModal(): JSX.Element {
  const { commonStore } = React.useContext(AppContext);

  return useObserver(() => (
    <Modal open={commonStore.loading}>
      <Box
        sx={{
          position: "fixed",

          top: "50%",
          left: "50%",

          transform: "translate(-50%, -50%)",
        }}
      >
        <Box
          sx={{
            bgcolor: "#f1f1f1",

            px: 6,
            py: 3,

            borderRadius: "1em",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress
            disableShrink
            color="info"
            size="1em"
            sx={{ mr: 3 }}
          />

          <Typography fontSize={14}>데이터를 가져오는 중...</Typography>
        </Box>
      </Box>
    </Modal>
  ));
}
