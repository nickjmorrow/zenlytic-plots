/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/require-default-props */
import { curveMonotoneX } from '@visx/curve';
import { AreaClosed } from '@visx/shape';
import { LinearGradient } from '@visx/gradient';

import PropTypes from 'prop-types';
import React from 'react';

import Line from './components/line/Line';
import getLineColor from '../../util/getLineColor';

function Lines({
  lines = [[]],
  xScale,
  yScale,
  getXValue,
  getYValue,
  plotColor,
  categoryDataIndex,
  colorScale,
  onLineHover,
  onLineLeaveHover,
  curve,
}) {
  return lines?.map((line) => (
    <Line
      line={line}
      xScale={xScale}
      yScale={yScale}
      curve={curve}
      getXValue={getXValue}
      getYValue={getYValue}
      lineColor={getLineColor(line, categoryDataIndex, colorScale, plotColor)}
      onLineHover={onLineHover}
      onLineLeaveHover={onLineLeaveHover}
    />
  ));
}

export default Lines;

Lines.propTypes = {
  /**
   * Each line is an array of points to draw on the plot.
   */
  lines: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  getXValue: PropTypes.func,
  getYValue: PropTypes.func,
  plotColor: PropTypes.string,
  //   xScale: ScaleType,
  //   yScale: ScaleType,
};
