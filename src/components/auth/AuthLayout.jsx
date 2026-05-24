import { Box, Container, Paper, Typography } from "@mui/material";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #eef4ff 0%, #f8fafc 45%, #ffffff 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            overflow: "hidden",
            borderRadius: 5,
            boxShadow: "0 20px 60px rgba(15, 23, 42, 0.08)",
          }}
        >
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              justifyContent: "center",
              p: 6,
              color: "white",
              background:
                "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
            }}
          >
            <Typography variant="h3" fontWeight={800} mb={2}>
              JobPortal
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
              Find better jobs, connect with top companies, and manage your
              career journey with confidence.
            </Typography>
          </Box>

          <Box sx={{ p: { xs: 3, sm: 5, md: 6 } }}>
            <Typography variant="h4" fontWeight={800} mb={1}>
              {title}
            </Typography>
            <Typography color="text.secondary" mb={4}>
              {subtitle}
            </Typography>

            {children}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}