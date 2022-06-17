import { scaleOrdinal } from '@visx/scale';
import { PLOT_COLOR_PALETTE } from '../../../constants/plotConstants';

const getCategoryKeys = (lines, categoryDataIndex) => {
  if (!categoryDataIndex) return [];
  const categories = lines.map((line) => {
    const firstPointInLine = line.length ? line[0] : {};
    const pointCategory = firstPointInLine[categoryDataIndex];
    return pointCategory;
  });
  return categories;
};

const getColorScale = (lines, categoryDataIndex) => {
  const colorScale = scaleOrdinal({
    domain: getCategoryKeys(lines),
    range: Object.values(PLOT_COLOR_PALETTE),
  });
  return colorScale;
};
export default getColorScale;
