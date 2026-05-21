import axiosInstance from "@/untils/axios";
import { AxiosError } from "axios";

type Result = {
  title: string;
  description: string;
  tags: string[];
  slug: string;
  content: string;
};

type Res = {
  success?: boolean;
  result?: Result;
  message?: string;
  balance?: number;
  error?: string;
};

type ErrorRes = { message: string };

export async function createPostAi(keyword: string) {
  try {
    const response = await axiosInstance.post<Res>(
      "/api/openAi/create/prompt/post",
      { keyword }
    );

    return {
      success: true,
      result: response.data.result,
      balance: response.data.balance,
      message: response.data.message || "Tạo bài viết thành công",
    };
  } catch (error: unknown) {
    const axiosErr = error as AxiosError<ErrorRes>;
    return {
      success: false,
      error:
        axiosErr.response?.data?.message || axiosErr.message || "Có lỗi xảy ra",
    };
  }
}
