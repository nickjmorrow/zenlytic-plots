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
  getValuesOfCategoryAxis,
  getXAxis,
  getYAxis,
  getYAxisDataKey,
  getYAxisName,
} from '../../utils/plotConfigGetters';
import GridLines from '../shared/grid-lines/GridLines';
import XAxis from '../shared/x-axis/XAxis';
import YAxis from '../shared/y-axis/YAxis';
// import XAxis from '../shared/x-axis/XAxis';
// import YAxis from '../shared/y-axis/YAxis';
import ZenlyticLegend from '../zenlytic-legend/ZenlyticLegend';

function NewMultiLinePlot({ plotConfig = {} }) {
  const xAxisConfig = getXAxis(plotConfig);
  console.log(
    '🚀 ~ file: NewMultiLinePlot.js ~ line 29 ~ NewMultiLinePlot ~ xAxisConfig',
    xAxisConfig
  );
  const yAxisConfig = getYAxis(plotConfig);

  const data = getData(plotConfig);
  console.log('🚀 ~ file: NewMultiLinePlot.js ~ line 32 ~ NewMultiLinePlot ~ data', data);
  const margin = getMargin(plotConfig);

  const categoryValues = getValuesOfCategoryAxis(plotConfig);
  console.log(
    '🚀 ~ file: NewMultiLinePlot.js ~ line 35 ~ NewMultiLinePlot ~ categoryValues',
    categoryValues
  );

  return (
    <ResponsiveContainer>
      <LineChart data={data} margin={margin}>
        {GridLines()}

        {XAxis({ ...xAxisConfig })}
        {YAxis({})}

        {categoryValues &&
          categoryValues.map((categoryValue, index) => (
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
      </LineChart>
    </ResponsiveContainer>
  );
}

NewMultiLinePlot.propTypes = {};

export default NewMultiLinePlot;
