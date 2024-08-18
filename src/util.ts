export const customToFixed = (value: number, decimals: number): number => {
  const divider = Math.pow(10, decimals);
  return Math.round(value * divider) / divider;
};

export const replaceNullish = (
  value: number | null | undefined,
  replaceText: string
): number | string => {
  return value ?? replaceText;
};
