const getLineColor = (line, categoryDataIndex, colorScale, plotColor) => {
  if (!categoryDataIndex) return plotColor;
  const lineCategory = line.length ? line[0][categoryDataIndex] : null;
  const catColor = colorScale(lineCategory);
  return catColor;
};

export default getLineColor;
