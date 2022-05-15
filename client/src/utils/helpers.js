export const calculatePercentage = (num, total) => {
  let percentage = (100 / total) * num;
  return Math.round((percentage + Number.EPSILON) * 100) / 100;
};
