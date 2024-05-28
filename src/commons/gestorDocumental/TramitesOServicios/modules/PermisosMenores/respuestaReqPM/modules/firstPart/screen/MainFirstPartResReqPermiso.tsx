/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
/*import { type AuthSlice } from '../../../auth/interfaces';
import SeleccionTipoPersona from '../componentes/SolicitudPQRSDF/SeleccionTipoPersona';
import EstadoPqrsdf from '../componentes/SolicitudPQRSDF/EstadoPqrsdf';
import ListadoPqrsdf from '../componentes/SolicitudPQRSDF/ListadoPqrsdf';
import TipoEmpresa from '../componentes/SolicitudPQRSDF/TipoEmpresa';
import TipoPoderdante from '../componentes/SolicitudPQRSDF/TipoPoderdante';
import TipoPersona from '../componentes/SolicitudPQRSDF/TipoPersona';
import FormButton from '../../../../components/partials/form/FormButton';
import Limpiar from '../../../conservacion/componentes/Limpiar';*/
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SelccionarPersona } from '../components/seleccionarPersona/SeleccionarPersona';
import { RestartAlt } from '@mui/icons-material';
import { ListaPorPersonaSolPendientes } from '../components/listaPorPersonasSolPendientes/ListaPorPersonaSolPendientes';
import { useAppDispatch, useAppSelector } from '../../../../../../../../../hooks';
import { setCurrentPersonaRespuestaUsuario } from '../../../../../../respuestaRequerimientoOpa/toolkit/slice/ResRequerimientoOpaSlice';
import { Title } from '../../../../../../../../../components';
import { control_info } from '../../../../../../../alertasgestor/utils/control_error_or_success';

// ? ------------
// * http://localhost:3000/#/app/gestor_documental/pqrsdf/solicitud_pqrsdf
// ? ------------
/**
 * Main component for the first part of the response to requirement OPAS.
 * Renders the UI for the response to requirement OPAS module.
 */
export const MainFirstPartResReqOpa = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* redux states declaration
  const { currentPersonaRespuestaUsuario } = useAppSelector(
    (state) => state.ResRequerimientoOpaSlice
  );
  const { representacion_legal, userinfo } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (representacion_legal.tipo_sesion === 'E') {
      //* analizar si se debe cambiar la forma en la que se estructura el datos para almacenarlo de manera mas ordenada
      dispatch(
        setCurrentPersonaRespuestaUsuario({
          ...userinfo,
          ...representacion_legal,
        } as any)
      );
      return;
    }

    dispatch(setCurrentPersonaRespuestaUsuario(null as any));
  }, []);

  return (
    <>
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
        <Grid item xs={12} marginY={4}>
          <Title title="Respuesta solicitud / requerimiento OPAS"></Title>
        </Grid>

        {representacion_legal.tipo_sesion === 'I' && <SelccionarPersona />}

        {currentPersonaRespuestaUsuario && Object.keys(currentPersonaRespuestaUsuario) && <ListaPorPersonaSolPendientes />}

        <Grid container direction="row" padding={2} spacing={2}></Grid>
        <Button
          href={`/#/app/gestor_documental/tramites/tramites_o_servicios/`}
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
        >
          {/* cuando se ejecuta la vuelta a radicación también se debe reiniciarel módulo para que no se vaya con información basura */}
          Volver a radicación
        </Button>
        <Button
          sx={{ ml: 2 }}
          variant="outlined"
          color="primary"
          onClick={() => {
            control_info('Se ha reiniciado el módulo correctamente');
            dispatch(setCurrentPersonaRespuestaUsuario(null as any));
          }
          }
          startIcon={<RestartAlt />}
        >
          REINICIAR MÓDULO
        </Button>
      </Grid>
    </>
  );
};
