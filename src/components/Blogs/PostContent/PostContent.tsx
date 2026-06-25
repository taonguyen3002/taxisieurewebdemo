// components/PostContent.tsx
import { siteConfig } from "@/config/default.config";
import Link from "next/link";
import { FC } from "react";

type PostContentProps = {
  authorUrl?: string;
  title: string;
  author: string;
  createdAt: string;
  content: string;
};

const PostContent: FC<PostContentProps> = ({ title, author, authorUrl, createdAt, content }) => {
  return (
    <article className="max-w-4xl bg-white mx-auto p-4">
      {/* Nội dung bài viết */}
      <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-full w-full mx-auto overflow-hidden blog-content">
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <div className="mt-8 p-4 bg-gray-50 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Thông Tin Liên Hệ</h2>
          <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
            <li>
              <span className="font-medium">Địa chỉ:</span> {siteConfig.contactInfo.address}
            </li>
            <li>
              <span className="font-medium">Điện thoại:</span>{" "}
              <a
                href={"tel:" + siteConfig.contactInfo.phone}
                className="text-blue-600 hover:underline hover:text-blue-800"
              >
                {siteConfig.contactInfo.phone}
              </a>
            </li>
            <li>
              <span className="font-medium">Zalo:</span>{" "}
              <a
                href={"https://zalo.me/" + siteConfig.contactInfo.phone}
                className="text-blue-600 hover:underline hover:text-blue-800"
              >
                {siteConfig.contactInfo.phone}
              </a>
            </li>

            <li>
              <span className="font-medium">Email:</span>{" "}
              <a
                href={"mailto:" + siteConfig.contactInfo.email}
                className="text-blue-600 hover:underline hover:text-blue-800"
              >
                {siteConfig.contactInfo.email}
              </a>
            </li>

            <li>
              <span className="font-medium">Website:</span>{" "}
              <a
                href="https://datxenhanh-24h.pro.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline hover:text-blue-800"
              >
                datxenhanh-24h.pro.vn
              </a>
            </li>
            <li>
              <span className="font-medium">Website:</span>{" "}
              <a
                href="https://goixegiare.pro.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline hover:text-blue-800"
              >
                goixegiare.pro.vn
              </a>
            </li>
            <li>
              <span className="font-medium">Website:</span>{" "}
              <a
                href="https://taxinhanh247.pro.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline hover:text-blue-800"
              >
                taxinhanh247.pro.vn
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer: Tác giả + Action */}
      <div className="mt-8 border-t pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="text-sm text-gray-600">
            <Link href={authorUrl ?? "/"} className="text-blue-600 hover:underline">
              Đăng bởi {author}
            </Link>{" "}
            - {new Date(createdAt).toLocaleDateString("vi-VN")}
          </p>
        </div>
      </div>
    </article>
  );
};

export default PostContent;
