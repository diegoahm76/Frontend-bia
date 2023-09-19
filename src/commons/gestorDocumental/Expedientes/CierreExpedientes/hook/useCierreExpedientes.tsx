/* eslint-disable @typescript-eslint/naming-convention */

import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { control_error, control_success } from '../../../../../helpers';
import { post_archivo_soporte } from '../services/services';
import { useAppSelector } from '../../../../../hooks';

export const useCierreExpedientes = () => {
  // useForm
  const {
    control: control_archivo_soporte,
    register: register_archivo_soporte,
    handleSubmit: handleSubmit_archivo_soporte,
    reset: reset_archivo_soporte,
    setValue: setValue_archivo_soporte,
    watch: watch_archivo_soporte,
    formState: { errors: errors_archivo_soporte },
  } = useForm({
    defaultValues: {
      id_expediente_documental: '',
      nombre_asignado_documento: '',
      fecha_creacion_doc: '',
      nro_folios_del_doc: '',
      cod_origen_archivo: '',
      codigo_tipologia_doc_prefijo: '',
      codigo_tipologia_doc_agno: '',
      codigo_tipologia_doc_consecutivo: '',
      cod_categoria_archivo: '',
      tiene_replica_fisica: false,
      asunto: '',
      descripcion: '',
      palabras_clave_documento: '',

      tipologia_documental: '',
      tiene_consecutivo: '',
    },
  });

  // useForm
  const {
    control: control_cierre_exp,
    register: register_cierre_exp,
    handleSubmit: handleSubmit_cierre_exp,
    reset: reset_cierre_exp,
    setValue: setValue_cierre_exp,
    watch: watch_cierre_exp,
    formState: { errors: errors_cierre_exp },
  } = useForm({
    defaultValues: {
      observaciones: '',
    },
  });

  const data_watch_archivo_soporte = watch_archivo_soporte();

  const currentDate = dayjs();
  const formattedDate = currentDate.format('DD/MM/YYYY');

  const [tiene_consecutivo_documento, set_tiene_consecutivo_documento] =
    useState<string>('');
  const [agno_archivo, set_agno_archivo] = useState<number>(0);

  const [is_saving, set_is_saving] = useState(false);

  // * palabras clave
  const [palabrasClave, setPalabrasClave] = useState<string>('');

  const handlePalabrasClaveChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const palabras = event.target.value.replace(/\s+/g, '|'); // Reemplazar espacios en blanco por el símbolo '|'
    setPalabrasClave(palabras);
  };

  const {
    cierre_expediente: { id_expediente_documental },
  } = useAppSelector((state) => state.expedientes);

  // * onSubmit
  const onSubmit_archivo_soporte = handleSubmit_archivo_soporte(
    async (data) => {
      try {
        set_is_saving(true);
        console.log(data);
        const data_archivo = {
          id_expediente_documental: id_expediente_documental,
          nombre_asignado_documento: data.nombre_asignado_documento,

          fecha_creacion_doc: dayjs(data.fecha_creacion_doc).format(
            'DD/MM/YYYY'
          ),
          nro_folios_del_doc: data.nro_folios_del_doc,
          cod_origen_archivo: data.cod_origen_archivo,
          codigo_tipologia_doc_prefijo: data.codigo_tipologia_doc_prefijo,
          codigo_tipologia_doc_agno: agno_archivo,
          codigo_tipologia_doc_consecutivo:
            data.codigo_tipologia_doc_consecutivo,
          cod_categoria_archivo: data.cod_categoria_archivo,
          tiene_replica_fisica: data.tiene_replica_fisica,
          asunto: data.asunto,
          descripcion: data.descripcion,
          palabras_clave_documento: palabrasClave,
        };
        await post_archivo_soporte(data_archivo);

        control_success('Se ha creado el archivo de soporte exitosamente');
      } catch (error: any) {
        control_error(
          error.response.data.detail ||
            'Error al crear el archivo de soporte, intente nuevamente'
        );
      } finally {
        set_is_saving(false);
      }
    }
  );

  return {
    // * useForm archivo_soporte
    control_archivo_soporte,
    register_archivo_soporte,
    handleSubmit_archivo_soporte,
    reset_archivo_soporte,
    setValue_archivo_soporte,
    errors_archivo_soporte,
    data_watch_archivo_soporte,

    // * useForm cierre_exp
    control_cierre_exp,
    register_cierre_exp,
    handleSubmit_cierre_exp,
    reset_cierre_exp,
    setValue_cierre_exp,
    errors_cierre_exp,

    // * fecha
    formattedDate,

    // * onSubmit
    onSubmit_archivo_soporte,
    is_saving,
    // ? limpiar formulario

    // select
    tiene_consecutivo_documento,
    set_tiene_consecutivo_documento,
    // *año
    agno_archivo,
    set_agno_archivo,

    // * palabras clave
    palabrasClave,
    handlePalabrasClaveChange,
  };
};
