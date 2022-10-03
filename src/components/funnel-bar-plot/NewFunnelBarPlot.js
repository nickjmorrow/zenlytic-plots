/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip } from 'recharts';

import {
  getData,
  getMargin,
  getSeriesFillColor,
  getSeriesStrokeColor,
  getXAxis,
  getYAxis,
} from '../../utils/plotConfigGetters';
import GridLines from '../shared/grid-lines/GridLines';
import XAxis from '../shared/x-axis/XAxis';
import YAxis from '../shared/y-axis/YAxis';

function FunnelBarPlot({ plotConfig = {} }) {
  const xAxisConfig = getXAxis(plotConfig);
  const yAxisConfig = getYAxis(plotConfig);

  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);

  const seriesStrokeColor = getSeriesStrokeColor(plotConfig);
  const seriesFillColor = getSeriesFillColor(plotConfig);

  return (
    <ResponsiveContainer>
      <BarChart data={data} margin={margin}>
        {GridLines()}
        {XAxis({ ...xAxisConfig })}
        {YAxis({ ...yAxisConfig })}
        <Tooltip />
        <>
          <Bar
            name={'Converted'}
            dataKey={'CONVERTED'}
            fill={seriesStrokeColor}
            stackId="a"
            radius={[3, 3, 0, 0]}
          />
          <Bar
            name={'Dropped Off'}
            dataKey={'DROPPED_OFF'}
            fill={seriesFillColor}
            stackId="a"
            radius={[3, 3, 0, 0]}
          />
        </>
      </BarChart>
    </ResponsiveContainer>
  );
}

FunnelBarPlot.propTypes = {};

export default FunnelBarPlot;
