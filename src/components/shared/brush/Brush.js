import React from 'react';
import PropTypes from 'prop-types';
import { ReferenceArea } from 'recharts';
import { BRUSH_BORDER_COLOR, BRUSH_COLOR } from '../../../constants/plotConstants';

const Brush = ({ x1, x2 }) => {
  return (
    <ReferenceArea
      x1={x1}
      x2={x2}
      isFront
      fill={BRUSH_COLOR}
      stroke={BRUSH_BORDER_COLOR}
      alwaysShow
    />
  );
};

Brush.propTypes = {};

export default Brush;
