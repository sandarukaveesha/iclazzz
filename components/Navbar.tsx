import { useState, useEffect } from "react";
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
import { useRouter } from "next/router";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  useEffect(() => {
    if (router.query.scrollTo) {
      const section = document.getElementById(router.query.scrollTo as string);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [router.query.scrollTo]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1f3c66" }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              color: "inherit",
              flexGrow: 1,
              textDecoration: "none", // This removes the underline
              cursor: "pointer", // Shows hand cursor on hover
            }}
            component={Link} // Makes it a Next.js Link component
            href="/" // Navigates to home page
          >
            IClazz
          </Typography>
          {/* Only show menu items if NOT on home page */}
          {!isHomePage && (
            <>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Button color="inherit" component={Link} href="/home">
                  Home
                </Button>
                <Button color="inherit" component={Link} href="/#about">
                  About Us
                </Button>
                <Button color="inherit" component={Link} href="/#service">
                  Our Services
                </Button>
                <Button color="inherit" component={Link} href="/#contact">
                  Contact Us
                </Button>
                <Button color="inherit" component={Link} href="/tutors">
                  Tutors
                </Button>
              </Box>
              <IconButton
                color="inherit"
                onClick={handleDrawerToggle}
                sx={{ display: { xs: "block", sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer - Only show if NOT on home page */}
      {!isHomePage && (
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "#1f3c66",
              color: "white",
              width: 250,
            },
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ position: "absolute", right: 10, top: 10, color: "white" }}
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ mt: 8 }}>
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
                <ListItemButton component={Link} href="/#about">
                  <ListItemText primary="About Us" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} href="/#service">
                  <ListItemText primary="Our Services" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} href="/#contact">
                  <ListItemText primary="Contact Us" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )}
    </>
  );
}
