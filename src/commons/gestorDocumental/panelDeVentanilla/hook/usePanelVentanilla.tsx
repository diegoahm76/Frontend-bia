/* eslint-disable @typescript-eslint/naming-convention */

import { useForm } from 'react-hook-form';

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
    defaultValues: {
      // ? para pqrsdf
      tipo_de_solicitud: {
        value: '',
        label: '',
      },
      estado_actual_solicitud: {
        value: '',
        label: '',
      },
      radicado: '', //* sirve para pqrsdf y tramites y servicios
      // ? para trámite y servicios
      nombre_titular: '',
      asunto_proyecto: '',
      pago_tramite: {
        value: '',
        label: '',
      },
      expediente: '',
    },

    // ! se debe agregar tambien el de otros
  });

  //* ejecucion del watch
  const watch_busqueda_panel_ventanilla = watch_panel_ventanilla();

  // ? ------- funciones para el manejo de los elementos del panel de ventanilla -------
  const reset_search_form = () =>
    reset_busqueda_panel_ventanilla({
      // ? para pqrsdf

      //* se debe evaluar el borrado de los valores del selector llamado tipo de solicitud
      /* tipo_de_solicitud: {
        value: '',
        label: '',
      },*/
      estado_actual_solicitud: {
        value: '',
        label: '',
      },
      radicado: '',

      // ? para trámite y servicios
      nombre_titular: '',
      asunto_proyecto: '',
      pago_tramite: {
        value: '',
        label: '',
      },
      expediente: '',

      // ! se debe agregar tambien el de otros
    });

  // ! DECLARACIONES PARA LA ENTREGA 99 ................//
  // ! DECLARACIONES PARA LA ENTREGA 99 ................//

  // ? Segundo paso solicitud al usuario
  const {
    control: controlSegundoPasoEntrega99,
    handleSubmit: handleSubmitSegundoPasoEntrega99,
    // formState: formStateSegundoFormulario,
    setValue: setValueSegundoFormularioEntrega99,
    reset: resetSegundoFormularioEntrega99,
  } = useForm();

  // ? Tercer paso solicitud al usuario
  const {
    control: controlTercerPasoEntrega99,
    handleSubmit: handleSubmitTercerPasoEntrega99,
    // formState: formStateTercerFormulario,
    setValue: setValueTercerFormularioEntrega99,
    reset: resetTercerPasoEntrega99,
  } = useForm();

  // ? ----- controles para el manejo del modal de metadatos de la entrega 99 -----

  const {
    control: controlManejoMetadatosModal,
    handleSubmit: handleSubmitManejoMetadatosModal,
    // formState: formState_manejo_metadatos_modal,
    setValue: setValueManejoMetadatosModal,
    reset: resetManejoMetadatosModal,
    watch: watchManejoMetadatosModal,
  } = useForm();

  //
  const watchExeManejoModalMetadatos = watchManejoMetadatosModal();

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

    // ? Segundo paso
    controlSegundoPasoEntrega99,
    handleSubmitSegundoPasoEntrega99,
    setValueSegundoFormularioEntrega99,
    resetSegundoFormularioEntrega99,

    // ? Tercer paso
    controlTercerPasoEntrega99,
    handleSubmitTercerPasoEntrega99,
    setValueTercerFormularioEntrega99,
    resetTercerPasoEntrega99,

    // ? Manejo del modal de metadatos
    controlManejoMetadatosModal,
    handleSubmitManejoMetadatosModal,
    setValueManejoMetadatosModal,
    resetManejoMetadatosModal,
    watchExeManejoModalMetadatos,
  };
};
