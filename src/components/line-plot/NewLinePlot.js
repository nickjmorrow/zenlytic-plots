/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import moment from 'moment';
import React, { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  ReferenceArea,
  ResponsiveContainer,
} from 'recharts';
import {
  AXIS_TYPES,
  BRUSH_BORDER_COLOR,
  BRUSH_COLOR,
  DEFAULT_AXIS_COLOR,
  DEFAULT_CARTESIAN_GRID_COLOR,
  DEFAULT_LABEL_PROPS,
  DEFAULT_NO_X_AXIS_PLOT_MARGIN,
  DEFAULT_PLOT_MARGIN,
  DEFAULT_TICK_PROPS,
  DEFAULT_X_AXIS_HEIGHT,
  DEFAULT_Y_AXIS_WIDTH,
} from '../../constants/plotConstants';

import formatValue, { formatUnixValue, TIME_FORMATS } from '../../utils/formatValue';
import getD3DataFormatter from '../../utils/getD3DataFormatter';
import Brush from '../shared/brush/Brush';
import GridLines from '../shared/grid-lines/GridLines';
import Tooltip from '../shared/tooltip/Tooltip';
import XAxis from '../shared/x-axis/XAxis';
import YAxis from '../shared/y-axis/YAxis';
import TooltipHandler from '../tooltip-handler/TooltipHandler';

const getAxes = (plotConfig = {}) => {
  return plotConfig.axes || [];
};
const getFormatter = (type, format) => {
  console.log('🚀 ~ file: NewLinePlot.js ~ line 40 ~ getFormatter ~ format', format);
  console.log('🚀 ~ file: NewLinePlot.js ~ line 40 ~ getFormatter ~ type', type);
  if (type === AXIS_TYPES.TIME) {
    return (value) => {
      console.log('🚀 ~ file: NewLinePlot.js ~ line 44 ~ return ~ value', value);
      return formatUnixValue(getD3DataFormatter(format, value), value);
    };
  }
  if (type === AXIS_TYPES.NUMBER) {
    return (value) => {
      console.log('🚀 ~ file: NewLinePlot.js ~ line 47 ~ return ~ value', value);
      return formatValue(getD3DataFormatter(format, value), value);
    };
  }
  return '';
};
const getXAxis = (plotConfig, xAxisType) => {
  const axes = getAxes(plotConfig);
  const xAxis = axes.find((axis) => axis.type === xAxisType);
  if (!xAxis) return null;
  const { type, name, dataKey, format } = xAxis || {};
  const tickFormatter = getFormatter(type, format);
  // We need to cast dates to unix time for recharts
  // This is because we want it to be a number, not a category
  const adjustedDataKey = TIME_FORMATS.includes(format)
    ? (d) => {
        if (!d) return null;
        return moment.utc(d[dataKey]).format('X');
      }
    : dataKey;

  return { type, name, dataKey: adjustedDataKey, tickFormatter };
};

const getXAxisKey = (plotConfig) => {
  return undefined;
};
const getYAxis = (plotConfig, yAxisType) => {
  const axes = getAxes(plotConfig);
  const xAxis = axes.find((axis) => axis.type === yAxisType);
  if (!xAxis) return null;
  const { type, name, dataKey, format } = xAxis || {};
  const tickFormatter = getFormatter(type, format);
  return { type, name, dataKey, tickFormatter };
};
const getYAxisDataKey = (plotConfig, yAxisType) => {
  const yAxis = getYAxis(plotConfig, yAxisType);
  return yAxis?.dataKey;
};
const getYAxisName = (plotConfig, yAxisType) => {
  const yAxis = getYAxis(plotConfig, yAxisType);
  return yAxis?.name;
};

const getData = (plotConfig) => {
  const { data = [] } = plotConfig;
  return data;
};
const getHeight = (plotConfig) => {
  return 300;
};
const getWidth = (plotConfig) => {
  return 300;
};
const getMargin = (plotConfig = {}) => {
  const { margin = DEFAULT_PLOT_MARGIN } = plotConfig;
  return margin;
};
const getSeriesColor = (plotConfig) => {
  return undefined;
};

function NewLinePlot({ plotConfig = {} }) {
  const xAxisType = AXIS_TYPES.TIME;
  const yAxisType = AXIS_TYPES.NUMBER;

  const xAxisConfig = getXAxis(plotConfig, xAxisType);
  const yAxisConfig = getYAxis(plotConfig, yAxisType);
  const yAxisKey = getYAxisDataKey(plotConfig, yAxisType);
  const yAxisName = getYAxisName(plotConfig, yAxisType);

  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);
  const height = getHeight(plotConfig);
  const width = getWidth(plotConfig);
  const seriesColor = getSeriesColor(plotConfig);

  return (
    <ResponsiveContainer>
      <AreaChart data={data} margin={margin}>
        {GridLines()}
        {XAxis({
          ...xAxisConfig,
          tickFormatter: (value) => {
            console.log('🚀 ~ file: NewLinePlot.js ~ line 44 ~ return ~ value', value);
            return formatUnixValue(getD3DataFormatter('date', value), value);
          },
        })}
        {YAxis({ ...yAxisConfig })}
        {/* {Tooltip({
                CustomHoverTooltip,
                CustomClickTooltip,
                isClickTooltipVisible,
                clickTooltipCoords,
                closeClickTooltip,
                yAxisFormat,
                xAxisTickFormatter,
              })} */}
        <Area
          type="monotone"
          dataKey={yAxisKey}
          stroke={seriesColor}
          strokeWidth={2}
          // activeDot={isClickTooltipVisible ? false : { r: 8 }}
          fillOpacity={1}
          // fill={`url(#${gradientId})`}
          name={yAxisName}
          dot
        />
        {/* {Brush({
                  x1: refAreaLeft,
                  x2: refAreaRight,
                })} */}
      </AreaChart>
    </ResponsiveContainer>
  );
}

NewLinePlot.propTypes = {};

export default NewLinePlot;
