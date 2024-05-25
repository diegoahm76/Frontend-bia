/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { AccionesFinalModulo } from '../../../../../../../utils/AccionesFinalModulo/Atom/AccionesFinalModulo';
import { LoadingButton } from '@mui/lab';
import Swal from 'sweetalert2';
import { resetItems } from '../../toolkit/slice/AsignacionUsuarioSlice';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { useStepperContext } from '@mui/material';
import { useSstepperFn } from '../../hook/useSstepperFn';
import { postAsignacionUsuario } from '../../toolkit/thunks/postAsignacionUsuario.service';

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

  const { handleReset } = useSstepperFn();

  const [LoadingButton, setLoadingButton] = useState(false);

  const { anexosCreados } = useAppSelector(
    (state) => state.AsignacionUsuarioSlice
  );
  const { currentElementPqrsdComplementoTramitesYotros } = useAppSelector(
    (state: any) => state.PanelVentanillaSlice
  );

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
    const formData = new FormData(); // Use FormData instead of a normal object
    //  console.log('')(anexosCreados);
    formData.append(
      'solicitud_usu_PQRSDF',
      JSON.stringify({
        asunto: anexosCreados[0]?.asunto,
        descripcion: anexosCreados[0]?.descripcion_de_la_solicitud,
        id_pqrsdf: currentElementPqrsdComplementoTramitesYotros?.id_PQRSDF,
      })
    );

    sortedAnexos.forEach((anexo: any, index: number) => {
      console.log('anexo', anexo);

      if (anexo?.ruta_soporte) {
        formData.append('archivo', anexo.ruta_soporte); // Use append method to add multiple values with the same field name
      }
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
            cod_origen_archivo: anexo?.origenArchivoMetadatos?.value.toUpperCase(),
            nombre_original_archivo: 'Archivo', // ? se debe cambiar por el nombre del archivo que se suba en el input 'archivo'
            descripcion: anexo?.descripcionMetadatos,
            asunto: anexo?.asuntoMetadatos,
            cod_categoria_archivo: anexo?.categoriaArchivoMetadatos?.value.toUpperCase(),
            nro_folios_documento: anexo?.numero_folios,
            id_tipologia_doc: anexo?.tipologiasDocumentalesMetadatos?.value
              ? anexo?.tipologiasDocumentalesMetadatos?.value
              : null,
            tipologia_no_creada_TRD: anexo?.cualTipologiaDocumentalMetadatos
              ? anexo?.cualTipologiaDocumentalMetadatos
              : null,
            palabras_clave_doc: anexo?.palabrasClavesMetadatos.join('|'),
          },
        })
      );
    });

    postAsignacionUsuario(formData, setLoadingButton).then(() => {
      handleReset();
      resetFormulario({});
      setInfoReset({});
      dispatch(resetItems());

    
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

    await Swal.fire({
      title: '¿Está seguro de enviar la solicitud al usuario?',
      text: 'Una vez enviada la solicitud no podrá realizar cambios',
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
