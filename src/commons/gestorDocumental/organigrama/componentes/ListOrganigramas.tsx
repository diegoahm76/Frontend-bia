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
import AddIcon from '@mui/icons-material/AddBoxOutlined';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
// Hooks
import { useAppDispatch, useAppSelector } from '../../../../hooks';
// Thunks
import { get_organigrams_service } from '../store/thunks/organigramThunks';
// Dialogs
import DialogCrearOrganigrama from './DialogCrearOrganigrama';
import DialogElegirOrganigramaActual from './DialogElegirOrganigramaActual';
import DialogDelegarOrganigrama from './DialogDelegarOrganigrama';
// Slices
import { current_organigram } from '../store/slices/organigramSlice';

interface IProps {
  set_position_tab_organigrama: Dispatch<SetStateAction<string>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ListOrganigramas({
  set_position_tab_organigrama,
}: IProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { organigram } = useAppSelector((state) => state.organigram);
  const [crear_organigrama_is_active, set_crear_organigrama_is_active] =
    useState<boolean>(false);
  const [
    elegir_organigrama_actual_is_active,
    set_elegir_organigrama_actual_is_active,
  ] = useState<boolean>(false);
  const [delegar_organigrama_is_active, set_delegar_organigrama_is_active] =
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
          return '-'; // o cualquier otro valor predeterminado que desee mostrar
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
          return '-'; // o cualquier otro valor predeterminado que desee mostrar
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
        if (params.value === null) {
          return '-'; // o cualquier otro valor predeterminado que desee mostrar
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
              {params.row.fecha_terminado !== null ? (
                <VisibilityIcon
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              ) : (
                <EditIcon
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              )}
            </Avatar>
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(current_organigram(params.row));
              set_delegar_organigrama_is_active(true);
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
              <ManageAccountsOutlinedIcon
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
          CREAR
        </Button>
        <Button
          variant="outlined"
          startIcon={<AssignmentTurnedInIcon />}
          onClick={() => {
            set_elegir_organigrama_actual_is_active(true);
          }}
        >
          ELEGIR ACTUAL
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
            getRowId={(row) => row.id_organigrama}
          />
        </Box>
      </Grid>
      <DialogCrearOrganigrama
        is_modal_active={crear_organigrama_is_active}
        set_is_modal_active={set_crear_organigrama_is_active}
        set_position_tab_organigrama={set_position_tab_organigrama}
      />
      <DialogElegirOrganigramaActual
        is_modal_active={elegir_organigrama_actual_is_active}
        set_is_modal_active={set_elegir_organigrama_actual_is_active}
      />
      <DialogDelegarOrganigrama
        is_modal_active={delegar_organigrama_is_active}
        set_is_modal_active={set_delegar_organigrama_is_active}
      />
    </>
  );
}
