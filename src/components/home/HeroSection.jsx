import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  Stack,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function HeroSection() {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #f8fbff 0%, #eef5ff 45%, #ffffff 100%)",
        py: { xs: 7, md: 10 },
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={7} alignItems="center">
          <Grid item xs={12} md={6}>
            <Chip label="Trusted by 4,800+ companies" color="primary" sx={{ mb: 3 }} />

            <Typography
              sx={{
                fontSize: { xs: 42, md: 72 },
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-2px",
                mb: 3,
              }}
            >
              Find the job that fits your life
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 17, md: 20 },
                color: "text.secondary",
                lineHeight: 1.8,
                maxWidth: 620,
                mb: 4,
              }}
            >
              Search verified jobs, connect with top companies, and apply faster
              with a premium job discovery experience.
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: 1.5,
                borderRadius: 5,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr auto" },
                gap: 1.5,
                boxShadow: "0 24px 70px rgba(15,23,42,0.12)",
                border: "1px solid rgba(15,23,42,0.08)",
              }}
            >
              <TextField
                placeholder="Job title, keyword"
                fullWidth
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: "primary.main" }} />,
                }}
              />

              <TextField
                placeholder="City or remote"
                fullWidth
                InputProps={{
                  startAdornment: <LocationOnIcon sx={{ mr: 1, color: "primary.main" }} />,
                }}
              />

              <Button
                variant="contained"
                size="large"
                sx={{
                  px: 5,
                  borderRadius: 3,
                  fontWeight: 800,
                  textTransform: "none",
                  background: "linear-gradient(135deg,#2563eb,#0ea5e9)",
                }}
              >
                Search
              </Button>
            </Paper>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={4}>
              <Button variant="contained" size="large" sx={{ borderRadius: 3 }}>
                Find Jobs
              </Button>
              <Button variant="outlined" size="large" sx={{ borderRadius: 3 }}>
                Post a Job
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                minHeight: { xs: 420, md: 560 },
                borderRadius: 8,
                background: "linear-gradient(135deg,#2563eb,#0ea5e9)",
                boxShadow: "0 35px 100px rgba(37,99,235,0.35)",
                overflow: "hidden",
                p: 5,
                color: "white",
              }}
            >
              <Typography variant="h3" fontWeight={900}>
                25,000+
              </Typography>
              <Typography sx={{ opacity: 0.9, mb: 5 }}>
                active jobs from verified companies
              </Typography>

              <Paper
                sx={{
                  p: 3,
                  borderRadius: 5,
                  width: "80%",
                  backdropFilter: "blur(20px)",
                  background: "rgba(255,255,255,0.9)",
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <WorkIcon color="primary" />
                  <Box>
                    <Typography fontWeight={800}>Senior React Developer</Typography>
                    <Typography color="text.secondary">Remote · $120k/year</Typography>
                  </Box>
                </Stack>
              </Paper>

              <Paper
                sx={{
                  p: 3,
                  borderRadius: 5,
                  width: "70%",
                  position: "absolute",
                  right: 35,
                  bottom: 55,
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <TrendingUpIcon color="primary" />
                  <Box>
                    <Typography fontWeight={800}>89% faster hiring</Typography>
                    <Typography color="text.secondary">With smart matching</Typography>
                  </Box>
                </Stack>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}