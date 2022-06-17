export const getLinePlotArgs = (plotData) => {
  const { xAxis = {}, yAxis = {}, categoryAxis = {}, lines = {}, plotColor = '#8a8a8a' } = plotData;
  const {
    format: yAxisBackendFormat,
    columnIndex: yAxisDataIndex,
    label: yAxisLabel,
    showLabel: showYAxisLabel,
  } = yAxis;

  const {
    columnIndex: xAxisDataIndex,
    format: xAxisBackendFormat,
    label: xAxisLabel,
    showLabel: showXAxisLabel,
    columnId: xAxisColumnId,
  } = xAxis;

  return {
    xAxisDataIndex: xAxisDataIndex,
    xAxisBackendFormat: xAxisBackendFormat,
    yAxisDataIndex: yAxisDataIndex,
    yAxisFormat: '$.3~s',
    plotColor: plotColor,
    backgroundColor: 'white',
    showLabels: true,
    showPatternLines: true,
    showGridColumns: true,
    xAxisLabel: xAxisLabel,
    showXAxisLabel: showXAxisLabel,
    yAxisLabel: yAxisLabel,
    showYAxisLabel: true,
    colorScale: null,
    categoryKeys: [],
    selectedKeys: [],
    width: 1152,
    height: 384,
    lines: lines,
  };
};
export default getLinePlotArgs;
