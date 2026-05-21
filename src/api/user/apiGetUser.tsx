import axiosInstance from "../../untils/axios";
import axios, { AxiosError } from "axios";
import type { UserProfile } from "@/types/User";
interface ApiResponse {
  success: boolean;
  result: UserProfile | null;
  err?: string;
}
async function getUser(id: string) {
  try {
    const { data } = await axios.get<ApiResponse>(
      `https://datxecongnghe.io.vn/api/user?id=${id}`,
      {
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "application/json",
          Origin:
            process.env.NEXT_PUBLIC_BASE_URL ?? "https://datxenhanh-24h.pro.vn",
        },
      }
    );
    if (!data.success) {
      return {
        success: false,
        data: null,
      };
    }
    return {
      success: true,
      data: data.result,
      err: "",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: null,
    };
  }
}
async function getAllUsers() {
  try {
    const { data } = await axiosInstance(`/api/user/get-all`);
    if (!data.success) {
      return {
        success: data.success ?? false,
        users: data.users ?? [],
        err: data.message ?? "",
      };
    }
    return {
      success: data.success ?? true,
      users: data.users ?? [],
      err: data.message ?? "",
    };
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (typeof error === "object" && error !== null) {
      const axiosError = error as AxiosError<{ message?: string }>;
      if (
        axiosError.response?.data?.message &&
        typeof axiosError.response.data.message === "string"
      ) {
        errorMessage = axiosError.response.data.message;
      } else if (
        "message" in error &&
        typeof (error as Error).message === "string"
      ) {
        errorMessage = (error as Error).message;
      }
    }
    return {
      success: false,
      users: [],
      err: errorMessage,
    };
  }
}

export { getUser, getAllUsers };
