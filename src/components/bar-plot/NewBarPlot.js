/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Area, AreaChart, Bar, BarChart, Cell, ComposedChart, ResponsiveContainer } from 'recharts';
import { AXIS_TYPES } from '../../constants/plotConstants';

import {
  getData,
  getMargin,
  getSeriesFillColor,
  getSeriesStrokeColor,
  getXAxis,
  getXAxisKey,
  getYAxis,
  getYAxisDataKey,
  getYAxisName,
} from '../../utils/plotConfigGetters';
import GridLines from '../shared/grid-lines/GridLines';
import XAxis from '../shared/x-axis/XAxis';
import YAxis from '../shared/y-axis/YAxis';

function NewBarPlot({ plotConfig = {} }) {
  const xAxisType = AXIS_TYPES.CATEGORY;
  const yAxisType = AXIS_TYPES.NUMBER;

  const xAxisConfig = getXAxis(plotConfig, xAxisType);
  const yAxisConfig = getYAxis(plotConfig, yAxisType);
  const yAxisKey = getYAxisDataKey(plotConfig, yAxisType);
  const xAxisKey = getXAxisKey(plotConfig, xAxisType);
  const yAxisName = getYAxisName(plotConfig, yAxisType);

  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);

  const seriesFillColor = getSeriesFillColor(plotConfig);
  console.log(
    '🚀 ~ file: NewBarPlot.js ~ linef 37 ~ NewBarPlot ~ serisesFillColor',
    seriesFillColor
  );
  const seriesStrokeColor = getSeriesStrokeColor(plotConfig);

  return (
    <ResponsiveContainer>
      <BarChart data={data} margin={margin}>
        {GridLines()}
        {XAxis({
          ...xAxisConfig,
        })}
        {YAxis({ ...yAxisConfig })}

        <Bar dataKey={yAxisKey} fill={seriesFillColor}>
          {data.map((entry, index) => {
            return (
              <Cell
                key={`cell-${index}`}
                fill={entry.fill || seriesFillColor}
                stroke={entry.stroke || seriesStrokeColor}
              />
            );
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

NewBarPlot.propTypes = {};

export default NewBarPlot;
