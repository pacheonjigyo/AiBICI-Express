import * as React from "react";

import { Link, Typography, TypographyProps } from "@mui/material";
import { AppContext } from "../../stores/index.js";

export function Notice(props: NoticeProps): JSX.Element {
  const { commonStore } = React.useContext(AppContext);
  const { sx, ...other } = props;

  return (
    <Typography
      sx={{
        color: "text.secondary",
        "& span": { opacity: 0.6 },
        "& a": { fontWeight: 500, opacity: 0.7 },
        "& a:hover": { opacity: 1 },
        ...sx,
      }}
      variant="body2"
      {...other}
    >
      {commonStore.appInfo.language === "ko" ? (
        <>
          위의 [회원가입] 버튼을 클릭함으로써, AiBICI{" "}
          <Link color="inherit" href="/terms">
            약관
          </Link>{" "}
          및{" "}
          <Link color="inherit" href="/privacy">
            개인정보처리방침
          </Link>
          을 읽고 이해했음을 동의하는 것으로 간주합니다.
        </>
      ) : (
        <>
          By clicking the {"'"}Sign Up{"'"} button above, we accept that we have
          read and understood the AiBICI{" "}
          <Link color="inherit" href="/terms">
            Terms
          </Link>{" "}
          and{" "}
          <Link color="inherit" href="/privacy">
            Privacy Policy
          </Link>
          .
        </>
      )}
    </Typography>
  );
}

type NoticeProps = Omit<TypographyProps, "children">;
