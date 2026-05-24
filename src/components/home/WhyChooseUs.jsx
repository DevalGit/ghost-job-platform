import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import VerifiedIcon from "@mui/icons-material/Verified";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PublicIcon from "@mui/icons-material/Public";

const features = [
  ["Fast Hiring", "Apply quickly and get hired faster.", BoltIcon],
  ["Verified Companies", "Work only with trusted employers.", VerifiedIcon],
  ["AI Matching", "Smart job recommendations for your skills.", AutoAwesomeIcon],
  ["Remote Jobs", "Find global remote opportunities.", PublicIcon],
];

export default function WhyChooseUs() {
  return (
    <Box sx={{ py: 10, bgcolor: "background.default" }}>
      <Container maxWidth="xl">
        <Typography variant="h3" fontWeight={900} mb={5}>
          Why Choose Us
        </Typography>

        <Grid container spacing={3}>
          {features.map(([title, text, Icon]) => (
            <Grid item xs={12} sm={6} md={3} key={title}>
              <Paper sx={{ p: 3, borderRadius: 5, height: "100%" }} elevation={0}>
                <Icon color="primary" sx={{ fontSize: 44, mb: 2 }} />
                <Typography variant="h6" fontWeight={800}>
                  {title}
                </Typography>
                <Typography color="text.secondary" mt={1}>
                  {text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}