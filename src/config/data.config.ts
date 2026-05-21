const BaseUrl = process.env.DOMAIN;
interface ImageMainContent {
  src: string;
  alt: string;
}

interface HowToBook {
  title: string;
  desc: string;
  GreetingMessage: string;
}
interface Services {
  img: string;
  title: string;
  desc: string;
}
interface Driver {
  img: string;
  name: string;
  desc: string;
}
const imageMainContent: ImageMainContent[] = [
  {
    src: `/anh-dai-dien-grab-1.png`,
    alt: "grab",
  },
  {
    src: `/anh-dai-dien-grab-2.png`,
    alt: "grab",
  },
  {
    src: `/anh-dai-dien-grab-3.png`,
    alt: "grab",
  },
  {
    src: `/anh-dai-dien-grab-3.png`,
    alt: "grab",
  },
];
const howToBook: HowToBook[] = [
  {
    title: "Cách 1: Liên Hệ Trực Tiếp Qua Hotline",
    desc: "Chúng tôi cung cấp đội ngũ tổng đài viên hoạt động 24/7 luôn sẵn sàng hỗ trợ mọi lúc,việc cần làm là bạn hãy nhấn vào biểu tượng gọi điện thoại ở góc phải màn hình sau đó nhấn gọi báo cho tổng đài viên biết loại dịch vụ bạn muốn sử dụng và chi tiết về thời gian , địa chỉ đón , địa chỉ đến,... sau đó chờ ít phút chúng tôi sẽ nhập lên hệ thống và tài xế sẽ đến đón bạn nhanh chóng",
    GreetingMessage:
      "Sau Khi đặt xe thành công bạn cần đợi tài xế đến đón bạn,Chúc bạn có chuyến đi vui vẻ",
  },
  {
    title: "Cách 2: Đặt Xe Qua Zalo",
    GreetingMessage:
      "Sau Khi đặt xe thành công bạn cần đợi tài xế đến đón bạn,Chúc bạn có chuyến đi vui vẻ",
    desc: "Ngoài cách thông thường là liên hệ với chúng tôi qua Hotline,bạn cũng có thể liên hệ qua zalo bằng cách tương tự,đặc biệt lưu ý ở cách 2 sử dụng zalo bạn có thể gửi cho chúng tôi vị trí chính xác điểm đi và điểm đến từ đó chúng tôi có thể check được giá tiền chính xác.Ngoài các thông tin cơ bản như địa chỉ đón và địa chỉ đến, loại dịch vụ và thời gian đi, bạn cần cung cấp thông tin liên lạc bằng số điện thoại để tài xế liên lạc xác nhận",
  },
  {
    title: "Cách 3: Đặt Xe Trực Tiếp Trên Website",
    GreetingMessage:
      "Sau Khi đặt xe thành công bạn cần đợi tài xế đến đón bạn,Chúc bạn có chuyến đi vui vẻ",
    desc: "Chúng tôi cung cấp dịch vụ đặt xe trực tiếp trên website bằng cách điền biểu mẫu 1 cách chính xác,việc bạn cần làm là tìm biểu mẫu đặt xe và điền đúng thông tin.Lưu ý rằng bạn cần kiểm tra lại thông tin chi tiết tránh trường hợp sai thông tin sẽ mất thời gian đợi",
  },
];
const services: Services[] = [
  {
    img: `/grab-xe-may.webp`,
    title: "Grab Xe Máy",
    desc: "Dịch vụ di chuyển bằng xe honda nhanh chóng tiện lợi và an toàn",
  },
  {
    img: `/grab-giao-hang.jpg`,
    title: "Grab Giao Hàng",
    desc: "Dịch Vụ giao hàng nhanh chóng tiết kiệm an toàn và uy tín",
  },
  {
    img: `/grab-taxi.jpg`,
    title: "Grab Taxi 4 Chỗ",
    desc: "Dịch vụ xe 4 chỗ chuyên chở hành khách với mức giá ưu đãi",
  },
  {
    img: `/grab-7-cho.jpg`,
    title: "Grab Taxi 7 Chỗ",
    desc: "Dịch vụ xe 7 chỗ chuyên chở hành khách với mức giá ưu đãi",
  },
];
const driver: Driver[] = [
  {
    img: `/tai-xe-1.png`,
    name: "Nguyễn Văn Mạnh",
    desc: "378",
  },
  {
    img: `/tai-xe-4.png`,
    name: "Trần Hữu Nghị",
    desc: "699",
  },
  {
    img: `/tai-xe-3.png`,
    name: "Nguyễn Phi Hoàng",
    desc: "934",
  },
  {
    img: `/tai-xe-2.png`,
    name: "Trần Bá Đạt",
    desc: "736",
  },
  {
    img: `/tai-xe-6.png`,
    name: "Nguyễn Thị Lan",
    desc: "647",
  },
  {
    img: `/tai-xe-5.png`,
    name: "Từ Châu Thái",
    desc: "837",
  },
];
export { driver, services, howToBook, imageMainContent, BaseUrl };
