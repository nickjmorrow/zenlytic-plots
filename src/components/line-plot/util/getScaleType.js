import { DATE_AXIS_TYPES, SCALE_TYPES } from '../../../constants/plotConstants';

const getScaleType = (axisZenlyticFormat) => {
  if (DATE_AXIS_TYPES.includes(axisZenlyticFormat)) {
    return SCALE_TYPES.UTC;
  }
  return SCALE_TYPES.LINEAR;
};

export default getScaleType;
