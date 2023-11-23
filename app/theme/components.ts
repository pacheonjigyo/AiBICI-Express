import { type Palette, type ThemeOptions } from "@mui/material/styles";

export const components = (palette: Palette): ThemeOptions["components"] => ({
  MuiButton: {
    styleOverrides: {
      root: {
        boxShadow: "none",

        "&:hover": {
          boxShadow: "none",
        },
      },

      text: {
        "&:hover": {
          background: "#8265ff33",
        },
      },
    },
  },
});
