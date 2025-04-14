import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={isScrolled ? 4 : 0}
        sx={{
          zIndex: 1300,
          backgroundColor: isScrolled
            ? "rgba(13, 27, 42, 0.95)"
            : "transparent",
          transition: "background-color 0.3s ease",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", padding: "0 1rem" }}>
          {/* Clickable Logo - links to Hero section */}
          <Box
            component="a"
            href="#hero"
            sx={{
              height: "80px",
              width: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "8px",
              textDecoration: "none",
            }}
          >
            <img
              src={process.env.PUBLIC_URL + "/logo.png"}
              alt="Logo"
              style={{
                height: "100%",
                width: "auto",
                display: "block",
              }}
            />
          </Box>

          {/* Desktop Navigation Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
            {navItems.map((item) => (
              <Box
                key={item.label}
                component="a"
                href={item.href}
                sx={{
                  position: "relative",
                  textDecoration: "none",
                  color: "inherit",
                  fontSize: "1rem",
                  fontWeight: 500,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#ffd700",
                    transform: "scale(1.1)",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -4,
                    left: "50%",
                    transform: "translateX(-50%) scaleX(0)",
                    transformOrigin: "center",
                    width: "100%",
                    height: "2px",
                    backgroundColor: "#ffd700",
                    transition: "transform 0.3s ease",
                  },
                  "&:hover::after": {
                    transform: "translateX(-50%) scaleX(1)",
                  },
                }}
              >
                {item.label}
              </Box>
            ))}
          </Box>

          {/* Mobile Hamburger Menu */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={handleDrawerToggle}
          >
            {drawerOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: 250, paddingTop: "64px" },
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem
              button
              key={item.label}
              component="a"
              href={item.href}
              onClick={handleDrawerToggle}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
