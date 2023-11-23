import * as React from "react";
import Image from "../../../common/Image.js";

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";

import { Send } from "@mui/icons-material";
import { useObserver } from "mobx-react";
import { stringAvatar } from "../../../common/StringAvatar.js";
import { usePageEffect } from "../../../core/page.js";
import { AppContext } from "../../../stores/index.js";

const MessageBox = (props: any) => {
  return (
    <Box
      sx={{
        bgcolor: props.data.from === "aibici" ? "whitesmoke" : "white",

        color: props.data.from === "aibici" ? "#000000" : "#333333",

        p: 3,

        // width: "100%",
      }}
      {...props}
    >
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            height: 40,
          }}
        >
          {props.data.from === "aibici" ? (
            <Image src="/favicon.ico" width={40} height={40} />
          ) : (
            <Avatar {...stringAvatar("user")} />
          )}
        </Box>

        <Box
          sx={{
            ml: 3,
            width: "90%",
          }}
        >
          {props.children}
        </Box>
      </Container>
    </Box>
  );
};

export default function ChatScreen(): JSX.Element {
  const { commonStore, engineChatStore } = React.useContext(AppContext);

  const messageEndRef: any = React.useRef(null);

  usePageEffect({
    title: "Chat-GPT",
  });

  const onSend = async () => {
    const auth = await commonStore.syncAppInfo(
      commonStore.appInfo.isAdmin,
      true,
      "",
    );

    if (!auth) {
      return;
    }

    if (
      !engineChatStore.chatData.prompt ||
      !engineChatStore.chatData.prompt.trim()
    ) {
      return;
    }

    const messages = [...engineChatStore.chatData.messages];

    messages.push({
      from: "user",
      to: "aibici",
      content: engineChatStore.chatData.prompt,
    });

    engineChatStore.setChatData({
      ...engineChatStore.chatData,

      messages,
      loading: true,
      subStep: 0,
    });

    messageEndRef.current.scrollIntoView();

    const response = await engineChatStore.getChatResponse(
      engineChatStore.chatData.prompt,
    );

    messages.push({
      from: "aibici",
      to: "user",
      content: (
        <>
          <Box sx={{}}>
            {response
              .split("\n")
              .filter((v) => v)
              .map((v, i) => {
                return <Typography key={i}>{v}</Typography>;
              })}
          </Box>
        </>
      ),
    });

    engineChatStore.setChatData({
      ...engineChatStore.chatData,
      prompt: "",
      messages,
      loading: false,
      subStep: engineChatStore.chatData.subStep + 1,
    });

    messageEndRef.current.scrollIntoView();
  };

  return useObserver(() => (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          width: commonStore.baseInfo.width / 2,
          height: commonStore.baseInfo.height,
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 110,

            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              p: 3,

              width: 200,
              textAlign: "left",
            }}
          >
            <Typography color="gray" fontSize={12}>
              Powered by OpenAI
              <br />
              GPT-v3.5
            </Typography>
          </Box>

          <Box
            sx={{
              p: 3,

              width: 200,
              textAlign: "right",
            }}
          >
            <Button
              color="inherit"
              variant="contained"
              sx={{
                height: 50,
              }}
              onClick={() => {
                commonStore.setGptDrawer(false);
              }}
            >
              채팅 닫기
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            height: commonStore.baseInfo.height - 220,
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          {engineChatStore.chatData.messages.map((v, i) => {
            return (
              <MessageBox key={i} data={v} loading={false}>
                {v.content}
              </MessageBox>
            );
          })}

          {engineChatStore.chatData.loading ? (
            <MessageBox
              data={{
                from: "aibici",
              }}
              loading={true}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CircularProgress
                  size="1.5rem"
                  sx={{
                    mr: 2,
                  }}
                />
              </Box>
            </MessageBox>
          ) : null}

          <Box ref={messageEndRef} />
        </Box>

        <Divider />

        <Box
          sx={{
            height: 109,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              display: "flex",
              // justifyContent: "center",
              alignItems: "center",

              position: "relative",
            }}
          >
            <TextField
              id="ChatScreen_Message"
              autoFocus
              fullWidth
              placeholder="메시지를 입력하세요."
              inputProps={{
                style: {
                  // fontSize: 20,
                  padding: 20,
                },
              }}
              onChange={(e) => {
                engineChatStore.setChatData({
                  ...engineChatStore.chatData,

                  prompt: e.target.value,
                });
              }}
              onKeyUp={(e) => {
                if (
                  e.key !== "Enter" ||
                  engineChatStore.chatData.loading ||
                  engineChatStore.chatData.step === 5
                ) {
                  return;
                }

                onSend();
              }}
              value={engineChatStore.chatData.prompt}
            />

            <Button
              disabled={
                engineChatStore.chatData.loading ||
                engineChatStore.chatData.step === 5
              }
              variant="contained"
              sx={{
                position: "absolute",
                p: 0,
                minWidth: 50,
                height: 50,
                right: 5,

                transform: "translateX(-50%)",
              }}
              onClick={onSend}
            >
              <Send />
            </Button>
          </Container>
        </Box>
      </Box>
    </>
  ));
}
