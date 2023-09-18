/* eslint-disable @typescript-eslint/naming-convention */

import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { control_error, control_success } from '../../../../../helpers';

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

    const [tiene_consecutivo_documento, set_tiene_consecutivo_documento] = useState<string>('');
    const [ agno_archivo, set_agno_archivo ] = useState<number>(0);

    const [is_saving, set_is_saving] = useState(false);

    // * onSubmit
    const onSubmit_archivo_soporte = handleSubmit_archivo_soporte(async (data) => {
        try {
            set_is_saving(true);
            console.log(data);
            control_success('Se ha creado el tipo de radicado exitosamente');
        } catch (error: any) {
            control_error(error.response.data.detail || 'Error al crear el tipo de radicado, intente nuevamente');
        } finally {
            set_is_saving(false);
        }
    });


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
    };
};
