// app/blogs/[slug]/page.tsx
export const revalidate = 2592000;
import { FC } from "react";
import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Metadata } from "next";
import { getPost } from "@/api/bai-viet/read.api";
import { Box, Typography, Avatar, Divider, Chip, Container } from "@mui/material";
import type { Post } from "@/types/Post";
import PageNotFond from "@/components/PageNotFound";
//import components
import ActionButton from "@/components/ActionButton";
import LabelBottomNavigation from "@/components/BottomNavigation";
import TrackUserLocation from "@/components/TrackLocation";
import LikePost from "@/components/Blogs/LikePost";
import PostContent from "@/components/Blogs/PostContent/PostContent";
import BreadcrumbsComponent from "@/components/Blogs/Breadcrumbs";
import GetReviewBlogsWithTags from "@/components/Blogs/GetBlogs/GetReviewWithTag";
import CallPrompt from "@/components/CallPrompt";
import SettingWrapper from "@/components/SettingWrap";
//helpper
import helperArrayHeading from "@/helpers/extraArrayHeading";
import "@/app/blog.css";
import { siteConfig } from "@/config/default.config";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

// Sử dụng dynamic import cho CommentsSection và FAQSchema
const CommentsSection = dynamic(() => import("@/components/Blogs/CommentsSection/CommentsList"));
const FAQSchema = dynamic(() => import("@/components/Blogs/FAQSchema/FAQSchema"));
const url = siteConfig.domain || process.env.DOMAIN;

type PostPageProps = {
  params: { slug: string[] }; // slug là mảng các segment
};
// Generate SEO metadata
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug;
  if (!slug) {
    return {
      title: "404 - Page Not Found | GrapViet",
      description:
        "Sorry, the page you are looking for cannot be found. Please check the URL or return to our homepage.",
      robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
          index: false,
          follow: true,
        },
      },
      alternates: {
        canonical: `${url}/404`,
      },
      openGraph: {
        title: "404 - Page Not Found | GrapViet",
        description:
          "Sorry, the page you are looking for cannot be found. Please check the URL or return to our homepage.",
        type: "website",
        siteName: "Xe Grap Đồng Nai",
      },
    };
  }
  const res = await getPost(slug);
  if (!res?.success || !res?.data) {
    console.error(`Failed to fetch post with slug: ${slug}`);
    return {
      title: "bài viết không tồn tại",
      description: "The requested page could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  const post = res.data;
  const getFullImageUrl = (url?: string) =>
    url?.startsWith("http") ? url : `${process.env.NEXT_PUBLIC_API_URL}/${url ?? "default-blogs.png"}`;
  const imglink = getFullImageUrl(post.image?.url);
  const canonicalUrl = `${url}/bai-viet/${slug}`;
  const headings = helperArrayHeading(post.content);
  const articleSection = headings.length > 0 ? headings : siteConfig.keywords.split(",");
  return {
    title: post.title,
    description: post.description.substring(0, 160),
    keywords: post.tags,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description.substring(0, 160),
      images: [imglink],
      type: "article",
    },
    other: {
      "article:published_time": post.publishedDate,
      "article:modified_time": post.modifiedDate || post.publishedDate,
      "article:author": post.authorName,
      "article:section": articleSection,
      "article:tag": post.tags.join(", "),
    },
  };
}

const PostPage: FC<PostPageProps> = async ({ params }) => {
  // Kết hợp lại thành chuỗi slug
  const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug;
  if (!slug) {
    return <Typography color="error">URL không tồn tại</Typography>;
  }

  const res = await getPost(slug);
  if (!res?.success || !res?.data) {
    console.error("Failed to fetch post:", res?.error);
    //404 page
    return (
      <>
        <SettingWrapper slug={slug} Component={Header} />
        <PageNotFond />
        <SettingWrapper slug={slug} Component={CallPrompt} />
        <SettingWrapper slug={slug} Component={ActionButton} />
        <SettingWrapper slug={slug} Component={LabelBottomNavigation} />
        <Footer currentSlug={slug} />
      </>
    );
  }
  const post: Post = res.data;
  // Giả sử post có trường _id dùng để xác định bài viết, nếu không hãy dùng slug
  const postId = post?._id || slug;
  const getFullImageUrl = (url?: string) =>
    url?.startsWith("http") ? url : `${process.env.NEXT_PUBLIC_API_URL}/${url ?? "default-blogs.png"}`;
  const imglink = getFullImageUrl(post.image?.url);
  // Schema.org markup cho SEO
  const headings = helperArrayHeading(post.content);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: imglink,
    author: {
      "@type": "Person",
      name: post.authorName,
      url: `${url}${post.authorUrl}`,
    },
    publisher: {
      "@type": "Organization",
      name: "My Blog",
      logo: {
        "@type": "ImageObject",
        url: siteConfig.logo,
      },
    },
    datePublished: post.publishedDate ? post.publishedDate : "",
    dateModified: post.modifiedDate ? post.modifiedDate || post.publishedDate : "",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.domain}/bai-viet/${slug}`,
    },
    articleSection: headings.length > 0 ? headings : siteConfig.keywords.split(","),
    keywords: post?.tags ? post?.tags.join(", ") : siteConfig.keywords.split(","),
  };
  const hasLikes = (post.likes?.length ?? 0) > 0;

  const reviewSchema = hasLikes
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: post.title,
        image: post.image.url,
        description: post.description ?? "",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          bestRating: "5.0",
          ratingCount: post.likes?.length ?? 1,
        },
      }
    : null;
  return (
    <>
      <section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: post.breadcrumbs.map((breadcrumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: breadcrumb.name,
                item: `${siteConfig.domain}${breadcrumb.url}`,
              })),
            }),
          }}
        />
        {reviewSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(reviewSchema),
            }}
          />
        )}
      </section>
      <SettingWrapper slug={slug} Component={Header} />
      <Container>
        {/* Breadcrumbs */}
        <Box my={2}>
          <BreadcrumbsComponent breadcrumbs={post.breadcrumbs} currentTitle={post.title} />
        </Box>

        {/* Main Post Content */}
        <main className="flex flex-col my-4">
          <h1 className="text-wrap text-left text-lg text-black">{post.title}</h1>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar alt={post.authorName} src={post.authorUrl} />
            <Link href={`${post.authorUrl}`} passHref>
              <Typography variant="body1" color="textSecondary" ml={2}>
                By {post?.authorName} | Published on {new Date(post.publishedDate).toLocaleDateString()}
              </Typography>
            </Link>
          </Box>
          {/* Nội dung bài viết */}
          <div>
            <PostContent
              authorUrl={post.authorUrl}
              image={imglink}
              title={post.title}
              author={post.authorName}
              createdAt={post.publishedDate}
              content={post.content}
            />
            <LikePost postId={postId} postLikes={post.likes ?? []} />
            <Divider sx={{ my: 2 }} />
            {post.tags.map((tag, index) => (
              <Chip key={index} label={`#${tag}`} sx={{ mr: 1, mb: 1 }} />
            ))}
          </div>
        </main>

        {/* Comments Section: chỉ hiển thị nếu bài viết tồn tại */}
        <Box mb={5}>
          <CommentsSection postId={postId} />
        </Box>

        {/* FAQ Schema */}
        <FAQSchema content={post.content} />
        <GetReviewBlogsWithTags excludeSlug={post.slug} tags={post.tags} />
        <TrackUserLocation />

        <SettingWrapper slug={slug} Component={CallPrompt} />
        <SettingWrapper slug={slug} Component={ActionButton} />
        <SettingWrapper slug={slug} Component={LabelBottomNavigation} />
      </Container>
      <Footer currentSlug={slug} />
    </>
  );
};

export default PostPage;
