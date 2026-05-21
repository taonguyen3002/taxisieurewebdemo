// components/SelectImage.tsx
"use client";
import { useState, useRef } from "react";
import { useImages } from "@/context/ImageContext";
import deletedImage from "@/api/image/deleteImage";
import createImage from "@/api/image/createImage";

interface SelectImageProps {
  data: (imageUrl: string) => void;
  title: string;
}

const SelectImage: React.FC<SelectImageProps> = ({ data, title }) => {
  const {
    images: contextImages,
    addImage,
    removeImage,
    loading: contextLoading,
  } = useImages();

  const [showImageModal, setShowImageModal] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = (imagePath: string) => {
    data(imagePath);
    setShowImageModal(false);
  };

  const handleDeleteImage = async (
    imageId: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    if (window.confirm("Bạn có chắc chắn muốn xóa ảnh này?")) {
      try {
        await deletedImage(imageId);
        removeImage(imageId);
        setMessage({ type: "success", text: "Xóa ảnh thành công" });
      } catch (error) {
        setMessage({ type: "error", text: "Không thể xóa ảnh" });
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "Vui lòng chọn file ảnh" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({
        type: "error",
        text: "Kích thước file không được vượt quá 5MB",
      });
      return;
    }

    setUploading(true);
    try {
      const res = await createImage(file);
      if (res.success && res.imageUrl) {
        addImage({
          filePath: res.imageUrl,
          alt: file.name,
        });
        setMessage({ type: "success", text: "Upload ảnh thành công" });
      } else {
        setMessage({ type: "error", text: "Không thể upload ảnh" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Lỗi khi upload ảnh" });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowImageModal(true)}
        disabled={contextLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {contextLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          title
        )}
      </button>

      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-xl font-semibold mb-4">Chọn ảnh</h2>

            <div className="mb-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={handleUploadClick}
                disabled={uploading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
              >
                {uploading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Upload ảnh"
                )}
              </button>
            </div>

            {message && (
              <div
                className={`mb-4 p-3 rounded ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {contextImages.map((img) => (
                <div
                  key={img._id}
                  className="group relative aspect-square rounded-lg overflow-hidden border border-gray-200"
                >
                  <img
                    src={img.filePath}
                    alt={img.alt}
                    onClick={() => handleImageClick(img.filePath)}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-75 transition-opacity"
                  />
                  <button
                    onClick={(e) => handleDeleteImage(img._id, e)}
                    className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectImage;
