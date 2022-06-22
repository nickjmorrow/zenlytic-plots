/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/require-default-props */
import React, { useRef } from 'react';
import { Brush as VisxBrush } from '@visx/brush';
import { PatternLines } from '@visx/pattern';
import moment from 'moment';
import { DATE_AXIS_TYPES } from 'constants/plotConstants';
import PropTypes from 'prop-types';

function Brush({
  xScale,
  yScale,
  xAxisZenlyticFormat,
  axisColor,
  margin,
  useBrush = false,
  xMax,
  yMax,
  updateBrush = () => {},
}) {
  const PATTERN_ID = 'brush_pattern';

  const currentBrushStyle = {
    fill: axisColor,
    fillOpacity: 0.3,
    stroke: '#101010',
  };

  const brushRef = useRef();

  const onBrushEnd = (domain = null) => {
    if (!domain) return;
    const { x0, x1, y1 } = domain;
    const coords = { x: xScale(x1), y: yScale(y1) };
    if (DATE_AXIS_TYPES.includes(xAxisZenlyticFormat)) {
      const start = moment(x0).utc().format();
      const end = moment(x1).utc().format();
      updateBrush({ start, end }, coords);
    } else {
      updateBrush({ start: x0, end: x1 }, coords);
    }
  };

  const getBrushInitialPosition = (brush) => {
    if (!brush) {
      return null;
    }
    return {
      start: { x: xScale(moment(brush.startDate).utc().toDate()) },
      end: { x: xScale(moment(brush.endDate).utc().toDate()) },
    };
  };

  return (
    <>
      <PatternLines
        id={PATTERN_ID}
        height={8}
        width={8}
        stroke={axisColor}
        strokeWidth={2}
        orientation={['diagonal']}
      />
      {useBrush && (
        <VisxBrush
          xScale={xScale}
          yScale={yScale}
          width={xMax}
          height={yMax}
          margin={margin}
          handleSize={8}
          innerRef={brushRef}
          brushDirection="horizontal"
          brushRegion="chart"
          resizeTriggerAreas={['left', 'right']}
          //   initialBrushPosition={getBrushInitialPosition(activeBrush)}
          onBrushEnd={(domain) => onBrushEnd(domain)}
          selectedBoxStyle={currentBrushStyle}
          useWindowMoveEvents
        />
      )}
    </>
  );
}

export default Brush;

Brush.propTypes = {
  xAxisZenlyticFormat: PropTypes.string,
  axisColor: PropTypes.string,
  margin: PropTypes.string,
  xMax: PropTypes.string,
  yMax: PropTypes.string,
  useBrush: PropTypes.bool,
  updateBrush: PropTypes.func,
  showTooltip: PropTypes.func,
  setIsClickMenuOpen: PropTypes.func,
};
