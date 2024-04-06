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
import { useContext, useEffect, useState } from 'react';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';
import { containerStyles } from './../../../../../../../tca/screens/utils/constants/constants';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  setCurrentUnidadAsociada,
  setListadoDeAsignaciones,
} from '../../../../toolkit/slice/types/AsignacionUniResp';
import { control_warning } from '../../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { control_success } from '../../../../../../../../../helpers';
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

  // ? useStates necesarios
  const [form, setForm] = useState<any>();

  // ? useeffect para cargar el elemento seleccionado
  useEffect(() => {
    //  console.log('')('unidas responsable seleccionada para edicion');
    //  console.log('')(currentUnidadAsociada);
    const elementFounded = listadoDeAsignaciones?.find(
      (element) =>
        element?.id_unidad_seccion_actual ===
        currentUnidadAsociada?.id_unidad_seccion_actual
    );
    //  console.log('')(elementFounded);
    reset_asignaciones_resp({
      unidad_organizacional: {
        codigo: elementFounded?.cod_unidad_nueva,
        id_unidad_seccion_actual:
          elementFounded?.id_unidad_organizacional ||
          elementFounded?.id_unidad_seccion_actual,
        id_unidad_seccion_nueva:
          elementFounded?.id_unidad_organizacional ||
          elementFounded?.id_unidad_seccion_nueva,
        label: elementFounded?.nom_unidad_nueva,
        value: elementFounded?.id_unidad_seccion_nueva,
        nom_unidad_actual: elementFounded?.nom_unidad_actual,
        cod_unidad_actual: elementFounded?.cod_unidad_actual,
      },
    });
    // setForm(elementFounded);
  }, [currentUnidadAsociada, setCurrentUnidadAsociada, dispatch]);

  // ? handle add or edit element, se debe revisar la operación de edición y la validacion de agregar el elemento , ya que la creación de datos y la edición de datos formar conjuntos de datos diferentes

  const addAsignacion = () => {
    const { seccionSeleccionada } = seriesSeccionSeleccionadaSinResponsable;
    const { _formValues } = control_asignaciones_resp;
    const { unidad_organizacional } = _formValues || {};
    const {
      codigo: cod_unidad_nueva,
      value: id_unidad_seccion_nueva,
      label: nom_unidad_nueva,
    } = unidad_organizacional || {};
    const {
      id_unidad_organizacional,
      codigo: cod_unidad_actual,
      nombre: nom_unidad_actual,
      id_unidad_seccion_actual,
    } = seccionSeleccionada || {};

    //  console.log('')(seccionSeleccionada)
    if (!id_unidad_seccion_nueva)
      return control_warning('El campo de selección no puede estar vacío');

    /* if (!seccionSeleccionada?.nom_unidad_actual)
      return control_warning('debe seleccionar una unidad para proceder');*/

    if (currentUnidadAsociada) {
      const elementToAddWithValidation = listadoDeAsignaciones
        ?.map((element) =>
          element.id_unidad_seccion_actual ===
          currentUnidadAsociada?.id_unidad_seccion_actual
            ? {
                ...element,
                cod_unidad_nueva,
                id_unidad_seccion_nueva,
                nom_unidad_nueva,
              }
            : element
        )
        ?.filter(
          (element, index, self) =>
            index ===
            self?.findIndex(
              (t) =>
                t?.id_unidad_seccion_actual ===
                element?.id_unidad_seccion_actual
            )
        );
      dispatch(setListadoDeAsignaciones(elementToAddWithValidation));
      dispatch(setCurrentUnidadAsociada(null));
      reset_asignaciones_resp({
        unidad_organizacional: {},
      });
      control_success('se ha editado el elemento de manera correcta');
      return;
    }

    const isDuplicate = Array.isArray(listadoDeAsignaciones)
      ? listadoDeAsignaciones.some((element) => {
          const id_unidad_seccion_actual = element?.id_unidad_seccion_actual;
          return (
            id_unidad_seccion_actual &&
            (id_unidad_seccion_actual === id_unidad_organizacional ||
              id_unidad_seccion_actual ===
                currentUnidadAsociada?.id_unidad_seccion_actual ||
              seccionSeleccionada?.id_unidad_seccion_actual)
          );
        })
      : false;

    if (isDuplicate) {
      control_warning(
        'Una unidad actual no puede tener más de una unidad nueva asignada (responsable)'
      );
      // o enviar una notificación con react-toastify u otra biblioteca similar
    } else {
      //  console.log('')(form);
      const elementToAddWithValidation =
        Array.isArray(listadoDeAsignaciones) && listadoDeAsignaciones.length > 0
          ? [
              ...listadoDeAsignaciones,
              {
                cod_unidad_actual:
                  cod_unidad_actual ||
                  seriesSeccionSeleccionadaSinResponsable?.seccionSeleccionada
                    ?.cod_unidad_actual,
                cod_unidad_nueva,
                id_unidad_seccion_nueva,
                id_unidad_seccion_actual: id_unidad_organizacional,
                nom_unidad_actual:
                  nom_unidad_actual ||
                  seriesSeccionSeleccionadaSinResponsable?.seccionSeleccionada
                    ?.nom_unidad_actual,
                nom_unidad_nueva,
              },
            ].filter(
              (element, index, self) =>
                index ===
                self?.findIndex(
                  (t) =>
                    t?.id_unidad_seccion_actual ===
                    element?.id_unidad_seccion_actual
                )
            )
          : [
              {
                cod_unidad_actual,
                cod_unidad_nueva,
                id_unidad_seccion_nueva,
                id_unidad_seccion_actual: id_unidad_organizacional,
                nom_unidad_actual,
                nom_unidad_nueva,
              },
            ];
      dispatch(setListadoDeAsignaciones(elementToAddWithValidation));
    }
  };

  /* if (!seriesSeccionSeleccionadaSinResponsable?.seccionSeleccionada)
    return <></>;
  {
  }*/

  // ? revisar si se debe dejar esta validación en vez de la nueva
  if (!seriesSeccionSeleccionadaSinResponsable?.coincidencias?.length)
    return <></>;
  {
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
            `${
              seriesSeccionSeleccionadaSinResponsable?.seccionSeleccionada
                ?.nombre ||
              seriesSeccionSeleccionadaSinResponsable?.seccionSeleccionada
                ?.nom_unidad_actual
            } - ${
              seriesSeccionSeleccionadaSinResponsable?.seccionSeleccionada
                ?.codigo ||
              seriesSeccionSeleccionadaSinResponsable?.seccionSeleccionada
                ?.cod_unidad_actual
            }` || ''
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
                    //  console.log('')(selectedOption);
                    //  console.log('')(seriesSeccionSeleccionadaSinResponsable);
                    setForm(selectedOption);
                    onChange(selectedOption);
                    // dispatch(setCurrentUnidadAsociada(selectedOption));
                  }}
                  options={
                    unidadCcdAsociado?.map((unidad: any) => ({
                      codigo: unidad.codigo,
                      nom_unidad_actual:
                        seriesSeccionSeleccionadaSinResponsable
                          ?.seccionSeleccionada?.nom_unidad_actual,

                      id_unidad_seccion_actual:
                        seriesSeccionSeleccionadaSinResponsable
                          ?.seccionSeleccionada?.id_unidad_organizacional ||
                        seriesSeccionSeleccionadaSinResponsable
                          ?.seccionSeleccionada?.id_unidad_seccion_actual,
                      id_unidad_seccion_nueva: unidad?.id_unidad_organizacional,
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
                    Sección de nueva unidad responsable
                  </small>
                </label>
              </div>
            )}
          />

          <Button
            color="success"
            variant="contained"
            sx={{
              mt: '1.5rem',
            }}
            endIcon={<CheckCircleIcon />}
            onClick={() => addAsignacion()}
          >
            {currentUnidadAsociada ? 'Editar' : 'Agregar'}
          </Button>
          <Button
            color="primary"
            variant="outlined"
            sx={{
              mt: '1.5rem',
              ml: '1rem',
            }}
            endIcon={<CleanIcon />}
            onClick={() => {
              dispatch(setCurrentUnidadAsociada(null));
              setForm(null);
              reset_asignaciones_resp({
                unidad_organizacional: {
                  codigo: '',
                  id_unidad_seccion_actual: '',
                  id_unidad_seccion_nueva: '',
                  label: '',
                  value: '',
                },
              });
            }}
          >
            limpiar campos
          </Button>
        </Grid>
      )}
    </>
  );
};
