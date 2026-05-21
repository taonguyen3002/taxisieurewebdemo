import { ReactNode } from "react";

import LabelBottomNavigation from "@/components/BottomNavigation";
import ActionButton from "@/components/ActionButton";
import TrackUserLocation from "@/components/TrackLocation";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import ClientMetadata from "@/components/Client/ClientMetadata/ClientMetadata";
import SettingWrapper from "@/components/SettingWrap";
function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <ClientMetadata title="Lịch sử đặt taxi | Taxi Grab Liên Tỉnh" />
      <SettingWrapper Component={Header} />
      {/* Main content */}
      {children}
      <SettingWrapper Component={LabelBottomNavigation} />
      <SettingWrapper Component={ActionButton} />
      <TrackUserLocation />
      <Footer />
    </>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return <AppWrapper>{children}</AppWrapper>;
}
