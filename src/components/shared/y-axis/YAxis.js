/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
import React from 'react';
import PropTypes from 'prop-types';
import { Label, YAxis as RechartsYAxis } from 'recharts';
import {
  DEFAULT_AXIS_COLOR,
  DEFAULT_LABEL_PROPS,
  DEFAULT_TICK_PROPS,
  DEFAULT_Y_AXIS_WIDTH,
} from '../../../constants/plotConstants';

const YAxis = ({ name, tickFormatter }) => {
  return (
    <RechartsYAxis
      stroke={DEFAULT_AXIS_COLOR}
      width={DEFAULT_Y_AXIS_WIDTH}
      tick={DEFAULT_TICK_PROPS}
      //   tickFormatter={tickFormatter}
      name={name}>
      <Label {...DEFAULT_LABEL_PROPS} value={name} position="left" angle={-90} />
    </RechartsYAxis>
  );
};

YAxis.propTypes = {};

export default YAxis;
