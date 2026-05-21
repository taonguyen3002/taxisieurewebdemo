import "@/app/globals.css";
import { ReactNode } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { UserProvider } from "@/context/UserContext";
import { PreviousPageProvider } from "@/context/PreviousPageContext";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon/favicon.png",
    apple: "/favicon/apple-icon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <head>
        {/* Google Tag Manager script trong <head> */}
        <Script id="gtm-script" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KQ769NZD');
          `}
        </Script>
      </head>
      <body className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 bg-white flex flex-col min-h-screen">
        {/* GTM noscript trong body */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KQ769NZD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <PreviousPageProvider>
          <UserProvider>
            <div className="relative bg-white">{children}</div>
          </UserProvider>
        </PreviousPageProvider>
      </body>
    </html>
  );
}
