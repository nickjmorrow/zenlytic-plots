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
  plotId,
  getXValue,
  getYValue,
  plotColor,
  categoryDataIndex,
  colorScale,
}) {
  const isSingleLine = lines.length === 1;
  const curve = curveMonotoneX;

  return (
    <>
      <LinearGradient
        id={`area-gradient-${plotId}`}
        from={plotColor}
        to={null}
        fromOpacity={1}
        toOpacity={0.0}
      />
      {isSingleLine && (
        <AreaClosed
          data={lines[0]}
          x={(d) => xScale(getXValue(d))}
          y={(d) => yScale(getYValue(d))}
          yScale={yScale}
          fill={`url(#area-gradient-${plotId})`}
          defined={(d) => getYValue(d) !== null}
          curve={curve}
        />
      )}
      {lines.map((line) => (
        <Line
          line={line}
          xScale={xScale}
          yScale={yScale}
          curve={curve}
          getXValue={getXValue}
          getYValue={getYValue}
          lineColor={getLineColor(line, categoryDataIndex, colorScale, plotColor)}
        />
      ))}
    </>
  );
}

export default Lines;

Lines.propTypes = {
  /**
   * Each line is an array of points to draw on the plot.
   */
  lines: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  plotId: PropTypes.string,
  getXValue: PropTypes.func,
  getYValue: PropTypes.func,
  plotColor: PropTypes.string,
  //   xScale: ScaleType,
  //   yScale: ScaleType,
};
