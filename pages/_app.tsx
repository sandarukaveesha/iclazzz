import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Container } from "@mui/material";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isIndexPage = router.pathname === "/"; // Check if we're on the index page
  return (
    <>
      <Navbar hideMenuItems={isIndexPage} />
      <Container sx={{ minHeight: "80vh", mt: 4 }}>
        <Component {...pageProps} />
      </Container>
      <Footer />
    </>
  );
}
