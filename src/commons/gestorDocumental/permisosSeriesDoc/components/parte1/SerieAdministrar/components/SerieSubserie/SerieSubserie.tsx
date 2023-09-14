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
import { setCurrentSerieSubserie } from '../../../../../toolkit/slice/PSDSlice';

export const SeleccionSerieSubserie: FC<any> = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  // ! states from redux
  const { current_unidad_organizacional, listSeriesSubseries } = useAppSelector(
    (state) => state.PsdSlice
  );

  // ? context necesarios
  const { loadingSeriesSubseries } = useContext(ModalContextPSD);

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
                  console.log(selectedOption);
                  dispatch(setCurrentSerieSubserie(selectedOption.item));

                  // ! se deben llamar los servicios de permisos y restricciones
                  // ? permisos para una unidad organizacional
                  // ? permisos para una unidad organizacional externa
                  // ? restricciones (para todas las unidades organizacionales, para una unidad organizacional, para una unidad organizacional externa)
                  /* void get_catalogo_TRD_service(selectedOption.value).then(
                    (res) => {
                      console.log(res);
                      dispatch(set_catalog_trd_action(res));
                    }
                  );

                  onChange(selectedOption); */
                }}
                options={
                  [...listSeriesSubseries] // la idea va a ser reemplazarlos por las series - subseries asociadas a la unidad organizacional del ccd
                    .sort((a, b) =>
                      a.nombre_serie.localeCompare(b.nombre_serie)
                    )
                    .map((item) => ({
                      item,
                      /* analizar para seguir con el desarrollo de la aplicación
                      id_cat_serie_und: 12 , id_catalogo_serie: 11 , id_serie_doc: 64 , id_subserie_doc: 8
                      */
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
