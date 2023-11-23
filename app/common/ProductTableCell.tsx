import { TableCell } from "@mui/material";

export const ProductTableCell = (props: any) => {
  return (
    <TableCell
      {...props}
      sx={{
        ...props.sx,

        p: 1,

        border: 1,
        borderColor: "black",

        textAlign: props.align ?? "center",
      }}
    >
      {props.children}
    </TableCell>
  );
};
