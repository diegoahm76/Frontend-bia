/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from '@mui/material';
import { useContext, type FC } from 'react';
import { stylesGrid } from '../../../../../utils/styles';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { usePSD } from '../../../../../hook/usePSD';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';
import { Loader } from '../../../../../../../../utils/Loader/Loader';
import { ModalContextPSD } from '../../../../../context/ModalContextPSD';
import {
  setCurrentSerieSubserie,
  set_permisos_unidades_actuales_action,
  set_permisos_unidades_actuales_externas_action,
  set_restricciones_para_todas_las_unidades_organizacionales_action,
  set_restricciones_para_unidades_diferentes_al_a_seccion_o_subseccion_actual_responsable_action
} from '../../../../../toolkit/slice/PSDSlice';
import { get_restricciones_series_documentales } from '../../../../../toolkit/thunks/thunksPartThree';
import {
  GET_PERMISOS_UNIDADES_EXTERNAS_SECCION_RESPONSABLE,
  GET_PERMISOS_UNIDADES_ORGANIZACIONALES_ACTUALES_SECCION_RESPONSABLE
} from '../../../../../toolkit/thunks/psdThunks';

export const SeleccionSerieSubserie: FC<any> = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  // ! states from redux
  const { current_unidad_organizacional, listSeriesSubseries } = useAppSelector(
    (state) => state.PsdSlice
  );

  // ? context necesarios
  const { loadingSeriesSubseries, setLoadingRestricciones } =
    useContext(ModalContextPSD);

  //* usePSD
  const { seleccionar_serie_subserie_control } = usePSD();

  //! se debe realizar la validación, si no hay series que mostrar el respecivo elemento no debe aparecer en la pantalla

  if (!current_unidad_organizacional) return <></>;

  if (loadingSeriesSubseries) {
    return (
      <div
        style={{
          marginTop: '3rem',
          marginBottom: '3rem'
        }}
      >
        <Loader altura={50} />
      </div>
    );
  }

  return (
    <>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          ...stylesGrid,
          zIndex: 2
        }}
      >
        {/* En esta seleccion quiero tomar la serie o subserue asociada al  la respectiva unidad org del ccd para iniciar el proceso de asignación de permisos */}
        <Controller
          name="id_serie_subserie"
          control={seleccionar_serie_subserie_control}
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <Select
                value={value}
                onChange={(selectedOption) => {
                  dispatch(setCurrentSerieSubserie(selectedOption.item));

                  // ! se deben llamar los servicios de permisos y restricciones
                  // ? permisos para una unidad organizacional
                  // ? permisos para una unidad organizacional externa
                  // ? restricciones (para todas las unidades organizacionales, para una unidad organizacional, para una unidad organizacional externa)
                  void get_restricciones_series_documentales(
                    selectedOption.item.id_cat_serie_und,
                    setLoadingRestricciones
                  ).then((_res) => {
                    dispatch(
                      set_restricciones_para_todas_las_unidades_organizacionales_action(
                        _res.arrayRestriccionesParaTodasLasUnidades
                      )
                    );
                    dispatch(
                      set_restricciones_para_unidades_diferentes_al_a_seccion_o_subseccion_actual_responsable_action(
                        _res.arrayRestriccionesOtros
                      )
                    );
                  });

                  // ? de igual manera al seleccionar la respectiva serie se debe buscar los permisos de las unidades para poder configurarlos
                  void GET_PERMISOS_UNIDADES_ORGANIZACIONALES_ACTUALES_SECCION_RESPONSABLE(
                    selectedOption.item.id_cat_serie_und,
                    setLoadingRestricciones
                  ).then((_res) => {
                    dispatch(set_permisos_unidades_actuales_action(_res));
                  });

                  // ! Unidades organizacionales actuales de la sección responsable

                  void GET_PERMISOS_UNIDADES_EXTERNAS_SECCION_RESPONSABLE(
                    selectedOption.item.id_cat_serie_und,
                    setLoadingRestricciones
                  ).then((_res) => {
                    dispatch(
                      set_permisos_unidades_actuales_externas_action(_res)
                    );
                  });

                  onChange(selectedOption);
                }}
                options={
                  [...listSeriesSubseries] // la idea va a ser reemplazarlos por las series - subseries asociadas a la unidad organizacional del ccd
                    .sort((a, b) =>
                      a.nombre_serie.localeCompare(b.nombre_serie)
                    )
                    .map((item) => ({
                      item,
                      value: item.id_cat_serie_und,
                      label: `${item?.codigo_serie} - ${item?.nombre_serie} / ${
                        item?.codigo_subserie ? item.codigo_subserie : ''
                      }  - ${
                        item?.nombre_subserie ? item?.nombre_subserie : ''
                      } `
                    })) as any
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
                    marginLeft: '0.25rem'
                  }}
                >
                  Serie - subserie (unidad organizacional elegida)
                </small>
              </label>
            </div>
          )}
        />
      </Grid>
    </>
  );
};
