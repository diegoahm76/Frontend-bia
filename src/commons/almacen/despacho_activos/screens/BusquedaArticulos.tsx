import React, { FC, useEffect, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { interface_activos_disponibles, interface_busqueda_articulos, interface_inputs_busqueda_articulo } from '../interfeces/types';
import SearchIcon from '@mui/icons-material/Search';
import ModalBuscarArticulo from '../manners/ModalBuscarArticulos';
import AddIcon from '@mui/icons-material/Add';
import { Title } from '../../../../components';
import TablaArticulosAgregados from '../tables/TablaArticulosAgregados';
import ModalActivosDisponibles from '../manners/ModalActivosDisponibles';
import { control_error } from '../../../../helpers';
import TablaActivosAgregados from '../tables/TablaActivosAgregados';


interface props {
  data_articulos_agregados_padres: interface_busqueda_articulos[];
  set_data_articulos_agregados_padres: React.Dispatch<React.SetStateAction<interface_busqueda_articulos[]>>;
  despacho_sin_solicitud: boolean;
}


// eslint-disable-next-line @typescript-eslint/naming-convention
const BusquedaArticulos: FC<props> = ({
  data_articulos_agregados_padres,
  set_data_articulos_agregados_padres,
  despacho_sin_solicitud,
}) => {
  // loading de la tabla de articulos agregados
  const [loadding_tabla_padre, set_loadding_tabla_padre] = useState<boolean>(false);
  // loadding para la tabla de activos disponibles
  const [loadding_activos_disponibles, set_loadding_activos_disponibles] = React.useState<boolean>(false);
  // estado para mostrar modal de busqueda de articulos
  const [mostrar_busqueda_articulo, set_mostrar_busqueda_articulo] = useState<boolean>(false);
  // estado para mostrar modal de activos disponibles
  const [mostrar_modal_activos_disponibles, set_mostrar_modal_activos_disponibles] = useState<boolean>(false);
  // estadp para mostrar la tabla de activos disponibles segun el articulo seleccionado
  const [mostrar_tabla_activos_agregados, set_mostrar_tabla_activos_agregados] = useState<boolean>(false);

  // estado para guardar los inputs de busqueda de articulos [codigo_articulo, nombre_articulo]
  const [inputs_busqueda_articulo, set_inputs_busqueda_articulo] = useState<interface_inputs_busqueda_articulo>(Object);
  // estado para guardar el articulo seleccionado y luego agregarlo a la tabla de articulos agregados
  const [articulo_seleccionado, set_articulo_seleccionado] = useState<interface_busqueda_articulos>(Object);
  // estados para guardar los datos de los activos disponibles para la tabla de activos disponibles
  const [data_activos_disponibles, set_data_activos_disponibles] = useState<interface_activos_disponibles[]>([]);
  // estado para guardar la data de los activos agregados segun el articulo seleccionado
  const [data_activos_agregados, set_data_activos_agregados] = useState<interface_activos_disponibles[]>([]);
  // id del articulo clikeado para buscar los activos disponibles
  const [id_articulo_seleccionado, set_id_articulo_seleccionado] = useState<number>(0);



  useEffect(() => {
    set_inputs_busqueda_articulo({
      codigo_articulo: articulo_seleccionado?.codigo_bien ?? '',
      nombre_articulo: articulo_seleccionado.nombre,
    });
  }, [articulo_seleccionado]);

  const validar_formulario = () => {
    if (inputs_busqueda_articulo.codigo_articulo === '' && inputs_busqueda_articulo.nombre_articulo === '') {
      control_error('Debe ingresar al menos un campo de busqueda');
      return false;
    }
    // verificamos que el articulo seleccionado no este ya en la tabla de articulos agregados data_articulos_agregados_padres
    const articulo_existente = data_articulos_agregados_padres.find(articulo => articulo.id_bien === articulo_seleccionado.id_bien);
    if (articulo_existente) {
      control_error('El articulo ya fue agregado');
      return false;
    }
    return true;
  }

  //Funcion para agregar articulo a la tabla de articulos agregados
  const agregar_articulo_padre = () => {
    const validacion = validar_formulario();
    if (validacion) {
      const new_data = [...data_articulos_agregados_padres, articulo_seleccionado];
      set_data_articulos_agregados_padres(new_data);
      set_articulo_seleccionado({} as interface_busqueda_articulos);
    }
  }

  return (
    <>
      <ModalBuscarArticulo
        set_mostrar_busqueda_articulo={set_mostrar_busqueda_articulo}
        mostrar_busqueda_articulo={mostrar_busqueda_articulo}
        set_articulo_seleccionado={set_articulo_seleccionado}
      />

      <ModalActivosDisponibles
        set_mostrar_modal_activos_disponibles={set_mostrar_modal_activos_disponibles}
        mostrar_modal_activos_disponibles={mostrar_modal_activos_disponibles}
        data_activos_disponibles={data_activos_disponibles}
        loadding_activos_disponibles={loadding_activos_disponibles}
        data_articulos_agregados_padres={data_articulos_agregados_padres}
        set_data_articulos_agregados_padres={set_data_articulos_agregados_padres}
        id_articulo_seleccionado={id_articulo_seleccionado}
      />

      {despacho_sin_solicitud &&
        <>
          <Grid item xs={12} lg={4}>
            <TextField
              fullWidth
              disabled
              label='Código articulo:'
              value={inputs_busqueda_articulo.codigo_articulo ?? ''}
              onChange={(e) => set_inputs_busqueda_articulo({ ...inputs_busqueda_articulo, codigo_articulo: e.target.value })}
              size='small'
            />
          </Grid>

          <Grid item xs={12} lg={5}>
            <TextField
              fullWidth
              disabled
              label='Nombre articulo:'
              value={inputs_busqueda_articulo.nombre_articulo ?? ''}
              onChange={(e) => set_inputs_busqueda_articulo({ ...inputs_busqueda_articulo, nombre_articulo: e.target.value })}
              size='small'
            />
          </Grid>

          <Grid item xs={12} lg={3}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={() => { set_mostrar_busqueda_articulo(true) }}
            >
              Búsqueda avanzada
            </Button>
          </Grid>

          <Grid container spacing={2} item xs={12} sx={{
            display: 'flex',
            justifyContent: 'end',
          }}>
            <Grid item xs={12} lg={3}>
              <Button
                variant='contained'
                color='success'
                fullWidth
                disabled={Object.keys(articulo_seleccionado).length === 0}
                onClick={agregar_articulo_padre}
                startIcon={<AddIcon />}
              >
                Agregar articulo
              </Button>
            </Grid>
          </Grid>
        </>
      }


      <Grid item xs={12} lg={12}>
        <Title title='Articulos agregados' />
        <TablaArticulosAgregados
          data={data_articulos_agregados_padres}
          set_data={set_data_articulos_agregados_padres}
          set_mostrar_modal_activos_disponibles={set_mostrar_modal_activos_disponibles}
          set_data_activos_disponibles={set_data_activos_disponibles}
          loadding_tabla_padre={false}
          set_loadding_activos_disponibles={set_loadding_activos_disponibles}
          set_id_articulo_seleccionado={set_id_articulo_seleccionado}
          set_data_activos_agregados={set_data_activos_agregados}
          set_mostrar_tabla_activos_agregados={set_mostrar_tabla_activos_agregados}
          despacho_sin_solicitud={despacho_sin_solicitud}
        />
      </Grid>

      {mostrar_tabla_activos_agregados &&
        <Grid item xs={12} lg={12}>
          <Title title='Activos agregados' />
          <TablaActivosAgregados
            data={data_activos_agregados}
            set_data={set_data_activos_agregados}
            id_articulo_seleccionado={id_articulo_seleccionado}
            data_articulos_agregados_padres={data_articulos_agregados_padres}
            set_data_articulos_agregados_padres={set_data_articulos_agregados_padres}
          />
        </Grid>
      }

    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default BusquedaArticulos;