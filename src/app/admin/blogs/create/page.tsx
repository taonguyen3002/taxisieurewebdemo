"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
import SelectImage from "@/components/SelectImage/SelectImg";
import TagInput from "@/components/Blogs/TagInput/TagInput";
import generateSlug from "@/helpers/generateSlug";
import dynamic from "next/dynamic";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Loader from "@/components/Loading";
import ClientMetadata from "@/components/Client/ClientMetadata/ClientMetadata";
import { useUser } from "@/context/UserContext";
import { createPost } from "@/api/bai-viet/apiCreate";
import { createPostAi } from "@/api/bai-viet/create.openAi";
import createSettingApi from "@/api/settings/createSetting";
import { useBreadcrumbs } from "@/hooks/useBreacrumb";
import { generateRandomUsernames } from "@/helpers/generateUsernameRandom";
import randInt from "@/helpers/randomInt.hepper";
import { siteConfig } from "@/config/default.config";
import Modal from "@/components/Modals/TaiwindCustomModals";
import "@/app/blog.css";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Editor = dynamic(() => import("@/components/EdittorWYSIWYG/Ckeditor/CKEditorComponent"), { ssr: false });

const NewPost: React.FC = () => {
  const { user, updateUserField } = useUser();
  const [modal, setModal] = useState({
    show: false,
    title: "",
    message: "",
    type: "success" as "success" | "error",
  });

  const _id = user?._id;
  const username = user?.fullname || user?.username || "Admin";
  const authorLink = user?._id ? `/profile/${_id}` : `/profile/${user?.username}`;

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const { breadcrumbs, addBreadcrumb, updateBreadcrumb, removeBreadcrumb } = useBreadcrumbs([
    { name: "Trang Chủ", url: "/" },
    { name: "Bài Viết", url: "/bai-viet" },
  ]);

  const [isLoad, setIsLoad] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState({ name: username, url: authorLink });
  const [slug, setSlug] = useState("");
  const [likesCount, setLikesCount] = useState(0);
  const [content, setContent] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [image, setImage] = useState({ url: "", alt: "" });
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState({ name: "Trang Chủ", url: "/" });
  const [openSettings, setOpenSettings] = useState(false);
  const [numberphone, setNumberphone] = useState("");

  const handleImage = (data: string) => {
    setUrlImage(data);
    setImage({ url: data, alt: title || "Default alt text" });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };
  const handleSubmitSetting = () => {
    const phoneRegex = /^0\d{9}$/;

    if (numberphone === "" || phoneRegex.test(numberphone)) {
      setOpenSettings(false);
      breadcrumbs.map((b) => {
        if (b.url.includes(siteConfig.domain)) {
          b.url = b.url.replace(siteConfig.domain, "");
        }
      });
      return;
    }

    setModal({
      type: "error",
      title: "Lỗi !!!",
      message: "Vui Lòng Kiểm Tra Lại Số Điện Thoại Custom !",
      show: true,
    });
  };
  const handleSubmit = async () => {
    if (!image.url) {
      return setSnackbar({
        open: true,
        message: "Vui lòng chọn ảnh chính",
        severity: "error",
      });
    }
    if (!title.trim() || !content.trim()) {
      return setSnackbar({
        open: true,
        message: "Vui lòng nhập tiêu đề và nội dung",
        severity: "error",
      });
    }
    breadcrumbs.map((b) => {
      if (b.url.includes(siteConfig.domain)) {
        b.url = b.url.replace(siteConfig.domain, "");
      }
    });

    const count = Number.isInteger(likesCount) && likesCount > 0 ? likesCount : 0;
    const autoLikes = count ? generateRandomUsernames(count) : [];
    const clean = (t: string) => t.replace(/<\/?[^>]+(>|$)/g, "");
    const blog = {
      title: clean(title),
      description: clean(description),
      tags,
      authorName: clean(author.name),
      authorUrl: author.url,
      slug,
      content,
      image,
      category,
      breadcrumbs,
      likes: autoLikes,
    };

    setIsLoad(true);
    if (numberphone) {
      await createSettingApi({ slug, numberphone, notificationDiscord: false });
    }
    const res = await createPost(blog);

    setIsLoad(false);
    if (res.success) {
      setSnackbar({
        open: true,
        message: "Đăng bài thành công!",
        severity: "success",
      });
      // reset form
      setTitle("");
      setDescription("");
      setSlug("");
      setContent("");
      setNumberphone("");
      setImage({ url: "", alt: "" });
      setUrlImage("");
      setTags([]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      return setModal({
        show: true,
        title: "Thất Bại !",
        message: res?.error || "Đăng Bài Thất Bại Vui Lòng Kiểm Tra Lại !",
        type: "error",
      });
    }
  };

  const handleCreateAi = async () => {
    if (!keyword.trim()) {
      return setModal({
        show: true,
        title: "Lỗi !!!",
        message: "Vui lòng nhập từ khóa để tạo bài viết tự động bằng AI",
        type: "error",
      });
    }

    setIsLoad(true);

    try {
      const res = await createPostAi(keyword);

      if (res?.success && res.result) {
        const { slug, tags, description, content } = res.result;

        // Xử lý slug (loại bỏ số điện thoại, chuẩn SEO)
        const convertSlug = slug
          .replaceAll(siteConfig.contactInfo.phone, "") // xóa số điện thoại
          .replace(/^-+|-+$/g, "") // xóa dấu "-" ở đầu/cuối
          .replace(/--+/g, "-") // gộp nhiều "-" liên tiếp thành 1
          .trim();

        // Xử lý tags (xóa số điện thoại, trim khoảng trắng)
        const tagArr = Array.isArray(tags)
          ? tags.map((t: string) => t.replaceAll(siteConfig.contactInfo.phone, "").trim())
          : [];

        // Set state
        setTitle(keyword);
        setDescription(description);
        setContent(content);
        setLikesCount(randInt(10, 100));
        setTags(tagArr);
        setSlug(generateSlug(convertSlug));
        updateUserField("balance", (res.balance ?? 0).toString());
        setOpenSettings(false);
      } else {
        setModal({
          show: true,
          title: "Lỗi",
          message: res?.error || "Tạo bài viết AI thất bại!",
          type: "error",
        });
      }
    } catch (err) {
      console.error("error:", err);
      setModal({
        show: true,
        title: "Lỗi",
        message: "Có lỗi xảy ra khi gọi API!",
        type: "error",
      });
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <>
      <ClientMetadata title={title ? `Create ${title}` : "Tạo Bài Viết Mới 😜"} isIndex={false} />
      {isLoad && <Loader />}
      <div className="flex flex-col gap-3 py-5 px-4 md:w-full">
        {/* header + settings */}
        <div className="flex justify-between items-center">
          <TextField label="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} fullWidth />
          <IconButton onClick={() => setOpenSettings(true)} sx={{ ml: 2 }}>
            <Settings />
          </IconButton>
        </div>

        {/* main fields */}
        <TextField
          label="Tiêu đề"
          value={title}
          onChange={(e) => {
            const t = e.target.value;
            const capitalized = t.toLowerCase().replace(/(^|\s)\S/g, (L) => L.toUpperCase());
            setTitle(capitalized);
            setSlug(generateSlug(capitalized));
          }}
          fullWidth
        />
        <TextField label="Mô tả ngắn" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth />
        <Editor content={content} onChange={(val) => setContent(val)} />

        <TagInput tags={tags} setTags={setTags} />

        <div className="flex flex-col gap-4">
          {urlImage && (
            <div className="w-60 aspect-[6/4] overflow-hidden rounded-lg border">
              <img src={urlImage} alt={title} className="w-full h-full object-cover" />
            </div>
          )}

          <SelectImage data={handleImage} title="Chọn ảnh chính" />
        </div>

        {/* submit */}
        <Button
          disableRipple
          sx={{ display: "block", ml: "auto", mt: 2 }}
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={isLoad || (!title.trim() && !content.trim() && !description.trim() && !urlImage)}
        >
          {isLoad ? "Đang đăng..." : "Đăng bài"}
        </Button>
      </div>

      {/* settings modal */}
      <Dialog open={openSettings} onClose={() => setOpenSettings(false)} maxWidth="md" fullWidth>
        <DialogTitle>Cài đặt nâng cao</DialogTitle>
        <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div className="flex items-center gap-3 p-2 bg-white shadow rounded-lg w-full">
            <input
              type="text"
              placeholder="Nhập từ khóa chính..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleCreateAi}
              disabled={isLoad}
              className={`px-5 py-2 font-semibold rounded-lg transition ${
                isLoad
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
              }`}
            >
              {isLoad ? "Creating..." : "Create"}
            </button>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white shadow rounded-lg w-full">
            <TextField
              label="Tên danh mục"
              value={category.name}
              onChange={(e) => setCategory({ ...category, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="URL danh mục"
              value={category.url}
              onChange={(e) => setCategory({ ...category, url: e.target.value })}
              fullWidth
            />
          </div>
          <div className="flex items-center gap-3 p-4 bg-white shadow rounded-lg w-full">
            <TextField label="Tác giả" value={author.name} fullWidth aria-readonly />
            <TextField
              label="Số lượng likes"
              type="number"
              value={likesCount}
              onChange={(e) => setLikesCount(parseInt(e.target.value) || 0)}
              fullWidth
            />
          </div>
          <div className="flex items-center gap-3 p-4 bg-white shadow rounded-lg w-full">
            <TextField
              label="số điện thoại"
              value={numberphone}
              fullWidth
              onChange={(e) => setNumberphone(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 p-4 bg-white shadow rounded-lg w-full">
            <TextField
              label="Tác Giả"
              value={author.name}
              onChange={(e) => setAuthor({ ...author, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Đường Dẫn Tác Giả"
              value={author.url}
              onChange={(e) => setAuthor({ ...author, url: e.target.value })}
              fullWidth
            />
          </div>
          {/* breadcrumbs */}
          {breadcrumbs.map((b, i) => (
            <Box key={i} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <TextField
                label={`Breadcrumb ${i + 1} Tên`}
                value={b.name}
                onChange={(e) => updateBreadcrumb(i, "name", e.target.value)}
                fullWidth
              />
              <TextField
                label={`Breadcrumb ${i + 1} URL`}
                value={b.url}
                onChange={(e) => updateBreadcrumb(i, "url", e.target.value)}
                fullWidth
              />
              <Button color="error" onClick={() => removeBreadcrumb(i)}>
                Xóa
              </Button>
            </Box>
          ))}
          <Button onClick={addBreadcrumb}>Thêm Breadcrumb</Button>
        </DialogContent>
        {/* actions */}
        <DialogActions>
          <Button onClick={() => setOpenSettings(false)} color="inherit">
            Hủy
          </Button>
          <Button
            onClick={() => {
              handleSubmitSetting();
            }}
            variant="contained"
            color="primary"
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        show={modal.show}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onClose={() => setModal({ ...modal, show: false })}
      />

      {/* snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NewPost;
