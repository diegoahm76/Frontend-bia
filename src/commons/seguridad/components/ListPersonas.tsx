import { type Dispatch, type SetStateAction } from 'react';
// Componentes de Material UI
import {
  Grid,
  Box,
  Button,
  IconButton,
  Avatar,
  TextField,
  MenuItem,
} from '@mui/material';
// Icons de Material UI
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

interface IProps {
  set_position_tab_admin_personas: Dispatch<SetStateAction<string>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ListPersonas({
  set_position_tab_admin_personas,
}: IProps): JSX.Element {
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

  const tipos_documentos = [
    {
      value: '1',
      label: 'Test',
    },
    {
      value: 'EUR',
      label: 'Test',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

  return (
    <>
      <Grid item xs={12}>
        <Box sx={{ width: '100%', typography: 'body1', mb: '20px' }}>
          <Box
            component="form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            // onSubmit={handle_submit_unidades(submit_unidades)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="tipoUnidad"
                  select
                  label="Tipo de documento"
                  defaultValue="Seleccione"
                  size="small"
                  fullWidth
                >
                  {tipos_documentos.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  margin="dense"
                  fullWidth
                  size="small"
                  label="Número de documento"
                  variant="outlined"
                  // disabled={organigram_current.fecha_terminado !== null}
                  // value={value}
                  // onChange={onChange}
                  // error={!(error == null)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button variant="outlined" startIcon={<SearchIcon />}>
                  BUSCAR
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid item>
        <Box sx={{ width: '100%' }}>
          <DataGrid
            density="compact"
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            // getRowId={(row) => row.id_persona}
          />
        </Box>
      </Grid>
    </>
  );
}
