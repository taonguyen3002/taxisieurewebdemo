"use client";

import { format } from "date-fns";
import { UserProfile } from "@/types/User";

export default function ProfileClient({ user }: { user: UserProfile }) {
  function isValidDate(value: string | undefined): boolean {
    if (!value) return false;
    const date = new Date(value);
    return !isNaN(date.getTime());
  }
  return (
    <div className="max-w-xl mx-auto mt-10 mb-10 p-6 bg-white rounded-2xl">
      <div className="flex flex-col items-center mb-6">
        <img
          src={"/default-avatar.png"}
          alt={user.fullname || user.username}
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <h1 className="text-2xl font-semibold">{user.fullname}</h1>
        <p className="text-gray-500">{user.username}</p>
      </div>

      <Info label="Số điện thoại" value={user.phone} />
      <Info label="Địa chỉ" value={user.address} />
      <Info label="Giới thiệu" value={user.bio} />
      <Info
        label="Ngày đăng kí"
        value={
          isValidDate(user.createdAt)
            ? format(new Date(user.createdAt as string), "HH:mm dd/MM/yyyy")
            : "Không rõ"
        }
      />
      <Info
        label="Cập nhật lần cuối"
        value={
          isValidDate(user.updatedAt)
            ? format(new Date(user.updatedAt as string), "HH:mm dd/MM/yyyy")
            : "Không rõ"
        }
      />
      <Info label="Vai trò" value={user.role} />
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div className="mb-4">
      <p className="text-sm text-gray-600 font-medium">{label}</p>
      <p className="text-base text-gray-900">{value || "N/A"}</p>
    </div>
  );
}
