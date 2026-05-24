import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

export default function NavLinkItem({ item, active }) {
  return (
    <Button
      component={Link}
      to={item.path}
      sx={{
        position: "relative",
        color: active ? "primary.main" : "text.secondary",
        textTransform: "none",
        fontWeight: active ? 800 : 600,
        borderRadius: 999,
        px: 1.8,
        "&:hover": {
          color: "primary.main",
          backgroundColor: "rgba(37, 99, 235, 0.06)",
        },
      }}
    >
      {item.label}

      <Box
        sx={{
          position: "absolute",
          bottom: 4,
          left: "50%",
          width: active ? "45%" : 0,
          height: 3,
          borderRadius: 999,
          transform: "translateX(-50%)",
          background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
          transition: "width 0.25s ease",
        }}
      />
    </Button>
  );
}