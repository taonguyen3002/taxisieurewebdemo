"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getImage } from "@/api/image/getImage";
import type { Image, ImageResult } from "@/types/api/image";

interface ImageContextType {
  images: Image[];
  setImages: (images: Image[]) => void;
  addImage: (image: Omit<Image, "_id" | "createdAt">) => Promise<Image>;
  removeImage: (id: string) => void;
  updateImage: (id: string, updates: Partial<Image>) => void;
  clearImages: () => void;
  getImageById: (id: string) => Image | undefined;
  getRecentImages: (limit?: number) => Image[];
  loading: boolean;
  error: string | null;
}

export const ImageContext = createContext<ImageContextType | undefined>(
  undefined
);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [images, setImagesState] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load images on mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await getImage();

        if (response.success && response.images) {
          setImagesState(response.images);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError("Failed to load images");
        console.error("Error loading images:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const setImages = (newImages: Image[]) => {
    setImagesState(newImages);
  };

  const addImage = async (imageData: Omit<Image, "_id" | "createdAt">) => {
    const newImage: Image = {
      ...imageData,
      _id: `temp_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setImagesState((prev) => [newImage, ...prev]);
    return newImage;
  };

  const removeImage = (id: string) => {
    setImagesState((prev) => prev.filter((img) => img._id !== id));
  };

  const updateImage = (id: string, updates: Partial<Image>) => {
    setImagesState((prev) =>
      prev.map((img) => (img._id === id ? { ...img, ...updates } : img))
    );
  };

  const getImageById = (id: string) => {
    return images.find((img) => img._id === id);
  };

  const getRecentImages = (limit = 20) => {
    return [...images]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, limit);
  };

  const clearImages = () => {
    setImagesState([]);
  };

  return (
    <ImageContext.Provider
      value={{
        images,
        setImages,
        addImage,
        removeImage,
        updateImage,
        clearImages,
        getImageById,
        getRecentImages,
        loading,
        error,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImages = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImages must be used within an ImageProvider");
  }
  return context;
};
