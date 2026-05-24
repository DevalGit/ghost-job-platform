import { Link } from "react-router-dom";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Button,
  Badge,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchBar from "./SearchBar";

export default function MobileDrawer({
  open,
  onClose,
  navLinks,
  activePath,
  isLoggedIn,
}) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 310, p: 2.5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6" fontWeight={800}>
            JobPortal
          </Typography>

          <IconButton onClick={onClose} aria-label="close menu">
            <CloseIcon />
          </IconButton>
        </Box>

        <SearchBar />

        <List sx={{ mt: 2 }}>
          {navLinks.map((item) => (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              onClick={onClose}
              selected={activePath === item.path}
              sx={{
                borderRadius: 3,
                mb: 0.5,
                "&.Mui-selected": {
                  backgroundColor: "rgba(37, 99, 235, 0.1)",
                  color: "primary.main",
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <ListItemButton sx={{ borderRadius: 3 }}>
          <Badge badgeContent={3} color="error">
            <NotificationsNoneIcon />
          </Badge>

          <Typography sx={{ ml: 2 }}>Notifications</Typography>
        </ListItemButton>

        <Button
          fullWidth
          component={Link}
          to="/post-job"
          variant="contained"
          onClick={onClose}
          sx={{
            mt: 2,
            py: 1.2,
            borderRadius: 999,
            textTransform: "none",
            fontWeight: 700,
            background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
          }}
        >
          Post a Job
        </Button>

        {!isLoggedIn && (
          <Box sx={{ display: "grid", gap: 1.2, mt: 2 }}>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              onClick={onClose}
              sx={{ borderRadius: 999, textTransform: "none" }}
            >
              Login
            </Button>

            <Button
              component={Link}
              to="/register"
              variant="contained"
              onClick={onClose}
              sx={{ borderRadius: 999, textTransform: "none" }}
            >
              Register
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}