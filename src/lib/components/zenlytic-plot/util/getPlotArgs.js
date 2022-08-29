import { PLOT_TYPES } from 'constants/plotConstants';
import getLinePlotArgs from './getLinePlotArgs';

export const getPlotArgs = (plotData, plotType) => {
  const plotArgsFunctions = {
    [PLOT_TYPES.LINE]: getLinePlotArgs(plotData),
  };
  return plotArgsFunctions[plotType];
};
export default getPlotArgs;
