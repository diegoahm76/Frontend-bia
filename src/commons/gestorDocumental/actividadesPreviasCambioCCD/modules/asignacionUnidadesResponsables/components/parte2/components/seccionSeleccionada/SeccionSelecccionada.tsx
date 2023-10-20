/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from '@mui/material';
import { stylesGrid } from '../../../../../../../permisosSeriesDoc/utils/styles';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { useAsignacionesResp } from '../../../../hook/useAsignacionesResp';
import { Title } from '../../../../../../../../../components';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../../hooks';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import { useContext, useEffect } from 'react';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';
import { containerStyles } from './../../../../../../../tca/screens/utils/constants/constants';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  setCurrentUnidadAsociada,
  setListadoDeAsignaciones,
} from '../../../../toolkit/slice/types/AsignacionUniResp';
import { control_warning } from '../../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
export const SeccionSelecccionada = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* hooks
  const { control_asignaciones_resp, reset_asignaciones_resp } =
    useAsignacionesResp();

  const {
    seriesSeccionSeleccionadaSinResponsable,
    unidadCcdAsociado,
    currentUnidadAsociada,
    listadoDeAsignaciones,
  } = useAppSelector((state) => state.AsigUniRespSlice);

  // ? ---- context declaration ----
  const { thirdLoading } = useContext(ModalAndLoadingContext);

  // ? useeffect para cargar el elemento seleccionado
  useEffect(() => {
    if (currentUnidadAsociada) {
      console.log('unidas responsable seleccionada para edicion');
      console.log(currentUnidadAsociada);
      const elementFounded = listadoDeAsignaciones?.find(
        (element) =>
          element?.id_unidad_seccion_nueva ===
          currentUnidadAsociada?.id_unidad_seccion_nueva
      );
      reset_asignaciones_resp({
        unidad_organizacional: {
          id_unidad_seccion_nueva:
            elementFounded?.id_unidad_organizacional ||
            elementFounded?.id_unidad_seccion_nueva,
          label: elementFounded?.nom_unidad_nueva,
          value: elementFounded?.id_unidad_seccion_nueva,
        },
      });
    }
  }, [currentUnidadAsociada]);

  if (!seriesSeccionSeleccionadaSinResponsable?.coincidencias?.length)
    return <></>;
  {
    /* también se debe establecer la validación de la carga del componente para el loader */
  }

  return (
    <>
      <Title title="Selección de sección" />
      <Grid
        item
        xs={12}
        sm={5}
        sx={{
          ...stylesGrid,
          zIndex: 5,
          mt: '4rem',
        }}
      >
        <TextField
          fullWidth
          label="Sección seleccionada"
          size="small"
          variant="outlined"
          disabled={true}
          value={
            `${seriesSeccionSeleccionadaSinResponsable?.seccionSeleccionada?.nombre} - ${seriesSeccionSeleccionadaSinResponsable?.seccionSeleccionada?.codigo}` ||
            ''
          }
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      {/* se le debe establecer el loader de la peticiones de las unidades organizacionales relaciadas al ccd */}

      {thirdLoading ? (
        <>
          <Grid
            container
            sx={{
              ...containerStyles,
              boxShadow: 'none',
              background: 'none',
              position: 'static',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Loader altura={150} />
          </Grid>
        </>
      ) : (
        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            ...stylesGrid,
            textAlign: 'center',
            zIndex: 5,
          }}
        >
          <Controller
            name="unidad_organizacional"
            control={control_asignaciones_resp}
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div>
                <Select
                  value={value}
                  onChange={(selectedOption) => {
                    console.log(selectedOption);
                    onChange(selectedOption);
                    // dispatch(setCurrentUnidadAsociada(selectedOption));
                  }}
                  options={
                    unidadCcdAsociado.map((unidad: any) => ({
                      ...unidad,
                      label: unidad?.nombre,
                      value: unidad?.id_unidad_organizacional,
                    })) as any[]
                  }
                  placeholder="Seleccionar"
                />
                <label>
                  <small
                    style={{
                      color: 'rgba(0, 0, 0, 0.6)',
                      fontWeight: 'thin',
                      fontSize: '0.75rem',
                      marginTop: '0.25rem',
                      marginLeft: '0.25rem',
                    }}
                  >
                    Sección de nuevo CCD responsable
                  </small>
                </label>
              </div>
            )}
          />

          <Button
            color="primary"
            variant="contained"
            sx={{
              mt: '1.5rem',
            }}
            endIcon={<CheckCircleIcon />}
            onClick={() => {
              const isDuplicate = listadoDeAsignaciones?.some(
                (element) =>
                  element?.id_unidad_seccion_nueva ===
                  control_asignaciones_resp._formValues?.unidad_organizacional
                    ?.id_unidad_seccion_nueva
              );
              console.log(isDuplicate);
              console.log(control_asignaciones_resp._formValues);

              if (isDuplicate) {
                control_warning(
                  'El elemento ya se encuentra en la lista, porfavor seleccione otro o elimine el elemento de la lista'
                );
                // o enviar una notificación con react-toastify u otra biblioteca similar
              } else {
                const elementToAddWithValidation = listadoDeAsignaciones
                  ?.concat({
                    ...{
                      cod_unidad_actual:
                        seriesSeccionSeleccionadaSinResponsable
                          ?.seccionSeleccionada?.codigo,
                      cod_unidad_nueva:
                        control_asignaciones_resp._formValues
                          ?.unidad_organizacional?.value,
                      id_unidad_seccion_nueva:
                        control_asignaciones_resp._formValues
                          ?.unidad_organizacional?.value,
                      nom_unidad_actual:
                        seriesSeccionSeleccionadaSinResponsable
                          ?.seccionSeleccionada?.nombre,
                      nom_unidad_nueva:
                        control_asignaciones_resp._formValues
                          ?.unidad_organizacional?.label,
                    },
                  })
                  ?.filter(
                    (element, index, self) =>
                      index ===
                      self?.findIndex(
                        (t) =>
                          t?.id_unidad_seccion_nueva ===
                          element?.id_unidad_seccion_nueva
                      )
                  );
                dispatch(setListadoDeAsignaciones(elementToAddWithValidation));
              }
            }}
          >
            ACEPTAR
          </Button>
        </Grid>
      )}
    </>
  );
};
