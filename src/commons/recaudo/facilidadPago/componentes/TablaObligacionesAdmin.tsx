/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { useState, useEffect, useCallback } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Paper, Modal, Typography, Stack, Button, TextField } from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import { SearchOutlined, FilterAltOffOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface Data {
  name: string;
  identificacion: string;
  obligacion: string;
  nroObligacion: string;
  nroResolucion: string;
  fechaRadicacion: string;
}

function createData(
  name: string,
  identificacion: string,
  obligacion: string,
  nroObligacion: string,
  nroResolucion: string,
  fechaRadicacion: string,
): Data {
  return {
    name,
    identificacion,
    obligacion,
    nroObligacion,
    nroResolucion,
    fechaRadicacion
  };
}

const rows = [
  createData('Koch and Sons', '10298723', 'Concesión Agua Superficial', '378765', '543', '01/01/2022'),
  createData('Steuber LLC', '2346448723', 'Permiso Perforación', '412333', '432', '01/01/2022'),
  createData('Konopelski Group', '43214134', 'Pago Tasa TUA', '7564332', '2543', '01/01/2022'),
  createData('Harber Inc', '34545437', 'Uso Agua Subterranea', '59493285', '6543', '01/01/2022'),
];

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
    label: 'Nombre Usuario',
  },
  {
    id: 'identificacion',
    numeric: false,
    disablePadding: true,
    label: 'Identificación',
  },
  {
    id: 'obligacion',
    numeric: false,
    disablePadding: true,
    label: 'Nombre Obligación',
  },
  {
    id: 'nroObligacion',
    numeric: false,
    disablePadding: true,
    label: 'Número Obligación',
  },
  {
    id: 'nroResolucion',
    numeric: false,
    disablePadding: true,
    label: 'Número Resolución',
  },
  {
    id: 'fechaRadicacion',
    numeric: false,
    disablePadding: true,
    label: 'Fecha Radicación',
  },
];

const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'nroObligacion';
const DEFAULT_ROWS_PER_PAGE = 5;

interface event {
  target: {
    value: string
  }
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, newOrderBy: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (newOrderBy: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, newOrderBy);
    };

  return (
    <TableHead>
      <TableRow>
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
        <TableCell
          align='left'
          padding='normal'
        >
          Asignación
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export const TablaObligacionesAdmin: React.FC = () => {
  const [order, setOrder] = useState<Order>(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState<keyof Data>(DEFAULT_ORDER_BY);
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [visibleRows, setVisibleRows] = useState<Data[] | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = useState(0);
  const [open, setOpen] = useState(false);
  const [openSubModal, setOpenSubModal] = useState(false);
  const [optionModal, setOptionModal] = useState('');
  const handleOpen = () => { setOpen(true) };
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

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

  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        direction="row"
        justifyContent="left"
        spacing={2}
        sx={{ mb: '20px' }}
      >
        <FormControl sx={{ minWidth: 130 }}>
          <InputLabel id="demo-simple-select-label">Filtrar por: </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="filter"
              label="Filtrar por: "
              onChange={(event: event)=>{
                const { value } = event.target
                setFilter(value)
              }}
            >
              <MenuItem value='name'>Nombre Usuario</MenuItem>
              <MenuItem value='identificacion'>Identificación</MenuItem>
              <MenuItem value='obligacion'>Nombre Obligación</MenuItem>
              <MenuItem value='nroObligacion'>Número Obligación</MenuItem>
              <MenuItem value='nroResolucion'>Número Resolución</MenuItem>
            </Select>
        </FormControl>
        <TextField
          required
          id="outlined-error-helper-text"
          label="Búsqueda"
          size="medium"
          onChange={(event: event)=>{
            const { value } = event.target
            setSearch(value)
          }}
        />
        <Button
          color='secondary'
          variant='contained'
          onClick={() => {
            const newRows = [];
            if(filter === 'name'){
              for(let i=0; i < rows.length; i++){
                if(rows[i].name.toLowerCase().includes(search.toLowerCase())){
                  newRows.push(rows[i])
                }
              }
              setVisibleRows(newRows)
            }
            if(filter === 'identificacion'){
              for(let i=0; i < rows.length; i++){
                if(rows[i].identificacion.toLowerCase().includes(search.toLowerCase())){
                  newRows.push(rows[i])
                }
              }
              setVisibleRows(newRows)
            }
            if(filter === 'obligacion'){
              for(let i=0; i < rows.length; i++){
                if(rows[i].obligacion.toLowerCase().includes(search.toLowerCase())){
                  newRows.push(rows[i])
                }
              }
              setVisibleRows(newRows)
            }
            if(filter === 'nroObligacion'){
              for(let i=0; i < rows.length; i++){
                if(rows[i].nroObligacion.toLowerCase().includes(search.toLowerCase())){
                  newRows.push(rows[i])
                }
              }
              setVisibleRows(newRows)
            }
            if(filter === 'nroResolucion'){
              for(let i=0; i < rows.length; i++){
                if(rows[i].nroResolucion.toLowerCase().includes(search.toLowerCase())){
                  newRows.push(rows[i])
                }
              }
              setVisibleRows(newRows)
            }
          }}
        >
        Buscar
        <SearchOutlined />
        </Button>
        <Button
          color='secondary'
          variant='outlined'
          onClick={() => {
            setVisibleRows(rows)
          }}
        >
        Mostrar Todo
        <FilterAltOffOutlined />
        </Button>
      </Stack>
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

                    return (
                      <TableRow
                        hover
                        key={row.name}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell align="left" padding="normal">{row.name}</TableCell>
                        <TableCell align="left" padding="normal">{row.identificacion}</TableCell>
                        <TableCell align="left" padding="normal">{row.obligacion}</TableCell>
                        <TableCell align="left" padding="normal">{row.nroObligacion}</TableCell>
                        <TableCell align="left" padding="normal">{row.nroResolucion}</TableCell>
                        <TableCell align="left" padding="normal">{row.fechaRadicacion}</TableCell>
                        <TableCell align="left" padding="normal"><Link to={`registro`}>Ver</Link></TableCell>
                        <TableCell align="left" padding="normal">
                        <FormControl sx={{ minWidth: 110 }}>
                          <InputLabel id="demo-simple-select-label">Seleccionar</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Seleccionar"
                            onChange={handleOpen}
                          >
                            <MenuItem value='Olga'>Olga</MenuItem>
                            <MenuItem value='Diana'>Diana</MenuItem>
                            <MenuItem value='Juan'>Juan</MenuItem>
                            <MenuItem value='Fernando'>Fernando</MenuItem>
                          </Select>
                        </FormControl>
                        </TableCell>
                      </TableRow>
                    );
                  })
                : null}
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
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" component="h1" align='center'>
            <strong>¿Está seguro de realizar la reasignación de usuario?</strong>
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            marginTop='20px'
          >
            <Button
              color='info'
              variant='contained'
              onClick={()=>{
                setOpenSubModal(true)
                setOptionModal('si')
              }}
            >
            Si
            </Button>
            <Button
              color='info'
              variant='contained'
              onClick={()=>{
                setOpenSubModal(true)
                setOptionModal('no')
              }}
            >
            No
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Modal
        open={openSubModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" component="h1" align='center'>
            <strong>{optionModal === 'si' ? 'Reasignación ejecutada con éxito' : 'Reasignación cancelada'}</strong>
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            marginTop='20px'
          >
            <Button
              color='info'
              variant='contained'
              onClick={()=>{
                setOpenSubModal(false)
                setOpen(false)
              }}
            >
            Ok
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}
