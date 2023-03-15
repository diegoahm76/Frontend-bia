import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
// Componentes de Material UI
import {
  Grid,
  Box,
  Stack,
  Button,
  IconButton,
  Avatar,
  Chip,
} from '@mui/material';
// Icons de Material UI
import AddIcon from '@mui/icons-material/Add';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
// Hooks
import { useAppDispatch, useAppSelector } from '../../../../hooks';
// Thunks
import { get_organigrams_service } from '../store/thunks/organigramThunks';
import CrearOrganigramaDialogForm from './CrearOrganigramaDialogForm';
// Slices
import { current_organigram } from '../store/slices/organigramSlice';

interface IProps {
  set_position_tab_organigrama: Dispatch<SetStateAction<string>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function CrearOrganigrama({
  set_position_tab_organigrama,
}: IProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { organigram } = useAppSelector((state) => state.organigram);
  const [crear_organigrama_is_active, set_crear_organigrama_is_active] =
    useState<boolean>(false);

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
              set_position_tab_organigrama('2');
              // navigate('/app/gestor_documental/organigrama/editar_organigrama');
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
        </>
      ),
    },
  ];

  useEffect(() => {
    void dispatch(get_organigrams_service());
  }, []);

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mb: '20px' }}>
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
        set_position_tab_organigrama={set_position_tab_organigrama}
      />
    </>
  );
}
