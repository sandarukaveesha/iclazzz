import { Container, Typography, TextField, Button } from '@mui/material';

export default function Contact() {
  return (
    <Container>
      <Typography variant="h4">Contact Us</Typography>
      <TextField label="Your Name" fullWidth margin="normal" />
      <TextField label="Your Email" fullWidth margin="normal" />
      <TextField label="Message" multiline rows={4} fullWidth margin="normal" />
      <Button variant="contained" color="primary">Send</Button>
    </Container>
  );
}
