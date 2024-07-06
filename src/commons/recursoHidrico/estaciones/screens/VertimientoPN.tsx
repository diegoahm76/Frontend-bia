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
  caudalAutorizadoVerter: string;
  vigenciaDesde: string;
  vigenciaHasta: string;
  tipoVertimiento: string;
  departamento: string;
  municipio: string;
  tipoCentroPobladoVertimiento: string;
  nombreCentroPobladoVertimiento: string;
  codigoFuente: string;
  tramo: string;
  empresaServicioAlcantarillado: string;
  tipoFlujo: string;
  tiempoDescarga: string;
  frecuencia: string;
  caudalDisenoST: string;
  pretratamiento: string;
  primario: string;
  secundario: string;
  terciario: string;
  otros: string;
  sistemaRefVertimiento: string;
  gradLatVertimiento: string;
  minLatVertimiento: string;
  segLatVertimiento: string;
  gradLonVertimiento: string;
  minLonVertimiento: string;
  segLonVertimiento: string;
  altitudVertimiento: string;
  descripcionAccesoVertimiento: string;
}


// export const Resultados: React.FC = () => {
export const VertimientoPN: React.FC = () => {
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
    { field: 'tipoUsuario', headerName: 'Tipo de Usuario', minWidth: 200 },
    { field: 'nombre', headerName: 'Nombre', minWidth: 250 },
    { field: 'apellido', headerName: 'Apellido', minWidth: 250 },
    { field: 'tipoIdentificacion', headerName: 'Tipo de Identificación', minWidth: 200 },
    { field: 'numeroIdentificacion', headerName: 'Número de Identificación', minWidth: 200 },
    { field: 'deptoCorrespondencia', headerName: 'Departamento de Correspondencia', minWidth: 250 },
    { field: 'municipioCorrespondencia', headerName: 'Municipio de Correspondencia', minWidth: 250 },
    { field: 'direccionCorrespondencia', headerName: 'Dirección de Correspondencia', minWidth: 300 },
    { field: 'email', headerName: 'Email', minWidth: 250 },
    { field: 'tel', headerName: 'Teléfono', minWidth: 200 },
    { field: 'nombrePredio', headerName: 'Nombre del Predio', minWidth: 200 },
    { field: 'deptoPredio', headerName: 'Departamento del Predio', minWidth: 200 },
    { field: 'municipioPredio', headerName: 'Municipio del Predio', minWidth: 200 },
    { field: 'cedulaCatastral', headerName: 'Cédula Catastral', minWidth: 200 },
    { field: 'matriculaInmobiliaria', headerName: 'Matrícula Inmobiliaria', minWidth: 250 },
    { field: 'direccionPredio', headerName: 'Dirección del Predio', minWidth: 300 },
    { field: 'sistemaRefPredio', headerName: 'Sistema de Referencia del Predio', minWidth: 250 },
    { field: 'numeroExpediente', headerName: 'Número del Expediente', minWidth: 200 },
    { field: 'numeroResolucion', headerName: 'Número de Resolución', minWidth: 200 },
    { field: 'caudalConcesionado', headerName: 'Caudal Concesionado', minWidth: 200 },
    { field: 'fuenteAbastecedora', headerName: 'Fuente Abastecedora', minWidth: 200 },
    { field: 'departamentoCaptacion', headerName: 'Departamento de Captación', minWidth: 250 },
    { field: 'municipioCaptacion', headerName: 'Municipio de Captación', minWidth: 250 },
    { field: 'sistemaRefCaptacion', headerName: 'Sistema de Referencia de Captación', minWidth: 250 },
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
    { id: 'tipoIdentificacion', label: 'Tipo de Identificación', minWidth: 200 },
    { id: 'numeroIdentificacion', label: 'Número de Identificación', minWidth: 200 },
    { id: 'deptoCorrespondencia', label: 'Depto de Correspondencia', minWidth: 200 },
    { id: 'municipioCorrespondencia', label: 'Municipio de Correspondencia', minWidth: 200 },
    { id: 'direccionCorrespondencia', label: 'Dirección Correspondencia', minWidth: 200 },
    { id: 'email', label: 'E-mail', minWidth: 200 },
    { id: 'tel', label: 'Tel', minWidth: 40 },
    { id: 'nombrePredio', label: 'Nombre Predio', minWidth: 300 },
    { id: 'tipoTenencia', label: 'Tipo Tenencia', minWidth: 200 },
    { id: 'deptoPredio', label: 'Depto Predio', minWidth: 200 },
    { id: 'municipioPredio', label: 'Municipio Predio', minWidth: 200 },
    { id: 'tipoCentroPoblado', label: 'Tipo Centro Poblado', minWidth: 200 },
    { id: 'nombreCentroPoblado', label: 'Nombre Centro Poblado', minWidth: 190 },
    { id: 'cedulaCatastral', label: 'Cédula Catastral', minWidth: 140 },
    { id: 'matriculaInmobiliaria', label: 'Matrícula Inmobiliaria', minWidth: 140 },
    { id: 'areaPredio', label: 'Área Predio (Ha)', minWidth: 100 },
    { id: 'direccionPredio', label: 'Dirección del Predio', minWidth: 300 },
    { id: 'clasificacionSuelo', label: 'Clasificación Suelo', minWidth: 200 },
    { id: 'sistemaRef', label: 'Sistema Ref', minWidth: 200 },
    { id: 'gradLat', label: 'Grad Lat', minWidth: 100 },
    { id: 'minLat', label: 'Min Lat', minWidth: 100 },
    { id: 'segLat', label: 'Seg Lat', minWidth: 100 },
    { id: 'gradLon', label: 'Grad Lon', minWidth: 100 },
    { id: 'minLon', label: 'Min Lon', minWidth: 100 },
    { id: 'segLon', label: 'Seg Lon', minWidth: 100 },
    { id: 'altitud', label: 'Altitud', minWidth: 100 },
    { id: 'descripcionPuntoAcceso', label: 'Descripción Punto Acceso', minWidth: 300 },
    { id: 'numeroExpediente', label: 'Número del Expediente', minWidth: 100 },
    { id: 'noResolucion', label: 'No. Resolución', minWidth: 100 },
    { id: 'fechaExpedicion', label: 'Fecha Expedición', minWidth: 100 },
    { id: 'caudalAutorizadoVerter', label: 'Caudal Autorizado Verter (lts/seg)', minWidth: 100 },
    { id: 'vigenciaDesde', label: 'Vigencia Desde', minWidth: 100 },
    { id: 'vigenciaHasta', label: 'Vigencia Hasta', minWidth: 100 },
    { id: 'tipoVertimiento', label: 'Tipo Vertimiento', minWidth: 200 },
    { id: 'departamento', label: 'Departamento', minWidth: 200 },
    { id: 'municipio', label: 'Municipio', minWidth: 200 },
    { id: 'tipoCentroPobladoVertimiento', label: 'Tipo Centro Poblado', minWidth: 200 },
    { id: 'nombreCentroPobladoVertimiento', label: 'Nombre Centro Poblado', minWidth: 190 },
    { id: 'codigoFuente', label: 'Código Fuente', minWidth: 100 },
    { id: 'tramo', label: 'Tramo', minWidth: 200 },
    { id: 'empresaServicioAlcantarillado', label: 'Empresa Servicio Alcantarillado', minWidth: 100 },
    { id: 'tipoFlujo', label: 'Tipo de Flujo', minWidth: 200 },
    { id: 'tiempoDescarga', label: 'Tiempo de Descarga (h/d)', minWidth: 100 },
    { id: 'frecuencia', label: 'Frecuencia (d/mes)', minWidth: 100 },
    { id: 'caudalDisenoST', label: 'Caudal Diseño ST (L/s)', minWidth: 100 },
    { id: 'pretratamiento', label: 'Pretratamiento', minWidth: 200 },
    { id: 'primario', label: 'Primario', minWidth: 200 },
    { id: 'secundario', label: 'Secundario', minWidth: 200 },
    { id: 'terciario', label: 'Terciario', minWidth: 200 },
    { id: 'otros', label: 'Otros', minWidth: 200 },
    { id: 'sistemaRefVertimiento', label: 'Sistema Ref', minWidth: 200 },
    { id: 'gradLatVertimiento', label: 'Grad Lat', minWidth: 100 },
    { id: 'minLatVertimiento', label: 'Min Lat', minWidth: 100 },
    { id: 'segLatVertimiento', label: 'Seg Lat', minWidth: 100 },
    { id: 'gradLonVertimiento', label: 'Grad Lon', minWidth: 100 },
    { id: 'minLonVertimiento', label: 'Min Lon', minWidth: 100 },
    { id: 'segLonVertimiento', label: 'Seg Lon', minWidth: 100 },
    { id: 'altitudVertimiento', label: 'Altitud', minWidth: 100 },
    { id: 'descripcionAccesoVertimiento', label: 'Descripción Acceso', minWidth: 300 }
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
          <Title title="VertimientoPN" />
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
                  <TableCell align="center" colSpan={8}>
                    <Box
                      component="section"
                      sx={{ p: 2, borderRight: '1px dashed grey' }}
                    >
                   INFORMACION VERTIMIENTO							

                    </Box>
                  </TableCell>

                  <TableCell align="center" colSpan={4}>
                    <Box
                      component="section"
                      sx={{ p: 2, borderRight: '1px dashed grey' }}
                    >
                      CARACTERISTICAS DEL VERTIMIENTO			

                    </Box>
                  </TableCell>







                  <TableCell align="center" colSpan={5}>
                    <Box
                      component="section"
                      sx={{ p: 2, borderRight: '1px dashed grey' }}
                    >
                     SISTEMA DE TRATAMIENTO				
	

                    </Box>
                  </TableCell>

                  <TableCell align="center" colSpan={9}>
                    <Box
                      component="section"
                      sx={{ p: 2, borderRight: '1px dashed grey' }}
                    >
                   GEOREFERENCIACION DEL VERTIMIENTO								
			
	

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
