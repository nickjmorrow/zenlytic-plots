/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Line, LineChart } from 'recharts';
import useBrush from '../../hooks/useBrush';

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

function NewLinePlot({ plotConfig = {}, onBrushUpdate = () => {} }) {
  const xAxisConfig = getXAxis(plotConfig);
  const yAxisConfig = getYAxis(plotConfig);
  const yAxisDataKey = getYAxisDataKey(plotConfig);

  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);

  const seriesStrokeColor = getSeriesStrokeColor(plotConfig);

  const [brush, brushEvents] = useBrush({ onBrushUpdate });

  return (
    <PlotContainer>
      <LineChart data={data} margin={margin} {...brushEvents}>
        {GeneralChartComponents({ xAxisConfig, yAxisConfig, brush })}
        <Line
          type="monotone"
          dataKey={yAxisDataKey}
          stroke={seriesStrokeColor}
          dot
          strokeWidth={2}
        />
      </LineChart>
    </PlotContainer>
  );
}

NewLinePlot.propTypes = {};

export default NewLinePlot;
