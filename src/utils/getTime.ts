export const getTime = (value: string) => {
  const temp = new Date(Date.parse(value));

  return temp.toLocaleDateString("cs-CZ", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });
};
