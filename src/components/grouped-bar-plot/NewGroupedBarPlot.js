/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Bar, BarChart } from 'recharts';
import { PLOT_COLORS, PLOT_SECONDARY_COLORS } from '../../constants/plotConstants';

import {
  getCategoryValueAxes,
  getData,
  getIsDataPivoted,
  getIsSeriesStacked,
  getMargin,
  getYAxisDataKey,
} from '../../utils/plotConfigGetters';
import GeneralChartComponents from '../general-chart-components/GeneralChartComponents';
import PlotContainer from '../plot-container/PlotContainer';

function PivotedGroupedBar({ plotConfig = {} }) {
  console.log(
    '🚀 ~ file: NewGroupedBarPlot.js ~ line 19 ~ PivotedGroupedBar ~ plotConfig',
    plotConfig
  );
  const data = getData(plotConfig);
  console.log('🚀 ~ file: NewGroupedBarPlot.js ~ line 24 ~ PivotedGroupedBar ~ data', data);
  const yAxisDataKey = getYAxisDataKey(plotConfig);
  return data.map((series, index) => {
    return (
      <Bar
        data={series.data}
        stroke={PLOT_COLORS[index % PLOT_COLORS.length]}
        fill={PLOT_SECONDARY_COLORS[index % PLOT_SECONDARY_COLORS.length]}
        dataKey={yAxisDataKey}
        name={series.name}
        key={series.name}
      />
    );
  });
}

function NonPivotedGroupedBar({ plotConfig = {} }) {
  const categoryValueAxes = getCategoryValueAxes(plotConfig);
  const isSeriesStacked = getIsSeriesStacked(plotConfig);
  return categoryValueAxes.map((axes, index) => (
    <Bar
      dataKey={axes.dataKey}
      name={axes.name}
      fill={PLOT_SECONDARY_COLORS[index % PLOT_SECONDARY_COLORS.length]}
      stroke={PLOT_COLORS[index % PLOT_COLORS.length]}
      stackId={isSeriesStacked ? 'a' : undefined}
    />
  ));
}

function NewGroupedBar({ plotConfig = {}, tooltipContent = false }) {
  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);
  const isDataPivoted = getIsDataPivoted(plotConfig);

  return (
    <PlotContainer>
      <BarChart data={data} margin={margin}>
        {GeneralChartComponents({ plotConfig, useLegend: true, yAxisConfig: {}, tooltipContent })}
        {isDataPivoted && PivotedGroupedBar({ plotConfig })}
        {!isDataPivoted && NonPivotedGroupedBar({ plotConfig })}
      </BarChart>
    </PlotContainer>
  );
}

NewGroupedBar.propTypes = {};

export default NewGroupedBar;
