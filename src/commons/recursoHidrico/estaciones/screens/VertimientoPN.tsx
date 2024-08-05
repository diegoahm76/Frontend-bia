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
  tipoUsuario:any;
  nombre: any;
  apellido: any;
  tipoIdentificacion:any;
  numeroIdentificacion:any;
  deptoCorrespondencia:any;
  municipioCorrespondencia:any;
  direccionCorrespondencia:any;
  email: any;
  tel:any;
  nombrePredio: any;
  deptoPredio:any;
  municipioPredio: any;
  cedulaCatastral: any;
  matriculaInmobiliaria:any;
  direccionPredio: any;
  sistemaRefPredio:any;
  numeroExpediente:any;
  tipoFlujo: any;
  tiempoDescarga: any;
  frecuencia: any;
  caudalDisenoST:any;
  sistemaRefVertimiento:any;


  numeroResolucion: any;
  tipoVertimiento:any;
  fechaExpedicion: any;
  caudalConcesionado: any;
  caudalAutorizadoVerter:any;
  fuenteAbastecedora:any;
  departamentoCaptacion:any;
  municipioCaptacion:any;
    departamento: any;
  sistemaRefCaptacion:any;
}


// export const Resultados: React.FC = () => {
export const VertimientoPN: React.FC = () => {
  const [Historico, setHistorico] = useState<Concepto[]>([]);

  const fetchHistorico = async (): Promise<void> => {
    try {
      const url = `hidrico/zonas-hidricas/SIRH/vertimientoPN/`;
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
        tipoFlujo: item['CARACTERISTICAS DEL VERTIMIENTO']['Tipo de flujo'],
        tiempoDescarga: item['CARACTERISTICAS DEL VERTIMIENTO']['Tiempo de descarga'],
        frecuencia: item['CARACTERISTICAS DEL VERTIMIENTO']['Frecuencia'],
        caudalDisenoST: item['CARACTERISTICAS DEL VERTIMIENTO']['Caudal diseño STD'],
        sistemaRefVertimiento: item['GEOREFERENCIACION DEL VERTIMIENTO']['SISTEMA REF'],


        numeroResolucion: item['INFORMACION PERMISO']['No. RESOLUCION'],
        tipoVertimiento: item['INFORMACION PERMISO']['TIPO VERTIMIENTO'],
        fechaExpedicion: item['INFORMACION PERMISO']['FECHA EXPEDICION'],
        caudalConcesionado: item['INFORMACION PERMISO']['CAUDAL CONCESIONADO'],
        caudalAutorizadoVerter: item['INFORMACION PERMISO']['CAUDAL AUTORIZADO VERTER'],
         
       
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
    { field: 'tel', headerName: 'Tel', minWidth: 200 },
    { field: 'nombrePredio', headerName: 'Nombre Predio', minWidth: 250 },

    // { field: 'tipoTenencia', headerName: 'Tipo Tenencia', minWidth: 200 },

    { field: 'deptoPredio', headerName: 'Depto Predio', minWidth: 200 },
    { field: 'municipioPredio', headerName: 'Municipio Predio', minWidth: 200 },

    // { field: 'tipoCentroPoblado', headerName: 'Tipo Centro Poblado', minWidth: 200 },
    // { field: 'nombreCentroPoblado', headerName: 'Nombre Centro Poblado', minWidth: 190 },

    { field: 'cedulaCatastral', headerName: 'Cédula Catastral', minWidth: 140 },
    { field: 'matriculaInmobiliaria', headerName: 'Matrícula Inmobiliaria', minWidth: 140 },

    // { field: 'areaPredio', headerName: 'Área Predio (Ha)', minWidth: 450 },

    { field: 'direccionPredio', headerName: 'Dirección del Predio', minWidth: 250 },

    // { field: 'clasificacionSuelo', headerName: 'Clasificación Suelo', minWidth: 200 },
    // { field: 'sistemaRef', headerName: 'Sistema Ref', minWidth: 200 },
    // { field: 'gradLat', headerName: 'Grad Lat', minWidth: 250 },
  // { field: 'minLat', headerName: 'Min Lat', minWidth: 250 },
    // { field: 'segLat', headerName: 'Seg Lat', minWidth: 250 },
    // { field: 'gradLon', headerName: 'Grad Lon', minWidth: 250 },
    // { field: 'minLon', headerName: 'Min Lon', minWidth: 250 },
    // { field: 'segLon', headerName: 'Seg Lon', minWidth: 250 },
    // { field: 'altitud', headerName: 'Altitud', minWidth: 250 },
    // { field: 'descripcionPuntoAcceso', headerName: 'Descripción Punto Acceso', minWidth: 250 },
  
    { field: 'numeroExpediente', headerName: 'Número del Expediente', minWidth: 250 },
    { field: 'numeroResolucion', headerName: 'No. Resolución', minWidth: 250 },
    { field: 'fechaExpedicion', headerName: 'Fecha Expedición', minWidth: 250 },
    { field: 'caudalAutorizadoVerter', headerName: 'Caudal Autorizado Verter (lts/seg)', minWidth: 250 },


    // { field: 'vigenciaDesde', headerName: 'Vigencia Desde', minWidth: 250 },
    // { field: 'vigenciaHasta', headerName: 'Vigencia Hasta', minWidth: 250 },

    { field: 'tipoVertimiento', headerName: 'Tipo Vertimiento', minWidth: 200 },
    { field: 'departamento', headerName: 'Departamento', minWidth: 200 },
    { field: 'municipioCaptacion', headerName: 'Municipio', minWidth: 200 },

    // { field: 'tipoCentroPobladoVertimiento', headerName: 'Tipo Centro Poblado', minWidth: 200 },
    // { field: 'nombreCentroPobladoVertimiento', headerName: 'Nombre Centro Poblado', minWidth: 190 },
    // { field: 'codigoFuente', headerName: 'Código Fuente', minWidth: 250 },
    // { field: 'tramo', headerName: 'Tramo', minWidth: 200 },
    // { field: 'empresaServicioAlcantarillado', headerName: 'Empresa Servicio Alcantarillado', minWidth: 250 },

    { field: 'tipoFlujo', headerName: 'Tipo de Flujo', minWidth: 200 },
    { field: 'tiempoDescarga', headerName: 'Tiempo de Descarga (h/d)', minWidth: 250 },
    { field: 'frecuencia', headerName: 'Frecuencia (d/mes)', minWidth: 250 },
    { field: 'caudalDisenoST', headerName: 'Caudal Diseño ST (L/s)', minWidth: 250 },

    // { field: 'pretratamiento', headerName: 'Pretratamiento', minWidth: 200 },
    // { field: 'primario', headerName: 'Primario', minWidth: 200 },
    // { field: 'secundario', headerName: 'Secundario', minWidth: 200 },
    // { field: 'terciario', headerName: 'Terciario', minWidth: 200 },
    // { field: 'otros', headerName: 'Otros', minWidth: 200 },

    // { field: 'sistemaRefVertimiento', headerName: 'Sistema Ref', minWidth: 200 },

    // { field: 'gradLatVertimiento', headerName: 'Grad Lat', minWidth: 250 },
    // { field: 'minLatVertimiento', headerName: 'Min Lat', minWidth: 250 },
    // { field: 'segLatVertimiento', headerName: 'Seg Lat', minWidth: 250 },
    // { field: 'gradLonVertimiento', headerName: 'Grad Lon', minWidth: 250 },
    // { field: 'minLonVertimiento', headerName: 'Min Lon', minWidth: 250 },
    // { field: 'segLonVertimiento', headerName: 'Seg Lon', minWidth: 250 },
    // { field: 'altitudVertimiento', headerName: 'Altitud', minWidth: 250 },
    // { field: 'descripcionAccesoVertimiento', headerName: 'Descripción Acceso', minWidth: 250 }
];

  
  interface Column {
    id: keyof Concepto; // Cambia a 'keyof Concepto' para que los IDs sean las claves del tipo 'Concepto'
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: any) => string; // Ajusta el tipo del valor de formato según sea necesario
  }

  const columns: Column[] = [
    { id: 'tipoUsuario', label: 'Tipo de Usuario', minWidth: 250},
    { id: 'nombre', label: 'Nombre', minWidth: 200 },
    { id: 'apellido', label: 'Apellido', minWidth: 200 },
    { id: 'tipoIdentificacion', label: 'Tipo de Identificación', minWidth: 200 },
    { id: 'numeroIdentificacion', label: 'Número de Identificación', minWidth: 200 },
    { id: 'deptoCorrespondencia', label: 'Depto de Correspondencia', minWidth: 200 },
    { id: 'municipioCorrespondencia', label: 'Municipio de Correspondencia', minWidth: 200 },
    { id: 'direccionCorrespondencia', label: 'Dirección Correspondencia', minWidth: 200 },
    { id: 'email', label: 'E-mail', minWidth: 200 },
    { id: 'tel', label: 'Tel', minWidth: 200 },
    { id: 'nombrePredio', label: 'Nombre Predio', minWidth: 250 },


    // { id: 'tipoTenencia', label: 'Tipo Tenencia', minWidth: 200 },

    { id: 'deptoPredio', label: 'Depto Predio', minWidth: 200 },
    { id: 'municipioPredio', label: 'Municipio Predio', minWidth: 200 },

    // { id: 'tipoCentroPoblado', label: 'Tipo Centro Poblado', minWidth: 200 },
    // { id: 'nombreCentroPoblado', label: 'Nombre Centro Poblado', minWidth: 190 },

    { id: 'cedulaCatastral', label: 'Cédula Catastral', minWidth: 140 },
    { id: 'matriculaInmobiliaria', label: 'Matrícula Inmobiliaria', minWidth: 140 },

    // { id: 'areaPredio', label: 'Área Predio (Ha)', minWidth: 450},

    { id: 'direccionPredio', label: 'Dirección del Predio', minWidth: 250 },
    
    // { id: 'clasificacionSuelo', label: 'Clasificación Suelo', minWidth: 200 },
    // { id: 'sistemaRef', label: 'Sistema Ref', minWidth: 200 },
    // { id: 'gradLat', label: 'Grad Lat', minWidth: 250},
    // { id: 'minLat', label: 'Min Lat', minWidth: 250},
    // { id: 'segLat', label: 'Seg Lat', minWidth: 250},
    // { id: 'gradLon', label: 'Grad Lon', minWidth: 250},
    // { id: 'minLon', label: 'Min Lon', minWidth: 250},
    // { id: 'segLon', label: 'Seg Lon', minWidth: 250},
    // { id: 'altitud', label: 'Altitud', minWidth: 250},
    // { id: 'descripcionPuntoAcceso', label: 'Descripción Punto Acceso', minWidth: 250 },
    { id: 'numeroExpediente', label: 'Número del Expediente', minWidth: 250},
    // { id: 'noResolucion', label: 'No. Resolución', minWidth: 250},
    { id: 'fechaExpedicion', label: 'Fecha Expedición', minWidth: 250},
    { id: 'caudalAutorizadoVerter', label: 'Caudal Autorizado Verter (lts/seg)', minWidth: 250},
    // { id: 'vigenciaDesde', label: 'Vigencia Desde', minWidth: 250},
    // { id: 'vigenciaHasta', label: 'Vigencia Hasta', minWidth: 250},
    { id: 'tipoVertimiento', label: 'Tipo Vertimiento', minWidth: 200 },
    { id: 'departamento', label: 'Departamento', minWidth: 200 },
    // { id: 'municipio', label: 'Municipio', minWidth: 200 },
    // { id: 'tipoCentroPobladoVertimiento', label: 'Tipo Centro Poblado', minWidth: 200 },
    // { id: 'nombreCentroPobladoVertimiento', label: 'Nombre Centro Poblado', minWidth: 190 },
    // { id: 'codigoFuente', label: 'Código Fuente', minWidth: 250},
    // { id: 'tramo', label: 'Tramo', minWidth: 200 },
    // { id: 'empresaServicioAlcantarillado', label: 'Empresa Servicio Alcantarillado', minWidth: 250},
    { id: 'tipoFlujo', label: 'Tipo de Flujo', minWidth: 200 },
    { id: 'tiempoDescarga', label: 'Tiempo de Descarga (h/d)', minWidth: 250},
    { id: 'frecuencia', label: 'Frecuencia (d/mes)', minWidth: 250},
    { id: 'caudalDisenoST', label: 'Caudal Diseño ST (L/s)', minWidth: 250},
    // { id: 'pretratamiento', label: 'Pretratamiento', minWidth: 200 },
    // { id: 'primario', label: 'Primario', minWidth: 200 },
    // { id: 'secundario', label: 'Secundario', minWidth: 200 },
    // { id: 'terciario', label: 'Terciario', minWidth: 200 },
    // { id: 'otros', label: 'Otros', minWidth: 200 },
    { id: 'sistemaRefVertimiento', label: 'Sistema Ref', minWidth: 200 },
    // { id: 'gradLatVertimiento', label: 'Grad Lat', minWidth: 250},
    // { id: 'minLatVertimiento', label: 'Min Lat', minWidth: 250},
    // { id: 'segLatVertimiento', label: 'Seg Lat', minWidth: 250},
    // { id: 'gradLonVertimiento', label: 'Grad Lon', minWidth: 250},
    // { id: 'minLonVertimiento', label: 'Min Lon', minWidth: 250},
    // { id: 'segLonVertimiento', label: 'Seg Lon', minWidth: 250},
    // { id: 'altitudVertimiento', label: 'Altitud', minWidth: 250},
    // { id: 'descripcionAccesoVertimiento', label: 'Descripción Acceso', minWidth: 250}
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
