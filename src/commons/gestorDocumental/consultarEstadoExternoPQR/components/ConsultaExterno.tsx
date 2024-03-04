/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import { miEstilo } from '../../Encuesta/interfaces/types';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { DownloadButton } from '../../../../utils/DownloadButton/DownLoadButton';
import {
  organigrama,
  AsignacionEncuesta,
  FormData,
  Pqr,
  estado,
  TipoPQRSDF,
} from '../interface/types';
import {
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {
  cargarAsignaciones,
  cargarestado,
  cargarorganigrama,
  fetchSpqrs,
  fetchTipoPQRSDF,
} from '../services/consultaExterno.service';
import { RenderDataGrid } from '../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { ConsultaExternoPQR } from './ConsultaExternoPQR';
import { ConslitaOtrosExterno } from '../../consltaOtrosExterno/components/conslitaOtrosExterno';




export const ConsultaExterno: React.FC = () => {
  const initialFormData: FormData = {
    id_persona_alertar: null,
    pqrs: '',
    estado: '',
    radicado: '',
    organigrama: '',
    fecha_desde: '',
    fecha_hasta: '',
    tipo_solicitud: '',
    estado_solicitud: '',
  };
  const [formData, setFormData] = useState(initialFormData);


  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [seleccion, setSeleccion] = useState('0');

  // Función para manejar el cambio en el select
  const handleChange = (event: any) => {
    setSeleccion(event.target.value); // No es necesario el casting a string aquí ya que event.target.value ya es un string
  };
  const [estado, setestado] = useState<estado[]>([]);
  useEffect(() => {
    cargarestado({ setestado });
  }, []);
  return (
    <>
      <Grid
        container
        item
        xs={12}
        marginLeft={2}
        marginRight={2}
        marginTop={3}
        spacing={2}
        sx={miEstilo}
      >

        <Grid item xs={12} sm={12}>
          <Title title="Consulta del estado de una solicitud - usuario externo " />
        </Grid>

      </Grid>






      <Grid
        container
        item
        xs={12}
        marginLeft={2}
        marginRight={2}
        marginTop={3}
        spacing={2}
        sx={miEstilo}
      >

        <Grid item xs={12} sm={12}>
          <Title title="Consulta del estado de una solicitud - usuario externo " />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl size="small" fullWidth>
            <InputLabel>Seleccione una opción</InputLabel>
            <Select
              value={seleccion}
              onChange={handleChange}
              label="Seleccione una opción"
            >
              <MenuItem value="">
                <em>Ninguna</em>
              </MenuItem>
              <MenuItem value="1">PQRSDF</MenuItem>
              <MenuItem value="2">OTROS</MenuItem>
            </Select>
          </FormControl>
        </Grid>


        {/* {seleccion === '0' && <> espera</>} */}

        <Grid item xs={12} sm={3}>
          <TextField
            label="radicado"
            name="radicado"
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleInputChange}
            value={formData.radicado}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
  <FormControl size="small" fullWidth>
    <InputLabel>estado</InputLabel>
    <Select
      label="estado"
      onChange={handleInputChange}
      name="estado"
      value={formData.estado}
    >
      {estado
        .filter(estado => ["RESPONDIDA", "EN GESTION", "RADICADO"].includes(estado.nombre))
        .map((estado) => (
          <MenuItem
            key={estado.id_estado_solicitud}
            value={estado.nombre}
          >
            {estado.nombre}
          </MenuItem>
        ))
      }
    </Select>
  </FormControl>
</Grid>


        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Fecha desde  "
            type="date"
            size="small"
            name="fecha_desde"
            variant="outlined"
            value={formData.fecha_desde}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label=" Fecha hasta  "
            type="date"
            size="small"
            name="fecha_hasta"
            variant="outlined"
            value={formData.fecha_hasta}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </Grid>
        {seleccion === '1' && <> <ConsultaExternoPQR 
        handleInputChange={handleInputChange}
        formData={formData}
        setFormData={setFormData}
        estado={estado}
        setestado={setestado}
        /></>}


        {seleccion === '2' && <><ConslitaOtrosExterno
         handleInputChange={handleInputChange}
         formData={formData}
         setFormData={setFormData}
         estado={estado}
         setestado={setestado}
        /></>}

      </Grid>



    </>
  );
};
