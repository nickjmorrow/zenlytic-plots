/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/require-default-props */
import { AxisBottom, AxisLeft } from '@visx/axis';
import { LinearGradient } from '@visx/gradient';
import { GridColumns } from '@visx/grid';
import { Group } from '@visx/group';
import { PatternLines } from '@visx/pattern';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { PLOT_MARGIN, SCALE_TYPES } from 'constants/plotConstants';
import PropTypes from 'prop-types';

import Lines from './components/lines/Lines';
import { getValue } from './util/accessors';
import getXScale from './util/getXScale';
import getYScale from './util/getYScale';
import Brush from './components/brush/Brush';
import getD3DataFormatter from '../../utils/getD3DataFormatter';
import { scaleOrdinal } from '@visx/scale';
import { PLOT_COLOR_PALETTE } from '../../constants/plotConstants';
import getColorScale from './util/getColorScale';

function LinePlot({
  height = 300,
  width = 300,
  lines = [
    [
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-05-11T00:00:00',
        ORDERS_TOTAL_REVENUE: 14157.5,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-05-12T00:00:00',
        ORDERS_TOTAL_REVENUE: 13975.5,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-05-13T00:00:00',
        ORDERS_TOTAL_REVENUE: 13993,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-05-14T00:00:00',
        ORDERS_TOTAL_REVENUE: 14088,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-05-15T00:00:00',
        ORDERS_TOTAL_REVENUE: 14731.5,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-05-16T00:00:00',
        ORDERS_TOTAL_REVENUE: 15039.5,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-05-17T00:00:00',
        ORDERS_TOTAL_REVENUE: 15060,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-05-18T00:00:00',
        ORDERS_TOTAL_REVENUE: 16042.5,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-05-19T00:00:00',
        ORDERS_TOTAL_REVENUE: 14914.5,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-05-20T00:00:00',
        ORDERS_TOTAL_REVENUE: 15413,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-05-21T00:00:00',
        ORDERS_TOTAL_REVENUE: 15946.5,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-05-22T00:00:00',
        ORDERS_TOTAL_REVENUE: 12591.5,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-05-23T00:00:00',
        ORDERS_TOTAL_REVENUE: 15361,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-05-24T00:00:00',
        ORDERS_TOTAL_REVENUE: 16153,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-05-25T00:00:00',
        ORDERS_TOTAL_REVENUE: 16485.5,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-05-26T00:00:00',
        ORDERS_TOTAL_REVENUE: 13294,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-05-27T00:00:00',
        ORDERS_TOTAL_REVENUE: 13637.5,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-05-31T00:00:00',
        ORDERS_TOTAL_REVENUE: 44971,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-06-01T00:00:00',
        ORDERS_TOTAL_REVENUE: 13563,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-06-02T00:00:00',
        ORDERS_TOTAL_REVENUE: 12669,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-06-03T00:00:00',
        ORDERS_TOTAL_REVENUE: 41311,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-06-04T00:00:00',
        ORDERS_TOTAL_REVENUE: 37940,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-06-05T00:00:00',
        ORDERS_TOTAL_REVENUE: 39942,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-06-06T00:00:00',
        ORDERS_TOTAL_REVENUE: 42749,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-06-07T00:00:00',
        ORDERS_TOTAL_REVENUE: 38493.5,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-06-08T00:00:00',
        ORDERS_TOTAL_REVENUE: 43073,
      },
      {
        ORDERS_ORDER_CREATED_AT_DATE: '2022-06-09T00:00:00',
        ORDERS_TOTAL_REVENUE: 44876.5,
      },
    ],
  ],
  yAxisZenlyticFormat,
  xAxisZenlyticFormat,
  backgroundColor = 'transparent',
  accentColor = 'lightgray',
  axisColor = '#8A8A8A',
  plotColor = '#8a8a8a',
  yAxisNumberOfTicks = 4,
  xAxisDataIndex,
  yAxisDataIndex,
  categoryDataIndex,
  categoryLabel,
  categoryZenlyticFormat,
  xAxisLabel,
  yAxisLabel,
  useBrush = false,
}) {
  const plotId = uuidv4();

  const PATTERN_ID = 'brush_pattern';

  const axisBottomTickLabelProps = {
    textAnchor: 'middle',
    fontFamily: 'GT-Zirkon',
    fontSize: 10,
  };

  const scaleType = SCALE_TYPES.UTC;

  const innerHeight = height - PLOT_MARGIN.top - PLOT_MARGIN.bottom;
  const innerWidth = width - PLOT_MARGIN.left - PLOT_MARGIN.right;

  const xMax = Math.max(innerWidth, 0);
  const yMax = Math.max(innerHeight, 0);

  const xScale = getXScale(lines, xAxisDataIndex, xMax, scaleType);
  const yScale = getYScale(lines, yAxisDataIndex, yMax);
  const colorScale = getColorScale(lines, categoryDataIndex);

  const getXValue = (d) => getValue(d, xAxisDataIndex, scaleType);
  const getYValue = (d) => getValue(d, yAxisDataIndex);

  const yAxisD3Format = getD3DataFormatter(yAxisZenlyticFormat);
  const xAxisD3Format = getD3DataFormatter(xAxisZenlyticFormat);

  if (width < 10) return null;
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      style={{ overflow: 'visible' }}>
      <Group left={PLOT_MARGIN.left} top={PLOT_MARGIN.top}>
        <LinearGradient
          id="area-background-gradient"
          from={backgroundColor}
          to={backgroundColor}
          rotate={45}
        />
        <GridColumns
          scale={xScale}
          height={innerHeight}
          stroke={accentColor}
          strokeOpacity={0.2}
          pointerEvents="none"
        />
        <PatternLines
          id={PATTERN_ID}
          height={8}
          width={8}
          stroke={axisColor}
          strokeWidth={2}
          orientation={['diagonal']}
        />
        <AxisBottom
          top={yMax}
          scale={xScale}
          numTicks={width < 700 ? 4 : null}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={() => axisBottomTickLabelProps}
          label={xAxisLabel}
        />
        <AxisLeft
          scale={yScale}
          numTicks={yAxisNumberOfTicks}
          stroke={axisColor}
          tickStroke={axisColor}
          tickFormat={yScale.tickFormat(6, yAxisD3Format)}
          label={yAxisLabel}
          labelOffset={50}
        />
        <Lines
          lines={lines}
          xScale={xScale}
          yScale={yScale}
          getXValue={getXValue}
          getYValue={getYValue}
          xAxisDataIndex={xAxisDataIndex}
          yAxisDataIndex={yAxisDataIndex}
          scaleType={scaleType}
          plotId={plotId}
          plotColor={plotColor}
          categoryDataIndex={categoryDataIndex}
          colorScale={colorScale}
        />
        <Brush
          xAxisZenlyticFormat={xAxisZenlyticFormat}
          xScale={xScale}
          yScale={yScale}
          margin={PLOT_MARGIN}
          useBrush={useBrush}
          xMax={xMax}
          yMax={yMax}
        />
      </Group>
    </svg>
  );
}

export default LinePlot;

LinePlot.propTypes = {
  /**
   * How wide the plot should be
   */
  height: PropTypes.number,
  /**
   * How tall the plot should be
   */
  width: PropTypes.number,
  /**
   * Each line is an array of points to draw on the plot.
   */
  lines: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  /**
   * The format of the y-axis
   */
  yAxisFormat: PropTypes.string,
  /**
   * Approximately how many y-axis ticks will be drawn
   */
  yAxisNumberOfTicks: PropTypes.number,
  /**
   * Starting part of the gradient that will go under the line
   */
  axisColor: PropTypes.string,
  /**
   * The color of the secondary plot items, like the grid columns
   */
  accentColor: PropTypes.string,
  /**
   * The color of the plot background
   */
  backgroundColor: PropTypes.string,
  /**
   * For a line point, the key to get the the x-axis value
   */
  xAxisDataIndex: PropTypes.string,
  /**
   * For a line point, the key to get the the y-axis value
   */
  yAxisDataIndex: PropTypes.string,
  /**
   * The x-axis label
   */
  xAxisLabel: PropTypes.string,
  /**
   * The y-axis label
   */
  yAxisLabel: PropTypes.string,
};
