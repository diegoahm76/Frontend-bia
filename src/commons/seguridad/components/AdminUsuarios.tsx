import { useState } from 'react';
// import { type Dispatch, type SetStateAction } from 'react';
// Componentes de Material UI
import { Grid, Box, Button, IconButton, Avatar } from '@mui/material';
// Icons de Material UI
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import DialogBusquedaAvanzada from './DialogBusquedaAvanzada';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function AdminUsuarios(): JSX.Element {
  const [busqueda_avanzada_is_active, set_busqueda_avanzada_is_active] =
    useState<boolean>(false);
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
    <>
      <Grid item xs={12}>
        <Box
          sx={{ width: '100%', typography: 'body1', mt: '20px', mb: '20px' }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Button
                variant="outlined"
                startIcon={<SearchIcon />}
                onClick={() => {
                  set_busqueda_avanzada_is_active(true);
                }}
              >
                BUSQUEDA AVANZADA
              </Button>
            </Grid>
          </Grid>
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
      <DialogBusquedaAvanzada
        is_modal_active={busqueda_avanzada_is_active}
        set_is_modal_active={set_busqueda_avanzada_is_active}
      />
    </>
  );
}
