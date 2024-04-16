import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Dialog, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { useAppDispatch } from '../../../../hooks';
import { control_error } from '../../../../helpers';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import { get_obtener_bodegas, get_obtener_persona_solicita } from '../thunks/despacho_solicitudes';
import { interface_busqueda_bodegas, response_busqueda_bodegas } from '../interfeces/types';
import TablaModalBusquedaBodega from '../tables/TablaModalBusquedaBodega';



interface props {
  set_mostrar_modal_buscar_bodega: React.Dispatch<React.SetStateAction<boolean>>;
  mostrar_modal_buscar_bodega: boolean;
  set_bodega_seleccionada: React.Dispatch<React.SetStateAction<interface_busqueda_bodegas>>;
  departamentos: any
  municipios: any
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ModalBusquedaBodega: React.FC<props> = ({
  set_mostrar_modal_buscar_bodega,
  mostrar_modal_buscar_bodega,
  set_bodega_seleccionada,
  departamentos,
  municipios
}) => {

  const dispatch = useAppDispatch();

  const [loadding_tabla, set_loadding_tabla] = useState<boolean>(false);

  const [departamento, set_departamento] = useState<string>('');
  const [municipio, set_municipio] = useState<string>('');
  const [nombre_bodega, set_nombre_bodega] = useState<string>('');

  const [data_bodega_seleccionada_temp, set_data_bodega_seleccionada_temp] = useState<interface_busqueda_bodegas>(Object);
  // Data de la tabla de personas que solicitan
  const [data_bodegas, set_data_bodegas] = useState<interface_busqueda_bodegas[]>([]);

  const get_obtener_bodegas_fc = () => {
    set_loadding_tabla(true);
    dispatch(get_obtener_bodegas(
      nombre_bodega,
      municipio
    )).then((response: response_busqueda_bodegas) => {
      if (Object.keys(response).length !== 0) {
        if (response.data.length !== 0) {
          set_data_bodegas(response.data);
          set_loadding_tabla(false);
        } else {
          set_data_bodegas([]);
          control_error('No se encontraron bodegas');
          set_loadding_tabla(false);
        }
      } else {
        control_error('Error en el servidor al obtener bodegas');
      }
    });
  }

  const ejecutar_servicios = useRef(false);
  useEffect(() => {
    if (!ejecutar_servicios.current && mostrar_modal_buscar_bodega) {
      get_obtener_bodegas_fc();
      ejecutar_servicios.current = true;
    }
  }, [mostrar_modal_buscar_bodega])

  const consultar_bodegas = () => {
    get_obtener_bodegas_fc();
  }

  /**
   * Obtiene el departamento seleccionado en base al código del departamento a editar.
   */
  const departamento_seleccionado = departamentos && departamentos.find(
    ([codigoDepartamento]: string) => departamento?.startsWith(codigoDepartamento)
  );

  /**
   * Filtra los municipios basándose en el departamento seleccionado.
   */
  const municipios_filtrados = municipios && municipios?.filter(
    ([codigoMunicipio, nombre]: [string, string]) => codigoMunicipio.startsWith(departamento_seleccionado && departamento_seleccionado[0])
  );

  const limpiar_form = () => {
    set_departamento('');
    set_municipio('');
    set_nombre_bodega('');
  }

  const enviar_bodega_seleccionada = () => {
    if (Object.keys(data_bodega_seleccionada_temp).length !== 0) {
      set_mostrar_modal_buscar_bodega(false);
      set_bodega_seleccionada(data_bodega_seleccionada_temp);
      set_data_bodega_seleccionada_temp({} as interface_busqueda_bodegas);
    } else {
      control_error('Haga clic en una fila de la tabla para seleccionar una bodega');
    }
  }

  return (
    <>
      <Dialog
        open={mostrar_modal_buscar_bodega}
        onClose={() => {
          set_mostrar_modal_buscar_bodega(false);
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
            <Title title='Búsqueda bodegas' />
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ width: '100%', mt: '20px' }}
            >
              <Grid item container spacing={2} xs={12}>

                <Grid item xs={12} lg={4}>
                  <FormControl required size="small" fullWidth>
                    <InputLabel >Departamento: </InputLabel>
                    <Select
                      label='Departamento: '
                      value={departamento}
                      onChange={(e) => set_departamento(e.target.value)}
                    >
                      {departamentos &&
                        departamentos.map((dept: any) => {
                          return <MenuItem key={dept[0]} value={dept[0]}>{dept[1]}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} lg={4}>
                  <FormControl required size="small" fullWidth>
                    <InputLabel >Municipio: </InputLabel>
                    <Select
                      label='Municipio: '
                      value={municipio}
                      onChange={(e) => set_municipio(e.target.value)}
                    >
                      {departamento && municipios ?
                        municipios?.filter(([codigoMunicipio]: [string]) => {
                          return codigoMunicipio.startsWith(departamento);
                        }).map(([codigoMunicipio, nombre]: [string, string]) => (
                            <MenuItem key={codigoMunicipio} value={codigoMunicipio}>
                              {nombre}
                            </MenuItem>
                        ))
                        :
                        <MenuItem value=''>Seleccione un departamento</MenuItem>
                      }
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} lg={4}>
                  <TextField
                    fullWidth
                    label='Nombre bodega:'
                    value={nombre_bodega}
                    onChange={(e) => set_nombre_bodega(e.target.value)}
                    size='small'
                  />
                </Grid>


                <Grid item container spacing={2} xs={12} sx={{
                  display: 'flex',
                  justifyContent: 'end',
                }}>
                  <Grid item xs={12} lg={4}>
                    <Button
                      fullWidth
                      color='primary'
                      variant='contained'
                      startIcon={<SearchIcon />}
                      onClick={consultar_bodegas}
                    >
                      Buscar
                    </Button>
                  </Grid>

                  <Grid item xs={12} lg={4}>
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

              </Grid>
            </Box>

            <Grid item container xs={12} sx={{
              display: 'flex',
              justifyContent: 'center'
            }}>
              <TablaModalBusquedaBodega
                loadding_tabla={loadding_tabla}
                data_bodegas={data_bodegas}
                set_data_bodega_seleccionada_temp={set_data_bodega_seleccionada_temp}
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
                  disabled={Object.keys(data_bodega_seleccionada_temp).length === 0}
                  onClick={enviar_bodega_seleccionada}
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
                  onClick={() => set_mostrar_modal_buscar_bodega(false)}
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
export default ModalBusquedaBodega;