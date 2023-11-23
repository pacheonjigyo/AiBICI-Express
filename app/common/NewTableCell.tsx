import { TableCell } from "@mui/material";

export const NewTableCell = (props: any) => {
  return (
    <TableCell
      {...props}
      sx={{
        ...props.sx,

        bgcolor: props.head ? "info.main" : "background.paper",
      }}
    >
      {props.children}
    </TableCell>
  );
};
