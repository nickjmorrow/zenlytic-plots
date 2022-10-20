import { useState } from 'react';

function useTooltip(params) {
  const {
    initialState = {
      tooltipCoords: null,
      isFollowUpMenuOpen: false,
      hoveredItemId: null,
      clickedItemId: null,
      useOutsideClickHandler: true,
    },
  } = params || {};
  const [state, setState] = useState(initialState);

  const updateHoveredItemId = (hoveredItemId) => {
    setState({ ...state, hoveredItemId });
  };

  const updateTooltipCoords = (tooltipCoords) => {
    setState({ ...state, tooltipCoords });
  };

  const updateIsFollowUpMenuOpen = (isOpen) => {
    setState({ ...state, isFollowUpMenuOpen: isOpen });
  };

  const updateClickedItemId = (clickedItemId, tooltipCoords) => {
    if (!clickedItemId) {
      setState({ ...state, clickedItemId, isFollowUpMenuOpen: false, tooltipCoords });
      return;
    }
    setState({ ...state, clickedItemId, isFollowUpMenuOpen: true, tooltipCoords });
  };

  return [
    state,
    { updateTooltipCoords, updateIsFollowUpMenuOpen, updateHoveredItemId, updateClickedItemId },
  ];
}

export default useTooltip;
