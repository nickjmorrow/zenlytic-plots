/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Bar, BarChart } from 'recharts';
import { PLOT_COLORS, PLOT_SECONDARY_COLORS } from '../../constants/plotConstants';

import {
  getCategoriesOfCategoryAxis,
  getData,
  getIsDataPivoted,
  getMargin,
  getSeriesFillColor,
  getSeriesStrokeColor,
  getYAxis,
} from '../../utils/plotConfigGetters';
import GeneralChartComponents from '../general-chart-components/GeneralChartComponents';
import PlotContainer from '../plot-container/PlotContainer';

function PivotedFunnelBarPlot({ plotConfig }) {
  const categoriesOfCategoryAxis = getCategoriesOfCategoryAxis(plotConfig);
  return categoriesOfCategoryAxis.map((category, index) => {
    const { name: categoryName } = category;
    const convertedDataKey = `CONVERTED_${categoryName}`;
    const droppedOffDataKey = `DROPPED_OFF_${categoryName}`;
    return (
      <>
        <Bar
          stackId={categoryName}
          dataKey={convertedDataKey}
          name={`Converted - ${categoryName}`}
          stroke={PLOT_COLORS[index % PLOT_COLORS.length]}
          fill={PLOT_COLORS[index % PLOT_COLORS.length]}
        />
        <Bar
          stackId={categoryName}
          dataKey={droppedOffDataKey}
          name={`Dropped Off - ${categoryName}`}
          stroke={PLOT_SECONDARY_COLORS[index % PLOT_SECONDARY_COLORS.length]}
          fill={PLOT_SECONDARY_COLORS[index % PLOT_SECONDARY_COLORS.length]}
        />
      </>
    );
  });
}

function NonPivotedFunnelBarPlot({ plotConfig }) {
  const seriesStrokeColor = getSeriesStrokeColor(plotConfig);
  const seriesFillColor = getSeriesFillColor(plotConfig);
  return (
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
  );
}

function FunnelBarPlot({ plotConfig = {}, tooltipContent = false }) {
  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);

  const yAxisConfig = getYAxis(plotConfig);

  const isDataPivoted = getIsDataPivoted(plotConfig);

  return (
    <PlotContainer>
      <BarChart data={data} margin={margin} barGap={6}>
        {GeneralChartComponents({
          plotConfig,
          yAxisConfig: { ...yAxisConfig, dataKey: undefined },
          tooltipContent,
        })}
        {isDataPivoted && PivotedFunnelBarPlot({ plotConfig })}
        {!isDataPivoted && NonPivotedFunnelBarPlot({ plotConfig })}
      </BarChart>
    </PlotContainer>
  );
}

FunnelBarPlot.propTypes = {};

export default FunnelBarPlot;
