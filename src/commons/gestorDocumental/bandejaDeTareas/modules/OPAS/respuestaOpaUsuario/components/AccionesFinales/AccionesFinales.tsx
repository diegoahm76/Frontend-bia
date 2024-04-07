/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import Swal from 'sweetalert2'
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';
import { useStepperRequerimiento } from '../../../../../hook/useStepperRequerimiento';

import { AccionesFinalModulo } from '../../../../../../../../utils/AccionesFinalModulo/Atom/AccionesFinalModulo';
import { showAlert } from '../../../../../../../../utils/showAlert/ShowAlert';
import { resetItems } from '../../../requerimientosUsuarioOpas/toolkit/slice/RequerimientoUsarioOpasSlice';
import { postRespuestaOPA } from '../../services/postRespuestaOPA.service';

export const AccionesFinales = ({
  controlFormulario,
  handleSubmitFormulario,
  errorsFormulario,
  resetFormulario,
  watchFormulario,
  setInfoReset,
}: any): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* context

  const { handleReset } = useStepperRequerimiento();

  const [LoadingButton, setLoadingButton] = useState(false);

  const { anexosCreados } = useAppSelector(
    (state) => state.RequerimientoUsarioOpasSlice
  );
  const { currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas } =
    useAppSelector((state: any) => state.BandejaTareasSlice);

  //* handleSumbit

  const sendDataByFormData = () => {
    const sortedAnexos = [...anexosCreados].sort((a: any, b: any) => {
      if (a.ruta_soporte && !b.ruta_soporte) {
        return -1;
      }
      if (!a.ruta_soporte && b.ruta_soporte) {
        return 1;
      }
      return 0;
    });
    // Show alert that the service does not exist yet
  /*  showAlert('Service not implemented', 'This service is not implemented yet', 'info');
    return;*/

    if (!Array.isArray(anexosCreados) || anexosCreados.length === 0) {
      console.error('No se han creado nuevos anexos');
      return;
    }

    if (
      !anexosCreados[0]?.asunto ||
      !anexosCreados[0]?.descripcion_de_la_solicitud /* ||
      !currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_pqrsdf */
    ) {
      showAlert(
        'Opps!',
        'Por favor diligencie los campos de asunto y descripción de la solicitud',
        'warning'
      );
      return;
    }

    const formData = new FormData();

    formData.append(
      'respuesta',
      JSON.stringify({
        asunto: anexosCreados[0]?.asunto,
        descripcion: anexosCreados[0]?.descripcion_de_la_solicitud,
        id_solicitud_tramite:
          +currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_tramite,
      })
    );
    formData.append('id_tarea', currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_tarea_asignada);

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

    // ? se debe crear dentro de la carpeta services un archivo para lalamr este servicio, usar por default el servicio de postRequerimientoUsuario que está en el toolkit del requerimiento al usuario en la carpeta de OPAS

    postRespuestaOPA(formData, setLoadingButton)
      .then(() => {
        handleReset();
        resetFormulario({});
        setInfoReset({});
        dispatch(resetItems());

        Swal.fire({
          title: 'Solicitud enviada',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error: any) => {
        console.error('Error in postRequerimientoUsuario:', error);
      });
  };

  const handleSubmit = async () => {
    if (anexosCreados.length === 0) {
      Swal.fire({
        title: 'No se ha creado ningún anexo',
        text: 'Por favor cree al menos un anexo para poder enviar la solicitud al usuario',
        icon: 'warning',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    console.log(anexosCreados);

    await Swal.fire({
      title: '¿Está seguro de dar respuesta a la OPA?',
      text: 'Una vez enviada la respuesta no podrá realizar cambios',
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
    />
  );
};
