import { Button } from "@mui/material";

export const BigButton = (props: any) => {
  return (
    <Button
      {...props}
      sx={{
        ...props.sx,

        fontSize: 20,

        minWidth: 200,
        height: 60,
      }}
    >
      {props.children}
    </Button>
  );
};
