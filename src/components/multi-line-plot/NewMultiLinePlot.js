/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Line, LineChart } from 'recharts';
import { PLOT_COLORS, PLOT_SECONDARY_COLORS } from '../../constants/plotConstants';

import {
  getCategoryValueAxes,
  getData,
  getIsDataPivoted,
  getMargin,
  getXAxis,
  getYAxisDataKey,
} from '../../utils/plotConfigGetters';
import GeneralChartComponents from '../general-chart-components/GeneralChartComponents';
import PlotContainer from '../plot-container/PlotContainer';

function PivotedMultiLinePlot({ plotConfig }) {
  const yAxisDataKey = getYAxisDataKey(plotConfig);
  const data = getData(plotConfig);
  return data.map((series, index) => {
    return (
      <Line
        dot
        data={series.data}
        stroke={PLOT_COLORS[index % PLOT_COLORS.length]}
        dataKey={yAxisDataKey}
        type="monotone"
        strokeWidth={2}
        name={series.name}
        key={series.name}
      />
    );
  });
}

function NonPivotedMultiLinePlot({ plotConfig }) {
  const categoryValueAxes = getCategoryValueAxes(plotConfig);
  return categoryValueAxes.map((axis, index) => (
    <Line
      type="monotone"
      dataKey={axis.dataKey}
      name={axis.name}
      key={axis.name}
      fill={PLOT_SECONDARY_COLORS[index % PLOT_SECONDARY_COLORS.length]}
      stroke={PLOT_COLORS[index % PLOT_COLORS.length]}
      dot
      strokeWidth={2}
    />
  ));
}

function NewMultiLinePlot({ plotConfig = {} }) {
  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);
  const isDataPivoted = getIsDataPivoted(plotConfig);
  const xAxisConfig = getXAxis(plotConfig);

  return (
    <PlotContainer>
      <LineChart data={data} margin={margin}>
        {GeneralChartComponents({ xAxisConfig, useLegend: true, margin })}
        {isDataPivoted && PivotedMultiLinePlot({ plotConfig })}
        {isDataPivoted && NonPivotedMultiLinePlot({ plotConfig })}
      </LineChart>
    </PlotContainer>
  );
}

NewMultiLinePlot.propTypes = {};

export default NewMultiLinePlot;
