/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';
import { showAlert } from '../../../../../../../../utils/showAlert/ShowAlert';
import { AccionesFinalModulo } from '../../../../../../../../utils/AccionesFinalModulo/Atom/AccionesFinalModulo';
import { useStepperRequerimiento } from '../../../../../../bandejaDeTareas/hook/useStepperRequerimiento';
import { resetItems } from '../../../../toolkit/slice/ResRequerimientoOpaSlice';
import { control_warning } from '../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { postResponderRequerimientoUsuario } from '../../../../toolkit/thunks/postRequerimiento.service';
import { useNavigate } from 'react-router-dom';


export const AccionesFinales = ({
  resetFormulario,
}: any): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* context
  const navigate = useNavigate();

  const { handleReset } = useStepperRequerimiento();

  const [LoadingButton, setLoadingButton] = useState(false);

  const { anexosCreados } = useAppSelector(
    (state) => state.ResRequerimientoOpaSlice
  );
  const { currentPersonaRespuestaUsuario } =
    useAppSelector((state: any) => state.ResRequerimientoOpaSlice);

  //* handleSumbit

  const sendDataByFormData = () => {

    console.log('este es el currentPersonaRespuestaUsuario', currentPersonaRespuestaUsuario)

    const sortedAnexos = [...anexosCreados].sort((a: any, b: any) => {
      if (a.ruta_soporte && !b.ruta_soporte) {
        return -1;
      }
      if (!a.ruta_soporte && b.ruta_soporte) {
        return 1;
      }
      return 0;
    });
    if (!Array.isArray(anexosCreados) || anexosCreados.length === 0) {
      control_warning('No se ha creado ningún anexo, o hay un error en la creación de los anexos');
      return;
    }

    if (
      //* se debe añadir probablemente el id del tramite para el que se va a realizar la respuesta del requerimiento
      //!anexosCreados[0]?.medio_de_solicitud ||
      //!anexosCreados[0]?.asunto ||
      !anexosCreados[0]?.descripcion_de_la_solicitud /*||
      !currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_pqrsdf*/
    ) {
      showAlert(
        'Opps!',
        'Por favor diligencie el campo de descripción de la respuesta del requerimiento',
        'warning'
      );
      return;
    }

    //console.log('estos son los anexos creados', anexosCreados)

    const formData = new FormData();

    formData.append(
      'respuesta',
      JSON.stringify({
        //asunto: anexosCreados[0]?.asunto  || 'Sin asunto',
        descripcion: anexosCreados[0]?.descripcion_de_la_solicitud,
        id_solicitud_tramite: currentPersonaRespuestaUsuario?.id_solicitud_tramite,
        id_requerimiento: currentPersonaRespuestaUsuario?.id_requerimiento,
        //id_requerimiento:
        //  +currentPersonaRespuestaUsuario?.id_requerimiento,
      })
    );
  /*  formData.append('id_tarea', currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_tarea_asignada);*/

    sortedAnexos.forEach((anexo: any, index: number) => {
      formData.append('archivo', anexo.ruta_soporte);
      formData.append(
        'anexo',
        JSON.stringify({
          nombre_anexo: anexo?.nombre_archivo,
          numero_folios: anexo?.numero_folios,
          cod_medio_almacenamiento: 'Na',
          orden_anexo_doc: index + 1,
          meta_data: {
            tiene_replica_fisica:
              anexo?.tieneReplicaFisicaMetadatos?.value === 'Si' ? true : false,
            cod_origen_archivo: anexo?.origenArchivoMetadatos?.value,
            nombre_original_archivo: 'Archivo', // ? se debe cambiar por el nombre del archivo que se suba en el input 'archivo'
            descripcion: anexo?.descripcionMetadatos,
            asunto: anexo?.asuntoMetadatos,
            cod_categoria_archivo: anexo?.categoriaArchivoMetadatos?.value,
            nro_folios_documento: +anexo?.numero_folios
              ? +anexo?.numero_folios
              : 0,
            id_tipologia_doc: +anexo?.tipologiasDocumentalesMetadatos?.value
              ? +anexo?.tipologiasDocumentalesMetadatos?.value
              : null,
            tipologia_no_creada_TRD: anexo?.cualTipologiaDocumentalMetadatos
              ? anexo?.cualTipologiaDocumentalMetadatos
              : null,
            palabras_clave_doc: anexo?.palabrasClavesMetadatos.join('|'),
          },
        })
      );
    });

    postResponderRequerimientoUsuario(formData, setLoadingButton)
      .then(() => {
        handleReset();
        resetFormulario({});
        //setInfoReset({});
        dispatch(resetItems());
        navigate('/app/gestor_documental/tramites/respuesta_requerimiento_opa/');
        Swal.fire({
          title: 'Solicitud enviada',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error('Error in postRequerimientoUsuario:', error);
      });
  };

  const handleSubmit = async () => {
    console.log('este es el currentPersonaRespuestaUsuario', currentPersonaRespuestaUsuario)
    if (anexosCreados.length === 0) {
      Swal.fire({
        title: 'No se ha creado ningún anexo',
        text: 'Por favor cree al menos un anexo para poder radicar la respuesta al requerimiento!!',
        icon: 'warning',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    console.log('estos son los anexos creado', anexosCreados);

    await Swal.fire({
      title: '¿Seguro de radicar la respuesta sobre el requerimiento?',
      text: 'Después de enviar la información, NO será posible realizar cambios. Por favor, verifique los detalles antes de proceder!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        //* se debe activar el envío de la solicitud al usuario y luego el swal y el mensaje de success
        sendDataByFormData();
      } else {
        Swal.fire({
          title: 'Solicitud cancelada',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const reset = () => {
    dispatch(resetItems());
    handleReset();
    resetFormulario();
  };

  return (
    <AccionesFinalModulo
      loadingButton={LoadingButton}
      handleSubmit={handleSubmit}
      reset_states={reset}
      textGuardar='RADICAR RESPUESTA REQUERIMIENTO'
    />
  );
};
