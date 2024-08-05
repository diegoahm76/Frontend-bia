/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { create_cv_computers_service, delete_cv_computers_service, get_maintenance, get_marca_service, update_cv_computers_service, } from '../store/thunks/cvComputoThunks';
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
import { Title } from '../../../../../../components';
import Mantenimiento from '../components/Mantenimientos';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function CrearHojaVidaComputoScreen(): JSX.Element {
  const [action, set_action] = useState<string>("guardar");
  const [file, set_file] = useState<any>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { current_cv_computer, current_computer } = useAppSelector((state) => state.cv);
  const { control: control_cv_computo, handleSubmit: handle_submit, reset: reset_cv_computer, getValues: get_values } = useForm<FormValues>();

  useEffect(() => {
    void dispatch(get_marca_service());
  }, []);

  useEffect(() => {
    set_file(null);
    if (current_cv_computer?.id_hoja_de_vida) {
      set_action("editar")
    }else{
      set_action("crear")
    }

    if(current_cv_computer?.id_hoja_de_vida){
      reset_cv_computer(current_cv_computer);
    }else{
      reset_cv_computer({
        id_hoja_de_vida: null,
        // id_articulo: null,
        codigo_bien: current_computer?.codigo_bien ?? "",
        nombre: "",
        id_marca: null,
        sistema_operativo: "",
        suite_ofimatica: "",
        antivirus: "",
        color: "",
        tipo_de_equipo: "",
        tipo_almacenamiento: "",
        capacidad_almacenamiento: "",
        doc_identificador_nro: current_computer?.doc_identificador_nro ?? "",
        procesador: "",
        memoria_ram: "",
        estado: "",
        observaciones_adicionales: "",
        otras_aplicaciones: "",
        ruta_imagen_foto: null,
      });
      console.log('reset')
    }

    if (current_cv_computer?.id_articulo !== null) {
      void dispatch(get_maintenance(current_cv_computer.id_articulo ?? 0))
    }
  }, [current_cv_computer]);

  const programacion_mantenimiento = (): void => {
    navigate('/app/almacen/gestion_inventario/mantenimiento_equipos/programacion_mantenimiento_computadores');
  };




  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const on_submit = (data: FormValues): void => {
    console.log('New', data)
    const form_data: any = new FormData();
    form_data.append('sistema_operativo', data.sistema_operativo || '');
    form_data.append('suite_ofimatica', data.suite_ofimatica || '');
    form_data.append('antivirus', data.antivirus || '');
    form_data.append('color', data.color || '');
    form_data.append('tipo_de_equipo', data.tipo_de_equipo || '');
    form_data.append('tipo_almacenamiento', data.tipo_almacenamiento || '');
    form_data.append('capacidad_almacenamiento', data.capacidad_almacenamiento || '');
    form_data.append('procesador', data.procesador || '');
    form_data.append('memoria_ram', data.memoria_ram || null);
    form_data.append('estado', data.estado || '');
    form_data.append('doc_identificador_nro', data.doc_identificador_nro || '');
    form_data.append(
      'observaciones_adicionales',
      data.observaciones_adicionales || ''
    );
    form_data.append('otras_aplicaciones', data.otras_aplicaciones || '');
    form_data.append('id_marca', data.id_marca ?? null);
    form_data.append('id_articulo', (data.id_articulo || current_computer.id_bien || '' ).toString());
    if(file) {
      form_data.append('ruta_imagen_foto', file);
    }
    if (data.id_hoja_de_vida === null) {
      void dispatch(create_cv_computers_service(form_data, navigate));
      reset_cv_computer();
      set_file(null);
    } else {
      void dispatch(update_cv_computers_service(data.id_hoja_de_vida, form_data));
    }
  };

  const delete_hoja_vida = (): void => {
    if (current_cv_computer?.id_hoja_de_vida !== null && current_cv_computer?.id_hoja_de_vida !== undefined) {
      void dispatch(delete_cv_computers_service(current_cv_computer?.id_hoja_de_vida));
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

        <h1>Hoja de vida computadores </h1>
        <Grid item xs={12} md={12} marginTop={-2}>
          <Title title={''}></Title>
        </Grid>

        <SeleccionarComputer />

        <Especificaciones
          file={file}
          set_file={set_file}
          control_computo={control_cv_computo}
          get_values={get_values}
          title="Especificaciones físicas" />
        <EspecificacionesTec
          control_computo={control_cv_computo}
          get_values={get_values}
          title="Especificaciones técnicas" />
        <Caracteristicas
          control_computo={control_cv_computo}
          get_values={get_values}
          title="Características" />
        <Mantenimiento />


        <Grid
          container

          padding={2}
          spacing={2}
          direction="row" justifyContent="flex-end"
        >
          <Grid item xs={12} md={2}>
            <FormButton
              variant_button="contained"
              on_click_function={handle_submit(on_submit)}
              icon_class={action === "crear" ? <SaveIcon /> : <EditIcon />}
              label={action}
              disabled={!current_computer?.id_bien}
              type_button="button"
            />
          </Grid>

          {current_cv_computer?.id_hoja_de_vida !== null &&
            <Grid item xs={12} md={2}>
              <FormButton
                variant_button="outlined"
                on_click_function={delete_hoja_vida}
                disabled={!current_cv_computer?.id_hoja_de_vida}
                icon_class={<CloseIcon />}
                label={"Eliminar"}
                type_button="button"
              />
            </Grid>}

          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              onClick={programacion_mantenimiento}
            >
              Programar mantenimiento
            </Button>
          </Grid>
        </Grid>







      </Grid>

    </>
  );
}


