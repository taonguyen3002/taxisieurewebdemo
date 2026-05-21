import axiosInstance from "@/untils/axios";
import type {
  GetHistoryUserBookingResult,
  GetAllBookingResult,
} from "@/types/api/order";
interface GetHistoryPayload {
  userId?: string;
  visitorId: string;
}
const getHistoryUserBooking = async ({
  userId,
  visitorId,
}: GetHistoryPayload): Promise<GetHistoryUserBookingResult> => {
  try {
    const { data } = await axiosInstance.post("/api/booking/get-all/history", {
      userId,
      visitorId,
    });

    return {
      success: true,
      message: data?.message || "success",
      err: data?.err || "",
      result: data.history || [],
    };
  } catch (error) {
    console.error("Failed to get booking history:", error);
    return {
      success: false,
      message: "error",
      err: "can't get history",
      result: [],
    };
  }
};
const getAllOrder = async (): Promise<GetAllBookingResult> => {
  try {
    const { data } = await axiosInstance.get("/api/booking/get-all");
    if (!data.success) {
      return {
        success: false,
        message: "not found",
        result: [],
      };
    }
    return {
      success: data.success ?? true,
      message: data.message ?? "success",
      result: data.result ?? [],
    };
  } catch (error) {
    console.error("Failed to get booking history:", error);
    return {
      success: false,
      message: "error",
      result: [],
    };
  }
};
export { getHistoryUserBooking, getAllOrder };
