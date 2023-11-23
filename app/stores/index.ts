import * as React from "react";

import { commonStore } from "./commonStore.js";
import { canvasStore } from "./user/canvasStore.js";

export function createStores() {
  const main = new commonStore();

  return {
    commonStore: main,
    canvasStore: new canvasStore(),
  };
}

export const stores = createStores();
export const AppContext = React.createContext(stores);
