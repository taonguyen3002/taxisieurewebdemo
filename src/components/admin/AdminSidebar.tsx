"use client";

import {
  HomeIcon,
  DocumentTextIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  PencilIcon,
  ArrowUpTrayIcon,
  BriefcaseIcon,
  UserPlusIcon,
  DocumentMagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { logoutUser } from "@/api/user/apiLogout";
import Link from "next/link";

const sidebarItems = [
  { text: "Dashboard", icon: HomeIcon, route: "/admin" },
  { text: "Tải ảnh lên", icon: ArrowUpTrayIcon, route: "/admin/upload" },
  { text: "Truy Cập", icon: UserPlusIcon, route: "/admin/traffic" },
  { text: "Viết Bài", icon: PencilIcon, route: "/admin/blogs/create" },
  {
    text: "Quản Lí Bài viết",
    icon: DocumentTextIcon,
    route: "/admin/blogs/view",
  },
  { text: "Người dùng", icon: UsersIcon, route: "/admin/user" },
  { text: "Đơn hàng", icon: BriefcaseIcon, route: "/admin/order" },
  { text: "Settings", icon: Cog6ToothIcon, route: "/admin/settings" },
  { text: "Profile", icon: UserIcon, route: "/admin/profile" },
  {
    text: "Tìm & Thay thế",
    icon: DocumentMagnifyingGlassIcon,
    route: "/admin/find-replace",
  },
];

function AdminSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser } = useUser();
  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    router.push("/login");
  };

  return (
    <>
      {/* Overlay for mobile & tablet */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className="h-full bg-white border-r flex flex-col relative z-30">
        <div className="flex items-center justify-center h-16 border-b flex-shrink-0">
          <Link href={"/"} className="text-xl font-bold">
            GRAB
          </Link>
        </div>

        {/* Scrollable Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-1">
            {sidebarItems.map(({ text, icon: Icon, route }) => {
              const isActive = pathname === route;
              return (
                <button
                  key={text}
                  onClick={() => {
                    router.push(route);
                    onClose();
                  }}
                  className={`flex items-center w-full gap-3 rounded-lg px-4 py-2 text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {text}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t px-4 py-4 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Đăng xuất
          </button>
        </div>
      </aside>
    </>
  );
}
export default AdminSidebar;
