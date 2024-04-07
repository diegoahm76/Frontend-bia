/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

import { Title } from '../../../../../components/Title';
import { useContext, useEffect, useState } from 'react';
import { DataContextConsulas } from '../../context/context';
import { Controller } from 'react-hook-form';
import React from 'react';
import { containerStyles } from '../../../../gestorDocumental/tca/screens/utils/constants/constants';
import { useConsultaMetasHook } from '../../hooks/useConsultaMetasHook';
import { tipo_consulta_selected } from '../../choices/selects';
import InfoIcon from '@mui/icons-material/Info';

export const PlanSelected: React.FC = () => {
  const { control_consulta_metas, errors_consulta_metas } =
    useConsultaMetasHook();

  const {
    planes_selected,
    id_plan,
    ver_programas,
    ver_proyectos,
    ver_productos,
    ver_actividades,
    ver_indicadores,
    ver_metas,
    set_ver_programas,
    set_ver_proyectos,
    set_ver_productos,
    set_ver_actividades,
    set_ver_indicadores,
    set_ver_metas,
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
            <Grid
              sx={{
                marginBottom: '10px',
                width: 'auto',
              }}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ver_programas}
                      onChange={(e) => {
                        set_ver_programas(e.target.checked);
                      }}
                      color="primary"
                    />
                  }
                  label={
                    ver_programas ? (
                      <Typography variant="body2">
                        <strong>Mostrar programa</strong>
                        <Tooltip title="SI" placement="right">
                          <InfoIcon
                            sx={{
                              width: '1.2rem',
                              height: '1.2rem',
                              ml: '0.5rem',
                              color: 'green',
                            }}
                          />
                        </Tooltip>
                      </Typography>
                    ) : (
                      <Typography variant="body2">
                        <strong>No mostar programa</strong>
                        <Tooltip title="No" placement="right">
                          <InfoIcon
                            sx={{
                              width: '1.2rem',
                              height: '1.2rem',
                              ml: '0.5rem',
                              color: 'orange',
                            }}
                          />
                        </Tooltip>
                      </Typography>
                    )
                  }
                />
              </FormControl>
            </Grid>
            <Grid
              sx={{
                marginBottom: '10px',
                width: 'auto',
              }}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ver_proyectos}
                      onChange={(e) => {
                        set_ver_proyectos(e.target.checked);
                      }}
                      color="primary"
                    />
                  }
                  label={
                    ver_proyectos ? (
                      <Typography variant="body2">
                        <strong>Mostrar proyecto</strong>
                        <Tooltip title="SI" placement="right">
                          <InfoIcon
                            sx={{
                              width: '1.2rem',
                              height: '1.2rem',
                              ml: '0.5rem',
                              color: 'green',
                            }}
                          />
                        </Tooltip>
                      </Typography>
                    ) : (
                      <Typography variant="body2">
                        <strong>No mostar proyecto</strong>
                        <Tooltip title="No" placement="right">
                          <InfoIcon
                            sx={{
                              width: '1.2rem',
                              height: '1.2rem',
                              ml: '0.5rem',
                              color: 'orange',
                            }}
                          />
                        </Tooltip>
                      </Typography>
                    )
                  }
                />
              </FormControl>
            </Grid>
            <Grid
              sx={{
                marginBottom: '10px',
                width: 'auto',
              }}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ver_productos}
                      onChange={(e) => {
                        set_ver_productos(e.target.checked);
                      }}
                      color="primary"
                    />
                  }
                  label={
                    ver_productos ? (
                      <Typography variant="body2">
                        <strong>Mostrar producto</strong>
                        <Tooltip title="SI" placement="right">
                          <InfoIcon
                            sx={{
                              width: '1.2rem',
                              height: '1.2rem',
                              ml: '0.5rem',
                              color: 'green',
                            }}
                          />
                        </Tooltip>
                      </Typography>
                    ) : (
                      <Typography variant="body2">
                        <strong>No mostar producto</strong>
                        <Tooltip title="No" placement="right">
                          <InfoIcon
                            sx={{
                              width: '1.2rem',
                              height: '1.2rem',
                              ml: '0.5rem',
                              color: 'orange',
                            }}
                          />
                        </Tooltip>
                      </Typography>
                    )
                  }
                />
              </FormControl>
            </Grid>
            <Grid
              sx={{
                marginBottom: '10px',
                width: 'auto',
              }}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ver_actividades}
                      onChange={(e) => {
                        set_ver_actividades(e.target.checked);
                      }}
                      color="primary"
                    />
                  }
                  label={
                    ver_actividades ? (
                      <Typography variant="body2">
                        <strong>Mostrar actividad</strong>
                        <Tooltip title="SI" placement="right">
                          <InfoIcon
                            sx={{
                              width: '1.2rem',
                              height: '1.2rem',
                              ml: '0.5rem',
                              color: 'green',
                            }}
                          />
                        </Tooltip>
                      </Typography>
                    ) : (
                      <Typography variant="body2">
                        <strong>No mostar actividad</strong>
                        <Tooltip title="No" placement="right">
                          <InfoIcon
                            sx={{
                              width: '1.2rem',
                              height: '1.2rem',
                              ml: '0.5rem',
                              color: 'orange',
                            }}
                          />
                        </Tooltip>
                      </Typography>
                    )
                  }
                />
              </FormControl>
            </Grid>
            <Grid
              sx={{
                marginBottom: '10px',
                width: 'auto',
              }}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ver_indicadores}
                      onChange={(e) => {
                        set_ver_indicadores(e.target.checked);
                      }}
                      color="primary"
                    />
                  }
                  label={
                    ver_indicadores ? (
                      <Typography variant="body2">
                        <strong>Mostrar indicador</strong>
                        <Tooltip title="SI" placement="right">
                          <InfoIcon
                            sx={{
                              width: '1.2rem',
                              height: '1.2rem',
                              ml: '0.5rem',
                              color: 'green',
                            }}
                          />
                        </Tooltip>
                      </Typography>
                    ) : (
                      <Typography variant="body2">
                        <strong>No mostar indicador</strong>
                        <Tooltip title="No" placement="right">
                          <InfoIcon
                            sx={{
                              width: '1.2rem',
                              height: '1.2rem',
                              ml: '0.5rem',
                              color: 'orange',
                            }}
                          />
                        </Tooltip>
                      </Typography>
                    )
                  }
                />
              </FormControl>
            </Grid>
            <Grid
              sx={{
                marginBottom: '10px',
                width: 'auto',
              }}
              item
              xs={12}
              sm={6}
              md={4}
            >
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ver_metas}
                      onChange={(e) => {
                        set_ver_metas(e.target.checked);
                      }}
                      color="primary"
                    />
                  }
                  label={
                    ver_metas ? (
                      <Typography variant="body2">
                        <strong>Mostrar meta</strong>
                        <Tooltip title="SI" placement="right">
                          <InfoIcon
                            sx={{
                              width: '1.2rem',
                              height: '1.2rem',
                              ml: '0.5rem',
                              color: 'green',
                            }}
                          />
                        </Tooltip>
                      </Typography>
                    ) : (
                      <Typography variant="body2">
                        <strong>No mostar meta</strong>
                        <Tooltip title="No" placement="right">
                          <InfoIcon
                            sx={{
                              width: '1.2rem',
                              height: '1.2rem',
                              ml: '0.5rem',
                              color: 'orange',
                            }}
                          />
                        </Tooltip>
                      </Typography>
                    )
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </>
      ) : null}
    </>
  );
};
