/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField } from "@mui/material";
import { Title } from "../../../../components";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { interface_vehiculo_agendado_conductor } from "../interfaces/types";

interface props {
  vehiculo_placa: string;
  nro_documento: string;
  id_persona_conductor:number;
  id_hoja_vida_vehiculo:number;
  set_vehiculo_agendado_conductor: React.Dispatch<React.SetStateAction<interface_vehiculo_agendado_conductor[]>>;
}

const VehiculosConductoresAsignados: React.FC<props> = ({vehiculo_placa, nro_documento,id_persona_conductor,id_hoja_vida_vehiculo,set_vehiculo_agendado_conductor}) => {
  const [fecha_salida, set_fecha_salida] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_salida, set_msj_error_fecha_salida] = useState<string>("");
  const [fecha_retorno, set_fecha_retorno] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_retorno, set_msj_error_fecha_retorno] = useState<string>("");
  const [placa_vehiculo, set_placa_vehiculo] = useState<string>(vehiculo_placa);
  const [documento_coductor, set_documento_coductor] = useState<string>(nro_documento);


  const [vehiculo_agendado_temp, set_vehiculo_agendado_temp] = useState<interface_vehiculo_agendado_conductor>({
    id_hoja_vida_vehiculo: 0,
    id_persona_conductor: 0,
    fecha_inicio_asignacion: '',
    fecha_final_asignacion: '',
  });

  useEffect(()=>{
    set_vehiculo_agendado_temp({
      id_hoja_vida_vehiculo: id_hoja_vida_vehiculo,
      id_persona_conductor: id_persona_conductor,
      fecha_inicio_asignacion: fecha_salida.format('DD/MM/YYYY'),
      fecha_final_asignacion: fecha_retorno.format('DD/MM/YYYY'),
    })
  },[id_hoja_vida_vehiculo,id_persona_conductor,nro_documento,vehiculo_placa])

  const cambio_fecha_salida = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_salida(date);
      set_msj_error_fecha_salida("");
    } else {
      set_msj_error_fecha_salida("El campo Fecha inicio es obligatorio.");
    }
  };

  const cambio_fecha_retorno = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_retorno(date);
      set_msj_error_fecha_retorno("");
    } else {
      set_msj_error_fecha_retorno("El campo Fecha inicio es obligatorio.");
    }
  };

  const limpiar_agendamiento_temp = () => {
    set_vehiculo_agendado_temp({
      id_hoja_vida_vehiculo: 0,
      id_persona_conductor: 0,
      fecha_inicio_asignacion: '',
      fecha_final_asignacion: '',
    });
    set_placa_vehiculo('')
    set_documento_coductor('');
  }

  const enviar_agendamiento_permanente = () => {
    set_vehiculo_agendado_conductor((prev:any) => [
      ...prev,
      vehiculo_agendado_temp
    ]);
    limpiar_agendamiento_temp();
  }

  useEffect(()=>{
    console.log(vehiculo_agendado_temp);    
  },[])

  return (
    <>
      <Grid
        container
        spacing={2}
        marginTop={2}
        width={'100%'}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          boxShadow: '0px 3px 6px #042F4A26',
          borderRadius: '15px',
          margin: 'auto',
          p: '20px',
          mb: '20px',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          gap:'20px'
        }}
      > 
        <Title title="Vehículos y conductores asignados" />
        <Grid
          container
          spacing={1}
          marginTop={2}
          sx={{
            position: 'relative',
            background: '#FAFAFA',
            boxShadow: '0px 3px 6px #042F4A26',
            borderRadius: '10px',
            margin: 'auto',
            p: '20px',
            mb: '20px',
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center'
          }}
          >
            <Grid xs={12} md={2}>
              <b>Vehículo:</b>
              <p>{placa_vehiculo}</p>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              sx={{
              display: "flex",
              justifyContent: "center",
                alignItems: "center",
              }}
              >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Fecha de salida*:'
                  value={fecha_salida}
                  minDate={dayjs()}
                  onChange={(newValue) => {
                    cambio_fecha_salida(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField required fullWidth size="small" {...params} />
                  )}
                  />
              </LocalizationProvider>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Fecha de retorno*:'
                  value={fecha_retorno}
                  minDate={dayjs()}
                  onChange={(newValue) => {
                    cambio_fecha_retorno(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField required fullWidth size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid xs={12} md={2}>
              <b>Conductor:</b>
              <p>{documento_coductor}</p>
            </Grid>
            <CheckCircleOutlineIcon 
              onClick={enviar_agendamiento_permanente}
              sx={{fontSize:'40px', color:'#2e7d32', cursor:'pointer'}}/>                                         
            <DeleteForeverIcon sx={{fontSize:'40px', color:'#d32f2f', cursor:'pointer'}}/>                                         
        </Grid>
      </Grid>
    </>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default VehiculosConductoresAsignados;