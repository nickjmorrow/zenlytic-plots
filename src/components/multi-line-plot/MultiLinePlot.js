/* eslint-disable react/jsx-filename-extension */
import moment from 'moment';
import React, { useState } from 'react';
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ReferenceArea,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  DEFAULT_AXIS_COLOR,
  DEFAULT_CARTESIAN_GRID_COLOR,
  DEFAULT_LABEL_PROPS,
  DEFAULT_PLOT_MARGIN,
  DEFAULT_TICK_PROPS,
  DEFAULT_X_AXIS_HEIGHT,
  DEFAULT_Y_AXIS_WIDTH,
  PLOT_COLORS,
} from '../../constants/plotConstants';
import formatValue, { formatUnixValue, TIME_FORMATS } from '../../utils/formatValue';
import getD3DataFormatter from '../../utils/getD3DataFormatter';
import TooltipHandler from '../tooltip-handler/TooltipHandler';
import colors from '../../constants/colors';
import fontSizes from '../../constants/fontSizes';
import fontWeights from '../../constants/fontWeights';
import space from '../../constants/space';
import ZenlyticLegend from '../zenlytic-legend/ZenlyticLegend';

function MultiLinePlot({
  plotColor = '#8a8a8a',
  width = 300,
  height = 300,
  tickCount = 5,
  minTickGap = 100,
  interval = 'preserveEnd',
  xAxis = {},
  yAxis = {},
  categoryAxis = {},
  onUpdateBrush = () => {},
  disableBrush = false,
  data,
  margin = DEFAULT_PLOT_MARGIN,
  CustomHoverTooltip = undefined,
  CustomClickTooltip = undefined,
  isServerSide,
}) {
  const { label: xAxisLabel, format: xAxisFormat, dataKey: xAxisDataKey } = xAxis;

  const xAxisTickFormatter = (timeStr) =>
    formatUnixValue(getD3DataFormatter(xAxisFormat, timeStr), timeStr);

  const newXAxisDataKey = TIME_FORMATS.includes(xAxisFormat)
    ? (d) => {
        if (!d) return null;
        return moment.utc(d[xAxisDataKey]).format('X');
      }
    : xAxisDataKey;

  const { label: yAxisLabel, format: yAxisFormat, dataKey: yAxisDataKey } = yAxis;
  const {
    label: categoryAxisLabel,
    format: categoryAxisFormat,
    dataKey: categoryAxisDataKey,
  } = categoryAxis;

  const [refAreaLeft, setRefAreaLeft] = useState('');
  const [refAreaRight, setRefAreaRight] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isClickTooltipVisible, setIsClickTooltipVisible] = useState(false);
  const [activePayloadAtBrush, setActivePayloadAtBrush] = useState(null);

  const [clickTooltipCoords, setClickTooltipCoords] = useState();

  const closeClickTooltip = () => {
    setRefAreaLeft('');
    setRefAreaRight('');
    setIsClickTooltipVisible(false);
    setClickTooltipCoords(null);
    setActivePayloadAtBrush(null);
  };

  const onBrushEnd = (event) => {
    setIsDragging(false);

    if (isClickTooltipVisible || !refAreaLeft || !refAreaRight) {
      return;
    }

    setIsClickTooltipVisible(true);
    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      closeClickTooltip();
      return;
    }
    if (!event || !event.activePayload) {
      return;
    }
    setActivePayloadAtBrush(event.activePayload);
    const formattedRight =
      xAxisFormat === 'date' ? moment.unix(refAreaRight).utc().toDate() : refAreaRight;
    const formattedLeft =
      xAxisFormat === 'date' ? moment.unix(refAreaLeft).utc().toDate() : refAreaLeft;

    if (refAreaLeft > refAreaRight) {
      setRefAreaLeft(refAreaRight);
      setRefAreaRight(refAreaLeft);

      onUpdateBrush({ start: formattedRight, end: formattedLeft });
    } else {
      onUpdateBrush({ start: formattedLeft, end: formattedRight });
    }
  };

  const [hoveredLineDataKey, setHoveredLineDataKey] = useState(null);

  const onLegendItemHover = (item) => {
    const { value } = item;
    setHoveredLineDataKey(value);
  };

  const onLegendItemLeave = (item) => {
    setHoveredLineDataKey(null);
  };

  return (
    // <ResponsiveContainer width={300} height={100}>
    <div style={{ userSelect: 'none' }}>
      <LineChart
        height={height}
        width={width}
        margin={margin}
        // data={lines[0]}
        // margin={PLOT_MARGIN}
        onMouseDown={(e) => {
          if (disableBrush) return;
          if (isClickTooltipVisible) return;
          if (!e?.activeLabel) return;
          if (!e?.activePayload) return;
          if (isDragging) return;
          setIsDragging(true);
          setRefAreaLeft(e.activeLabel);
          setRefAreaRight(e.activeLabel);
        }}
        onMouseMove={(e) => {
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
        onMouseUp={onBrushEnd}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={plotColor} stopOpacity={0.8} />
            <stop offset="95%" stopColor={plotColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={DEFAULT_CARTESIAN_GRID_COLOR} />
        <XAxis
          height={DEFAULT_X_AXIS_HEIGHT}
          stroke={DEFAULT_AXIS_COLOR}
          tick={DEFAULT_TICK_PROPS}
          domain={['dataMin', 'dataMax']}
          type="number"
          minTickGap={minTickGap}
          allowDuplicatedCategory={false}
          tickFormatter={xAxisTickFormatter}
          dataKey={newXAxisDataKey}
          interval={interval}>
          <Label {...DEFAULT_LABEL_PROPS} value={xAxisLabel} position="bottom" />
        </XAxis>
        <YAxis
          stroke={DEFAULT_AXIS_COLOR}
          width={DEFAULT_Y_AXIS_WIDTH}
          tick={DEFAULT_TICK_PROPS}
          type="number"
          dataKey={yAxisDataKey}
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
              customPayload={activePayloadAtBrush}
            />
          }
          formatter={(value) => formatValue(getD3DataFormatter(yAxisFormat, value), value)}
          labelFormatter={xAxisTickFormatter}
        />
        {ZenlyticLegend({
          margin,
          onMouseEnter: onLegendItemHover,
          onMouseLeave: onLegendItemLeave,
          isServerSide,
        })}

        {/* <Line dataKey={categoryAxisDataKey} /> */}
        {/* <Line dataKey={yAxisDataKey} name={lines[0][0][categoryAxisDataKey]} /> */}
        {data.map((line, index) => {
          return (
            <Line
              activeDot={!isClickTooltipVisible}
              dot
              data={line.data}
              stroke={PLOT_COLORS[index % PLOT_COLORS.length]}
              dataKey={yAxisDataKey}
              type="monotone"
              strokeWidth={2}
              name={line[categoryAxisDataKey]}
              key={line[categoryAxisDataKey]}
              isAnimationActive={false}
              strokeOpacity={
                line[categoryAxisDataKey] === hoveredLineDataKey
                  ? 1.0
                  : hoveredLineDataKey === null
                  ? 1.0
                  : 0.2
              }
            />
          );
        })}
        {/* <Line dataKey={'ORDERS_TWITTER'} data={line} name={s.name} key={s.name} /> */}
        {/* <Area
          type="monotone"
          dataKey={yAxisDataKey}
          stroke={plotColor}
          strokeWidth={2}
          activeDot={{ r: 8 }}
          fillOpacity={1}
          fill="url(#colorUv)"
        /> */}
        <ReferenceArea
          x1={refAreaRight}
          x2={refAreaLeft}
          strokeOpacity={0.3}
          isFront
          stroke="gray"
          alwaysShow
        />
      </LineChart>
    </div>
    // </ResponsiveContainer>
  );
}

MultiLinePlot.propTypes = {};

export default MultiLinePlot;
