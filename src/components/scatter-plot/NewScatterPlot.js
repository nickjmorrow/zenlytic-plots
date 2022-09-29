/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { ResponsiveContainer, Scatter, ScatterChart } from 'recharts';
import { PLOT_COLORS } from '../../constants/plotConstants';

import {
  getCategoryAxis,
  getCategoryValueAxes,
  getData,
  getMargin,
  getSeriesStrokeColor,
  getXAxis,
  getYAxis,
} from '../../utils/plotConfigGetters';
import GridLines from '../shared/grid-lines/GridLines';
import XAxis from '../shared/x-axis/XAxis';
import YAxis from '../shared/y-axis/YAxis';

function NewScatterPlot({ plotConfig = {} }) {
  const xAxisConfig = getXAxis(plotConfig);
  const yAxisConfig = getYAxis(plotConfig);
  const categoryAxisConfig = getCategoryAxis(plotConfig);

  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);

  const seriesStrokeColor = getSeriesStrokeColor(plotConfig);

  const categoryValueAxes = getCategoryValueAxes(plotConfig);

  return (
    <ResponsiveContainer>
      <ScatterChart margin={margin}>
        {GridLines()}
        {XAxis({
          ...xAxisConfig,
        })}
        {YAxis({ ...yAxisConfig })}
        {categoryValueAxes.map((categoryValueAxis, index) => {
          return (
            <Scatter
              data={data}
              fill={PLOT_COLORS[index % PLOT_COLORS.length]}
              name={categoryValueAxis.name}
            />
          );
        })}
        {/* {ZAxis({ ...categoryAxisConfig })} */}
        {/* {ZenlyticLegend({
          margin,
        })} */}
      </ScatterChart>
    </ResponsiveContainer>
  );
}

NewScatterPlot.propTypes = {};

export default NewScatterPlot;
