import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const navLinks = [
    { text: "Home", href: "/" },
    { text: "Tutors", href: "/tutors" },
    { text: "About Us", href: "/about" },
    { text: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Navbar for Desktop */}
      <AppBar position="static" sx={{ backgroundColor: "#1f3c66" }}>
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            IClazz
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navLinks.map((link) => (
              <Button
                key={link.text}
                color="inherit"
                component={Link}
                href={link.href}
              >
                {link.text}
              </Button>
            ))}
          </Box>
          {/* Hamburger Menu Icon for Mobile */}
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            sx={{
              display: { xs: "block", sm: "none" },
              transition: "transform 0.3s",
            }}
          >
            <MenuIcon
              sx={{
                fontSize: "2rem",
                transform: drawerOpen ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#1f3c66",
            color: "white",
          },
        }}
      >
        {/* Close Button Outside Menu Bar */}
        <IconButton
          onClick={handleDrawerClose}
          sx={{ position: "absolute", right: 10, top: 10, color: "white" }}
        >
          <CloseIcon sx={{ fontSize: "2rem" }} />
        </IconButton>
        <Box
          sx={{ width: 250, mt: 8 }} // Adjust margin-top to avoid overlap with close button
          role="presentation"
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
        >
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.text} disablePadding>
                <ListItemButton
                  component={Link}
                  href={link.href}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <ListItemText
                    primary={link.text}
                    sx={{ textAlign: "center" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
