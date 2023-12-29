/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { AccionesFinalModulo } from '../../../../../../../utils/AccionesFinalModulo/Atom/AccionesFinalModulo';
import { LoadingButton } from '@mui/lab';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { useStepperContext } from '@mui/material';
import {  postResponderUsuario } from '../../toolkit/thunks/postAsignacionUsuario.service';
import { useStepperResSolicitudUsuario } from '../../hook/useStepperResSolicitudUsuario';
import { resetItems } from '../../toolkit/slice/ResSolicitudUsarioSlice';

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

  const nombres =["danna","valentino"];

  const { handleReset } = useStepperResSolicitudUsuario();

  const [LoadingButton, setLoadingButton] = useState(false);

  const { anexosCreados } = useAppSelector(
    (state) => state.ResSolicitudUsarioSlice
  );
  const { currentElementPqrsdComplementoTramitesYotros } = useAppSelector(
    (state: any) => state.PanelVentanillaSlice
  );
  console.log('anexosCreados', anexosCreados);
  //* handleSumbit

  const sendDataByFormData = () => {
    const formData = new FormData();

    anexosCreados.forEach((anexo: any) => {
      console.log('anexo', anexo);

      if (anexo?.ruta_soporte) {
        formData.append(
          `archivo-create-${anexo.nombre_archivo}`,
          anexo.ruta_soporte
        ); // Use append method to add multiple values with the same field name
      }
    });
    //* 
    formData.append('isCreateForWeb', 'False');
    formData.append(
      'respuesta_pqrsdf',
      JSON.stringify({
        id_pqrsdf: 154,
        asunto: 'Prueba',
        descripcion: 'Prueba 1',
        cantidad_anexos: 1,
        nro_folios_totales: 1,
        anexos: anexosCreados.map((anexo, index) => ({
          nombre_anexo: anexo.nombre_archivo,
          orden_anexo_doc: index,
          cod_medio_almacenamiento: 'Pa',
          medio_almacenamiento_otros_Cual: null,
          numero_folios: 0, // Modifica según tus necesidades
          ya_digitalizado: true,
          metadatos: {
            asunto: anexo.asunto,
            descripcion: anexo.descripcionMetadatos,
            cod_categoria_archivo: anexo.categoriaArchivoMetadatos?.value || null,
            tiene_replica_fisica: anexo.tieneReplicaFisicaMetadatos?.value === 'Si',
            cod_origen_archivo: anexo.origenArchivoMetadatos?.value || null,
            id_tipologia_doc: anexo.tipologiasDocumentalesMetadatos?.value || null,
            palabras_clave_doc: anexo.palabrasClavesMetadatos ? anexo.palabrasClavesMetadatos.join('|') : null,
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
