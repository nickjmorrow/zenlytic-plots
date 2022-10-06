/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import GridLines from '../shared/grid-lines/GridLines';
import XAxis from '../shared/x-axis/XAxis';
import YAxis from '../shared/y-axis/YAxis';
import ZenlyticLegend from '../zenlytic-legend/ZenlyticLegend';
import Brush from '../shared/brush/Brush';

function GeneralChartComponents({
  xAxisConfig = {},
  yAxisConfig = {},
  useLegend = false,
  useGridLines = true,
  margin = {},
  brush = {},
}) {
  return (
    <>
      {XAxis({ ...xAxisConfig })}
      {YAxis({ ...yAxisConfig })}
      {useGridLines && GridLines({})}
      {useLegend &&
        ZenlyticLegend({
          margin,
        })}
      {Brush({ ...brush })}
    </>
  );
}

GeneralChartComponents.propTypes = {};

export default GeneralChartComponents;
