import { Paper } from "@mui/material";

export const SoftButton = (props: any) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        // borderRadius: "1rem",

        color: "#333333",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        m: "auto",
        p: 4,

        width: "100%",
        height: 300,

        ...props.sx,
      }}
      {...props}
    >
      {props.children}
    </Paper>
  );
};
