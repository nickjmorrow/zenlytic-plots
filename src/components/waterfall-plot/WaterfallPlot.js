/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
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
  Label,
  LabelList,
} from 'recharts';
import formatValue from '../../utils/formatValue';
import getD3DataFormatter from '../../utils/getD3DataFormatter';
import TooltipHandler from '../tooltip-handler/TooltipHandler';
import {
  COLOR_FAIL,
  COLOR_SUCCESS,
  DEFAULT_AXIS_COLOR,
  DEFAULT_CARTESIAN_GRID_COLOR,
  DEFAULT_LABEL_PROPS,
  DEFAULT_PLOT_MARGIN,
  DEFAULT_TICK_PROPS,
  DEFAULT_WATERFALL_X_AXIS_HEIGHT,
  DEFAULT_X_AXIS_HEIGHT,
  DEFAULT_Y_AXIS_WIDTH,
  HIGHTLIGHT_BAR_COLOR,
} from '../../constants/plotConstants';
import fontSizes from '../../constants/fontSizes';
import fontWeights from '../../constants/fontWeights';

function WaterfallPlot({
  plotColor = '#8a8a8a',
  xAxis = {},
  yAxis = {},
  data = [],
  margin = DEFAULT_PLOT_MARGIN,
  width = 300,
  height = 300,
  onBarClick = () => {},
  disableFollowUps = false,
  CustomHoverTooltip = undefined,
  CustomClickTooltip = undefined,
}) {
  const { label: xAxisLabel = 'X-Axis', format: xAxisFormat, dataKey: xAxisKey } = xAxis;
  const { label: yAxisLabel = 'Y-Axis', format: yAxisFormat, dataKey: yAxisKey } = yAxis;

  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value, fill, label, index } = props;

    // const [refAreaLeft, setRefAreaLeft] = useState('');
    // const [refAreaRight, setRefAreaRight] = useState('');
    // const [isDragging, setIsDragging] = useState(false);
    // const [isClickTooltipVisible, setIsClickTooltipVisible] = useState(false);
    // const [clickTooltipCoords, setClickTooltipCoords] = useState();

    // const closeClickTooltip = () => {
    //   setIsClickTooltipVisible(false);
    //   setClickTooltipCoords(null);
    // };

    // const radius = 10;

    const verticalOffset = height >= 0 ? 16 : -16;
    const textColor = height >= 0 ? COLOR_SUCCESS : COLOR_FAIL;

    if (index === 0 || index === data.length - 1) return null;
    return (
      <g>
        <text
          x={x + width / 2}
          y={y - verticalOffset}
          position="top"
          fill={textColor}
          textAnchor="middle"
          fontSize={fontSizes.xs}
          fontWeight={fontWeights.medium}
          dominantBaseline="middle">
          {formatValue(getD3DataFormatter(yAxisFormat, value), value)}
        </text>
      </g>
    );
  };

  const [activePayload, setActivePayload] = useState(null);
  const [isClickTooltipVisible, setIsClickTooltipVisible] = useState(false);
  const [clickTooltipCoords, setClickTooltipCoords] = useState();

  const closeTooltip = () => {
    setClickTooltipCoords(null);
  };
  const handleBarClick = (event) => {
    if (!event) return;
    if (disableFollowUps) return;
    if (isClickTooltipVisible) {
      return;
    }
    const { activePayload: eventPayload = [] } = event;
    const visibleBarPayload = eventPayload.find(
      (barPayload) => (barPayload.dataKey = 'valueChange')
    );
    if (!visibleBarPayload || !visibleBarPayload.payload) {
      return;
    }
    if (!event) return;
    setClickTooltipCoords(event.activeCoordinate);
    onBarClick(visibleBarPayload?.payload);
  };

  useEffect(() => {
    if (disableFollowUps) return;
    if (clickTooltipCoords) {
      setIsClickTooltipVisible(true);
    } else {
      setIsClickTooltipVisible(false);
    }
  }, [clickTooltipCoords]);

  return (
    <div style={{ userSelect: 'none' }}>
      <BarChart
        margin={margin}
        height={height}
        width={width}
        data={data}
        onClick={handleBarClick}
        onMouseMove={(event) => {
          const { activePayload: eventPayload } = event;
          if (!eventPayload) return;
          const visibleBarPayload = eventPayload.find(
            (barPayload) => (barPayload.dataKey = 'valueChange')
          );
          setActivePayload(visibleBarPayload?.payload);
        }}
        onMouseLeave={() => setActivePayload(null)}>
        <CartesianGrid stroke={DEFAULT_CARTESIAN_GRID_COLOR} />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={DEFAULT_TICK_PROPS}
          height={DEFAULT_WATERFALL_X_AXIS_HEIGHT}
          stroke={DEFAULT_AXIS_COLOR}
        />
        <YAxis
          type="number"
          width={DEFAULT_Y_AXIS_WIDTH}
          stroke={DEFAULT_AXIS_COLOR}
          tick={DEFAULT_TICK_PROPS}
          tickFormatter={(timeStr) =>
            formatValue(getD3DataFormatter(yAxisFormat, timeStr), timeStr)
          }>
          <Label {...DEFAULT_LABEL_PROPS} value={yAxisLabel} position="left" angle={-90} />
        </YAxis>
        <Tooltip
          position={isClickTooltipVisible ? clickTooltipCoords : undefined}
          cursor={isClickTooltipVisible ? false : { fill: HIGHTLIGHT_BAR_COLOR }}
          wrapperStyle={{ visibility: 'visible', zIndex: 10000 }}
          content={
            <TooltipHandler
              CustomHoverTooltip={CustomHoverTooltip}
              CustomClickTooltip={CustomClickTooltip}
              isClickTooltipVisible={isClickTooltipVisible}
              closeClickTooltip={closeTooltip}
              customPayload={activePayload}
              isHidden={!activePayload}
            />
          }
        />
        {/* <Legend /> */}
        <Bar dataKey="startValue" stackId="a" fill="transparent" />
        <Bar dataKey="valueChange" stackId="a" radius={2}>
          <LabelList dataKey="valueChange" content={renderCustomizedLabel} />
          {data.map((item, index) => {
            return (
              <Cell key={index} fill={item?.color} stroke={item?.strokeColor} strokeWidth={2} />
            );
          })}
        </Bar>
        {/* <Bar stackId="a" fill="#82ca9d" shape={<TriangleBar />} /> */}
      </BarChart>
    </div>
  );
}

WaterfallPlot.propTypes = {};

export default WaterfallPlot;
