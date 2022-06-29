import React from 'react';
import PropTypes from 'prop-types';
import LinePlot from 'components/line-plot/LinePlot';
import getPlotArgs from './util/getPlotArgs';
import { PLOT_TYPES } from 'constants/plotConstants';

const ZenlyticPlot = ({ plotData = {} }) => {
  const { plotType } = plotData;
  const plotArgs = getPlotArgs(plotData, plotType);
  const plots = {
    [PLOT_TYPES.LINE]: <LinePlot {...plotArgs} />,
  };

  return plots[plotType];
};

ZenlyticPlot.propTypes = {};

export default ZenlyticPlot;

LinePlot.propTypes = {
  /**
   * The json plot object
   */
  plotData: PropTypes.object,
};
