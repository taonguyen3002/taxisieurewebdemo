"use client";
import { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axiosInstance from "@/untils/axios";
import Loading from "@/components/Loading";
import {
  AdminData,
  recentOrdersProps,
  recentPostsProps,
} from "@/types/admin.type";
import ClientMeta from "@/components/Client/ClientMetadata/ClientMetadata";
import fomatVnd from "@/helpers/fomatVnd.helpper";
export default function Dashboard() {
  const [data, setData] = useState<AdminData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/dashboard/stats");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  if (!data) return <Loading />;

  return (
    <>
      <ClientMeta title="admin" isIndex={false} />
      <div className="p-4">
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        {/* Overview Cards */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card sx={{ p: 2 }}>
              <Typography variant="subtitle2">Thành Viên</Typography>
              <Typography variant="h4">{data.overview.totalUsers}</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card sx={{ p: 2 }}>
              <Typography variant="subtitle2">Tổng Bài Viết</Typography>
              <Typography variant="h4">{data.overview.totalPosts}</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card sx={{ p: 2 }}>
              <Typography variant="subtitle2">Đơn Hàng</Typography>
              <Typography variant="h4">{data.overview.totalOrders}</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card sx={{ p: 2 }}>
              <Typography variant="subtitle2">Lượt Truy Cập</Typography>
              <Typography variant="h4">{data.overview.totalTraffic}</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card sx={{ p: 2 }}>
              <Typography variant="subtitle2">Chi Tiêu AI</Typography>
              <Typography variant="h4">
                {fomatVnd(data.overview.totalRevenue)}Đ
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Traffic Chart */}
        <Paper sx={{ p: 2, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Lượt Truy Cập 7 Ngày Qua
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.trafficStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* Recent Orders */}
        <Paper sx={{ p: 2, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Đơn Hàng
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Địa Chỉ</TableCell>
                <TableCell>SDT</TableCell>
                <TableCell>Dịch Vụ</TableCell>
                <TableCell>Ngày</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.recentOrders.map((order: recentOrdersProps) => (
                <TableRow key={order._id}>
                  <TableCell>{order.addressFrom}</TableCell>
                  <TableCell>{order.phoneNumber}</TableCell>
                  <TableCell>{order.serviceType}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        {/* Recent Posts */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Bài Viết Mới Đăng
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tiêu Đề</TableCell>
                <TableCell>Ngày</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.recentPosts.map((post: recentPostsProps) => (
                <TableRow key={post._id}>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </>
  );
}
