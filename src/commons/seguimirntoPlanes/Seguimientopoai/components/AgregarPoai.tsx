/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import React from 'react';
import { Title } from '../../../../components';
import { miEstilo, AgregarProps, FormDataRegistro } from '../interface/types';
import 'leaflet/dist/leaflet.css';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ClearIcon from '@mui/icons-material/Clear';

import {
  Dialog,
  Button,
  FormControl,
  Grid,
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { control_error, control_success } from '../../../../helpers';
import { api } from '../../../../api/axios';
export interface Prioridad {
  id_prioridad: number;
  nombre_prioridad: string;
  activo: boolean;
  item_ya_usado: boolean;
  registro_precargado: boolean;
}
export interface Fuente {
  id_fuente: number;
  nombre_fuente: string;
  vano_1: number | null;
  vano_2: number | null;
  vano_3: number | null;
  vano_4: number | null;
  vadicion1: number | null;
  vadicion2: number | null;
  vadicion3: number | null;
  vadicion4: boolean | null;
  valor_total: number;
  id_plan: number;
}
interface CodigoProducto {
  id_codigo: number;
  codigo_unsp: string;
  nombre_producto_unsp: string;
  activo: boolean;
  item_ya_usado: boolean;
  registro_precargado: boolean;
}

export const AgregarPoai: React.FC<AgregarProps> = ({
  formData,
  editar,
  consultarSeguimiento,
  selecTodosId,
  handle,
  setShowdos,
  formDatagregar,
  setFormDataCrear,
  initialFormDataCrear,
  selectid,
}) => {
  

  
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
  
    // Validar que solo se ingresen números en campos numéricos
    const numberFields = [
      'id_concepto',
      'id_plan',
      'id_producto',
      'id_actividad',
      'id_indicador',
      'id_meta',
      'id_rubro',
      'id_prioridad',
      'cuenta',
      'id_unidad_organizacional',
      'id_modalidad',
      'id_fuente1',
      'valor_fte1',
      'id_fuente2',
      'valor_fte2',
      'id_fuente3',
      'valor_fte3',
      'id_fuente4',
      'valor_fte4',
      'valor_banco',
      'valor_cdp',
      'valor_rp',
      'valor_obligado',
      'duracion',
      'valor_mensual',
      'numero_contrato',
      'numero_banco',
      'numero_rp',
      'numero_cdp',
      'valor_pagado',
      'vseguimiento_paabanco',
      'vseguimiento_paacdp',
      'vseguimiento_paarp',
      'svseguimiento_paaobligado',
      
      'vseguimiento_paapagado',
    ];
  
    if (numberFields.includes(name)) {
      if (!/^\d*$/.test(value)) {
        // Si el valor no es un número, no actualiza el estado
        return;
      }
    }
  
    const booleanFields = ['adicion1', 'adicion2', 'adicion3', 'adicion4'];
  
    const convertValue = (name: string, value: string): any => {
      if (numberFields.includes(name)) {
        return value === '' ? '' : Number(value);
      } else if (booleanFields.includes(name)) {
        return value === 'true' || value === '1';
      } else {
        return value;
      }
    };
  
    setFormDataCrear({ ...formDatagregar, [name]: convertValue(name, value) });
  };
  
  
  const handleLimpiarClick = () => {
    setFormDataCrear((prevData: any) => ({
      ...prevData,
    

    descripcion: '',
    id_prioridad: '',
     
  
    id_fuente1: '',
    valor_fte1: '',
    adicion1: false,
    id_fuente2: '',
    valor_fte2: '',
    adicion2: false,
    id_fuente3: '',
    valor_fte3: '',
    adicion3: false,
    id_fuente4: '',
    valor_fte4: '',
    adicion4: false,
    valor_banco: '',
    valor_cdp: '',
    valor_rp: '',
    valor_obligado: '',
    fecha_terminacion: '',
    duracion: '',
    valor_mensual: '',
    fecha_estimada: '',
    mes_proyectado: '',
    codigo_unsp: '',
    lugar_ejecucion: '',
    numero_contrato: '',
    numero_banco: '',
    numero_rp: '',
    fecha_rp: '',
    numero_cdp: '',
    fecha_cdp: '',
    nombre_contratista: '',
    observaciones_poai: '',
    fecha_registro: '',
    valor_pagado: '',
    vseguimiento_paabanco: '',
    vseguimiento_paacdp: '',
    vseguimiento_paarp: '',
    svseguimiento_paaobligado: '', 
    vseguimiento_paapagado: '',
    }));



  };
  const handlecerrar = () => {
    setShowdos(false);
  };

  const handleClick = () => {
    // console.log(formDatagregar.fechaTerminacion);
    console.log('2222222');
  };
  const transformEmptyFieldsToNull = (obj: any) => {
    const result: any = {};
    for (const key in obj) {
      if (obj[key] === '') {
        result[key] = null;
      } else {
        result[key] = obj[key];
      }
    }
    return result;
  };
  // selecTodosId.id_seguimiento
  const editartabla = async () => {
    try {
      const formDatagregarToSend = transformEmptyFieldsToNull(formDatagregar);

      const url = `seguimiento-planes/actualizar-seguimiento-poai/${selectid.id_seguimiento}/`;
      const res = await api.put(url, formDatagregarToSend);
      console.log('Configuración actualizada con éxito', res.data);
      consultarSeguimiento();
      control_success('Editado correctamente');
    } catch (error: any) {
      console.error('Error al actualizar la configuración', error);
      control_error(error.response.data.detail);
    }
  };

  const crearConfiguracion = async () => {
    try {
      const formDatagregarToSend = transformEmptyFieldsToNull(formDatagregar);
      const url = '/seguimiento-planes/crear-seguimiento-poai/';
      const res = await api.post(url, formDatagregarToSend);
      console.log('Formulario creado con éxito', res.data);
      control_success('Formulario creado con éxito');
      setFormDataCrear(initialFormDataCrear);
      consultarSeguimiento();
    } catch (error: any) {
      console.error('Error al crear el formulario', error);
      control_error(error.response.data.detail);
    }
  };

  const [prioridad, setPrioridad] = useState<Prioridad[]>([]);

  const fetprioridad = async () => {
    try {
      const url = 'seguimiento-planes/consultar-prioridades/';
      const res = await api.get(url);
      const unidadesData = res.data.data;
      setPrioridad(unidadesData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetprioridad();
  }, []);

  const [fuente, fetfuente] = useState<Fuente[]>([]);

  const fetfuented = async () => {
    try {
      const url =
        'seguimiento-planes/consultar-fuentes-financiacion-indicadores-lista/';
      const res = await api.get(url);
      const unidadesData = res.data.data;
      fetfuente(unidadesData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetfuented();
  }, []);

  const [codigod, fetcodigod] = useState<CodigoProducto[]>([]);

  const fetcodigoo = async () => {
    try {
      const url = 'seguimiento-planes/consultar-codigos-unsp/';
      const res = await api.get(url);
      const unidadesData = res.data.results; // Ajusta la estructura según tus datos
      fetcodigod(unidadesData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetcodigoo();
  }, []);

  const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

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
          <Title title="Registro de Seguimiento del POAI " />
        </Grid>
        {/* {selecTodosId?.id_concepto} */}

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Descripción detallada  "
            name="descripcion"
            value={formDatagregar.descripcion}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Código  presupuestal  "
            name="codigo_pre"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            value={formDatagregar.codigo_pre}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Cuenta  "
            name="cuenta"
            disabled
            value={formDatagregar.cuenta}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label=" Modalidad de contratación  "
            name="id_modalidad"
            disabled
            // value={formDatagregar.id_modalidad}
            value={selecTodosId.nombre_modalidad}

            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Responsable "
            name="id_unidad_organizacional"
            disabled
            // value={formDatagregar.id_unidad_organizacional}
            value={selecTodosId.nombre_responsable}
            // onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="si-no-select-label"> Prioridad</InputLabel>
            <Select
              label=" Prioridad  "
              name="id_prioridad"
              value={formDatagregar.id_prioridad}
              onChange={handleInputChange}
            >
              {prioridad.map((unidad: any) => (
                <MenuItem key={unidad.id_prioridad} value={unidad.id_prioridad}>
                  {unidad.nombre_prioridad}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel> Fuente de financiación N.1</InputLabel>
            <Select
              name="id_fuente1"
              value={formDatagregar.id_fuente1}
              onChange={handleInputChange}
              label="Fuente de financiación N.1"
            >
              {fuente.map((unidad: any) => (
                <MenuItem key={unidad.id_fuente} value={unidad.id_fuente}>
                  {unidad.nombre_fuente}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Valor N.1  "
            name="valor_fte1"
            value={formDatagregar.valor_fte1}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="si-no-select-label"> Adición </InputLabel>
            <Select
              name="adicion1"
              value={formDatagregar.adicion1}
              onChange={handleInputChange}
              label="Adición"
            >
              <MenuItem value="true"> Si </MenuItem>
              <MenuItem value="false"> No </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="si-no-select-label">
              {' '}
              Fuente de financiación N.2{' '}
            </InputLabel>
            <Select
              name="id_fuente2"
              value={formDatagregar.id_fuente2}
              onChange={handleInputChange}
              label="Fuente de financiación N.1"
            >
              {fuente.map((unidad: any) => (
                <MenuItem key={unidad.id_fuente} value={unidad.id_fuente}>
                  {unidad.nombre_fuente}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Valor N.2  "
            name="valor_fte2"
            value={formDatagregar.valor_fte2}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="si-no-select-label"> Adición </InputLabel>
            <Select
              name="adicion2"
              value={formDatagregar.adicion2}
              onChange={handleInputChange}
              label="Adición"
            >
              <MenuItem value="true"> Si </MenuItem>
              <MenuItem value="false"> No </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="si-no-select-label">
              {' '}
              Fuente de financiación N.3{' '}
            </InputLabel>
            <Select
              name="id_fuente3"
              value={formDatagregar.id_fuente3}
              onChange={handleInputChange}
              label="Fuente de financiación N.1"
            >
              {fuente.map((unidad: any) => (
                <MenuItem key={unidad.id_fuente} value={unidad.id_fuente}>
                  {unidad.nombre_fuente}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Valor N.3  "
            name="valor_fte3"
            value={formDatagregar.valor_fte3}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="si-no-select-label"> Adición </InputLabel>
            <Select
              name="adicion3"
              value={formDatagregar.adicion3}
              onChange={handleInputChange}
              label="Adición"
            >
              <MenuItem value="true"> Si </MenuItem>
              <MenuItem value="false"> No </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="si-no-select-label">
              {' '}
              Fuente de financiación N.4{' '}
            </InputLabel>
            <Select
              name="id_fuente4"
              value={formDatagregar.id_fuente4}
              onChange={handleInputChange}
              label="Fuente de financiación N.1"
            >
              {fuente.map((unidad: any) => (
                <MenuItem key={unidad.id_fuente} value={unidad.id_fuente}>
                  {unidad.nombre_fuente}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Valor N.4  "
            name="valor_fte4"
            value={formDatagregar.valor_fte4}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="si-no-select-label"> Adición </InputLabel>
            <Select
              name="adicion4"
              value={formDatagregar.adicion4}
              onChange={handleInputChange}
              label="Adición"
            >
              <MenuItem value="true"> Si </MenuItem>
              <MenuItem value="false"> No </MenuItem>
            </Select>
          </FormControl>
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
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Valor de banco "
            name="valor_banco"
            value={formDatagregar.valor_banco}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Valor CDP "
            name="valor_cdp"
            value={formDatagregar.valor_cdp}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Valor RP  "
            name="valor_rp"
            value={formDatagregar.valor_rp}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Valor obligado "
            name="valor_obligado"
            value={formDatagregar.valor_obligado}
            onChange={handleInputChange}
          />
        </Grid>

        {/* <Button color='success'
          variant='contained'
          onClick={handleClick}>CONSOLE </Button> */}
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            type="date"
            size="small"
            variant="outlined"
            label="Fecha de terminación  "
            name="fecha_terminacion"
            value={formDatagregar.fecha_terminacion}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Fecha de terminación  "
            name="fechaTerminacion"
            value={formDatagregar.fechaTerminacion}
            onChange={handleInputChange}
          />
        </Grid> */}

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Valor de duración  "
            name="duracion"
            value={formDatagregar.duracion}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Valor mensual "
            name="valor_mensual"
            value={formDatagregar.valor_mensual}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            type="date"
            size="small"
            variant="outlined"
            label="Fecha estimada "
            name="fecha_estimada"
            value={formDatagregar.fecha_estimada}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth size="small" variant="outlined">
            <InputLabel id="mes-proyectado-label">Mes proyectado</InputLabel>
            <Select
              labelId="mes-proyectado-label"
              label="Mes proyectado"
              name="mes_proyectado"
              value={formDatagregar.mes_proyectado}
              onChange={handleInputChange}
            >
              {meses.map((mes) => (
                <MenuItem key={mes} value={mes}>
                  {mes}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="si-no-select-label">Codigo UNSP</InputLabel>
            <Select
              name="codigo_unsp"
              value={formDatagregar.codigo_unsp}
              onChange={handleInputChange}
              label="Codigo UNSP "
            >
              {codigod.map((codigod: any) => (
                <MenuItem key={codigod.id_codigo} value={codigod.id_codigo}>
                  {codigod.codigo_unsp} - {codigod.nombre_producto_unsp}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* {formDatagregar.codigo_unsp} */}
        {/* <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Codigo UNSP  "
            name="codigo_unsp"
            value={formDatagregar.codigo_unsp}
            onChange={handleInputChange}
          />
        </Grid> */}

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Lugar de ejecución  "
            name="lugar_ejecucion"
            value={formDatagregar.lugar_ejecucion}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Número de contrato  "
            name="numero_contrato"
            value={formDatagregar.numero_contrato}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Número  de banco  "
            name="numero_banco"
            value={formDatagregar.numero_banco}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Número  de RP   "
            name="numero_rp"
            value={formDatagregar.numero_rp}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            type="date"
            size="small"
            variant="outlined"
            label="Fecha de RP   "
            name="fecha_rp"
            value={formDatagregar.fecha_rp}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        {/* <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Fecha de RP   "
            name="fechaRP"
            value={formDatagregar.fechaRP}
            onChange={handleInputChange}
          />
        </Grid> */}

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Número  de CDP  "
            name="numero_cdp"
            value={formDatagregar.numero_cdp}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            type="date"
            size="small"
            variant="outlined"
            label="Fecha de CDP  "
            name="fecha_cdp"
            value={formDatagregar.fecha_cdp}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Fecha de CDP  "
            name="fechaCDP"
            value={formDatagregar.fechaCDP}
            onChange={handleInputChange}
          />
        </Grid> */}

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Nombre de contratista  "
            name="nombre_contratista"
            value={formDatagregar.nombre_contratista}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            type="date"
            size="small"
            variant="outlined"
            label="Fecha de registro   "
            name="fecha_registro"
            value={formDatagregar.fecha_registro}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Fecha de registro   "
            name="fechaRegistro"
            value={formDatagregar.fechaRegistro}
            onChange={handleInputChange}
          />
        </Grid> */}

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Valor pagado "
            name="valor_pagado"
            value={formDatagregar.valor_pagado}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Valor Seguimiento PAA Banco"
            name="vseguimiento_paabanco"
            value={formDatagregar.vseguimiento_paabanco}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Valor Seguimiento PAA CDP "
            name="vseguimiento_paacdp"
            value={formDatagregar.vseguimiento_paacdp}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Valor Seguimiento PAA RP "
            name="vseguimiento_paarp"
            value={formDatagregar.vseguimiento_paarp}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Valor Seguimiento PAA obligado "
            name="svseguimiento_paaobligado"
            value={formDatagregar.svseguimiento_paaobligado}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Valor Seguimiento PAA pagado "
            name="vseguimiento_paapagado"
            value={formDatagregar.vseguimiento_paapagado}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="outlined"
            size="small"
            required
            rows={3}
            label="Descripción"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            multiline
            name="observaciones_poai"
            value={formDatagregar.observaciones_poai}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid
          container
          spacing={2}
          marginTop={2}
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Grid item>
            <Button
              color="error"
              variant="outlined"
              fullWidth
              onClick={handlecerrar}
              startIcon={<ClearIcon />}
            >
              cerrar
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="warning"
              variant="outlined"
              fullWidth
              startIcon={<CleanIcon />}
              onClick={handleLimpiarClick}
            >
              Limpiar
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="success"
              variant="contained"
              fullWidth
              onClick={editar ? editartabla : crearConfiguracion}
              startIcon={<SaveIcon />}
            >
              {editar ? 'Editar' : 'Guardar'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
