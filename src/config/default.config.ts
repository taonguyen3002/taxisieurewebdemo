interface FeatureData {
  src: string;
  alt: string;
  title: string;
  desc: string;
}
const siteConfig = {
  siteName: "Đặt Xe Siêu Rẻ",
  name: "Đặt Xe Siêu Rẻ | Đặt 4 - 7 Chỗ Nhanh Nhất",
  title: "Đặt Xe Siêu Rẻ | Đặt 4 - 7 Chỗ Nhanh Nhất",
  description:
    "Dịch vụ taxi liên tỉnh siêu rẻ , xe đời mới tài lâu năm đón nhanh chỉ 5 phút gọi xe đặt xe nhiều ưu đãi",
  domain: "https://blogs.taxisieure.com",
  metaDescription:
    "Dịch vụ taxi liên tỉnh siêu rẻ , xe đời mới tài lâu năm đón nhanh chỉ 5 phút gọi xe đặt xe nhiều ưu đãi",
  keywords:
    "taxi, taxi sieu re,taxi điện , taxi xanh ,vinasun , taxi 4 cho, taxi 7 cho, grab 4 cho, grab 7 cho, dat xe grab, dat xe taxi",
  logo: "https://blogs.taxisieure.com/logo.png",
  contactInfo: {
    phone: "0559023567",
    email: "nguyenvantien.grap@gmail.com",
    address: "210 Nguyễn Văn Cừ, Phường Nguyễn Cư Trinh, Quận 1, TP.HCM",
  },
};
const featureData: FeatureData[] = [
  {
    src: `/feature1.png`,
    alt: "Taxi 4 cho & 7 cho",
    title: "HỆ THỐNG RỘNG KHẮP",
    desc: "Taxi có mặt khắp các tỉnh thành trên toàn quốc",
  },
  {
    src: `/feature2.png`,
    alt: "Taxi 4 cho & 7 cho",
    title: "PHỤC VỤ CHUYÊN NGHIỆP",
    desc: "Đội ngũ tài xế chuyên nghiệp , thân thiện và nhiệt tình",
  },
  {
    src: `/feature3.png`,
    alt: "Taxi 4 cho & 7 cho",
    title: "GIÁ CỰC RẺ",
    desc: "Giá cả cạnh tranh nhất thị trường với nhiều ưu đãi hấp dẫn",
  },
  {
    src: `/feature4.png`,
    alt: "Taxi 4 cho & 7 cho",
    title: "HỖ TRỢ 24/7",
    desc: "Đội ngũ tổng đài viên hỗ trợ 24/7 sẵn sàng phục vụ bạn",
  },
];
export { siteConfig, featureData };
