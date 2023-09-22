/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react'
import { stylesGrid } from './../../../../../../permisosSeriesDoc/utils/styles';
import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

{/*  */}
export const ConfiguracionInicial = (): JSX.Element => {
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
      <h1>hello</h1>
      {/* En esta seleccion quiero tomar la seccion o subseccion asociada al ccd para realizar la respectiva busqueda de la serie - subserie respectivamente asociada */}
     {/* <Controller
        name="id_unidad_organizacional"
        control={control_seleccionar_seccion_control}
        rules={{ required: true }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div>
            <Select
              value={value}
              onChange={(selectedOption: any) => {
               dispatch(setListaSeriesSubseries([]));
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
                });
                onChange(selectedOption);
              }}
              options={
                []
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
      /> */}
    </Grid>
  </>
  )
}
