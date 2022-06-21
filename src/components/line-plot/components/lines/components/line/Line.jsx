/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { LinePath } from '@visx/shape';

function Line({
  line,
  xScale,
  yScale,
  curve,
  lineColor,
  getXValue,
  getYValue,
  isClickMenuOpen,
  hideTooltip,
  showTooltip,
  onLineHover,
  onLineLeaveHover,
}) {
  return (
    <LinePath
      data={line}
      x={(d) => {
        return xScale(getXValue(d));
      }}
      y={(d) => yScale(getYValue(d))}
      strokeWidth={3}
      stroke={lineColor}
      fill="none"
      defined={(d) => getYValue(d) !== null}
      curve={curve}
      onMouseLeave={() => {
        onLineLeaveHover();
      }}
      onMouseMove={(event) => {
        onLineHover(line, event);
      }}
    />
  );
}

Line.propTypes = {};

export default Line;

Line.propTypes = {
  /**
   * A collection of points that form a line
   */
  line: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  getXValue: PropTypes.func,
  getYValue: PropTypes.func,
  curve: PropTypes.string,
  //   xScale: ScaleType,
  //   yScale: ScaleType,
};
