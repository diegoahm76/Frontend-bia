import React, { useState } from 'react';
import { Box, Button, CircularProgress, Dialog, DialogContent, Grid, TextField } from '@mui/material';
import { Title } from '../../../../components';
import { useAppDispatch } from '../../../../hooks';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';
import { put_rechazar_despacho_con_solicitud } from '../thunks/despacho_solicitudes';
import { control_error, control_success } from '../../../../helpers';



interface props {
  set_mostar_modal_rechazar_despacho: React.Dispatch<React.SetStateAction<boolean>>;
  mostar_modal_rechazar_despacho: boolean;
  id_solicitud_activo: number | null;
  get_obtener_solicitudes_activos_fc: () => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ModalRechazarDespachoConSolicitud: React.FC<props> = ({
  set_mostar_modal_rechazar_despacho,
  mostar_modal_rechazar_despacho,
  get_obtener_solicitudes_activos_fc,
  id_solicitud_activo
}) => {

  const dispatch = useAppDispatch();

  const [btn_loadding, set_btn_loadding] = useState<boolean>(false);

  const [justificacion_rechazo, set_justificacion_rechazo] = useState<string>('');

  const limpiar_form = () => {
    set_justificacion_rechazo('');
  }

  const rechazar_despacho_con_solicitud = () => {
    Swal.fire({
      title: '¿Está seguro de rechazar la solicitud?',
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#042F4A',
      cancelButtonColor: '#DE1616',
      icon: 'question',
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        set_btn_loadding(true);

        await dispatch(put_rechazar_despacho_con_solicitud(id_solicitud_activo,{
          justificacion_rechazo_almacen: justificacion_rechazo
        }))
          .then((response: any) => {
            if (Object.keys(response).length !== 0) {
              control_success('Solicitud anulada correctamente');
              get_obtener_solicitudes_activos_fc();
              set_mostar_modal_rechazar_despacho(false);
              limpiar_form();
              set_btn_loadding(false);
            } else {
              control_error('Hubo un error al intentar anular la solicitud');
              set_btn_loadding
            }
          })
        return true;
      }
    })
  }

  return (
    <>
      <Dialog
        open={mostar_modal_rechazar_despacho}
        onClose={() => {
          set_mostar_modal_rechazar_despacho(false);
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
                    label='Justificación del rechazo:'
                    multiline
                    rows={4}
                    value={justificacion_rechazo}
                    onChange={(e) => set_justificacion_rechazo(e.target.value)}
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
                  startIcon={btn_loadding ? <CircularProgress size='24px'  />  : <SaveIcon />}
                  disabled={justificacion_rechazo === '' || btn_loadding}
                  onClick={rechazar_despacho_con_solicitud}
                >
                  {!btn_loadding && 'Rechazar solicitud'}
                </Button>
              </Grid>

              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  color="error"
                  variant="contained"
                  startIcon={<ClearIcon />}
                  onClick={()=>set_mostar_modal_rechazar_despacho(false)}
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
export default ModalRechazarDespachoConSolicitud;