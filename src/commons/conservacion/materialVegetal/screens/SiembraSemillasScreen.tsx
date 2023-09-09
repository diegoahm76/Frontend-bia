import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import SeleccionarSiembra from '../componentes/SeleccionarSiembra';
import SeleccionarBienSiembra from '../componentes/SeleccionarBienSiembra';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  set_current_planting,
  set_current_nursery,
  reset_state,
  initial_state_current_nursery,
} from '../store/slice/materialvegetalSlice';
import { useEffect, useState } from 'react';
import {
  add_siembra_service,
  control_error,
  delete_siembra_service,
  edit_siembra_service,
  get_germination_beds_id_service,
  get_germination_beds_service,
  get_goods_aux_service,
  get_nurseries_service,
  get_person_id_service,
  get_planting_goods_service,
  get_plantings_service,
  get_vegetal_materials_service,
} from '../store/thunks/materialvegetalThunks';
import {
  type IObjNursery,
  type IObjPlanting,
} from '../interfaces/materialvegetal';
import { useForm } from 'react-hook-form';
import FormButton from '../../../../components/partials/form/FormButton';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import PersonaSiembra from '../componentes/PersonaSiembra';
import SearchIcon from '@mui/icons-material/Search';
import Limpiar from '../../componentes/Limpiar';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../auth/interfaces';
// eslint-disable-next-line @typescript-eslint/naming-convention
export function SiembraSemillasScreen(): JSX.Element {
  const {
    current_planting,
    planting_person,
    nurseries,
    current_nursery,
    planting_goods,
    current_germination_beds,
    germination_beds,
  } = useAppSelector((state) => state.material_vegetal);

  const {
    control: control_siembra,
    handleSubmit: handle_submit,
    reset: reset_siembra,
    getValues: get_values,
    watch,
  } = useForm<IObjPlanting>();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const [action, set_action] = useState<string>('Crear');
  const [beds, set_beds] = useState<any>([]);
  const dispatch = useAppDispatch();

  const [open_search_modal, set_open_search_modal] = useState<boolean>(false);
  const handle_open_select_model = (): void => {
    set_open_search_modal(true);
  };

  const initial_values = (): void => {
    void dispatch(get_nurseries_service());
    void dispatch(get_vegetal_materials_service());
    void dispatch(get_plantings_service());
    void dispatch(get_person_id_service(userinfo.id_persona));
    set_action('crear');
  };

  useEffect(() => {
    if (planting_person.id_persona !== null) {
      dispatch(
        set_current_planting({
          ...current_planting,
          id_persona_siembra: planting_person?.id_persona,
          id_vivero: watch('id_vivero'),
          id_bien_sembrado: watch('id_bien_sembrado'),
          cama_germinacion: watch('cama_germinacion'),
          distancia_entre_semillas: watch('distancia_entre_semillas'),
          observaciones: watch('observaciones'),
        })
      );
    }
  }, [planting_person]);

  useEffect(() => {
    reset_siembra(current_planting);
    if (current_planting.id_siembra !== null) {
      const vivero: IObjNursery | undefined = nurseries.find(
        (p: IObjNursery) => p.id_vivero === current_planting.id_vivero
      );
      if (vivero !== undefined) {
        void dispatch(get_goods_aux_service(vivero.id_vivero ?? 0));
        dispatch(set_current_nursery(vivero));
        void dispatch(get_germination_beds_service(Number(vivero.id_vivero)));
        if (current_planting.cama_germinacion !== null) {
          void dispatch(
            get_germination_beds_id_service(current_planting.cama_germinacion)
          );
        }
      }
      void dispatch(get_planting_goods_service(current_planting.id_siembra));
      set_action('editar');
    }
  }, [current_planting]);

  useEffect(() => {
    if (current_germination_beds.length > 0) {
      if (
        !deepEqual(
          germination_beds,
          germination_beds.concat(current_germination_beds)
        )
      ) {
        set_beds(germination_beds.concat(current_germination_beds));
      }
    } else {
      set_beds(germination_beds);
    }
  }, [germination_beds]);
  useEffect(() => {
    if (current_germination_beds.length > 0) {
      if (
        !deepEqual(
          germination_beds,
          germination_beds.concat(current_germination_beds)
        )
      ) {
        set_beds(germination_beds.concat(current_germination_beds));
      }
    } else {
      set_beds(germination_beds);
    }
  }, [current_germination_beds]);

  useEffect(() => {
    if (watch('id_vivero') !== null) {
      const vivero: IObjNursery | undefined = nurseries.find(
        (p: IObjNursery) => p.id_vivero === watch('id_vivero')
      );
      if (vivero !== undefined) {
        void dispatch(get_goods_aux_service(vivero.id_vivero ?? 0));
        dispatch(set_current_nursery(vivero));
        void dispatch(get_germination_beds_service(Number(vivero.id_vivero)));
        if (current_planting.cama_germinacion !== null) {
          void dispatch(
            get_germination_beds_id_service(current_planting.cama_germinacion)
          );
        }
      } else {
        dispatch(set_current_nursery(initial_state_current_nursery));
      }
    } else {
      dispatch(set_current_nursery(initial_state_current_nursery));
    }
  }, [watch('id_vivero')]);

  const on_submit = (data: IObjPlanting): void => {
    const form_data: any = new FormData();
    if (
      current_planting.id_siembra !== null &&
      current_planting.id_siembra !== undefined
    ) {
      const fecha_actual = new Date();
      const fecha_siembra = new Date(data.fecha_siembra ?? '');
      const diferencia_ms = fecha_actual.getTime() - fecha_siembra.getTime();
      const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
      if (diferencia_dias <= 30) {
        set_action('editar');
        const data_edit = {
          ...data,
          distancia_entre_semillas: Number(data.distancia_entre_semillas),
        };
        const data_update = {
          data_siembra: data_edit,
          data_bienes_consumidos: planting_goods,
        };
        void dispatch(
          edit_siembra_service(data_update, current_planting.id_siembra)
        );
      } else {
        control_error(
          'Solo se pueden editar siembras hasta 30 dias despues de la fecha de siembra'
        );
      }
    } else {
      set_action('crear');
      const fecha = new Date(data.fecha_siembra ?? '').toISOString();

      const data_edit = {
        ...data,
        fecha_siembra: fecha.slice(0, 10) + ' ' + fecha.slice(11, 19),
        distancia_entre_semillas: Number(data.distancia_entre_semillas),
      };
      form_data.append('data_siembra', JSON.stringify({ ...data_edit }));
      form_data.append(
        'data_bienes_consumidos',
        JSON.stringify(planting_goods)
      );
      form_data.append('ruta_archivo_soporte', data.ruta_archivo_soporte);
      void dispatch(add_siembra_service(form_data));
      dispatch(reset_state());
      initial_values();
    }
  };
  const delete_siembra = (): void => {
    if (
      current_planting.id_siembra !== null &&
      current_planting.id_siembra !== undefined
    ) {
      const fecha_actual = new Date();
      const fecha_siembra = new Date(current_planting.fecha_siembra ?? '');
      const diferencia_ms = fecha_actual.getTime() - fecha_siembra.getTime();
      const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
      if (diferencia_dias <= 30) {
        void dispatch(delete_siembra_service(current_planting.id_siembra));
        dispatch(reset_state());
        initial_values();
      } else {
        control_error(
          'Solo se pueden eliminar siembras hasta 30 dias despues de la fecha de siembra'
        );
      }
    }
  };

  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12} marginY={2}>
          <Title title="Siembras"></Title>
        </Grid>

        <SeleccionarSiembra
          control_siembra={control_siembra}
          get_values={get_values}
          open_modal={open_search_modal}
          set_open_modal={set_open_search_modal}
          beds={beds}
        />
        <PersonaSiembra title={'Persona que siembra'} />
        {current_nursery.id_vivero !== null && <SeleccionarBienSiembra />}
        <Grid container direction="row" padding={2} spacing={2}>
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="contained"
              on_click_function={handle_submit(on_submit)}
              icon_class={<SaveIcon />}
              // label={action}
              label={'guardar' ?? action}
              type_button="button"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="contained"
              on_click_function={handle_open_select_model}
              icon_class={<SearchIcon />}
              label={'Buscar siembra'}
              type_button="button"
              disabled={false}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Limpiar
              dispatch={dispatch}
              reset_state={reset_state}
              set_initial_values={initial_values}
              variant_button={'outlined'}
            />
          </Grid>
          {current_planting.id_bien_sembrado !== null && (
            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="outlined"
                on_click_function={delete_siembra}
                icon_class={<CloseIcon />}
                label={'Eliminar'}
                type_button="button"
                color_button="error"
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function deepEqual(obj1: any, obj2: any) {
  // Verificar si son el mismo objeto en memoria
  if (obj1 === obj2) {
    return true;
  }

  // Verificar si ambos son objetos y tienen la misma cantidad de propiedades
  if (
    typeof obj1 === 'object' &&
    obj1 !== null &&
    typeof obj2 === 'object' &&
    obj2 !== null
  ) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    // Recorrer las propiedades y comparar su contenido de forma recursiva
    for (const key of keys1) {
      if (!deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }

  // Si no cumple ninguna de las condiciones anteriores, consideramos los objetos diferentes
  return false;
}
