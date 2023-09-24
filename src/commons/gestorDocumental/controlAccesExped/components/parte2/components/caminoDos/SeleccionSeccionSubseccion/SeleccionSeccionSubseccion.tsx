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
import { setCurrentUnidadOrganizacional, setSeriesSubseriesList } from '../../../../../toolkit/slice/CtrlAccesoExpSlice';
import { getSeriesSubseries } from '../../../../../toolkit/thunks/serieSubserieThunks';

export const SeleccionSeccionSubseccion: FC<any> = (): JSX.Element | null => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* get states from the redux store
  const { moodConfig, unidadesOrganizacionales, currentCcdCtrlAccesoExp } = useAppSelector((state) => state.ctrlAccesoExpSlice);
  // ? context necesarios
  const { isLoadingSeccionSub,
    handleSerieSubserie, } = useContext(ModalAndLoadingContext);
  // * use control clasificacion exp
  const { seleccionar_serie_subserie_control } = useControlClasificacionExp();

  if(moodConfig?.value !== 2) return null;

 if (isLoadingSeccionSub) {
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
          zIndex: 5
        }}
      >
        {/* En esta seleccion quiero tomar la seccion o subseccion asociada al ccd para realizar la respectiva busqueda de la serie - subserie respectivamente asociada */}
        <Controller
          name="id_unidad_organizacional"
          control={seleccionar_serie_subserie_control}
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <Select
                value={value}
                onChange={(selectedOption) => {
                  dispatch(setCurrentUnidadOrganizacional(selectedOption?.item));

                  // ! se deberán traer las series y subseries asociadas a la unidad organizacional seleccionada y tamnbién se debe seleccionar la unidad organizacional current
                  void getSeriesSubseries({
                    idUnidadOrganizacional: selectedOption?.item?.id_unidad_organizacional,
                    idCcd: currentCcdCtrlAccesoExp?.id_ccd,
                    setLoadingSeriesSubseries: handleSerieSubserie
                  }).then((_res) => {
                    dispatch(setSeriesSubseriesList(_res));
                  });
              /*
              dispatch(setListaSeriesSubseries([]));
                  dispatch(setCurrentSerieSubserie(null));

                  dispatch(set_restricciones_para_todas_las_unidades_organizacionales_action(null));
                  dispatch(set_restricciones_para_unidades_diferentes_al_a_seccion_o_subseccion_actual_responsable_action(null));
                  dispatch(set_permisos_unidades_actuales_action([]));
                  dispatch(set_permisos_unidades_actuales_externas_action([]));

                   */

                  //* tambien debo seleccionar alguna sección o subsección (unidad organizacional) con la que se va a trabajar, esta es consecuencia servirá para mostrar el respectivo select de las series - subseries necesarias
                  onChange(selectedOption);
                }}
                options={
                 [...unidadesOrganizacionales]
                    .sort((a, b) => a.nombre.localeCompare(b.nombre))
                    .map((item) => ({
                      item,
                      value: item.id_unidad_organizacional,
                      label: `${item.codigo} - ${item.nombre}`
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
                  Sección o subsección (unidad organizacional)
                </small>
              </label>
            </div>
          )}
        />
      </Grid>
    </>
  );
};
