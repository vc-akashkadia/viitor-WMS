import React from "react";

import CancelIcon from '@material-ui/icons/Cancel';

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
  

  return (
    
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
