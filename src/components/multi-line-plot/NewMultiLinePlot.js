/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';
import { PLOT_COLORS, PLOT_SECONDARY_COLORS } from '../../constants/plotConstants';

import {
  getCategoriesOfCategoryAxis,
  getCategoryAxisDataKey,
  getCategoryValueAxes,
  getData,
  getIsDataPivoted,
  getMargin,
  getXAxis,
  getYAxis,
  getYAxisDataKey,
} from '../../utils/plotConfigGetters';
import GridLines from '../shared/grid-lines/GridLines';
import XAxis from '../shared/x-axis/XAxis';
import YAxis from '../shared/y-axis/YAxis';
// import XAxis from '../shared/x-axis/XAxis';
// import YAxis from '../shared/y-axis/YAxis';
import ZenlyticLegend from '../zenlytic-legend/ZenlyticLegend';

function NewMultiLinePlot({ plotConfig = {} }) {
  const xAxisConfig = getXAxis(plotConfig);

  const yAxisConfig = getYAxis(plotConfig);

  const categoryAxisDataKey = getCategoryAxisDataKey(plotConfig);

  const yAxisDataKey = getYAxisDataKey(plotConfig);

  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);

  const categoryValues = getCategoriesOfCategoryAxis(plotConfig);

  const categoryValueAxes = getCategoryValueAxes(plotConfig);
  const isDataPivoted = getIsDataPivoted(plotConfig);

  return (
    <ResponsiveContainer>
      <LineChart data={data} margin={margin}>
        {GridLines()}

        {XAxis({ ...xAxisConfig })}
        {YAxis({})}

        {isDataPivoted &&
          data.map((series, index) => {
            console.log('🚀 ~ file: NewMultiLinePlot.js ~ line 52 ~ data.map ~ series', series);
            return (
              <Line
                dot
                data={series.data}
                stroke={PLOT_COLORS[index % PLOT_COLORS.length]}
                dataKey={yAxisDataKey}
                type="monotone"
                strokeWidth={2}
                name={series.name}
                key={series.name}
              />
            );
          })}

        {!isDataPivoted &&
          categoryValueAxes.map((axis, index) => (
            <Line
              type="monotone"
              dataKey={axis.dataKey}
              name={axis.name}
              key={axis.name}
              fill={PLOT_SECONDARY_COLORS[index % PLOT_SECONDARY_COLORS.length]}
              stroke={PLOT_COLORS[index % PLOT_COLORS.length]}
              dot
              strokeWidth={2}
            />
          ))}
        <Tooltip />

        {ZenlyticLegend({
          margin,
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}

NewMultiLinePlot.propTypes = {};

export default NewMultiLinePlot;
