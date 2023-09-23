/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react'
import { stylesGrid } from './../../../../../../permisosSeriesDoc/utils/styles';
import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';
import { set_mood_module } from '../../../../../toolkit/slice/CtrlAccesoExpSlice';
import { optionsSelectConfiguracion } from '../utils/choices';

export const ConfiguracionInicial = (): JSX.Element | null => {
  //* get states from the redux store
  const { moodConfig, currentCcdCtrlAccesoExp } = useAppSelector((state) => state.ctrlAccesoExpSlice);
  //*dispatch declarations
    const dispatch = useAppDispatch();

    //! necesary states for the component
 /* const [selectConfig, setselectConfig] = useState<null | {
    value: string;
    label: string;
  }>(null)
*/
  const handleChange = (selectedOption: any) => {
    console.log(selectedOption)
    dispatch(set_mood_module(selectedOption));
  };

  


  return (
    <>
    <Grid
      item
      xs={12}
      sm={8}
      sx={{
        ...stylesGrid,
        zIndex: 6
      }}
    >
   {/*   <Controller
        name="id_unidad_organizacional"
        control={control_seleccionar_seccion_control}
        rules={{ required: true }}
        render={({ field: { onChange, value }, fieldState: { error } }) => ( */}
          <div>
            <Select
              value={moodConfig}
              onChange={(selectedOption: any) => {
             /*  dispatch(setListaSeriesSubseries([]));
                dispatch(setCurrentSerieSubserie(null));
                dispatch(set_restricciones_para_todas_las_unidades_organizacionales_action(null));
                dispatch(set_restricciones_para_unidades_diferentes_al_a_seccion_o_subseccion_actual_responsable_action(null));
                dispatch(set_permisos_unidades_actuales_action([]));
                dispatch(set_permisos_unidades_actuales_externas_action([]));
                void get_series_documentales_unidad_organizacional_psd(
                  selectedOption?.item?.id_unidad_organizacional,
                  ccd_current_busqueda?.id_ccd,
                  setloadingSeriesSubseries
                ).then((res) => {
                  console.log(res);
                  dispatch(setListaSeriesSubseries(res));
                }); */
                handleChange(selectedOption);
              }}
              options={optionsSelectConfiguracion as any}
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
                Configuración
              </small>
            </label>
          </div>
      {/*  )}
      /> */}
    </Grid>
  </>
  )
}
