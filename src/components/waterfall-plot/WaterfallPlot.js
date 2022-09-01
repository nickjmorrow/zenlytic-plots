/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
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
} from "recharts";
import formatValue from "../../utils/formatValue";
import TooltipHandler from "../tooltip-handler/TooltipHandler";
import getD3DataFormatter from "../../utils/getD3DateFormatter";

function WaterfallPlot({
  plotColor = "#8a8a8a",
  xAxis = {},
  yAxis = {},
  data = [],
  margin = {
    top: 32,
    left: 32,
    bottom: 40,
    right: 32,
  },
  width = 300,
  height = 300,
  onBarClick = () => {},
  disableFollowUps = false,
  CustomHoverTooltip = undefined,
  CustomClickTooltip = undefined,
}) {
  const {
    label: xAxisLabel = "X-Axis",
    format: xAxisFormat,
    dataKey: xAxisKey,
  } = xAxis;
  const {
    label: yAxisLabel = "Y-Axis",
    format: yAxisFormat,
    dataKey: yAxisKey,
  } = yAxis;

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

    const verticalOffset = height >= 0 ? 10 : -10;
    const textColor = height >= 0 ? "green" : "red";

    if (index === 0 || index === data.length - 1) return null;
    return (
      <g>
        <text
          x={x + width / 2}
          y={y - verticalOffset}
          position="top"
          fill={textColor}
          textAnchor="middle"
          dominantBaseline="middle"
        >
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
    if (disableFollowUps) return;
    if (isClickTooltipVisible) {
      return;
    }
    const { activePayload: eventPayload = [] } = event;
    const visibleBarPayload = eventPayload.find(
      (barPayload) => (barPayload.dataKey = "valueChange")
    );
    if (!visibleBarPayload) {
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
    <div style={{ userSelect: "none" }}>
      <BarChart
        margin={margin}
        height={height}
        width={width}
        data={data}
        onClick={handleBarClick}
        onMouseMove={(event) => {
          const { activePayload: eventPayload = [] } = event;
          const visibleBarPayload = eventPayload.find(
            (barPayload) => (barPayload.dataKey = "valueChange")
          );
          setActivePayload(visibleBarPayload?.payload);
        }}
        onMouseLeave={() => setActivePayload(null)}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis
          type="number"
          width={80}
          tickFormatter={(timeStr) =>
            formatValue(getD3DataFormatter(yAxisFormat, timeStr), timeStr)
          }
        >
          <Label
            value={yAxisLabel}
            position="insideLeft"
            angle={-90}
            style={{ textAnchor: "middle" }}
          />
        </YAxis>
        <Tooltip
          position={isClickTooltipVisible ? clickTooltipCoords : undefined}
          cursor={!isClickTooltipVisible}
          wrapperStyle={{ visibility: "visible", zIndex: 10000 }}
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
              <Cell
                key={index}
                fill={item?.color}
                stroke={item?.strokeColor}
                strokeWidth={2}
              />
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
