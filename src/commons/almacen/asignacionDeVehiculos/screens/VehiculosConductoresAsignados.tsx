/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { interface_vehiculo_agendado_conductor } from "../interfaces/types";
import AddIcon from '@mui/icons-material/Add';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { control_error } from "../../../../helpers";
import { v4 as uuidv4 } from 'uuid';


interface props {
  vehiculo_placa: string;
  nro_documento: string;
  set_nro_documento: React.Dispatch<React.SetStateAction<string>>
  set_vehiculo_placa: React.Dispatch<React.SetStateAction<string>>
  id_persona_conductor:number;
  id_hoja_vida_vehiculo:number;
  set_vehiculo_agendado_conductor: React.Dispatch<React.SetStateAction<interface_vehiculo_agendado_conductor[]>>;
  set_id_hoja_vida_vehiculo: React.Dispatch<React.SetStateAction<number>>;
  set_id_persona_conductor: React.Dispatch<React.SetStateAction<number>>;
}

const VehiculosConductoresAsignados: React.FC<props> = ({
    vehiculo_placa, 
    nro_documento,
    id_persona_conductor,
    id_hoja_vida_vehiculo,
    set_vehiculo_agendado_conductor,
    set_nro_documento,
    set_vehiculo_placa,
    set_id_hoja_vida_vehiculo,
    set_id_persona_conductor
  }) => {
  const [fecha_salida, set_fecha_salida] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_salida, set_msj_error_fecha_salida] = useState<string>("");
  const [fecha_retorno, set_fecha_retorno] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_retorno, set_msj_error_fecha_retorno] = useState<string>("");
  const [placa_vehiculo, set_placa_vehiculo] = useState<string>();
  const [documento_coductor, set_documento_coductor] = useState<string>();

  

  const [vehiculo_agendado_temp, set_vehiculo_agendado_temp] = useState<interface_vehiculo_agendado_conductor>({
    id_borrar:'',
    vehiculo_placa:'',
    nro_documento:'',
    id_hoja_vida_vehiculo: 0,
    id_persona_conductor: 0,
    fecha_inicio_asignacion: '',
    fecha_final_asignacion: '',
  });

  useEffect(()=>{
    set_vehiculo_agendado_temp({
      id_borrar: uuidv4(),
      vehiculo_placa: vehiculo_placa,
      nro_documento: nro_documento,
      id_hoja_vida_vehiculo: id_hoja_vida_vehiculo,
      id_persona_conductor: id_persona_conductor,
      fecha_inicio_asignacion: fecha_salida.format('YYYY-MM-DD'),
      fecha_final_asignacion: fecha_retorno.format('YYYY-MM-DD'),
    })
  },[id_hoja_vida_vehiculo,id_persona_conductor,nro_documento,vehiculo_placa,fecha_retorno,fecha_salida])

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
      id_borrar: '',
      vehiculo_placa:'',
      nro_documento:'',
      id_hoja_vida_vehiculo: 0,
      id_persona_conductor: 0,
      fecha_inicio_asignacion: '',
      fecha_final_asignacion: '',
    });
    set_placa_vehiculo('')
    set_documento_coductor('');
    set_nro_documento('');
    set_vehiculo_placa('');
    set_id_hoja_vida_vehiculo(0);
    set_id_persona_conductor(0);
    set_fecha_salida(dayjs());
    set_fecha_retorno(dayjs());
  }

  const validar_asignacion:()=> Promise<boolean> = async() => {
    if(fecha_salida.isValid() === false){
      control_error('Ingrese una fecha de salida válida');
      return false;
    } else if(fecha_retorno.isValid() === false){
      control_error('Ingrese una fecha de retorno válida');
      return false;
    } else if(fecha_salida.isAfter(fecha_retorno)){
      control_error('La fecha de retorno no puede ser anterior a la fecha de salida');
      return false;
    } else if(id_hoja_vida_vehiculo === 0 || vehiculo_placa.trim() === ''){
      control_error('Seleccione un vehículo a asignar');
      return false;
    } else if(id_persona_conductor === 0 || nro_documento?.trim() === ''){
      control_error('Seleccione un conductor a asignar');
      return false;
    }
    return true;
  }

  const enviar_agendamiento_permanente = async() => {
    const asignacion_validada = await validar_asignacion();
    if(asignacion_validada){
      set_vehiculo_agendado_conductor((prev:any) => [
        ...prev,
        vehiculo_agendado_temp
      ]);
      limpiar_agendamiento_temp();
    }
  }



  useEffect(()=>{  
    set_placa_vehiculo(vehiculo_placa);
    set_documento_coductor(nro_documento);
  },[vehiculo_placa,nro_documento])

  return (
    <>
      <Grid
          container
          rowSpacing={1}
          columnSpacing={2}
          marginTop={2}
          sx={{
            position: 'relative',
            background: '#FAFAFA',
            boxShadow: '0px 3px 6px #042F4A26',
            borderRadius: '10px',
            margin: 'auto',
            py: '40px',
            px: '20px',
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
                <span style={{width:'100%'}}>{placa_vehiculo}</span>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              md={2.5}
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
              md={2.5}
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

            <Grid container item xs={12} md={2}>
              <Grid item xs={4} md={12}>
                <b style={{width:'100%'}}>Conductor:</b>
              </Grid>
              <Grid item xs={4} md={12}>
                <span style={{width:'100%'}}>{documento_coductor}</span>
              </Grid>
            </Grid>

            <Grid item xs={12} md={1.2} >
              <Button
                fullWidth
                onClick={enviar_agendamiento_permanente}
                color="success"
                variant="contained"
                startIcon={<AddIcon />}
              >
                Agregar
              </Button>
            </Grid>
            
            <Grid item xs={12} md={1.2} >
              <Button
                fullWidth
                color="inherit"
                variant="outlined"
                startIcon={<CleanIcon />}
                onClick={limpiar_agendamiento_temp}
              >
                Limpiar
              </Button>                                    
            </Grid>
      </Grid>
    </>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default VehiculosConductoresAsignados;