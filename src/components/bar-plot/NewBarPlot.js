/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Bar, BarChart, Cell, ResponsiveContainer } from 'recharts';
import { PLOT_COLORS, PLOT_SECONDARY_COLORS } from '../../constants/plotConstants';

import {
  getCategoryAxis,
  getCategoryValues,
  getData,
  getMargin,
  getSeriesFillColor,
  getSeriesIsStacked,
  getSeriesStrokeColor,
  getXAxis,
  getYAxis,
  getYAxisDataKey,
} from '../../utils/plotConfigGetters';
import GridLines from '../shared/grid-lines/GridLines';
import XAxis from '../shared/x-axis/XAxis';
import YAxis from '../shared/y-axis/YAxis';

function NewBarPlot({ plotConfig = {} }) {
  const xAxisConfig = getXAxis(plotConfig);
  const yAxisConfig = getYAxis(plotConfig);
  const categoryAxisConfig = getCategoryAxis(plotConfig);

  const yAxisDataKey = getYAxisDataKey(plotConfig);

  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);

  const seriesFillColor = getSeriesFillColor(plotConfig);
  const seriesStrokeColor = getSeriesStrokeColor(plotConfig);
  const seriesIsStacked = getSeriesIsStacked(plotConfig);
  const stackId = seriesIsStacked ? 'a' : undefined;

  const categoryValues = getCategoryValues(plotConfig);
  if (!categoryValues || !categoryAxisConfig) return false;

  return (
    <ResponsiveContainer>
      <BarChart data={data} margin={margin}>
        {GridLines()}
        {XAxis({
          ...categoryAxisConfig,
        })}
        {YAxis({})}
        {categoryValues.map((categoryValue, index) => (
          <Bar
            dataKey={categoryValue.dataKey}
            fill={PLOT_SECONDARY_COLORS[index % PLOT_SECONDARY_COLORS.length]}
            stroke={PLOT_COLORS[index % PLOT_COLORS.length]}
            stackId={stackId}
          />
        ))}
        {/* <Bar dataKey={yAxisDataKey} fill={seriesFillColor}>
          {data.map((entry, index) => {
            return (
              <Cell
                key={`cell-${index}`}
                fill={entry.fill || seriesFillColor}
                stroke={entry.stroke || seriesStrokeColor}
              />
            );
          })}
        </Bar> */}
      </BarChart>
    </ResponsiveContainer>
  );
}

NewBarPlot.propTypes = {};

export default NewBarPlot;
