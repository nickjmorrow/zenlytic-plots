import { useState } from 'react';

function useBrush(params) {
  const {
    initialState = { x1: null, x2: null, isBrushing: false },
    brushType = 'category',
    onBrushUpdate = () => {},
  } = params || {};
  const [state, setState] = useState(initialState);

  const getEventValue = (e) => {
    if (brushType === 'number') {
      return e?.activeCoordinate?.x;
    }
    return e?.activeLabel;
  };

  const onMouseDown = (e) => {
    if (getEventValue(e)) {
      setState({ x1: getEventValue(e), x2: getEventValue(e), isBrushing: true });
    }
  };

  const onMouseMove = (e) => {
    if (state.isBrushing && getEventValue(e)) {
      setState({ x1: state.x1, x2: getEventValue(e), isBrushing: state.isBrushing });
    }
  };

  const onMouseUp = (e) => {
    if (state.isBrushing) {
      setState({ x1: state.x1, x2: state.x2, isBrushing: false });
      onBrushUpdate({ start: state.x1, end: state.x2 });
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
