/* eslint-disable @typescript-eslint/naming-convention */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import { FC, useContext, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../../../../../../../../../hooks';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import { control_error, control_success } from '../../../../../../../../../../helpers';
import { setCurrentTareaPqrsdfTramitesUotrosUopas, setListaTareasPqrsdfTramitesUotrosUopas } from '../../../../../../../toolkit/store/BandejaDeTareasStore';
import { Title } from '../../../../../../../../../../components/Title';
import { api } from '../../../../../../../../../../api/axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import swal from 'sweetalert2';
import { getListadoDocsByPerson } from '../../../../../../../toolkit/thunks/documentos/getListDocsByPerson.service';
import { AuthSlice } from '../../../../../../../../../auth/interfaces';

export const ModalAsignados: FC = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* redux states
  const {
    currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas,
    listaTareasPqrsdfTramitesUotrosUopas,
  } = useAppSelector((state) => state.BandejaTareasSlice);

  const {
    userinfo: { id_persona },
  } = useAppSelector((state: AuthSlice) => state.auth);

  //* context declaration
  const { showAsignaciones, setShowAsignaciones, handleSecondLoading } = useContext(
    ModalAndLoadingContext
  );

  const [asignaciones, setAsignaciones] = useState<any[]>([]);

  //* useState

  interface TaskType {
    getInfoRejectedTask: (
      id_tarea_asignada: number,
      handleOpenModalNuevoNumero2: React.Dispatch<React.SetStateAction<boolean>>
    ) => Promise<any>;
  }

   const obtenerAsignaciones = async () => {
    try {
      const url = `gestor/bandeja-tareas/asignaciones/docs/?id_consecutivo=${currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas.documento?.id_consecutivo_tipologia}`;
      const { data } = await api.get(url);
      console.log(data)
      if (data && data?.data?.length) {
        setAsignaciones(data.data);
        control_success('Asignaciones encontradas correctamente');
        return data.data;
      }
    } catch (error) {
      control_error('Ha ocurrido un error al buscar las asignaciones');
    }
  }

  useEffect(() => {
    if(showAsignaciones && currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas){
      obtenerAsignaciones();
    }
  }, [showAsignaciones]);

  const alert_cancelacion = (id: string) => {
    swal.fire({
      title: '¿Deseas cancelar la asignación?',
      text: 'Al cancelar la asignación, la persona asignada no podrá realizar ninguna acción sobre el documento',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        cancel_asignacion(id);
      }
    });
  }

  const cancel_asignacion = async (id: string) => {
    try {
      const url = `gestor/bandeja-tareas/cancelar/asignaciones/docs/${id}/`;
      const { data } = await api.put(url);
      if (data) {
        obtenerAsignaciones();
        const listadoTareas = await getListadoDocsByPerson(
          id_persona,
          handleSecondLoading,
        );
        setShowAsignaciones(false);
        dispatch(setListaTareasPqrsdfTramitesUotrosUopas(listadoTareas ?? []));
        control_success('Asignación cancelada correctamente');
        return data;
      }
    } catch (error) {
        control_error('Ha ocurrido un error al cancelar la asignación');
    }
  }

  const columns: GridColDef[] = [

    {
      field: 'persona_asginada',
      headerName: 'Persona asignada',
      minWidth: 250,
      flex: 1,
    },
    {
      field: 'persona_asigna',
      headerName: 'Persona que asignó',
      minWidth: 250,
      flex: 1,
    },
    {
      field: 'fecha_asignacion',
      headerName: 'Fecha de asignación',
      minWidth: 160,
      flex: 1,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value.split("T")[0]}
        </div>
      ),
    },
    {
      field: 'cod_estado_asignacion',
      headerName: 'Estado asignación',
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.row.cod_estado_asignacion == 'Ac' ? 'Aceptado' : (params.row.cod_estado_asignacion == 'Re' ? 'Rechazado' : (params.row.cod_estado_asignacion == 'Ca' ? 'Cancelado' : 'Pendiente'))}
        </div>
      ),
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 120,
      renderCell: (params) => (
        <>
          {params.row.cod_estado_asignacion == null && <IconButton
            onClick={() => {
              alert_cancelacion(params.row.id_asignacion_doc);
            }}
          >
            <DoDisturbIcon
              titleAccess="Cancelar asignación"
              sx={{ color: 'red', width: '18px', height: '18px' }}
            />
          </IconButton>}
        </>
      ),
    },
  ];

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={showAsignaciones}
        onClose={() => {
          dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(null));
          setShowAsignaciones(false);
        }}
      >
        <Box component="form">
          <DialogTitle>
            <Title title="Personas Asignadas al Documento" />
          </DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              mb: '0px',
              justifyContent: 'center',
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={12}
                lg={12}
                md={12}
                sx={{
                  marginY: '1.5rem',
                }}
              >
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={asignaciones ?? []}
                  columns={columns ?? []}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowId={(row: any) => row.id_asignacion_doc}
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
                color="error"
                variant="contained"
                onClick={() => {
                  dispatch(setCurrentTareaPqrsdfTramitesUotrosUopas(null));
                  setShowAsignaciones(false);
                }}
                startIcon={<CloseIcon />}
              >
                CERRAR
              </Button>
            </Stack>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};
