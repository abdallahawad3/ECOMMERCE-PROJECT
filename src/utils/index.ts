export const sliceText = (tsx: string, maxVal: number) => {
  if (tsx.length > maxVal) {
    return `${tsx.slice(0, maxVal)}...`;
  }
  return tsx;
};
