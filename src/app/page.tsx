// app/blogs/[slug]/Home.tsx

import { Box, Container, Grid, Typography } from "@mui/material";
import GetReviewBlogsWithTags from "@/components/Blogs/GetBlogs/GetReviewWithTag";
import TrackUserLocation from "@/components/TrackLocation";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import Image from "next/image";
import SlideHero from "@/components/Home/Slide/SlideHero";
import TaxiServiceIntro from "@/components/Home/Intro/IntroService";
import PriceTable from "@/components/Home/PriceTable/PriceTable";
import BookingGuide from "@/components/Home/BookingGuide/BookingGuide";
import ServiceList from "@/components/Home/ServiceList/ServiceList";
import StaticSection from "@/components/Home/StaticSection/StaticSection";
import TopDrivers from "@/components/Home/TopDrivers/TopDrivers";
import { featureData, siteConfig } from "@/config/default.config";

import { Feature } from "@/types/Home"; // Import types
import Link from "next/link";
//components
import ActionButton from "@/components/ActionButton";
import LabelBottomNavigation from "@/components/BottomNavigation";
import About1 from "@/components/Home/About";
import Header from "@/components/Header/Header";
import CallPrompt from "@/components/CallPrompt";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: siteConfig.title,
    description: siteConfig.description,
    keywords: siteConfig.keywords.split(","),
    alternates: {
      canonical: siteConfig.domain,
    },
    openGraph: {
      title: siteConfig.title,
      description: siteConfig.description,
      images: [`${siteConfig.logo}`],
      url: siteConfig.domain,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: siteConfig.description,
      images: [`${siteConfig.logo}`],
    },
  };
}
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TaxiService",
            name: siteConfig.name,
            image: `${siteConfig.logo}`,
            telephone: siteConfig.contactInfo.phone,
            areaServed: "Việt Nam",
            url: siteConfig.domain,
            description: siteConfig.description,
          }),
        }}
      />
      <Header />
      {/* Main content */}
      <main>
        <Container className="mt-5 mb-5">
          <SlideHero />
        </Container>
        {/* Introduction Section */}
        <Container>
          <TaxiServiceIntro />
        </Container>
        <Container>
          <PriceTable />
        </Container>
        <Container>
          <About1 />
        </Container>
        {/* Feature Section */}
        <Container
          sx={{
            paddingTop: { xs: "5px", md: "10px" },
            paddingBottom: "20px",
            marginTop: { xs: "5px", md: "10px" },
          }}
        >
          <Grid container spacing={2}>
            {featureData.map((feature: Feature, index: number) => (
              <Grid key={index} sx={{ flex: "1 0 auto" }} item xs={12} md={3}>
                <Box
                  sx={{
                    background: "#5a5afb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    padding: "5px 10px 0",
                    color: "#fff",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <Image
                    src={feature.src}
                    alt={feature.alt}
                    width={60}
                    height={60}
                    style={{ objectFit: "cover" }}
                  />
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h6"
                      sx={{ marginTop: "10px" }}
                      gutterBottom
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {feature.desc}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
        {/* BookingGuide  */}
        <Container>
          <BookingGuide />
        </Container>
        {/* Main Content */}
        <Container>
          <ServiceList />
        </Container>

        {/* static section  */}
        <Container>
          <StaticSection />
        </Container>
        {/* Featured Drivers Section */}
        <Container>
          <TopDrivers />
        </Container>
        <Container sx={{ mx: "auto", px: { xs: 2, md: 0 }, mt: 4, mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link href={"/bai-viet"}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  backgroundImage: "linear-gradient(90deg, #FFD700, #32CD32)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
                gutterBottom
              >
                Bài Viết Gần Nhất
              </Typography>
            </Link>
          </Box>
          <GetReviewBlogsWithTags
            tags={siteConfig.keywords.split(",")}
            limit={16}
          />
        </Container>
        <LabelBottomNavigation />
        <ActionButton />
        <TrackUserLocation />
        <CallPrompt />
      </main>
      <Footer />
    </>
  );
}
