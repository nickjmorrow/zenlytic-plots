/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

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
  const xAxisConfig = getXAxis(plotConfig);
  const yAxisConfig = getYAxis(plotConfig);
  const yAxisDataKey = getYAxisDataKey(plotConfig);

  const yAxisName = getYAxisName(plotConfig);

  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);

  const seriesStrokeColor = getSeriesStrokeColor(plotConfig);
  const seriesFillColor = getSeriesFillColor(plotConfig);

  const gradientId = `colorUv${`line-plot`}`;

  return (
    <ResponsiveContainer>
      <LineChart data={data} margin={margin}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={seriesFillColor} stopOpacity={1.0} />
            <stop offset="30%" stopColor={seriesFillColor} stopOpacity={0.8} />
            <stop offset="100%" stopColor={seriesFillColor} stopOpacity={0.1} />
          </linearGradient>
        </defs>
        {GridLines()}
        {YAxis({
          ...yAxisConfig,
        })}
        {XAxis({
          ...xAxisConfig,
        })}
        {/* {Tooltip({
                CustomHoverTooltip,
                CustomClickTooltip,
                isClickTooltipVisible,
                clickTooltipCoords,
                closeClickTooltip,
                yAxisFormat,
                xAxisTickFormatter,
              })} */}
        <Line
          type="monotone"
          dataKey={yAxisDataKey}
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
      </LineChart>
    </ResponsiveContainer>
  );
}

NewLinePlot.propTypes = {};

export default NewLinePlot;
