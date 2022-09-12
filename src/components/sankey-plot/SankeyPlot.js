/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { Sankey, Tooltip } from 'recharts';
import { DEFAULT_PLOT_MARGIN, PLOT_COLORS } from '../../constants/plotConstants';
import formatValue from '../../utils/formatValue';
import getD3DataFormatter from '../../utils/getD3DataFormatter';
import TooltipHandler from '../tooltip-handler/TooltipHandler';
import SankeyPlotLink from './components/sankey-plot-link/SankeyPlotLink';
import SankeyPlotNode from './components/sankey-plot-node/SankeyPlotNode';

function SankeyPlot({
  plotColor = '#8a8a8a',
  valueAxis = {},
  categoryAxis = {},
  data = [],
  margin = DEFAULT_PLOT_MARGIN,
  CustomHoverTooltip = undefined,
  CustomClickTooltip = undefined,
  width = 300,
  height = 300,
}) {
  const { format: valueAxisFormat } = valueAxis;

  const colors = PLOT_COLORS;
  const numColors = colors.length;

  const colorGradients = data.links.map((link) => {
    return {
      source: data.nodes[link.source].color || colors[link.source % numColors],
      target: data.nodes[link.target].color || colors[link.target % numColors],
    };
  });

  const valueFormatter = (value) => formatValue(getD3DataFormatter(valueAxisFormat, value), value);

  return (
    <div style={{ userSelect: 'none' }}>
      <Sankey
        margin={margin}
        width={width}
        height={height}
        data={data}
        nodePadding={50}
        link={<SankeyPlotLink colorGradients={colorGradients} />}
        node={
          <SankeyPlotNode
            containerWidth={width - margin.left - margin.right}
            colors={colors}
            valueFormatter={valueFormatter}
          />
        }>
        <Tooltip
          content={<TooltipHandler CustomHoverTooltip={CustomHoverTooltip} />}
          formatter={valueFormatter}
        />
      </Sankey>
    </div>
  );
}

SankeyPlot.propTypes = {};

export default SankeyPlot;
