"use client";

import { useEffect } from "react";
import axiosInstance from "@/untils/axios";
import { useUser } from "@/context/UserContext";
import generateVisitorId from "@/helpers/createVisitId.helpper";

export default function TrackUserLocation() {
  const { user } = useUser();

  useEffect(() => {
    // Không track admin
    if (user?.role === "admin" || user?.role === "supperAdmin") return;

    let visitorId = localStorage.getItem("visitor_id");
    if (!visitorId) {
      visitorId = generateVisitorId();
      localStorage.setItem("visitor_id", visitorId);
    }

    const getSlugFromUrl = (url: string) => {
      try {
        const parsed = new URL(url);
        const segments = parsed.pathname.split("/").filter(Boolean);
        return segments.length ? segments[segments.length - 1] : "home";
      } catch {
        return "unknown";
      }
    };

    function getTrafficSource(url: string) {
      const lower = url.toLowerCase();
      if (lower.includes("gclid") || lower.includes("gbraid")) return "google_ads";
      if (lower.includes("fbclid")) return "facebook";
      if (lower.includes("zalo")) return "zalo";
      else {
        try {
          const parsedUrl = new URL(lower);
          const pathSegments = parsedUrl.pathname.split("/").filter(Boolean);
          if (pathSegments.length === 0) return "[SEO] home";

          const lastSegment = pathSegments[pathSegments.length - 1];
          const cleanedText = lastSegment.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();

          return `[SEO] ${cleanedText}`;
        } catch (error) {
          console.warn(error);
          return "seo";
        }
      }
    }

    const sendTrackingData = async (lat?: number, lon?: number) => {
      const url = window.location.href;

      const payload = {
        lat,
        lon,
        slug: getSlugFromUrl(url), // ✅ slug gửi kèm
        referrer: getTrafficSource(url), // ✅ source rõ ràng
        userAgent: navigator.userAgent,
        visitorId,
      };

      try {
        await axiosInstance.post("/api/traffic/create/tracking", payload);
      } catch (err) {
        console.warn("Tracking failed", err);
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          sendTrackingData(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          sendTrackingData();
        }
      );
    } else {
      sendTrackingData();
    }
  }, [user?.role]);

  return null;
}
