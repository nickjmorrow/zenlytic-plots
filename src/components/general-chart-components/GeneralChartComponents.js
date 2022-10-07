/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import GridLines from '../shared/grid-lines/GridLines';
import XAxis from '../shared/x-axis/XAxis';
import YAxis from '../shared/y-axis/YAxis';
import ZenlyticLegend from '../zenlytic-legend/ZenlyticLegend';
import Brush from '../shared/brush/Brush';
import Tooltip from '../shared/tooltip/Tooltip';
import ZAxis from '../shared/z-axis/ZAxis';
import { getMargin, getXAxis, getYAxis, getZAxis } from '../../utils/plotConfigGetters';

function GeneralChartComponents({
  plotConfig = {},
  xAxisConfig = getXAxis(plotConfig),
  yAxisConfig = getYAxis(plotConfig),
  zAxisConfig = getZAxis(plotConfig),
  useLegend = false,
  useGridLines = true,
  margin = getMargin(plotConfig),
  brush = {},
  tooltipContent = false,
  legendConfig = {},
  customLabelFormatter = null,
}) {
  return (
    <>
      {XAxis({ ...xAxisConfig })}
      {YAxis({ ...yAxisConfig })}
      {ZAxis({ ...zAxisConfig })}
      {useGridLines && GridLines({})}
      {useLegend &&
        ZenlyticLegend({
          margin,
          ...legendConfig,
        })}
      {Brush({ ...brush })}
      {Tooltip({
        plotConfig,
        xAxisConfig,
        yAxisConfig,
        zAxisConfig,
        tooltipContent,
        customLabelFormatter,
      })}
    </>
  );
}

GeneralChartComponents.propTypes = {};

export default GeneralChartComponents;
