import { useState } from 'react';

export const BRUSH_DIRECTIONS = {
  BOTH: 'both',
  HORIZONTAL: 'horizontal',
};

function useBrush(params) {
  const {
    initialState = { x1: null, x2: null, y1: null, y2: null, isBrushing: false },
    brushType = 'category',
    brushDirection = 'horizontal',
    onBrushUpdate = () => {},
  } = params || {};
  const [state, setState] = useState(initialState);

  const getHorizontalEventValue = (e) => {
    if (brushType === 'number') {
      return e?.activeCoordinate?.x;
    }
    return e?.activeLabel;
  };

  const onMouseDown = (e) => {
    if (brushDirection === BRUSH_DIRECTIONS.BOTH) {
      if (e?.xValue && e?.yValue) {
        setState({ x1: e?.xValue, x2: e?.xValue, y1: e?.yValue, y2: e?.yValue, isBrushing: true });
      }
    }
    if (getHorizontalEventValue(e)) {
      setState({
        x1: getHorizontalEventValue(e),
        x2: getHorizontalEventValue(e),
        isBrushing: true,
      });
    }
  };

  const onMouseMove = (e) => {
    if (!state.isBrushing) return;
    if (brushDirection === BRUSH_DIRECTIONS.BOTH && e?.xValue && e?.yValue) {
      setState({
        x1: state.x1,
        x2: e?.xValue,
        y1: state.y1,
        y2: e?.yValue,
        isBrushing: state.isBrushing,
      });
    }
    if (getHorizontalEventValue(e)) {
      setState({ x1: state.x1, x2: getHorizontalEventValue(e), isBrushing: state.isBrushing });
    }
  };

  const onMouseUp = (e) => {
    if (state.isBrushing) {
      setState({ x1: state.x1, x2: state.x2, y1: state.y1, y2: state.y2, isBrushing: false });
      onBrushUpdate({ x1: state.x1, x2: state.x2, y1: state.y1, y2: state.y2 });
    }
  };

  return [
    state,
    {
      onMouseDown,
      onMouseUp,
      onMouseMove,
    },
  ];
}

export default useBrush;
