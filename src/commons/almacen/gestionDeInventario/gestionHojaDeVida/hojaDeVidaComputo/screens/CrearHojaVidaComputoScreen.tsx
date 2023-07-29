/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { create_cv_computers_service, delete_cv_computers_service, get_marca_service, update_cv_computers_service, } from '../store/thunks/cvComputoThunks';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { type ICvcomputers as FormValues } from '../interfaces/CvComputo';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import SeleccionarComputer from '../components/BuscarElementos';
import Especificaciones from '../components/EspecificacionesFisc';
import EspecificacionesTec from '../components/EspecificacionesTec';
import Caracteristicas from '../components/Caracteristicas';
import FormButton from '../../../../../../components/partials/form/FormButton';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function CrearHojaVidaComputoScreen(): JSX.Element {
  const [action, set_action] = useState<string>("guardar");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { current_cv_computer } = useAppSelector((state) => state.cv);
  const { control: control_cv_computo, handleSubmit: handle_submit, reset: reset_cv_computer, getValues: get_values } = useForm<FormValues>();

  useEffect(() => {
    void dispatch(get_marca_service());
  }, []);

  useEffect(() => {
    if (current_cv_computer.id_hoja_de_vida !== null) {
      set_action("editar")
    }
  }, [current_cv_computer]);


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const on_submit = (data: FormValues): void => {
    const form_data: any = new FormData();
    form_data.append('sistema_operativo', data.sistema_operativo);
    form_data.append('suite_ofimatica', data.suite_ofimatica);
    form_data.append('antivirus', data.antivirus);
    form_data.append('color', data.color);
    form_data.append('tipo_de_equipo', data.tipo_de_equipo);
    form_data.append('tipo_almacenamiento', data.tipo_almacenamiento);
    form_data.append('capacidad_almacenamiento', data.capacidad_almacenamiento);
    form_data.append('procesador', data.procesador);
    form_data.append('memoria_ram', data.memoria_ram);
    form_data.append('estado', data.estado);
    form_data.append('doc_identificador_nro', data.doc_identificador_nro);
    form_data.append(
      'observaciones_adicionales',
      data.observaciones_adicionales
    );
    form_data.append('otras_aplicaciones', data.otras_aplicaciones);
    form_data.append('id_marca', data.id_marca ?? null);
    form_data.append('id_articulo', (data.id_articulo ?? "").toString());
    form_data.append('ruta_imagen_foto', data.ruta_imagen_foto);
    if (data.id_hoja_de_vida === null) {
      void dispatch(create_cv_computers_service(form_data, navigate));
    } else {
      void dispatch(update_cv_computers_service(data.id_hoja_de_vida, form_data));
    }
  };
  const delete_hoja_vida = (): void => {
    if (current_cv_computer.id_hoja_de_vida !== null && current_cv_computer.id_hoja_de_vida !== undefined) {
      void dispatch(delete_cv_computers_service(current_cv_computer.id_hoja_de_vida));
    }
  };

  useEffect(() => {
    reset_cv_computer(current_cv_computer);
    console.log(current_cv_computer)
  }, [current_cv_computer]);

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
        <SeleccionarComputer />

        <Especificaciones
          control_computo={control_cv_computo}
          get_values={get_values}
          title="ESPECIFICACIONES FÍSICAS" />
        <EspecificacionesTec
          control_computo={control_cv_computo}
          get_values={get_values}
          title="ESPECIFICACIONES TECNICAS" />
        <Caracteristicas
          control_computo={control_cv_computo}
          get_values={get_values}
          title="CARACTERISTÍCAS" />


        <Grid
          container
          direction="row"
          padding={2}
          spacing={2}
        >
          <Grid item xs={12} md={2}>
            <FormButton
              variant_button="contained"
              on_click_function={handle_submit(on_submit)}
              icon_class={action === "create" ? <EditIcon /> : <SaveIcon />}
              label={action}
              type_button="button"
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <FormButton
              variant_button="outlined"
              on_click_function={delete_hoja_vida}
              icon_class={<CloseIcon />}
              label={"Eliminar"}
              type_button="button"
            />
          </Grid>
        </Grid>







      </Grid>

    </>
  );
}


