/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Avatar, Box, Button, Grid, IconButton, Stack, TextField, Tooltip } from "@mui/material"
import { Title } from '../../../components/Title';
import EditIcon from '@mui/icons-material/Edit';
import { PersonSearch, Visibility } from '@mui/icons-material';
import { DataGrid, GridToolbar, type GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Proceso } from "../interfaces/proceso";
import { api } from "../../../api/axios";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const VisorProcesosScreen: React.FC = () => {
  const [procesos, set_procesos] = useState<Proceso[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('recaudo/procesos/procesos')
      .then((response) => {
        set_procesos(response.data.data);
      })
      .catch((error) => {
        //  console.log('')(error);
      });
  }, []);

  const columns_etapas: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID Proceso',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'id_funcionario',
      headerName: 'ID Deudor',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'id_etapa',
      headerName: 'Estado actual',
      minWidth: 200,
      flex: 1,
      valueGetter: (params) => {
        if (!params.value) {
          return params.value;
        }
        return params.value.etapa;
      },
    },
    {
      field: 'id_categoria',
      headerName: 'Categoría',
      minWidth: 200,
      flex: 1,
      valueGetter: (params) => {
        if (!params.value) {
          return params.value;
        }
        return params.value.categoria;
      },
    },
    {
      field: 'inicio',
      headerName: 'Última Actualización',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title='Ver'>
              <IconButton
                onClick={() => {
                  navigate('../historial_proceso', { state: { editar: 0, proceso: procesos.find(proceso => proceso.id === params.row.id) } });
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
                  navigate('../historial_proceso', { state: { editar: 1, proceso: procesos.find(proceso => proceso.id === params.row.id) } });
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
                rows={procesos}
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

