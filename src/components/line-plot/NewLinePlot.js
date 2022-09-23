/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

import {
  getData,
  getMargin,
  getSeriesStrokeColor,
  getXAxis,
  getYAxis,
  getYAxisDataKey,
} from '../../utils/plotConfigGetters';
import GridLines from '../shared/grid-lines/GridLines';
import XAxis from '../shared/x-axis/XAxis';
import YAxis from '../shared/y-axis/YAxis';

function NewLinePlot({ plotConfig = {} }) {
  const xAxisConfig = getXAxis(plotConfig);
  const yAxisConfig = getYAxis(plotConfig);
  const yAxisDataKey = getYAxisDataKey(plotConfig);

  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);

  const seriesStrokeColor = getSeriesStrokeColor(plotConfig);

  return (
    <ResponsiveContainer>
      <LineChart data={data} margin={margin}>
        {GridLines()}
        {YAxis({ ...yAxisConfig })}
        {XAxis({ ...xAxisConfig })}
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
          dot
          strokeWidth={2}
        />

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
