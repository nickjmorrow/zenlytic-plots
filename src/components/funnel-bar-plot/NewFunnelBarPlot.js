/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Line,
  FunnelChart,
  ResponsiveContainer,
  Tooltip,
  Funnel,
  LabelList,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { PLOT_COLORS, PLOT_SECONDARY_COLORS } from '../../constants/plotConstants';

import {
  getData,
  getMargin,
  getSeriesFillColor,
  getSeriesStrokeColor,
  getUniqueValuesOfDataKey,
  getXAxis,
  getXAxisDataKey,
  getYAxis,
  getYAxisDataKey,
} from '../../utils/plotConfigGetters';
import GridLines from '../shared/grid-lines/GridLines';
import XAxis from '../shared/x-axis/XAxis';
import YAxis from '../shared/y-axis/YAxis';

function FunnelBarPlot({ plotConfig = {} }) {
  const xAxisConfig = getXAxis(plotConfig);
  const yAxisConfig = getYAxis(plotConfig);

  const xAxisDataKey = getXAxisDataKey(plotConfig);
  const yAxisDataKey = getYAxisDataKey(plotConfig);

  const data = getData(plotConfig);
  console.log('🚀 ~ file: NewFunnelBarPlot.js ~ line 28 ~ FunnelBarPlot ~ data', data);
  const margin = getMargin(plotConfig);

  const seriesStrokeColor = getSeriesStrokeColor(plotConfig);
  const seriesFillColor = getSeriesFillColor(plotConfig);

  const uniqueValuesOfXAxisKey = getUniqueValuesOfDataKey(plotConfig, xAxisDataKey);

  const getFunnelBars = () => {
    return <></>;
  };

  return (
    <ResponsiveContainer>
      <BarChart data={data} margin={margin}>
        {GridLines()}
        {XAxis({ ...xAxisConfig })}
        {YAxis({ ...yAxisConfig })}
        <Tooltip />
        {/* <Bar
          //   name={d[xAxisDataKey]}
          dataKey={yAxisDataKey}
          stroke={PLOT_COLORS[0 % PLOT_COLORS.length]}
          fill={PLOT_SECONDARY_COLORS[0 % PLOT_SECONDARY_COLORS.length]}
        /> */}
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
        {/* <Bar
          //   dataKey={axes.dataKey}
          //   name={axes.name}
          fill={'lightgreen'}
          stroke="green"
          stackId={'a'}
        /> */}
      </BarChart>
    </ResponsiveContainer>
  );
}

FunnelBarPlot.propTypes = {};

export default FunnelBarPlot;
