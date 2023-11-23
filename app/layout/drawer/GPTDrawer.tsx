import * as React from "react";

import { useObserver } from "mobx-react";
import { AppContext } from "../../stores/index.js";

import { Drawer } from "@mui/material";
import ChatScreen from "./chat/Screen.js";

export function GPTDrawer(): JSX.Element {
  const { commonStore } = React.useContext(AppContext);

  return useObserver(() => (
    <Drawer
      anchor={"right"}
      open={commonStore.gptDrawer}
      onClose={() => {
        commonStore.setGptDrawer(false);
      }}
      sx={{
        zIndex: 10000,
      }}
    >
      <ChatScreen />
    </Drawer>
  ));
}
