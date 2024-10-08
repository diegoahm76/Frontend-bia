/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Chip, Grid } from '@mui/material';
import SeleccionarDespacho from '../componentes/SeleccionarDespacho';
import SeleccionarBienDistribuir from '../componentes/SeleccionarBienDistribuir';
import { Title } from '../../../../components/Title';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { AuthSlice } from '../../../../commons/auth/interfaces';
import { useSelector } from 'react-redux';
import { get_person_id_service } from '../../produccion/store/thunks/produccionThunks';
import { reset_state, set_current_despacho } from '../store/slice/viveroSlice';
import { IObjDistribucion, type IDespacho } from '../interfaces/vivero';
import SaveIcon from '@mui/icons-material/Save';
import FormButton from '../../../../components/partials/form/FormButton';
import CheckIcon from '@mui/icons-material/Check';
import {
  confirmar_items_distribuidos_service,
  save_items_distribuidos_service,
} from '../store/thunks/gestorViveroThunks';
import SearchIcon from '@mui/icons-material/Search';
import Limpiar from '../../componentes/Limpiar';
import ListadoBienesDespacho from '../componentes/ListadoBienesDespacho';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function DespachoViveroScreen(): JSX.Element {
  const {
    control: control_despacho,
    handleSubmit: handle_submit,
    reset: reset_despacho,
    getValues: get_values,
  } = useForm<IDespacho>();

  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const { current_despacho, items_distribuidos, items_despacho, realizar_despacho_manual } = useAppSelector(
    (state) => state.nursery
  );
  const { changing_person } = useAppSelector((state) => state.produccion);

  const dispatch = useAppDispatch();
  const [open_search_modal, set_open_search_modal] = useState<boolean>(false);
  const handle_open_select_model = (): void => {
    set_open_search_modal(true);
  };

  const initial_values = (): void => {
    set_current_despacho({
      ...current_despacho,
      persona_distribuye: userinfo.nombre,
      id_persona_distribuye: userinfo.id_persona,
    });
    void dispatch(get_person_id_service(userinfo.id_persona));
  };
  useEffect(() => {
    set_current_despacho({
      ...current_despacho,
      persona_distribuye: userinfo.nombre,
      id_persona_distribuye: userinfo.id_persona,
    });
  }, []);

  useEffect(() => {
    if (current_despacho.id_despacho_entrante === null) {
      reset_despacho({
        ...current_despacho,
        persona_distribuye: userinfo.nombre,
        id_persona_distribuye: userinfo.id_persona,
      });
    } else {
      if (
        current_despacho.id_persona_distribuye !== null &&
        current_despacho.id_persona_distribuye !== undefined
      ) {
        void dispatch(
          get_person_id_service(current_despacho.id_persona_distribuye)
        );
      } else {
        reset_despacho({
          ...current_despacho,
          persona_distribuye: userinfo.nombre,
          id_persona_distribuye: userinfo.id_persona,
        });
      }
    }
  }, [current_despacho]);

  useEffect(() => {
    if (changing_person.id_persona !== null) {
      reset_despacho({
        ...current_despacho,
        persona_distribuye: changing_person.nombre_completo,
        id_persona_distribuye: changing_person.id_persona,
      });
    }
  }, [changing_person]);

  const on_submit_save = (data: IDespacho) => {
    let items_distribuidos_local = (realizar_despacho_manual.realizar_despacho_manual || current_despacho.id_vivero_solicita === null) ? items_distribuidos : set_object_items_distribuidos();
    const id_despacho = current_despacho.id_despacho_entrante;
    if (id_despacho !== null && id_despacho !== undefined) {
      void dispatch(
        save_items_distribuidos_service(
          id_despacho,
          data.observacion_distribucion ?? '',
          items_distribuidos_local
        )
      );
    }
  };

  const on_submit_confirm = (data: IDespacho) => {
    let items_distribuidos_local = (realizar_despacho_manual.realizar_despacho_manual || current_despacho.id_vivero_solicita === null) ? items_distribuidos : set_object_items_distribuidos();
    const id_despacho = current_despacho.id_despacho_entrante;
    if (id_despacho !== null && id_despacho !== undefined) {
      void dispatch(
        confirmar_items_distribuidos_service(
          id_despacho,
          data.observacion_distribucion ?? '',
          items_distribuidos_local
        )
      );
    }
  };

  const set_object_items_distribuidos: () => IObjDistribucion[] = () => {
    let items_distribuidos: IObjDistribucion[]= [];
    items_despacho.forEach((item: any) => {
      const new_bien: IObjDistribucion = {
        id_distribucion_item_despacho_entrante: item.id_distribucion_item_despacho_entrante ?? null,
        id_vivero: current_despacho.id_vivero_solicita,
        id_bien: item.id_bien,
        cantidad_asignada: Number(item.cantidad_restante),
        cod_etapa_lote_al_ingresar: item.cod_etapa_lote_al_ingresar ?? 'G',
        id_item_despacho_entrante: item.id_item_despacho_entrante ?? null,
        vivero_nombre: current_despacho?.nombre_vivero_solicita ?? '',
        unidad_medida: item.unidad_medida ?? '',
        codigo_bien: item.codigo_bien ?? '',
        nombre_bien: item.nombre_bien ?? '',
      };
      items_distribuidos = [...items_distribuidos, new_bien];
    });
    return items_distribuidos;
  }


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
          <Title title="Distribución de despachos entrantes"></Title>
        </Grid>
        {current_despacho.id_despacho_entrante !== null && (
          <Grid item xs={12} marginY={2}>
            {current_despacho.distribucion_confirmada ? (
              <Chip
                label={
                  'Ítems distribuidos el día ' +
                  String(
                    current_despacho.fecha_confirmacion_distribucion
                  ).slice(0, 10)
                }
                color="success"
                variant="outlined"
              />
            ) : (
              <Chip
                label="Los ítems de este despacho no han sido distribuidos"
                color="warning"
                variant="outlined"
              />
            )}
          </Grid>
        )}
        <SeleccionarDespacho
          control_despacho={control_despacho}
          get_values={get_values}
          open_modal={open_search_modal}
          set_open_modal={set_open_search_modal}
        />
        {current_despacho.id_despacho_entrante !== null && (
          <>
            <ListadoBienesDespacho />
            <SeleccionarBienDistribuir />
          </>
        )}
        <Grid container direction="row" padding={2} spacing={2}>
          {current_despacho.id_despacho_entrante !== null && (
            <>
              <Grid item xs={12} md={3}>
                <FormButton
                  variant_button="contained"
                  on_click_function={handle_submit(on_submit_save)}
                  icon_class={<SaveIcon />}
                  label={'guardar'}
                  type_button="button"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormButton
                  variant_button="contained"
                  on_click_function={handle_submit(on_submit_confirm)}
                  icon_class={<CheckIcon />}
                  label={'Confirmar distribución'}
                  type_button="button"
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="contained"
              on_click_function={handle_open_select_model}
              icon_class={<SearchIcon />}
              label={'Buscar despacho'}
              type_button="button"
              disabled={false}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Limpiar
              dispatch={dispatch}
              reset_state={reset_state}
              set_initial_values={initial_values}
              variant_button={'outlined'}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
