import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";
const Header = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#54d4ffff" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            flexGrow: 1,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Chat App
        </Typography>

        <Button
          color="primary"
          startIcon={<LogoutOutlined />}
          style={{ color: "white", fontWeight: "bold", textTransform: "none" }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
