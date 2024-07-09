/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
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

interface Concepto {
  tipoUsuario: string;
  nombre: string;
  apellido: string;
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  deptoCorrespondencia: string;
  municipioCorrespondencia: string;
  direccionCorrespondencia: string;
  email: string;
  tel: string;
  nombrePredio: string;
  tipoTenencia: string;
  deptoPredio: string;
  municipioPredio: string;
  tipoCentroPoblado: string;
  nombreCentroPoblado: string;
  cedulaCatastral: string;
  matriculaInmobiliaria: string;
  areaPredio: string;
  direccionPredio: string;
  clasificacionSuelo: string;
  sistemaRef: string;
  gradLat: string;
  minLat: string;
  segLat: string;
  gradLon: string;
  minLon: string;
  segLon: string;
  altitud: string;
  descripcionPuntoAcceso: string;
  numeroExpediente: string;
  noResolucion: string;
  fechaExpedicion: string;
  caudalConcesionado: string;
  vigenciaDesde: string;
  vigenciaHasta: string;
  fuenteAbastecedora: string;
  departamentoCaptacion: string;
  municipioCaptacion: string;
  tipoCentroPobladoCaptacion: string;
  nombreCentroPobladoCaptacion: string;
  codigoFuente: string;
  tramo: string;
  aduccion: string;
  desarenador: string;
  ptap: string;
  redDistribucion: string;
  tanque: string;
  tipoCaptacion: string;
  ofertaHidricaTotal: string;
  areaCaptacion: string;
  ofertaHidricaDisponible: string;
  tieneSistemaMedicion: string;
  estadoCaptacion: string;
  caudalDisenoCaptacion: string;
  tieneContinuidadServicio: string;
  tieneServidumbre: string;
  sistemaRefCaptacion: string;
  gradLatCaptacion: string;
  minLatCaptacion: string;
  segLatCaptacion: string;
  gradLonCaptacion: string;
  minLonCaptacion: string;
  segLonCaptacion: string;
  altitudCaptacion: string;
  descripcionAccesoCaptacion: string;
  caudal: string;
  noPersonasPermanentes: string;
  noPersonasTransitorias: string;
  aprovechDiasMes: string;
  tipoAnimal1: string;
  caudalAnimal1: string;
  noAnimales1: string;
  tipoAnimal2: string;
  caudalAnimal2: string;
  noAnimales2: string;
  tipoCultivo: string;
  caudalCultivo: string;
  produccionCultivo: string;
  eficienciaCultivo: string;
  areaCultivo: string;
  otroUso: string;
  descripcionOtroUso: string;
  caudalOtroUso: string;
}

// export const Resultados: React.FC = () => {
export const CaptacionPJ: React.FC = () => {
  const [Historico, setHistorico] = useState<Concepto[]>([]);

  const fetchHistorico = async (): Promise<void> => {
    try {
      const url = `hidrico/zonas-hidricas/SIRH/captacionPN/`;
      const res = await api.get(url);
      const data = res.data?.data || [];

      const HistoricoData: Concepto[] = data.map((item: any) => ({
        tipoUsuario: item['INFORMACION DE USUARIO']['TIPO DE USUARIO'],
        nombre: item['INFORMACION DE USUARIO']['NOMBRE'],
        apellido: item['INFORMACION DE USUARIO']['APELLIDO'],
        tipoIdentificacion:
          item['INFORMACION DE USUARIO']['TIPO DE IDENTIFICACION'],
        numeroIdentificacion:
          item['INFORMACION DE USUARIO']['NUMERO DE IDENTIFICACION'],
        deptoCorrespondencia:
          item['INFORMACION DE USUARIO']['DEPTO DE CORRESPONDENCIA'],
        municipioCorrespondencia:
          item['INFORMACION DE USUARIO']['MUNICIPIO DE CORRESPONDENCIA'],
        direccionCorrespondencia:
          item['INFORMACION DE USUARIO']['DIRECCION CORRESPONDENCIA'],
        email: item['INFORMACION DE USUARIO']['E-MAIL'],
        tel: item['INFORMACION DE USUARIO']['TEL'],
        nombrePredio: item['INFORMACION DEL PREDIO']['NOMBRE PREDIO'],
        deptoPredio: item['INFORMACION DEL PREDIO']['DEPTO PREDIO'],
        municipioPredio: item['INFORMACION DEL PREDIO']['MUNICIPIO PREDIO'],
        cedulaCatastral: item['INFORMACION DEL PREDIO']['CEDULA CATASTRAL'],
        matriculaInmobiliaria:
          item['INFORMACION DEL PREDIO']['MATRICULA INMOBILIARIA'],
        direccionPredio: item['INFORMACION DEL PREDIO']['DIRECCION DEL PREDIO'],
        sistemaRefPredio: item['GEOREFERENCIACION DEL PREDIO']['SISTEMA REF'],
        numeroExpediente: item['INFORMACION PERMISO']['NÚMERO DEL EXPEDIENTE'],
        numeroResolucion: item['INFORMACION PERMISO']['No. RESOLUCION'],
        caudalConcesionado: item['INFORMACION PERMISO']['CAUDAL CONCESIONADO'],
        fuenteAbastecedora:
          item['INFORMACION CAPTACION']['FUENTE ABASTECEDORA'],
        departamentoCaptacion:
          item['INFORMACION CAPTACION']['DEPARTAMENTO CAPTACION'],
        municipioCaptacion:
          item['INFORMACION CAPTACION']['MUNICIPIO CAPTACION'],
        sistemaRefCaptacion:
          item['GEOREFERENCIACION DE LA CAPTACION']['SISTEMA REF'],
      }));

      setHistorico(HistoricoData);
      control_success('Datos encontrados con éxito');
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };

  useEffect(() => {
    fetchHistorico();
  }, []);

  const columnstabla = [
    { field: 'tipoUsuario', headerName: 'Tipo de Usuario', minWidth: 250 },
    { field: 'nombre', headerName: 'Nombre', minWidth: 200 },
    { field: 'apellido', headerName: 'Apellido', minWidth: 200 },
    { field: 'tipoIdentificacion', headerName: 'Tipo de Identificación', minWidth: 200 },
    { field: 'numeroIdentificacion', headerName: 'Número de Identificación', minWidth: 200 },
    { field: 'deptoCorrespondencia', headerName: 'Depto de Correspondencia', minWidth: 200 },
    { field: 'municipioCorrespondencia', headerName: 'Municipio de Correspondencia', minWidth: 200 },
    { field: 'direccionCorrespondencia', headerName: 'Dirección Correspondencia', minWidth: 200 },
    { field: 'email', headerName: 'E-mail', minWidth: 200 },
    { field: 'tel', headerName: 'Tel', minWidth: 40 },
    { field: 'nombrePredio', headerName: 'Nombre Predio', minWidth: 300 },
    { field: 'tipoTenencia', headerName: 'Tipo Tenencia', minWidth: 200 },
    { field: 'deptoPredio', headerName: 'Depto Predio', minWidth: 200 },
    { field: 'municipioPredio', headerName: 'Municipio Predio', minWidth: 200 },
    { field: 'tipoCentroPoblado', headerName: 'Tipo Centro Poblado', minWidth: 200 },
    { field: 'nombreCentroPoblado', headerName: 'Nombre Centro Poblado', minWidth: 190 },
    { field: 'cedulaCatastral', headerName: 'Cédula Catastral', minWidth: 140 },
    { field: 'matriculaInmobiliaria', headerName: 'Matrícula Inmobiliaria', minWidth: 140 },
    { field: 'areaPredio', headerName: 'Área Predio (Ha)', minWidth: 250 },
    { field: 'direccionPredio', headerName: 'Dirección del Predio', minWidth: 300 },
    { field: 'clasificacionSuelo', headerName: 'Clasificación Suelo', minWidth: 200 },
    { field: 'sistemaRef', headerName: 'Sistema Ref', minWidth: 200 },
    { field: 'gradLat', headerName: 'Grad Lat', minWidth: 250 },
    { field: 'minLat', headerName: 'Min Lat', minWidth: 250 },
    { field: 'segLat', headerName: 'Seg Lat', minWidth: 250 },
    { field: 'gradLon', headerName: 'Grad Lon', minWidth: 250 },
    { field: 'minLon', headerName: 'Min Lon', minWidth: 250 },
    { field: 'segLon', headerName: 'Seg Lon', minWidth: 250 },
    { field: 'altitud', headerName: 'Altitud', minWidth: 250 },
    { field: 'descripcionPuntoAcceso', headerName: 'Descripción Punto Acceso', minWidth: 300 },
    { field: 'numeroExpediente', headerName: 'Número del Expediente', minWidth: 250 },
    { field: 'noResolucion', headerName: 'No. Resolución', minWidth: 250 },
    { field: 'fechaExpedicion', headerName: 'Fecha Expedición', minWidth: 250 },
    { field: 'caudalConcesionado', headerName: 'Caudal Concesionado (lts/seg)', minWidth: 250 },
    { field: 'vigenciaDesde', headerName: 'Vigencia Desde', minWidth: 250 },
    { field: 'vigenciaHasta', headerName: 'Vigencia Hasta', minWidth: 250 },
    { field: 'fuenteAbastecedora', headerName: 'Fuente Abastecedora', minWidth: 200 },
    { field: 'departamentoCaptacion', headerName: 'Departamento Captación', minWidth: 200 },
    { field: 'municipioCaptacion', headerName: 'Municipio Captación', minWidth: 200 },
    { field: 'tipoCentroPobladoCaptacion', headerName: 'Tipo Centro Poblado', minWidth: 200 },
    { field: 'nombreCentroPobladoCaptacion', headerName: 'Nombre Centro Poblado', minWidth: 190 },
    { field: 'codigoFuente', headerName: 'Código Fuente', minWidth: 250 },
    { field: 'tramo', headerName: 'Tramo', minWidth: 200 },
    { field: 'aduccion', headerName: 'Aducción', minWidth: 200 },
    { field: 'desarenador', headerName: 'Desarenador', minWidth: 200 },
    { field: 'ptap', headerName: 'PTAP', minWidth: 200 },
    { field: 'redDistribucion', headerName: 'Red Distribución', minWidth: 200 },
    { field: 'tanque', headerName: 'Tanque', minWidth: 200 },
    { field: 'tipoCaptacion', headerName: 'Tipo Captación', minWidth: 200 },
    { field: 'ofertaHidricaTotal', headerName: 'Oferta Hídrica Total Año Medio (m3/s)', minWidth: 250 },
    { field: 'areaCaptacion', headerName: 'Área Captación (m2)', minWidth: 250 },
    { field: 'ofertaHidricaDisponible', headerName: 'Oferta Hídrica Disponible Año Medio (m3/s)', minWidth: 250 },
    { field: 'tieneSistemaMedicion', headerName: '¿Tiene Sistema de Medición?', minWidth: 200 },
    { field: 'estadoCaptacion', headerName: 'Estado Captación', minWidth: 200 },
    { field: 'caudalDisenoCaptacion', headerName: 'Caudal de Diseño Captación (lts/seg)', minWidth: 250 },
    { field: 'tieneContinuidadServicio', headerName: '¿Tiene Continuidad en el Servicio?', minWidth: 200 },
    { field: 'tieneServidumbre', headerName: '¿Tiene Servidumbre?', minWidth: 200 },
    { field: 'sistemaRefCaptacion', headerName: 'Sistema Ref', minWidth: 200 },
    { field: 'gradLatCaptacion', headerName: 'Grad Lat', minWidth: 250 },
    { field: 'minLatCaptacion', headerName: 'Min Lat', minWidth: 250 },
    { field: 'segLatCaptacion', headerName: 'Seg Lat', minWidth: 250 },
    { field: 'gradLonCaptacion', headerName: 'Grad Lon', minWidth: 250 },
    { field: 'minLonCaptacion', headerName: 'Min Lon', minWidth: 250 },
    { field: 'segLonCaptacion', headerName: 'Seg Lon', minWidth: 250 },
    { field: 'altitudCaptacion', headerName: 'Altitud', minWidth: 250 },
    { field: 'descripcionAccesoCaptacion', headerName: 'Descripción Acceso Captación', minWidth: 300 },
    { field: 'caudal', headerName: 'Caudal (lts/seg)', minWidth: 250 },
    { field: 'noPersonasPermanentes', headerName: 'No. Personas Permanentes', minWidth: 250 },
    { field: 'noPersonasTransitorias', headerName: 'No. Personas Transitorias', minWidth: 250 },
    { field: 'aprovechDiasMes', headerName: 'Aprovech. Días/mes', minWidth: 250 },
    { field: 'tipoAnimal1', headerName: 'Tipo Animal 1', minWidth: 250 },
    { field: 'caudalAnimal1', headerName: 'Caudal Animal 1 (lts/seg)', minWidth: 250 },
    { field: 'noAnimales1', headerName: 'No. Animales 1', minWidth: 250 },
    { field: 'tipoAnimal2', headerName: 'Tipo Animal 2', minWidth: 250 },
    { field: 'caudalAnimal2', headerName: 'Caudal Animal 2 (lts/seg)', minWidth: 250 },
    { field: 'noAnimales2', headerName: 'No. Animales 2', minWidth: 250 },
    { field: 'tipoCultivo', headerName: 'Tipo Cultivo', minWidth: 250 },
    { field: 'caudalCultivo', headerName: 'Caudal Cultivo (lts/seg)', minWidth: 250 },
    { field: 'produccionCultivo', headerName: 'Producción Cultivo (ton/año)', minWidth: 250 },
    { field: 'eficienciaCultivo', headerName: 'Eficiencia Cultivo (%)', minWidth: 250 },
    { field: 'areaCultivo', headerName: 'Área Cultivo (ha)', minWidth: 250 },
    { field: 'otroUso', headerName: 'Otro Uso', minWidth: 250 },
    { field: 'descripcionOtroUso', headerName: 'Descripción Otro Uso', minWidth: 300 },
    { field: 'caudalOtroUso', headerName: 'Caudal Otro Uso (lts/seg)', minWidth: 250 },
];


  interface Column {
    id: keyof Concepto; // Cambia a 'keyof Concepto' para que los IDs sean las claves del tipo 'Concepto'
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: any) => string; // Ajusta el tipo del valor de formato según sea necesario
  }

  const columns: Column[] = [
    { id: 'tipoUsuario', label: 'Tipo de Usuario', minWidth: 250 },
    { id: 'nombre', label: 'Nombre', minWidth: 200 },
    { id: 'apellido', label: 'Apellido', minWidth: 200 },
    {
      id: 'tipoIdentificacion',
      label: 'Tipo de Identificación',
      minWidth: 200,
    },
    {
      id: 'numeroIdentificacion',
      label: 'Número de Identificación',
      minWidth: 200,
    },
    {
      id: 'deptoCorrespondencia',
      label: 'Depto de Correspondencia',
      minWidth: 200,
    },
    {
      id: 'municipioCorrespondencia',
      label: 'Municipio de Correspondencia',
      minWidth: 200,
    },
    {
      id: 'direccionCorrespondencia',
      label: 'Dirección Correspondencia',
      minWidth: 200,
    },
    { id: 'email', label: 'E-mail', minWidth: 200 },
    { id: 'tel', label: 'Tel', minWidth: 40 },
    { id: 'nombrePredio', label: 'Nombre Predio', minWidth: 300 },
    { id: 'tipoTenencia', label: 'Tipo Tenencia', minWidth: 200 },
    { id: 'deptoPredio', label: 'Depto Predio', minWidth: 200 },
    { id: 'municipioPredio', label: 'Municipio Predio', minWidth: 200 },
    { id: 'tipoCentroPoblado', label: 'Tipo Centro Poblado', minWidth: 200 },
    {
      id: 'nombreCentroPoblado',
      label: 'Nombre Centro Poblado',
      minWidth: 190,
    },
    { id: 'cedulaCatastral', label: 'Cédula Catastral', minWidth: 140 },
    {
      id: 'matriculaInmobiliaria',
      label: 'Matrícula Inmobiliaria',
      minWidth: 140,
    },
    { id: 'areaPredio', label: 'Área Predio (Ha)', minWidth: 250 },
    { id: 'direccionPredio', label: 'Dirección del Predio', minWidth: 300 },
    { id: 'clasificacionSuelo', label: 'Clasificación Suelo', minWidth: 200 },
    { id: 'sistemaRef', label: 'Sistema Ref', minWidth: 200 },
    { id: 'gradLat', label: 'Grad Lat', minWidth: 250 },
    { id: 'minLat', label: 'Min Lat', minWidth: 250 },
    { id: 'segLat', label: 'Seg Lat', minWidth: 250 },
    { id: 'gradLon', label: 'Grad Lon', minWidth: 250 },
    { id: 'minLon', label: 'Min Lon', minWidth: 250 },
    { id: 'segLon', label: 'Seg Lon', minWidth: 250 },
    { id: 'altitud', label: 'Altitud', minWidth: 250 },
    {
      id: 'descripcionPuntoAcceso',
      label: 'Descripción Punto Acceso',
      minWidth: 300,
    },
    { id: 'numeroExpediente', label: 'Número del Expediente', minWidth: 250 },
    { id: 'noResolucion', label: 'No. Resolución', minWidth: 250 },
    { id: 'fechaExpedicion', label: 'Fecha Expedición', minWidth: 250 },
    {
      id: 'caudalConcesionado',
      label: 'Caudal Concesionado (lts/seg)',
      minWidth: 250,
    },
    { id: 'vigenciaDesde', label: 'Vigencia Desde', minWidth: 250 },
    { id: 'vigenciaHasta', label: 'Vigencia Hasta', minWidth: 250 },
    { id: 'fuenteAbastecedora', label: 'Fuente Abastecedora', minWidth: 200 },
    {
      id: 'departamentoCaptacion',
      label: 'Departamento Captación',
      minWidth: 200,
    },
    { id: 'municipioCaptacion', label: 'Municipio Captación', minWidth: 200 },
    {
      id: 'tipoCentroPobladoCaptacion',
      label: 'Tipo Centro Poblado',
      minWidth: 200,
    },
    {
      id: 'nombreCentroPobladoCaptacion',
      label: 'Nombre Centro Poblado',
      minWidth: 190,
    },
    { id: 'codigoFuente', label: 'Código Fuente', minWidth: 250 },
    { id: 'tramo', label: 'Tramo', minWidth: 200 },
    { id: 'aduccion', label: 'Aducción', minWidth: 200 },
    { id: 'desarenador', label: 'Desarenador', minWidth: 200 },
    { id: 'ptap', label: 'PTAP', minWidth: 200 },
    { id: 'redDistribucion', label: 'Red Distribución', minWidth: 200 },
    { id: 'tanque', label: 'Tanque', minWidth: 200 },
    { id: 'tipoCaptacion', label: 'Tipo Captación', minWidth: 200 },
    {
      id: 'ofertaHidricaTotal',
      label: 'Oferta Hídrica Total Año Medio (m3/s)',
      minWidth: 250,
    },
    { id: 'areaCaptacion', label: 'Área Captación (m2)', minWidth: 250 },
    {
      id: 'ofertaHidricaDisponible',
      label: 'Oferta Hídrica Disponible Año Medio (m3/s)',
      minWidth: 250,
    },
    {
      id: 'tieneSistemaMedicion',
      label: '¿Tiene Sistema de Medición?',
      minWidth: 200,
    },
    { id: 'estadoCaptacion', label: 'Estado Captación', minWidth: 200 },
    {
      id: 'caudalDisenoCaptacion',
      label: 'Caudal de Diseño Captación (lts/seg)',
      minWidth: 250,
    },
    {
      id: 'tieneContinuidadServicio',
      label: '¿Tiene Continuidad en el Servicio?',
      minWidth: 200,
    },
    { id: 'tieneServidumbre', label: '¿Tiene Servidumbre?', minWidth: 200 },
    { id: 'sistemaRefCaptacion', label: 'Sistema Ref', minWidth: 200 },
    { id: 'gradLatCaptacion', label: 'Grad Lat', minWidth: 250 },
    { id: 'minLatCaptacion', label: 'Min Lat', minWidth: 250 },
    { id: 'segLatCaptacion', label: 'Seg Lat', minWidth: 250 },
    { id: 'gradLonCaptacion', label: 'Grad Lon', minWidth: 250 },
    { id: 'minLonCaptacion', label: 'Min Lon', minWidth: 250 },
    { id: 'segLonCaptacion', label: 'Seg Lon', minWidth: 250 },
    { id: 'altitudCaptacion', label: 'Altitud', minWidth: 250 },
    {
      id: 'descripcionAccesoCaptacion',
      label: 'Descripción Acceso Captación',
      minWidth: 300,
    },
    { id: 'caudal', label: 'Caudal (lts/seg)', minWidth: 250 },
    {
      id: 'noPersonasPermanentes',
      label: 'No. Personas Permanentes',
      minWidth: 250,
    },
    {
      id: 'noPersonasTransitorias',
      label: 'No. Personas Transitorias',
      minWidth: 250,
    },
    { id: 'aprovechDiasMes', label: 'Aprovech. Días/mes', minWidth: 250 },
    { id: 'tipoAnimal1', label: 'Tipo Animal 1', minWidth: 250 },
    { id: 'caudalAnimal1', label: 'Caudal Animal 1 (lts/seg)', minWidth: 250 },
    { id: 'noAnimales1', label: 'No. Animales 1', minWidth: 250 },
    { id: 'tipoAnimal2', label: 'Tipo Animal 2', minWidth: 250 },
    { id: 'caudalAnimal2', label: 'Caudal Animal 2 (lts/seg)', minWidth: 250 },
    { id: 'noAnimales2', label: 'No. Animales 2', minWidth: 250 },
    { id: 'tipoCultivo', label: 'Tipo Cultivo', minWidth: 250 },
    { id: 'caudalCultivo', label: 'Caudal Cultivo (lts/seg)', minWidth: 250 },
    {
      id: 'produccionCultivo',
      label: 'Producción Cultivo (ton/año)',
      minWidth: 250,
    },
    { id: 'eficienciaCultivo', label: 'Eficiencia Cultivo (%)', minWidth: 250 },
    { id: 'areaCultivo', label: 'Área Cultivo (ha)', minWidth: 250 },
    { id: 'otroUso', label: 'Otro Uso', minWidth: 250 },
    { id: 'descripcionOtroUso', label: 'Descripción Otro Uso', minWidth: 300 },
    { id: 'caudalOtroUso', label: 'Caudal Otro Uso (lts/seg)', minWidth: 250 },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <Grid
        container
        item
        xs={12}
        spacing={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12} sm={12}>
          <Title title="CaptacionPJ" />
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
            <ButtonGroup style={{ margin: 5 }}>
              {download_xls({ nurseries: Historico, columns: columnstabla })}
              {download_pdf({
                nurseries: Historico,
                columns: columnstabla,
                title: 'Mis alertas',
              })}
            </ButtonGroup>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12}>
          <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={10}>
                      <Box
                        component="section"
                        sx={{ p: 2, borderRight: '1px dashed grey' }}
                      >
                        INFORMACION DE USUARIO
                      </Box>
                    </TableCell>

                    <TableCell align="center" colSpan={11}>
                      <Box
                        component="section"
                        sx={{ p: 2, borderRight: '1px dashed grey' }}
                      >
                        INFORMACION DEL PREDIO
                      </Box>
                    </TableCell>

                    <TableCell align="center" colSpan={9}>
                      <Box
                        component="section"
                        sx={{ p: 2, borderRight: '1px dashed grey' }}
                      >
                        GEOREFERENCIACION DEL PREDIO
                      </Box>
                    </TableCell>

                    <TableCell align="center" colSpan={6}>
                      <Box
                        component="section"
                        sx={{ p: 2, borderRight: '1px dashed grey' }}
                      >
                        INFORMACION PERMISO
                      </Box>
                    </TableCell>
                    <TableCell align="center" colSpan={7}>
                      <Box
                        component="section"
                        sx={{ p: 2, borderRight: '1px dashed grey' }}
                      >
                        INFORMACION CAPTACION
                      </Box>
                    </TableCell>

                    <TableCell align="center" colSpan={6}>
                      <Box
                        component="section"
                        sx={{ p: 2, borderRight: '1px dashed grey' }}
                      >
                        COMPONENTES DEL SISTEMA DE ABASTECIMIENTO
                      </Box>
                    </TableCell>

                    <TableCell align="center" colSpan={8}>
                      <Box
                        component="section"
                        sx={{ p: 2, borderRight: '1px dashed grey' }}
                      >
                        DESCRIPCION DE LA CAPTACION
                      </Box>
                    </TableCell>

                    <TableCell align="center" colSpan={9}>
                      <Box
                        component="section"
                        sx={{ p: 2, borderRight: '1px dashed grey' }}
                      >
                        GEOREFERENCIACION DE LA CAPTACION
                      </Box>
                    </TableCell>

                    <TableCell align="center" colSpan={4}>
                      <Box
                        component="section"
                        sx={{ p: 2, borderRight: '1px dashed grey' }}
                      >
                        ABASTECIMIENTO Y CONSUMO HUMANO
                      </Box>
                    </TableCell>
                    <TableCell align="center" colSpan={3}>
                      <Box
                        component="section"
                        sx={{ p: 2, borderRight: '1px dashed grey' }}
                      >
                        POR ABREVADEROS
                      </Box>
                    </TableCell>

                    <TableCell align="center" colSpan={3}>
                      <Box
                        component="section"
                        sx={{ p: 2, borderRight: '1px dashed grey' }}
                      >
                        PESCA
                      </Box>
                    </TableCell>

                    <TableCell align="center" colSpan={5}>
                      <Box
                        component="section"
                        sx={{ p: 2, borderRight: '1px dashed grey' }}
                      >
                        RIEGO Y SILVICULTURA
                      </Box>
                    </TableCell>

                    <TableCell align="center" colSpan={3}>
                      <Box
                        component="section"
                        sx={{ p: 2, borderRight: '1px dashed grey' }}
                      >
                        RIEGO Y SILVICULTURA
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align="left"
                        style={{ top: 57, minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Historico.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  ).map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.numeroIdentificacion}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align="left">
                              {column.format ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={Historico.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>

        {/* <RenderDataGrid
          title="Vertimiento "
          columns={columns ?? []}
          rows={Historico ?? []}
        /> */}

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
              startIcon={<SearchOutlined />}
              variant="contained"
              fullWidth
              onClick={fetchHistorico}
            >
              Buscar
            </Button>
          </Grid>

          <Grid item xs={12} sm={1}>
            <ButtonSalir />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
