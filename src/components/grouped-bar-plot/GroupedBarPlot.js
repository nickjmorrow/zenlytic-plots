/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Label, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import formatValue from '../../utils/formatValue';
import getD3DataFormatter from '../../utils/getD3DataFormatter';
import TooltipHandler from '../tooltip-handler/TooltipHandler';

function GroupedBarPlot({
  plotColor = '#8a8a8a',
  plotSecondaryColor = '#8a8a8a',
  xAxis = {},
  yAxis = {},
  categoryAxis = {},
  onBarClick = () => {},
  data = [],
  margin = {
    top: 32,
    left: 32,
    bottom: 40,
    right: 32,
  },
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

  const colors = [
    '#0f93e5',
    '#e6ac00',
    '#d510d9',
    '#e57c04',
    '#dac611',
    '#74d912',
    '#2ac2a5',
    '#1501e5',
    '#de0c08',
  ];

  const secondaryColors = [
    '#4dbfff',
    '#ffd34b',
    '#f355f6',
    '#ffad4d',
    '#f6e655',
    '#a6f556',
    '#68e3cd',
    '#5b4dff',
    '#fa5252',
  ];

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
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis
          dataKey={xAxisKey}
          name={xAxisLabel}
          tickFormatter={(timeStr) =>
            formatValue(getD3DataFormatter(xAxisFormat, timeStr), timeStr)
          }>
          <Label value={xAxisLabel} offset={-10} position="insideBottom" />
        </XAxis>
        <YAxis
          name={yAxisLabel}
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
        <Tooltip
          position={isClickTooltipVisible ? clickTooltipCoords : undefined}
          cursor={!isClickTooltipVisible}
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
        <Legend
          layout="vertical"
          align="right"
          verticalAlign={isServerSide ? 'top' : 'middle'}
          iconType="circle"
          iconSize={12}
          wrapperStyle={{
            paddingLeft: '16px',
            paddingBottom: margin.bottom,
          }}
        />
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
