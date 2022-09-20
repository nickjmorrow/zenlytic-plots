/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Bar, BarChart, Cell, ResponsiveContainer } from 'recharts';
import { AXIS_TYPES } from '../../constants/plotConstants';

import {
  getData,
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

function NewGroupedBar({ plotConfig = {} }) {
  const xAxisConfig = getXAxis(plotConfig);
  const yAxisConfig = getYAxis(plotConfig);
  const yAxisDataKey = getYAxisDataKey(plotConfig);

  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);

  const seriesFillColor = getSeriesFillColor(plotConfig);
  const seriesStrokeColor = getSeriesStrokeColor(plotConfig);

  return (
    <ResponsiveContainer>
      <BarChart data={data} margin={margin}>
        {GridLines()}
        {XAxis({
          ...xAxisConfig,
        })}
        {YAxis({ ...yAxisConfig })}

        <Bar dataKey={yAxisDataKey} fill={seriesFillColor}>
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

NewGroupedBar.propTypes = {};

export default NewGroupedBar;
