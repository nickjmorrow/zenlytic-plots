/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
  Label,
} from 'recharts';
import formatValue from '../../utils/formatValue';
import getD3DataFormatter from '../../utils/getD3DataFormatter';
import TooltipHandler from '../tooltip-handler/TooltipHandler';

function HistogramBarLabel(props) {
  console.log('🚀 ~ file: HistogramPlot.js ~ line 22 ~ HistogramBarLabel ~ props', props);
  return 'methol';
}

function HistogramPlot({
  plotColor = '#8a8a8a',
  width = 300,
  height = 300,
  xAxis = {},
  yAxis = {},
  data = [],
  margin = {
    top: 32,
    left: 24,
    bottom: 40,
    right: 32,
  },
  CustomHoverTooltip = undefined,
  CustomClickTooltip = undefined,
  onUpdateBrush = () => {},
}) {
  const { label: xAxisLabel, format: xAxisFormat, dataKey: xAxisKey } = xAxis;
  const { label: yAxisLabel, format: yAxisFormat, dataKey: yAxisKey } = yAxis;

  const [refAreaLeft, setRefAreaLeft] = useState('');
  const [refAreaRight, setRefAreaRight] = useState('');

  const [isDragging, setIsDragging] = useState(false);
  const [focusBar, setFocusBar] = useState(null);
  const [mouseLeave, setMouseLeave] = useState(true);

  console.log('🚀 ~ file: HistogramPlot.js ~ line 47 ~ focusBar', focusBar);

  const [isClickTooltipVisible, setIsClickTooltipVisible] = useState(false);
  const [clickTooltipCoords, setClickTooltipCoords] = useState();

  const closeClickTooltip = () => {
    setRefAreaLeft('');
    setRefAreaRight('');

    setIsClickTooltipVisible(false);
    setClickTooltipCoords(null);
  };

  const onBrushEnd = () => {
    setIsDragging(false);

    if (isClickTooltipVisible || !refAreaLeft || !refAreaRight) {
      return;
    }

    setIsClickTooltipVisible(true);
    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      closeClickTooltip();
      return;
    }
    if (refAreaLeft > refAreaRight) {
      setRefAreaLeft(refAreaRight);
      setRefAreaRight(refAreaLeft);
      onUpdateBrush({ start: refAreaRight, end: refAreaLeft });
    } else {
      onUpdateBrush({ start: refAreaLeft, end: refAreaRight });
    }
  };

  return (
    <div style={{ userSelect: 'none' }}>
      <BarChart
        height={height}
        width={width}
        data={data}
        margin={margin}
        barCategoryGap={'10%'}
        onMouseDown={(e) => {
          if (isClickTooltipVisible) return;
          if (!e?.activeLabel) return;
          if (!e?.activePayload) return;

          if (isDragging) return;
          setIsDragging(true);
          setRefAreaLeft(e.activeLabel);
        }}
        onMouseMove={(e) => {
          console.log('🚀 ~ file: HistogramPlot.js ~ line 108 ~ e', e);
          if (e.isTooltipActive) {
            setFocusBar(e.activeTooltipIndex);
            setMouseLeave(false);
          } else {
            setFocusBar(null);
            setMouseLeave(true);
          }
          if (refAreaLeft && isDragging && e.activeLabel && e.activeCoordinate) {
            setRefAreaRight(e.activeLabel);
            setClickTooltipCoords(e.activeCoordinate);
          }
        }}
        onMouseLeave={(e) => {
          setIsDragging(false);
          if (refAreaLeft && refAreaRight && !isClickTooltipVisible) {
            onBrushEnd();
          }
        }}
        // eslint-disable-next-line react/jsx-no-bind
        onMouseUp={onBrushEnd}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis
          // padding={{ left: 20, right: 20 }}
          interval="preserveStartEnd"
          name={xAxisLabel}
          dataKey={'rangeBottom'}
          type="number"
          tickFormatter={(timeStr) =>
            formatValue(getD3DataFormatter(xAxisFormat, timeStr), timeStr)
          }>
          <Label value={xAxisLabel} offset={-10} position="insideBottom" />
        </XAxis>
        <YAxis
          name={yAxisLabel}
          // width={80}
          dataKey="value"
          tickFormatter={(timeStr) =>
            formatValue(getD3DataFormatter(yAxisFormat, timeStr), timeStr)
          }>
          <Label
            value={yAxisLabel}
            position="insideLeft"
            angle={-90}
            style={{ textAnchor: 'middle' }}
          />
        </YAxis>
        <Bar dataKey="value" fill={plotColor} name={yAxisLabel} radius={[2, 2, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              fill={plotColor}
              fillOpacity={focusBar === index || mouseLeave || isClickTooltipVisible ? 1.0 : 0.3}
            />
          ))}
        </Bar>
        <ReferenceArea
          x1={refAreaRight}
          x2={refAreaLeft}
          strokeOpacity={0.3}
          isFront
          stroke="gray"
          alwaysShow
        />
        <Tooltip
          cursor={false}
          wrapperStyle={{ visibility: 'visible' }}
          position={isClickTooltipVisible ? clickTooltipCoords : undefined}
          content={
            <TooltipHandler
              CustomHoverTooltip={CustomHoverTooltip}
              CustomClickTooltip={CustomClickTooltip}
              isClickTooltipVisible={isClickTooltipVisible}
              closeClickTooltip={closeClickTooltip}
            />
          }
          formatter={(value) => formatValue(getD3DataFormatter(yAxisFormat, value), value)}
          labelFormatter={(value, payload) => {
            const hoveredBar = payload[0] || {};
            const { payload: hoveredBarPayload = {} } = hoveredBar;
            console.log(
              '🚀 ~ file: HistogramPlot.js ~ line 180 ~ hoveredBarPayload',
              hoveredBarPayload
            );
            const { rangeTop, rangeBottom } = hoveredBarPayload;
            return `${formatValue(
              getD3DataFormatter(xAxisFormat, rangeBottom),
              rangeBottom
            )} - ${formatValue(getD3DataFormatter(xAxisFormat, rangeTop), rangeTop)}`;
          }}
        />
        {/* <Legend /> */}
      </BarChart>
    </div>
  );
}

HistogramPlot.propTypes = {};

export default HistogramPlot;
