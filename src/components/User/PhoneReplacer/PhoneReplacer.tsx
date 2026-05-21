"use client";
import { useEffect } from "react";

interface Phone {
  phone?: string;
}

export default function PhoneReplacer({ phone }: Phone) {
  useEffect(() => {
    if (!phone) return;

    const links = document.querySelectorAll('a[href^="tel:"]');
    const zaloLinks = document.querySelectorAll('a[href^="https://zalo.me/"]');

    links.forEach((link) => {
      if (link.getAttribute("href") === "tel:0898335292") {
        link.setAttribute("href", `tel:${phone}`);
        if (link.textContent?.includes("0898335292")) {
          link.textContent = link.textContent.replace("0898335292", phone);
        }
      }
    });

    zaloLinks.forEach((link) => {
      if (link.getAttribute("href") === "https://zalo.me/0898335292") {
        link.setAttribute("href", `https://zalo.me/${phone}`);
        if (link.textContent?.includes("0898335292")) {
          link.textContent = link.textContent.replace("0898335292", phone);
        }
      }
    });
    console.log("succes replace");
  }, [phone]);

  return null;
}
