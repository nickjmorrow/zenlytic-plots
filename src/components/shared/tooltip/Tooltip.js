/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip as RechartsTooltip } from 'recharts';
import TooltipHandler from '../../tooltip-handler/TooltipHandler';
import formatValue from '../../../utils/formatValue';
import getD3DataFormatter from '../../../utils/getD3DataFormatter';

// eslint-disable-next-line react/prop-types
function Tooltip({
  CustomHoverTooltip,
  CustomClickTooltip,
  isClickTooltipVisible,
  clickTooltipCoords,
  closeClickTooltip = () => {},
  yAxisFormat,
  xAxisTickFormatter,
}) {
  return (
    <RechartsTooltip
      cursor={!isClickTooltipVisible}
      wrapperStyle={{ visibility: 'visible', zIndex: 10000 }}
      position={isClickTooltipVisible ? clickTooltipCoords : undefined}
      content={
        <TooltipHandler
          CustomHoverTooltip={CustomHoverTooltip}
          CustomClickTooltip={CustomClickTooltip}
          isClickTooltipVisible={isClickTooltipVisible}
          closeClickTooltip={closeClickTooltip}
        />
      }
      formatter={(value) => formatValue(getD3DataFormatter(yAxisFormat, value), value)}
      labelFormatter={xAxisTickFormatter}
    />
  );
}

Tooltip.propTypes = {};

export default Tooltip;
