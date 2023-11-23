import { type PaletteOptions } from "@mui/material/styles";

export const light: PaletteOptions = {
  mode: "light",

  primary: {
    main: "#8265FF",
  },

  text: {
    primary: "#2D2D2D",
    secondary: "#555555",
  },

  background: {
    paper: "#F1F1F1",
    default: "#FFFFFF",
  },

  example: {
    primary: "#49b4ff",
    secondary: "#ef3054",
  },
};

export const dark: PaletteOptions = {
  mode: "dark",

  example: {
    primary: "#49b4ff",
    secondary: "#ef3054",
  },
};

export default { light, dark };
declare module "@mui/material/styles" {
  interface Palette {
    example: {
      primary: string;
      secondary: string;
    };
  }

  interface PaletteOptions {
    example: {
      primary: string;
      secondary: string;
    };
  }
}
