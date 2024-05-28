/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import 'leaflet/dist/leaflet.css';
import { CarteraPorDeuda } from './Graficas/CarteraEdad7';
import { SetStateAction, useState } from 'react';
import { Title } from '../../../components/Title';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { ReporteEdad3 } from './Graficas/ReporteEdad3';
import { ReporteCartera4 } from './Graficas/ReporteCartera4';
import { CarteraEdad } from './Graficas/CarteraEdad';
import { Reportetop1 } from './Graficas/Reportetop1';
import { CarteraPorDeudaEdad } from './Graficas/Reportetop2';
import { DeudoresXConceptoTop } from './Graficas/CarteraTop';

export const IndicadoresRecaudo: React.FC = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');

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
          <Title title="Reportes generales " />
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
              <InputLabel id="opcion-select-label">Reportes</InputLabel>
              <Select
                labelId="Plantilla"
                value={opcionSeleccionada}
                label="Reportes"
                onChange={handleChange}
              >
                <MenuItem value="1">
                  Reporte General de Cartera Por Edad
                </MenuItem>

                <MenuItem value="4">
                  Reporte de Cartera Por Deuda y Edad –Top
                </MenuItem>


                <MenuItem value="2">
                  Reporte General Cartera Por Deuda{' '}
                </MenuItem>

                <MenuItem value="7">
                  Reporte General Cartera Top 10 Deudores x Concepto{' '}
                </MenuItem>

                <MenuItem value="5">
                  Reporte General de Cartera Por Deuda y Edad –Top
                </MenuItem>
                <MenuItem value="3">
                  Reporte General de Cartera Por Deuda y Edad{' '}
                </MenuItem>

                
                <MenuItem value="6">
                  Reporte General Cartera Por Edad – Deuda y Etapa{' '}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      {opcionSeleccionada === '1' ? (
        <>
          {/* R */}
          <CarteraEdad />
        </>
      ) : null}

      {opcionSeleccionada === '2' ? (
        <>
          {/* Reporte General Cartera Por Edad – Deuda y Etapa */}
          <CarteraPorDeuda />
        </>
      ) : null}
      {opcionSeleccionada === '3' ? (
        <>
          {/* Reporte General de Cartera Por Deuda y Edad */}
          <ReporteCartera4 />
        </>
      ) : null}

      {opcionSeleccionada === '4' ? (
        <>
          {/* Reporte General de Cartera Por Deuda y Edad –Top1 */}
          <Reportetop1 />
        </>
      ) : null}
      {opcionSeleccionada === '5' ? (
        <>
          {/* Reporte General de Cartera Por Deuda y Edad –Top2 */}
          <CarteraPorDeudaEdad />
        </>
      ) : null}

      {opcionSeleccionada === '6' ? (
        <>
          {/* Reporte General de Cartera Por Edad */}
          <ReporteEdad3 />
        </>
      ) : null}

      {opcionSeleccionada === '7' ? (
        <>
          {/* Reporte General de Cartera Por Edad */}
          <DeudoresXConceptoTop />
        </>
      ) : null}
    </>
  );
};
