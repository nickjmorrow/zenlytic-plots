/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';
import { PLOT_COLORS, PLOT_SECONDARY_COLORS } from '../../constants/plotConstants';

import {
  getCategoryAxis,
  getCategoryValueAxes,
  getCategoryValues,
  getData,
  getIsDataPivoted,
  getIsSeriesStacked,
  getMargin,
  getXAxis,
  getYAxisDataKey,
} from '../../utils/plotConfigGetters';
import GridLines from '../shared/grid-lines/GridLines';
import XAxis from '../shared/x-axis/XAxis';
import YAxis from '../shared/y-axis/YAxis';
import ZenlyticLegend from '../zenlytic-legend/ZenlyticLegend';

function NewGroupedBar({ plotConfig = {} }) {
  const xAxisConfig = getXAxis(plotConfig);
  const yAxisDataKey = getYAxisDataKey(plotConfig);

  const categoryAxisConfig = getCategoryAxis(plotConfig);
  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);
  const categoryValueAxes = getCategoryValueAxes(plotConfig);
  const isDataPivoted = getIsDataPivoted(plotConfig);
  const isSeriesStacked = getIsSeriesStacked(plotConfig);

  return (
    <ResponsiveContainer>
      <BarChart data={data} margin={margin}>
        {GridLines()}
        {YAxis({})}
        {XAxis({
          ...xAxisConfig,
        })}
        {isDataPivoted &&
          data.map((series, index) => {
            return (
              <Bar
                data={series.data}
                stroke={PLOT_COLORS[index % PLOT_COLORS.length]}
                fill={PLOT_SECONDARY_COLORS[index % PLOT_SECONDARY_COLORS.length]}
                dataKey={yAxisDataKey}
                name={series.name}
                key={series.name}
              />
            );
          })}
        {!isDataPivoted &&
          categoryValueAxes.map((axes, index) => (
            <Bar
              dataKey={axes.dataKey}
              name={axes.name}
              fill={PLOT_SECONDARY_COLORS[index % PLOT_SECONDARY_COLORS.length]}
              stroke={PLOT_COLORS[index % PLOT_COLORS.length]}
              stackId={isSeriesStacked ? 'a' : undefined}
            />
          ))}
        {ZenlyticLegend({
          margin,
        })}
      </BarChart>
    </ResponsiveContainer>
  );
}

NewGroupedBar.propTypes = {};

export default NewGroupedBar;
