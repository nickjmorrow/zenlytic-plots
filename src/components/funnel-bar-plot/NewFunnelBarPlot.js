/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useCallback } from 'react';
import { Bar, BarChart } from 'recharts';
import { PLOT_COLORS, PLOT_SECONDARY_COLORS } from '../../constants/plotConstants';
import useTooltip from '../../hooks/useTooltip';

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

function NonPivotedFunnelBarPlot({ plotConfig, updateHoveredItemId, hoveredItemId }) {
  const seriesStrokeColor = getSeriesStrokeColor(plotConfig);
  const seriesFillColor = getSeriesFillColor(plotConfig);
  return (
    <>
      <Bar
        id="CONVERTED"
        name={'Converted'}
        dataKey={'CONVERTED'}
        fill={seriesStrokeColor}
        stackId="a"
        radius={[3, 3, 0, 0]}
        onMouseOver={() => updateHoveredItemId('CONVERTED')}
        onMouseLeave={() => updateHoveredItemId(null)}
      />
      <Bar
        id="DROPPED_OFF"
        name={'Dropped Off'}
        dataKey={'DROPPED_OFF'}
        fill={seriesFillColor}
        stackId="a"
        radius={[3, 3, 0, 0]}
        onMouseOver={() => updateHoveredItemId('DROPPED_OFF')}
        onMouseLeave={() => updateHoveredItemId(null)}
      />
    </>
  );
}

function FunnelBarPlot({ plotConfig = {}, TooltipContent = false }) {
  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);

  const yAxisConfig = getYAxis(plotConfig);

  const isDataPivoted = getIsDataPivoted(plotConfig);

  const [tooltip, tooltipHandlers] = useTooltip();
  const { isFollowUpMenuOpen } = tooltip;

  const { updateHoveredItemId, updateClickedItemId } = tooltipHandlers || {};
  const { hoveredItemId = null, clickedItemId = null } = tooltip || {};

  return (
    <PlotContainer>
      <BarChart data={data} margin={margin} barGap={6}>
        {GeneralChartComponents({
          plotConfig,
          yAxisConfig: { ...yAxisConfig, dataKey: undefined },
          TooltipContent,
          tooltipHandlers,
          tooltip,
        })}
        {isDataPivoted && PivotedFunnelBarPlot({ plotConfig })}
        {!isDataPivoted &&
          NonPivotedFunnelBarPlot({
            plotConfig,
            updateHoveredItemId,
            hoveredItemId,
          })}
      </BarChart>
    </PlotContainer>
  );
}

FunnelBarPlot.propTypes = {};

export default FunnelBarPlot;
