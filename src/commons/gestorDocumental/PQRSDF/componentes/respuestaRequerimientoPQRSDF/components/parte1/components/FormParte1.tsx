/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from '@mui/material';
import { useContext, useEffect } from 'react';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { useNavigate } from 'react-router-dom';
import { useStepperRequerimiento } from '../../../../../../bandejaDeTareas/hook/useStepperRequerimiento';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';
import { useAppSelector } from '../../../../../../../../hooks';
import { showAlert } from '../../../../../../../../utils/showAlert/ShowAlert';
import { Loader } from '../../../../../../../../utils/Loader/Loader';
import { formatDate } from '../../../../../../TramitesServicios/utils/FormatoFecha';


export const FormParte1 = ({ controlFormulario }: any): JSX.Element => {
  // ? stepper hook
  const { handleNext, handleReset } = useStepperRequerimiento();

  //* context declaration
  const { secondLoading } = useContext(ModalAndLoadingContext);

  //* navigate declaration
  const navigate = useNavigate();

  //* redux state
  const { currentPersonaRespuestaUsuario } = useAppSelector(
    (state) => state.ResRequerimientoOpaSlice
  );

/*  useEffect(() => {
    if (!currentPersonaRespuestaUsuario) {
      navigate('/app/gestor_documental/tramites/respuesta_requerimiento_opa/');
      showAlert('Opps...', ' No tienes acceso a éste módulo', 'info');
      return;
    }
    handleReset();
  }, []);*/

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
              label="Información del requerimiento"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                maxLength: 50,
              }}
              value={currentPersonaRespuestaUsuario?.descripcion ?? 'N/A'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              disabled
              size="small"
              label="Nombre de tipo de oficio"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                maxLength: 10,
              }}
              value={currentPersonaRespuestaUsuario?.nombre_tipo_oficio ?? 'N/A'}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              size="small"
              label="Fecha de radicado"
              variant="outlined"
              disabled
              InputLabelProps={{ shrink: true }}
              value={
                formatDate(currentPersonaRespuestaUsuario?.fecha_solicitud) ??
                'N/A'
              }
            />
          </Grid>
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
              handleNext();
            }}
            sx={{
              width: '60%',
            }}
          >
            Responder / radicar respuesta a requerimiento seleccionado
          </Button>
        </Grid>
      </form>
    </>
  );
};
