/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Line, LineChart, ResponsiveContainer, Scatter, ScatterChart, ZAxis } from 'recharts';
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

function NewScatterPlot({ plotConfig = {} }) {
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
      <ScatterChart margin={margin}>
        {GridLines()}
        {YAxis({ ...yAxisConfig })}
        {XAxis({
          ...xAxisConfig,
        })}
        {ZAxis({ ...categoryAxisConfig })}
        <Scatter data={data} fill={seriesStrokeColor} />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

NewScatterPlot.propTypes = {};

export default NewScatterPlot;
