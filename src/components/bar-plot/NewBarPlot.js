/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';

import {
  getData,
  getMargin,
  getSeriesFillColor,
  getSeriesStrokeColor,
  getXAxisDataKey,
  getXAxisName,
  getYAxisDataKey,
  getYAxisName,
} from '../../utils/plotConfigGetters';
import GeneralChartComponents from '../general-chart-components/GeneralChartComponents';
import PlotContainer from '../plot-container/PlotContainer';

function NewBarPlot({ plotConfig = {}, tooltipContent = false }) {
  const yAxisDataKey = getYAxisDataKey(plotConfig);
  const xAxisName = getXAxisName(plotConfig);

  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);

  const seriesFillColor = getSeriesFillColor(plotConfig);
  const seriesStrokeColor = getSeriesStrokeColor(plotConfig);

  return (
    <PlotContainer>
      <BarChart data={data} margin={margin}>
        {GeneralChartComponents({ plotConfig, tooltipContent })}
        <Bar
          dataKey={yAxisDataKey}
          name={xAxisName}
          fill={seriesFillColor}
          stroke={seriesStrokeColor}
        />
      </BarChart>
    </PlotContainer>
  );
}

NewBarPlot.propTypes = {};

export default NewBarPlot;
