/* eslint-disable react/jsx-filename-extension */
import React from 'react';
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
  const { onOutsideClick = () => {}, TooltipContent = false } = props;
  return (
    <OutsideClickHandler onOutsideClick={onOutsideClick}>
      {TooltipContent(props)}
    </OutsideClickHandler>
  );
}

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
  const { tooltipCoords, isFollowUpMenuOpen, hoveredItemId, clickedItemId } = tooltip || {};
  const { updateBrush = () => {} } = brushEvents || {};
  const { updateIsFollowUpMenuOpen = () => {} } = tooltipHandlers || {};

  const labelFormatter = (value, payload) => {
    if (customLabelFormatter) {
      return customLabelFormatter(value, payload);
    }
    const formatter = getTickFormatterFromDataKey(plotConfig, xAxisDataKey);
    return formatter(value);
  };

  const valueFormatter = (value, dataKey) => {
    if (customValueFormatter) {
      return customValueFormatter(value, dataKey);
    }
    const formatter = getTickFormatterFromDataKey(plotConfig, dataKey);
    return formatter(value);
  };

  return (
    <RechartsTooltip
      wrapperStyle={isFollowUpMenuOpen ? { visibility: 'visible', zIndex: 10000 } : undefined}
      isFollowUpMenuOpen={isFollowUpMenuOpen}
      position={isFollowUpMenuOpen ? tooltipCoords : undefined}
      cursor={isFollowUpMenuOpen ? false : { fill: HIGHTLIGHT_BAR_COLOR }}
      formatter={valueFormatter}
      labelFormatter={labelFormatter}
      content={(props) => {
        return TooltipContentWithOutsideClickHandler({
          ...props,
          payload: hoveredItemId
            ? props?.payload?.filter((payloadItem) => payloadItem?.id === hoveredItemId)
            : props?.payload,
          onOutsideClick: () => {
            updateIsFollowUpMenuOpen(false);
            updateBrush({ x1: null, x2: null, y1: null, y2: null, isBrushing: false });
          },
          TooltipContent,
        });
      }}
    />
  );
}

Tooltip.propTypes = {};

export default Tooltip;
