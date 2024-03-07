/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, FormLabel, Grid, Radio, TextField } from "@mui/material";
import { cambio_input_radio } from "../thunks/cambio_input_radio";
import { estilo_radio } from "../thunks/estilo_radio";
import React, { useEffect, useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import { interface_put_revisar_vehiculo, interface_vehiculos_con_novedad, response_put_revisar_vehiculo } from "../interfaces/types";
import { put_verificar_inspeccion } from "../thunks/revision_inspeccion";
import { useAppDispatch } from "../../../../hooks";
import Swal from "sweetalert2";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface props {
  set_mostrar_view_inpeccion: React.Dispatch<React.SetStateAction<boolean>>;
  inspeccion: interface_vehiculos_con_novedad,
  set_data_inspeccion_revisada: React.Dispatch<React.SetStateAction<interface_put_revisar_vehiculo>>;
}


const RowVehiculo: React.FC<props> = ({set_mostrar_view_inpeccion, inspeccion, set_data_inspeccion_revisada}) => {
  const dispatch = useAppDispatch();

  const [esta_revisado, set_esta_revisado] = useState<string>('false');
  const [nombre_placa_vehiculo, set_nombre_placa_vehiculo] = useState<string>('');
  const [novedades_inspecciones, set_novedades_inspecciones] = useState<string>('');

  
  const put_verificar_inspeccion_fc: () => Promise<boolean> = async() => {
    await dispatch(put_verificar_inspeccion(inspeccion.id_inspeccion_vehiculo))
      .then((response: response_put_revisar_vehiculo) => {
        if(response !== undefined && Object.keys(response).length !== 0){
          set_data_inspeccion_revisada(response.data);
        }
      }
    )
    return true;
  }


  const enviar_revisado = async() => {
    if(!inspeccion.verificacion_superior_realizada){
      Swal.fire({
        title: '¿Está seguro de revisar el vehículo?',
        showDenyButton: true,
        confirmButtonColor: '#042F4A',
        cancelButtonColor: '#DE1616',
        icon: 'question',
        confirmButtonText: `Revisar`,
        denyButtonText: `Cancelar`,
      }).then(async(result) => {
        if (result.isConfirmed) {
          const data = await put_verificar_inspeccion_fc();
          if(data){
            set_mostrar_view_inpeccion(true);
            set_esta_revisado('true');
          }
        }
      });
    } else {
      const data = await put_verificar_inspeccion_fc();
      if(data){
        set_mostrar_view_inpeccion(true);
        set_esta_revisado('true');
      }
    }
  }

  useEffect(()=>{
    set_nombre_placa_vehiculo(inspeccion.placa_marca);
    set_esta_revisado(inspeccion.verificacion_superior_realizada.toString());
    if('novedad' in inspeccion){
      set_novedades_inspecciones(inspeccion.novedad?.replace(/_/g, ' ') ?? '');
      return;
    } else if ('cantidad_novedades' in inspeccion){
      set_novedades_inspecciones(inspeccion.cantidad_novedades?.toString() ?? '');
    }
  },[inspeccion])

  return (
    <Grid container spacing={1} item sx={{
        width:'100%',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        background: '#FAFAFA',
        borderRadius: '15px',
        boxShadow: '0px 3px 6px #042F4A26',
        p: '20px',
        my: '20px',
      }}>
        <Grid item xs={5}>
          <TextField
            fullWidth
            label='Nombre y placa vehículo:'
            value={nombre_placa_vehiculo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_nombre_placa_vehiculo(e.target.value)}
            required
            disabled
            size="small"
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            fullWidth
            label='Novedades de inspección:'
            value={novedades_inspecciones}
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_novedades_inspecciones(e.target.value)}
            required
            disabled
            size="small"
          />
        </Grid>

        <Grid item xs={1.5} sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          <Grid item >¿Revisado?</Grid>

          <Grid item sx={{display:'flex',gap:'45px'}} >
            <Grid>Si</Grid>
            <Grid>No</Grid>
          </Grid>

          <Grid item sx={{display:'flex',gap:2}}>
            <Radio
              disabled
              {...cambio_input_radio('true',esta_revisado,set_esta_revisado)}
                sx={estilo_radio('#27b355',28)}
            />
            <Radio
              disabled
              {...cambio_input_radio('false',esta_revisado,set_esta_revisado)}
                sx={estilo_radio('#e23a3a',28)}
            />
          </Grid>
        </Grid>
        
        <Grid item xs={2.5}>
          <Button
            fullWidth
            color='primary'
            variant='contained'
            startIcon={inspeccion.verificacion_superior_realizada ? <RemoveRedEyeIcon/> : <SaveIcon/>}
            onClick={enviar_revisado}
            >
              {inspeccion.verificacion_superior_realizada ? 'Ver Revisión' : 'Revisar'}
          </Button>
        </Grid>
    </Grid>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default RowVehiculo;