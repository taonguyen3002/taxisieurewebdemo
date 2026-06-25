// app/blogs/[slug]/page.tsx
export const revalidate = 3600; // 1 hour for better freshness
import { FC } from "react";
import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";
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

// Utility functions for SEO
const getFullImageUrl = (url?: string): string =>
  url?.startsWith("http") ? url : `${process.env.DOMAIN}/${url ?? "default-blogs.png"}`;

const getCleanDescription = (desc: string, length: number = 160): string =>
  desc?.replace(/<[^>]*>/g, "").substring(0, length) || "";

// Generate SEO metadata
export async function generateMetadata({ params }: PostPageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug;

  if (!slug) {
    return {
      title: "404 - Trang không tìm thấy | GrapViet",
      description: "Xin lỗi, trang bạn đang tìm kiếm không tồn tại. Vui lòng kiểm tra URL hoặc quay lại trang chủ.",
      robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
          index: false,
          follow: true,
        },
      },
      openGraph: {
        title: "404 - Trang không tìm thấy | GrapViet",
        description: "Xin lỗi, trang bạn đang tìm kiếm không tồn tại.",
        type: "website",
        siteName: siteConfig.siteName,
      },
    };
  }

  const res = await getPost(slug);
  if (!res?.success || !res?.data) {
    return {
      title: "Bài viết không tồn tại | GrapViet",
      description: "Bài viết bạn tìm kiếm không tồn tại hoặc đã bị xóa.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const post = res.data;
  const imglink = getFullImageUrl(post.image?.url);
  const fullUrl = slug.startsWith(siteConfig.domain) ? slug : `${siteConfig.domain}/bai-viet/${slug}`;
  const cleanDescription = getCleanDescription(post.description, 160);
  const keywords = Array.isArray(post.tags) ? post.tags : [];

  // Twitter Card & Facebook meta tags
  const twitterHandle = process.env.TWITTER_HANDLE || "@GrapViet";

  return {
    title: `${post.title} | GrapViet`,
    description: cleanDescription,
    keywords: [...keywords, siteConfig.keywords].filter(Boolean).join(", "),
    authors: [{ name: post.authorName || "Admin" }],
    creator: post.authorName || "GrapViet",
    publisher: siteConfig.siteName,
    metadataBase: new URL(process.env.DOMAIN || "https://grapviet.com"),
    alternates: {
      canonical: fullUrl,
      languages: {
        "vi-VN": fullUrl,
      },
    },
    openGraph: {
      title: post.title,
      description: cleanDescription,
      url: fullUrl,
      type: "article",
      publishedTime: post.publishedDate,
      modifiedTime: post.modifiedDate || post.publishedDate,
      authors: [post.authorName || "Admin"],
      tags: keywords,
      images: [
        {
          url: imglink,
          width: post.image?.width || 1200,
          height: post.image?.height || 630,
          alt: post.title,
          type: "image/jpeg",
        },
      ],
      siteName: siteConfig.siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: cleanDescription,
      images: [imglink],
      creator: twitterHandle,
    },
    other: {
      "article:published_time": post.publishedDate,
      "article:modified_time": post.modifiedDate || post.publishedDate,
      "article:author": post.authorName || "Admin",
      "article:section": post.category || "Blog",
      "article:tag": keywords.join(", "),
      "og:locale": "vi_VN",
    },
  };
}

const PostPage: FC<PostPageProps> = async ({ params }) => {
  const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug;

  if (!slug) {
    return <Typography color="error">URL không tồn tại</Typography>;
  }

  const res = await getPost(slug);
  if (!res?.success || !res?.data) {
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
  const author = {
    name: post.authorName || "Admin",
    url: post.authorUrl?.startsWith("https://") ? post.authorUrl : `${url}${post.authorUrl}`,
  };
  const fullUrl = slug.startsWith(siteConfig.domain) ? slug : `${siteConfig.domain}/bai-viet/${slug}`;
  const postId = post?._id || slug;
  const fullImageUrl = getFullImageUrl(post.image?.url);
  const cleanDescription = getCleanDescription(post.description);
  const headings = helperArrayHeading(post.content);
  const keywords = Array.isArray(post.tags) ? post.tags : [];
  const estimatedReadingTime = Math.ceil((post.content?.split(" ").length ?? 0) / 200); // 200 words per minute

  // ===== COMPREHENSIVE SCHEMA.ORG MARKUP =====

  // 1. Article Schema - Enhanced
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": fullUrl,
    headline: post.title,
    alternativeHeadline: post.title,
    description: cleanDescription,
    abstract: cleanDescription,
    image: {
      "@type": "ImageObject",
      url: fullImageUrl,
      width: post.image?.width || 1200,
      height: post.image?.height || 630,
      caption: post.title,
    },
    articleBody: post.content,
    author: {
      "@type": "Person",
      name: author.name,
      url: author.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      logo: {
        "@type": "ImageObject",
        url: siteConfig.logo,
        width: 512,
        height: 512,
      },
      url: siteConfig.domain,
    },
    editor: {
      "@type": "Person",
      name: author.name,
    },
    datePublished: post.publishedDate || post.createdAt,
    dateModified: post.modifiedDate || post.publishedDate,
    dateCreated: post.createdAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
    articleSection: post.category || "Blog",
    keywords: keywords.join(", "),
    inLanguage: "vi-VN",
    copyrightYear: new Date(post.publishedDate).getFullYear(),
    copyrightHolder: {
      "@type": "Organization",
      name: siteConfig.siteName,
    },
    commentCount: 0,
    timeRequired: `PT${estimatedReadingTime}M`,
  };

  // 2. Author Schema - Separate
  const authorSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    url: author.url,
    image: fullImageUrl,
    description: `Tác giả của ${siteConfig.siteName}`,
  };

  // 3. Breadcrumb Schema - Enhanced
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: siteConfig.domain,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteConfig.domain}/bai-viet`,
      },
      ...(post.breadcrumbs || []).map((breadcrumb: any, index: number) => ({
        "@type": "ListItem",
        position: index + 3,
        name: breadcrumb.name,
        item: `${siteConfig.domain}${breadcrumb.url}`,
      })),
      {
        "@type": "ListItem",
        position: (post.breadcrumbs?.length || 0) + 3,
        name: post.title,
        item: fullUrl,
      },
    ],
  };

  // 4. Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.siteName,
    url: siteConfig.domain,
    logo: siteConfig.logo,
    description: siteConfig.description,
    sameAs: [process.env.FACEBOOK_URL || "", process.env.TWITTER_URL || "", process.env.LINKEDIN_URL || ""].filter(
      Boolean,
    ),
  };

  // 5. Review/Rating Schema - Only if has likes
  const hasLikes = (post.likes?.length ?? 0) > 0;
  const reviewSchema = hasLikes
    ? {
        "@context": "https://schema.org",
        "@type": "AggregateRating",
        ratingValue: "5.0",
        bestRating: "5.0",
        worstRating: "1",
        ratingCount: post.likes?.length ?? 1,
        reviewCount: post.likes?.length ?? 1,
        name: post.title,
      }
    : null;

  return (
    <>
      {/* ===== STRUCTURED DATA (JSON-LD) ===== */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      {reviewSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      )}

      {/* ===== PAGE CONTENT ===== */}
      <SettingWrapper slug={slug} Component={Header} />
      <article itemScope itemType="https://schema.org/BlogPosting">
        {/* Hidden meta for schema.org */}
        <meta itemProp="headline" content={post.title} />
        <meta itemProp="description" content={cleanDescription} />
        <meta itemProp="image" content={fullImageUrl} />
        <meta itemProp="author" content={author.name} />
        <meta itemProp="datePublished" content={post.publishedDate} />
        <meta itemProp="dateModified" content={post.modifiedDate || post.publishedDate} />

        <Container maxWidth="md">
          {/* Breadcrumbs */}
          <Box component="nav" my={2} aria-label="breadcrumb">
            <BreadcrumbsComponent breadcrumbs={post.breadcrumbs} currentTitle={post.title} />
          </Box>

          {/* Main Post Content */}
          <main className="flex flex-col my-4">
            <header>
              <h1 className="text-wrap text-left text-4xl font-bold text-black mb-4">{post.title}</h1>
            </header>

            {/* Author & Date Info */}
            <Box component="div" display="flex" alignItems="center" mb={3} sx={{ gap: 2 }}>
              <Avatar alt={author.name} src={fullImageUrl} sx={{ width: 48, height: 48 }} />
              <Box>
                <Link href={author.url} title={`Hồ sơ tác giả: ${author.name}`}>
                  <Typography variant="body1" component="span" sx={{ fontWeight: 600 }}>
                    {author.name}
                  </Typography>
                </Link>
                <Box component="div" display="flex" gap={1} flexWrap="wrap" sx={{ fontSize: "0.9rem" }}>
                  <time dateTime={post.publishedDate}>{new Date(post.publishedDate).toLocaleDateString("vi-VN")}</time>
                  <span aria-label="thời gian đọc ước tính">• {estimatedReadingTime} phút đọc</span>
                </Box>
              </Box>
            </Box>

            {/* Featured Image */}
            {post.image?.url && (
              <Box component="figure" my={3} sx={{ margin: "20px 0" }}>
                <Image
                  src={fullImageUrl}
                  alt={post.title}
                  width={post.image?.width || 800}
                  height={post.image?.height || 450}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 100vw"
                  style={{ width: "100%", height: "auto" }}
                />
                {post.image?.caption && (
                  <figcaption className="text-center text-gray-600 text-sm mt-2">{post.image.caption}</figcaption>
                )}
              </Box>
            )}

            {/* Divider */}
            <Divider sx={{ my: 2 }} />

            {/* Post Content */}
            <div itemProp="articleBody">
              <PostContent
                authorUrl={author.url}
                title={post.title}
                author={author.name}
                createdAt={post.publishedDate}
                content={post.content}
              />
            </div>

            {/* Like/Engagement */}
            <LikePost postId={postId} postLikes={post.likes ?? []} />

            {/* Divider */}
            <Divider sx={{ my: 3 }} />

            {/* Tags */}
            <Box component="footer" sx={{ mb: 3 }}>
              <Typography variant="body2" component="span" sx={{ fontWeight: 600, display: "block", mb: 1 }}>
                Thẻ:
              </Typography>
              <Box component="div" display="flex" flexWrap="wrap" gap={1}>
                {keywords.map((tag, index) => (
                  <Chip
                    key={index}
                    label={`#${tag}`}
                    component="span"
                    sx={{ mr: 1, mb: 1, cursor: "pointer", "&:hover": { backgroundColor: "#f0f0f0" } }}
                  />
                ))}
              </Box>
            </Box>
          </main>

          {/* Comments Section */}
          <Box component="section" mb={5} aria-labelledby="comments-heading">
            <CommentsSection postId={postId} />
          </Box>

          {/* FAQ Schema */}
          <Box component="section" mb={5}>
            <FAQSchema content={post.content} />
          </Box>

          {/* Related Posts */}
          <Box component="section" mb={5} aria-labelledby="related-posts-heading">
            <GetReviewBlogsWithTags excludeSlug={post.slug} tags={post.tags} />
          </Box>

          {/* Track Location */}
          <TrackUserLocation />

          {/* Call to Action & Floating Navigation */}
          <SettingWrapper slug={slug} Component={CallPrompt} />
          <SettingWrapper slug={slug} Component={ActionButton} />
          <SettingWrapper slug={slug} Component={LabelBottomNavigation} />
        </Container>
      </article>

      <Footer currentSlug={slug} />
    </>
  );
};

export default PostPage;
