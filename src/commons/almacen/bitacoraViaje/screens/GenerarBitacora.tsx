import { Button, FormLabel, Grid, Switch, TextField } from "@mui/material";
import { Title } from "../../../../components";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
import CleanIcon from "@mui/icons-material/CleaningServices";
import ClearIcon from "@mui/icons-material/Clear";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { data_busqueda_conductores, interface_agendamientos_bitacora, interface_bitacora_completa, response_bitacora_completa } from "../interfaces/types";
import BusquedaConductores from "./BusquedaConductores";
import { useAppDispatch } from "../../../../hooks";
import { buscar_bitacora_completa, enviar_bitacora_inicio, enviar_bitacora_llegada } from "../thunks/bitacora_viajes";
import Swal from "sweetalert2";
import { control_success, control_error } from "../../../../helpers";

interface Props {
  set_mostrar_generar_bitacora: (value: boolean)=>void;
  data_solicitud_agendada:interface_agendamientos_bitacora;
  set_refrescar_tabla: React.Dispatch<React.SetStateAction<boolean>>;
  refrescar_tabla: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const GenerarBitacora: React.FC<Props> = ({set_mostrar_generar_bitacora,data_solicitud_agendada,set_refrescar_tabla,refrescar_tabla}) => {
  const dispatch = useAppDispatch();

  const [es_conductor_asignado, set_es_conductor_asignado] = useState<boolean>(false);
  const [conductor, set_conductor] = useState<string>('');
  const [mjs_error_conductor, set_mjs_error_conductor] = useState<string>('');
  const [novedad_salida, set_novedad_salida] = useState<string>('');
  const [novedad_llegada, set_novedad_llegada] = useState<string>('');
  const [fecha_salida, set_fecha_salida] = useState<Dayjs | null>(null);
  const [fecha_llegada, set_fecha_llegada] = useState<Dayjs | null>(null);

  const [mostrar_busqueda_vehiculos, set_mostrar_busqueda_vehiculos] = useState<boolean>(false);

  const [conductor_buscado, set_conductor_buscado] = useState<data_busqueda_conductores>(Object);

  const [data_bitacora_completa, set_data_bitacora_completa] = useState<interface_bitacora_completa>(Object);

  const cambio_fecha_salida = (date: Dayjs | null) => {
    if(date !== null){
      set_fecha_salida(date);
    }
  }
  const cambio_fecha_llegada = (date: Dayjs | null) => {
    if(date !== null){
      set_fecha_llegada(date);
    }
  }

  useEffect(()=>{
    if(Object.keys(conductor_buscado).length !== 0){
      set_conductor(conductor_buscado.nombre_persona);
    }
  },[conductor_buscado])


  const limpiar_form_salida = () => {
    set_es_conductor_asignado(false);
    set_conductor('')
    set_novedad_salida('');
    set_conductor_buscado({
      id_clase_tercero_persona: 0,
      id_persona: 0,
      id_clase_tercero: 0,
      nombre_clase_tercero: '',
      nombre_persona: '',
      nro_documento: '',
    })
  }

  const validar_form_bitacora: ()=> Promise<boolean> = async() => {
    if(data_solicitud_agendada?.ya_inicio === false){
      if(!es_conductor_asignado){
        if(Object.keys(conductor_buscado).length === 0 || conductor.trim() === ''){
          control_error('Busque y seleccione un conductor');
          set_mjs_error_conductor('Busque y seleccione un conductor');
          return false;
        }
      }
    }
    return true;
  }

  const enviar_bitacora = async() => {
    const form_validado = await validar_form_bitacora();
    if(form_validado){
      Swal.fire({
        title: '¿Está de seguro de enviar la bitácora?',
        showDenyButton: true,
        confirmButtonText: `Si`,
        denyButtonText: `Cancelar`,
        confirmButtonColor: '#042F4A',
        cancelButtonColor: '#DE1616',
        icon: 'question',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if(data_solicitud_agendada?.ya_inicio === false){
            dispatch(enviar_bitacora_inicio({
              id_viaje_agendado: data_solicitud_agendada.id_viaje_agendado,
              es_conductor_asignado: es_conductor_asignado,
              ...(!es_conductor_asignado ? {id_conductor_que_parte: conductor_buscado.id_persona} : {}),
              novedad_salida: novedad_salida
            }))
            .then((response: { success: boolean, detail: string, data: any }) => {
              if(response?.success){
                limpiar_form_salida();
                set_mostrar_generar_bitacora(false);
                set_refrescar_tabla(!refrescar_tabla);
                control_success('Se envió la bitácora de salida correctamente');
                return;
              } else if (response?.detail) {
                return;
              }
            })
          } else if(data_solicitud_agendada?.ya_inicio === true && data_solicitud_agendada?.ya_llego === false){
            console.log('enviar bitacora de llegada');
            
            dispatch(enviar_bitacora_llegada(data_solicitud_agendada.id_viaje_agendado,{
              novedad_llegada: novedad_llegada
            }))
            .then((response: { success: boolean, detail: string, data: any }) => {
              if(response?.success){
                limpiar_form_salida();
                set_mostrar_generar_bitacora(false);
                set_refrescar_tabla(!refrescar_tabla);
                control_success('Se envió la bitácora de llegada correctamente');
                return;
              } else if (response?.detail) {
                return;
              }
            })
          }
          return;
        } else if(result.isDenied){
          return;
        }
      });
    }
  }

  useEffect(()=>{
    if(data_solicitud_agendada?.ya_llego){
      dispatch(buscar_bitacora_completa(data_solicitud_agendada.id_viaje_agendado))
      .then((response: response_bitacora_completa) => {
        if(Object.keys(response).length !== 0){
          set_data_bitacora_completa(response.data[0]);
          return;
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
    }
  },[data_solicitud_agendada])

  useEffect(()=>{
    if(data_solicitud_agendada?.ya_llego){
      if(Object.keys(data_bitacora_completa).length !== 0){        
        set_fecha_salida(dayjs(data_bitacora_completa.fecha_inicio_recorrido));
        set_novedad_salida(data_bitacora_completa.novedad_salida ?? '');
        set_fecha_llegada(dayjs(data_bitacora_completa.fecha_llegada_recorrido));
        set_novedad_llegada(data_bitacora_completa.novedad_llegada ?? '');
      }
    }
  },[data_bitacora_completa,data_solicitud_agendada])

  useEffect(()=>{
    set_novedad_salida('');
    set_novedad_llegada('');
  },[data_solicitud_agendada])


  return (
    <>
      <Grid
        container
        spacing={2}
        marginTop={2}
        width={"100%"}
        sx={{
          position: "relative",
          background: "#FAFAFA",
          boxShadow: "0px 3px 6px #042F4A26",
          borderRadius: "15px",
          margin: "auto",
          p: "20px",
          mb: "20px",
        }}
        >
        <Title title="Generar bitácora" />

        {data_solicitud_agendada?.ya_llego || !data_solicitud_agendada?.ya_inicio ?
          <>
            <BusquedaConductores
              mostrar_busqueda_vehiculos={mostrar_busqueda_vehiculos}
              set_conductor_buscado={set_conductor_buscado}
              set_mostrar_busqueda_vehiculos={set_mostrar_busqueda_vehiculos}
            />

            { !data_solicitud_agendada?.ya_llego &&
              <Grid item container xs={12} display={"flex"} justifyContent={"center"} margin={"10px 0px"}>
              <Grid item xs={6}>
                <FormLabel htmlFor="es_conductor_asignado">
                  ¿El conductor que sale es el asignado?
                </FormLabel>
                <Switch
                  id="es_conductor_asignado"
                  checked={es_conductor_asignado}
                  onChange={() =>{
                    set_mjs_error_conductor('');
                    set_es_conductor_asignado(!es_conductor_asignado)
                  }}
                />
              </Grid>

              <Grid
                item
                xs={5}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Grid item xs={4}>
                  <TextField
                    label='Buscar conductor: '
                    fullWidth
                    value={conductor}
                    error={mjs_error_conductor !== ''}
                    disabled={es_conductor_asignado}
                    onChange={(e)=>set_conductor(e.target.value)}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    disabled={es_conductor_asignado}
                    startIcon={<SearchIcon />}
                    onClick={()=>{
                      set_mjs_error_conductor('');
                      set_mostrar_busqueda_vehiculos(true);
                    }}
                  >
                    Buscar
                  </Button>
                </Grid>
              </Grid>
              </Grid>
            }

            {data_solicitud_agendada?.ya_llego &&
              <Grid item xs={12} md={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disabled
                    label='Fecha de salida: '
                    value={fecha_salida}
                    onChange={(newValue) => {
                      cambio_fecha_salida(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField disabled required fullWidth size="small" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            }

            <Grid item xs={12}>
              <Grid item xs={12} sx={{display:'flex',flexDirection:'column', marginTop:'10px', marginBottom:'20px'}}>
                <TextField
                  label="Novedad de salida"
                  fullWidth
                  placeholder="Escriba si presenta alguna novedad"
                  disabled={data_solicitud_agendada?.ya_llego}
                  size="small"
                  value={novedad_salida}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_novedad_salida(e.target.value)}
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
          </>
          :
          <></>
        }

        {data_solicitud_agendada?.ya_inicio &&
          <>
            {data_solicitud_agendada?.ya_llego &&
              <Grid item xs={12} md={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disabled
                    label='Fecha de llegada: '
                    value={fecha_llegada}
                    onChange={(newValue) => {
                      cambio_fecha_llegada(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField disabled required fullWidth size="small" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            }
            <Grid item xs={12}>
              <Grid item xs={12} sx={{display:'flex',flexDirection:'column', marginTop:'10px', marginBottom:'20px'}}>
                <TextField
                  label="Novedad de llegada"
                  fullWidth
                  disabled={data_solicitud_agendada?.ya_llego}
                  placeholder="Escriba si presenta alguna novedad"
                  size="small"
                  multiline
                  value={novedad_llegada}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_novedad_llegada(e.target.value)}
                  rows={3}
                />
              </Grid>
            </Grid>
          </>
        }
      

          <Grid item xs={12}  sx={{
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
              onClick={enviar_bitacora}
            >
              Guardar
            </Button>
            

            <Button
              color="error"
              variant="contained"
              startIcon={<ClearIcon />}
              onClick={() => {
                set_mostrar_generar_bitacora(false);
              }}
            >
              Salir
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<CleanIcon />}
              onClick={() => {}}
            >
              Limpiar
            </Button>
            
          </Grid>
        

      </Grid>
    </>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default GenerarBitacora;