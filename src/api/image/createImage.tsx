import axiosInstance from "../../untils/axios";
import type { CreateImageResult } from "@/types/api/image";

async function createImage(file: File): Promise<CreateImageResult> {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const { data } = await axiosInstance.post<CreateImageResult>(
      "/api/images",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Tải Ảnh Lên Thất Bại | Không Có Dữ Liệu",
        error: data.message || "No data",
      };
    }

    return {
      success: true,
      message: "Tải Ảnh Lên Thành Công",
      imageUrl: data.imageUrl,
      error: data.message,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      success: false,
      message: "Tải Ảnh Lên Thất Bại | Lỗi Mạng",
    };
  }
}

export default createImage;
