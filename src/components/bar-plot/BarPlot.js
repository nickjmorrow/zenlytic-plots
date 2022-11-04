/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  ReferenceLine,
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
  HIGHLIGHT_BAR_COLOR,
} from '../../constants/plotConstants';
import formatValue from '../../utils/formatValue';
import getD3DataFormatter from '../../utils/getD3DataFormatter';
import TooltipHandler from '../tooltip-handler/TooltipHandler';

function BarPlot({
  plotColor = '#8a8a8a',
  plotSecondaryColor = '#8a8a8a',
  xAxis = {},
  yAxis = {},
  data = [],
  margin = DEFAULT_PLOT_MARGIN,
  CustomHoverTooltip = undefined,
  CustomClickTooltip = undefined,
  width = 300,
  height = 300,
  layout = 'vertical',
  disableFollowUps = false,
  onBarClick = () => {},
}) {
  const { label: xAxisLabel, format: xAxisFormat, dataKey: xAxisDataKey } = xAxis;
  const { label: yAxisLabel, format: yAxisFormat, dataKey: yAxisDataKey } = yAxis;

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
        layout={layout}
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
        <ReferenceLine x="0" stroke={DEFAULT_AXIS_COLOR} />

        <XAxis
          height={DEFAULT_X_AXIS_HEIGHT}
          stroke={DEFAULT_AXIS_COLOR}
          tick={DEFAULT_TICK_PROPS}
          type="number"
          dataKey={xAxisDataKey}
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
          type="category"
          dataKey={yAxisDataKey}
          name={yAxisLabel}
          tickFormatter={(timeStr) =>
            formatValue(getD3DataFormatter(yAxisFormat, timeStr), timeStr)
          }></YAxis>
        <Tooltip
          position={isClickTooltipVisible ? clickTooltipCoords : undefined}
          cursor={isClickTooltipVisible ? false : { fill: HIGHLIGHT_BAR_COLOR }}
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
          formatter={(value) =>
            formatValue(
              getD3DataFormatter(layout === 'vertical' ? xAxisFormat : yAxisFormat, value),
              value
            )
          }
          labelFormatter={(value) =>
            formatValue(
              getD3DataFormatter(layout === 'vertical' ? yAxisFormat : xAxisFormat, value),
              value
            )
          }
        />

        <Bar
          dataKey={xAxisDataKey}
          name={xAxisLabel}
          onMouseMove={(bar) => {
            setHoveredBarKey(bar?.id);
          }}
          onMouseLeave={() => setHoveredBarKey(null)}
          radius={[0, 5, 5, 0]}
          strokeWidth={2}>
          {data.map((entry, index) => {
            return (
              <Cell
                key={`cell-${index}`}
                fill={entry.fill || plotSecondaryColor}
                stroke={entry.stroke || plotColor}
              />
            );
          })}
        </Bar>
      </BarChart>
    </div>
  );
}

BarPlot.propTypes = {};

export default BarPlot;
