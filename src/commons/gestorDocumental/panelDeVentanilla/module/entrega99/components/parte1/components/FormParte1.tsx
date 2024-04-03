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
import React, { useContext, useEffect } from 'react';
import { RenderDataGrid } from '../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { useSstepperFn } from '../../../hook/useSstepperFn';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { SolicitudAlUsuarioContext } from '../../../context/SolicitudUsarioContext';
import { formatDate } from '../../../../../../../../utils/functions/formatDate';
import { Loader } from '../../../../../../../../utils/Loader/Loader';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';
import { columnsGridHistorico } from '../utils/columnsGridHistorico';
import { AccountCircle } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getInitialData } from '../../../services/getInitialData.service';
import { useAppSelector } from '../../../../../../../../hooks';
import { useNavigate } from 'react-router-dom';
import {
  getAnexosSolicitud,
  getDetalleSolicitud,
} from '../../../services/afterCreatedUserRequest.service';
import { ModalInfoSolicitud } from './ModalInfoSolicitud/ModalInfoSolicitud';

export const FormParte1 = ({
  controlFormulario,
  handleSubmitFormulario,
  errorsFormulario,
  resetFormulario,
  watchFormulario,
}: any): JSX.Element => {
  // ? stepper hook
  const { handleNext } = useSstepperFn();

  //* context declaration
  const {
    secondLoading,
    handleFifthLoading,
    handleOpenModalOne,
    openModalOne,
  } = useContext(ModalAndLoadingContext);
  const {
    setInfoInicialUsuario,
    infoInicialUsuario,
    setCurrentSolicitudUsuario,
  } = useContext(SolicitudAlUsuarioContext);

  //* navigate declaration
  const navigate = useNavigate();

  //* redux state
  const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
    (state) =>
      state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
  );

  const { handleReset } = useSstepperFn();

  //* context declaration
  const { handleGeneralLoading, handleSecondLoading } = useContext(
    ModalAndLoadingContext
  );

  useEffect(() => {
    if (!currentElementPqrsdComplementoTramitesYotros) {
      navigate('/app/gestor_documental/panel_ventanilla/');
      return;
    }
    //* deberian pasar dos cosas también, que se resetee el stepper y que se resetee el formulario y todos los demás campos guardados
    handleReset();
    void getInitialData(
      currentElementPqrsdComplementoTramitesYotros?.id_PQRSDF,
      navigate,
      handleGeneralLoading,
      handleSecondLoading
    ).then((data) => {
      setInfoInicialUsuario(data);
    });
  }, []);

  const getInfoSolicitud = async (params: any) => {
    const [detalleSolicitud, anexos] = await Promise.all([
      getDetalleSolicitud(params?.row?.id_solicitud_al_usuario_sobre_pqrsdf, handleFifthLoading),
      getAnexosSolicitud(params?.row?.id_solicitud_al_usuario_sobre_pqrsdf, handleFifthLoading),
    ]);

    const data = {
      detalleSolicitud,
      anexos,
    };

    setCurrentSolicitudUsuario(data);
  };

  // ? definicion de las columnas
  const columns = [
    ...columnsGridHistorico,
    {
      headerName: 'Acciones',
      field: 'accion',
      renderCell: (params: any) => (
        <>
        <Tooltip title="Ver solicitud realizada">
          <IconButton
            onClick={async () => {
              handleOpenModalOne(true); //* open modal
              console.log(openModalOne);
              await getInfoSolicitud(params);
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
        <Loader altura={350} />
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
              label="Tipo de PQRSDF"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                maxLength: 50,
              }}
              value={infoInicialUsuario?.detallePQRSDF?.data?.tipo ?? 'N/A'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              disabled
              size="small"
              label="Estado"
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
              label="Número de radicado de entrada"
              disabled
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={infoInicialUsuario?.detallePQRSDF?.data?.radicado ?? 'N/A'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Fecha de radicado de entrada"
              variant="outlined"
              disabled
              InputLabelProps={{ shrink: true }}
              value={
                formatDate(
                  infoInicialUsuario?.detallePQRSDF?.data
                    ?.fecha_radicado_entrada
                ) ?? 'N/A'
              }
            />
          </Grid>
          <Grid item xs={12} sm={12}>
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
          </Grid>
          <Grid item xs={12} sm={12}>
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
          </Grid>

          {/* tabla de elementos a mostrar */}

          {/* estos datos a mostrar van a ser los históricos de las solicitudes y requerimientos que se han realizado */}

          {infoInicialUsuario?.dataHistoricoSolicitudesPQRSDF?.data?.length >
          0 ? (
            <RenderDataGrid
              title="Histórico de solicitudes de complemento al usuario"
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
                mt: '1.5rem',
              }}
            >
              No hay histórico de solicitudes para esta PQRSDF
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

              handleNext();
            }}
            sx={{
              width: '60%',
            }}
          >
            Crear solicitud
          </Button>
        </Grid>
      </form>

      <ModalInfoSolicitud />
    </>
  );
};
