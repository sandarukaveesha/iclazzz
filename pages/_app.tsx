import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Container } from '@mui/material';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Container sx={{ minHeight: '80vh', mt: 4 }}>
        <Component {...pageProps} />
      </Container>
      <Footer />
    </>
  );
}