/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */ import 'leaflet/dist/leaflet.css';
import { SetStateAction, useState } from 'react';
import { Title } from '../../../../components';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import * as React from 'react';
import { Vertimiento } from './Vertimiento';
import { VertimientoPN } from './VertimientoPN';
import { VertimientoPJ } from './VertimientoPJ';
import { CaptacionPJ } from './CaptacionPJ';

export const Sirh: React.FC = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('6');

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setOpcionSeleccionada(event.target.value);
  };
  return (
    <>
      <Grid
        container
        item
        xs={12}
        marginLeft={2}
        marginRight={2}
        spacing={2}
        marginTop={3}
        sx={{
          position: 'relative',
          borderRadius: '15px',
          background: '#FAFAFA',
          boxShadow: '0px 3px 6px #042F4A26',
          p: '20px',
          m: '10px 0 20px 0',
          mb: '20px',
        }}
      >
        <Grid item xs={12} sm={12}>
          <Title title="Reportes SIRH " />
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="opcion-select-label">SIRH </InputLabel>
              <Select
                labelId="Plantilla"
                value={opcionSeleccionada}
                label="recuros"
                onChange={handleChange}
              >
                <MenuItem value="1">Captación PN</MenuItem>

                <MenuItem value="4">Captación PJ</MenuItem>
                
                <MenuItem value="2">Vertimiento PN</MenuItem>

                <MenuItem value="3">Vertimiento PJ</MenuItem>

                {/* <MenuItem value="5">
                  Reporte General de Cartera Por Deuda y Edad –Top
                </MenuItem> */}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      {opcionSeleccionada === '1' ? (
        <>
          {/* R */}
          <Vertimiento />
        </>
      ) : null}

      {opcionSeleccionada === '2' ? (
        <>
          {/* Reporte General Cartera Por Edad – Deuda y Etapa */}
          <VertimientoPN />
        </>
      ) : null}
      {opcionSeleccionada === '3' ? (
        <>
          {/* Reporte General de Cartera Por Deuda y Edad */}
          <VertimientoPJ />
        </>
      ) : null}

      {opcionSeleccionada === '4' ? (
        <>
          {/* Reporte General de Cartera Por Deuda y Edad –Top1 */}
          <CaptacionPJ />
        </>
      ) : null}
      {opcionSeleccionada === '5' ? (
        <>
          {/* Reporte General de Cartera Por Deuda y Edad –Top2 */}
          {/* <CarteraPorDeudaEdad /> */}
        </>
      ) : null}
    </>
  );
};
