import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import TableBusquedaVehiculos from '../tables/TableBusquedaVehiculos';
import { useAppDispatch } from '../../../../hooks';
import { interface_vehiculo_seleccionado } from '../interfaces/types';
import { buscar_vehiculos } from '../thunks/asignacion_vehiculos';
import { control_error } from '../../../../helpers';
import CleanIcon from '@mui/icons-material/CleaningServices';

interface props {
  set_id_hoja_vida_vehiculo:React.Dispatch<React.SetStateAction<number>>
  set_vehiculo_seleccionado:React.Dispatch<React.SetStateAction<interface_vehiculo_seleccionado>>
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const BusquedaVehiculos: React.FC<props> = ({set_id_hoja_vida_vehiculo, set_vehiculo_seleccionado}) => {
  const dispatch = useAppDispatch();
  const [tipo_vehiculo, set_tipo_vehiculo] = useState<string>('');
  const [msj_error_tipo_vehiculo, set_msj_error_tipo_vehiculo] = useState<string>('');
  const [marca, set_marca] = useState<string>('');
  const [placa, set_placa] = useState<string>('');

  // Definimos el estado para almacenar los datos de búsqueda de vehículos
  const [data_busqueda_vehiculos, set_data_busqueda_vehiculos] = useState<interface_vehiculo_seleccionado[]>([]);

  /**
   * Función asincrónica que obtiene los vehículos mediante una llamada a la función buscar_vehiculos.
   * @returns {Promise<boolean>} - Retorna una promesa que indica si se obtuvieron los vehículos correctamente.
   */
  const obtener_vehiculos: () => Promise<boolean> = async() => {
    const validado = await dispatch(buscar_vehiculos(
      tipo_vehiculo,
      marca,
      placa,
    ))
      .then((response: any) => {
        if(Object.keys(response).length !== 0 && response.data !== undefined){
          if (response?.data.length === 0) {
            set_data_busqueda_vehiculos([]);
            return false;
          } else {
            set_data_busqueda_vehiculos(response.data);
            return true;
          }
        } else {
          set_data_busqueda_vehiculos([]);
          return false;
        }
      })
    return validado;
  }

  useEffect(()=>{
    obtener_vehiculos();
  },[])

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

  /**
   * Limpia los valores de los campos del formulario de vehículos.
   */
  const limpiar_form_vehiculos = () => {
    set_marca('');
    set_placa('');
    set_tipo_vehiculo('');
    set_msj_error_tipo_vehiculo('');
  }

  /**
   * Consulta los vehículos con los filtros seleccionados.
   * 
   * @param {React.FormEvent<Element>} e - El evento del formulario.
   * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa la consulta de vehículos.
   */
  const consultar_vehiculos = async (e: React.FormEvent<Element>): Promise<void> => {
    e.preventDefault();
    const envio_consulta = await obtener_vehiculos();
    if (!envio_consulta) {
      control_error('No se encontraron vehículos con los filtros seleccionados');
    }
  }

  return (
    <Grid
      container
      spacing={2}
      marginTop={2}
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '40px',
        margin:'10px auto',
        mb: '20px',
        width:'100%',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <Title title='Búsqueda de Vehículos' />

      <Box
        component="form"
        onSubmit={consultar_vehiculos}
        noValidate
        autoComplete="off"
        sx={{width:'100%', mt:'15px'}}
        >
        <Grid container  spacing={1} my={1}>
          <Grid item xs={12} lg={3}>
            <FormControl required size='small' fullWidth>
              <InputLabel>
                Tipo de Vehículo:
              </InputLabel>
              <Select
                fullWidth
                label='Tipo de Vehículo:'
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
              label='Marca:'
              fullWidth
              placeholder='Buscar'
              value={marca}
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_marca(e.target.value)}
              size="small"
            />
          </Grid>

          <Grid item xs={12} lg={2}>
            <TextField
              label='Placa:'
              fullWidth
              value={placa}
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_placa(e.target.value)}
              placeholder='Buscar'
              size="small"
            />
          </Grid>
            
          <Grid item xs={12} lg={3}>
            <Button
              fullWidth
              color='primary'
              variant='contained'
              startIcon={<SearchIcon />}
              type='submit'
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
              onClick={limpiar_form_vehiculos}
            >
              Limpiar
            </Button>
          </Grid>
        </Grid>
      </Box>


      <Grid container xs={12}>
        <TableBusquedaVehiculos
          set_vehiculo_seleccionado={set_vehiculo_seleccionado}
          set_id_hoja_vida_vehiculo={set_id_hoja_vida_vehiculo}
          data_busqueda_vehiculos={data_busqueda_vehiculos}
        />
      </Grid>
    </Grid>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default BusquedaVehiculos;