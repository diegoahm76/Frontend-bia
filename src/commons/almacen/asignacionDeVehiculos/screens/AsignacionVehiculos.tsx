import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import BusquedaVehiculos from './BusquedaVehiculos';
import TableAsignacionVehiculos from '../tables/TableAsignacionVehiculos';
import BusquedaConductores from './BusquedaConductores';
import { data_asignacion_vehiculos, interface_vehiculo_agendado_conductor } from '../interfaces/types';
import { useAppDispatch } from '../../../../hooks';
import { buscar_vehiculos_asignados } from '../thunks/asignacion_vehiculos';
import VehiculosConductoresAsignados from './VehiculosConductoresAsignados';
import { control_error } from '../../../../helpers';
import SaveIcon from "@mui/icons-material/Save";
import CleanIcon from "@mui/icons-material/CleaningServices";
import ClearIcon from "@mui/icons-material/Clear"; 
import VehiculoAgendadoView from './VehiculoAgendadoView';


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

  const [id_hoja_vida_vehiculo, set_id_hoja_vida_vehiculo] = useState<number>(0);
  const [id_persona_conductor, set_id_persona_conductor] = useState<number>(0);
  const [nro_documento, set_nro_documento] = useState<string>('');
  const [vehiculo_placa, set_vehiculo_placa] = useState<string>('');

  const [vehiculo_agendado_conductor, set_vehiculo_agendado_conductor] = useState<interface_vehiculo_agendado_conductor[]>([]);
  
  const [data_asignacion_vehiculos, set_data_asignacion_vehiculos] = useState<data_asignacion_vehiculos[]>([]);


  const obtener_asignaciones_vehiculos: () => void = () => {
    dispatch(buscar_vehiculos_asignados(
      tipo_vehiculo,
      tipo_conductor,
      placa,
      conductor,))
      .then((response: any) => {
        if (response.data.length === 0) {
          control_error('No se encontraron asignaciones con los filtros seleccionados');
          set_data_asignacion_vehiculos([]);
        } else {
          set_data_asignacion_vehiculos(response.data);
        }
      })
  }

  useEffect(()=>{
    obtener_asignaciones_vehiculos();
  },[])

  const cambio_tipo_conductor: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_tipo_conductor(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_tipo_conductor("");
  }

  const cambio_tipo_vehiculo: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_tipo_vehiculo(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
    set_msj_error_tipo_vehiculo("");
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


  const consultar_vehiculos_asignados:(e: React.FormEvent<Element>)=>void = async(e) => {
    e.preventDefault();
    obtener_asignaciones_vehiculos();
    
  }

  useEffect(()=>{
    console.log(vehiculo_agendado_conductor);    
    /*if(id_hoja_vida_vehiculo !== 0 || id_persona_conductor !== 0){
      console.log({
        placa_vahiculo: vehiculo_placa,
        id_vehiculo: id_hoja_vida_vehiculo,
        id_conductor: id_persona_conductor,
        nro_documento: nro_documento,
      });
    }*/
  },[vehiculo_agendado_conductor])

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
          p: '20px',
          mb: '20px',
        }}
        >
        <Title title='Vehículos Asignados' />

        <Box
          component="form"
          onSubmit={consultar_vehiculos_asignados}
          noValidate
          autoComplete="off"
          sx={{width:'100%', mt:'20px'}}
          >
            <Grid item container xs={12} sx={{
              display:'flex',
              gap:'10px'
            }}>
              <Grid item xs={12} md={2}
                sx={{
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center'
                }}
                >
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

              <Grid item xs={12} md={2}
                sx={{
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center'
                }}
                >
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

              <Grid item xs={12} md={1} sx={{
                display:'flex',
                justifyContent: 'center',
                alignItems:'center',
                gap:1
                }} >
                <TextField
                  label='Placa: '
                  fullWidth
                  placeholder='Buscar'
                  size="small"
                  error={msj_error_placa !== ''}
                  value={placa}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                    set_msj_error_placa('')
                    set_placa(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12} md={2} sx={{
                display:'flex',
                justifyContent: 'center',
                alignItems:'center',
                gap:1
                }} >
                <TextField
                  label='conductor'
                  fullWidth
                  placeholder='Buscar'
                  size="small"
                  error={msj_error_conductor !== ''}
                  value={conductor}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                    set_msj_error_conductor('')
                    set_conductor(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12} md={2} sx={{
                display:'flex',
                justifyContent: 'center',
                alignItems:'center',
                }} >
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
              <Grid item xs={12} md={2} sx={{
                display:'flex',
                justifyContent: 'center',
                alignItems:'center',
                }} >
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
              display:'flex',
              justifyContent:'center'
            }}>
              
            <Grid item container xs={12} sx={{
              display:'flex',
              justifyContent:'center'
            }}>
              <TableAsignacionVehiculos
                obtener_asignaciones_vehiculos={obtener_asignaciones_vehiculos}
                refrescar_tabla={refrescar_tabla}
                set_refrescar_tabla={set_refrescar_tabla}
                data_asignacion_vehiculos={data_asignacion_vehiculos}
              />
            </Grid>
            
            {!mostrar_busqueda_vehiculos &&
              <Button
                color='success'
                variant='contained'
                startIcon={<AddIcon />}
                onClick={()=>set_mostrar_busqueda_vehiculos(true)}
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
            set_vehiculo_placa={set_vehiculo_placa}
            set_id_hoja_vida_vehiculo={set_id_hoja_vida_vehiculo}
          />
          <BusquedaConductores  
            set_nro_documento={set_nro_documento}
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
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              gap:'20px'
            }}
          > 
            <Title title="Vehículos y conductores asignados" />
            <VehiculosConductoresAsignados
              set_vehiculo_agendado_conductor={set_vehiculo_agendado_conductor}
              nro_documento={nro_documento}
              vehiculo_placa={vehiculo_placa}
              id_hoja_vida_vehiculo={id_hoja_vida_vehiculo}
              id_persona_conductor={id_persona_conductor}
              set_nro_documento={set_nro_documento}
              set_vehiculo_placa={set_vehiculo_placa}
              set_id_hoja_vida_vehiculo={set_id_hoja_vida_vehiculo}
              set_id_persona_conductor={set_id_persona_conductor}
            />

            {vehiculo_agendado_conductor?.map((agendacion, index)=>(
              <VehiculoAgendadoView
                key={index}
                fecha_inicio_input={agendacion.fecha_inicio_asignacion}
                fecha_fin_input={agendacion.fecha_final_asignacion}
                vehiculo_placa={agendacion.vehiculo_placa}
                nro_documento={agendacion.nro_documento}
              />
            ))}
            
            <Grid
                item
                xs={12}
                sx={{
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
                  onClick={() => {}}
                >
                  {"Guardar"}
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  startIcon={<ClearIcon />}
                  onClick={() => {}}
                >
                  Salir
                </Button>
              </Grid>
          </Grid>
        </>
      }

    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default AsignacionVehiculos;