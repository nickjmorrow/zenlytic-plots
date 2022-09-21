/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';
import { PLOT_COLORS, PLOT_SECONDARY_COLORS } from '../../constants/plotConstants';

import {
  getCategoryAxis,
  getCategoryValues,
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
  const categoryAxisConfig = getCategoryAxis(plotConfig);

  const yAxisDataKey = getYAxisDataKey(plotConfig);

  const yAxisName = getYAxisName(plotConfig);

  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);

  const seriesStrokeColor = getSeriesStrokeColor(plotConfig);
  const seriesFillColor = getSeriesFillColor(plotConfig);

  const categoryValues = getCategoryValues(plotConfig);
  if (!categoryValues || !categoryAxisConfig) return false;

  return (
    <ResponsiveContainer>
      <LineChart data={data} margin={margin}>
        {GridLines()}
        {YAxis({})}
        {XAxis({
          ...categoryAxisConfig,
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
        {categoryValues.map((categoryValue, index) => (
          <Line
            type="monotone"
            dataKey={categoryValue.dataKey}
            fill={PLOT_SECONDARY_COLORS[index % PLOT_SECONDARY_COLORS.length]}
            stroke={PLOT_COLORS[index % PLOT_COLORS.length]}
            dot
            strokeWidth={2}
          />
        ))}
        {/* <Line
          type="monotone"
          dataKey={yAxisDataKey}
          stroke={seriesStrokeColor}
          strokeWidth={2}
          // activeDot={isClickTooltipVisible ? false : { r: 8 }}
          fillOpacity={1}
          fill={`url(#${gradientId})`}
          name={yAxisName}
          dot
        /> */}
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
