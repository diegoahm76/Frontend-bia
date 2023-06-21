/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { type IcvVehicles as FormValues } from '../interfaces/CvVehiculo';
import { useForm } from 'react-hook-form';
import SeleccionarVehiculo from '../components/BuscarElemento';
import { useNavigate } from 'react-router-dom';
import { create_cv_vehicles_service } from '../store/thunks/cvVehiclesThunks';
import SaveIcon from '@mui/icons-material/Save';
import EspecificacionesVehicle from '../components/Caracteristicas';
import FormButton from '../../../../../../components/partials/form/FormButton';



// eslint-disable-next-line @typescript-eslint/naming-convention
export function CrearHojaVidaVehiculoScreen(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { current_cv_vehicle, current_vehicle } = useAppSelector((state) => state.cve);
  const [action] = useState<string>("crear hoja de vida");
  const { control: control_vehicle, handleSubmit: handle_submit, reset: reset_vehicle, getValues: get_values } = useForm<FormValues>();
  useEffect(() => {
    reset_vehicle(current_cv_vehicle);
    console.log(current_cv_vehicle)
  }, [current_vehicle]);


  const on_submit = (data: FormValues): void => {
    const form_data: any = new FormData();
    form_data.append('cod_tipo_vehiculo', data.cod_tipo_vehiculo);
    form_data.append('tiene_platon', data.tiene_platon.toString());
    form_data.append('capacidad_pasajeros', data.capacidad_pasajeros.toString());
    form_data.append('color', data.color);
    form_data.append('es_arrendado', data.es_arrendado.toString());
    form_data.append('linea', data.linea);
    form_data.append('tipo_combustible', data.tipo_combustible.toString());
    form_data.append('es_arrendado', data.es_arrendado.toString());
    form_data.append('ultimo_kilometraje', data.ultimo_kilometraje.toString());
    form_data.append('fecha_adquisicion', data.fecha_adquisicion.toString());
    form_data.append('numero_motor', data.numero_motor);
    form_data.append('numero_chasis', data.numero_chasis);
    form_data.append('ultimo_kilometraje', data.ultimo_kilometraje.toString());
    form_data.append('cilindraje', data.cilindraje.toString());
    form_data.append('transmision', data.transmision);
    form_data.append('dimension_llantas', data.dimension_llantas.toString());
    form_data.append('capacidad_extintor', data.capacidad_extintor.toString());
    form_data.append('tarjeta_operacion', data.tarjeta_operacion);
    form_data.append(
      'observaciones_adicionales',
      data.observaciones_adicionales
    );
    form_data.append('es_agendable', data.es_agendable.toString());
    form_data.append('fecha_circulacion', data.fecha_circulacion.toString());
    form_data.append('id_articulo', data.id_articulo.toString());
    form_data.append(
      'doc_identificador_nro',
      data.doc_identificador_nro.toString()
    );
    form_data.append('codigo_bien', data.codigo_bien);
    form_data.append('tipo_vehiculo', data.tipo_vehiculo);
    form_data.append('id_marca', data.id_marca.toString());
    // form_data.append('ruta_imagen_foto', file === null ? '' : file);
    void dispatch(create_cv_vehicles_service(form_data, navigate));

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



        <SeleccionarVehiculo control_vehicle={control_vehicle} get_values={get_values} />
        <EspecificacionesVehicle
          control_vehicle={control_vehicle} get_values={get_values} title={'Especif'} />

        <Grid
          container
          direction="row"
          padding={2}
          spacing={2}
        >

          <Grid item xs={12} md={3}>

            <FormButton
              variant_button="contained"
              on_click_function={handle_submit(on_submit)}
              icon_class={<SaveIcon />}
              label={action}
              type_button="button"
            />
          </Grid>



        </Grid>







      </Grid>
    </>
  );
}
