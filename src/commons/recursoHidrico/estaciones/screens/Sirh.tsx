/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */ import 'leaflet/dist/leaflet.css';
import { SetStateAction, useEffect, useState } from 'react';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { Title } from '../../../../components';
import {
  Dialog,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  ButtonGroup,
} from '@mui/material';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { SearchOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { api } from '../../../../api/axios';
import { RenderDataGrid } from '../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import { control_error, control_success } from '../../../../helpers';

import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
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
                <MenuItem value="1">Captacion PN</MenuItem>

                <MenuItem value="2">
                VertimientoPN
                </MenuItem>

                <MenuItem value="3">
                VertimientoPJ
                </MenuItem>

                <MenuItem value="4">
                CaptacionPJ
                </MenuItem>

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
