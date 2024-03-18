export const shuffle = (arr: any[]) => {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export const formatDate = (date: Date | null) => {
  if (!date) return "";
  return date.toISOString().split("T")[0];
};

export const pickRandom = (array: any[]) =>
  array[Math.floor(Math.random() * array.length)];
