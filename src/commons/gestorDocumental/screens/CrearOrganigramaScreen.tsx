import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Box,
  Stack,
  Button,
  Snackbar,
  IconButton,
  Avatar,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import {
  DataGrid,
  // type GridValueGetterParams,
  type GridColDef,
} from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';

import { get_organigrams_service } from '../store/thunks/organigramThunks';
import { Title } from '../../../components/Title';

const columns: GridColDef[] = [
  { field: 'id_organigrama', headerName: 'ID', width: 20 },
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 200,
    editable: true,
  },
  {
    field: 'descripcion',
    headerName: 'Descripción',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'version',
    headerName: 'Versión',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 100,
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'fecha_terminado',
    headerName: 'Fecha terminado',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150,
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'fecha_puesta_produccion',
    headerName: 'Fecha publicación',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150,
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'fecha_retiro_produccion',
    headerName: 'Fecha retiro',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150,
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'justificacion_nueva_version',
    headerName: 'Justificacion nueva versión',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 150,
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'actual',
    headerName: 'Actual',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 100,
    // valueGetter: (params) => {
    //   // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    //   return params.row.actual ? 'Sí' : 'No';
    // },
    renderCell: (params) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      return params.row.actual ? (
        <Chip size="small" label="Sí" color="success" variant="outlined" />
      ) : (
        <Chip size="small" label="No" color="error" variant="outlined" />
      );
    },
  },
  {
    field: 'acciones',
    headerName: 'Acciones',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 100,
    renderCell: (params) => (
      <>
        <IconButton
        // onClick={() => handleEditar(params.row.id)}
        >
          <Avatar
            sx={{
              width: 24,
              height: 24,
              background: '#fff',
              border: '2px solid',
            }}
            variant="rounded"
          >
            <EditIcon
              sx={{ color: 'primary.main', width: '18px', height: '18px' }}
            />
          </Avatar>
        </IconButton>
      </>
    ),
  },
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export function CrearOrganigramaScreen(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, set_open] = React.useState(false);
  const [open_snack, set_open_snack] = React.useState(false);
  const { organigram } = useAppSelector((state) => state.organigram);

  const handle_click_open = (): void => {
    set_open(true);
  };

  const handle_close = (): void => {
    set_open(false);
  };

  const handle_click_snack = (): void => {
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
        <Title title="ORGANIGRAMAS"></Title>
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
          <Box sx={{ height: 400, width: '100%', mb: '20px' }}>
            <DataGrid
              density="compact"
              autoHeight
              rows={organigram}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              experimentalFeatures={{ newEditingApi: true }}
              getRowId={(row) => row.id_organigrama}
            />
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
              size="small"
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
              size="small"
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
              size="small"
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
