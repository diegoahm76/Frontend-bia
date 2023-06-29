import { Avatar, Box, Button, Grid, IconButton, Stack, TextField, Tooltip } from "@mui/material"
import { Title } from '../../../components/Title';
import EditIcon from '@mui/icons-material/Edit';
import { PersonSearch, Visibility } from '@mui/icons-material';
import { DataGrid, GridToolbar, type GridColDef } from "@mui/x-data-grid";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const VisorProcesosScreen: React.FC = () => {
  const rows_etapas = [
    {
      id: 1,
      identificacion: '90239230',
      deudor: 'CC Primavera',
      proceso: 'EXP-5663',
      estado_proceso: 'Cobro Persuasivo',
      ultima_actualizacion: '21-03-2023'
    },
    {
      id: 2,
      identificacion: '89643939',
      deudor: 'Tulio Alvarado',
      proceso: 'EXP-9732',
      estado_proceso: 'Embargo',
      ultima_actualizacion: '21-11-2022'
    }
  ]

  const columns_etapas: GridColDef[] = [
    {
      field: 'identificacion',
      headerName: 'Identificación',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'deudor',
      headerName: 'Deudor',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'proceso',
      headerName: 'Proceso',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'estado_proceso',
      headerName: 'Estado de Proceso',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'ultima_actualizacion',
      headerName: 'Última Actualización',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'acciones',
      headerName: 'Opciones',
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title='Ver'>
              <IconButton
                onClick={() => {
                }}
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
                  <Visibility
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px'
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Tooltip title='Editar'>
              <IconButton
                onClick={() => {
                }}
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
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px'
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          </>
        );
      }
    }
  ];

  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26'
        }}
      >
        <Grid item xs={12}>
        <Title title='Visor de Procesos de Gestión de Cartera' />
          <Box
            component='form'
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{ mb: '20px', mt: '20px' }}
            >
              <TextField
                label="Búsqueda"
                size="medium"
                onChange={() => {
                }}
              />
              <Button
                color='primary'
                variant='contained'
                startIcon={<PersonSearch />}
                onClick={() => {
                }}
              >
                Buscar
              </Button>
            </Stack>
            <Box sx={{ width: '100%' }}>
              <DataGrid
                density="compact"
                autoHeight
                rows={rows_etapas}
                columns={columns_etapas}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id}
                components={{ Toolbar: GridToolbar }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

