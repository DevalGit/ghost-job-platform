import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Tooltip,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Profile">
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          aria-label="open profile menu"
        >
          <Avatar
            alt="User profile"
            sx={{
              width: 36,
              height: 36,
              bgcolor: "primary.main",
              fontWeight: 700,
            }}
          >
            D
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 3,
            minWidth: 210,
            boxShadow: "0 20px 45px rgba(15,23,42,0.14)",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            navigate("/Udashboard");
            handleClose();
          }}
        >
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          Dashboard
        </MenuItem>

      <MenuItem
          onClick={() => {
            navigate("/Edashboard");
            handleClose();
          }}
        >
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          Employeer Dashboard
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/settings");
            handleClose();
          }}
        >
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={() => {
            localStorage.removeItem("token");

            navigate("/login");

            handleClose();
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}