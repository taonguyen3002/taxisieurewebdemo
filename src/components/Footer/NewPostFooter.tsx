import React from "react";
import { Link } from "@mui/material";
import NextLink from "next/link";
import { getAllPosts } from "@/api/bai-viet/read.api";
type Post = {
  _id: string;
  slug: string;
  title: string;
};
export default async function NewPostFooter({
  currentSlug,
}: {
  currentSlug?: string;
}) {
  const res = await getAllPosts(5);
  // Add debug logging
  if (!res.success) {
    console.error("Failed to fetch posts:", res.error);
  }

  const posts =
    res.success && Array.isArray(res.data)
      ? res.data
          .filter((post) => !currentSlug || post.slug !== currentSlug)
          .map((post) => ({
            _id: post._id,
            slug: post.slug,
            title: post.title,
          }))
      : [];

  if (!posts.length) {
    return null;
  }
  return (
    <ul className="space-y-2">
      {posts.map((post: Post) => (
        <li key={post._id}>
          <Link
            component={NextLink}
            sx={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
            href={`/bai-viet/${post.slug}`}
            color="inherit"
            display="block"
            underline="hover"
          >
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
