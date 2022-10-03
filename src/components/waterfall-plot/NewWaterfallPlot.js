/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Bar, BarChart, Cell, Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';

import {
  getData,
  getMargin,
  getSeriesStrokeColor,
  getXAxis,
  getYAxis,
  getYAxisDataKey,
} from '../../utils/plotConfigGetters';
import GridLines from '../shared/grid-lines/GridLines';
import XAxis from '../shared/x-axis/XAxis';
import YAxis from '../shared/y-axis/YAxis';

const TIME_COMPARISON_DATA_KEY = '__TIME_COMPARISON';
const CURRENT_TIME_COMPARISON = 'Current';
const PREVIOUS_TIME_COMPARISON = 'Previous';

function NewWaterfallPlot({ plotConfig = {} }) {
  const xAxisConfig = getXAxis(plotConfig);
  const yAxisConfig = getYAxis(plotConfig);
  const yAxisDataKey = getYAxisDataKey(plotConfig);

  const data = getData(plotConfig);
  console.log('🚀 ~ file: NewWaterfallPlot.js ~ line 24 ~ NewWaterfallPlot ~ data', data);
  const margin = getMargin(plotConfig);

  const seriesStrokeColor = getSeriesStrokeColor(plotConfig);

  return (
    <ResponsiveContainer>
      <BarChart data={data} margin={margin}>
        {GridLines()}
        {YAxis({ ...yAxisConfig })}
        {XAxis({ ...xAxisConfig })}
        <Tooltip />
        <Bar dataKey={yAxisDataKey} />
        {/* <Bar dataKey="__START" stackId="a" fill="transparent" />
        <Bar dataKey="__END" stackId="a" radius={2}>
          {data.map((item, index) => {
            return <Cell key={index} strokeWidth={2} />;
          })}
        </Bar> */}
        {/* {data.map((bar) => {
          const { name, data: barData = [] } = bar;
          const currentPeriodValue = barData.find(
            (bd) => bd[TIME_COMPARISON_DATA_KEY] === CURRENT_TIME_COMPARISON
          );
          const previousPeriodValue = barData.find(
            (bd) => bd[TIME_COMPARISON_DATA_KEY] === CURRENT_TIME_COMPARISON
          );
          <Bar dataKey="startValue" stackId="a" fill="transparent" />;
        })} */}
      </BarChart>
    </ResponsiveContainer>
  );
}

NewWaterfallPlot.propTypes = {};

export default NewWaterfallPlot;
