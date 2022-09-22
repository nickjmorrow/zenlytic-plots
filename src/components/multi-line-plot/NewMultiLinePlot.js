/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
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
// import XAxis from '../shared/x-axis/XAxis';
// import YAxis from '../shared/y-axis/YAxis';
import ZenlyticLegend from '../zenlytic-legend/ZenlyticLegend';

function NewMultiLinePlot({ plotConfig = {} }) {
  console.log(
    '🚀 ~ file: NewMultiLinePlot.js ~ line 25 ~ NewMultiLinePLot ~ plotConfig',
    plotConfig
  );
  const xAxisConfig = getXAxis(plotConfig);
  console.log(
    '🚀 ~ file: NewMultiLinePlot.js ~ line 30 ~ NewMultiLinePlot ~ xAxisConfig',
    xAxisConfig
  );
  const yAxisConfig = getYAxis(plotConfig);
  const categoryAxisConfig = getCategoryAxis(plotConfig);

  const data = getData(plotConfig);
  console.log('🚀 ~ file: NewMultiLinePlot.js ~ line 34 ~ NewMultiLinePlot ~ data', data);
  const margin = getMargin(plotConfig);

  const categoryValues = getCategoryValues(plotConfig);
  console.log(
    '🚀 ~ file: NewMultiLinePlot.js ~ line 37 ~ NewMultiLinePlot ~ categoryValues',
    categoryValues
  );
  // if (!categoryValues || !categoryAxisConfig) return false;

  return (
    <ResponsiveContainer>
      <LineChart data={data} margin={margin}>
        {GridLines()}
        <XAxis dataKey="ORDERS_EMAILS_FROM_US_IN_THE_LAST_WEEK" type="category" />
        <YAxis />
        {/* {YAxis({})}
        {XAxis({ ...xAxisConfig })} */}
        <Line
          type="monotone"
          dataKey="ORDERS_ORDER_CREATED_AT_DATE"
          fill="red"
          stroke="red"
          dot
          strokeWidth={2}
        />
        {/* {categoryValues &&
          categoryValues.map((categoryValue, index) => (
            <Line
              type="monotone"
              dataKey={categoryValue.dataKey}
              fill={PLOT_SECONDARY_COLORS[index % PLOT_SECONDARY_COLORS.length]}
              stroke={PLOT_COLORS[index % PLOT_COLORS.length]}
              dot
              strokeWidth={2}
            />
          ))} */}
        {ZenlyticLegend({
          margin,
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}

NewMultiLinePlot.propTypes = {};

export default NewMultiLinePlot;
