/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { interface_conductor_seleccionado, interface_vehiculo_agendado_conductor, interface_vehiculo_seleccionado } from "../interfaces/types";
import AddIcon from '@mui/icons-material/Add';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { control_error } from "../../../../helpers";
import { v4 as uuidv4 } from 'uuid';
import { Title } from "../../../../components";


interface props {
  vehiculo_seleccionado: interface_vehiculo_seleccionado;
  conductor_seleccionado: interface_conductor_seleccionado;
  set_conductor_seleccionado: React.Dispatch<React.SetStateAction<interface_conductor_seleccionado>>
  set_vehiculo_seleccionado: React.Dispatch<React.SetStateAction<interface_vehiculo_seleccionado>>
  id_persona_conductor:number;
  id_hoja_vida_vehiculo:number;
  set_vehiculo_agendado_conductor: React.Dispatch<React.SetStateAction<interface_vehiculo_agendado_conductor[]>>;
  set_id_hoja_vida_vehiculo: React.Dispatch<React.SetStateAction<number>>;
  set_id_persona_conductor: React.Dispatch<React.SetStateAction<number>>;
}

const VehiculosConductoresAsignados: React.FC<props> = ({
    vehiculo_seleccionado, 
    conductor_seleccionado,
    id_persona_conductor,
    id_hoja_vida_vehiculo,
    set_vehiculo_agendado_conductor,
    set_conductor_seleccionado,
    set_vehiculo_seleccionado,
    set_id_hoja_vida_vehiculo,
    set_id_persona_conductor
  }) => {
    const [msj_error_fecha_salida, set_msj_error_fecha_salida] = useState<string>("");
    const [msj_error_fecha_retorno, set_msj_error_fecha_retorno] = useState<string>("");
    const [nombre_vehiculo, set_nombre_vehiculo] = useState<string>('');
    const [placa_vehiculo, set_placa_vehiculo] = useState<string>('');
    const [marca_vehiculo, set_marca_vehiculo] = useState<string>('');
    const [tipo_vehiculo, set_tipo_vehiculo] = useState<string>('');
    const [capacidad_pasajeros, set_capacidad_pasajeros] = useState<number>(0);
    const [color_vehiculo, set_color_vehiculo] = useState<string>('');
    
    
    const [documento_coductor, set_documento_coductor] = useState<string>('');
    const [nombre_conductor, set_nombre_conductor] = useState<string>('');
    const [telefono_conductor, set_telefono_conductor] = useState<string>('');
    const [tipo_conductor, set_tipo_conductor] = useState<string>('');
    const [fecha_salida, set_fecha_salida] = useState<Dayjs>(dayjs());
    const [fecha_retorno, set_fecha_retorno] = useState<Dayjs>(dayjs());


  const [vehiculo_agendado_temp, set_vehiculo_agendado_temp] = useState<interface_vehiculo_agendado_conductor>(Object);

  useEffect(()=>{
    set_vehiculo_agendado_temp({
      id_borrar: uuidv4(),
      //pendiente pasar los datos de vehiculo_seleccionado y conductor_seleccionado
      nombre_vehiculo: vehiculo_seleccionado.nombre,
      vehiculo_placa: vehiculo_seleccionado.placa,
      marca_vehiculo: vehiculo_seleccionado.marca_nombre,
      tipo_vehiculo: vehiculo_seleccionado.tipo_vehiculo,
      capacidad_pasajeros: vehiculo_seleccionado.capacidad_pasajeros,
      color_vehiculo: vehiculo_seleccionado.color,
      nro_documento: conductor_seleccionado.numero_documento,
      nombre_conductor: conductor_seleccionado.nombre_persona,
      telefono_conductor: conductor_seleccionado.telefono_celular,
      tipo_conductor: conductor_seleccionado.nombre_clase_tercero,

      id_hoja_vida_vehiculo: id_hoja_vida_vehiculo,
      id_persona_conductor: id_persona_conductor,
      fecha_inicio_asignacion: fecha_salida.format('YYYY-MM-DD'),
      fecha_final_asignacion: fecha_retorno.format('YYYY-MM-DD'),
    })
  },[id_hoja_vida_vehiculo,id_persona_conductor,vehiculo_seleccionado,conductor_seleccionado,fecha_retorno,fecha_salida])

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
    set_vehiculo_agendado_temp({} as interface_vehiculo_agendado_conductor);
    set_placa_vehiculo('')
    set_documento_coductor('');
    set_nombre_conductor('');
    set_telefono_conductor('');
    set_tipo_conductor('');
    set_nombre_vehiculo('');
    set_marca_vehiculo('');
    set_tipo_vehiculo('');
    set_capacidad_pasajeros(0);
    set_color_vehiculo('');
    set_vehiculo_seleccionado({} as interface_vehiculo_seleccionado);
    set_conductor_seleccionado({} as interface_conductor_seleccionado);
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
    } else if(id_hoja_vida_vehiculo === 0 || Object.keys(vehiculo_seleccionado).length === 0){
      control_error('Seleccione un vehículo a asignar');
      return false;
    } else if(id_persona_conductor === 0 || Object.keys(conductor_seleccionado).length === 0){
      control_error('Seleccione un conductor a asignar');
      return false;
    }
    return true;
  }

  const enviar_agendamiento_permanente = async() => {
    console.log(vehiculo_agendado_temp);
    
    const asignacion_validada = await validar_asignacion();
    if(asignacion_validada){
      set_vehiculo_agendado_conductor((prev:any) => [
        ...prev,
        vehiculo_agendado_temp
      ]);
      limpiar_agendamiento_temp();
    }
  }

  /*
  
  cod_tipo_vehiculo
  tiene_platon
  capacidad_pasajeros
  color
  ultimo_kilometraje
  marca_nombre
  vehiculo_placa


  nombre_clase_tercero
  nombre_persona
  nro_documento
  */


  useEffect(()=>{  
    set_nombre_vehiculo(vehiculo_seleccionado.nombre);
    set_placa_vehiculo(vehiculo_seleccionado.placa);
    set_marca_vehiculo(vehiculo_seleccionado.marca);
    set_tipo_vehiculo(vehiculo_seleccionado.tipo_vehiculo);
    set_capacidad_pasajeros(vehiculo_seleccionado.capacidad_pasajeros);
    set_color_vehiculo(vehiculo_seleccionado.color);

    set_documento_coductor(conductor_seleccionado.numero_documento);
    set_nombre_conductor(conductor_seleccionado.nombre_persona);
    set_telefono_conductor(conductor_seleccionado.telefono_celular);
    set_tipo_conductor(conductor_seleccionado.nombre_clase_tercero);
  },[conductor_seleccionado,vehiculo_seleccionado])

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
          px: '40px',
          mb: '20px',
        }}
      >
        <Title title="Vehículo seleccionado" />

        <Grid container item xs={12} spacing={2} my={1}>
          <Grid container item xs={12} lg={4}>
                <TextField
                  fullWidth
                  label="Nombre:"
                  size="small"
                  value={nombre_vehiculo}
                  disabled
                />
          </Grid>

          <Grid container item xs={12} lg={4}>
                <TextField
                  fullWidth
                  label="Placa:"
                  size="small"
                  value={placa_vehiculo}
                  disabled
                />
          </Grid>

          <Grid container item xs={12} lg={4}>
                <TextField
                  fullWidth
                  label="Marca:"
                  size="small"
                  value={marca_vehiculo}
                  disabled
                />
          </Grid>

          <Grid container item xs={12} lg={4}>
                <TextField
                  fullWidth
                  label="Tipo:"
                  size="small"
                  value={tipo_vehiculo}
                  disabled
                />
          </Grid>

          <Grid container item xs={12} lg={4}>
                <TextField
                  fullWidth
                  label="Capacidad:"
                  size="small"
                  value={capacidad_pasajeros === 0 ? '' : capacidad_pasajeros}
                  disabled
                />
          </Grid>

          <Grid container item xs={12} lg={4}>
                <TextField
                  fullWidth
                  label="Color:"
                  size="small"
                  value={color_vehiculo}
                  disabled
                />
          </Grid>
        </Grid>

        <Title title="Conductor seleccionado" />

        <Grid container item xs={12} spacing={2} my={1}>
          <Grid container item xs={12} lg={4}>
            <TextField
              fullWidth
              label="Documento:"
              size="small"
              value={documento_coductor}
              disabled
            />
          </Grid>

          <Grid container item xs={12} lg={4}>
            <TextField
              fullWidth
              label="Nombre:"
              size="small"
              value={nombre_conductor}
              disabled
            />
          </Grid>

          <Grid container item xs={12} lg={4}>
            <TextField
              fullWidth
              label="Teléfono:"
              size="small"
              value={telefono_conductor}
              disabled
            />
          </Grid>

          <Grid container item xs={12} lg={4}>
            <TextField
              fullWidth
              label="Tipo:"
              size="small"
              value={tipo_conductor}
              disabled
            />
          </Grid>

          <Grid item xs={12} lg={4}>
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

          <Grid item xs={12} lg={4}>
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
        </Grid>


        <Grid item container spacing={2} xs={12} lg={12} sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}>
          <Grid item xs={12} lg={2} >
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
          
          <Grid item xs={12} lg={2} >
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


      </Grid>
    </>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default VehiculosConductoresAsignados;