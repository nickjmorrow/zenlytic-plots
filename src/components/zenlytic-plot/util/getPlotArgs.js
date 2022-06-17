import { PLOT_TYPES } from 'constants/plotConstants';
import getLinePlotArgs from './getLinePlotArgs';

export const getPlotArgs = (plotData, plotType) => {
  const plotArgsFunctions = {
    [PLOT_TYPES.LINE]: getLinePlotArgs(plotData),
  };
  console.log(
    '🚀 ~ file: getPlotArgs.js ~ line 10 ~ getPlotArgs ~ plotArgsFunctions[plotType]',
    plotArgsFunctions[plotType]
  );
  return plotArgsFunctions[plotType];
};
export default getPlotArgs;
