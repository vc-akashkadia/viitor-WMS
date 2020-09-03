import React, { forwardRef } from "react";
import MaterialTable from "material-table";

import CancelIcon from '@material-ui/icons/Cancel';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
  tableCard: {
    padding: 5,
    marginBottom: 10
  },
  dataTable: {
    // border: '1px solid #000'
  },
  tableTh: {
    borderRight: '1px solid #000',
    borderBottom: '1px solid #000',
    borderLeft: '1px solid #000',
    borderTop: '1px solid #000',
    fontSize: 12
  },
});

export default function MaterialTableDemo() {
  const classes = useStyles()
  // const [state, setState] = React.useState({
  //   columns: [
  //     { title: "D.Code", field: "dcode" ,lookup: { D12: 'D13',D13: 'D14' },},
  //     { title: "Description", field: "description" },
  //     {
  //       title: "Birth Place",
  //       field: "birthCity",
  //       lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
  //     }
  //   ],
  //   data: [
  //     { dcode: "D12", description: "Baran"},
  //     {
  //       name: "Zerya Betül",
  //       surname: "Baran",
  //       birthYear: 2017,
  //       birthCity: 34
  //     }
  //   ]
  // });
  // const tableIcons = {
  //   Add: forwardRef((props, ref) => <AddCircleIcon {...props} ref={ref} />),
  //   Delete: forwardRef((props, ref) => <CancelIcon {...props} ref={ref} />),
  //   SortArrow: forwardRef((props, ref) => <ArrowUpwardIcon {...props} ref={ref} />),
  //   Check: forwardRef((props, ref) => <AddCircleIcon {...props} ref={ref} />),
  //   Clear: forwardRef((props, ref) => <CancelIcon {...props} ref={ref} />),

  // }
  // const options={
  //     search:false,
  //     showTitle:false,
  //     clear:false,
  //     paging:false,
  //     actionsColumnIndex: -1
  // }

  return (
    // <MaterialTable
    //   title="Editable Example"
    //   columns={state.columns}
    //   data={state.data}
    //   options={options}
    //   icons={tableIcons}
    //   editable={{
    //     onRowAdd: (newData) =>
    //       new Promise((resolve) => {
    //         setTimeout(() => {
    //           resolve();
    //           setState((prevState) => {
    //             const data = [...prevState.data];
    //             data.push(newData);
    //             return { ...prevState, data };
    //           });
    //         }, 600);
    //       }),
    //     onRowDelete: (oldData) =>
    //       new Promise((resolve) => {
    //         setTimeout(() => {
    //           resolve();
    //           setState((prevState) => {
    //             const data = [...prevState.data];
    //             data.splice(data.indexOf(oldData), 1);
    //             return { ...prevState, data };
    //           });
    //         }, 600);
    //       })
    //   }}
    // />
    <Card className={classes.tableCard}>
      <table className={classes.dataTable}>
        <thead>
          <tr>
            <th className={classes.tableTh}>D.Code</th>
            <th className={classes.tableTh}>Description</th>
            <th className={classes.tableTh}>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={classes.tableTh}>D13</td>
            <td className={classes.tableTh}>Baran</td>
            <td className={classes.tableTh}><CancelIcon /></td>
          </tr>
        </tbody>
      </table>
    </Card>

  );
}
