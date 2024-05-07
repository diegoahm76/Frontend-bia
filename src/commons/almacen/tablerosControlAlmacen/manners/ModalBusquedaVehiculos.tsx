import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Dialog, DialogContent, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { useAppDispatch } from '../../../../hooks';
import { control_error } from '../../../../helpers';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import TablaModalBusquedaVehiculos from '../tables/TablaModalBusquedaVehiculos';
import { interface_busqueda_vehiculos, response_busqueda_vehiculos } from '../interfaces/types';
import { get_busqueda_vehiculos, get_tipos_vehiculos } from '../thunks/tablerosControlAlmacen';


interface props {
  set_mostrar_modal_vehiculo: React.Dispatch<React.SetStateAction<boolean>>;
  mostrar_modal_vehiculo: boolean;
  set_data_vehiculo_seleccionado: React.Dispatch<React.SetStateAction<interface_busqueda_vehiculos>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ModalBusquedaVehiculos: React.FC<props> = ({
  set_mostrar_modal_vehiculo,
  mostrar_modal_vehiculo,
  set_data_vehiculo_seleccionado,
}) => {

  const dispatch = useAppDispatch();

  const [tipo_vehiculo, set_tipo_vehiculo] = useState<string>('');
  const [placa, set_placa] = useState<string>('');
  const [nombre_vehiculo, set_nombre_vehiculo] = useState<string>('');
  const [nombre_contratista, set_nombre_contratista] = useState<string>('');
  const [marca, set_marca] = useState<string>('');

  const [loadding_tabla, set_loadding_tabla] = useState<boolean>(false);

  const [tipos_vehiculos, set_tipos_vehiculos] = useState<any[]>([]);

  const [vehiculo_seleccionado_temp, set_vehiculo_seleccionado_temp] = useState<interface_busqueda_vehiculos>(Object);

  const [data_vehiculos_obtenidos, set_data_vehiculos_obtenidos] = useState<interface_busqueda_vehiculos[]>([]);

  const get_busqueda_vehiculos_fc = () => {
    set_loadding_tabla(true);
    dispatch(get_busqueda_vehiculos(
      tipo_vehiculo,
      marca,
      placa,
      nombre_contratista,
      nombre_vehiculo,
    )).then((response: response_busqueda_vehiculos) => {
      if (Object.keys(response).length !== 0) {
        if (response.data.length !== 0) {
          set_data_vehiculos_obtenidos(response.data);
          set_loadding_tabla(false);
        } else {
          set_data_vehiculos_obtenidos([]);
          control_error('No se encontraron funcionarios');
          set_loadding_tabla(false);
        }
      } else {
        control_error('Error en el servidor al obtener funcionarios');
      }
    });
  }

  const get_tipos_vehiculos_fc = () => {
    dispatch(get_tipos_vehiculos())
    .then((response: any) => {
      if(Object.keys(response).length !== 0) {
          set_tipos_vehiculos(response);
      } else {
        control_error('Error en el servidor al obtener tipos de documentos');
      }
    });
  }


  const obtener_data = useRef(false);
  useEffect(() => {
    if (!obtener_data.current && mostrar_modal_vehiculo) {
      get_busqueda_vehiculos_fc();
      get_tipos_vehiculos_fc();
      obtener_data.current = true;
    }
  }, [mostrar_modal_vehiculo])

  const consultar_tercero = () => {
    get_busqueda_vehiculos_fc();
  }

  const limpiar_form = () => {
    set_placa('');
    set_nombre_vehiculo('');
    set_nombre_contratista('');
    set_marca('');
  }

  const enviar_tercero_seleccionado = () => {
    if (Object.keys(vehiculo_seleccionado_temp).length !== 0) {
      set_mostrar_modal_vehiculo(false);
      set_data_vehiculo_seleccionado(vehiculo_seleccionado_temp);
      set_vehiculo_seleccionado_temp({} as interface_busqueda_vehiculos);
    } else {
      control_error('Haga clic en una fila de la tabla para seleccionar el operario');
    }
  }

  return (
    <>
      <Dialog
        open={mostrar_modal_vehiculo}
        onClose={() => {
          set_mostrar_modal_vehiculo(false);
        }}
        fullWidth maxWidth="lg" >
        <DialogContent>
          <Grid
            container
            marginTop={2}
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '30px',
              mb: '10px',
              boxShadow: '0px 3px 6px #042F4A26',
            }}
          >
            <Title title='Búsqueda de vehículos' />

            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ width: '100%', mt: '20px' }}
            >
              <Grid item container spacing={2} xs={12}>

                <Grid item xs={12} lg={4}>
                  <FormControl required size="small" fullWidth>
                    <InputLabel >Tipo vehículo:</InputLabel>
                    <Select
                      label='Tipo vehículo:'
                      value={tipo_vehiculo}
                      onChange={(e) => set_tipo_vehiculo(e.target.value)}
                    >
                      {tipos_vehiculos.length !== 0 ?
                        tipos_vehiculos.map((item: any) => (
                          <MenuItem key={item[0]} value={item[0]}>{item[1]}</MenuItem>
                        ))
                        :
                        <MenuItem value=''>Cargando...</MenuItem>
                      }
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} lg={4}>
                  <TextField
                    fullWidth
                    label='Placa:'
                    value={placa}
                    onChange={(e) => set_placa(e.target.value)}
                    size='small'
                  />
                </Grid>

                <Grid item xs={12} lg={3}>
                  <TextField
                    fullWidth
                    label='Nombre vehiculo:'
                    value={nombre_vehiculo}
                    onChange={(e) => set_nombre_vehiculo(e.target.value)}
                    size='small'
                  />
                </Grid>

                <Grid item xs={12} lg={3}>
                  <TextField
                    fullWidth
                    label='Nombre contratista:'
                    value={nombre_contratista}
                    onChange={(e) => set_nombre_contratista(e.target.value)}
                    size='small'
                  />
                </Grid>

                <Grid item xs={12} lg={3}>
                  <TextField
                    fullWidth
                    label='Marca:'
                    value={marca}
                    onChange={(e) => set_marca(e.target.value)}
                    size='small'
                  />
                </Grid>

                <Grid item xs={12} lg={3}>
                  <Button
                    fullWidth
                    color='primary'
                    variant='contained'
                    startIcon={<SearchIcon />}
                    onClick={consultar_tercero}
                  >
                    Buscar
                  </Button>
                </Grid>

                <Grid item xs={12} lg={3}>
                  <Button
                    fullWidth
                    color="inherit"
                    variant="outlined"
                    startIcon={<CleanIcon />}
                    onClick={limpiar_form}
                  >
                    Limpiar
                  </Button>
                </Grid>

              </Grid>
            </Box>

            <Grid item my={2} container xs={12} sx={{
              display: 'flex',
              justifyContent: 'center'
            }}>
              <TablaModalBusquedaVehiculos
                loadding_tabla={loadding_tabla}
                data_vehiculos_obtenidos={data_vehiculos_obtenidos}
                set_vehiculo_seleccionado_temp={set_vehiculo_seleccionado_temp}
              />
            </Grid>

            <Grid container item xs={12} spacing={1} sx={{ display: 'flex', justifyContent: 'end' }}>
              <Grid item xs={12} md={2} sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }} >
                <Button
                  fullWidth
                  color='primary'
                  variant='contained'
                  startIcon={<SaveIcon />}
                  disabled={Object.keys(vehiculo_seleccionado_temp).length === 0}
                  onClick={enviar_tercero_seleccionado}
                >
                  Seleccionar
                </Button>
              </Grid>
              <Grid item xs={12} md={2} sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }} >
                <Button
                  fullWidth
                  color="error"
                  variant="contained"
                  startIcon={<ClearIcon />}
                  onClick={() => set_mostrar_modal_vehiculo(false)}
                >
                  Salir
                </Button>
              </Grid>
            </Grid>

          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}


// eslint-disable-next-line no-restricted-syntax
export default ModalBusquedaVehiculos;