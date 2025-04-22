import type { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isIndexPage = router.pathname === "/";
  const canonicalUrl = `https://www.iclazzeducation.com${router.asPath}`;

  // Structured data for organization
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "IClazz",
    url: "https://www.iclazzeducation.com",
    logo: "https://www.iclazzeducation.com/logo.png",
    description: "Smart learning platform for modern education.",
    founder: {
      "@type": "Person",
      name: "Your Name", // Replace with actual founder name
    },
    sameAs: [
      // Add your social media profiles here
      "https://twitter.com/iclazz",
      "https://facebook.com/iclazz",
      "https://linkedin.com/company/iclazz",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Your Street Address", // Add if applicable
      addressLocality: "Your City",
      addressRegion: "Your State",
      postalCode: "Your ZIP",
      addressCountry: "Sri Lanka",
    },
  };

  // Structured data for website
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "IClazz",
    url: "https://www.iclazzeducation.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.iclazzeducation.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>IClazz - Smart Learning Platform for Modern Education</title>
        <meta
          name="description"
          content="IClazz is transforming education with innovative learning solutions. Join our smart platform for modern teaching and learning experiences."
        />
        <meta
          name="keywords"
          content="IClazz, education platform, online learning, smart education, e-learning, modern education"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta
          property="og:title"
          content="IClazz - Smart Learning Platform for Modern Education"
        />
        <meta
          property="og:description"
          content="Transform your education with IClazz's innovative learning platform."
        />
        <meta
          property="og:image"
          content="https://www.iclazzeducation.com/images/social-preview.jpg"
        />
        <meta property="og:site_name" content="IClazz" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@iclazz" />
        <meta name="twitter:creator" content="@iclazz" />
        <meta
          name="twitter:title"
          content="IClazz - Smart Learning Platform for Modern Education"
        />
        <meta
          name="twitter:description"
          content="Transform your education with IClazz's innovative learning platform."
        />
        <meta
          name="twitter:image"
          content="https://www.iclazzeducation.com/images/social-preview.jpg"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
      </Head>

      <Navbar hideMenuItems={isIndexPage} />
      <Container sx={{ minHeight: "80vh", mt: 4 }}>
        <Analytics />
        <Component {...pageProps} />
      </Container>
      <Footer />
    </>
  );
}
