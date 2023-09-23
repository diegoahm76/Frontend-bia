/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react'
import { stylesGrid } from './../../../../../../permisosSeriesDoc/utils/styles';
import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';
import { setTipoDeClasificacion, set_mood_module } from '../../../../../toolkit/slice/CtrlAccesoExpSlice';
import { optionsSelect } from './utils/choices';

export const Clasificacion = (): JSX.Element | null => {
  //* get states from the redux store
  const { tipoDeClasificacion, moodConfig } = useAppSelector((state) => state.ctrlAccesoExpSlice);
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
    dispatch(setTipoDeClasificacion(selectedOption));
  };

  if(moodConfig?.value !== 1) return null;

  return (
    <>
    <Grid
      item
      xs={12}
      sm={6.5}
      sx={{
        ...stylesGrid,
        mt: '10px',
        mb: '10px',
        zIndex: 5
      }}
    >
   {/*   <Controller
        name="id_unidad_organizacional"
        control={control_seleccionar_seccion_control}
        rules={{ required: true }}
        render={({ field: { onChange, value }, fieldState: { error } }) => ( */}
          <div>
            <Select
              value={tipoDeClasificacion}
              onChange={(selectedOption: any) => {
             /*  dispatch(setListaSeriesSubseries([]));
                dispatch(setCurrentSerieSubserie(null));
                dispatch(set_restricciones_para_todas_las_unidades_organizacionales_action(null));
                dispatch(set_restricciones_para_unidades_diferentes_al_a_seccion_o_subseccion_actual_responsable_action(null));
                dispatch(set_permisos_unidades_actuales_action([]));
                dispatch(set_permisos_unidades_actuales_externas_action([]));
                dispatch(
                  set_current_unidad_organizacional_action(
                    selectedOption?.item
                  )
                );
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
              options={optionsSelect as any}
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
                Tipo de clasificación
              </small>
            </label>
          </div>
      {/*  )}
      /> */}
    </Grid>
  </>
  )
}
