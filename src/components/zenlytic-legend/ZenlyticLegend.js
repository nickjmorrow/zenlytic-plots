/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import React from 'react';
import PropTypes from 'prop-types';
import { Legend } from 'recharts';
import colors from '../../constants/colors';
import { PLOT_MARGIN } from '../../constants/plotConstants';
import space from '../../constants/space';
import fontSizes from '../../constants/fontSizes';
import fontWeights from '../../constants/fontWeights';

const legendItem = (value, entry) => {
  return (
    <span
      style={{
        color: colors.gray[500],
        fontSize: fontSizes.xs,
        fontWeight: fontWeights.normal,
      }}>
      {value}
    </span>
  );
};

const ZenlyticLegend = ({
  isServerSide = false,
  onLegendItemHover,
  onLegendItemLeave,
  margin,
  ...restProps
}) => {
  return (
    <Legend
      layout="vertical"
      align="right"
      verticalAlign={isServerSide ? 'top' : 'middle'}
      iconSize={16}
      color={colors.gray[500]}
      wrapperStyle={{
        paddingLeft: space[6],
        paddingBottom: margin.bottom,
      }}
      onMouseEnter={onLegendItemHover}
      onMouseLeave={onLegendItemLeave}
      isAnimationActive={!isServerSide}
      formatter={legendItem}
      {...restProps}
    />
  );
};

ZenlyticLegend.propTypes = {};

export default ZenlyticLegend;
