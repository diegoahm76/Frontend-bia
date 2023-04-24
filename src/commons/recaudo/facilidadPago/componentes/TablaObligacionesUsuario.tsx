/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { Link } from 'react-router-dom';

interface Data {
  name: string;
  fechaInicio: string;
  expediente: string;
  nroResolucion: string;
  valorCapital: number;
  valorIntereses: number;
  diasMora: number;
  valorAbonado: number;
  estado: string;
}

function createData(
  name: string,
  fechaInicio: string,
  expediente: string,
  nroResolucion: string,
  valorCapital: number,
  valorIntereses: number,
  diasMora: number,
  valorAbonado: number,
  estado: string,
): Data {
  return {
    name,
    fechaInicio,
    expediente,
    nroResolucion,
    valorCapital,
    valorIntereses,
    diasMora,
    valorAbonado,
    estado
  };
}

const rows = [
  createData('Permiso 1', '01/01/2015', '378765', '378765-143', 120000000, 35000000, 390, 21000000, 'En Curso'),
  createData('Concesion Aguas', '01/04/2015', '3342765', '3342765-4546', 190700000, 45000000, 180, 76000000, 'En Curso'),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Nombre Obligación',
  },
  {
    id: 'fechaInicio',
    numeric: false,
    disablePadding: true,
    label: 'Fecha Inicio',
  },
  {
    id: 'expediente',
    numeric: false,
    disablePadding: true,
    label: 'Expediente',
  },
  {
    id: 'nroResolucion',
    numeric: false,
    disablePadding: true,
    label: 'Nro. Resolución',
  },
  {
    id: 'valorCapital',
    numeric: true,
    disablePadding: false,
    label: 'Valor Capital',
  },
  {
    id: 'valorIntereses',
    numeric: true,
    disablePadding: false,
    label: 'Valor Intereses',
  },
  {
    id: 'diasMora',
    numeric: true,
    disablePadding: false,
    label: 'Días Mora',
  },
  {
    id: 'valorAbonado',
    numeric: true,
    disablePadding: false,
    label: 'Valor Abonado',
  },
  {
    id: 'estado',
    numeric: false,
    disablePadding: true,
    label: 'Estado',
  }
];

const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'valorCapital';
const DEFAULT_ROWS_PER_PAGE = 5;

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, newOrderBy: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (newOrderBy: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, newOrderBy);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all options',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            padding='normal'
            sortDirection={orderBy === headCell.id ? order : false}

          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <strong>{headCell.label}</strong>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell
          align='left'
          padding='normal'
        >
          Ver
        </TableCell>
      </TableRow>
    </TableHead>
  );
}


export const TablaObligacionesUsuario: React.FC = () => {
  const [order, setOrder] = useState<Order>(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState<keyof Data>(DEFAULT_ORDER_BY);
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [visibleRows, setVisibleRows] = useState<Data[] | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = useState(0);
  const [capital, setCapital] = useState(0);
  const [intereses, setIntereses] = useState(0);
  const [abonado, setAbonado] = useState(0);

  useEffect(() => {
    let subCapital = 0
    let subIntereses = 0
    let subAbonado = 0
    for(let i=0; i < rows.length; i++){
      for(let j=0; j < selected.length; j++){
        if(rows[i].name === selected[j]){
          subCapital = subCapital + rows[i].valorCapital
          subIntereses = subIntereses + rows[i].valorIntereses
          subAbonado = subAbonado + rows[i].valorAbonado
          setCapital(subCapital)
          setIntereses(subIntereses)
          setAbonado(subAbonado)
        }
      }
    }
    if(selected.length === 0){
      setCapital(0)
      setIntereses(0)
      setAbonado(0)
    }
  }, [selected])

  useEffect(() => {
    let rowsOnMount = stableSort(
      rows,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY),
    );
    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
    );

    setVisibleRows(rowsOnMount);
  }, []);

  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, newOrderBy: keyof Data) => {
      const isAsc = orderBy === newOrderBy && order === 'asc';
      const toggledOrder = isAsc ? 'desc' : 'asc';
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(rows, getComparator(toggledOrder, newOrderBy));
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      );
      setVisibleRows(updatedRows);
    },
    [order, orderBy, page, rowsPerPage],
  );

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => {
      setPage(newPage);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage,
      );
      setVisibleRows(updatedRows);

      // Avoid a layout jump when reaching the last page with empty rows.
      const numEmptyRows =
        newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length) : 0;

      const newPaddingHeight = (53) * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
    },
    [order, orderBy, rowsPerPage],
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage,
      );
      setVisibleRows(updatedRows);
      setPaddingHeight(0);
    },
    [order, orderBy],
  );

  const isSelected = (name: string) => selected.includes(name);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {(visibleRows != null)
                ? visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => { handleClick(event, row.name); }}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="normal"
                          align='left'
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="left" padding="normal">{row.fechaInicio}</TableCell>
                        <TableCell align="left" padding="normal">{row.nroResolucion}</TableCell>
                        <TableCell align="left" padding="normal">{row.valorCapital}</TableCell>
                        <TableCell align="left" padding="normal">{row.expediente}</TableCell>
                        <TableCell align="left" padding="normal">{row.valorIntereses}</TableCell>
                        <TableCell align="left" padding="normal">{row.diasMora}</TableCell>
                        <TableCell align="left" padding="normal">{row.valorAbonado}</TableCell>
                        <TableCell align="left" padding="normal">{row.estado}</TableCell>
                        <TableCell align="left" padding="normal"><Link to={`registro`}>Ver</Link></TableCell>
                      </TableRow>
                    );
                  })
                : null}
                <TableRow>
                  <TableCell align="left" padding="normal"></TableCell>
                  <TableCell align="left" padding="normal"></TableCell>
                  <TableCell align="left" padding="normal"></TableCell>
                  <TableCell align="left" padding="normal"></TableCell>
                  <TableCell align="left" padding="normal"><strong>Total</strong></TableCell>
                  <TableCell align="left" padding="normal"><strong>{capital}</strong></TableCell>
                  <TableCell align="left" padding="normal"><strong>{intereses}</strong></TableCell>
                  <TableCell align="left" padding="normal"></TableCell>
                  <TableCell align="left" padding="normal"><strong>{abonado}</strong></TableCell>
                  <TableCell align="left" padding="normal"></TableCell>
                  <TableCell align="left" padding="normal"></TableCell>
                </TableRow>
              {paddingHeight > 0 && (
                <TableRow
                  style={{
                    height: paddingHeight,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
