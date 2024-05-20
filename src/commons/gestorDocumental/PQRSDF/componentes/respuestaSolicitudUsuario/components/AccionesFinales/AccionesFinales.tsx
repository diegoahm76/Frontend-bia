/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { AccionesFinalModulo } from '../../../../../../../utils/AccionesFinalModulo/Atom/AccionesFinalModulo';
// import { LoadingButton } from '@mui/lab';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
// import { useStepperContext } from '@mui/material';
import { postResponderUsuario } from '../../toolkit/thunks/postAsignacionUsuario.service';
import { useStepperResSolicitudUsuario } from '../../hook/useStepperResSolicitudUsuario';
import { resetItems } from '../../toolkit/slice/ResSolicitudUsarioSlice';
import { AuthSlice } from '../../../../../../auth/interfaces';
import { showAlert } from '../../../../../../../utils/showAlert/ShowAlert';

export const AccionesFinales = ({
  // controlFormulario,
  // handleSubmitFormulario,
  // errorsFormulario,
  resetFormulario,
  watchFormulario,
  setInfoReset,
}: any): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* context

  const { handleReset } = useStepperResSolicitudUsuario();

  const [LoadingButton, setLoadingButton] = useState(false);

  const { anexosCreados } = useAppSelector(
    (state) => state.ResSolicitudUsarioSlice
  );

  const { userinfo } = useAppSelector((state: AuthSlice) => state.auth);

  const { currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas } =
    useAppSelector((state: any) => state.BandejaTareasSlice);
  console.log('anexosCreados', anexosCreados);
  //* handleSumbit
// console.log(currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas.id_tarea_asignada)
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
    const formData = new FormData();

    anexosCreados.forEach((anexo: any) => {
      console.log('anexo', anexo);

      if (anexo?.ruta_soporte) {
        formData.append(
          `archivo-create-${anexo.nombre_archivo}`,
          anexo.ruta_soporte
        );
      }
    });

    formData.append(
      'isCreateForWeb',
      userinfo?.tipo_usuario === 'I' ? 'False' : 'True'
    ); //? detectar si el usuario logueado es interno o externo
    formData.append(
      'respuesta_pqrsdf',
      JSON.stringify({
        id_pqrsdf:
          +currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas.id_pqrsdf,
        asunto: watchFormulario.asunto,
        id_tarea_asignada:currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.id_tarea_asignada,
        descripcion: watchFormulario.descripcion_de_la_solicitud,
        cantidad_anexos: +sortedAnexos.length,
        nro_folios_totales: +sortedAnexos.reduce(
          (acc: number, anexo: any) => acc + anexo.numero_folios,
          0
        ),
        anexos: sortedAnexos.map((anexo, index) => ({
          nombre_anexo: anexo.nombre_archivo,
          orden_anexo_doc: +index,
          cod_medio_almacenamiento: 'Pa',
          medio_almacenamiento_otros_Cual: null,
          numero_folios: +sortedAnexos.reduce(
            (acc: number, anexo: any) => acc + anexo.numero_folios,
            0
          ),
          ya_digitalizado: true,
          metadatos: {
            asunto: anexo.asunto,
            descripcion: anexo.descripcionMetadatos,
            cod_categoria_archivo:
              anexo.categoriaArchivoMetadatos?.value || null,
            tiene_replica_fisica:
              anexo.tieneReplicaFisicaMetadatos?.value === 'Si',
            cod_origen_archivo: anexo.origenArchivoMetadatos?.value || null,
            id_tipologia_doc:
              +anexo.tipologiasDocumentalesMetadatos?.value || null,
            tipologia_no_creada_TRD: null,
            palabras_clave_doc: (
              (anexo && anexo.palabrasClavesMetadatos) ||
              []
            ).join('|'),
          },
        })),
      })
    );

    postResponderUsuario(formData, setLoadingButton)
      .then(() => {
        handleReset();
        resetFormulario({});
        setInfoReset({});
        dispatch(resetItems());
      })
      .catch((error) => {
        console.error('Error:', error);
        // Aquí puedes manejar el error como prefieras, por ejemplo mostrando un mensaje al usuario
      });
  };

  const handleSubmit = async () => {
    if (
      currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.estado_tarea ===
      'Respondida por el propietario de la bandeja de tareas'
    ) {
      showAlert('Opss!', 'Esta PQRSDF ya ha sido respondida', 'warning');
      return;
    }

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
      title: '¿Está seguro de responder la PQRSDF?',
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
