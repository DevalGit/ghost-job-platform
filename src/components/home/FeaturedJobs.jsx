import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const jobs = [
  ["Frontend Developer", "Google", "Remote", "$90k - $120k", "Full Time", "G"],
  ["Product Designer", "LinkedIn", "Berlin", "$70k - $95k", "Hybrid", "L"],
  ["AI Engineer", "OpenAI", "San Francisco", "$130k - $180k", "Full Time", "O"],
  ["Backend Developer", "Microsoft", "London", "$100k - $140k", "Remote", "M"],
];

export default function FeaturedJobs() {
  return (
    <Box sx={{ py: 12, bgcolor: "background.default" }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 5 }}>
          <Typography variant="h3" fontWeight={900}>
            Featured Jobs
          </Typography>
          <Typography color="text.secondary" fontSize={18}>
            Explore premium roles from verified companies.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {jobs.map(([title, company, location, salary, type, logo]) => (
            <Grid item xs={12} sm={6} lg={3} key={title}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: "100%",
                  borderRadius: 5,
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 28px 70px rgba(15,23,42,0.12)",
                  },
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                  <Avatar sx={{ bgcolor: "primary.main", width: 52, height: 52 }}>
                    {logo}
                  </Avatar>
                  <Box>
                    <Typography fontWeight={900}>{company}</Typography>
                    <Typography color="text.secondary" fontSize={14}>
                      Verified company
                    </Typography>
                  </Box>
                </Stack>

                <Typography variant="h6" fontWeight={900}>
                  {title}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={0.5} mt={1}>
                  <LocationOnIcon fontSize="small" color="action" />
                  <Typography color="text.secondary">{location}</Typography>
                </Stack>

                <Stack direction="row" spacing={1} mt={3} flexWrap="wrap">
                  <Chip label={salary} />
                  <Chip label={type} color="primary" variant="outlined" />
                </Stack>

                <Button fullWidth variant="contained" sx={{ mt: 4, borderRadius: 3 }}>
                  Apply Now
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}