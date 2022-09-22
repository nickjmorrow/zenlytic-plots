/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { ResponsiveContainer, Scatter, ScatterChart, ZAxis } from 'recharts';

import {
  getCategoryAxis,
  getData,
  getMargin,
  getSeriesStrokeColor,
  getXAxis,
  getYAxis,
} from '../../utils/plotConfigGetters';
import GridLines from '../shared/grid-lines/GridLines';
import XAxis from '../shared/x-axis/XAxis';
import YAxis from '../shared/y-axis/YAxis';

function NewScatterPlot({ plotConfig = {} }) {
  const xAxisConfig = getXAxis(plotConfig);
  const yAxisConfig = getYAxis(plotConfig);
  const categoryAxisConfig = getCategoryAxis(plotConfig);

  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);

  const seriesStrokeColor = getSeriesStrokeColor(plotConfig);

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
