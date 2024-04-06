import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useAppDispatch } from '../../../../hooks';
import { Title } from '../../../../components';
import { interface_rechazo_solicitud } from '../interfaces/types';
import { enviar_rechazo_solicitud_viaje } from '../thunks/agendamiento_vehiculos';
import { control_error, control_success } from '../../../../helpers';
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import ClearIcon from '@mui/icons-material/Clear';
import Swal from 'sweetalert2';

interface props {
  id_solicitud_viaje: number;
  set_mostrar_input_no_aprobado: React.Dispatch<React.SetStateAction<boolean>>;
  set_refrescar_tabla: React.Dispatch<React.SetStateAction<boolean>>;
  refrescar_tabla: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const RechazoSolicitud: React.FC<props> = ({id_solicitud_viaje, set_mostrar_input_no_aprobado,set_refrescar_tabla,refrescar_tabla}) => {
  const dispatch = useAppDispatch();


  const [data_rechazo_solicitud_viaje, set_data_rechazo_solicitud_viaje] = useState<interface_rechazo_solicitud>(Object);
  const [observacion_rechazo, set_observacion_rechazo] = useState<string>("");
  const [msj_error_observacion_rechazo, set_msj_error_observacion_rechazo] = useState<string>("");


  const enviar_rechazo_solicitud_viaje_fc: () => void = () => {
    dispatch(enviar_rechazo_solicitud_viaje(data_rechazo_solicitud_viaje))
      .then((response: any) => {
        console.log(response);
        if (response.succes) {
          control_success('Se envió rechazo la solicitud correctamente');
        }
      })
  }

  useEffect(() => {
    set_data_rechazo_solicitud_viaje({
      id_solicitud_viaje: id_solicitud_viaje,
      observacion_no_autorizado: observacion_rechazo
    });
  }, [id_solicitud_viaje,observacion_rechazo])

  
  const validar_form_rechazo:() => Promise<boolean> = async() => {
    if(observacion_rechazo.trim() === ''){
      control_error('Escriba una justificación de rechazo')
      set_msj_error_observacion_rechazo('Escriba una justificación de rechazo');
      return false;
    }
    return true;
  }

  const btn_enviar_rechazo_solicitud_viaje = async() => {
    const form_validado = await validar_form_rechazo();

    if(form_validado){
    Swal.fire({
      title: '¿Está seguro que desea reprobar esta solicitud?',
      showDenyButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
      confirmButtonColor: '#042F4A',
      cancelButtonColor: '#DE1616',
      icon: 'question',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
          control_success('Reprobación de la petición creada exitosamente');
          enviar_rechazo_solicitud_viaje_fc();
          set_observacion_rechazo('');
          set_mostrar_input_no_aprobado(false);
          set_refrescar_tabla(!refrescar_tabla);
          return true;
        } else if(result.isDenied){
          return false;
        }
      });
    }
  }


  return (
    <>
      <Grid container item spacing={1} xs={12} sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}>
        <Title title='Observación de no aprobación'/>
        <Grid 
          item 
          xs={11.9} 
          sx={{
          display:'flex',
          flexDirection:'column',
          alignItems:'start',
          marginTop: '20px'
          }}>
          <TextField
            label='Justificación del rechazo:'
            required
            error={msj_error_observacion_rechazo !== ''}
            value={observacion_rechazo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
              set_msj_error_observacion_rechazo('');
              set_observacion_rechazo(e.target.value)
            }}
            fullWidth
            size="small"
            multiline
            rows={2}
          />
        </Grid>
        
        <Grid item xs={12} sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            marginTop: "20px",
            gap: 4,
          }}
          >
          <Button
            color="success"
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={btn_enviar_rechazo_solicitud_viaje}
          >
            Guardar
          </Button>
          <Button
            color="error"
            variant="contained"
            startIcon={<ClearIcon />}
            onClick={()=>{
              set_msj_error_observacion_rechazo('');
              set_mostrar_input_no_aprobado(false);
            }}
          >
            Salir
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            startIcon={<CleanIcon />}
            onClick={()=>set_observacion_rechazo('')}
          >
            Limpiar
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default RechazoSolicitud;