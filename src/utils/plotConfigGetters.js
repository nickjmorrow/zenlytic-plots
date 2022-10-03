import { isEmpty } from 'lodash';
import moment from 'moment';
import colors from '../constants/colors';
import { AXIS_DATA_KEY_KEYS, DEFAULT_PLOT_MARGIN, PLOT_TYPES } from '../constants/plotConstants';
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

export const getSeriesType = (plotConfig) => {
  const series = getSeries(plotConfig);
  const { type } = series || {};
  return type;
};

export const getSeriesActiveIds = (plotConfig) => {
  const series = getSeries(plotConfig);
  const { activeIds } = series || {};
  return activeIds;
};

export const getFormatter = (format) => {
  return (value) => {
    return formatValue(getD3DataFormatter(format, value), value);
  };
};

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
  if (!xAxis) return {};
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
  if (!yAxis) return {};
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

  if (!categoryAxis) return {};
  const { dataType, name, dataKey, format } = categoryAxis || {};
  const tickFormatter = getFormatter(format);
  return { type: dataType, name, dataKey, tickFormatter };
};

export const getCategoryAxisDataKey = (plotConfig) => {
  const categoryAxis = getCategoryAxis(plotConfig);
  return categoryAxis?.dataKey;
};

export const getUniqueValuesOfDataKey = (plotConfig, dataKey) => {
  const { data = [] } = plotConfig;
  return [...new Set(data.map((item) => item[dataKey]))];
};

export const getCategoriesOfCategoryAxis = (plotConfig) => {
  const categoryAxisDataKey = getCategoryAxisDataKey(plotConfig);
  const categories = getUniqueValuesOfDataKey(plotConfig, categoryAxisDataKey);
  return categories.map((category) => {
    return { name: category, dataKey: category };
  });
};

export const getCategoryValueAxes = (plotConfig) => {
  // Used if we should use the categories of a certain axis as the legend items

  if (getCategoryAxisDataKey(plotConfig)) {
    return getCategoriesOfCategoryAxis(plotConfig);
  }
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

// TODO refactor the bar stuff and anything else using this to use the new function
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

export const getIsDataPivoted = (plotConfig) => {
  console.log(
    '🚀 ~ file: plotConfigGetters.js ~ line 139 ~ getIsDataPivoted ~ plotConfig',
    plotConfig
  );
  const categoryAxis = getCategoryAxis(plotConfig);
  console.log(
    '🚀 ~ file: plotConfigGetters.js ~ line 141 ~ getIsDataPivoted ~ categoryAxis',
    categoryAxis
  );
  return !isEmpty(categoryAxis);
};

const flatPivotDataByDataKey = (plotConfig, data, dataKey) => {
  const xAxisDataKey = getXAxisDataKey(plotConfig);
  const yAxisDataKey = getYAxisDataKey(plotConfig);

  let dataDict = {};
  data.forEach((item) => {
    const dataKeyValue = item[dataKey];
    const xAxisKeyValue = item[xAxisDataKey];
    const yAxisKeyValue = item[yAxisDataKey];

    if (!dataDict[xAxisKeyValue]) {
      dataDict[xAxisKeyValue] = {
        [dataKeyValue]: yAxisKeyValue,
      };
    }
    dataDict[xAxisKeyValue][dataKeyValue] = yAxisKeyValue;
  });

  return Object.keys(dataDict).map((key) => {
    return { [xAxisDataKey]: key, ...dataDict[key] };
  });
};

const nestedPivotDataByDataKey = (plotConfig, data, dataKey) => {
  console.log(
    '🚀 ~ file: plotConfigGetters.js ~ line 167 ~ nestedPivotDataByDataKey ~ dataKey',
    dataKey
  );
  console.log('🚀 ~ file: plotConfigGetters.js ~ line 167 ~ nestedPivotDataByDataKey ~ data', data);
  let dataDict = {};
  data.forEach((item) => {
    const dataKeyValue = item[dataKey];
    if (!dataDict[dataKeyValue]) {
      dataDict[dataKeyValue] = [];
    }
    dataDict[dataKeyValue].push(item);
  });
  console.log(
    '🚀 ~ file: plotConfigGetters.js ~ line 189 ~ returnObject.keys ~ dataDict',
    dataDict
  );
  return Object.keys(dataDict).map((key) => {
    return { name: key, data: dataDict[key] };
  });
};

export const pivotDataByDataKey = (plotConfig, data, dataKey) => {
  const plotType = getSeriesType(plotConfig);
  if (plotType === PLOT_TYPES.AREA) return flatPivotDataByDataKey(plotConfig, data, dataKey);
  return nestedPivotDataByDataKey(plotConfig, data, dataKey);
};

const getFunnelSpeicifcData = (plotConfig, data) => {
  const yAxisDataKey = getYAxisDataKey(plotConfig);
  const newData = [];
  let previousValue = 0;
  data.forEach((d, index) => {
    newData.push({
      ...d,
      CONVERTED: d[yAxisDataKey],
      DROPPED_OFF: index === 0 ? 0 : previousValue - d[yAxisDataKey],
    });
    previousValue = d[yAxisDataKey];
  });
  return newData;
};

const getWaterfallSpeicifcData = (plotConfig, data) => {
  const xAxisDataKey = getXAxisDataKey(plotConfig);
  const yAxisDataKey = getYAxisDataKey(plotConfig);
  const activeIds = getSeriesActiveIds(plotConfig);

  if (activeIds) {
    return data.map((d) => activeIds.includes(d.id));
  }
  return data;

  // Here we reuse the pivot method group the two data values as a single bar
  // const pivotedWaterfallData = pivotDataByDataKey(plotConfig, data, 'id');

  // return pivotedWaterfallData
  //   .filter((bar) => bar.data.length === 2)
  //   .map((bar) => {
  //     const barData1 = bar.data[0] || {};
  //     const barData2 = bar.data[1] || {};
  //     return {
  //       [xAxisDataKey]: barData1[xAxisDataKey],
  //       [yAxisDataKey]: [barData1[yAxisDataKey], barData2[yAxisDataKey]],
  //     };
  //   });
};

const getPlotSpeicifcData = (plotConfig, data) => {
  console.log('🚀 ~ file: plotConfigGetters.js ~ line 241 ~ getPlotSpeicifcData ~ data', data);
  console.log(
    '🚀 ~ file: plotConfigGetters.js ~ line 241 ~ getPlotSpeicifcData ~ plotConfig',
    plotConfig
  );
  switch (getSeriesType(plotConfig)) {
    case PLOT_TYPES.FUNNEL_BAR:
      return getFunnelSpeicifcData(plotConfig, data);
    case PLOT_TYPES.WATERFALL:
      return getWaterfallSpeicifcData(plotConfig, data);
    default:
      return data;
  }
};

export const getData = (plotConfig) => {
  const { data = [] } = plotConfig;
  const isDataPivoted = getIsDataPivoted(plotConfig);
  console.log(
    '🚀 ~ file: plotConfigGetters.js ~ line 213 ~ dasdsagetData ~ isDataPivoted',
    isDataPivoted
  );

  // switch (getSeriesType(plotConfig)) {
  //   case PLOT_TYPES.FUNNEL_BAR:
  //     return getFunnelSpeicifcData(plotConfig, data);
  //   default:
  //     return data;
  // }

  if (!isDataPivoted) return getPlotSpeicifcData(plotConfig, data);
  const categoryAxisDataKey = getCategoryAxisDataKey(plotConfig);
  const pivotedData = pivotDataByDataKey(plotConfig, data, categoryAxisDataKey);
  console.log('🚀 ~ file: plotConfigGetters.js ~ line 245 ~ getData ~ pivotedData', pivotedData);
  return pivotedData;
};

export const getValuesOfCategoryAxis = (plotConfig) => {
  const categoryAxisDataKey = getCategoryAxisDataKey(plotConfig);
  const uniqueValuesOfDataKey = getUniqueValuesOfDataKey(plotConfig, categoryAxisDataKey);
  return uniqueValuesOfDataKey.map((value) => {
    return { dataKey: value };
  });
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

export const getIsSeriesStacked = (plotConfig) => {
  const series = getSeries(plotConfig);
  const { isStacked = false } = series || {};
  return isStacked;
};
