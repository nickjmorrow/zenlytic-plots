/* eslint-disable react/jsx-filename-extension */
import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import formatValue from '../../utils/formatValue';
import getD3DataFormatter from '../../utils/getD3DataFormatter';
import TooltipHandler from '../tooltip-handler/TooltipHandler';
import SimpleTable from './components/simple-table/SimpleTable';

const valueFormatter = (params) => {
  return formatValue(getD3DataFormatter(params.colDef.formatter, params.value), params.value);
};

const createTableColumn = (column) => {
  return {
    field: column.value,
    headerName: column.label,
    formatter: column.formatter,
    sortable: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    id: column.id,
    type: column.type,
    fieldType: column.fieldType,
    valueFormatter,
  };
};

function TablePlot({
  data = [],
  columns = [],
  margin = {
    top: '40px',
    left: '32px',
    bottom: '16px',
    right: '32px',
  },
  width = 300,
  height = 300,
  CustomHoverTooltip = undefined,
  CustomClickTooltip = undefined,
  isServerSide = false,
}) {
  const gridStyle = useMemo(
    () => ({
      height: '100%',
      width: '100%',
      paddingTop: margin.top,
      paddingBottom: margin.bottom,
      paddingLeft: margin.left,
      paddingRight: margin.right,
    }),
    [margin]
  );
  const popupParent = useMemo(() => {
    if (isServerSide) return undefined;
    return document.querySelector('body');
  }, [isServerSide]);

  const tableColumns = useMemo(() => {
    return columns.map((column) => createTableColumn(column));
  }, [columns]);

  if (isServerSide) {
    return <SimpleTable data={data} columns={columns} />;
  }

  return (
    <div className="ag-theme-alpine" style={gridStyle}>
      <AgGridReact
        rowData={data}
        columnDefs={tableColumns}
        multiSortKey={'ctrl'}
        animateRows
        rowSelection="multiple"
        suppressRowClickSelection
        suppressMenuHide
        popupParent={popupParent}
      />
    </div>
  );
}

TablePlot.propTypes = {};

export default TablePlot;
