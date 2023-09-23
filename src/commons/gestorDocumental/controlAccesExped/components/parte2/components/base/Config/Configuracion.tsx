/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react'
import { stylesGrid } from './../../../../../../permisosSeriesDoc/utils/styles';
import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';
import { set_mood_module } from '../../../../../toolkit/slice/CtrlAccesoExpSlice';
import { optionsSelectConfiguracion } from '../utils/choices';

{/* bajo la decisión que se tome en este componente se procede a realizar el proceso necesario, dependiendo si se elige la opción # 1 o la opción # 2 */}
export const ConfiguracionInicial = (): JSX.Element | null => {
  //* get states from the redux store
  const { moodConfig } = useAppSelector((state) => state.ctrlAccesoExpSlice);
  //*dispatch declarations
    const dispatch = useAppDispatch();

  const handleChange = (selectedOption: any) => {
    console.log(selectedOption)
    dispatch(set_mood_module(selectedOption));

    //* if selected option . value = 2, se debe hacer la petición http al servidor para obtener las unidades organizacionales asociadas a ese organigrama y en consecuencia las series documentales asociadas a esa unidad organizacional luego de seleccionar la respectiva unidad organizacional
    if(selectedOption?.value === 1){
      console.log('getting directly control de acceso de expedientes')
    }

    if(selectedOption?.value === 2){
      console.log('getting unidades organizacionales, then get series documentales, then get control de acceso de expedientes')
    }
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
          <div>
            <Select
              value={moodConfig}
              onChange={(selectedOption: any) => {
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
    </Grid>
  </>
  )
}
