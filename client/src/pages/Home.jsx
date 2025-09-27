import React from "react";
import Header from "../components/Header";
import { Box } from "@mui/material";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";

const Home = () => {
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          backgroundColor: "whitesmoke",
          overflowY: "hidden",
        }}
      >
        <Box>
          <Header />
        </Box>
        <Box
          height={"98%"}
          sx={{
            border: "2px solid red",
            marginTop: "5px",
            width: "30%",
            float: "left",
          }}
        >
          <ChatList />
        </Box>
        <Box
          height={"98%"}
          sx={{
            border: "2px solid green",
            marginTop: "5px",
            height: "98%",
            width: "70%",
            float: "right",
          }}
        >
          <ChatWindow />
        </Box>
      </Box>
    </>
  );
};

export default Home;
