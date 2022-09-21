/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';
import { PLOT_COLORS, PLOT_SECONDARY_COLORS } from '../../constants/plotConstants';

import {
  getCategoryAxis,
  getCategoryValues,
  getData,
  getMargin,
} from '../../utils/plotConfigGetters';
import GridLines from '../shared/grid-lines/GridLines';
import XAxis from '../shared/x-axis/XAxis';
import YAxis from '../shared/y-axis/YAxis';

function NewGroupedBar({ plotConfig = {} }) {
  const categoryAxisConfig = getCategoryAxis(plotConfig);
  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);
  const categoryValues = getCategoryValues(plotConfig);
  if (!categoryValues || !categoryAxisConfig) return false;

  return (
    <ResponsiveContainer>
      <BarChart data={data} margin={margin}>
        {GridLines()}
        {YAxis({})}
        {XAxis({
          ...categoryAxisConfig,
        })}
        {categoryValues.map((categoryValue, index) => (
          <Bar
            dataKey={categoryValue.dataKey}
            fill={PLOT_SECONDARY_COLORS[index % PLOT_SECONDARY_COLORS.length]}
            stroke={PLOT_COLORS[index % PLOT_COLORS.length]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

NewGroupedBar.propTypes = {};

export default NewGroupedBar;
