/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Sankey, Tooltip } from 'recharts';
import { PLOT_COLORS } from '../../constants/plotConstants';

import {
  getData,
  getMargin,
  getSeriesStrokeColor,
  getXAxis,
  getXAxisDataKey,
  getXAxisTickFormatter,
  getYAxis,
  getYAxisDataKey,
  getYAxisTickFormatter,
} from '../../utils/plotConfigGetters';
import GridLines from '../shared/grid-lines/GridLines';
import XAxis from '../shared/x-axis/XAxis';
import YAxis from '../shared/y-axis/YAxis';
import SankeyPlotLink from './components/sankey-plot-link/SankeyPlotLink';
import SankeyPlotNode from './components/sankey-plot-node/SankeyPlotNode';

function NewLinePlot({ plotConfig = {} }) {
  const data = getData(plotConfig);
  console.log('🚀 ~ file: NewSankeyPlot.js ~ line 24 ~ NewLinePlot ~ data', data);
  const margin = getMargin(plotConfig);

  const xAxisDataKey = getXAxisDataKey(plotConfig);
  console.log('🚀 ~ file: NewSankeyPlot.js ~ line 29 ~ NewLinePlot ~ xAxisDataKey', xAxisDataKey);

  const yAxisTickFormatter = getYAxisTickFormatter(plotConfig);

  const colorGradients = data.links.map((link) => {
    return {
      source: data.nodes[link.source].color || PLOT_COLORS[link.source % PLOT_COLORS.length],
      target: data.nodes[link.target].color || PLOT_COLORS[link.target % PLOT_COLORS.length],
    };
  });

  return (
    <ResponsiveContainer>
      <Sankey
        margin={margin}
        data={data}
        nodePadding={50}
        link={<SankeyPlotLink colorGradients={colorGradients} />}
        node={
          <SankeyPlotNode
            // containerWidth={width - margin.left - margin.right}
            xAxisDataKey={xAxisDataKey}
            colors={PLOT_COLORS}
            valueFormatter={yAxisTickFormatter}
          />
        }
      />
    </ResponsiveContainer>
  );
}

NewLinePlot.propTypes = {};

export default NewLinePlot;
