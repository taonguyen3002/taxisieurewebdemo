import { Metadata } from "next";
import { Post } from "../types/Post";

const BaseApi = process.env.NEXT_PUBLIC_API_URL ?? "https://api.taxinhanh247.pro.vn";
const UrlWeb = process.env.DOMAIN || "";

export async function generateMetadata(post: Post, slug: string): Promise<Metadata> {
  const fullImageUrl = post?.image?.url ? `${BaseApi}${post.image.url}` : `${UrlWeb}/default-image.jpg`;

  return {
    title: post.title,
    description: post.description.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.description.substring(0, 160),
      url: `${UrlWeb}/blogs/${slug}`,
      images: [fullImageUrl],
      type: "article",
    },
    keywords: post.tags,
  };
}
