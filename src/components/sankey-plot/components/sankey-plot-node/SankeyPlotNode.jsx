import React from 'react';
import { Rectangle, Layer } from 'recharts';

export default function SankeyPlotNode(props) {
  const { x, y, width, height, index, payload, containerWidth, colors, valueFormatter } = props;
  console.log('🚀 ~ file: SankeyPlotNode.jsx ~ line 6 ~ SankeyPlotNode ~ payload', payload);
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
        fontSize="12"
        fontWeight="normal"
        stroke="#333">
        {payload.name}
      </text>
      <text
        textAnchor={isOut ? 'end' : 'start'}
        x={isOut ? x - 6 : x + width + 6}
        y={y + height / 2 + 13}
        fontSize="10"
        fontWeight="lighter"
        stroke="#333"
        strokeOpacity="0.5">
        {valueFormatter(payload.value)}
      </text>
    </Layer>
  );
}
