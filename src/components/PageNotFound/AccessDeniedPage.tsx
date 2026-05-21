import Link from "next/link";
function AccessDeniedPage() {
  return (
    <div className="flex flex-col text-center mx-auto items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-red-600">
        Truy Cập Bị Từ Chối - Bạn Không Có Quyền Truy Cập Vào Trang Này
      </h1>
      <Link
        href="/login"
        className="my-20 p-2 bg-blue-500 text-white underline"
      >
        Đăng Nhập Ngay
      </Link>
    </div>
  );
}

export default AccessDeniedPage;
