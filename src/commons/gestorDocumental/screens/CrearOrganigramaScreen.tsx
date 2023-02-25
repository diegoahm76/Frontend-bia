import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Box,
  Stack,
  Button,
  Snackbar,
  IconButton,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
// import { DataGrid } from '@mui/x-data-grid';
// import { type GridColDef } from '@mui/x-data-grid';

import {
  // useAppSelector,

  useAppDispatch,
} from '../store/hooks/hooks';
// Thunks
import { get_organigrams_service } from '../store/thunks/organigramThunks';

// const columns: GridColDef[] = [
//   { field: 'id', headerName: 'ID', width: 20 },
//   {
//     field: 'item',
//     headerName: 'Item',
//     width: 20,
//     editable: true,
//   },
//   {
//     field: 'nombre',
//     headerName: 'Nombre',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'descripcion',
//     headerName: 'Descripción',
//     type: 'number',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'version',
//     headerName: 'Versión',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 100,
//     // valueGetter: (params: GridValueGetterParams) =>
//     //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
//   {
//     field: 'fechaTerminado',
//     headerName: 'Fecha terminado',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 150,
//     // valueGetter: (params: GridValueGetterParams) =>
//     //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
//   {
//     field: 'fechaPublicacion',
//     headerName: 'Fecha publicación',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 150,
//     // valueGetter: (params: GridValueGetterParams) =>
//     //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
//   {
//     field: 'fechaRetiro',
//     headerName: 'Fecha retiro',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 150,
//     // valueGetter: (params: GridValueGetterParams) =>
//     //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
//   {
//     field: 'justificacion',
//     headerName: 'Justificacion nueva versión',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 150,
//     // valueGetter: (params: GridValueGetterParams) =>
//     //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
//   {
//     field: 'actual',
//     headerName: 'Actual',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 100,
//     // valueGetter: (params: GridValueGetterParams) =>
//     //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
//   {
//     field: 'acciones',
//     headerName: 'Acciones',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 100,
//     // valueGetter: (params: GridValueGetterParams) =>
//     //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
// ];

// eslint-disable-next-line @typescript-eslint/naming-convention
export function CrearOrganigramaScreen(): JSX.Element {
  const navigate = useNavigate();
  // const dispatch = use_app_dispatch();
  // The `state` arg is correctly typed as `RootState` already
  // const { organigram } = useAppSelector((state) => state.organigram);
  const dispatch = useAppDispatch();

  // console.log(organigram, 'Hola');
  const [open, set_open] = React.useState(false);
  const [open_snack, set_open_snack] = React.useState(false);

  const handle_click_open = (): void => {
    set_open(true);
  };

  const handle_close = (): void => {
    set_open(false);
  };

  const handle_click_snack = (): void => {
    // set_open_snack(true);
    navigate('/dashboard/gestor-documental/organigrama/editar-organigrama');
  };

  const handle_close_snack = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (reason === 'clickaway') {
      return;
    }

    set_open_snack(false);
  };

  const action = (
    <React.Fragment>
      <Button color="success" size="small" onClick={handle_close_snack}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handle_close_snack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  // UseEffect para obtener organigramas
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    void dispatch(get_organigrams_service());
  }, []);

  return (
    <Grid
      container
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <Grid item xs={12}>
        <Grid
          item
          className={`border px-4 text-white fs-5 p-1`}
          sx={{
            display: 'grid',
            background:
              'transparent linear-gradient(269deg, #1492E6 0%, #062F48 34%, #365916 100%) 0% 0% no-repeat padding-box',
            width: '100%',
            height: '40px',

            borderRadius: '10px',
            pl: '20px',
            fontSize: '17px',
            fontWeight: 'bold',
            alignContent: 'center',
          }}
        >
          <Typography sx={{ color: 'white' }}>ORGANIGRAMAS</Typography>
        </Grid>
        <Stack direction="row" spacing={2} sx={{ m: '20px 0' }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handle_click_open}
          >
            CREAR ORGANIGRAMA
          </Button>
        </Stack>
        <Grid item>
          <Box sx={{ height: 400, width: '100%' }}>
            {/* <DataGrid
              autoHeight
              rows={organigram}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              experimentalFeatures={{ newEditingApi: true }}
            /> */}
          </Box>
        </Grid>
        {/* Dialogo - Crear organigrama */}
        <Dialog maxWidth="xs" open={open} onClose={handle_close}>
          <DialogTitle>Crear organigrama</DialogTitle>
          <DialogContent sx={{ mb: '0px' }}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nombre"
              required
              type="text"
              fullWidth
              helperText="Ingrese nombre"
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Versión"
              required
              type="text"
              fullWidth
              helperText="Ingrese versión"
              variant="standard"
            />
            <TextField
              error
              autoFocus
              margin="dense"
              id="name"
              label="Descripción"
              required
              type="text"
              fullWidth
              helperText="Ingrese descripción"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Stack direction="row" spacing={2} sx={{ mr: '15px', mb: '20px' }}>
              <Button
                variant="outlined"
                onClick={handle_close}
                startIcon={<CloseIcon />}
              >
                CERRAR
              </Button>
              <Button
                variant="contained"
                onClick={handle_click_snack}
                startIcon={<SaveIcon />}
              >
                GUARDAR
              </Button>
            </Stack>
          </DialogActions>
          {/* Success */}
        </Dialog>
        <Snackbar
          open={open_snack}
          autoHideDuration={6000}
          onClose={handle_close_snack}
          message="ORGANIGRAMA CREADO"
          key={'bottom' + 'center'}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          action={action}
        />
      </Grid>
    </Grid>
  );
}
