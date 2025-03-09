import Link from 'next/link';
import { Container, Typography, Button } from '@mui/material';

export default function Home() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>Welcome to Tutor Finder</Typography>
      <Button variant="contained" color="primary" href="/tutors">View Tutors</Button>
    </Container>
  );
}
