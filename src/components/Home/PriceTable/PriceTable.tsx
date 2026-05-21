"use client";

import React from "react";

type PriceItem = {
  route: string;
  fourSeaterPrice: string;
  sevenSeaterPrice: string;
};

const prices: PriceItem[] = [
  {
    route: "TP.HCM → Biên Hòa",
    fourSeaterPrice: "350.000đ",
    sevenSeaterPrice: "400.000đ",
  },
  {
    route: "TP.HCM → Vũng Tàu",
    fourSeaterPrice: "850.000đ",
    sevenSeaterPrice: "950.000đ",
  },
  {
    route: "TP.HCM → Cần Thơ",
    fourSeaterPrice: "1.200.000đ",
    sevenSeaterPrice: "1.350.000đ",
  },
  {
    route: "TP.HCM → Long An",
    fourSeaterPrice: "400.000đ",
    sevenSeaterPrice: "450.000đ",
  },
];

const PriceTable = () => {
  return (
    <section className="px-4 md:px-8 py-8 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-green-700">
        Bảng Giá Tham Khảo Taxi 4 Chỗ & 7 Chỗ
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Tuyến Đường</th>
              <th className="py-3 px-4 text-center">Taxi 4 Chỗ</th>
              <th className="py-3 px-4 text-center">Taxi 7 Chỗ</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {prices.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-3 px-4">{item.route}</td>
                <td className="py-3 px-4 text-center">
                  {item.fourSeaterPrice}
                </td>
                <td className="py-3 px-4 text-center">
                  {item.sevenSeaterPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-center mt-4 text-gray-500">
        *Lưu ý: Giá có thể thay đổi theo thời điểm, vui lòng gọi hotline để được
        báo giá chính xác nhất.
      </p>
    </section>
  );
};

export default PriceTable;
