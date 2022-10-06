/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Bar, BarChart, Cell, ResponsiveContainer } from 'recharts';
import { PLOT_COLORS, PLOT_SECONDARY_COLORS } from '../../constants/plotConstants';

import {
  getCategoryAxis,
  getCategoryValues,
  getData,
  getFormatter,
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

function NewHistogramPlot({ plotConfig = {} }) {
  const xAxisConfig = getXAxis(plotConfig);
  const yAxisConfig = getYAxis(plotConfig);
  const categoryAxisConfig = getCategoryAxis(plotConfig);

  const yAxisDataKey = getYAxisDataKey(plotConfig);

  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);

  const seriesFillColor = getSeriesFillColor(plotConfig);
  const seriesStrokeColor = getSeriesStrokeColor(plotConfig);
  const seriesIsStacked = getIsSeriesStacked(plotConfig);
  const stackId = seriesIsStacked ? 'a' : undefined;

  const yAxisTickFormatter = getFormatter('decimal');

  const categoryValues = getCategoryValues(plotConfig);
  // if (!categoryValues || !categoryAxisConfig) return false;

  return (
    <ResponsiveContainer>
      <BarChart data={data} margin={margin}>
        {GridLines()}
        {XAxis({
          ...xAxisConfig,
          type: 'number',
          dataKey: 'rangeBottom',
        })}
        {YAxis({
          name: 'Frequency',
          type: 'number',
          dataKey: 'value',
          tickFormatter: yAxisTickFormatter,
        })}
        <Bar dataKey={'value'} fill={seriesFillColor} stroke={seriesStrokeColor} />
      </BarChart>
    </ResponsiveContainer>
  );
}

NewHistogramPlot.propTypes = {};

export default NewHistogramPlot;
