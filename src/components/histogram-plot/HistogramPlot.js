/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  ReferenceArea,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  BRUSH_BORDER_COLOR,
  BRUSH_COLOR,
  DEFAULT_AXIS_COLOR,
  DEFAULT_CARTESIAN_GRID_COLOR,
  DEFAULT_LABEL_PROPS,
  DEFAULT_PLOT_MARGIN,
  DEFAULT_TICK_PROPS,
  DEFAULT_X_AXIS_HEIGHT,
  DEFAULT_Y_AXIS_WIDTH,
} from '../../constants/plotConstants';
import formatValue from '../../utils/formatValue';
import getD3DataFormatter from '../../utils/getD3DataFormatter';
import TooltipHandler from '../tooltip-handler/TooltipHandler';

function HistogramBarLabel(props) {
  return 'methol';
}

function HistogramPlot({
  plotColor = '#8a8a8a',
  width = 300,
  height = 300,
  xAxis = {},
  yAxis = {},
  data = [],
  margin = DEFAULT_PLOT_MARGIN,
  CustomHoverTooltip = undefined,
  CustomClickTooltip = undefined,
  onUpdateBrush = () => {},
  disableBrush = false,
  disableFollowUps = false,
}) {
  const { label: xAxisLabel, format: xAxisFormat, dataKey: xAxisKey } = xAxis;
  const { label: yAxisLabel, format: yAxisFormat, dataKey: yAxisKey } = yAxis;

  const [refAreaLeft, setRefAreaLeft] = useState('');
  const [refAreaRight, setRefAreaRight] = useState('');

  const [isDragging, setIsDragging] = useState(false);
  const [focusBar, setFocusBar] = useState(null);
  const [mouseLeave, setMouseLeave] = useState(true);

  const [isClickTooltipVisible, setIsClickTooltipVisible] = useState(false);
  const [clickTooltipCoords, setClickTooltipCoords] = useState();

  const closeClickTooltip = () => {
    setRefAreaLeft('');
    setRefAreaRight('');
    setIsClickTooltipVisible(false);
    setClickTooltipCoords(null);
  };

  const onBrushEnd = () => {
    if (!isDragging) return;
    if (disableFollowUps) return;
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
          if (disableBrush) return;
          if (isClickTooltipVisible) return;
          if (!e?.activeLabel) return;
          if (!e?.activePayload) return;
          if (isDragging) return;
          setIsDragging(true);
          setRefAreaLeft(e.activeLabel);
        }}
        onMouseMove={(e) => {
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
        <CartesianGrid stroke={DEFAULT_CARTESIAN_GRID_COLOR} />
        <XAxis
          // padding={{ left: 20, right: 20 }}
          interval="preserveStartEnd"
          height={DEFAULT_X_AXIS_HEIGHT}
          stroke={DEFAULT_AXIS_COLOR}
          tick={DEFAULT_TICK_PROPS}
          name={xAxisLabel}
          dataKey={'rangeBottom'}
          type="number"
          tickFormatter={(timeStr) =>
            formatValue(getD3DataFormatter(xAxisFormat, timeStr), timeStr)
          }>
          <Label {...DEFAULT_LABEL_PROPS} value={xAxisLabel} position="bottom" />
        </XAxis>
        <YAxis
          name={yAxisLabel}
          stroke={DEFAULT_AXIS_COLOR}
          width={DEFAULT_Y_AXIS_WIDTH}
          tick={DEFAULT_TICK_PROPS}
          dataKey="value"
          tickFormatter={(timeStr) =>
            formatValue(getD3DataFormatter(yAxisFormat, timeStr), timeStr)
          }>
          <Label {...DEFAULT_LABEL_PROPS} value={yAxisLabel} position="left" angle={-90} />
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
          isFront
          fill={BRUSH_COLOR}
          stroke={BRUSH_BORDER_COLOR}
          alwaysShow
        />
        <Tooltip
          cursor={false}
          wrapperStyle={{ visibility: 'visible', zIndex: 10000 }}
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
