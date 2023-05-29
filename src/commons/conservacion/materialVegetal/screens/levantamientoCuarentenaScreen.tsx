import { Grid } from "@mui/material";
import { Title } from "../../../../components/Title";
import SeleccionarLevantamientoCuarentena from "../componentes/SeleccionarLevantamientoCuarentena";
import SeleccionarCuarentena from "../componentes/SeleccionarCuarentena";
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { set_current_lifting, initial_satate_current_lifting } from '../store/slice/materialvegetalSlice';
import { useEffect, useState } from "react";
import { add_lifting_quarantine_service, annul_lifting_quarantine_service, edit_lifting_quarantine_service, get_person_id_service } from "../store/thunks/materialvegetalThunks";
import { type IObjLifting} from "../interfaces/materialvegetal";
import { useForm } from "react-hook-form";
import FormButton from "../../../../components/partials/form/FormButton";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import BuscarModelo from "../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../auth/interfaces';


// eslint-disable-next-line @typescript-eslint/naming-convention
export function LevantamientoCuarentenaScreen(): JSX.Element {
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);

  const { current_lifting, plant_quarantine_lifting, planting_person, current_nursery, current_plant_quarantine } = useAppSelector((state) => state.material_vegetal);

  const { control: control_levantamiento, handleSubmit: handle_submit, reset: reset_levantamiento, getValues: get_values, watch } = useForm<IObjLifting>();


  const [action, set_action] = useState<string>("Crear")
  const dispatch = useAppDispatch()

  const columns_levantamiento: GridColDef[] = [
    {
        field: 'consec_levan_por_cuaren',
        headerName: 'Consecutivo levantamiento',
        width: 200,
        renderCell: (params) => (
            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                {params.value}
            </div>
        ),
    },
    {
      field: 'fecha_levantamiento',
      headerName: 'Fecha de levantamiento',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(params.value).toDateString()}
        </div>
      ),
    },
    {
        field: 'cantidad_a_levantar',
        headerName: 'Cantidad',
        width: 200,
        renderCell: (params) => (
            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                {params.value}
            </div>
        ),
    },
    {
        field: 'observaciones',
        headerName: 'Observación',
        width: 150,
        renderCell: (params) => (
            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                {params.value}
            </div>
        ),
    },
    

];

useEffect(() => {
  void dispatch(get_person_id_service(userinfo.id_persona))
}, []);

  useEffect(() => {
    reset_levantamiento({
      ...current_lifting,
      id_persona_levanta: planting_person.id_persona,
      persona_levanta: planting_person.nombre_completo
    })
  }, [planting_person]);

  useEffect(() => {
    if (current_lifting.id_item_levanta_cuarentena !== null) {
      set_action("editar")
    }
    reset_levantamiento(current_lifting)
  }, [current_lifting]);

  useEffect(() => {
    dispatch(set_current_lifting(initial_satate_current_lifting))
  }, [current_nursery]);

  useEffect(() => {
    if(current_plant_quarantine.id_cuarentena_mat_vegetal !== null){
        dispatch(set_current_lifting({
        ...current_lifting,
        id_cuarentena_mat_vegetal: current_plant_quarantine.id_cuarentena_mat_vegetal ?? 0,
        cantidad_cuarentena: get_values("cantidad_cuarentena"),
        cantidad_levantada: get_values("cantidad_levantada"),
        cantidad_mortalidad: get_values("cantidad_mortalidad"),
        cantidad_disponible: get_values("cantidad_disponible"),
        cantidad_a_levantar: get_values("cantidad_a_levantar"),
        observaciones: get_values("observaciones"),
        }))
    }
}, [current_plant_quarantine]);

  const on_submit = (data: IObjLifting): void => {
    const form_data: any = new FormData();
    if (current_lifting.id_item_levanta_cuarentena !== null && current_lifting.id_item_levanta_cuarentena !== undefined) {
      set_action("editar")
     
      form_data.append('cantidad_a_levantar', Number(data.cantidad_a_levantar));
      form_data.append('observaciones', data.observaciones);
      void dispatch(edit_lifting_quarantine_service(form_data, current_lifting.id_item_levanta_cuarentena));
    } else {
      set_action("crear")
      const fecha = new Date(data.fecha_levantamiento ?? "").toISOString()
      form_data.append('id_cuarentena_mat_vegetal', current_plant_quarantine.id_cuarentena_mat_vegetal);
      form_data.append('fecha_levantamiento', fecha.slice(0, 10) + " " + fecha.slice(11, 19));
      form_data.append('cantidad_a_levantar', Number(data.cantidad_a_levantar));
      form_data.append('observaciones', data.observaciones);
      void dispatch(add_lifting_quarantine_service(form_data));
    }
  };
  const on_submit_annul = (data: IObjLifting): void => {
    const form_data: any = new FormData();

    form_data.append('justificacion_anulacion', data.justificacion_anulacion);

    if (current_lifting.id_item_levanta_cuarentena !== null && current_lifting.id_item_levanta_cuarentena !== undefined) {
      void dispatch(annul_lifting_quarantine_service(current_lifting.id_item_levanta_cuarentena, form_data));
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
          <Title title="Levantamiento de cuarentena de material vegetal"></Title>
        </Grid>
        <SeleccionarCuarentena />
        {current_plant_quarantine.id_cuarentena_mat_vegetal !== null &&
          <SeleccionarLevantamientoCuarentena
            control_levantamiento={control_levantamiento}
            get_values={get_values}
          />
        }
        <BuscarModelo
          set_current_model={null}
          row_id={"id_item_levanta_cuarentena"}
          columns_model={columns_levantamiento}
          models={plant_quarantine_lifting}
          get_filters_models={null}
          set_models={null}
          button_submit_label='Historial levantamientos'
          form_inputs= {[]}
          modal_select_model_title='Historial levantamientos'
          modal_form_filters={[]}
          button_add_selection_hidden= {true}
        />
        <Grid
          container
          direction="row"
          padding={2}
          spacing={2}
        >
          {(((current_plant_quarantine.cantidad_levantada??0) === 0) && ((current_plant_quarantine.cantidad_levantada??0) === 0)) &&
            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="contained"
                on_click_function={handle_submit(on_submit)}
                icon_class={<SaveIcon />}
                label={action}
                type_button="button"
              />
            </Grid>
          }
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="outlined"
              on_click_function={handle_submit(on_submit_annul)}
              icon_class={<CloseIcon />}
              label={"Anular"}
              type_button="button"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
