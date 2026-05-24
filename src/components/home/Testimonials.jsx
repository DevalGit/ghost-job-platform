import { Avatar, Box, Container, Grid, Paper, Rating, Typography } from "@mui/material";

const testimonials = [
  {
    name: "Sarah Miller",
    role: "Product Designer",
    text: "I found my dream job within two weeks. The platform feels premium and simple.",
  },
  {
    name: "Alex Johnson",
    role: "React Developer",
    text: "The job recommendations were accurate and the application process was smooth.",
  },
  {
    name: "Priya Shah",
    role: "Marketing Manager",
    text: "Clean interface, verified companies, and great remote job listings.",
  },
];

export default function Testimonials() {
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="xl">
        <Typography variant="h3" fontWeight={900} mb={5}>
          Success Stories
        </Typography>

        <Grid container spacing={3}>
          {testimonials.map((item) => (
            <Grid item xs={12} md={4} key={item.name}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 5, border: "1px solid", borderColor: "divider" }}>
                <Rating value={5} readOnly />
                <Typography mt={2} color="text.secondary">
                  “{item.text}”
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3 }}>
                  <Avatar>{item.name[0]}</Avatar>
                  <Box>
                    <Typography fontWeight={800}>{item.name}</Typography>
                    <Typography color="text.secondary" fontSize={14}>
                      {item.role}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}