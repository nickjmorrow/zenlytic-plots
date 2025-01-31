/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';

import {
  CartesianGrid,
  Label,
  ReferenceArea,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
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

function ScatterPlot({
  plotColor = '#8a8a8a',
  xAxis = {},
  yAxis = {},
  categoryAxis = {},
  data = [],
  onUpdateBrush = () => {},
  disableBrush = false,
  disableFollowUps = false,
  margin = DEFAULT_PLOT_MARGIN,
  width = 300,
  height = 300,
  CustomHoverTooltip = undefined,
  CustomClickTooltip = undefined,
}) {
  const { label: xAxisLabel, format: xAxisFormat, dataKey: xAxisDataKey } = xAxis;
  const { label: yAxisLabel, format: yAxisFormat, dataKey: yAxisDataKey } = yAxis;
  const {
    label: categoryAxisLabel,
    format: categoryAxisFormat,
    dataKey: categoryAxisDataKey,
  } = categoryAxis;

  const [isDragging, setIsDragging] = useState(false);
  const [isClickTooltipVisible, setIsClickTooltipVisible] = useState(false);
  const [clickTooltipCoords, setClickTooltipCoords] = useState();

  const [brushAreaPoint1, setBrushAreaPoint1] = useState({});
  const [brushAreaPoint2, setBrushAreaPoint2] = useState({});

  const closeClickTooltip = () => {
    setBrushAreaPoint1({});
    setBrushAreaPoint2({});
    setIsClickTooltipVisible(false);
    setClickTooltipCoords(null);
  };

  const onBrushEnd = () => {
    if (!isDragging) return;
    if (disableFollowUps) return;

    setIsDragging(false);
    if (
      isClickTooltipVisible ||
      !brushAreaPoint1?.x ||
      !brushAreaPoint1?.y ||
      !brushAreaPoint2?.x ||
      !brushAreaPoint2?.y
    ) {
      return;
    }
    setIsClickTooltipVisible(true);
    if (brushAreaPoint1.x === brushAreaPoint2.x || brushAreaPoint1.y === brushAreaPoint2.y) {
      closeClickTooltip();
      return;
    }
    onUpdateBrush({
      x1: brushAreaPoint1.x,
      x2: brushAreaPoint2.x,
      y1: brushAreaPoint1.y,
      y2: brushAreaPoint2.y,
    });
    // const newBrush = {};
    // if (brushAreaPoint1.x > brushAreaPoint2.x) {
    //   setRefAreaLeft(refAreaRight);
    //   setRefAreaRight(refAreaLeft);
    //   onUpdateBrush({ start: refAreaRight, end: refAreaLeft });
    // } else {
    //   onUpdateBrush({ start: refAreaLeft, end: refAreaRight });
    // }
  };

  const getAxisFormatFromDataKey = (dataKey) => {
    if (dataKey === xAxisDataKey) {
      return xAxisFormat;
    }
    if (dataKey === yAxisDataKey) {
      return yAxisFormat;
    }
    if (dataKey === categoryAxisDataKey) {
      return categoryAxisFormat;
    }
    return '';
  };

  return (
    <div style={{ userSelect: 'none' }}>
      <ScatterChart
        margin={margin}
        height={height}
        width={width}
        onMouseDown={(e) => {
          if (disableBrush) return;
          if (isClickTooltipVisible) return;
          if (!e?.xValue || !e?.yValue) return;
          // if (!e?.activePayload) return;
          if (isDragging) return;
          setIsDragging(true);
          setBrushAreaPoint1({ x: e?.xValue, y: e?.yValue });
          setBrushAreaPoint2({ x: e?.xValue, y: e?.yValue });
        }}
        onMouseMove={(e) => {
          if (brushAreaPoint1?.x && brushAreaPoint1?.y && isDragging && e?.xValue && e?.yValue) {
            setBrushAreaPoint2({ x: e?.xValue, y: e?.yValue });
            setClickTooltipCoords({ x: e?.chartX, y: e?.chartY });
          }
        }}
        onMouseLeave={(e) => {
          if (!isDragging) return;
          setIsDragging(false);
          if (brushAreaPoint1 && brushAreaPoint1 && !isClickTooltipVisible) {
            onBrushEnd();
          }
        }}
        // eslint-disable-next-line react/jsx-no-bind
        onMouseUp={onBrushEnd}>
        <CartesianGrid stroke={DEFAULT_CARTESIAN_GRID_COLOR} />
        <XAxis
          type="number"
          height={DEFAULT_X_AXIS_HEIGHT}
          stroke={DEFAULT_AXIS_COLOR}
          tick={DEFAULT_TICK_PROPS}
          dataKey={xAxisDataKey}
          name={xAxisLabel}
          allowDecimals={false}
          tickFormatter={(timeStr) =>
            formatValue(getD3DataFormatter(xAxisFormat, timeStr), timeStr)
          }>
          <Label {...DEFAULT_LABEL_PROPS} value={xAxisLabel} position="bottom" />
        </XAxis>
        <YAxis
          stroke={DEFAULT_AXIS_COLOR}
          width={DEFAULT_Y_AXIS_WIDTH}
          tick={DEFAULT_TICK_PROPS}
          dataKey={yAxisDataKey}
          allowDecimals={false}
          name={yAxisLabel}
          tickFormatter={(timeStr) =>
            formatValue(getD3DataFormatter(yAxisFormat, timeStr), timeStr)
          }>
          <Label
            {...DEFAULT_LABEL_PROPS}
            value={yAxisLabel}
            position="left"
            angle={-90}
            style={{ textAnchor: 'middle' }}
          />
        </YAxis>
        <ZAxis dataKey={categoryAxisDataKey} name={categoryAxisLabel} />
        <ReferenceArea
          x1={brushAreaPoint1?.x}
          y1={brushAreaPoint1?.y}
          x2={brushAreaPoint2?.x}
          y2={brushAreaPoint2?.y}
          isFront
          fill={BRUSH_COLOR}
          stroke={BRUSH_BORDER_COLOR}
          alwaysShow
        />
        <Tooltip
          cursor={!isClickTooltipVisible}
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
          formatter={(value, dataKey) =>
            formatValue(getD3DataFormatter(getAxisFormatFromDataKey(dataKey), value), value)
          }
          labelFormatter={(value) => formatValue(getD3DataFormatter(xAxisFormat, value), value)}
        />
        <Scatter data={data} fill={plotColor} />
      </ScatterChart>
    </div>
  );
}

ScatterPlot.propTypes = {};

export default ScatterPlot;
