export default function StatisticsSection() {
  const stats = [
    { value: "10+", label: "NĂM KINH NGHIỆM" },
    { value: "110,509+", label: "KM DI CHUYỂN" },
    { value: "879+", label: "KHÁCH HÀNG" },
    { value: "98%", label: "KHÁCH HÀNG HÀI LÒNG" },
  ];

  return (
    <section className="bg-blue-700 text-white py-8 my-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm md:text-base mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
