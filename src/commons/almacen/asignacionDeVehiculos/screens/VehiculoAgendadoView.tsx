/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField } from "@mui/material";
import { Title } from "../../../../components";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from "react";
import { interface_vehiculo_agendado_conductor } from "../interfaces/types";

interface props {
  vehiculo_placa: string;
  nro_documento: string;
  fecha_inicio_input: string;
  fecha_fin_input: string;
  id_borrar: string;
  set_vehiculo_agendado_conductor: React.Dispatch<React.SetStateAction<interface_vehiculo_agendado_conductor[]>>;
  vehiculo_agendado_conductor: interface_vehiculo_agendado_conductor[];
}

const VehiculoAgendadoView: React.FC<props> = ({vehiculo_placa, nro_documento, fecha_inicio_input, fecha_fin_input, id_borrar,set_vehiculo_agendado_conductor,vehiculo_agendado_conductor}) => {
  const [fecha_salida, set_fecha_salida] = useState<Dayjs>(dayjs());
  const [fecha_retorno, set_fecha_retorno] = useState<Dayjs>(dayjs());

  const cambio_fecha_salida = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_salida(date);
    }
  };

  const cambio_fecha_retorno = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_retorno(date);
    }
  };

  const eliminar_asignacion_temp = () => {
    set_vehiculo_agendado_conductor(vehiculo_agendado_conductor.filter(objeto => objeto.id_borrar !== id_borrar));
  }

  useEffect(()=>{
    set_fecha_salida(dayjs(fecha_inicio_input, 'YYYY-MM-DD'));
    set_fecha_retorno(dayjs(fecha_fin_input, 'YYYY-MM-DD'));    
  },[fecha_inicio_input, fecha_fin_input])

  return (
    <>
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
          <Grid container item xs={12} md={2}>
            <Grid item xs={4} md={12}>
              <b style={{width:'100%'}}>Vehículo:</b>
            </Grid>
            <Grid item xs={4} md={12}>
              <span style={{width:'100%'}}>{vehiculo_placa}</span>
            </Grid>
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
                disabled
                label='Fecha de salida*:'
                value={fecha_salida}
                onChange={(newValue) => {
                  cambio_fecha_salida(newValue);
                }}
                renderInput={(params) => (
                  <TextField fullWidth size="small" {...params} />
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
                disabled
                label='Fecha de retorno*:'
                value={fecha_retorno}
                onChange={(newValue) => {
                  cambio_fecha_retorno(newValue);
                }}
                renderInput={(params) => (
                  <TextField fullWidth size="small" {...params} />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid container item xs={12} md={2}>
            <Grid item xs={4} md={12}>
              <b style={{width:'100%'}}>Vehículo:</b>
            </Grid>
            <Grid item xs={4} md={12}>
              <span style={{width:'100%'}}>{nro_documento}</span>
            </Grid>
          </Grid>

          <Grid item xs={12} md={0.5} sx={{display:'flex', justifyContent:'end'}}>
            <DeleteForeverIcon 
              onClick={eliminar_asignacion_temp}
              sx={{fontSize:'40px', color:'#d32f2f', cursor:'pointer'}}/>                                         
          </Grid>              
      </Grid>
    </>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default VehiculoAgendadoView;