import type { AppProps } from "next/app";
import Head from "next/head"; // ✅ Import Head
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Container } from "@mui/material";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isIndexPage = router.pathname === "/";

  return (
    <>
      <Head>
        <title>IClazz</title>
        <meta
          name="description"
          content="IClazz - Smart learning platform for modern education."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="IClazz" />
        <meta
          property="og:description"
          content="Smart learning platform for modern education."
        />
        <meta property="og:url" content="https://www.iclazzeducation.com" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <Navbar hideMenuItems={isIndexPage} />
      <Container sx={{ minHeight: "80vh", mt: 4 }}>
        <Component {...pageProps} />
      </Container>
      <Footer />
    </>
  );
}
