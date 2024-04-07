/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from '@mui/material';
import { useContext, type FC } from 'react';
import { stylesGrid } from '../../../../../utils/styles';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';
// import { ModalContextPSD } from '../../../../../context/ModalContextPSD';
import { Loader } from '../../../../../../../../utils/Loader/Loader';
import { usePSD } from '../../../../../hook/usePSD';
import {
  setCurrentSerieSubserie,
  setListaSeriesSubseries,
  set_current_unidad_organizacional_action,
  set_permisos_unidades_actuales_action,
  set_permisos_unidades_actuales_externas_action,
  set_restricciones_para_todas_las_unidades_organizacionales_action,
  set_restricciones_para_unidades_diferentes_al_a_seccion_o_subseccion_actual_responsable_action
} from '../../../../../toolkit/slice/PSDSlice';
import { ModalContextPSD } from '../../../../../context/ModalContextPSD';
import { get_series_documentales_unidad_organizacional_psd } from '../../../../../toolkit/thunks/psdThunks';

export const SeleccionSeccion: FC<any> = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  // ! states from redux
  const { ccd_current_busqueda, unidadesOrganizacionales } = useAppSelector(
    (state) => state.PsdSlice
  );

  // ? context necesarios
  const { loadingButtonPSD, setloadingSeriesSubseries } =
    useContext(ModalContextPSD);

  // * usePSD
  const { control_seleccionar_seccion_control } = usePSD();

  if (!ccd_current_busqueda) return <></>;

  if (loadingButtonPSD /* unidadesOrganizacionales.length === 0 */) {
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
          zIndex: 5
        }}
      >
        {/* En esta seleccion quiero tomar la seccion o subseccion asociada al ccd para realizar la respectiva busqueda de la serie - subserie respectivamente asociada */}
        <Controller
          name="id_unidad_organizacional"
          control={control_seleccionar_seccion_control}
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <Select
                value={value}
                onChange={(selectedOption) => {
                  // ! se limpia la lista de series y subseries
                  dispatch(setListaSeriesSubseries([]));
                  dispatch(setCurrentSerieSubserie(null));

                  //  ! se limpian las listas de los permisos y de las restricciones
                  dispatch(set_restricciones_para_todas_las_unidades_organizacionales_action(null));
                  dispatch(set_restricciones_para_unidades_diferentes_al_a_seccion_o_subseccion_actual_responsable_action(null));
                  dispatch(set_permisos_unidades_actuales_action([]));
                  dispatch(set_permisos_unidades_actuales_externas_action([]));


                  // ? seleccionando current unidad organizacional para el llamado de serie subserie
                  dispatch(
                    set_current_unidad_organizacional_action(
                      selectedOption?.item
                    )
                  );
                  // ! se deben llamar las respectivas series - subseries que estan asociadas a la unidad organizacional seleccionada y respectivo ccd seleccionado

                  void get_series_documentales_unidad_organizacional_psd(
                    selectedOption?.item?.id_unidad_organizacional,
                    ccd_current_busqueda?.id_ccd,
                    setloadingSeriesSubseries
                  ).then((res) => {
                    //  console.log('')(res);
                    dispatch(setListaSeriesSubseries(res));
                  });

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
