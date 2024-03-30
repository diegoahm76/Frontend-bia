import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddIcon from '@mui/icons-material/Add';
import ModalBuscarArticulo from './ModalBuscarArticulo';
import { interface_articulos_agregados, interface_busqueda_articulo, interface_unidades_medidas } from '../interfaces/types';
import { control_error } from '../../../../helpers';
import TablaArticulosAgregados from '../tables/TablaArticulosAgregados';



interface props {
  accion: string;
  unidades_medidas: interface_unidades_medidas[];
  codigo_articulo: string;
  set_codigo_articulo: React.Dispatch<React.SetStateAction<string>>;
  nombre_articulo: string;
  set_nombre_articulo: React.Dispatch<React.SetStateAction<string>>;
  tipo_unidad_medida: string;
  set_tipo_unidad_medida: React.Dispatch<React.SetStateAction<string>>;
  cantidad_articulo: number;
  set_cantidad_articulo: React.Dispatch<React.SetStateAction<number>>;
  fecha_devolucion: Dayjs | null;
  set_fecha_devolucion: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  observacion: string;
  set_observacion: React.Dispatch<React.SetStateAction<string>>;
  articulo_encontrado: interface_busqueda_articulo;
  set_articulo_encontrado: React.Dispatch<React.SetStateAction<interface_busqueda_articulo>>;
  data_articulos_agregados: interface_articulos_agregados[];
  set_data_articulos_agregados: React.Dispatch<React.SetStateAction<interface_articulos_agregados[]>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const BusquedaArticulos: React.FC<props> = ({
  accion,
  unidades_medidas,
  codigo_articulo,
  set_codigo_articulo,
  nombre_articulo,
  set_nombre_articulo,
  tipo_unidad_medida,
  set_tipo_unidad_medida,
  cantidad_articulo,
  set_cantidad_articulo,
  fecha_devolucion,
  set_fecha_devolucion,
  observacion,
  set_observacion,
  articulo_encontrado,
  set_articulo_encontrado,
  data_articulos_agregados,
  set_data_articulos_agregados,}) => {

  const [mostrar_busqueda_articulo, set_mostrar_busqueda_articulo] = useState<boolean>(false);

  useEffect(() => {
    if (Object.keys(articulo_encontrado).length !== 0) {
      console.log(articulo_encontrado);      
      set_codigo_articulo(articulo_encontrado.codigo_bien);
      set_nombre_articulo(articulo_encontrado.nombre);
      set_tipo_unidad_medida(articulo_encontrado.unidad_medida);
    }
  }, [articulo_encontrado]);

  const cambio_fecha_devolucion = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_devolucion(date);
    }
  };

  const validar_formulario: ()=>boolean = () => {
    if (Object.keys(articulo_encontrado).length === 0) {
      control_error('Debe buscar y seleccionar un artículo');
      return false;
    }
    if (cantidad_articulo === 0 ) {
      control_error('Debe ingresar una cantidad');
      return false;
    }
    if (fecha_devolucion === null) {
      control_error('Debe seleccionar una fecha de devolución');
      return false;
    }
    return true;
  }

  const limpiar_formulario = () => {
    set_codigo_articulo('');
    set_nombre_articulo('');
    set_tipo_unidad_medida('');
    set_cantidad_articulo(0);
    set_fecha_devolucion(null);
    set_observacion('');
    set_articulo_encontrado({} as interface_busqueda_articulo);
  }

  const handle_agregar_articulo = () => {
    const form_validado = validar_formulario();

    if(form_validado){
      let editando_articulo = false;
      let nuevos_articulos: interface_articulos_agregados[] = data_articulos_agregados.map((articulo) => {
        if (articulo.codigo_bien === articulo_encontrado.codigo_bien) {
          // Sobreescribimos los datos del articulo encontrado y dejamos el resto de articulos igual
          editando_articulo = true;
          return {
            ...articulo,
            cantidad_articulo: cantidad_articulo,
            fecha_devolucion: fecha_devolucion?.toString(),
            tipo_unidad_medida: tipo_unidad_medida?.toString(),
            observacion: observacion?.toString(),
          };
        } else {
          return articulo;
        }
      });

      if(!editando_articulo){
        nuevos_articulos = [
          ...nuevos_articulos,
          {
            ...articulo_encontrado,
            cantidad_articulo: cantidad_articulo,
            fecha_devolucion: fecha_devolucion?.toString(),
            tipo_unidad_medida: tipo_unidad_medida?.toString(),
            observacion: observacion?.toString(),
          }
        ];
      }

      set_data_articulos_agregados(nuevos_articulos);
      limpiar_formulario();
    }
  };

  return (
    <>
      <ModalBuscarArticulo
        mostrar_busqueda_articulo={mostrar_busqueda_articulo}
        set_mostrar_busqueda_articulo={set_mostrar_busqueda_articulo}
        set_articulo_encontrado={set_articulo_encontrado}
      />

      {accion !== 'ver' &&
        <Box
          component="form"
          sx={{ mt: '20px', width: '100%' }}
          noValidate
          autoComplete="off"
        >
          <Grid container item xs={12} spacing={2} rowSpacing={3}>
            <Grid item xs={12} lg={4}>
              <TextField
                fullWidth
                disabled
                label='Código de artículo: '
                value={codigo_articulo}
                onChange={(e) => set_codigo_articulo(e.target.value)}
                size='small'
              />
            </Grid>

            <Grid item xs={12} lg={4}>
              <TextField
                fullWidth
                disabled
                label='Nombre de artículo: '
                value={nombre_articulo}
                onChange={(e) => set_nombre_articulo(e.target.value)}
                size='small'
              />
            </Grid>

            <Grid item xs={12} lg={4}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                startIcon={<SearchIcon />}
                disabled={accion === 'ver'}
                onClick={()=>set_mostrar_busqueda_articulo(true)}
              >
                Buscar
              </Button>
            </Grid>

            <Grid item xs={12} lg={4}>
              <FormControl required size="small" fullWidth>
                <InputLabel >Unidad de medida </InputLabel>
                <Select
                  label='Unidad de medida: '
                  value={tipo_unidad_medida}
                  disabled
                  onChange={(e) => set_tipo_unidad_medida(e.target.value)}
                >
                  {unidades_medidas.length !== 0 ? 
                    unidades_medidas.map((unidad_medida: interface_unidades_medidas) => (
                      <MenuItem key={unidad_medida.id_unidad_medida} value={unidad_medida.abreviatura}>
                        {unidad_medida.nombre}
                      </MenuItem>
                    ))
                    : 
                    <MenuItem key={0} value={0}>
                      Cargando...
                    </MenuItem>
                  }
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={4}>
              <TextField
                type={"number"}
                fullWidth
                disabled={accion === 'ver' || Object.keys(articulo_encontrado).length === 0}
                label='Cantidad de artículo: '
                value={cantidad_articulo}
                onChange={(e: React.ChangeEvent<HTMLInputElement> ) => set_cantidad_articulo(Number(e.target.value))}
                size='small'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} lg={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disabled={accion === 'ver' || Object.keys(articulo_encontrado).length === 0}
                  label="Fecha de devolución: "
                  value={fecha_devolucion}
                  onChange={(newValue) => {
                    cambio_fecha_devolucion(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField fullWidth size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label='Observacion: '
                value={observacion}
                disabled={accion === 'ver' || Object.keys(articulo_encontrado).length === 0}
                onChange={(e) => set_observacion(e.target.value)}
                size='small'
              />
            </Grid>

            <Grid container item xs={12} sx={{
              display: "flex",
              justifyContent: "end",
              }}>
              <Grid item xs={12} lg={2}>
                <Button
                  fullWidth
                  disabled={accion === 'ver' || Object.keys(articulo_encontrado).length === 0}
                  type='button'
                  onClick={handle_agregar_articulo}
                  variant='contained'
                  color='success'
                  startIcon={<AddIcon />}
                >
                  Agregar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      }

      <Grid container item xs={12}>
        <TablaArticulosAgregados
          data_articulos_agregados={data_articulos_agregados}
          set_data_articulos_agregados={set_data_articulos_agregados}
          set_articulo_encontrado={set_articulo_encontrado}
          set_tipo_unidad_medida={set_tipo_unidad_medida}
          set_cantidad_articulo={set_cantidad_articulo}
          set_fecha_devolucion={set_fecha_devolucion}
          set_observacion={set_observacion}
        />
      </Grid>
    </>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default BusquedaArticulos;