import Image from "next/image";

type Driver = {
  name: string;
  desc: string;
  img: string;
};

const driverList: Driver[] = [
  {
    name: "Nguyễn Văn Tiến",
    desc: "200+",
    img: "/tai-xe-1.png",
  },
  {
    name: "Trần Thị Hà",
    desc: "180+",
    img: "/tai-xe-2.png",
  },
  {
    name: "Lê Văn Hùng",
    desc: "170+",
    img: "/tai-xe-3.png",
  },
  {
    name: "Phạm Thị Lan",
    desc: "150+",
    img: "/tai-xe-3.png",
  },
];

export default function TopDrivers() {
  return (
    <section className="px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-green-500 text-transparent bg-clip-text">
          Vinh Danh Bác Tài Đạt Chuẩn 5 ★
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {driverList.map((data, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition"
            >
              <div className="relative w-36 h-36 rounded-full overflow-hidden bg-white">
                <Image
                  src={data.img}
                  alt={data.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mt-4">{data.name}</h3>
              <p className="text-gray-600 text-sm">{data.desc} đánh giá 5★</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
