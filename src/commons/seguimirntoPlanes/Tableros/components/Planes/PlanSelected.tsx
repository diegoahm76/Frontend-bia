/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { Grid, MenuItem, TextField } from '@mui/material';

import { Title } from '../../../../../components/Title';
import { useContext, useEffect } from 'react';
import { DataContextConsulas } from '../../context/context';
import { Controller } from 'react-hook-form';
import React from 'react';
import { containerStyles } from '../../../../gestorDocumental/tca/screens/utils/constants/constants';
import { useConsultaMetasHook } from '../../hooks/useConsultaMetasHook';
import { tipo_consulta_selected } from '../../choices/selects';

export const PlanSelected: React.FC = () => {
  const { control_consulta_metas, errors_consulta_metas } =
    useConsultaMetasHook();

  const {
    planes_selected,
    id_plan,
    set_tipo_consulta,
    set_id_plan,
    fetch_data_planes_selected,
  } = useContext(DataContextConsulas);

  useEffect(() => {
    console.log('useEffect');
    void fetch_data_planes_selected();
  }, []);

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          ...containerStyles,
          mt: '2.5rem',
          position: 'static',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid item xs={12}>
          <Title title="Consultas seguimiento a planes " />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="id_plan"
            control={control_consulta_metas}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Seleccione un plan"
                size="small"
                margin="dense"
                disabled={false}
                fullWidth
                required
                onChange={(event) => {
                  field.onChange(event);
                  set_id_plan(Number(event.target.value));
                }}
              >
                {planes_selected.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
      </Grid>
      {id_plan ? (
        <>
          <Grid
            container
            spacing={2}
            sx={{
              ...containerStyles,
              mt: '2.5rem',
              position: 'static',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Grid item xs={12} sm={6} md={4}>
              <Controller
                name="tipo_plan"
                control={control_consulta_metas}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Tipo de consulta"
                    size="small"
                    margin="dense"
                    select
                    fullWidth
                    required={true}
                    onChange={(event) => {
                      field.onChange(event);
                      set_tipo_consulta(event.target.value);
                    }}
                  >
                    {tipo_consulta_selected.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
        </>
      ) : null}
    </>
  );
};
