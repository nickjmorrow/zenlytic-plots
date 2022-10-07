/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Sankey } from 'recharts';
import { PLOT_COLORS } from '../../constants/plotConstants';

import {
  getData,
  getMargin,
  getXAxisDataKey,
  getYAxisTickFormatter,
} from '../../utils/plotConfigGetters';
import GeneralChartComponents from '../general-chart-components/GeneralChartComponents';
import PlotContainer from '../plot-container/PlotContainer';
import SankeyPlotLink from './components/sankey-plot-link/SankeyPlotLink';
import SankeyPlotNode from './components/sankey-plot-node/SankeyPlotNode';

function NewLinePlot({ plotConfig = {}, tooltipContent = false }) {
  const data = getData(plotConfig);
  const margin = getMargin(plotConfig);

  const xAxisDataKey = getXAxisDataKey(plotConfig);

  const yAxisTickFormatter = getYAxisTickFormatter(plotConfig);

  let categories = [];
  // categories = data ? [...new Set(data.map((d) => d[xAxisDataKey]))] : [];
  categories = [...new Set(data?.nodes?.map((d) => d[xAxisDataKey]))];
  const nodeColors = {};
  categories.forEach((category, index) => {
    nodeColors[category] = PLOT_COLORS[index % PLOT_COLORS.length];
  });

  const colorGradients = data.links.map((link) => {
    return {
      source: data.nodes[link.source].color || nodeColors[data.nodes[link.source][xAxisDataKey]],
      target: data.nodes[link.target].color || nodeColors[data.nodes[link.target][xAxisDataKey]],
    };
  });

  return (
    <PlotContainer>
      <Sankey
        margin={margin}
        data={data}
        nodePadding={50}
        link={<SankeyPlotLink colorGradients={colorGradients} />}
        nameKey={xAxisDataKey}
        node={
          <SankeyPlotNode
            xAxisDataKey={xAxisDataKey}
            valueFormatter={yAxisTickFormatter}
            nodeColors={nodeColors}
          />
        }>
        {GeneralChartComponents({
          plotConfig,
          tooltipContent,
          useGridLines: false,
        })}
      </Sankey>
    </PlotContainer>
  );
}

NewLinePlot.propTypes = {};

export default NewLinePlot;
