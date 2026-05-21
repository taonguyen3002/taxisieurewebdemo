import Link from "next/link";
import NewPostFooter from "./NewPostFooter";
import { siteConfig } from "@/config/default.config";

export default function Footer({ currentSlug }: { currentSlug?: string }) {
  return (
    <footer className="bg-blue-600 mt-8 text-white py-8 z-40 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Cột 1 */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-white">
              Bài Viết Mới
            </h2>
            <NewPostFooter currentSlug={currentSlug} />
          </div>

          {/* Cột 2 */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-white">
              Hỗ Trợ & Thông Tin
            </h2>
            <ul className="space-y-2">
              <li>Email : {siteConfig.contactInfo.email}</li>
              <li>Domain: {siteConfig.domain}</li>
              <li>Phone: {siteConfig.contactInfo.phone}</li>
              <li>Address: {siteConfig.contactInfo.address}</li>
            </ul>
          </div>

          {/* Cột 3 */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-white">
              Liên Kết Nhanh
            </h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="no-underline hover:underline">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/profile" className="no-underline hover:underline">
                  Thông Tin Tài Khoản
                </Link>
              </li>
              <li>
                <Link href="/bai-viet" className="no-underline hover:underline">
                  Tất Cả Bài Viết
                </Link>
              </li>
              <li>
                <Link href="/dat-xe" className="no-underline hover:underline">
                  Đặt Xe
                </Link>
              </li>
              <li>
                <Link
                  href="/promotion"
                  className="no-underline hover:underline"
                >
                  Khuyến Mãi
                </Link>
              </li>
              <li>
                <Link href="/login" className="no-underline hover:underline">
                  Đăng Nhập
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4 */}
          <div>
            <h2 className="text-lg font-semibold mb-3 text-white">Từ Khóa</h2>
            <div className="flex flex-wrap gap-4 mb-3">
              {siteConfig.keywords.split(",").map((keyword) => (
                <span
                  key={keyword}
                  className="bg-white text-blue-600 px-2 py-1 rounded-full text-sm"
                >
                  # {keyword.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Chân */}
        <div className="text-center mt-8 text-sm border-t border-white/20 pt-4">
          © 2025 {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
