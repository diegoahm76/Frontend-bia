import { Grid, } from "@mui/material";
import SeleccionarBodega, { } from "../components/SeleccionarBodega";
import SaveIcon from '@mui/icons-material/Save';
import { Title } from '../../../../components/Title';
import PersonaResponsable from "../components/PersonaResponsable";
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../hooks";
import { set_bodega_seleccionada, set_responsable } from "../store/slice/BodegaSlice";
import FormButton from "../../../../components/partials/form/FormButton";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { type IBodega } from "../interfaces/Bodega";
import { add_bodega_service, delete_bodega_service, edit_bodega_service } from "../store/thunks/BodegaThunks";

// eslint-disable-next-line @typescript-eslint/naming-convention
export function BodegaScreen(): JSX.Element {

  const { control: control_aux_bodega, handleSubmit: handle_submit, reset: reset_aux_bodega, getValues: get_values } = useForm<IBodega>();

  const { bodega_seleccionada, id_responsable_bodega } = useAppSelector((state) => state.bodegas);
  const dispatch = useDispatch();
  const [open_search_modal, set_open_search_modal] = useState<boolean>(false);
  const handle_open_select_model = (): void => { set_open_search_modal(true); };

  useEffect(() => {
    dispatch(set_bodega_seleccionada({ ...bodega_seleccionada, nombre: get_values("nombre"), direccion: get_values("direccion"), cod_municipio: get_values("cod_municipio"), es_principal: get_values("es_principal"), id_responsable: id_responsable_bodega?.id_persona, nombre_completo_responsable: id_responsable_bodega?.nombre_completo }))
  }, [id_responsable_bodega]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const on_submit = (data: IBodega) => {
    if (bodega_seleccionada.id_bodega !== null && bodega_seleccionada.id_bodega !== undefined) {
      //  console.log('')("editar")
      void dispatch(edit_bodega_service(data, bodega_seleccionada.id_bodega))
    } else {
      void dispatch(add_bodega_service(data));
    }


  };
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const on_submit_delete = (data: IBodega) => {
    if (bodega_seleccionada.id_bodega !== null && bodega_seleccionada.id_bodega !== undefined) {
      //  console.log('')("eliminar")
      void dispatch(delete_bodega_service(bodega_seleccionada.id_bodega))
    } else {
      void dispatch(add_bodega_service(data));
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
          <Title title="Bodegas "></Title>
        </Grid>
        < SeleccionarBodega
          control_bodega={control_aux_bodega}
          reset_bodega={reset_aux_bodega}
          open_modal={open_search_modal}
          set_open_modal={set_open_search_modal}
        />

        < PersonaResponsable
          title={"Persona responsable de la bodega"}
          set_persona={set_responsable} />

        <Grid
          container
          direction="row"
          padding={2}
          spacing={2}
        >



          <Grid item xs={12} md={2}>
            {bodega_seleccionada.id_bodega !== null && bodega_seleccionada.id_bodega !== undefined ?
              <FormButton
                variant_button="contained"
                on_click_function={handle_submit(on_submit)}

                icon_class={<EditIcon />}
                label={"Editar"}
                type_button="button"

              />
              :
              <FormButton
                variant_button="contained"
                on_click_function={handle_submit(on_submit)}

                icon_class={<SaveIcon />}
                label={"Guardar"}
                type_button="button"

              />
            }
          </Grid>

          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="contained"
              on_click_function={handle_open_select_model}
              icon_class={<SearchIcon />}
              label={'Buscar bodega'}
              type_button="button"
              disabled={false}
            />
          </Grid>

          {(bodega_seleccionada.id_bodega !== null && bodega_seleccionada.id_bodega !== undefined) &&
            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="contained"
                on_click_function={handle_submit(on_submit_delete)}
                icon_class={<DeleteIcon />}
                label={"Eliminar"}

                type_button="button"
              />
            </Grid>
          }
          {/* <Grid item xs={12} md={3}>
            <FormButton
              variant_button="outlined"
              on_click_function={null}
              icon_class={<CloseIcon />}
              label={"Cancelar"}
              type_button="button"
            /> 
        </Grid> */}
        </Grid>
      </Grid >
    </>

  );

}

