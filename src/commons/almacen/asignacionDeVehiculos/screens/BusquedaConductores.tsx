import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import TableBusquedaConductores from '../tables/TableBusquedaCondutores';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { interface_conductor_seleccionado } from '../interfaces/types';
import { useAppDispatch } from '../../../../hooks';
import { buscar_conductores } from '../thunks/asignacion_vehiculos';
import { control_error } from '../../../../helpers';


interface props {
  set_id_persona_conductor: React.Dispatch<React.SetStateAction<number>>;
  set_conductor_seleccionado: React.Dispatch<React.SetStateAction<interface_conductor_seleccionado>>;
  refrescar_tabla_conductores: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const BusquedaConductores: React.FC<props> = ({set_id_persona_conductor, set_conductor_seleccionado,refrescar_tabla_conductores}) => {
  const dispatch = useAppDispatch();

  const [tipo_conductor, set_tipo_conductor] = useState<string>('');
  const [nombre_conductor, set_nombre_conductor] = useState<string>('');
  const [msj_error_tipo_conductor, set_msj_error_tipo_conductor] = useState<string>('');

  // Estado para almacenar los datos de búsqueda de conductores
  const [data_busqueda_conductores, set_data_busqueda_conductores] = useState<interface_conductor_seleccionado[]>([]);

  /**
   * Función asincrónica que obtiene los conductores según los parámetros de búsqueda.
   * @returns Una promesa que se resuelve en `true` si se encontraron conductores, o en `false` si no se encontraron conductores.
   */
  const obtener_conductores: () => Promise<boolean> = async() => {
    const validado = dispatch(buscar_conductores(
      tipo_conductor,
      nombre_conductor))
      .then((response: any) => {
        if(Object.keys(response).length !== 0 && response.data !== undefined){
          if (response?.data.length === 0) {
            set_data_busqueda_conductores([]);
            return false;
          } else {
            set_data_busqueda_conductores(response.data);
            return true
          }
        } else {
          set_data_busqueda_conductores([]);
          return false;
        }
      })
      return validado;
  }

  useEffect(()=>{
    obtener_conductores();
  },[refrescar_tabla_conductores])

  /**
   * Función que se ejecuta cuando se cambia el tipo de conductor.
   * 
   * @param {SelectChangeEvent} event - El evento de cambio de selección.
   * @returns {void}
   */
  const cambio_tipo_conductor = (event: SelectChangeEvent): void => {
    set_tipo_conductor(event.target.value);
    if (event.target.value !== null && event.target.value !== "") {
      set_msj_error_tipo_conductor("");
    }
  }

  /**
   * Limpia el formulario de conductores.
   */
  const limpiar_form_conductores = () => {
    set_tipo_conductor('');
    set_nombre_conductor('');
  }

  /**
   * Consulta los conductores.
   * 
   * @param {React.FormEvent<Element>} e - El evento del formulario.
   * @returns {Promise<void>} - Una promesa que resuelve cuando se completa la consulta.
   */
  const consultar_conductores = async (e: React.FormEvent<Element>): Promise<void> => {
    e.preventDefault();
    const enviar_consulta = await obtener_conductores();
    if (!enviar_consulta) {
      control_error('No se encontraron vehículos con los filtros seleccionados');
    }
  }

  return (
    <Grid
      container
      marginTop={2}
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '40px',
        mb: '10px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
      >
      <Title title='Búsqueda de Conductores' />

      <Box
        component="form"
        onSubmit={consultar_conductores}
        noValidate
        autoComplete="off"
        sx={{width:'100%'}}
        >
        <Grid item container spacing={1} xs={12} my={2}>
          <Grid item xs={12} md={3}>
            <FormControl required size='small' fullWidth>
              <InputLabel>
                Tipo de Conductor:
              </InputLabel>
              <Select
                label='Tipo de Conductor:'
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

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label='Conductor:'
              placeholder='Buscar'
              size="small"
              value={nombre_conductor}
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_nombre_conductor(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={3}>
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

          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              color="inherit"
              variant="outlined"
              startIcon={<CleanIcon />}
              onClick={limpiar_form_conductores}
            >
              Limpiar
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Grid item container xs={12}>
        <TableBusquedaConductores
          set_conductor_seleccionado={set_conductor_seleccionado}
          set_id_persona_conductor={set_id_persona_conductor}
          data_busqueda_conductores={data_busqueda_conductores}/>
      </Grid>
    </Grid>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default BusquedaConductores;