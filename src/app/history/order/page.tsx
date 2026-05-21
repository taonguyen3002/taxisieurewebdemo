"use client";

import { useUser } from "@/context/UserContext";
import { getHistoryUserBooking } from "@/api/order/getOrder";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { BookingInfo } from "@/types/User";
import Loader from "@/components/Loading";
import ClientMeta from "@/components/Client/ClientMetadata/ClientMetadata";
import generateVisitorId from "@/helpers/createVisitId.helpper";
import { siteConfig } from "@/config/default.config";
import BreadcrumbsComponent from "@/components/Blogs/Breadcrumbs";
const statusStyle = (status: string) => {
  switch (status) {
    case "hoàn thành":
      return "bg-green-500 text-white";
    case "đã hủy":
      return "bg-red-500 text-white";
    case "đang xử lí":
      return "bg-blue-500 text-white";
    case "đã đặt":
      return "bg-indigo-500 text-white";
    default:
      return "bg-yellow-500 text-white";
  }
};

export default function HistoryPage() {
  const [bookings, setBookings] = useState<BookingInfo[]>([]);
  const { user, loading } = useUser();
  const id = user?._id || "";

  useEffect(() => {
    async function fetchHistory() {
      let visitorId = localStorage.getItem("visitor_id");
      if (!visitorId) {
        visitorId = generateVisitorId();
        localStorage.setItem("visitor_id", visitorId);
        return;
      }
      if (id) {
        const res = await getHistoryUserBooking({ visitorId, userId: id });
        if (res.success) {
          setBookings(res.result ?? []);
        } else {
          setBookings([]);
        }
      } else {
        const payload = { visitorId };
        const res = await getHistoryUserBooking(payload);
        if (res.success) {
          setBookings(res.result ?? []);
        } else {
          setBookings([]);
        }
      }
    }

    fetchHistory();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (bookings.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <p className="text-gray-600 text-lg">Bạn chưa có lịch sử đặt xe nào.</p>
      </div>
    );
  }

  return (
    <>
      <ClientMeta
        title={siteConfig.name + " | Lịch Sử Đặt Xe"}
        description={
          siteConfig.description + "Xem lịch sử đặt xe của bạn trên Grap Việt."
        }
        isIndex={false}
      />
      <div className="p-4">
        <BreadcrumbsComponent
          breadcrumbs={[{ name: "Trang Chủ", url: "/" }]}
          currentTitle={"Lịch Sử Đặt Xe"}
        />
        <h1 className="text-2xl font-bold mb-6">Lịch sử đặt xe</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow border rounded p-4 space-y-2"
            >
              <p>
                <strong>Địa chỉ đón:</strong> {booking.addressFrom}
              </p>
              <p>
                <strong>Địa chỉ đến:</strong> {booking.addressTo}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Thời gian:</strong>{" "}
                {booking.createdAt
                  ? format(new Date(booking.createdAt), "HH:mm dd/MM/yyyy")
                  : "N/A"}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Dịch vụ:</strong> {booking.serviceType}
              </p>
              <div className="mt-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                    booking.status || ""
                  )}`}
                >
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10"></div>
      </div>
    </>
  );
}
