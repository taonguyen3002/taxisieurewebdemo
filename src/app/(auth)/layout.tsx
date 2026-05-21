import { ReactNode } from "react";
import LabelBottomNavigation from "@/components/BottomNavigation";
import ActionButton from "@/components/ActionButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import SettingWrapper from "@/components/SettingWrap";

function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <SettingWrapper Component={Header} />
      {/* Main content */}
      {children}
      <SettingWrapper Component={LabelBottomNavigation} />
      <SettingWrapper Component={ActionButton} />
      <Footer />
    </>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return <AppWrapper>{children}</AppWrapper>;
}
