export const calculateCost = (
  type: "motor" | "mobil",
  masuk: Date,
  keluar: Date
): number => {
  const diffMs = keluar.getTime() - masuk.getTime();
  const hours = Math.ceil(diffMs / (1000 * 60 * 60));

  if (type === "motor") {
    return 3000 + Math.max(0, hours - 1) * 1000;
  }
  return 5000 + Math.max(0, hours - 1) * 2000;
};
