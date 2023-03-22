import { type Dispatch, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import {
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Button,
  Box,
  Divider,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

interface FormValues {
  nombre: string;
  version: string;
  descripcion: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DialogBusquedaAvanzada = ({
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { handleSubmit: handle_submit } = useForm<FormValues>();

  const handle_close_busqueda_avanzada = (): void => {
    set_is_modal_active(false);
  };

  const on_submit = (data: FormValues): void => {
    // void dispatch(add_organigrams_service(data, set_position_tab_organigrama));
    handle_close_busqueda_avanzada();
  };

  const rows = [
    {
      id: 1,
      tipo_documento: 35,
      numero_documento: 35,
      primer_nombre: 'Snow',
      primer_apellido: 'Jon',
    },
    {
      id: 2,
      tipo_documento: 42,
      numero_documento: 42,
      primer_nombre: 'Lannister',
      primer_apellido: 'Cersei',
    },
    {
      id: 3,
      tipo_documento: 45,
      numero_documento: 45,
      primer_nombre: 'Lannister',
      primer_apellido: 'Jaime',
    },
    {
      id: 4,
      tipo_documento: 16,
      numero_documento: 16,
      primer_nombre: 'Stark',
      primer_apellido: 'Arya',
    },
    {
      id: 5,
      tipo_documento: null,
      numero_documento: null,
      primer_nombre: 'Targaryen',
      primer_apellido: 'Daenerys',
    },
    {
      id: 6,
      tipo_documento: 150,
      numero_documento: 150,
      primer_nombre: 'Melisandre',
      primer_apellido: null,
    },
    {
      id: 7,
      tipo_documento: 44,
      numero_documento: 44,
      primer_nombre: 'Clifford',
      primer_apellido: 'Ferrara',
    },
    {
      id: 8,
      tipo_documento: 36,
      numero_documento: 36,
      primer_nombre: 'Frances',
      primer_apellido: 'Rossini',
    },
    {
      id: 9,
      tipo_documento: 65,
      numero_documento: 65,
      primer_nombre: 'Roxie',
      primer_apellido: 'Harvey',
    },
  ];

  const columns: GridColDef[] = [
    {
      headerName: 'Tipo de documento',
      field: 'tipo_documento',
      minWidth: 200,
    },
    {
      headerName: 'Número de documento',
      field: 'numero_documento',
      minWidth: 150,
    },
    {
      headerName: 'Primer nombre',
      field: 'primer_nombre',
      minWidth: 100,
    },
    {
      headerName: 'Primer apellido',
      field: 'primer_apellido',
      minWidth: 100,
    },
    {
      headerName: 'Acciones',
      field: 'accion',
      renderCell: (params: any) => (
        <>
          <IconButton
          // onClick={() => {
          //   dispatch(get_ccd_current(params.data));
          //   set_is_modal_active(false);
          // }}
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
              <VisibilityIcon
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Dialog
      maxWidth="lg"
      open={is_modal_active}
      onClose={handle_close_busqueda_avanzada}
    >
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handle_submit(on_submit)}
      >
        <DialogTitle>
          Busqueda avanzada
          <IconButton
            aria-label="close"
            onClick={() => {
              set_is_modal_active(false);
            }}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container sx={{ mb: '0px' }} spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                name="tipoUnidad"
                label="Primer nombre"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                name="tipoUnidad"
                label="Primer apellido"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button variant="outlined" startIcon={<SearchIcon />}>
                BUSCAR
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}></Grid>
            <Grid item xs={12}>
              <DataGrid
                density="compact"
                autoHeight
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mr: '15px', mb: '10px', mt: '10px' }}
          >
            <Button
              variant="outlined"
              onClick={handle_close_busqueda_avanzada}
              startIcon={<CloseIcon />}
            >
              CERRAR
            </Button>
            <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
              GUARDAR
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default DialogBusquedaAvanzada;
