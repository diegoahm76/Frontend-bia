/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { AccionesFinalModulo } from '../../../../../../../utils/AccionesFinalModulo/Atom/AccionesFinalModulo';
import { LoadingButton } from '@mui/lab';
import Swal from 'sweetalert2';
import { resetItems } from '../../toolkit/slice/AsignacionUsuarioSlice';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { useStepperContext } from '@mui/material';
import { useSstepperFn } from '../../hook/useSstepperFn';

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

  //* handleSumbit

  const sendDataByFormData = async () => {
    try {
      console.log('anexosCreados', anexosCreados);
      console.log('anexosCreados', anexosCreados);
      const formData = {}; // Use a normal object instead of FormData
  
      formData.solicitud_usu_PQRSDF = JSON.stringify({"asunto":"hola","descripcion":"prueba dado","id_pqrsdf":9});
  
      anexosCreados.map((anexo: any, index: number) => {
        if (anexo?.ruta_soporte) {
          formData['archivo' + index] = anexo.ruta_soporte;
        }
  
        formData['anexo' + index] = JSON.stringify({
          nombre_anexo: anexo?.nombre_archivo,
          numero_folios: anexo?.numero_folios,
          cod_medio_almacenamiento: anexo?.cod_medio_almacenamiento,
          orden_anexo_doc: index + 1,
          meta_data: {
            tiene_replica_fisica: anexo?.tiene_replica_fisica?.value,
            cod_origen_archivo: anexo?.cod_origen_archivo?.value,
            nombre_original_archivo: 'Archivo', // ? se debe cambiar por el nombre del archivo que se suba en el input 'archivo'
            descripcion: anexo?.descripcionMetadatos,
            asunto: anexo?.asuntoMetadatos,
            cod_categoria_archivo: anexo?.cod_categoria_archivo?.value,
            nro_folios_documento: anexo?.numero_folios,
            id_tipologia_doc: anexo?.tipologiasDocumentalesMetadatos?.value,
            tipologia_no_creada_TRD: anexo?.cualTipologiaDocumentalMetadatos,
            palabras_clave_doc: anexo?.meta_data?.palabras_clave_doc.join('|'),
          },
        });
      });
  
      console.log('formData', formData);
     /* const formData = new FormData();
      formData.append('solicitud_usu_PQRSDF', JSON.stringify({"asunto":"hola","descripcion":"prueba dado","id_pqrsdf":9}));

      
      anexosCreados.map((anexo: any) => {
        if (anexo?.ruta_soporte) {
          formData.append('archivo', anexo.ruta_soporte);
        }
      });
        anexosCreados.map((anexo: any, index: number) => {
          formData.append('anexo', JSON.stringify({
            nombre_anexo: anexo?.nombre_archivo,
            numero_folios: anexo?.numero_folios,
            cod_medio_almacenamiento: anexo?.cod_medio_almacenamiento,
            orden_anexo_doc: index + 1,
            meta_data: {
              tiene_replica_fisica: anexo?.tiene_replica_fisica?.value,
              cod_origen_archivo: anexo?.cod_origen_archivo?.value,
              nombre_original_archivo: 'Archivo', // ? se debe cambiar por el nombre del archivo que se suba en el input 'archivo'
              descripcion: anexo?.descripcionMetadatos,
              asunto: anexo?.asuntoMetadatos,
              cod_categoria_archivo: anexo?.cod_categoria_archivo?.value,
              nro_folios_documento: anexo?.numero_folios,
              id_tipologia_doc: anexo?.tipologiasDocumentalesMetadatos?.value,
              tipologia_no_creada_TRD: anexo?.cualTipologiaDocumentalMetadatos,
              palabras_clave_doc: anexo?.meta_data?.palabras_clave_doc.join('|'),
            },
          }));

          console.log('formData', formData);
        });*/
    } catch (err) {}
  };

  const handleSubmit = async () => {
    setLoadingButton(true);
    await Swal.fire({
      title: '¿Está seguro de enviar la solicitud al usuario?',
      text: 'Una vez enviada la solicitud no podrá realizar cambios',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const secondResult = await Swal.fire({
          title: 'Advertencia',
          text: 'Una vez enviada la solicitud no podrá realizar cambios',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Enviar',
          cancelButtonText: 'Cancelar',
        });

        if (secondResult.isConfirmed) {
          //* se debe activar el envío de la solicitud al usuario y luego el swal y el mensaje de success
          setLoadingButton(false);
          Swal.fire({
            title: 'Solicitud enviada',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          setLoadingButton(false);
          Swal.fire({
            title: 'Solicitud cancelada',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        setLoadingButton(false);
        Swal.fire({
          title: 'Solicitud cancelada',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setLoadingButton(false);
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
      handleSubmit={sendDataByFormData}
      reset_states={reset}
    />
  );
};
