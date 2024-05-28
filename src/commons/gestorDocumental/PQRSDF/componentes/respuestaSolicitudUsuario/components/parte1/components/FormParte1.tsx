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
import SaveAsIcon from '@mui/icons-material/SaveAs';
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
import { ResSolicitudUsuarioContext } from '../../../context/ResSolicitudUsarioContext';
import { useStepperResSolicitudUsuario } from '../../../hook/useStepperResSolicitudUsuario';
import { api } from '../../../../../../../../api/axios';

export const FormParte1 = ({
  controlFormulario,
  handleSubmitFormulario,
  errorsFormulario,
  resetFormulario,
  watchFormulario,
}: any): JSX.Element => {
  // ? stepper hook

  //* context declaration
  const { secondLoading } = useContext(ModalAndLoadingContext);
  const {
    setInfoInicialUsuario,
    infoInicialUsuario,
    respuestaPqrs,
    setRespuestaPqrs,
    respuestaPqrsdfMade,
    setrespuestaPqrsdfMade
  } = useContext(ResSolicitudUsuarioContext);

  //* navigate declaration
  const navigate = useNavigate();
  //* redux state
  const currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas = useAppSelector(
    (state: any) =>
      state.BandejaTareasSlice
        .currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas
  );

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
//trae la data  de al a respuestac
  const getPqrsdfResponse = async () => {
    try {
      const url = `/gestor/pqr/get_respuesta_pqrsdf-panel/${+currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas.id_pqrsdf}/`;
      const res = await api.get(url); // Utiliza Axios para realizar la solicitud GET
      const respuestaPqrsdf = res.data.data;
      setrespuestaPqrsdfMade(respuestaPqrsdf);
      // console.log('respuesta a una solicitud', respuestaPqrsdf);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  const fetchData = async (): Promise<void> => {
    try {
      console.log(
        'url',
        currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas.id_pqrsdf
      );
      const url = `/gestor/pqr/get_pqrsdf-panel/${+currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas.id_pqrsdf}/`;
      const res = await api.get(url); // Utiliza Axios para realizar la solicitud GET
      const respuestaPqrsdf = res.data.data;
      console.log(respuestaPqrsdf, 'respuestaPqrsdf')
      setRespuestaPqrs(respuestaPqrsdf);
      // console.log('respuesta a una solicitud', respuestaPqrsdf);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchData();
      await getPqrsdfResponse();
    })();
  }, []);

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
              value={respuestaPqrs.tipo_pqrsdf_descripcion ?? 'N/A'}
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
              value={respuestaPqrs.estado ?? 'N/A'}
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
              value={respuestaPqrsdfMade?.numero_radicado_entrada?? 'N/A'}
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
              value={respuestaPqrs.fecha_radicado ?? 'N/A'}
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
              value={respuestaPqrs?.asunto ?? 'N/A'}
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
              value={respuestaPqrs.descripcion ?? 'N/A'}
            />
          </Grid>
        </Grid>
        {/*  <Grid
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
              console.log('jeje next')
              handleNext();
            }}
            sx={{
              width: '60%',
            }}
          >
            Crear solicitud de requerimiento
          </Button>
        </Grid>*/}
      </form>

      {/*<ModalInfoSolicitud />*/}
    </>
  );
};
