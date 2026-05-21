import { ReactNode } from "react";
import LabelBottomNavigation from "@/components/BottomNavigation";
import ActionButton from "@/components/ActionButton";
import TrackUserLocation from "@/components/TrackLocation";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import CallPrompt from "@/components/CallPrompt";
import SettingWrapper from "@/components/SettingWrap";
import GetReviewBlogsWithTags from "@/components/Blogs/GetBlogs/GetReviewWithTag";
import { siteConfig } from "@/config/default.config";

function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <SettingWrapper Component={Header} />
      <main className="flex gap-2 flex-col items-center justify-center mx-auto min-h-screen bg-gradient-to-br from-sky-50 to-white ">
        <div className="flex flex-col items-center justify-center py-10 mx-auto w-full">
          {children}
        </div>
        <GetReviewBlogsWithTags
          limit={20}
          tags={siteConfig.keywords.split(",")}
        />

        <SettingWrapper Component={LabelBottomNavigation} />
        <SettingWrapper Component={ActionButton} />
        <SettingWrapper Component={CallPrompt} />
        <TrackUserLocation />
      </main>
      <Footer />
    </>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return <AppWrapper>{children}</AppWrapper>;
}
