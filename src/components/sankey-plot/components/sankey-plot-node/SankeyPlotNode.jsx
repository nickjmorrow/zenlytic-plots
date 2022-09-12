import React from 'react';
import { Layer, Rectangle } from 'recharts';
import fontSizes from '../../../../constants/fontSizes';
import fontWeights from '../../../../constants/fontWeights';

export default function SankeyPlotNode(props) {
  const { x, y, width, height, index, payload, containerWidth, colors, valueFormatter } = props;
  const isOut = x + width + 6 > containerWidth;

  return (
    <Layer key={`CustomNode${index}`}>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={payload.color || colors[index % colors.length]}
        fillOpacity="1"
      />
      <text
        textAnchor={isOut ? 'end' : 'start'}
        x={isOut ? x - 6 : x + width + 6}
        y={y + height / 2}
        fontSize={fontSizes.xs}
        fontWeight={fontWeights.medium}
        strokeWidth={0}
        stroke="#333">
        {payload.name}
      </text>
      <text
        textAnchor={isOut ? 'end' : 'start'}
        x={isOut ? x - 6 : x + width + 6}
        y={y + height / 2 + 13}
        fontSize={fontSizes['2xs']}
        fontWeight={fontWeights.normal}
        stroke="#333"
        strokeWidth={0}>
        {valueFormatter(payload.value)}
      </text>
    </Layer>
  );
}
