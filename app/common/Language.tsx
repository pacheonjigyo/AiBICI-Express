import * as React from "react";

import { wordList } from "../data/words.js";
import { AppContext } from "../stores/index.js";

export const Language = (props: any) => {
  const { commonStore } = React.useContext(AppContext);

  return <>{wordList[props.label][commonStore.appInfo.language]}</>;
};
