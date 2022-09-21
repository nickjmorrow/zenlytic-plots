import moment from 'moment';
import colors from '../constants/colors';
import { AXIS_DATA_KEY_KEYS, DEFAULT_PLOT_MARGIN } from '../constants/plotConstants';
import formatValue, { TIME_FORMATS } from './formatValue';
import getD3DataFormatter from './getD3DataFormatter';

export const getAxes = (plotConfig = {}) => {
  return plotConfig.axes || [];
};

export const getSeries = (plotConfig = {}) => {
  const { series = [] } = plotConfig;
  if (!series.length) return null;
  return series[0];
};

export const getFormatter = (format) => {
  return (value) => {
    return formatValue(getD3DataFormatter(format, value), value);
  };
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

// const chooseAxisFromAxes = (plotConfig, type) => {
//   const axes = getAxes(plotConfig);
//   switch (type) {
//     case AXIS_TYPES.TIME:
//       return axes.find((axis) => axis.dataType === DATA_TYPES.TIME);
//     case AXIS_TYPES.NUMBER:
//       return axes.find((axis) => axis.dataType === DATA_TYPES.NUMBER);
//     case AXIS_TYPES.CATEGORY:
//     default:
//       return axes.find(
//         (axis) => axis.dataType === DATA_TYPES.CATEGORY || axis.dataType === DATA_TYPES.TIME
//       );
//   }
// };

const getSeriesKeyValue = (plotConfig, axisDataKeyKey) => {
  const series = getSeries(plotConfig);
  if (!series) return null;
  return series[axisDataKeyKey];
};

const getAxisFromDataKey = (plotConfig, axisDataKey) => {
  const axes = getAxes(plotConfig);
  return axes.find((axis) => axis.dataKey === axisDataKey);
};

const getAxisFromAxes = (plotConfig, axisDataKeyKey) => {
  const axisDataKey = getSeriesKeyValue(plotConfig, axisDataKeyKey);

  return getAxisFromDataKey(plotConfig, axisDataKey);
};

export const getXAxis = (plotConfig) => {
  const xAxis = getAxisFromAxes(plotConfig, AXIS_DATA_KEY_KEYS.X_AXIS_DATA_KEY_KEY);
  if (!xAxis) return null;
  const { dataType, name, dataKey, format } = xAxis || {};
  const tickFormatter = getFormatter(format);
  return { type: dataType, name, dataKey, tickFormatter };
};

export const getXAxisDataKey = (plotConfig) => {
  const xAxis = getXAxis(plotConfig);
  return xAxis?.dataKey;
};
export const getYAxis = (plotConfig) => {
  const yAxis = getAxisFromAxes(plotConfig, AXIS_DATA_KEY_KEYS.Y_AXIS_DATA_KEY_KEY);
  if (!yAxis) return null;
  const { dataType, name, dataKey, format } = yAxis || {};

  const tickFormatter = getFormatter(format);
  return { type: dataType, name, dataKey, tickFormatter };
};
export const getYAxisDataKey = (plotConfig) => {
  const yAxis = getYAxis(plotConfig);
  return yAxis?.dataKey;
};
export const getYAxisName = (plotConfig) => {
  const yAxis = getYAxis(plotConfig);
  return yAxis?.name;
};

// Used in grouped bar to define the x axis
export const getCategoryAxis = (plotConfig) => {
  const categoryAxis = getAxisFromAxes(plotConfig, AXIS_DATA_KEY_KEYS.CATEGORY_AXIS_DATA_KEY_KEY);

  if (!categoryAxis) return null;
  const { dataType, name, dataKey, format } = categoryAxis || {};
  const tickFormatter = getFormatter(format);
  return { type: dataType, name, dataKey, tickFormatter };
};

export const getCategoryAxisDataKey = (plotConfig) => {
  const categoryAxis = getCategoryAxis(plotConfig);
  return categoryAxis?.dataKey;
};

// Used in grouped bar plot to get all bars in each group
export const getCategoryValues = (plotConfig) => {
  const categoryValueDataKeys = getSeriesKeyValue(
    plotConfig,
    AXIS_DATA_KEY_KEYS.CATEGORY_VALUE_DATA_KEYS_KEY
  );
  if (!categoryValueDataKeys || !categoryValueDataKeys.length) return null;
  return categoryValueDataKeys.map((categoryValueDataKey) => {
    const categoryValue = getAxisFromDataKey(plotConfig, categoryValueDataKey);
    const { dataType, name, dataKey, format } = categoryValue || {};
    const tickFormatter = getFormatter(format);
    return { type: dataType, name, dataKey, tickFormatter };
  });
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

// Series Getters
export const getSeriesFillColor = (plotConfig) => {
  const defaultColor = colors.gray[50];
  const series = getSeries(plotConfig);
  const { fillColor = defaultColor } = series || {};
  return fillColor;
};

export const getSeriesStrokeColor = (plotConfig) => {
  const defaultColor = colors.gray[100];
  const series = getSeries(plotConfig);
  const { strokeColor = defaultColor } = series || {};
  return strokeColor;
};

export const getSeriesIsStacked = (plotConfig) => {
  const series = getSeries(plotConfig);
  console.log('🚀 ~ file: plotConfigGetters.js ~ line 156 ~ getSeriesIsStacked ~ series', series);
  const { isStacked = false } = series || {};
  return isStacked;
};
