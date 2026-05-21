export interface Image {
  _id: string;
  filePath: string;
  alt?: string;
  createdAt: string;
  width?: string;
  height?: string;
}

export interface ImageResult {
  success: boolean;
  message: string;
  images: Image[];
}

export interface CreateImageResult {
  success: boolean;
  message: string;
  imageUrl?: string;
  error?: string;
}

export interface DeleteImageResult {
  success: boolean;
  message: string;
  error?: string;
}
