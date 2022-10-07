/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Scatter, ScatterChart } from 'recharts';
import useBrush, { BRUSH_DIRECTIONS } from '../../hooks/useBrush';

import { getData, getMargin, getSeriesStrokeColor } from '../../utils/plotConfigGetters';
import GeneralChartComponents from '../general-chart-components/GeneralChartComponents';
import PlotContainer from '../plot-container/PlotContainer';

function NewScatterPlot({ plotConfig = {}, onBrushUpdate = () => {}, tooltipContent = false }) {
  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);
  const seriesStrokeColor = getSeriesStrokeColor(plotConfig);

  const [brush, brushEvents] = useBrush({ onBrushUpdate, brushDirection: BRUSH_DIRECTIONS.BOTH });

  return (
    <PlotContainer>
      <ScatterChart margin={margin} {...brushEvents}>
        {GeneralChartComponents({
          plotConfig,
          brush,
          tooltipContent,
        })}
        <Scatter data={data} fill={seriesStrokeColor} />
      </ScatterChart>
    </PlotContainer>
  );
}

NewScatterPlot.propTypes = {};

export default NewScatterPlot;
