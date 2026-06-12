"use client";

import { Menu } from "lucide-react";
import React, { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useUser } from "@/context/UserContext";
import Loader from "@/components/Loading";
import AccessDeniedPage from "@/components/PageNotFound/AccessDeniedPage";
import { ImageProvider } from "@/context/ImageContext";
import { PostProvider } from "@/context/PostContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useUser();
  if (loading) {
    return <Loader />;
  }
  if (!user || !user.role.includes("admin")) {
    return <AccessDeniedPage />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar Mobile */}
      <div
        className={`
          fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity md:hidden
          ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setSidebarOpen(false)}
      >
        <div className="absolute top-0 left-0 w-64 h-full z-30" onClick={(e) => e.stopPropagation()}>
          <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Sidebar Desktop */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <AdminSidebar isOpen={true} onClose={() => {}} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 bg-white px-4 border-b flex-shrink-0">
          <button className="md:hidden text-gray-600" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Trang Quản Trị</h1>
          <div></div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 bg-gradient-to-br from-sky-50 to-white overflow-y-auto">
          <div className="container mx-auto max-w-screen-xl">
            <PostProvider>
              <ImageProvider>{children}</ImageProvider>
            </PostProvider>
          </div>
        </main>
      </div>
    </div>
  );
}
