interface OverviewCardProps {
  totalUsers: string;
  totalPosts: string;
  totalOrders: string;
  totalTraffic: string;
  totalRevenue: string;
}
interface trafficStatsProps {
  _id: string;
  count: number;
}
interface recentOrdersProps {
  _id: string;
  addressFrom: string;
  addressTo: string;
  serviceType: string;
  phoneNumber: string;
  additionalInfo: string;
  visitorId: string;
  driverId: string;
  status: string;
  cancelReason: string;
  rating: number;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}
interface recentPostsProps {
  _id: string;
  title: string;
  slug: string;
  createdAt: string;
}
interface AdminData {
  overview: OverviewCardProps;
  trafficStats: trafficStatsProps[];
  recentOrders: recentOrdersProps[];
  recentPosts: recentPostsProps[];
}
export type {
  AdminData,
  OverviewCardProps,
  trafficStatsProps,
  recentOrdersProps,
  recentPostsProps,
};
