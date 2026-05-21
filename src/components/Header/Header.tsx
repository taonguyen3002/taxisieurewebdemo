"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/api/user/apiLogout";
import SearchBar from "@/components/SearchBar";
import { siteConfig } from "@/config/default.config";

import {
  Bars3Icon,
  XMarkIcon,
  PhoneArrowUpRightIcon,
} from "@heroicons/react/24/outline";
type Prop = {
  phone?: string;
};
export default function TailwindHeader({
  phone = siteConfig.contactInfo.phone,
}: Prop) {
  const { user, setUser } = useUser();
  const role = user?.role;
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setMenuOpen(false);
    router.push("/login");
  };

  return (
    <header className="bg-blue-600 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex flex-1 md:items-center gap-4">
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <XMarkIcon className="h-6 w-6 text-white" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-white" />
              )}
            </button>

            <Link href="/" className="text-lg font-bold text-white">
              {siteConfig.siteName}
            </Link>

            {/* search */}
            <div className="hidden md:block relative">
              <SearchBar />
            </div>
            <a
              href={`tel:${phone}`}
              className="md:hidden flex items-center gap-1 absolute right-4 top-4 bg-green-600 text-white text-sm px-3 py-1 rounded-full shadow hover:bg-green-700 transition"
            >
              <PhoneArrowUpRightIcon className="w-4 h-4" />
              Gọi: {phone}
            </a>
          </div>
          {/* navbar */}
          <div className="hidden md:flex items-center gap-4">
            {!user && (
              <Link href="/login" className="text-white hover:bg-blue-800">
                Đăng nhập
              </Link>
            )}
            {user && (
              <div className="relative group">
                <img
                  src={"/default-avatar.png"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
                <div className="absolute right-0 pt-2 w-48 bg-white shadow rounded hidden group-hover:block z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-blue-700  hover:bg-blue-800"
                  >
                    Tài khoản
                  </Link>
                  <Link
                    href="/history/order"
                    className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-800"
                  >
                    Lịch Sử Đặt Xe
                  </Link>
                  {role === "admin" && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-800"
                    >
                      Quản trị
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-2 space-y-2">
            {/* Ô tìm kiếm mobile */}
            <SearchBar isMobile={true} onItemClick={() => setMenuOpen(false)} />

            {/* Các link menu */}
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 text-white hover:bg-blue-800"
            >
              Trang chủ
            </Link>
            <Link
              href="/privacy-policy"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 text-white hover:bg-blue-800"
            >
              Chính sách bảo mật
            </Link>
            <Link
              href="/bai-viet"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 text-white hover:bg-blue-800"
            >
              Bài viết
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 text-white hover:bg-blue-800"
            >
              Giới thiệu
            </Link>
            <Link
              href="/faq"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 text-white hover:bg-blue-800"
            >
              FAQ
            </Link>

            {!user && (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-white hover:bg-blue-800"
              >
                Đăng nhập
              </Link>
            )}

            {user && (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-white hover:bg-blue-800"
                >
                  Tài khoản
                </Link>
                {role === "admin" && (
                  <>
                    <Link
                      href="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-white hover:bg-blue-800"
                    >
                      Quản trị
                    </Link>
                    <Link
                      href="/admin/blogs/create"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-white hover:bg-blue-800"
                    >
                      Đăng bài
                    </Link>
                  </>
                )}
                <Link
                  href="/history/order"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-white hover:bg-blue-800"
                >
                  Lịch sử đặt hàng
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-white hover:bg-blue-800"
                >
                  Đăng xuất
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
