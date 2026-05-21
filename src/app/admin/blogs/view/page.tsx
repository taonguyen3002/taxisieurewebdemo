"use client";

import React, { useEffect, useRef, useState } from "react";
import { getAllPosts } from "@/api/bai-viet/read.api";
import deletePost from "@/api/bai-viet/apiDelete";
import Link from "next/link";
import ClientMeta from "@/components/Client/ClientMetadata/ClientMetadata";
import Loader from "@/components/Loading";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/Modals/TaiwindCustomModals";

interface Post {
  _id: string;
  title: string;
  slug: string;
  createdAt: string;
}

export default function ViewAllPost() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const cancelRef = useRef(false);
  const [deleteProgress, setDeleteProgress] = useState<{
    current: number;
    total: number;
    isDeleting: boolean;
  } | null>(null);
  const [modal, setModal] = useState({
    show: false,
    title: "",
    message: "",
    type: "success" as "success" | "error",
  });
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedPosts(posts.map((post) => post._id));
    } else {
      setSelectedPosts([]);
    }
  };

  const handleSelectPost = (id: string) => {
    setSelectedPosts((prev) => (prev.includes(id) ? prev.filter((postId) => postId !== id) : [...prev, id]));
  };

  const handleDeleteSelected = async () => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa ${selectedPosts.length} bài viết đã chọn?`)) return;

    if (
      !window.confirm(
        `Sau khi nhấn xác nhận sẽ xóa ${selectedPosts.length} bài viết đã chọn ! bạn không thể khôi phục chúng ! bạn chắc chứ !!!!!!!!!!!!!!`
      )
    )
      return;

    setCountdown(10);
    cancelRef.current = false;

    // Start countdown
    for (let i = 10; i > 0; i--) {
      if (cancelRef.current) {
        setCountdown(null);
        return;
      }
      setCountdown(i);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    setCountdown(null);

    if (!cancelRef.current) {
      try {
        setDeleteProgress({
          current: 0,
          total: selectedPosts.length,
          isDeleting: true,
        });

        for (let i = 0; i < selectedPosts.length; i++) {
          const id = selectedPosts[i];
          const res = await deletePost(id);

          if (!res?.success) {
            throw new Error(`Không thể xóa bài viết ${id}`);
          }

          setDeleteProgress((prev) => ({
            current: (prev?.current || 0) + 1,
            total: prev?.total || 0,
            isDeleting: true,
          }));

          // Add small delay between deletions
          await new Promise((resolve) => setTimeout(resolve, 500));
        }

        setPosts(posts.filter((post) => !selectedPosts.includes(post._id)));
        setSelectedPosts([]);
        setDeleteProgress(null);

        setModal({
          type: "success",
          title: "Thành Công !!!",
          message: "Đã xóa xong các mục đã chọn!",
          show: true,
        });
      } catch (error) {
        console.log("Có lỗi xảy ra khi xóa bài viết :", error);
        setDeleteProgress(null);
        setModal({
          type: "error",
          title: "Lỗi !!!",
          message: "Đã xảy ra lỗi trong quá trình xóa. Vui lòng thử lại.",
          show: true,
        });
      }
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await getAllPosts();
      if (res?.success) {
        setPosts(res.data);
        setFilteredPosts(res.data);
      } else {
        console.error("Failed to fetch posts:", res?.error);
        setPosts([]);
        setFilteredPosts([]);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);
  // Add search handler
  useEffect(() => {
    const results = posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredPosts(results);
  }, [searchTerm, posts]);
  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) return;

    setCountdown(10);
    cancelRef.current = false;

    // Start countdown
    for (let i = 10; i > 0; i--) {
      if (cancelRef.current) {
        setCountdown(null);
        return;
      }
      setCountdown(i);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    setCountdown(null);

    if (!cancelRef.current) {
      const res = await deletePost(id);
      if (res?.success) {
        setPosts(posts.filter((p) => p._id !== id));
      } else {
        setModal({
          type: "error",
          title: "Lỗi !!!",
          message: res?.error || "Lỗi xảy ra",
          show: true,
        });
        console.error("Failed to delete post:", res?.error);
        return;
      }
    }
  };

  return (
    <>
      <ClientMeta title="Quản Lí Bài Viết" />
      <div className="p-3 md:p-6 max-w-7xl mx-auto md:bg-white">
        <div className="flex justify-between flex-col md:flex-row gap-4 md:items-center items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-800">📑 Danh sách bài viết</h2>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="bg-transparent max-w-full md:shadow-lg md:rounded-lg md:bg-white">
            {selectedPosts.length > 0 && (
              <div className="p-4 bg-blue-50 border-b flex items-center justify-between">
                <span className="text-sm text-blue-700">Đã chọn {selectedPosts.length} bài viết</span>
                <button
                  onClick={handleDeleteSelected}
                  className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition"
                >
                  <TrashIcon className="w-4 h-4" />
                  Xóa đã chọn
                </button>
              </div>
            )}
            <table className="min-w-full">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedPosts.length === posts.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tiêu đề</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ngày tạo</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <tr key={post._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedPosts.includes(post._id)}
                          onChange={() => handleSelectPost(post._id)}
                          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800 max-w-xs">
                        <Link
                          href={`/bai-viet/${post.slug}`}
                          className="text-blue-600 hover:underline text-xs truncate block"
                        >
                          {post.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(post.createdAt).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex flex-col justify-end gap-2">
                          <Link
                            href={`/admin/blogs/edit/${post._id}`}
                            className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition"
                          >
                            <PencilIcon className="w-4 h-4" />
                            Sửa
                          </Link>
                          <button
                            onClick={() => handleDelete(post._id)}
                            className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition"
                          >
                            <TrashIcon className="w-4 h-4" />
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-gray-500 text-sm">
                      {searchTerm ? "Không tìm thấy bài viết nào phù hợp." : "Không có bài viết nào."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {(countdown !== null || deleteProgress) && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                  {countdown !== null && (
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-4">Đang chuẩn bị xóa</h3>
                      <p className="text-4xl font-bold text-red-600 mb-2">{countdown}</p>
                      <p className="text-sm text-gray-600 mb-4">Bắt đầu xóa sau {countdown} giây...</p>
                      <button
                        onClick={() => {
                          cancelRef.current = true;
                          setCountdown(null);
                        }}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition-colors"
                      >
                        Hủy
                      </button>
                    </div>
                  )}

                  {deleteProgress && (
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-4">Đang xóa bài viết</h3>
                      <p className="text-4xl font-bold text-blue-600 mb-2">
                        {deleteProgress.current}/{deleteProgress.total}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                          style={{
                            width: `${(deleteProgress.current / deleteProgress.total) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Còn lại {deleteProgress.total - deleteProgress.current} bài viết...
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <Modal
          show={modal.show}
          title={modal.title}
          message={modal.message}
          type={modal.type}
          onClose={() => setModal({ ...modal, show: false })}
        />
      </div>
    </>
  );
}
