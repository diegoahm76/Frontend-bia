/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { AccionesFinalModulo } from '../../../../../../../utils/AccionesFinalModulo/Atom/AccionesFinalModulo';
import { LoadingButton } from '@mui/lab';
import Swal from 'sweetalert2';
import { resetItems } from '../../toolkit/slice/RequerimientoUsarioSlice';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { useStepperContext } from '@mui/material';
import { useStepperRequerimiento } from '../../../../hook/useStepperRequerimiento';
import { postRequerimientoUsuario } from '../../toolkit/thunks/postRequerimiento.service';
import { showAlert } from '../../../../../../../utils/showAlert/ShowAlert';

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
    (state) => state.RequerimientoUsarioSlice
  );
  const { currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas } =
    useAppSelector((state: any) => state.BandejaTareasSlice);

  //* handleSumbit

  const sendDataByFormData = () => {
    if (!Array.isArray(anexosCreados) || anexosCreados.length === 0) {
      console.error('anexosCreados is not an array or is empty');
      return;
    }

    if (
      !anexosCreados[0]?.asunto ||
      !anexosCreados[0]?.descripcion_de_la_solicitud ||
      !currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_pqrsdf
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
      'solicitud_usu_PQRSDF',
      JSON.stringify({
        asunto: anexosCreados[0]?.asunto,
        descripcion: anexosCreados[0]?.descripcion_de_la_solicitud,
        id_pqrsdf:
          +currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_pqrsdf,
      })
    );

    anexosCreados.forEach((anexo: any, index: number) => {
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

    postRequerimientoUsuario(formData, setLoadingButton)
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
      .catch((error) => {
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
      title: '¿Está seguro de enviar el requerimiento?',
      text: 'Una vez enviado no podrá realizar cambios',
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
