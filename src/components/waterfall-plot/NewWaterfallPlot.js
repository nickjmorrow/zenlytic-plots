/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useCallback } from 'react';
import { Bar, BarChart, Cell } from 'recharts';
import { PLOT_COLORS, PLOT_SECONDARY_COLORS } from '../../constants/plotConstants';
import useTooltip from '../../hooks/useTooltip';
import getItemOpacity from '../../utils/getItemOpacity';

import { getData, getMargin, getYAxisDataKey } from '../../utils/plotConfigGetters';
import GeneralChartComponents from '../general-chart-components/GeneralChartComponents';
import PlotContainer from '../plot-container/PlotContainer';

function NewWaterfallPlot({ plotConfig = {}, TooltipContent = false }) {
  const yAxisDataKey = getYAxisDataKey(plotConfig);

  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);

  const [tooltip, tooltipHandlers] = useTooltip();
  const { isFollowUpMenuOpen } = tooltip;

  const { updateHoveredItemId, updateClickedItemId } = tooltipHandlers || {};
  const { hoveredItemId = null, clickedItemId = null } = tooltip || {};

  const onPlotClick = useCallback(
    (e) => {
      updateClickedItemId(e?.activePayload?.[0]?.payload?.id, e?.activeCoordinate);
    },
    [isFollowUpMenuOpen, updateClickedItemId]
  );

  return (
    <PlotContainer>
      <BarChart
        data={data}
        margin={margin}
        onMouseMove={(e) => {
          updateHoveredItemId(e?.activePayload?.[0]?.payload?.id);
        }}
        onMouseLeave={() => {
          updateHoveredItemId(null);
        }}
        onClick={onPlotClick}>
        {GeneralChartComponents({ plotConfig, TooltipContent, tooltipHandlers, tooltip })}
        <Bar dataKey={yAxisDataKey}>
          {data.map((item, index) => {
            const itemOpacity = getItemOpacity({ id: item.id, hoveredItemId, clickedItemId });
            return (
              <Cell
                key={item.id}
                fill={PLOT_SECONDARY_COLORS[index % PLOT_SECONDARY_COLORS.length]}
                stroke={PLOT_COLORS[index % PLOT_COLORS.length]}
                fillOpacity={itemOpacity}
                strokeOpacity={itemOpacity}
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
