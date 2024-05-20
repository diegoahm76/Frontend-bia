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
import {
  getComplementosReqResOPA,
  getComplementosReqResSolicitudes,
} from '../../../../../services/servicesStates/pqrsdf/reqResSolicitudes/getReqResSolicitudes.service';
import { RenderDataGrid } from '../../../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { GridValueGetterParams } from '@mui/x-data-grid';
import { columnsStatic } from './columns/columns';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { VistaComplementoTarea } from '../../../components/vistaAtoms/VistaComplementoTarea';
import { getDetalleComplemento } from '../../../../../services/servicesStates/pqrsdf/complementos/getDetalleComplemento.service';
import { setInfoTarea } from '../../../../../../../toolkit/store/BandejaDeTareasStore';
import { useNavigate } from 'react-router-dom';
import { getAnexosComplemento } from '../../../../../../../../panelDeVentanilla/toolkit/thunks/PqrsdfyComplementos/anexos/getAnexosComplementos.service';
import { BandejaTareasContext } from '../../../../../../context/BandejaTareasContext';
import { getAnexosComplementoBandejaTareas } from '../../../../../services/servicesStates/pqrsdf/complementos/getAnexosComplementos.service';
import { getAnexosComplementoOpas } from '../../../../../services/servicesStates/opas/complementos/getAnexosComplementoOpas.service';

export const ModalRespuestaReqReasigna = (): JSX.Element => {
  //* redux states
  const dispatch = useAppDispatch();

  const { currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas } =
    useAppSelector((state) => state.BandejaTareasSlice);

  const { fourthLoading, handleFourthLoading } = useContext(
    ModalAndLoadingContext
  );

  //* navigate
  const navigate = useNavigate();

  //* context declaration
  const { setAnexos } = useContext(BandejaTareasContext);

  //* useeffect para llamar un servicio con la informacion, solo se llama el servicio cuando handleThirdLoading es true
  /*
  useEffect(() => {
    if (fourthLoading) {
      (async () => {
        getComplementosReqResSolicitudes(
          currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_tarea_asignada
        ).then((data) => {
          setDataComplementos(data);
        });
      })();
    }
  }, [fourthLoading]);
*/

  useEffect(() => {
    (async () => {
      if (fourthLoading) {
      const tipo =
        currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tipo_tarea ||
        currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tipo;

      try {
        switch (tipo) {
          case 'RESPONDER PQRSDF':
          case 'Responder PQRSDF':
            const dataPqr = await getComplementosReqResSolicitudes(
              currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_tarea_asignada
            );
            console.log('dataPqr', dataPqr);
            setDataComplementos(dataPqr);

            break;
          case 'RESPONDER OPA':
          case 'Responder Opa':
          case 'Responder OPA':
            const dataOpa = await getComplementosReqResOPA(
              currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_tarea_asignada
            );
            setDataComplementos(dataOpa);

            // Call the service for OPA
            break;
          default:
            // Default service call or no service call
            break;
        }
      } catch (error) {
        console.log(error);
      }
    }
    })();
  }, [fourthLoading]);

  const [dataComplementos, setDataComplementos] = useState<any[]>([]);

  const columns = [
    ...columnsStatic,
    {
      headerName: 'Acciones',
      field: 'acciones',
      renderCell: (params: GridValueGetterParams) => (
        <Tooltip title="Ver info del complemento">
          <IconButton
            onClick={() => {
              // ? se usará la función de los anexos de la pqrsdf para mostrar la información de la tarea, ya que contiene la información de la tarea (que es la misma que la de la pqrsdf)
              //* se debe llamar el servicio del detalle de la pqrsdf para traer la informacion y en consecuencias luego traer los anexos para la pqrsdf
              console.log(params.row);

              const tipo =
              currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tipo_tarea ||
              currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tipo;


              switch (tipo) {
                case 'RESPONDER PQRSDF':
                case 'Responder PQRSDF':
                  (async () => {
                    try {
                      const idComplemento = params?.row?.id_complemento_usu_pqr;
                      const [detalleTarea, anexosPqrsdf] = await Promise.all([
                        getDetalleComplemento(idComplemento, navigate),
                        getAnexosComplementoBandejaTareas(idComplemento),
                      ]);
                      dispatch(setInfoTarea(detalleTarea));
                      setAnexos(anexosPqrsdf);
                      if (detalleTarea || anexosPqrsdf.length > 0) {
                        navigate(
                          `/app/gestor_documental/bandeja_tareas/info_complemento/${idComplemento}`
                        );
                      }
                    } catch (error) {
                      console.error(error);
                    }
                  })();
                  break;
                case 'RESPONDER OPA':
                case 'Responder Opa':
                case 'Responder OPA':
                  (async () => {
                    try {
                      const idComplemento = params?.row?.id_respuesta_requerimiento;
                      /*const [detalleTarea, anexosPqrsdf] = await Promise.all([
                        getDetalleComplemento(idComplemento, navigate),
                        getAnexosComplementoBandejaTareas(idComplemento),
                      ]);*/
                      const anexos = await getAnexosComplementoOpas(idComplemento);

                      // dispatch(setInfoTarea(detalleTarea));
                      setAnexos(anexos);
                      if (/*detalleTarea || */ anexos.length > 0) {
                        navigate(
                          `/app/gestor_documental/bandeja_tareas/info_tarea_complemento_opa/`
                        );
                      }
                    } catch (error) {
                      console.error(error);
                    }
                  })();
                  break;
                default:
                  // Default service call or no service call
                  break;
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
        open={fourthLoading}
        onClose={() => {
          handleFourthLoading(false);
          setDataComplementos([]);
        }}
      >
        <Box component="form">
          <Divider />

          {dataComplementos && dataComplementos.length > 0 ? (
            <RenderDataGrid
              title="Respuesta de requerimientos o solicitudes al usuario"
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
                  handleFourthLoading(false);
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
