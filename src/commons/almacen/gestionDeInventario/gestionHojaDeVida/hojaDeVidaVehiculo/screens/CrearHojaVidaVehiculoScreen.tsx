/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import CloseIcon from '@mui/icons-material/Close';
import { type IcvVehicles as FormValues } from '../interfaces/CvVehiculo';
import { useForm } from 'react-hook-form';
import SeleccionarVehiculo from '../components/BuscarElemento';
import { useNavigate } from 'react-router-dom';
import { create_cv_vehicles_service, delete_cv_vehicle_service, get_maintenance_vehicle, update_cv_vehicle_service } from '../store/thunks/cvVehiclesThunks';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import EspecificacionesVehicle from '../components/Caracteristicas';
import FormButton from '../../../../../../components/partials/form/FormButton';
import EspecificacionAdicional from '../components/CaracteristicasAdicionales';
import { get_marca_service } from '../../hojaDeVidaComputo/store/thunks/cvComputoThunks';
import { Title } from '../../../../../../components';
import Mantenimiento_vehicle from '../components/Mantenimiento';
import dayjs from 'dayjs';



// eslint-disable-next-line @typescript-eslint/naming-convention
export function CrearHojaVidaVehiculoScreen(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { current_cv_vehicle, current_vehicle} = useAppSelector((state) => state.cve);
  const [action, set_action] = useState<string>("guardar");
  const [file, set_file] = useState<any>(null);
  const { control: control_vehicle, handleSubmit: handle_submit, reset: reset_vehicle, getValues: get_values, watch } = useForm<FormValues>();

  useEffect(() => {
    void dispatch(get_marca_service());
  }, []);

  useEffect(() => {
    set_file(null);
    if (current_cv_vehicle?.id_hoja_de_vida) {
      set_action("editar")
    }else{
      set_action("crear")
    }

    if(current_cv_vehicle?.id_hoja_de_vida){
      reset_vehicle(current_cv_vehicle);
    }else{
      reset_vehicle({
        id_hoja_de_vida: null,
        cod_tipo_vehiculo: '',
        tiene_platon: null,
        capacidad_pasajeros: null,
        color: '',
        es_arrendado: null,
        linea: '',
        tipo_combustible: '',
        es_agendable: null,
        fecha_adquisicion: '',
        codigo_bien: current_vehicle?.codigo_bien ?? "",
        doc_identificador_nro: current_vehicle?.doc_identificador_nro ?? "",
        numero_motor: '',
        numero_chasis: '',
        ultimo_kilometraje: null,
        // cilindra
      })
    }

    if (current_cv_vehicle?.id_articulo) {
      void dispatch(get_maintenance_vehicle(current_cv_vehicle.id_articulo ?? 0))
    }

    //TODO: REvisar si se va a agregar service
    // if (current_cv_vehicle.id_vehiculo_arrendado !== null) {
    //   void dispatch(get_maintenance_vehicle(current_cv_vehicle.id_articulo ?? 0))
    // }
  }, [current_cv_vehicle]);

  const on_submit = (data: FormValues): void => {
    const form_data: any = new FormData();
    form_data.append('cod_tipo_vehiculo', data.cod_tipo_vehiculo || '');
    form_data.append('tiene_platon', data.tiene_platon || '');
    form_data.append('capacidad_pasajeros', data.capacidad_pasajeros|| '');
    form_data.append('color', data.color || '');
    form_data.append('es_arrendado', data.es_arrendado);
    form_data.append('linea', data.linea || '');
    form_data.append('tipo_combustible', data.tipo_combustible);
    form_data.append('ultimo_kilometraje', data.ultimo_kilometraje || '');
    form_data.append('fecha_adquisicion',  dayjs(data.fecha_adquisicion).format('YYYY-MM-DD'));
    form_data.append('numero_motor', data.numero_motor || '');
    form_data.append('numero_chasis', data.numero_chasis || '');
    form_data.append('cilindraje', data.cilindraje || '');
    form_data.append('transmision', data.transmision || '');
    form_data.append('dimension_llantas', data.dimension_llantas || '');
    form_data.append('capacidad_extintor', data.capacidad_extintor || '');
    form_data.append('tarjeta_operacion', data.tarjeta_operacion || '');
    form_data.append('observaciones_adicionales', data.observaciones_adicionales || ''
    );
    form_data.append('es_agendable', data.es_agendable);
    if (data.fecha_circulacion !== null) {
      form_data.append('fecha_circulacion', dayjs(data.fecha_circulacion).format('YYYY-MM-DD'));
    }
    form_data.append('id_articulo', data.id_articulo || current_vehicle?.id_bien || '');
    form_data.append('id_vehiculo_arrendado', data?.id_vehiculo_arrendado || current_vehicle?.id_vehiculo_arrendado || '')
    form_data.append('doc_identificador_nro', data.doc_identificador_nro
    );
    form_data.append('codigo_bien', data.codigo_bien);
    form_data.append('tipo_vehiculo', data.tipo_vehiculo);
    form_data.append('id_marca', data.id_marca);
    if(file) {
      form_data.append('ruta_imagen_foto', file);
    }
    if (data.id_hoja_de_vida === null) {
      void dispatch(create_cv_vehicles_service(form_data, navigate));
      reset_vehicle();
      set_file(null);
    } else {
      void dispatch(update_cv_vehicle_service(data.id_hoja_de_vida, form_data));
    }
  };

  const delete_hoja_vida = (): void => {
    if (current_cv_vehicle.id_hoja_de_vida !== null && current_cv_vehicle.id_hoja_de_vida !== undefined) {
      void dispatch(delete_cv_vehicle_service(current_cv_vehicle.id_hoja_de_vida));
    }
  };
  const programacion_mantenimiento = (): void => {
    navigate('/app/almacen/gestion_inventario/mantenimiento_equipos/programacion_mantenimiento_vehiculos');
  };

  useEffect(() => {

  }, [current_cv_vehicle])

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

        <h1>Hoja de vida vehículos </h1>
        <Grid item xs={12} md={12} marginTop={-2}>
          <Title title={''}></Title>
        </Grid>
        <SeleccionarVehiculo />
        <EspecificacionesVehicle
          file={file} set_file={set_file} control_vehicle={control_vehicle} get_values={get_values} watch={watch} title={''} />
        <EspecificacionAdicional control_vehicle={control_vehicle} get_values={get_values} />
        {current_cv_vehicle?.id_articulo && <Mantenimiento_vehicle />}


        <Grid
          container
          direction="row" justifyContent="flex-end"
          padding={2}
          spacing={2}
        >

          <Grid item xs={12} md={2}>

            <FormButton
              variant_button="contained"
              on_click_function={handle_submit(on_submit)}
              icon_class={action === "crear" ? <SaveIcon /> : <EditIcon />}
              label={action}
              disabled={!current_vehicle?.id_bien}
              type_button="button"
            />
          </Grid>
          {current_cv_vehicle.id_hoja_de_vida !== null &&
            <Grid item xs={12} md={2}>
              <FormButton
                variant_button="outlined"
                on_click_function={delete_hoja_vida}
                disabled={!current_cv_vehicle?.id_hoja_de_vida}
                icon_class={<CloseIcon />}
                label={"Eliminar"}
                type_button="button"
              />
            </Grid>}
          <Grid item xs={12} md={3}>
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
