import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import BusquedaVehiculos from './BusquedaVehiculos';
import TableAsignacionVehiculos from '../tables/TableAsignacionVehiculos';
import BusquedaConductores from './BusquedaConductores';
import { data_asignacion_vehiculos, interface_conductor_seleccionado, interface_crear_vehiculo_agendado_conductor, interface_vehiculo_agendado_conductor, interface_vehiculo_seleccionado, response_asignacion_vehiculo } from '../interfaces/types';
import { useAppDispatch } from '../../../../hooks';
import { buscar_vehiculos_asignados, enviar_asignacion_vehiculo } from '../thunks/asignacion_vehiculos';
import VehiculosConductoresAsignados from './VehiculosConductoresAsignados';
import { control_error } from '../../../../helpers';
import SaveIcon from "@mui/icons-material/Save";
import CleanIcon from "@mui/icons-material/CleaningServices";
import ClearIcon from "@mui/icons-material/Clear";
import VehiculoAgendadoView from './VehiculoAgendadoView';
import Swal from 'sweetalert2';


// eslint-disable-next-line @typescript-eslint/naming-convention
const AsignacionVehiculos: React.FC = () => {
  const dispatch = useAppDispatch();
  const [mostrar_busqueda_vehiculos, set_mostrar_busqueda_vehiculos] = useState<boolean>(false);
  const [tipo_conductor, set_tipo_conductor] = useState<string>('');
  const [msj_error_tipo_conductor, set_msj_error_tipo_conductor] = useState<string>('');
  const [tipo_vehiculo, set_tipo_vehiculo] = useState<string>('');
  const [msj_error_tipo_vehiculo, set_msj_error_tipo_vehiculo] = useState<string>('');
  const [placa, set_placa] = useState<string>('');
  const [msj_error_placa, set_msj_error_placa] = useState<string>('');
  const [conductor, set_conductor] = useState<string>('');
  const [msj_error_conductor, set_msj_error_conductor] = useState<string>('');
  const [refrescar_tabla, set_refrescar_tabla] = useState<boolean>(false);
  const [refrescar_tabla_conductores, set_refrescar_tabla_conductores] = useState<boolean>(false);


  const [id_hoja_vida_vehiculo, set_id_hoja_vida_vehiculo] = useState<number>(0);
  const [id_persona_conductor, set_id_persona_conductor] = useState<number>(0);

  const [vehiculo_agendado_conductor, set_vehiculo_agendado_conductor] = useState<interface_vehiculo_agendado_conductor[]>([]);
  const [vehiculo_seleccionado, set_vehiculo_seleccionado] = useState<interface_vehiculo_seleccionado>(Object);
  const [conductor_seleccionado, set_conductor_seleccionado] = useState<interface_conductor_seleccionado>(Object)

  const [data_asignacion_vehiculos, set_data_asignacion_vehiculos] = useState<data_asignacion_vehiculos[]>([]);


  const enviar_asiganacion_a_conductor_fc: () => Promise<boolean> = async() => {
   const validado = await  dispatch(
      enviar_asignacion_vehiculo(
        vehiculo_agendado_conductor.map(
          (asignacion: interface_crear_vehiculo_agendado_conductor) => ({
              id_hoja_vida_vehiculo: asignacion.id_hoja_vida_vehiculo,
              id_persona_conductor: asignacion.id_persona_conductor,
              fecha_inicio_asignacion: asignacion.fecha_inicio_asignacion,
              fecha_final_asignacion: asignacion.fecha_final_asignacion,
            }  
          )
        )
      )
    ).then((response: response_asignacion_vehiculo)=>{
      if(response?.success === false){
        control_error('Hay un vehículo que ya está asignado a otro conductor');
        return false;
      } else {
        set_refrescar_tabla_conductores(!refrescar_tabla_conductores);
        set_refrescar_tabla(!refrescar_tabla);
        return true;
      }
    })
    .catch((response: any) => {
      console.error(response);
    });
    return validado;
  };

  const obtener_asignaciones_vehiculos: ()=> Promise<boolean> = async() => {
    const validado =  await dispatch(buscar_vehiculos_asignados(
      tipo_vehiculo,
      tipo_conductor,
      placa,
      conductor,))
      .then((response: any) => {
        if (response.data.length === 0) {
          set_data_asignacion_vehiculos([]);
          return false;
        } else {
          set_data_asignacion_vehiculos(response.data);
          return true;
        }
      })
    return validado;    
  }

  useEffect(() => {
    obtener_asignaciones_vehiculos();
  }, [refrescar_tabla,refrescar_tabla_conductores])

  /**
   * Maneja el evento de cambio del input de selección del tipo de conductor.
   * @param event El evento de cambio de selección.
   */
  const cambio_tipo_conductor: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_tipo_conductor(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_tipo_conductor("");
  }

  /**
   * Función que se ejecuta cuando se cambia el tipo de vehículo seleccionado.
   * 
   * @param {SelectChangeEvent} event - El evento de cambio de selección.
   * @returns {void}
   */
  const cambio_tipo_vehiculo = (event: SelectChangeEvent): void => {
    set_tipo_vehiculo(event.target.value);
    if (event.target.value !== null && event.target.value !== "") {
      set_msj_error_tipo_vehiculo("");
    }
  }

  const limpiar_form_asignacion = () => {
    set_conductor('');
    set_placa('');
    set_tipo_vehiculo('');
    set_tipo_conductor('');
    set_msj_error_tipo_vehiculo('');
    set_msj_error_tipo_conductor('');
    set_msj_error_placa('');
    set_msj_error_conductor('');
  }

  /**
   * Función que se ejecuta al consultar los vehículos asignados.
   * 
   * @param {React.FormEvent<Element>} e - El evento de formulario.
   * @returns {void}
   */
  const consultar_vehiculos_asignados: (e: React.FormEvent<Element>) => void = async (e) => {
    e.preventDefault();
    const envio_datos = await obtener_asignaciones_vehiculos();
    if(!envio_datos){
      control_error('No se encontraron asignaciones con los filtros seleccionados');
    }
  }

  /**
   * Función que se ejecuta al enviar la asignación a conductor.
   * 
   * @returns {void}
   */
  const enviar_asiganacion_a_conductor = async() => {
    // Verifica si no se ha agregado ninguna asignación
    if(vehiculo_agendado_conductor.length === 0){
      control_error('Agregue por lo menos una asignación');
      return;
    } else {
      // Muestra un mensaje de confirmación al usuario
      Swal.fire({
        title: '¿Está seguro de enviar las asignaciones?',
        showDenyButton: true,
        confirmButtonText: `Si`,
        denyButtonText: `Cancelar`,
        confirmButtonColor: '#042F4A',
        cancelButtonColor: '#DE1616',
        icon: 'question',
      }).then(async(result) => {
        /* Lee más sobre isConfirmed, isDenied a continuación */
        if (result.isConfirmed) {
          // Envía la asignación a través de la función enviar_asiganacion_a_conductor_fc
          const enviado = await enviar_asiganacion_a_conductor_fc();
          if(enviado){
            // Si la asignación se envió correctamente, se limpia el estado vehiculo_agendado_conductor
            set_vehiculo_agendado_conductor([]);
          }
          return;
        } else if(result.isDenied){
          return;
        }
      });
    }
  }

  useEffect(() => {
    console.log(vehiculo_seleccionado);
    console.log(conductor_seleccionado);
  }
  , [vehiculo_seleccionado, conductor_seleccionado]);

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
          borderRadius: '15px',
          margin: 'auto',
          p: '40px',
          mb: '20px',
        }}
      >
        <Title title='Vehículos Asignados' />

        <Box
          component="form"
          onSubmit={consultar_vehiculos_asignados}
          noValidate
          autoComplete="off"
          sx={{ width: '100%', mt: '20px' }}
        >
          <Grid item container spacing={1} mb='15px' rowSpacing={2} xs={12}>

            <Grid item xs={12} lg={2}>
              <FormControl required size='small' fullWidth>
                <InputLabel>Tipo de conductor: </InputLabel>
                <Select
                  label='Tipo de conductor: '
                  fullWidth
                  value={tipo_conductor}
                  onChange={cambio_tipo_conductor}
                  error={msj_error_tipo_conductor !== ""}
                >
                  <MenuItem value={'IN'}>Interno</MenuItem>
                  <MenuItem value={'EX'}>Externo</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={2}>
              <FormControl required size='small' fullWidth>
                <InputLabel>Tipo de Vehículo: </InputLabel>
                <Select
                  label='Tipo de Vehículo: '
                  fullWidth
                  value={tipo_vehiculo}
                  onChange={cambio_tipo_vehiculo}
                  error={msj_error_tipo_vehiculo !== ""}
                >
                  <MenuItem value={'C'}>Carro</MenuItem>
                  <MenuItem value={'M'}>Moto</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={2}>
              <TextField
                label='Placa: '
                fullWidth
                placeholder='Buscar'
                size="small"
                error={msj_error_placa !== ''}
                value={placa}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  set_msj_error_placa('')
                  set_placa(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} lg={2}>
              <TextField
                label='Conductor:'
                fullWidth
                placeholder='Buscar'
                size="small"
                error={msj_error_conductor !== ''}
                value={conductor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  set_msj_error_conductor('')
                  set_conductor(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12} lg={2}>
              <Button
                fullWidth
                color='primary'
                variant='contained'
                startIcon={<SearchIcon />}
                type='submit'
                onClick={consultar_vehiculos_asignados}
              >
                Buscar
              </Button>
            </Grid>
            <Grid item xs={12} lg={2}>
              <Button
                fullWidth
                color="inherit"
                variant="outlined"
                startIcon={<CleanIcon />}
                onClick={limpiar_form_asignacion}
              >
                Limpiar
              </Button>
            </Grid>
          </Grid>

          <Grid item container xs={12} sx={{
            display: 'flex',
            justifyContent: 'center'
          }}>

            <Grid item container xs={12} sx={{
              display: 'flex',
              justifyContent: 'center'
            }}>
              <TableAsignacionVehiculos
                obtener_asignaciones_vehiculos={obtener_asignaciones_vehiculos}
                refrescar_tabla={refrescar_tabla}
                set_refrescar_tabla={set_refrescar_tabla}
                data_asignacion_vehiculos={data_asignacion_vehiculos}
                refrescar_tabla_conductores={refrescar_tabla_conductores}
                set_refrescar_tabla_conductores={set_refrescar_tabla_conductores}
              />
            </Grid>

            {!mostrar_busqueda_vehiculos &&
              <Button
                color='success'
                variant='contained'
                startIcon={<AddIcon />}
                onClick={() => set_mostrar_busqueda_vehiculos(true)}
              >
                Asignar Vehículo
              </Button>
            }
          </Grid>
        </Box>
      </Grid>


      {mostrar_busqueda_vehiculos &&
        <>
          <BusquedaVehiculos
            set_vehiculo_seleccionado={set_vehiculo_seleccionado}
            set_id_hoja_vida_vehiculo={set_id_hoja_vida_vehiculo}
          />
          <BusquedaConductores
            refrescar_tabla_conductores={refrescar_tabla_conductores}
            set_conductor_seleccionado={set_conductor_seleccionado}
            set_id_persona_conductor={set_id_persona_conductor}
          />

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
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20px'
            }}
          >
            <Title title="Vehículos y conductores asignados" />
            <VehiculosConductoresAsignados
              set_vehiculo_agendado_conductor={set_vehiculo_agendado_conductor}
              conductor_seleccionado={conductor_seleccionado}
              vehiculo_seleccionado={vehiculo_seleccionado}
              id_hoja_vida_vehiculo={id_hoja_vida_vehiculo}
              id_persona_conductor={id_persona_conductor}
              set_conductor_seleccionado={set_conductor_seleccionado}
              set_vehiculo_seleccionado={set_vehiculo_seleccionado}
              set_id_hoja_vida_vehiculo={set_id_hoja_vida_vehiculo}
              set_id_persona_conductor={set_id_persona_conductor}
            />

            {vehiculo_agendado_conductor?.map((agendacion, index) => (
              <VehiculoAgendadoView
                key={index}
                set_vehiculo_agendado_conductor={set_vehiculo_agendado_conductor}
                vehiculo_agendado_conductor={vehiculo_agendado_conductor}
                fecha_inicio_input={agendacion.fecha_inicio_asignacion}
                fecha_fin_input={agendacion.fecha_final_asignacion}
                nombre_vehiculo={agendacion.nombre_vehiculo}
                vehiculo_placa={agendacion.vehiculo_placa}
                marca_vehiculo={agendacion.marca_vehiculo}
                tipo_vehiculo={agendacion.tipo_vehiculo}
                capacidad_pasajeros={agendacion.capacidad_pasajeros}
                color_vehiculo={agendacion.color_vehiculo}
                nro_documento={agendacion.nro_documento}
                nombre_conductor={agendacion.nombre_conductor}
                telefono_conductor={agendacion.telefono_conductor}
                tipo_conductor={agendacion.tipo_conductor}
                id_borrar={agendacion.id_borrar}
              />
            ))}

            <Grid
              container
              spacing={1}
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Grid item xs={12} md={1.5} >
                <Button
                  fullWidth
                  color="success"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  disabled={vehiculo_agendado_conductor?.length === 0}
                  onClick={enviar_asiganacion_a_conductor}
                >
                  Guardar
                </Button>
              </Grid>
              <Grid item xs={12} md={1.5} >
                <Button
                  fullWidth
                  color="error"
                  variant="contained"
                  startIcon={<ClearIcon />}
                  onClick={() => {
                    set_vehiculo_agendado_conductor([]);
                    set_mostrar_busqueda_vehiculos(false);
                  }}
                >
                  Salir
                </Button>
              </Grid>
              <Grid item xs={12} md={1.5} >
                <Button
                  fullWidth
                  color="inherit"
                  variant="outlined"
                  startIcon={<CleanIcon />}
                  onClick={() => set_vehiculo_agendado_conductor([])}
                >
                  Limpiar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </>
      }

    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default AsignacionVehiculos;