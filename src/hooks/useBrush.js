import { useState } from 'react';

export const BRUSH_DIRECTIONS = {
  BOTH: 'both',
  HORIZONTAL: 'horizontal',
};

function useBrush(params) {
  const {
    initialState = {
      x1: null,
      x2: null,
      y1: null,
      y2: null,
      isBrushing: false,
      xDataKey: null,
      yDataKey: null,
    },
    brushType = 'category',
    brushDirection = 'horizontal',
    onBrushUpdate = () => {},
    tooltipHandlers = {},
    tooltip = {},
    xAxisDataKey,
    xAxisFormat,
    yAxisDataKey,
    yAxisFormat,
  } = params || {};

  const { updateTooltipCoords = () => {}, updateIsFollowUpMenuOpen = () => {} } = tooltipHandlers;
  const { isFollowUpMenuOpen = false } = tooltip;

  const [state, setState] = useState(initialState);
  console.log('🚀 ~ file: useBrush.js ~ line 34 ~ useBrush ~ state', state);

  const getHorizontalEventValue = (e) => {
    if (brushType === 'number') {
      return e?.activeCoordinate?.x;
    }
    return e?.activeLabel;
  };

  const updateBrush = (brush) => {
    const { x1, x2, y1, y2, isBrushing } = brush;
    setState({ x1, x2, y1, y2, isBrushing });
  };

  const onMouseDown = (e) => {
    if (isFollowUpMenuOpen) return; // If the follow up menu is open, don't allow the brush to start
    if (brushDirection === BRUSH_DIRECTIONS.BOTH) {
      updateBrush({ x1: e?.xValue, x2: e?.xValue, y1: e?.yValue, y2: e?.yValue, isBrushing: true });
      return;
    }
    // Set both brush ends to the same value where the user clicked
    updateBrush({
      x1: getHorizontalEventValue(e),
      x2: getHorizontalEventValue(e),
      isBrushing: true,
    });
  };

  const onMouseMove = (e) => {
    if (isFollowUpMenuOpen) return; // If the follow up menu is open, don't allow the brush to start
    if (!state.isBrushing) return; // User is not brushing, so don't update the brush
    if (!state.x1 || (brushDirection === BRUSH_DIRECTIONS.BOTH && !state.y1)) return; // User moved their brushing cursor outside of the chart, so don't update the brush
    if (brushDirection === BRUSH_DIRECTIONS.BOTH && e?.xValue && e?.yValue) {
      updateBrush({
        x1: state.x1,
        x2: e?.xValue,
        y1: state.y1,
        y2: e?.yValue,
        isBrushing: true,
      });
      console.log('pull the trigger');
      console.log('🚀 ~ file: useBrush.js ~ line 76 ~ onMouseMove ~ e', e);
      updateTooltipCoords({ x: e?.chartX, y: e?.chartY });
      return;
    }
    if (getHorizontalEventValue(e)) {
      console.log('🚀 ~ file: useBrush.js ~ line 80 ~ onMouseMove ~ e', e);
      updateBrush({ x1: state.x1, x2: getHorizontalEventValue(e), isBrushing: true });
      console.log('whats a couple');

      updateTooltipCoords(e?.activeCoordinate);
    }
  };

  const onMouseUp = (e) => {
    if (!state.isBrushing) return; // User is not brushing, so don't update the brush
    if (isFollowUpMenuOpen) return; // If the follow up menu is open, don't update the brush
    updateBrush({ ...state, isBrushing: false }); // User is done brushing, so set isBrushing to false
    updateIsFollowUpMenuOpen(true); // Open the follow up menu
    // The user either clicked or dragged the brush off the plot, so invalidate the brush
    if (state.x1 === state.x2 || state.x2 === null) {
      updateBrush({ x1: null, x2: null, y1: null, y2: null, isBrushing: false });
      updateIsFollowUpMenuOpen(false);
      updateTooltipCoords(null);
      return;
    }
    onBrushUpdate({
      x1: state.x1,
      x2: state.x2,
      y1: state.y1,
      y2: state.y2,
      xAxisDataKey,
      xAxisFormat,
      yAxisDataKey,
      yAxisFormat,
    });
  };

  return [
    state,
    {
      updateBrush,
      onMouseDown,
      onMouseUp,
      onMouseMove,
    },
  ];
}

export default useBrush;
