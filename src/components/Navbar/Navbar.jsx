import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Badge,
  useMediaQuery,
  useTheme,
  Container,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
// import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

import NavLinkItem from "./NavLinkItem";
import SearchBar from "./SearchBar";
import ProfileMenu from "./ProfileMenu";
import MobileDrawer from "./MobileDrawer";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Jobs", path: "/jobs" },
  { label: "Companies", path: "/companies" },
  { label: "About", path: "/About" },
  { label: "Contact", path: "/contact" },
    { label: "Login", path: "/login" },
      { label: "Register", path: "/register" },
];

export default function Navbar({ darkMode, onToggleTheme, isLoggedIn = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          top: 0,
          zIndex: 1200,
          backdropFilter: "blur(18px)",
          background:
            theme.palette.mode === "dark"
              ? "rgba(15, 23, 42, 0.75)"
              : "rgba(255, 255, 255, 0.78)",
          borderBottom: "1px solid",
          borderColor:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.08)"
              : "rgba(15,23,42,0.08)",
          boxShadow: scrolled
            ? "0 12px 35px rgba(15, 23, 42, 0.12)"
            : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: 72, gap: 2 }}>
            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                textDecoration: "none",
                color: "text.primary",
                mr: 3,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 3,
                  display: "grid",
                  placeItems: "center",
                  background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
                  color: "white",
                  boxShadow: "0 10px 22px rgba(37, 99, 235, 0.28)",
                }}
              >
                {/* <WorkOutlineIcon /> */}
              </Box>

              <Typography variant="h6" fontWeight={800}>
                JobPortal
              </Typography>
            </Box>

            {!isMobile && (
              <>
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  {navLinks.map((item) => (
                    <NavLinkItem
                      key={item.path}
                      item={item}
                      active={location.pathname === item.path}
                    />
                  ))}
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <SearchBar />

                <Button
                  component={Link}
                  to="/post-job"
                  variant="contained"
                  sx={{
                    ml: 1,
                    px: 2.5,
                    borderRadius: 999,
                    textTransform: "none",
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 28px rgba(37, 99, 235, 0.28)",
                    },
                    transition: "0.25s ease",
                  }}
                >
                  Search a Job
                </Button>
              </>
            )}

            <Box sx={{ flexGrow: isMobile ? 1 : 0 }} />

            <Tooltip title="Toggle theme">
              <IconButton onClick={onToggleTheme} aria-label="toggle dark mode">
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Notifications">
              <IconButton aria-label="notifications">
                <Badge badgeContent={3} color="error">
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {!isMobile &&
              (isLoggedIn ? (
                <ProfileMenu />
              ) : (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    component={Link}
                    to="/login"
                    variant="text"
                    sx={{ textTransform: "none", fontWeight: 700 }}
                  >
                    Login
                  </Button>

                  <Button
                    component={Link}
                    to="/register"
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      borderRadius: 999,
                      fontWeight: 700,
                    }}
                  >
                    Register
                  </Button>
                </Box>
              ))}

            {isMobile && (
              <IconButton
                onClick={() => setDrawerOpen(true)}
                aria-label="open menu"
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navLinks={navLinks}
        activePath={location.pathname}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
}