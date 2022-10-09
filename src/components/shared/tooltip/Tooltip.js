/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip as RechartsTooltip } from 'recharts';
import TooltipHandler from '../../tooltip-handler/TooltipHandler';
import formatValue from '../../../utils/formatValue';
import getD3DataFormatter from '../../../utils/getD3DataFormatter';
import { getFormatter, getTickFormatterFromDataKey } from '../../../utils/plotConfigGetters';

// eslint-disable-next-line react/prop-types
function Tooltip({
  xAxisConfig = {},
  yAxisConfig = {},
  zAxisConfig = {},
  tooltipContent = false,
  plotConfig = {},
  customLabelFormatter = null,
}) {
  const { tickFormatter: xAxisTickFormatter } = xAxisConfig;
  const { tickFormatter: yAxisTickFormatter } = yAxisConfig;
  const { dataKey: xAxisDataKey } = xAxisConfig || {};

  const labelFormatter = (value, payload) => {
    if (customLabelFormatter) {
      return customLabelFormatter(value, payload);
    }
    const formatter = getTickFormatterFromDataKey(plotConfig, xAxisDataKey);
    return formatter(value);
  };

  return (
    <RechartsTooltip
      formatter={(value, dataKey) => {
        console.log('🚀 ~ file: Tooltip.js ~ line 34 ~ dataKey', dataKey);
        console.log('🚀 ~ file: Tooltip.js ~ line 34 ~ value', value);
        const formatter = getTickFormatterFromDataKey(plotConfig, dataKey);
        return formatter(value);
      }}
      labelFormatter={labelFormatter}
      content={tooltipContent}
    />
  );
}

Tooltip.propTypes = {};

export default Tooltip;
