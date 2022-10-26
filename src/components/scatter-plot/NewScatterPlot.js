/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Scatter, ScatterChart } from 'recharts';
import useBrush, { BRUSH_DIRECTIONS } from '../../hooks/useBrush';
import useTooltip from '../../hooks/useTooltip';

import {
  getAxisFormat,
  getData,
  getMargin,
  getSeriesStrokeColor,
  getXAxisDataKey,
  getYAxisDataKey,
} from '../../utils/plotConfigGetters';
import GeneralChartComponents from '../general-chart-components/GeneralChartComponents';
import PlotContainer from '../plot-container/PlotContainer';

function NewScatterPlot({ plotConfig = {}, onBrushUpdate = () => {}, TooltipContent = false }) {
  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);
  const seriesStrokeColor = getSeriesStrokeColor(plotConfig);

  const xAxisDataKey = getXAxisDataKey(plotConfig);
  const xAxisFormat = getAxisFormat(plotConfig, xAxisDataKey);

  const yAxisDataKey = getYAxisDataKey(plotConfig);
  const yAxisFormat = getAxisFormat(plotConfig, yAxisDataKey);

  const [tooltip, tooltipHandlers] = useTooltip();
  const [brush, brushEvents] = useBrush({
    onBrushUpdate,
    brushDirection: BRUSH_DIRECTIONS.BOTH,
    tooltipHandlers,
    tooltip,
    xAxisDataKey,
    xAxisFormat,
    yAxisDataKey,
    yAxisFormat,
  });

  return (
    <PlotContainer>
      <ScatterChart margin={margin} {...brushEvents}>
        {GeneralChartComponents({
          plotConfig,
          brush,
          brushEvents,
          TooltipContent,
          tooltipHandlers,
          tooltip,
        })}
        <Scatter data={data} fill={seriesStrokeColor} />
      </ScatterChart>
    </PlotContainer>
  );
}

NewScatterPlot.propTypes = {};

export default NewScatterPlot;
