/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from '@mui/material';
import { useContext, type FC } from 'react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';
import { Loader } from '../../../../../../../../utils/Loader/Loader';
import { stylesGrid } from './../../../../../../permisosSeriesDoc/utils/styles';
import { useControlClasificacionExp } from '../../../../../hook/useControlClasificacionExp';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';
import { containerStyles } from './../../../../../../tca/screens/utils/constants/constants';

export const SeleccionSerieSubserie: FC<any> = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  // ! states from redux
  const { currentUnidadOrganizacional } = useAppSelector(
    (state) => state.ctrlAccesoExpSlice
  );

  // ? context necesarios
  const { isLoadingSerieSubserie } = useContext(ModalAndLoadingContext);

  //* usePSD
  const { control_seleccionar_seccion_control } = useControlClasificacionExp();

  //! se debe realizar la validación, si no hay series que mostrar el respecivo elemento no debe aparecer en la pantalla

  if (!currentUnidadOrganizacional) return <></>;

  if (isLoadingSerieSubserie) {
    return (
      <Grid
      container
      sx={{
        ...containerStyles,
        boxShadow: 'none',
        background: 'none',
        position: 'static',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Loader altura={50} />
    </Grid>
    );
  }

  return (
    <>
      <Grid
        item
        xs={12}
        sm={7}
        sx={{
          ...stylesGrid,
          mt: '10px',
          mb: '10px',
          zIndex: 2
        }}
      >
        {/* Se realiza la seleccion de la serie subserie respectiva para poder trabajar con ella */}
        <Controller
          name="id_serie_subserie"
          control={control_seleccionar_seccion_control}
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <Select
                value={value}
                onChange={(selectedOption) => {
                  //* se debe modificar el nombre del estado, ya que se debe almacenar la series o subserie que se haya seleccionado
                  // dispatch(setCurrentSerieSubserie(selectedOption.item));
                /*  void get_restricciones_series_documentales(
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
*/

                  onChange(selectedOption);
                }}
                options={
                  []
                 /* [...listSeriesSubseries] // la idea va a ser reemplazarlos por las series - subseries asociadas a la unidad organizacional del ccd
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
                    })) as any */
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
