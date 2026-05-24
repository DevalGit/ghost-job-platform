import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import CampaignIcon from "@mui/icons-material/Campaign";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SecurityIcon from "@mui/icons-material/Security";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const categories = [
  ["Development", "12,400 jobs", CodeIcon],
  ["Design", "4,200 jobs", DesignServicesIcon],
  ["Marketing", "6,800 jobs", CampaignIcon],
  ["AI / ML", "3,900 jobs", PsychologyIcon],
  ["Cybersecurity", "2,700 jobs", SecurityIcon],
  ["Finance", "5,100 jobs", AccountBalanceIcon],
];

export default function Categories() {
  return (
    <Box sx={{ py: 12 }}>
      <Container maxWidth="xl">
        <Typography variant="h3" fontWeight={900} mb={5}>
          Explore Categories
        </Typography>

        <Grid container spacing={3}>
          {categories.map(([title, count, Icon]) => (
            <Grid item xs={12} sm={6} md={4} key={title}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 5,
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 24px 60px rgba(15,23,42,0.1)",
                  },
                }}
              >
                <Icon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" fontWeight={900}>
                  {title}
                </Typography>
                <Typography color="text.secondary">{count}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}