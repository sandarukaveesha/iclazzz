import { Box, Container, Grid, Link, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#1976D2', color: 'white', py: 2, mt: 1 }}>
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          © {new Date().getFullYear()} IClazz. All rights reserved.
        </Typography>
    </Box>
  );
}