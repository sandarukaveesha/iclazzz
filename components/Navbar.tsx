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

  const handleScrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setDrawerOpen(false); // Close the drawer on mobile
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1f3c66" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            IClazz
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button color="inherit" component={Link} href="/">
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => handleScrollToSection("about")}
            >
              About Us
            </Button>

            <Button
              color="inherit"
              onClick={() => handleScrollToSection("contact")}
            >
              Contact Us
            </Button>
            <Button
              color="inherit"
              onClick={() => handleScrollToSection("service")}
            >
              Our Services
            </Button>
            <Button color="inherit" component={Link} href="/tutors">
              Tutors
            </Button>
          </Box>
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{
          "& .MuiDrawer-paper": { backgroundColor: "#1f3c66", color: "white" },
        }}
      >
        <IconButton
          onClick={handleDrawerClose}
          sx={{ position: "absolute", right: 10, top: 10, color: "white" }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ width: 250, mt: 8 }} role="presentation">
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} href="/">
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} href="/tutors">
                <ListItemText primary="Tutors" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleScrollToSection("about")}>
                <ListItemText primary="About Us" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleScrollToSection("contact")}>
                <ListItemText primary="Contact" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
