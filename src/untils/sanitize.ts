export const sanitize = (value: string) => {
  return value.replace(/[<>$;]/g, "").trim();
};
