// components/Guards/AuthGuard.tsx
"use client";
import { Box, Typography, Button } from "@mui/material";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

type AuthGuardProps = {
  children: React.ReactNode;
  requiredRole?: string; // optional: để kiểm tra quyền cụ thể
};

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requiredRole }) => {
  const { user } = useUser();
  const userRole = user?.role;
  if (!user) {
    return (
      <Box sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Bạn cần đăng nhập để truy cập nội dung này.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          href="/login"
          sx={{ mt: 2 }}
        >
          Đăng nhập
        </Button>
      </Box>
    );
  }

  if (requiredRole && userRole !== requiredRole) {
    return (
      <Box sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Bạn không có quyền truy cập trang này.
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
