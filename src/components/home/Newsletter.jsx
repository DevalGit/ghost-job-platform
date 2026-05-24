import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";

export default function Newsletter() {
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 7 },
            borderRadius: 7,
            textAlign: "center",
            color: "white",
            background: "linear-gradient(135deg, #0f172a, #2563eb)",
          }}
        >
          <Typography variant="h3" fontWeight={900}>
            Get latest jobs in your inbox
          </Typography>

          <Typography sx={{ mt: 2, opacity: 0.85 }}>
            Subscribe to receive curated jobs, hiring tips, and company updates.
          </Typography>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              gap: 2,
              maxWidth: 560,
              mx: "auto",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <TextField
              fullWidth
              placeholder="Enter your email"
              sx={{
                bgcolor: "white",
                borderRadius: 3,
              }}
            />

            <Button variant="contained" size="large" sx={{ bgcolor: "white", color: "#2563eb" }}>
              Subscribe
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}