"use client";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Container, TextField, Button, Box, Autocomplete } from "@mui/material";
import SelectImage from "@/components/SelectImage/SelectImg";
import TagInput from "@/components/Blogs/TagInput/TagInput";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { CategoryPostType, Post } from "@/types/Post";
//api
import { getPostById } from "@/api/bai-viet/read.api";
import { updatePost } from "@/api/bai-viet/apiUpdate";
import { useUser } from "@/context/UserContext";
import { usePosts } from "@/context/PostContext";
import { useBreadcrumbs } from "@/hooks/useBreacrumb";
import Loader from "@/components/Loading";
import ClientMetadata from "@/components/Client/ClientMetadata/ClientMetadata";
import "@/app/blog.css";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Editor = dynamic(
  () => import("@/components/EdittorWYSIWYG/Ckeditor/CKEditorComponent")
);

const EditPost: React.FC = () => {
  const {
    breadcrumbs,
    setBreadcrumbs,
    addBreadcrumb,
    removeBreadcrumb,
    updateBreadcrumb,
  } = useBreadcrumbs();
  //context use
  const { user } = useUser();
  const { refreshPosts } = usePosts();
  //state
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [authorName, setAuthorName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [urlImage, setUrlImage] = useState<string>("");
  const [image, setImage] = useState<{ url: string; alt: string }>({
    url: "",
    alt: "",
  });
  const [description, setDescription] = useState<string>("");
  const [authorUrl, setAuthorUrl] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState<{ name: string; url: string }>({
    name: "Trang Chủ",
    url: "/",
  });

  // Snackbar state for notifications
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const _id = user?._id || "";
  // Lấy tên người dùng từ thông tin người dùng hiện tại
  const username = user?.fullname || user?.username || "Admin Nguyễn Xuân Tiến";
  const authorLink = user?._id
    ? `/profile/${_id}`
    : `/profile/${user?.username}`;

  const params = useParams();
  const id = params?.id as string;
  const [data, setData] = useState<Post[]>([]);

  // Fetch blog data by ID and set form fields
  useEffect(() => {
    if (!id) {
      setSnackbar({
        open: true,
        message: "Không tìm thấy bài viết!",
        severity: "error",
      });
      return;
    }
    async function fetchBlogData() {
      const response = await getPostById(id);
      if (response && response.success) {
        const blog = response.data;

        setTitle(blog.title);
        setDescription(blog.description);
        setContent(blog.content);
        setSlug(blog.slug);
        setAuthorName(blog.authorName);
        setAuthorUrl(blog.authorUrl ?? "");
        setImage(
          blog.image
            ? { url: blog.image.url, alt: blog.image.alt ?? "" }
            : { url: "", alt: "" }
        );
        setUrlImage(blog.image?.url || "");
        setCategory({
          name: blog.category.name,
          url: blog.category.url,
        });
        setTags(blog.tags || []);
        setBreadcrumbs(blog.breadcrumbs || []);
      } else {
        setSnackbar({
          open: true,
          message: "Không tìm thấy bài viết!",
          severity: "error",
        });
      }
    }
    fetchBlogData();
  }, [id]);

  // Submit handler
  const handleSubmit = async (): Promise<void> => {
    if (!authorName.trim() || !authorUrl.trim()) {
      setAuthorName(username);
      setAuthorUrl(authorLink);
    }
    if (!image.alt) {
      image.alt = title.trim() || "Ảnh chính bài viết";
    }
    if (!image.url) {
      setSnackbar({
        open: true,
        message: "Vui lòng chọn ảnh chính cho bài viết",
        severity: "info",
      });
      return;
    }
    if (!category.name.trim() || !category.url.trim()) {
      setCategory({ name: "Trang Chủ", url: "/" });
    }
    if (breadcrumbs.length === 0) {
      setBreadcrumbs([{ name: "Home", url: "/" }]);
    }
    if (!title.trim() || !content.trim()) {
      setSnackbar({
        open: true,
        message: "Vui lòng tiêu đề và nội dung cho bài viết",
        severity: "info",
      });
      return;
    }

    const clean = (text: string) => text.replace(/<\/?[^>]+(>|$)/g, "");
    const cleanedDescription = clean(description);
    const cleanedTitle = clean(title);
    const cleanedAuthorName = clean(authorName);

    const blog = {
      title: cleanedTitle,
      description: cleanedDescription,
      tags,
      authorName: cleanedAuthorName,
      authorUrl,
      slug,
      content,
      image,
      category,
      breadcrumbs,
    };

    // Gọi updateBlog qua redux
    const res = await updatePost(id, blog);
    setIsLoad(true);
    if (res?.success) {
      await refreshPosts();
      setIsLoad(false);
      setSnackbar({
        open: true,
        message: "Cập nhật bài viết thành công!",
        severity: "success",
      });
    } else {
      setIsLoad(false);
      setSnackbar({
        open: true,
        message: res?.error || "Lỗi Khi Cập Nhật Vui Lòng Thử Lại",
        severity: "error",
      });
    }
  };

  // Handler for closing the snackbar
  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Function to transform category data for Autocomplete
  const extractCategories = (posts: Post[]): CategoryPostType[] => {
    const map = new Map<string, CategoryPostType>();
    posts.forEach((post) => {
      if (post.title && post.slug) {
        map.set(post.slug, {
          label: post.title,
          url: post.slug,
        });
      } else {
        map.set("Trang Chủ", {
          label: "Trang Chủ",
          url: "/",
        });
      }
    });
    return Array.from(map.values());
  };

  // Handler for image selection
  const handleImage = (data: string) => {
    setUrlImage(data);
    setImage({
      url: data,
      alt: title || "Default alt text",
    });
  };

  return (
    <>
      {isLoad && <Loader />}
      <ClientMetadata
        title={title ? `Edit ${title}` : "Editor Blogs"}
        isIndex={false}
      />
      <div className="px-4 bg-transparent min-h-screen">
        <Container
          sx={{
            padding: "20px 0",
            display: "flex",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          <TextField
            label="Tiêu đề"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth
          />
          <TextField
            label="Mô tả ngắn"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <Editor content={content} onChange={(val) => setContent(val)} />
          <TextField
            label="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            fullWidth
            style={{ margin: "20px 0" }}
          />
          <TextField
            label="Tác giả"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            fullWidth
          />

          <TagInput tags={tags} setTags={setTags} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {urlImage && (
              <Box
                sx={{
                  width: 240,
                  aspectRatio: "3/2",
                  overflow: "hidden",
                  borderRadius: 1,
                  border: 1,
                  borderColor: "divider",
                }}
              >
                <img
                  src={urlImage}
                  alt={title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            )}

            <SelectImage data={handleImage} title="Chọn ảnh chính" />
          </Box>

          <Autocomplete
            fullWidth
            disablePortal
            options={extractCategories(data)}
            value={{ label: category.name, url: category.url }}
            onChange={(e, newValue) => {
              if (newValue) {
                setCategory({
                  name: newValue.label,
                  url: newValue.url || "",
                });
              } else {
                setCategory({ name: "", url: "" });
              }
            }}
            renderInput={(params) => <TextField {...params} label="Danh mục" />}
          />

          <TextField
            label="URL Danh mục"
            value={category.url}
            onChange={(e) => setCategory({ ...category, url: e.target.value })}
            fullWidth
          />
          {breadcrumbs.map((breadcrumb, index) => (
            <Box
              key={index}
              sx={{ display: "flex", gap: 2, alignItems: "center" }}
            >
              <TextField
                label={`Breadcrumb ${index + 1} Tên`}
                value={breadcrumb.name}
                onChange={(e) =>
                  updateBreadcrumb(index, "name", e.target.value)
                }
                fullWidth
              />
              <TextField
                label={`Breadcrumb ${index + 1} URL`}
                value={breadcrumb.url}
                onChange={(e) => updateBreadcrumb(index, "url", e.target.value)}
                fullWidth
              />
              <Button
                color="error"
                variant="outlined"
                onClick={() => removeBreadcrumb(index)}
                sx={{ minWidth: 40, height: 40 }}
              >
                Xóa
              </Button>
            </Box>
          ))}
          <Button onClick={addBreadcrumb} variant="outlined">
            Thêm Breadcrumb
          </Button>
          <Button
            disableRipple
            sx={{ display: "block", marginLeft: "auto", marginTop: 2 }}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={isLoad}
          >
            {isLoad ? "Đang đăng..." : "Đăng bài"}
          </Button>
        </Container>
      </div>
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
    </>
  );
};

export default EditPost;
