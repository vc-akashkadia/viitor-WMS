import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
export default function TableForm(props) {
  const {
    data,
    columnsData,
    wrapperClasses,
    keyField,
    selectRow
  } = props;
  
  return (
      <BootstrapTable 
        keyField={keyField}
        data={data}
        wrapperClasses={wrapperClasses}
        columns={columnsData}
        responsive="sm"
        selectRow={selectRow}
        {...props}
      />
  );
}
