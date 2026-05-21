export default function generateVisitorId(): string {
  return "visitor_" + crypto.randomUUID();
}
