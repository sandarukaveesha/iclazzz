import { Box, Typography, Button, Container } from '@mui/material';

export default function HeroBanner() {
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 250, md: 400 },
        backgroundImage: 'url(/hero-banner.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        boxShadow: 3,
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h3" fontWeight="bold" sx={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}>
          Find Your Perfect Tutor
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, textShadow: '1px 1px 5px rgba(0,0,0,0.6)' }}>
          Expert tutors ready to help you excel in your studies.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 3, px: 4, py: 1.5 }}>
          Get Started
        </Button>
      </Container>
    </Box>
  );
}