/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Area, AreaChart, ComposedChart, ResponsiveContainer } from 'recharts';
import { AXIS_TYPES } from '../../constants/plotConstants';

import {
  getData,
  getMargin,
  getSeriesFillColor,
  getSeriesStrokeColor,
  getXAxis,
  getYAxis,
  getYAxisDataKey,
  getYAxisName,
} from '../../utils/plotConfigGetters';
import GridLines from '../shared/grid-lines/GridLines';
import XAxis from '../shared/x-axis/XAxis';
import YAxis from '../shared/y-axis/YAxis';

function NewLinePlot({ plotConfig = {} }) {
  const xAxisType = AXIS_TYPES.TIME;
  const yAxisType = AXIS_TYPES.NUMBER;

  const xAxisConfig = getXAxis(plotConfig, xAxisType);
  const yAxisConfig = getYAxis(plotConfig, yAxisType);
  const yAxisKey = getYAxisDataKey(plotConfig, yAxisType);
  const yAxisName = getYAxisName(plotConfig, yAxisType);

  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);

  const seriesStrokeColor = getSeriesStrokeColor(plotConfig);
  const seriesFillColor = getSeriesFillColor(plotConfig);

  const gradientId = `colorUv${`line-plot`}`;

  return (
    <ResponsiveContainer>
      <AreaChart data={data} margin={margin}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={seriesFillColor} stopOpacity={1.0} />
            <stop offset="30%" stopColor={seriesFillColor} stopOpacity={0.8} />
            <stop offset="100%" stopColor={seriesFillColor} stopOpacity={0.1} />
          </linearGradient>
        </defs>
        {GridLines()}
        {XAxis({
          ...xAxisConfig,
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
          stroke={seriesStrokeColor}
          strokeWidth={2}
          // activeDot={isClickTooltipVisible ? false : { r: 8 }}
          fillOpacity={1}
          fill={`url(#${gradientId})`}
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
