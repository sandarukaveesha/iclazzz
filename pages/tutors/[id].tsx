import { useRouter } from 'next/router';
import { Container, Typography, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import { useState, useEffect } from 'react';

// Function to fetch tutor data from Google Sheets
const fetchTutorsData = async () => {
  const sheetId = '1iE6zKoY4sywDhWJKfWtdxm3HmDtTA8GfTsbGnRmzXgk'; // Replace with your actual sheet ID
  const range = 'Sheet1!A2:F'; // Adjust the range based on your sheet structure
  const apiKey = 'AIzaSyB1avXYf2C6lrU-wy5HcZkQK3p6QDWm0TU'; // Google API key

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
  );

  const data = await res.json();
  const tutors = data.values?.map((row: any) => ({
    id: row[0],
    name: row[1],
    subject: row[2],
    bio: row[3],
     }));

  return tutors;
};

export default function TutorProfile({ tutor }) {
  const router = useRouter();
  const { id } = router.query;

  if (!tutor) {
    return (
      <Container sx={{ py: 5, textAlign: 'center' }}>
        <Typography variant="h4" color="error">
          Tutor not found!
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 5 }}>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, boxShadow: 3, borderRadius: 3 }}>
        {/* <CardMedia component="img" image={tutor.image} alt={tutor.name} sx={{ width: { md: 300 }, height: 'auto' }} /> */}
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h3" fontWeight="bold">
            {tutor.name}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            {tutor.subject}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {tutor.bio}
          </Typography>

          {/* Contact Section */}
          {/* <Box sx={{ mt: 3 }}>
            <Typography variant="h6">📧 Contact:</Typography>
            <Typography variant="body1">{tutor.email}</Typography>
          </Box> */}

          {/* Back Button */}
          <Button variant="contained" color="secondary" sx={{ mt: 3 }} onClick={() => router.push('/tutors')}>
            Back to Tutors
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

// Fetch tutor data for the specific ID during server-side rendering
export async function getServerSideProps(context) {
  const { id } = context.params;

  // Fetch the tutors data from Google Sheets
  const tutors = await fetchTutorsData();

  // Find the tutor with the matching ID
  const tutor = tutors?.find((t) => t.id.toString() === id);

  return {
    props: {
      tutor: tutor || null,
    },
  };
}