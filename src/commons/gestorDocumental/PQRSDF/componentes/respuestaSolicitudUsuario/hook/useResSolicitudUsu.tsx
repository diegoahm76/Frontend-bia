/* eslint-disable @typescript-eslint/naming-convention */

import { useForm } from 'react-hook-form';

export const useResSolicitudUsu = () => {
  // ? DECLARACIONES PARA LAS SUB ENTREGAS
  // ? 1 REQUERIMIENTOS AL USUARIO

  // ? Segundo paso solicitud al usuario
  const {
    control: controlFormulario,
    handleSubmit: handleSubmitFormulario,
    formState: { errors: errorsFormulario },
    reset: resetFormulario,
    watch: watchFormulario,
    setValue: setValueFormulario,
    getValues: getValuesFormulario,
  } = useForm({
    defaultValues: {
      asunto: '',
      descripcion_de_la_solicitud: '',
      fecha_de_solicitud: '',
      medio_almacenamiento: '',
      nombre_archivo: '',
      numero_folios: '',
      ruta_soporte: '',
    },
  });

  const watchFormularioValues = watchFormulario();
  //  console.log('')('watchFormulario', watchFormularioValues);

  const resetFormularioFunction = () => {
    setValueFormulario('medio_almacenamiento', '');
    setValueFormulario('nombre_archivo', '');
    setValueFormulario('numero_folios', '');
    setValueFormulario('ruta_soporte', '');
  };

  // ? ----- controles para el manejo del modal de metadatos de la entrega 99 -----

  const {
    control: controlManejoMetadatosModal,
    handleSubmit: handleSubmitManejoMetadatosModal,
    setValue: setValueManejoMetadatosModal,
    reset: resetManejoMetadatosModal,
    watch: watchManejoMetadatosModal,
  } = useForm({
    defaultValues: {
      categoriaArchivoMetadatos: {
        value: '',
        label: '',
      },
      tieneReplicaFisicaMetadatos: {
        value: '',
        label: '',
      },
      origenArchivoMetadatos: {
        value: '',
        label: '',
      },
      tieneTipologiaRelacionadaMetadatos: {
        value: '',
        label: '',
      },
      tipologiasDocumentalesMetadatos: {
        value: '',
        label: '',
      },
      cualTipologiaDocumentalMetadatos: '',
      asuntoMetadatos: '',
      descripcionMetadatos: '',
      palabrasClavesMetadatos: {} as any,
    },
  });

  //
  const watchExeManejoModalMetadatos = watchManejoMetadatosModal();
  // //  console.log('')('watchExeManejoModalMetadatos', watchExeManejoModalMetadatos);

  // ? reset de los valores del modal de metadatos
  const resetManejoMetadatosModalFunction = () =>
    resetManejoMetadatosModal({
      categoriaArchivoMetadatos: {
        value: '',
        label: '',
      },
      tieneReplicaFisicaMetadatos: {
        value: '',
        label: '',
      },
      origenArchivoMetadatos: {
        label: '',
        value: '',
      },
      tieneTipologiaRelacionadaMetadatos: {
        value: '',
        label: '',
      },
      tipologiasDocumentalesMetadatos: {
        value: '',
        label: '',
      },
      cualTipologiaDocumentalMetadatos: '',
      asuntoMetadatos: '',
      descripcionMetadatos: '',
      palabrasClavesMetadatos: {} as any,
    });

  return {
    // ? CONTROLES PARA LAS SUB ENTREGAS

    // ? Formulario de solicitud al usuario
    controlFormulario,
    handleSubmitFormulario,
    errorsFormulario,
    setInfoReset: resetFormulario,
    resetFormulario: resetFormularioFunction,
    watchFormulario: watchFormularioValues,
    setValueFormulario,
    getValuesFormulario,

    // ? Manejo del modal de metadatos
    controlManejoMetadatosModal,
    handleSubmitManejoMetadatosModal,
    setValueManejoMetadatosModal,
    resetManejoMetadatosModal,
    resetManejoMetadatosModalFunction,
    watchExeManejoModalMetadatos,
  };
};
