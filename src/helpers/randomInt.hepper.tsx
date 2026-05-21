export default function randInt(min: number, max: number): number {
  if (!Number.isFinite(min) || !Number.isFinite(max))
    throw new Error("min/max phải là số hữu hạn");
  if (Math.floor(min) !== min || Math.floor(max) !== max)
    throw new Error("min/max phải là số nguyên");
  if (max < min) throw new Error("max phải >= min");
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
