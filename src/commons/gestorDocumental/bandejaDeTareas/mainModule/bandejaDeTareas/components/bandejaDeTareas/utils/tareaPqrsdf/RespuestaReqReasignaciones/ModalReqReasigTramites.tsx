/* eslint-disable @typescript-eslint/naming-convention */
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useEffect, useState } from 'react';
import { ModalAndLoadingContext } from '../../../../../../../../../../context/GeneralContext';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../../hooks';
import { getComplementosReqResSolicitudes } from '../../../../../services/servicesStates/pqrsdf/reqResSolicitudes/getReqResSolicitudes.service';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { GridValueGetterParams } from '@mui/x-data-grid';
import { columnsTramites } from './columns/columns';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { VistaComplementoTarea } from '../../../components/vistaAtoms/VistaComplementoTarea';
import { getDetalleComplemento } from '../../../../../services/servicesStates/pqrsdf/complementos/getDetalleComplemento.service';
import { setInfoTarea } from '../../../../../../../toolkit/store/BandejaDeTareasStore';
import { useNavigate } from 'react-router-dom';
import { getAnexosComplemento } from '../../../../../../../../panelDeVentanilla/toolkit/thunks/PqrsdfyComplementos/anexos/getAnexosComplementos.service';
import { BandejaTareasContext } from '../../../../../../context/BandejaTareasContext';
import { getAnexosComplementoBandejaTareas } from '../../../../../services/servicesStates/pqrsdf/complementos/getAnexosComplementos.service';
import { getComplementosRequerimientosRespuestaSolicitudesTramites } from '../../../../../services/servicesStates/tramites/reqRespuestaSolTramites/getReqResSolTramites.service';
import { getDetalleComplementoTramite } from '../../../../../services/servicesStates/tramites/complementos/detalleComplemento/getDetalleCompleTramite.service';
import { getAnexosComplementoBandejaTareasTramites } from '../../../../../services/servicesStates/tramites/complementos/anexosComplementos/getAnexComTramite.service';

export const ModalRespuestaReqTramites = (): JSX.Element => {
  //* redux states
  const dispatch = useAppDispatch();

  const { currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas } =
    useAppSelector((state) => state.BandejaTareasSlice);

    const { sixthLoading, handleSixthLoading} = useContext(ModalAndLoadingContext);
  //* navigate
  const navigate = useNavigate();

  //* context declaration
  const { setAnexos } = useContext(BandejaTareasContext);

  //* useeffect para llamar un servicio con la informacion, solo se llama el servicio cuando handleThirdLoading es true

  useEffect(() => {
    if (sixthLoading) {
      (async () => {
        getComplementosRequerimientosRespuestaSolicitudesTramites(
          currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_tarea_asignada
        ).then((data) => {
          setDataComplementos(data);
        });
      })();
    }
  }, [sixthLoading]);

  const [dataComplementos, setDataComplementos] = useState<any[]>([]);

  const columns = [
    ...columnsTramites,
    {
      headerName: 'Acciones',
      field: 'acciones',
      renderCell: (params: GridValueGetterParams) => (
        <Tooltip title="Ver info del complemento">
          <IconButton
            onClick={() => {
              (async () => {
                try {
                  const idComplemento = params?.row?.idComplementoUsu_PQR;
                  const [detalleTarea, anexosTramite] = await Promise.all([
                    getDetalleComplementoTramite(idComplemento, navigate),
                    getAnexosComplementoBandejaTareasTramites(idComplemento),
                  ]);
                  dispatch(setInfoTarea(detalleTarea));
                  setAnexos(anexosTramite);
                  if (detalleTarea || anexosTramite.length > 0) {
                    navigate(
                      `/app/gestor_documental/bandeja_tareas/info_tarea_complemento_tramite/${idComplemento}`
                    );
                  }
                } catch (error) {
                  console.error(error);
                }
              })();
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
      ),
    },
  ];

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={sixthLoading}
        onClose={() => {
          handleSixthLoading(false);
          setDataComplementos([]);
        }}
      >
        <Box component="form">
          <Divider />

          {dataComplementos && dataComplementos.length > 0 ? (
            <RenderDataGrid
              title="Respuesta de requerimientos al usuario"
              columns={columns ?? []}
              rows={[...dataComplementos]}
            />
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
                my: '20px',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                }}
              >
                No hay datos disponibles para esta tarea.
              </Typography>
            </Box>
          )}

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
                  handleSixthLoading(false);
                  setDataComplementos([]);
                }}
                startIcon={<CloseIcon />}
              >
                CERRAR MODAL
              </Button>
            </Stack>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};
