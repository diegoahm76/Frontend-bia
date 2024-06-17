/* eslint-disable @typescript-eslint/naming-convention */
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import  { useContext, useEffect } from 'react';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { columnsGridHistorico } from '../utils/columnsGridHistorico';
import { AccountCircle } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getInitialData } from '../../../services/getInitialData.service';
import { useNavigate } from 'react-router-dom';
import {
  getAnexosSolicitud,
  getDetalleSolicitud,
} from '../../../services/afterCreatedUserRequest.service';
import { ModalInfoSolicitudReq } from './ModalInfoSolicitud/ModalInfoSolicitudReq';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';
import { useStepperRequerimiento } from '../../../../../hook/useStepperRequerimiento';
import { RequerimientoAlUsuarioOPASContext } from '../../../../OPAS/requerimientosUsuarioOpas/context/RequerimientoUsarioOpasContext';
import { useAppSelector } from '../../../../../../../../hooks';
import { Loader } from '../../../../../../../../utils/Loader/Loader';
import { formatDate } from '../../../../../../TramitesServicios/utils/FormatoFecha';
import { RenderDataGrid } from '../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { showAlert } from '../../../../../../../../utils/showAlert/ShowAlert';
import { AnyIfEmpty } from 'react-redux';


export const FormParte1 = ({
  controlFormulario,
  handleSubmitFormulario,
  errorsFormulario,
  resetFormulario,
  watchFormulario,
}: any): JSX.Element => {
  // ? stepper hook
  const { handleNext, handleReset } = useStepperRequerimiento();

  //* context declaration
  const { secondLoading, handleFifthLoading, handleOpenModalOne } = useContext(
    ModalAndLoadingContext
  );
  const {
    setInfoInicialUsuario,
    infoInicialUsuario,
    setCurrentSolicitudUsuario,
  } = useContext(RequerimientoAlUsuarioOPASContext);

  //* navigate declaration
  const navigate = useNavigate();

  //* redux state
  const currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas: any = useAppSelector(
    (state: any) =>
      state.BandejaTareasSlice
        .currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas
  );

  const { handleGeneralLoading, handleSecondLoading } = useContext(
    ModalAndLoadingContext
  );

  useEffect(() => {
    if (!currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas) {
      navigate('/app/gestor_documental/bandeja_tareas/');
      return;
    }
    //* deberian pasar dos cosas también, que se resetee el stepper y que se resetee el formulario y todos los demás campos guardados
    handleReset();

   void getInitialData(
      currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_tramite,
      navigate,
      handleGeneralLoading,
      handleSecondLoading
    ).then((data) => {
      setInfoInicialUsuario(data);
    });
  }, []);

  const getInfoSolicitud = async (params: any) => {
  /*  const [detalleSolicitud, anexos] = await Promise.all([
      getDetalleSolicitud(
        params?.row?.id_solicitud_al_usuario_sobre_pqrsdf,
        handleFifthLoading
      ),
    ]);*/
    getAnexosSolicitud(
      params?.row?.id_requerimiento,
      handleFifthLoading
      ).then((data) => {
        console.log('data', data);
        setCurrentSolicitudUsuario(data);
    }
    );
    /*
    const data = {
      detalleSolicitud,
      anexos,
    };*/

  };

  // ? definicion de las columnas
  const columns = [
    ...columnsGridHistorico,
    {
      headerName: 'Acciones',
      field: 'accion',
      renderCell: (params: any) => (
        <>
          <Tooltip title="Ver solicitud de requerimiento realizada">
            <IconButton
              onClick={async () => {
                handleOpenModalOne(true); //* open modal
                await getInfoSolicitud(params); // ? modificar solicitud
                console.log('params', params);
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
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  if (secondLoading) {
    return (
      <Grid
        container
        sx={{
          position: 'relative',
          justifyContent: 'center',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '2rem',
          mt: '1.2rem',
          mb: '1.2rem',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Loader altura={400} />
      </Grid>
    );
  }

  return (
    <>
      <form
        style={{
          marginTop: '3rem',
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            mb: '2rem',
            justifyContent: 'center',
          }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              disabled
              size="small"
              label="Tipo de operación OPA"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                maxLength: 50,
              }}
              value={infoInicialUsuario?.detallePQRSDF?.data?.tipo_operacion_tramite ?? 'N/A'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              disabled
              size="small"
              label="Estado actual de la OPA"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                maxLength: 10,
              }}
              value={
                infoInicialUsuario?.detallePQRSDF?.data?.estado_actual ?? 'N/A'
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Número de radicado"
              disabled
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={infoInicialUsuario?.detallePQRSDF?.data?.radicado ?? 'N/A'}
            />
          </Grid>
          <Grid item xs={12} sm={6}
           
          >
            <TextField
              fullWidth
              size="small"
              label="Fecha de radicado"
              variant="outlined"
              disabled
              InputLabelProps={{ shrink: true }}
              value={
                formatDate(
                  infoInicialUsuario?.detallePQRSDF?.data
                    ?.fecha_radicado
                ) ?? 'N/A'
              }
            />
          </Grid>
          {/*<Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              multiline
              sx={{
                textAlign: 'center',
              }}
              rows={2}
              size="small"
              label="Asunto de la PQRSDF"
              variant="outlined"
              disabled
              InputLabelProps={{ shrink: true }}
              value={infoInicialUsuario?.detallePQRSDF?.data?.asunto ?? 'N/A'}
            />
          </Grid>*/}
          {/*<Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              multiline
              sx={{
                textAlign: 'center',
                mt: '1.5rem',
                mb: '1.5rem',
              }}
              //* revisar que crea esta configuración de InputProps
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              rows={5}
              size="small"
              label="Descripción de la PQRSDF"
              variant="outlined"
              disabled
              InputLabelProps={{ shrink: true }}
              value={
                infoInicialUsuario?.detallePQRSDF?.data?.descripcion ?? 'N/A'
              }
            />
          </Grid>*/}

          {/* tabla de elementos a mostrar */}

          {/* estos datos a mostrar van a ser los históricos de las solicitudes y requerimientos que se han realizado */}

          {infoInicialUsuario?.dataHistoricoSolicitudesPQRSDF?.data?.length >
          0 ? (
            <RenderDataGrid
              title="Histórico de requerimientos realizados"
              columns={columns ?? []}
              rows={
                [...infoInicialUsuario?.dataHistoricoSolicitudesPQRSDF?.data] ??
                []
              }
            />
          ) : (
            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                textAlign: 'center',
                justifyContent: 'center',
                mt: '2.5rem',
                fontWeight: 'bold',
              }}
            >
              No hay histórico de requerimientos para este trámite
            </Typography>
          )}
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            width: '100%',
            maxWidth: '100%',
            mt: '2rem',
            textAlign: 'center',
            paddingBottom: '2rem',
          }}
        >
          <Button
            variant="contained"
            color="success"
            startIcon={<SaveAsIcon />}
            onClick={() => {
              //* hacer validaciones previas antes de permitir el next, para el paso 2
              console.log('jeje next');
              if (
                currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.estado_tarea ===
                'Respondida por el propietario de la bandeja de tareas'
              ) {
                showAlert(
                  'Opss!',
                  'Este trámite ya ha sido respondido, por lo tanto, no es posible realizar un nuevo requerimiento al usuario; solo se puede acceder al historial de estas solicitudes.',
                  'warning'
                );
                return;
              }
              handleNext();
            }}
            sx={{
              width: '60%',
            }}
          >
            Crear solicitud de requerimiento al usuario sobre trámite
          </Button>
        </Grid>
      </form>

      <ModalInfoSolicitudReq />
    </>
  );
};
