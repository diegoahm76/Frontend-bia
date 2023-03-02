import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import {
  Grid,
  Box,
  Stack,
  Button,
  Snackbar,
  IconButton,
  Avatar,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import { Title } from '../../../components/Title';
// Slices
import { current_organigram } from '../store/slices/organigramSlice';
// Thunks
import { get_organigrams_service } from '../store/thunks/organigramThunks';
import CrearOrganigramaDialogForm from '../components/CrearOrganigramaDialogForm';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function CrearOrganigramaScreen(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open_snack, set_open_snack] = React.useState(false);
  const { organigram } = useAppSelector((state) => state.organigram);
  const [crear_organigrama_is_active, set_crear_organigrama_is_active] =
    useState<boolean>(false);

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

  const columns: GridColDef[] = [
    { field: 'id_organigrama', headerName: 'ID', width: 20 },
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      type: 'number',
      width: 200,
    },
    {
      field: 'version',
      headerName: 'Versión',
      width: 100,
    },
    {
      field: 'actual',
      headerName: 'Actual',
      width: 100,
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
      field: 'fecha_terminado',
      headerName: 'Fecha terminado',
      width: 150,
      valueFormatter: (params) => {
        // eslint-disable-next-line no-extra-boolean-cast
        if (!Boolean(params.value)) {
          return 'N/A'; // o cualquier otro valor predeterminado que desee mostrar
        }
        const date = new Date(params.value);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      },
    },
    {
      field: 'fecha_puesta_produccion',
      headerName: 'Fecha publicación',
      width: 150,
      valueFormatter: (params) => {
        // eslint-disable-next-line no-extra-boolean-cast
        if (!Boolean(params.value)) {
          return 'N/A'; // o cualquier otro valor predeterminado que desee mostrar
        }
        const date = new Date(params.value);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      },
    },
    {
      field: 'fecha_retiro_produccion',
      headerName: 'Fecha retiro',
      width: 150,
      valueFormatter: (params) => {
        if (!params.value) {
          return 'N/A'; // o cualquier otro valor predeterminado que desee mostrar
        }
        const date = new Date(params.value);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      },
    },
    {
      field: 'justificacion_nueva_version',
      headerName: 'Justificacion nueva versión',
      width: 150,
    },

    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              dispatch(current_organigram(params.row));
              navigate(
                '/dashboard/gestor-documental/organigrama/editar-organigrama'
              );
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
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
          <IconButton
          // onClick={() => {
          //   dispatch(current_organigram(params.row));
          //   navigate(
          //     '/dashboard/gestor-documental/organigrama/editar-organigrama'
          //   );
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

  // Obtener organigramas
  useEffect(() => {
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
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <Grid item xs={12}>
        <Title title="ORGANIGRAMAS"></Title>
        <Stack direction="row" spacing={2} sx={{ m: '20px 0' }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => {
              set_crear_organigrama_is_active(true);
            }}
          >
            CREAR ORGANIGRAMA
          </Button>
        </Stack>
        <Grid item>
          <Box sx={{ width: '100%' }}>
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
        <CrearOrganigramaDialogForm
          is_modal_active={crear_organigrama_is_active}
          set_is_modal_active={set_crear_organigrama_is_active}
        />
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
