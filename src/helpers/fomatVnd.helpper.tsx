function formatVNDString(value: string): string {
  const number = parseInt(value, 10);
  if (isNaN(number)) return value; // nếu không phải số thì trả về nguyên gốc
  return number.toLocaleString("vi-VN");
}
export default formatVNDString;
