import React, { useState } from 'react';
import { Box, Button, CircularProgress, Dialog, DialogContent, Grid, TextField } from '@mui/material';
import { Title } from '../../../../components';
import { useAppDispatch } from '../../../../hooks';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';
import { put_anular_despacho_sin_solicitud } from '../thunks/despacho_solicitudes';
import { control_error, control_success } from '../../../../helpers';



interface props {
  set_mostrar_modal_anular_despacho_sin_solicitud: React.Dispatch<React.SetStateAction<boolean>>;
  mostrar_modal_anular_despacho_sin_solicitud: boolean;
  get_obtener_despachos_sin_solictud_fc: () => void;
  id_solicitud_activo: number | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ModalAnularDespachoSinSolicitud: React.FC<props> = ({
  set_mostrar_modal_anular_despacho_sin_solicitud,
  mostrar_modal_anular_despacho_sin_solicitud,
  get_obtener_despachos_sin_solictud_fc,
  id_solicitud_activo,
}) => {

  const dispatch = useAppDispatch();

  const [btn_loadding, set_btn_loadding] = useState<boolean>(false);

  const [justificacion_anulacion, set_justificacion_anulacion] = useState<string>('');

  const limpiar_form = () => {
    set_justificacion_anulacion('');
  }

  const anular_despacho_con_solicitud = () => {
    Swal.fire({
      title: '¿Está seguro de anular la solicitud?',
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#042F4A',
      cancelButtonColor: '#DE1616',
      icon: 'question',
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        set_btn_loadding(true);

        await dispatch(put_anular_despacho_sin_solicitud(id_solicitud_activo,{
          justificacion_anulacion: justificacion_anulacion
        }))
          .then((response: any) => {
            if (Object.keys(response).length !== 0) {
              control_success('Solicitud anulada correctamente');
              get_obtener_despachos_sin_solictud_fc();
              set_mostrar_modal_anular_despacho_sin_solicitud(false);
              limpiar_form();
              set_btn_loadding(false);
            } else {
              control_error('Hubo un error al intentar anular la solicitud');
              set_btn_loadding(false);
            }
          })
        return true;
      }
    })
  }

  return (
    <>
      <Dialog
        open={mostrar_modal_anular_despacho_sin_solicitud}
        onClose={() => {
          set_mostrar_modal_anular_despacho_sin_solicitud(false);
        }}
        fullWidth maxWidth="lg" >
        <DialogContent>
          <Grid
            container
            marginTop={2}
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '30px',
              mb: '10px',
              boxShadow: '0px 3px 6px #042F4A26',
            }}
            >
            <Title title={'Justificación de la anulacion'} />
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{width:'100%', mt:'20px'}}
              >
              <Grid item container mb={2} spacing={2} xs={12}>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Justificación anulacion:'
                    multiline
                    rows={4}
                    value={justificacion_anulacion}
                    onChange={(e) => set_justificacion_anulacion(e.target.value)}
                    size='small'
                  />
                </Grid>

              </Grid>
            </Box>

            <Grid container item xs={12} spacing={1} sx={{display:'flex', justifyContent:'end'}}>
              <Grid item xs={12} lg={3}>
                <Button
                  fullWidth
                  color='success'
                  variant='contained'
                  startIcon={btn_loadding ? <CircularProgress size='24px' />  : <SaveIcon />}
                  disabled={justificacion_anulacion === '' || btn_loadding}
                  onClick={anular_despacho_con_solicitud}
                >
                  {!btn_loadding && 'Anular solicitud'}
                </Button>
              </Grid>

              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  color="error"
                  variant="contained"
                  startIcon={<ClearIcon />}
                  onClick={()=>set_mostrar_modal_anular_despacho_sin_solicitud(false)}
                >
                  Salir
                </Button>
              </Grid>
            </Grid>

          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
 

// eslint-disable-next-line no-restricted-syntax
export default ModalAnularDespachoSinSolicitud;