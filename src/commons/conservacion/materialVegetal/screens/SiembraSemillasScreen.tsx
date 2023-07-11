import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import SeleccionarSiembra from '../componentes/SeleccionarSiembra';
import SeleccionarBienSiembra from '../componentes/SeleccionarBienSiembra';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  set_current_planting,
  set_current_nursery,
  set_germination_beds,
  reset_state,
} from '../store/slice/materialvegetalSlice';
import { useEffect, useState } from 'react';
import {
  add_siembra_service,
  delete_siembra_service,
  edit_siembra_service,
  get_germination_beds_id_service,
  get_germination_beds_service,
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
  const [open_search_modal, set_open_search_modal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
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
      void dispatch(
        get_germination_beds_service(Number(current_planting.id_vivero))
      );
      void dispatch(get_planting_goods_service(current_planting.id_siembra));
      set_action('editar');
    }
  }, [current_planting]);

  useEffect(() => {
    if (current_nursery.id_vivero !== null) {
      if (current_planting.cama_germinacion !== null) {
        void dispatch(
          get_germination_beds_id_service(current_planting.cama_germinacion)
        );
      }
    }
  }, [current_nursery]);

  useEffect(() => {
    dispatch(
      set_germination_beds(germination_beds.concat(current_germination_beds))
    );
  }, [current_germination_beds]);

  useEffect(() => {
    if (!(current_germination_beds.length > 0)) {
      const vivero: IObjNursery | undefined = nurseries.find(
        (p: IObjNursery) => p.id_vivero === current_planting.id_vivero
      );
      if (vivero !== undefined) {
        dispatch(set_current_nursery(vivero));
      }
    }
  }, [germination_beds]);

  useEffect(() => {
    if (watch('id_vivero') !== null) {
      const vivero: IObjNursery | undefined = nurseries.find(
        (p: IObjNursery) => p.id_vivero === watch('id_vivero')
      );
      if (vivero !== undefined) {
        dispatch(
          set_current_planting({
            ...current_planting,
            id_vivero: vivero.id_vivero,
          })
        );
        void dispatch(get_germination_beds_service(Number(vivero.id_vivero)));
      }
    }
  }, [watch('id_vivero')]);

  const on_submit = (data: IObjPlanting): void => {
    const form_data: any = new FormData();
    if (
      current_planting.id_siembra !== null &&
      current_planting.id_siembra !== undefined
    ) {
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
      void dispatch(delete_siembra_service(current_planting.id_siembra));
      dispatch(reset_state());
      initial_values();
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
        />
        <PersonaSiembra title={'Persona que siembra'} />
        {current_nursery.id_vivero !== null && <SeleccionarBienSiembra />}
        <Grid container direction="row" padding={2} spacing={2}>
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="contained"
              on_click_function={handle_submit(on_submit)}
              icon_class={<SaveIcon />}
              label={action}
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
