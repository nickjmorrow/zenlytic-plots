/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Label, Tooltip, XAxis, YAxis } from 'recharts';
import {
  DEFAULT_AXIS_COLOR,
  DEFAULT_CARTESIAN_GRID_COLOR,
  DEFAULT_LABEL_PROPS,
  DEFAULT_PLOT_MARGIN,
  DEFAULT_TICK_PROPS,
  DEFAULT_X_AXIS_HEIGHT,
  DEFAULT_Y_AXIS_WIDTH,
  HIGHTLIGHT_BAR_COLOR,
  PLOT_COLORS,
  PLOT_SECONDARY_COLORS,
} from '../../constants/plotConstants';
import formatValue from '../../utils/formatValue';
import getD3DataFormatter from '../../utils/getD3DataFormatter';
import TooltipHandler from '../tooltip-handler/TooltipHandler';
import ZenlyticLegend from '../zenlytic-legend/ZenlyticLegend';

function GroupedBarPlot({
  plotColor = '#8a8a8a',
  plotSecondaryColor = '#8a8a8a',
  xAxis = {},
  yAxis = {},
  categoryAxis = {},
  onBarClick = () => {},
  data = [],
  margin = DEFAULT_PLOT_MARGIN,
  CustomHoverTooltip = undefined,
  CustomClickTooltip = undefined,
  width = 300,
  height = 300,
  layout = 'horizontal',
  disableFollowUps = false,
  isServerSide = false,
}) {
  const { label: xAxisLabel, format: xAxisFormat, dataKey: xAxisKey } = xAxis;
  const { label: yAxisLabel, format: yAxisFormat, dataKey: yAxisKey } = yAxis;
  const {
    label: categoryAxisLabel,
    format: categoryAxisFormat,
    dataKey: categoryAxisKey,
  } = categoryAxis;

  const colors = PLOT_COLORS;
  const secondaryColors = PLOT_SECONDARY_COLORS;

  const [hoveredBarKey, setHoveredBarKey] = useState(null);
  const [activePayload, setActivePayload] = useState(null);
  const [isClickTooltipVisible, setIsClickTooltipVisible] = useState(false);
  const [clickTooltipCoords, setClickTooltipCoords] = useState();

  const closeTooltip = () => {
    setClickTooltipCoords(null);
  };
  const handleBarClick = (event) => {
    if (isClickTooltipVisible) {
      return;
    }
    if (!hoveredBarKey) {
      return;
    }
    if (!event) return;
    setClickTooltipCoords(event.activeCoordinate);
  };

  useEffect(() => {
    if (disableFollowUps) return;
    if (clickTooltipCoords) {
      setIsClickTooltipVisible(true);
      onBarClick(activePayload);
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
        barGap={6}
        onClick={handleBarClick}
        onMouseMove={(e) => {
          const foundPayload = e.activePayload?.filter((bar) => {
            return bar.dataKey === hoveredBarKey;
          });
          if (!foundPayload) return;
          if (!foundPayload.length) {
            setActivePayload(e.activePayload);
            return;
          }
          setActivePayload(foundPayload);
        }}
        onMouseLeave={(e) => {
          setActivePayload(null);
        }}>
        <CartesianGrid stroke={DEFAULT_CARTESIAN_GRID_COLOR} />
        <XAxis
          height={DEFAULT_X_AXIS_HEIGHT}
          stroke={DEFAULT_AXIS_COLOR}
          tick={DEFAULT_TICK_PROPS}
          dataKey={xAxisKey}
          name={xAxisLabel}
          tickFormatter={(timeStr) =>
            formatValue(getD3DataFormatter(xAxisFormat, timeStr), timeStr)
          }>
          <Label {...DEFAULT_LABEL_PROPS} value={xAxisLabel} position="bottom" />
        </XAxis>
        <YAxis
          stroke={DEFAULT_AXIS_COLOR}
          width={DEFAULT_Y_AXIS_WIDTH}
          tick={DEFAULT_TICK_PROPS}
          name={yAxisLabel}
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
            />
          }
          formatter={(value) => formatValue(getD3DataFormatter(yAxisFormat, value), value)}
          labelFormatter={(value) => formatValue(getD3DataFormatter(xAxisFormat, value), value)}
        />
        {ZenlyticLegend({
          margin,
          isServerSide,
          iconType: 'square',
          useStrokeColorShape: true,
        })}
        {/* {data?.map((bar) => {
          <Bar dataKey="value" name={xAxisLabel} fill={plotColor} />;
        })} */}
        {Object.keys(data[0]).map((key, index) => {
          if (key === xAxisKey) return false;
          return (
            <Bar
              onMouseMove={() => setHoveredBarKey(key)}
              onMouseLeave={() => setHoveredBarKey(null)}
              dataKey={key}
              fill={secondaryColors[index % secondaryColors.length]}
              stroke={colors[index % colors.length]}
              fillOpacity={key === hoveredBarKey ? 1.0 : hoveredBarKey === null ? 1.0 : 0.2}
              radius={[3, 3, 0, 0]}
              strokeWidth={2}
              strokeOpacity={key === hoveredBarKey ? 1.0 : hoveredBarKey === null ? 1.0 : 0.2}
            />
          );
        })}
      </BarChart>
    </div>
  );
}

GroupedBarPlot.propTypes = {};

export default GroupedBarPlot;
