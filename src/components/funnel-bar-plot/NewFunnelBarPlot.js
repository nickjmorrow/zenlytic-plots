/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { PLOT_COLORS, PLOT_SECONDARY_COLORS } from '../../constants/plotConstants';

import {
  getCategoriesOfCategoryAxis,
  getData,
  getIsDataPivoted,
  getMargin,
  getSeriesFillColor,
  getSeriesStrokeColor,
  getUniqueValuesOfDataKey,
  getXAxis,
  getYAxis,
  getYAxisDataKey,
} from '../../utils/plotConfigGetters';
import GridLines from '../shared/grid-lines/GridLines';
import XAxis from '../shared/x-axis/XAxis';
import YAxis from '../shared/y-axis/YAxis';

function FunnelBarPlot({ plotConfig = {} }) {
  const xAxisConfig = getXAxis(plotConfig);
  const yAxisConfig = getYAxis(plotConfig);

  const yAxisDataKey = getYAxisDataKey(plotConfig);

  const data = getData(plotConfig);
  console.log('🚀 ~ file: NewFunnelBarPlot.js ~ line 30 ~ FunnelBarPlot ~ data', data);
  const margin = getMargin(plotConfig);

  const categoriesOfCategoryAxis = getCategoriesOfCategoryAxis(plotConfig);

  const seriesStrokeColor = getSeriesStrokeColor(plotConfig);
  const seriesFillColor = getSeriesFillColor(plotConfig);

  const isDataPivoted = getIsDataPivoted(plotConfig);

  return (
    <ResponsiveContainer>
      <BarChart data={data} margin={margin}>
        {GridLines()}
        {XAxis({ ...xAxisConfig })}
        {YAxis({})}
        <Tooltip />
        <>
          {isDataPivoted &&
            categoriesOfCategoryAxis.map((category, index) => {
              const { name: categoryName } = category;
              const convertedDataKey = `CONVERTED_${categoryName}`;
              console.log(
                '🚀 ~ file: NewFunnelBarPlot.js ~ line 52 ~ categoriesOfCategoryAxis.map ~ convertedDataKey',
                convertedDataKey
              );
              const droppedOffDataKey = `DROPPED_OFF_${categoryName}`;
              return (
                <>
                  <Bar
                    stackId={categoryName}
                    dataKey={convertedDataKey}
                    name={`Converted - ${categoryName}`}
                    stroke={PLOT_COLORS[index % PLOT_COLORS.length]}
                    fill={PLOT_COLORS[index % PLOT_COLORS.length]}
                  />
                  <Bar
                    stackId={categoryName}
                    dataKey={droppedOffDataKey}
                    name={`Dropped Off - ${categoryName}`}
                    stroke={PLOT_SECONDARY_COLORS[index % PLOT_SECONDARY_COLORS.length]}
                    fill={PLOT_SECONDARY_COLORS[index % PLOT_SECONDARY_COLORS.length]}
                  />
                </>
              );
            })}
          {/* {isDataPivoted &&
            categoriesOfCategoryAxis.map((category, index) => {
              const { name: categoryName } = category;
               const convertedDataKey = `CONVERTED_${categoryName}`;
              const droppedOffDataKey = `DROPPED_OFF_${categoryName}`;
              console.log(
                '🚀 ~ file: NewFunnelBarPlot.js ~ line 58 ~ categoriesOfCategoryAxis.map ~ droppedOffDataKey',
                droppedOffDataKey
              );

              return (
                <>
                  <Bar
                    stroke={PLOT_COLORS[index % PLOT_COLORS.length]}
                    fill={PLOT_COLORS[index % PLOT_COLORS.length]}
                    dataKey={convertedDataKey}
                    name={`Converted: ${categoryName}`}
                    stackId={category}
                    // key={categoryName}
                    // stackId={seriesName}
                  />
                  <Bar
                    stroke={PLOT_SECONDARY_COLORS[index % PLOT_SECONDARY_COLORS.length]}
                    fill={PLOT_SECONDARY_COLORS[index % PLOT_SECONDARY_COLORS.length]}
                    dataKey={droppedOffDataKey}
                    name={`Dropped off: ${categoryName}`}
                    stackId={category}
                    // key={categoryName}
                    // stackId={seriesName}
                  />
                </>
              );
            })} */}
          {!isDataPivoted && (
            <>
              <Bar
                name={'Converted'}
                dataKey={'CONVERTED'}
                fill={seriesStrokeColor}
                stackId="a"
                radius={[3, 3, 0, 0]}
              />
              <Bar
                name={'Dropped Off'}
                dataKey={'DROPPED_OFF'}
                fill={seriesFillColor}
                stackId="a"
                radius={[3, 3, 0, 0]}
              />
            </>
          )}
        </>
      </BarChart>
    </ResponsiveContainer>
  );
}

FunnelBarPlot.propTypes = {};

export default FunnelBarPlot;
