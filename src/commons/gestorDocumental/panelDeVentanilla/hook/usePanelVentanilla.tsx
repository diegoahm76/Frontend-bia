/* eslint-disable @typescript-eslint/naming-convention */

import { useForm } from 'react-hook-form';
import { INITIAL_STATES_FORM_PANEL_VENTANILLA } from './utils/initialStates';

export const usePanelVentanilla = () => {
  // ? use Form declaration

  // ! DECLARACIONES PARA LA ENTREGA 98 ................//
  // ! DECLARACIONES PARA LA ENTREGA 98 ................//
  // ! DECLARACIONES PARA LA ENTREGA 98 ................//
  const {
    control: control_busqueda_panel_ventanilla,
    setValue: set_value_valores_panel_ventanilla,
    reset: reset_busqueda_panel_ventanilla,
    watch: watch_panel_ventanilla,
  } = useForm({
    // ? pendiente el tipado, ya que por base de datos quizá cambie la información que se necesita
    defaultValues: INITIAL_STATES_FORM_PANEL_VENTANILLA,

    // ? para opas

    // ! se debe agregar tambien el de otros
  });

  //* ejecucion del watch
  const watch_busqueda_panel_ventanilla = watch_panel_ventanilla();

  // ? ------- funciones para el manejo de los elementos del panel de ventanilla -------
  const reset_search_form = () =>
    reset_busqueda_panel_ventanilla(INITIAL_STATES_FORM_PANEL_VENTANILLA);

  // ! DECLARACIONES PARA LA ENTREGA 99 ................//
  // ! DECLARACIONES PARA LA ENTREGA 99 ................//

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
    // formState: formState_manejo_metadatos_modal,
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
    // ! DECLARACIONES PARA LA ENTREGA 98 ................//
    // ! DECLARACIONES PARA LA ENTREGA 98 ................//

    //* se deben retornar todos los elemento necesarios para el manejo de las pantallas del panel de ventanilla
    // ? busqueda panel de ventanilla
    control_busqueda_panel_ventanilla,
    watch_busqueda_panel_ventanilla,
    //* funciones de reset
    reset_search_form,

    // ! DECLARACIONES PARA LA ENTREGA 99 ................//
    // ! DECLARACIONES PARA LA ENTREGA 99 ................//

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
