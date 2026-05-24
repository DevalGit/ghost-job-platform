import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Rating,
  Typography,
} from "@mui/material";

const companies = [
  ["Google", 42, 4.8, "G"],
  ["Microsoft", 38, 4.7, "M"],
  ["Amazon", 51, 4.5, "A"],
  ["Netflix", 24, 4.6, "N"],
];

export default function TopCompanies() {
  return (
    <Box sx={{ py: 12 }}>
      <Container maxWidth="xl">
        <Typography variant="h3" fontWeight={900} mb={5}>
          Top Companies Hiring
        </Typography>

        <Grid container spacing={3}>
          {companies.map(([name, jobs, rating, logo]) => (
            <Grid item xs={12} sm={6} md={3} key={name}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 5,
                  textAlign: "center",
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 24px 60px rgba(15,23,42,0.1)",
                  },
                }}
              >
                <Avatar
                  sx={{
                    mx: "auto",
                    mb: 2,
                    width: 76,
                    height: 76,
                    bgcolor: "primary.main",
                    fontSize: 32,
                    fontWeight: 900,
                  }}
                >
                  {logo}
                </Avatar>

                <Typography variant="h6" fontWeight={900}>
                  {name}
                </Typography>

                <Rating value={rating} precision={0.1} readOnly size="small" />

                <Typography color="text.secondary" mb={3}>
                  {jobs} open positions
                </Typography>

                <Button variant="outlined" fullWidth sx={{ borderRadius: 3 }}>
                  View Company
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}