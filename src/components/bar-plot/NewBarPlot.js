/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Bar, BarChart, Cell, ResponsiveContainer } from 'recharts';
import { PLOT_COLORS, PLOT_SECONDARY_COLORS } from '../../constants/plotConstants';

import {
  getCategoryAxis,
  getCategoryValues,
  getData,
  getIsSeriesStacked,
  getMargin,
  getSeriesFillColor,
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

  const yAxisDataKey = getYAxisDataKey(plotConfig);

  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);

  const seriesFillColor = getSeriesFillColor(plotConfig);
  const seriesStrokeColor = getSeriesStrokeColor(plotConfig);
  const seriesIsStacked = getIsSeriesStacked(plotConfig);
  const stackId = seriesIsStacked ? 'a' : undefined;

  const categoryValues = getCategoryValues(plotConfig);
  // if (!categoryValues || !categoryAxisConfig) return false;

  return (
    <ResponsiveContainer>
      <BarChart data={data} margin={margin}>
        {GridLines()}
        {XAxis({
          ...xAxisConfig,
        })}
        {YAxis({ ...yAxisConfig })}
        <Bar dataKey={yAxisDataKey} fill={seriesFillColor} stroke={seriesStrokeColor} />
      </BarChart>
    </ResponsiveContainer>
  );
}

NewBarPlot.propTypes = {};

export default NewBarPlot;
