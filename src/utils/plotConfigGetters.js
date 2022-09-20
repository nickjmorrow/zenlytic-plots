import moment from 'moment';
import colors from '../constants/colors';
import { AXIS_TYPES, DATA_TYPES, DEFAULT_PLOT_MARGIN } from '../constants/plotConstants';
import formatValue, { formatUnixValue, TIME_FORMATS } from './formatValue';
import getD3DataFormatter from './getD3DataFormatter';

export const getAxes = (plotConfig = {}) => {
  return plotConfig.axes || [];
};
export const getFormatter = (dataType, format) => {
  if (dataType === DATA_TYPES.TIME) {
    return (value) => {
      return formatUnixValue(getD3DataFormatter(format, value), value);
    };
  }
  if (dataType === DATA_TYPES.NUMBER) {
    return (value) => {
      return formatValue(getD3DataFormatter(format, value), value);
    };
  }
  return '';
};

const getAdjustedXAxisDataKey = (dataKey, format) => {
  const adjustedDataKey = TIME_FORMATS.includes(format)
    ? (d) => {
        if (!d) return null;
        return moment.utc(d[dataKey]).format('X');
      }
    : dataKey;
  return adjustedDataKey;
};

const chooseAxisFromAxes = (plotConfig, type) => {
  const axes = getAxes(plotConfig);
  switch (type) {
    case AXIS_TYPES.TIME:
      return axes.find((axis) => axis.dataType === DATA_TYPES.TIME);
    case AXIS_TYPES.NUMBER:
      return axes.find((axis) => axis.dataType === DATA_TYPES.NUMBER);
    case AXIS_TYPES.CATEGORY:
    default:
      return axes.find(
        (axis) => axis.dataType === DATA_TYPES.CATEGORY || axis.dataType === DATA_TYPES.TIME
      );
  }
};

export const getXAxis = (plotConfig, type) => {
  const xAxis = chooseAxisFromAxes(plotConfig, type);
  if (!xAxis) return null;
  const { dataType, name, dataKey, format } = xAxis || {};
  const tickFormatter = getFormatter(dataType, format);
  // We need to cast dates to unix time for recharts
  // This is because we want it to be a number, not a category
  const adjustedDataKey = getAdjustedXAxisDataKey(dataKey, format);
  return { type, name, dataKey: adjustedDataKey, tickFormatter };
};

export const getXAxisKey = (plotConfig, xAxisType) => {
  const xAxis = getXAxis(plotConfig, xAxisType);
  return xAxis?.dataKey;
};
export const getYAxis = (plotConfig, type) => {
  const yAxis = chooseAxisFromAxes(plotConfig, type);
  if (!yAxis) return null;
  const { dataType, name, dataKey, format } = yAxis || {};
  const tickFormatter = getFormatter(dataType, format);
  return { type, name, dataKey, tickFormatter };
};
export const getYAxisDataKey = (plotConfig, yAxisType) => {
  const yAxis = getYAxis(plotConfig, yAxisType);
  return yAxis?.dataKey;
};
export const getYAxisName = (plotConfig, yAxisType) => {
  const yAxis = getYAxis(plotConfig, yAxisType);
  return yAxis?.name;
};

export const getData = (plotConfig) => {
  const { data = [] } = plotConfig;
  return data;
};
export const getHeight = (plotConfig) => {
  return 300;
};
export const getWidth = (plotConfig) => {
  return 300;
};
export const getMargin = (plotConfig = {}) => {
  const { margin = DEFAULT_PLOT_MARGIN } = plotConfig;
  return margin;
};
export const getSeriesFillColor = (plotConfig) => {
  const defaultColor = colors.gray[50];
  const { series = [] } = plotConfig;
  if (!series.length) return defaultColor;
  const subjectSeries = series[0];
  const { fillColor = defaultColor } = subjectSeries || {};
  return fillColor;
};

export const getSeriesStrokeColor = (plotConfig) => {
  const defaultColor = colors.gray[100];
  const { series = [] } = plotConfig;
  if (!series.length) return defaultColor;
  const subjectSeries = series[0];
  const { strokeColor = defaultColor } = subjectSeries || {};
  return strokeColor;
};
