/* eslint-disable react/jsx-filename-extension */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Tooltip as RechartsTooltip } from 'recharts';
import TooltipHandler from '../../tooltip-handler/TooltipHandler';
import formatValue from '../../../utils/formatValue';
import getD3DataFormatter from '../../../utils/getD3DataFormatter';
import { getFormatter, getTickFormatterFromDataKey } from '../../../utils/plotConfigGetters';
import OutsideClickHandler from 'react-outside-click-handler';
import { HIGHTLIGHT_BAR_COLOR } from '../../../constants/plotConstants';

// eslint-disable-next-line react/prop-types

function TooltipContentWithOutsideClickHandler(props) {
  const {
    onOutsideClick = () => {},
    TooltipContent = false,
    useOutsideClickHandler = true,
  } = props;

  if (useOutsideClickHandler) {
    return (
      <OutsideClickHandler onOutsideClick={onOutsideClick}>
        {TooltipContent(props)}
      </OutsideClickHandler>
    );
  }
  return TooltipContent(props);
}

// The tooltip payload can have a nested array in it
const getPayloadFromTooltip = (tooltipPayload, hoveredItemId, clickedItemId) => {
  console.log(
    '🚀 ~ file: Tooltip.js ~ line 33 ~ getPayloadFromTooltip ~ hoveredItemId',
    hoveredItemId
  );
  console.log(
    '🚀 ~ file: Tooltip.js ~ line 33 ~ getPayloadFromTooltip ~ tooltipPayload',
    tooltipPayload
  ); // if (!hoveredItemId && !clickedItemId) return tooltipPayload;

  if (hoveredItemId) {
    return tooltipPayload?.filter((payloadItem) => payloadItem?.id === hoveredItemId);
  }

  // if (Array.isArray(tooltipPayload?.payload)) {
  //   return tooltipPayload.payload.filter((payloadItem) => payloadItem?.id === hoveredItemId);
  // }
  return tooltipPayload;
};

function Tooltip({
  xAxisConfig = {},
  yAxisConfig = {},
  zAxisConfig = {},
  TooltipContent = () => {},
  tooltipHandlers = {},
  tooltip = {},
  plotConfig = {},
  customLabelFormatter = null,
  customValueFormatter = null,
  brushEvents = {},
}) {
  const { tickFormatter: xAxisTickFormatter } = xAxisConfig;
  const { tickFormatter: yAxisTickFormatter } = yAxisConfig;
  const { dataKey: xAxisDataKey } = xAxisConfig || {};
  const {
    tooltipCoords,
    isFollowUpMenuOpen,
    hoveredItemId,
    clickedItemId,
    useOutsideClickHandler,
  } = tooltip || {};
  const { updateBrush = () => {} } = brushEvents || {};
  const {
    updateIsFollowUpMenuOpen = () => {},
    updateClickedItemId = () => {},
    updateHoveredItemId = () => {},
  } = tooltipHandlers || {};

  const labelFormatter = useCallback(
    (value, payload) => {
      if (customLabelFormatter) {
        return customLabelFormatter(value, payload);
      }
      const formatter = getTickFormatterFromDataKey(plotConfig, xAxisDataKey);
      return formatter(value);
    },
    [plotConfig, xAxisDataKey]
  );

  const valueFormatter = useCallback(
    (value, dataKey) => {
      if (customValueFormatter) {
        return customValueFormatter(value, dataKey);
      }
      const formatter = getTickFormatterFromDataKey(plotConfig, dataKey);
      return formatter(value);
    },
    [plotConfig]
  );

  return (
    <RechartsTooltip
      wrapperStyle={isFollowUpMenuOpen ? { visibility: 'visible', zIndex: 10000 } : undefined}
      isFollowUpMenuOpen={isFollowUpMenuOpen}
      position={isFollowUpMenuOpen ? tooltipCoords : undefined}
      cursor={isFollowUpMenuOpen ? false : { fill: HIGHTLIGHT_BAR_COLOR }}
      formatter={valueFormatter}
      labelFormatter={labelFormatter}
      content={(tooltipProps) => {
        return TooltipContentWithOutsideClickHandler({
          ...tooltipProps,
          payload: getPayloadFromTooltip(tooltipProps?.payload, hoveredItemId),
          // payload: hoveredItemId
          //   ? tooltipProps?.payload?.filter((payloadItem) => payloadItem?.id === hoveredItemId)
          //   : tooltipProps?.payload,
          onOutsideClick: () => {
            updateIsFollowUpMenuOpen(false);
            updateBrush({ x1: null, x2: null, y1: null, y2: null, isBrushing: false });
            updateClickedItemId(null);
          },
          TooltipContent,
        });
      }}
    />
  );
}

Tooltip.propTypes = {};

export default Tooltip;
