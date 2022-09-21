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
import ZenlyticLegend from '../zenlytic-legend/ZenlyticLegend';

function NewLinePlot({ plotConfig = {} }) {
  console.log('🚀 ~ file: NewLinePlot.js ~ line 24 ~ NewLinePlot ~ plotConfig', plotConfig);
  const categoryAxisConfig = getCategoryAxis(plotConfig);
  console.log(
    '🚀 ~ file: NewLinePlot.js ~ line 25 ~ NewLinePlot ~ categoryAxisConfig',
    categoryAxisConfig
  );

  const yAxisName = getYAxisName(plotConfig);

  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);

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
        {ZenlyticLegend({
          margin,
        })}
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
