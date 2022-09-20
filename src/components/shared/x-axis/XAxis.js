/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { Label, XAxis as RechartsXAxis } from 'recharts';
import {
  DEFAULT_AXIS_COLOR,
  DEFAULT_LABEL_PROPS,
  DEFAULT_TICK_PROPS,
  DEFAULT_X_AXIS_HEIGHT,
} from '../../../constants/plotConstants';

const XAxis = (props) => {
  const {
    domain = ['dataMin', 'dataMax'],
    name = undefined,
    type = 'number',
    height = DEFAULT_X_AXIS_HEIGHT,
    stroke = DEFAULT_AXIS_COLOR,
    tick = DEFAULT_TICK_PROPS,
    minTickGap = undefined,
    dataKey = undefined,
    interval = undefined,
    tickFormatter = undefined,
  } = props;
  return (
    <RechartsXAxis
      domain={domain}
      name={name}
      type={type}
      height={height}
      tick={tick}
      stroke={stroke}
      interval={interval}
      minTickGap={minTickGap}
      tickFormatter={tickFormatter}
      dataKey={dataKey}>
      <Label {...DEFAULT_LABEL_PROPS} value={name} position="bottom" />
    </RechartsXAxis>
  );
  //   return (
  //     <RechartsXAxis
  //       domain={domain}
  //       name={name}
  //       type={type}
  //       height={height}
  //       stroke={stroke}
  //       tick={tick}
  //       minTickGap={minTickGap}
  //       dataKey={dataKey}
  //       interval={interval}
  //       //   tickFormatter={tickFormatter}
  //     >
  //       <Label {...DEFAULT_LABEL_PROPS} value={name} position="bottom" />
  //     </RechartsXAxis>
  //   );
};

XAxis.propTypes = {};

export default XAxis;
