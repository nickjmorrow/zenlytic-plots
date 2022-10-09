/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { PLOT_COLORS, PLOT_SECONDARY_COLORS } from '../../constants/plotConstants';

import {
  getData,
  getMargin,
  getSeriesStrokeColor,
  getXAxis,
  getYAxis,
  getYAxisDataKey,
} from '../../utils/plotConfigGetters';
import GeneralChartComponents from '../general-chart-components/GeneralChartComponents';
import PlotContainer from '../plot-container/PlotContainer';
import GridLines from '../shared/grid-lines/GridLines';
import XAxis from '../shared/x-axis/XAxis';
import YAxis from '../shared/y-axis/YAxis';

const TIME_COMPARISON_DATA_KEY = '__TIME_COMPARISON';
const CURRENT_TIME_COMPARISON = 'Current';
const PREVIOUS_TIME_COMPARISON = 'Previous';

function NewWaterfallPlot({ plotConfig = {}, tooltipContent = false }) {
  const yAxisDataKey = getYAxisDataKey(plotConfig);

  const data = getData(plotConfig);
  console.log('🚀 ~ file: NewWaterfallPlot.js ~ line 38 ~ NewWaterfallPlot ~ data', data);
  const margin = getMargin(plotConfig);

  return (
    <PlotContainer>
      <BarChart data={data} margin={margin}>
        {GeneralChartComponents({ plotConfig, tooltipContent })}
        <Bar dataKey={yAxisDataKey}>
          <LabelList dataKey="yAxisDataKey" />
          {data.map((item, index) => {
            return (
              <Cell
                key={index}
                fill={PLOT_SECONDARY_COLORS[index % PLOT_SECONDARY_COLORS.length]}
                stroke={PLOT_COLORS[index % PLOT_COLORS.length]}
                strokeWidth={2}
              />
            );
          })}
        </Bar>
      </BarChart>
    </PlotContainer>
  );
}

NewWaterfallPlot.propTypes = {};

export default NewWaterfallPlot;
