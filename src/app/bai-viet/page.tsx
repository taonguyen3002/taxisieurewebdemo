"use client";
import React, { useEffect, useState, Suspense } from "react";
import { Container } from "@mui/material";
import Link from "next/link";
import { Post } from "@/types/Post";
import Pagination from "@mui/material/Pagination";
import { useSearchParams, useRouter } from "next/navigation";
//api
import { getPostslicePage } from "@/api/bai-viet/read.api";
import TrackUserLocation from "@/components/TrackLocation";
// Material-UI components for Snackbar and Alert
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Loading from "@/components/Loading/Loading";
import Image from "next/image";
import ClientMeta from "@/components/Client/ClientMetadata/ClientMetadata";
import { siteConfig } from "@/config/default.config";
import Footer from "@/components/Footer";
import BreadcrumbsComponent from "@/components/Blogs/Breadcrumbs";
import { Header } from "@/components/Header";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BlogListContent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  //user from useUser context
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [totalPages, setTotalPages] = useState(1);
  // Handler for closing snackbar
  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
    // Reset success state after closing snackbar
    setSnackbar({
      open: false,
      message: "",
      severity: "success",
    });
  };
  // state to manage snackbar
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchPosts = async (currentPage: number) => {
    const limit = 20;
    const res = await getPostslicePage(currentPage, limit);
    if (res && res.success) {
      if (Array.isArray(res.post)) {
        setPosts(res.post);
        setTotalPages(res.totalPages || 1);
      } else {
        setPosts([]);
        setTotalPages(1);
        console.warn("Invalid post data received");
      }
    }
  };
  useEffect(() => {
    fetchPosts(page);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/bai-viet?${params.toString()}`);
  }, [page, router, searchParams]);

  // Modify page change handler
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  if (posts.length === 0) {
    return (
      <>
        <ClientMeta
          title={`Trang ${page} | ${siteConfig.name}`}
          slug={`bai-viet?page=${page}`}
          isIndex={true}
          description={
            "taxi giá rẻ liên tỉnh đặt taxi đưa đón tận nơi đặt taxi 4 chỗ 7 chỗ Gọi 0898335292" +
            siteConfig.name
          }
        />
        <div>
          <Header />
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="my-6">
              <BreadcrumbsComponent
                breadcrumbs={[{ name: "Trang Chủ", url: "/" }]}
                currentTitle={`Bài Viết Trang ${page}`}
              />
            </div>
            <h2 className="text-2xl font-bold mb-6">Danh sách bài viết </h2>
            <div className="text-center text-gray-500">
              Không có bài viết nào.
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }
  return (
    <>
      {/* Metadata for SEO */}
      <ClientMeta
        title={`Trang ${page} | ${siteConfig.name}`}
        slug={`bai-viet?page=${page}`}
        isIndex={true}
        description={
          "taxi giá rẻ liên tỉnh đặt taxi đưa đón tận nơi đặt taxi 4 chỗ 7 chỗ Gọi 0898335292" +
          siteConfig.name
        }
      />
      <div>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="my-6">
            <BreadcrumbsComponent
              breadcrumbs={[{ name: "Trang Chủ", url: "/" }]}
              currentTitle={`Bài Viết Trang ${page}`}
            />
          </div>
          <h2 className="text-2xl font-bold mb-6">Danh sách bài viết </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {posts.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded shadow hover:shadow-md transition duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative w-full h-48 sm:h-56 md:h-60">
                  <Image
                    src={
                      blog?.image?.url
                        ? `${blog.image.url}`
                        : "/defaul-blog.jpg"
                    }
                    alt={blog.title ?? "Grab Đặt Xe Liên Tỉnh"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                  <p className="text-sm text-gray-600 flex-grow">
                    {blog.description.length > 100
                      ? blog.description.substring(0, 100) + "..."
                      : blog.description}
                  </p>
                  <div className="mt-4 text-right">
                    <Link href={`/bai-viet/${blog.slug}`}>
                      <span className="inline-block bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded hover:bg-blue-700 transition">
                        Đọc tiếp
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex items-center space-x-2">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </div>
          </div>

          {/* Snackbar MUI (hoặc thay bằng toast Tailwind nếu muốn) */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </div>
        <Footer />
      </div>
    </>
  );
};
const BlogListPage: React.FC = () => {
  return (
    <Suspense
      fallback={
        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <Loading />
        </Container>
      }
    >
      <BlogListContent />
      <TrackUserLocation />
    </Suspense>
  );
};

export default BlogListPage;
