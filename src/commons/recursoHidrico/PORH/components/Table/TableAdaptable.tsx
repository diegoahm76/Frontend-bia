/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import type { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

interface TableProps {
  data: any[]; // data array for the table
  columns: string[]; // data array for the column names
  actionIcons: any[]; // data array for the action icons
}

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export const TableAdaptable = ({
  data,
  columns,
  actionIcons
}: TableProps): ReactElement => {
  const classes = useStyles();

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          {columns.map((column, index) => (
            <TableCell key={index}>{column}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column, columnIndex) => {
              if (column === 'Actions') {
                return (
                  <TableCell key={columnIndex}>
                    {' '}
                    {actionIcons.map((actionIcon, actionIconIndex) => {
                      return (
                        <div key={actionIconIndex}>
                          {actionIcon.iconEdit}
                          {actionIcon.iconDelete}
                        </div>
                      );
                    })}
                  </TableCell>
                );
              } else {
                return (
                  <TableCell key={columnIndex}>
                    {row[column.toLowerCase()]}
                  </TableCell>
                );
              }
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
