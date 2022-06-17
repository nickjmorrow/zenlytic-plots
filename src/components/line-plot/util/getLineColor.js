const getLineColor = (line, categoryIndex, colorScale) => {
  const lineCategory = line.length ? line[0][categoryIndex] : null;
  const catColor = colorScale(lineCategory);
  return catColor;
};

export default getLineColor;
