/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
  Tooltip,
  CircularProgress,
  ButtonGroup,
} from '@mui/material';
// Icons de Material UI
import AddIcon from '@mui/icons-material/AddBoxOutlined';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
// Hooks
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
// Thunks
import { get_organigrams_service } from '../../store/thunks/organigramThunks';
// Dialogs
import DialogCrearOrganigrama from '../DialogCrearOrganigrama/DialogCrearOrganigrama';
import DialogDelegarOrganigrama from '../DialogDelegarOrganigrama/DialogDelegarOrganigrama';
// Slices
import {
  current_organigram,
  set_special_edit,
} from '../../store/slices/organigramSlice';
import { toast, type ToastContent } from 'react-toastify';
import { type IObjOrganigram } from '../../interfaces/organigrama';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Link } from 'react-router-dom';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { RenderDataGrid } from '../../../tca/Atom/RenderDataGrid/RenderDataGrid';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const control_error = (message: ToastContent) =>
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

interface IProps {
  set_position_tab_organigrama: Dispatch<SetStateAction<string>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ListOrganigramas({
  set_position_tab_organigrama,
}: IProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { organigram } = useAppSelector((state) => state.organigram);
  const { userinfo } = useAppSelector((state) => state.auth);
  const [crear_organigrama_is_active, set_crear_organigrama_is_active] =
    useState<boolean>(false);
  const [delegar_organigrama_is_active, set_delegar_organigrama_is_active] =
    useState<boolean>(false);

  const columns: GridColDef[] = [
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
      width: 280,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'version',
      headerName: 'Versión',
      width: 100,
    },
    {
      field: 'usado',
      headerName: 'Usado',
      width: 100,
      renderCell: (params: { row: IObjOrganigram }) => {
        if (params.row.actual) {
          return (
            <Chip
              size="small"
              label="Actual"
              color="primary"
              variant="filled"
            />
          );
        } else if (!params.row.actual) {
          return params.row.usado ? (
            <Chip size="small" label="Sí" color="success" variant="outlined" />
          ) : (
            <Chip size="small" label="No" color="error" variant="outlined" />
          );
        }
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
      width: 200,
      /* renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ) */
    },

    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 100,
      renderCell: (params) => (
        <>
          {params.row.fecha_terminado !== null ? (
            <Tooltip title="Ver">
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
                  <VisibilityIcon
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Editar">
              <IconButton
                //! revisar esto detalladamente con el ing de backend
                disabled={params.row.id_persona_cargo !== userinfo.id_persona}
                onClick={() => {
                  dispatch(current_organigram(params.row));
                  set_position_tab_organigrama('2');
                }}
              >
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    background:
                      params.row.id_persona_cargo !== userinfo.id_persona
                        ? ''
                        : '#fff',
                    border: '2px solid',
                  }}
                  variant="rounded"
                >
                  <EditIcon
                    sx={{
                      color:
                        params.row.id_persona_cargo !== userinfo.id_persona
                          ? ''
                          : 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          )}

          {params.row.fecha_terminado === null && (
            <Tooltip title="Delegación">
              <IconButton
                onClick={() => {
                  // Permitir delegar organigrama si es superusuario o si es el usuario delegado para ese organigrama
                  if (
                    params.row.id_persona_cargo === userinfo.id_persona ||
                    userinfo.is_superuser
                  ) {
                    dispatch(current_organigram(params.row));
                    set_delegar_organigrama_is_active(true);
                  } else {
                    control_error(
                      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                      `Este organigrama actualmente sólo podrá ser editado por ${params.row.nombre_completo}`
                    );
                  }
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
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          )}

          {/*  edición especial  */}

          {params.row.actual && (
            <Tooltip title="Edición especial">
              <IconButton
                //! revisar esto detalladamente con el ing de backend
                //  disabled={params.row.id_persona_cargo !== userinfo.id_persona}
                onClick={() => {
                  //  console.log('')('params.row.id_persona_cargo', params.row);
                  //  console.log('')('userinfo.id_persona', userinfo);
                  dispatch(set_special_edit(true));
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
                    boxShadow: '0px 0px 5px 0px rgba(105, 105, 105, 0.2)',
                  }}
                  variant="rounded"
                >
                  <AutoFixHighIcon
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          )}
        </>
      ),
    },
  ];

  useEffect(() => {
    void dispatch(get_organigrams_service());
  }, []);

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ mb: '20px', justifyContent: 'center', alignItems: 'center' }}
      >
        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={() => {
              set_crear_organigrama_is_active(true);
            }}
            fullWidth
          >
            CREAR ORGANIGRAMA
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Link to="/app/transversal/procesos/cambio_organigrama_actual">
            <Button
              variant="outlined"
              startIcon={<AssignmentTurnedInIcon />}
              fullWidth
            >
              ELEGIR ORGANIGRAMA
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Link to="/app/gestor_documental/activacion_instrumentos_archivisticos">
            <Button
              variant="outlined"
              startIcon={<AssignmentTurnedInIcon />}
              fullWidth
            >
              ACTIVAR INSTRUMENTOS
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid item>
        {organigram.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <CircularProgress size={80} />
          </Box>
        ) : (
          <RenderDataGrid
            title="Listado de organigramas"
            rows={organigram ?? []}
            columns={columns ?? []}
          />
        )}
      </Grid>
      <DialogCrearOrganigrama
        is_modal_active={crear_organigrama_is_active}
        set_is_modal_active={set_crear_organigrama_is_active}
        set_position_tab_organigrama={set_position_tab_organigrama}
      />
      <DialogDelegarOrganigrama
        is_modal_active={delegar_organigrama_is_active}
        set_is_modal_active={set_delegar_organigrama_is_active}
      />
    </>
  );
}
