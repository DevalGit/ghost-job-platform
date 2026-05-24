import { Button, CircularProgress } from "@mui/material";

export default function AuthButton({ children, loading }) {
  return (
    <Button
      fullWidth
      type="submit"
      variant="contained"
      size="large"
      disabled={loading}
      sx={{
        mt: 2,
        py: 1.4,
        fontWeight: 700,
        textTransform: "none",
        borderRadius: 3,
        transition: "0.25s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 10px 24px rgba(37, 99, 235, 0.3)",
        },
      }}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
}