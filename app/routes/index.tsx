import { createBrowserRouter } from "react-router-dom";
import { RootError } from "../layout/error/RootError.js";
import { SimpleLayout } from "../layout/SimpleLayout.js";

import Viewer from "./identity/Viewer.js";
import Main from "./main/Main.js";
import { Test } from "./test/Test.js";

export const router = createBrowserRouter([
  {
    path: "",
    element: <SimpleLayout />,
    errorElement: <RootError />,
    children: [
      { index: true, element: <Main /> },
      { path: "editor/:type/:index", element: <Viewer /> },
      { path: "test", element: <Test /> },
    ],
  },
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
