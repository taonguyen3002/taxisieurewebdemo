import axiosInstance from "@/untils/axios";

type ApiResult<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
};

// 1. Gửi OTP
export async function sendOtpResetPassword({
  identifier,
}: {
  identifier: string; // email hoặc username
}): Promise<ApiResult> {
  try {
    const { data } = await axiosInstance.post(
      "/api/user/reset-password/send-otp",
      {
        identifier,
      }
    );

    return {
      success: data.success ?? true,
      message: data.message,
    };
  } catch (error: any) {
    console.error("sendOtpResetPassword error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message || "Không thể gửi OTP, thử lại sau.",
    };
  }
}

// 2. Xác minh OTP
export async function verifyOtpResetPassword({
  identifier,
  otp,
}: {
  identifier: string;
  otp: string;
}): Promise<ApiResult> {
  try {
    const { data } = await axiosInstance.post(
      "/api/user/reset-password/verify-otp",
      {
        identifier,
        otp,
      }
    );

    return {
      success: data.success ?? false,
      message: data.message,
    };
  } catch (error: any) {
    console.error("verifyOtpResetPassword error:", error);
    return {
      success: false,
      message:
        error.response?.data?.message || "OTP không hợp lệ hoặc đã hết hạn.",
    };
  }
}

// 3. Cập nhật mật khẩu mới
export async function updatePassword({
  identifier,
  otp,
  newPassword,
}: {
  identifier: string;
  otp: string;
  newPassword: string;
}): Promise<ApiResult> {
  try {
    const { data } = await axiosInstance.post(
      "/api/user/reset-password/update",
      {
        identifier,
        otp,
        newPassword,
      }
    );

    return {
      success: data.success ?? false,
      message: data.message,
    };
  } catch (error: any) {
    console.error("updatePassword error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Không thể đặt lại mật khẩu.",
    };
  }
}
