/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { Title } from '../../../../components';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {
  Dialog,
  Button,
  FormControl,
  Grid,
  Box,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ButtonGroup,
} from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { api } from '../../../../api/axios';
import { RenderDataGrid } from '../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import { control_error, control_success } from '../../../../helpers';

import {
  DataGrid,
  GridRenderCellParams,
  type GridColDef,
} from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';

import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
// import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';

export interface Rubrog {
  cod_pre: any;
  cuenta: any;
  id_plan: any;
  id_rubro: any;
}
export interface Concepto {
  tipoUsuario: string;
  nombre: string;
  apellido: string;
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  deptoCorrespondencia: string;
  municipioCorrespondencia: string;
  direccionCorrespondencia: string;
  email: string;
  tel: string | null;
  nombrePredio: string;
  deptoPredio: string;
  municipioPredio: string;
  cedulaCatastral: string;
  matriculaInmobiliaria: string;
  direccionPredio: string;
  sistemaRefPredio: string;
  numeroExpediente: string | null;
  numeroResolucion: string | null;
  caudalConcesionado: string | null;
  fuenteAbastecedora: string;
  departamentoCaptacion: string;
  municipioCaptacion: string;
  sistemaRefCaptacion: string;
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
export interface UnidadOrganizaciona {
  nombre: string;
  id_unidad_organizacional: number;
}
export interface FormData {
  perosna: any;
  inicio: any;
  fin: any;
  tramite: any;
}
interface Modalidad {
  id_modalidad: number;
  nombre_modalidad: string;
  codigo_modalidad: string;
  activo: boolean;
  item_ya_usado: boolean;
  registro_precargado: boolean;
}

interface ConceptoPoai {
  cod_pre: any;
  cuenta: any;
  id_plan: any;
}

// export const Resultados: React.FC = () => {
export const PlanesSirh: React.FC = () => {
  const initialFormData: FormData = {
    perosna: '',
    tramite: '',
    inicio: '',
    fin: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputSelect = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const initialConceptoPoai: ConceptoPoai = {
    cod_pre: '',
    cuenta: '',
    id_plan: '',
  };
  const [conceptoPoai, setConceptoPoai] =
    useState<ConceptoPoai>(initialConceptoPoai);
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    const numberFields = [''];
    const booleanFields = ['vadicion1'];

    const convertValue = (name: string, value: unknown): any => {
      if (numberFields.includes(name)) {
        return value === '' ? null : Number(value);
      } else if (booleanFields.includes(name)) {
        return value === 'true' || value === '1' ? true : false;
      } else {
        return value;
      }
    };

    setConceptoPoai({
      ...conceptoPoai,
      [name as string]: convertValue(name as string, value),
    });
  };

  const [selecTodosId, setSelecTodosId] = useState<any>('');

  useEffect(() => {
    if (selecTodosId) {
      setConceptoPoai({
        cod_pre: selecTodosId.cod_pre,
        cuenta: selecTodosId.cuenta,
        id_plan: selecTodosId.id_plan,
      });
    }
  }, [selecTodosId]);

  const [abrir0, setabrir0] = useState(false);
  const [abrir1, setabrir1] = useState(false);
  const handlcerrar = () => {
    setabrir1(false);
    setabrir0(false);
  };

  //   /api/hidrico/zonas-hidricas/SIRH/captacionPN/ 1 1

  // /api/hidrico/zonas-hidricas/SIRH/vertimientoPN/ 1 2

  //  /api/hidrico/zonas-hidricas/SIRH/captacionPJ/ 2 1

  // /api/hidrico/zonas-hidricas/SIRH/vertimientoPJ/ 2 2

  //   {formData.perosna}

  //   {formData.tramite}

  const [Historico, setHistorico] = useState<Concepto[]>([]);

  const fetchHistorico = async (): Promise<void> => {
    try {
      //   const url =
      //   `hidrico/zonas-hidricas/SIRH/captacionPN/`;
      let url = '';

      if (formData.perosna === '1' && formData.tramite === '1') {
        url = `hidrico/zonas-hidricas/SIRH/captacionPN/?fecha_inicio=${formData.inicio}&fecha_fin=${formData.fin}`;
      } else if (formData.perosna === '1' && formData.tramite === '2') {
        url = `hidrico/zonas-hidricas/SIRH/vertimientoPN/?fecha_inicio=${formData.inicio}&fecha_fin=${formData.fin}`;
      } else if (formData.perosna === '2' && formData.tramite === '1') {
        url = `hidrico/zonas-hidricas/SIRH/captacionPJ/?fecha_inicio=${formData.inicio}&fecha_fin=${formData.fin}`;
      } else if (formData.perosna === '2' && formData.tramite === '2') {
        url = `hidrico/zonas-hidricas/SIRH/vertimientoPJ/?fecha_inicio=${formData.inicio}&fecha_fin=${formData.fin}`;
      } else {
        console.error('Invalid formData values:', formData);
        return; // Termina la ejecución si los valores no son válidos
      }

      const res = await api.get(url);
      const data = res.data?.data || [];

      const HistoricoData: Concepto[] = data.map((item: any) => ({
        nombre: item['INFORMACION DE USUARIO']['NOMBRE'],
        numeroIdentificacion:
          item['INFORMACION DE USUARIO']['NUMERO DE IDENTIFICACION'],
        municipioCorrespondencia:
          item['INFORMACION DE USUARIO']['MUNICIPIO DE CORRESPONDENCIA'],
        direccionCorrespondencia:
          item['INFORMACION DE USUARIO']['DIRECCION CORRESPONDENCIA'],
        nombrePredio: item['INFORMACION DEL PREDIO']['NOMBRE PREDIO'],
        cedulaCatastral: item['INFORMACION DEL PREDIO']['CEDULA CATASTRAL'],
        numeroExpediente: item['INFORMACION PERMISO']['NÚMERO DEL EXPEDIENTE'],
        numeroResolucion: item['INFORMACION PERMISO']['No. RESOLUCION'],

        fechaexpediente: item['INFORMACION PERMISO']['FECHA EXPEDICION'],
      }));
      setabrir0(true);
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
    { field: 'nombre', headerName: 'Nombre de usuario', minWidth: 250 },
    {
      field: 'numeroIdentificacion',
      headerName: 'Número de Identificación',
      minWidth: 200,
    },
    {
      field: 'municipioCorrespondencia',
      headerName: 'Municipio ',
      minWidth: 250,
    },
    {
      field: 'direccionCorrespondencia',
      headerName: 'Dirección ',
      minWidth: 300,
    },
    { field: 'nombrePredio', headerName: 'Nombre del Predio', minWidth: 200 },
    { field: 'cedulaCatastral', headerName: 'Cédula Catastral', minWidth: 200 },
    {
      field: 'numeroExpediente',
      headerName: 'Número del Expediente',
      minWidth: 200,
    },
    {
      field: 'numeroResolucion',
      headerName: 'Número de Resolución',
      minWidth: 200,
    },
    {
      field: 'fechaexpediente',
      headerName: 'Fecha resolución ',
      minWidth: 200,
    },
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
    { id: 'nombre', label: 'Nombre', minWidth: 250 },
    { id: 'apellido', label: 'Apellido', minWidth: 250 },
    {
      id: 'tipoIdentificacion',
      label: 'Tipo de Identificación',
      minWidth: 250,
    },
    {
      id: 'numeroIdentificacion',
      label: 'Número de Identificación',
      minWidth: 200,
    },
    {
      id: 'deptoCorrespondencia',
      label: 'Depto Correspondencia',
      minWidth: 250,
    },
    {
      id: 'municipioCorrespondencia',
      label: 'Municipio Correspondencia',
      minWidth: 250,
    },
    {
      id: 'direccionCorrespondencia',
      label: 'Dirección Correspondencia',
      minWidth: 200,
    },
    { id: 'email', label: 'Email', minWidth: 200 },
    { id: 'tel', label: 'Teléfono', minWidth: 250 },
    { id: 'nombrePredio', label: 'Nombre del Predio', minWidth: 200 },
    { id: 'deptoPredio', label: 'Depto Predio', minWidth: 250 },
    { id: 'municipioPredio', label: 'Municipio Predio', minWidth: 250 },
    { id: 'cedulaCatastral', label: 'Cédula Catastral', minWidth: 200 },
    {
      id: 'matriculaInmobiliaria',
      label: 'Matrícula Inmobiliaria',
      minWidth: 200,
    },
    { id: 'direccionPredio', label: 'Dirección del Predio', minWidth: 200 },
    { id: 'sistemaRefPredio', label: 'Sistema Ref Predio', minWidth: 250 },
    { id: 'numeroExpediente', label: 'Número de Expediente', minWidth: 250 },
    { id: 'numeroResolucion', label: 'Número de Resolución', minWidth: 250 },
    { id: 'caudalConcesionado', label: 'Caudal Concesionado', minWidth: 250 },
    { id: 'fuenteAbastecedora', label: 'Fuente Abastecedora', minWidth: 200 },
    {
      id: 'departamentoCaptacion',
      label: 'Departamento Captación',
      minWidth: 250,
    },
    { id: 'municipioCaptacion', label: 'Municipio Captación', minWidth: 250 },
    {
      id: 'sistemaRefCaptacion',
      label: 'Sistema Ref Captación',
      minWidth: 250,
    },
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

  const isButtonDisabled = !formData.perosna || !formData.tramite;

  const handleLimpiarClick = () => {
    setabrir0(false)
    setFormData((prevData: any) => ({
      ...prevData,
      perosna: '',
      tramite: '',
      inicio: '',
      fin: '',
    }));
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
          <Title title="Panel SIRH" />
        </Grid>
      </Grid>

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
          <Title title="Seleccione Trámite y/o Servicio Ambiental" />
        </Grid>
        {/* {selectedConceptoId} */}

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="opcion-select-label">Tipo de persona </InputLabel>
            <Select
              labelId="Plantilla"
              // value={perosna}
              name="perosna"
              value={formData.perosna}
              onChange={handleInputSelect}
              label="Tipo de persona"
              // onChange={handleChange}
            >
              <MenuItem value="1">Natural </MenuItem>

              <MenuItem value="2">Juridico </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="opcion-select-label">Tramite </InputLabel>
            <Select
              labelId="Plantilla"
              name="tramite"
              value={formData.tramite}
              onChange={handleInputSelect}
              label="recuros"
              // onChange={handleChange}
            >
              <MenuItem value="1">Concesión de aguas superficiales </MenuItem>

              <MenuItem value="2">Vertimiento al agua </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            size="small"
            variant="outlined"
            label="Fecha inicio   "
            InputLabelProps={{ shrink: true }}
            name="inicio"
            value={formData.inicio}
            onChange={handleInputSelect}
          />
        </Grid>
        {/* {formData.inicio} */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            size="small"
            variant="outlined"
            label="Fecha fin "
            name="fin"
            InputLabelProps={{ shrink: true }}
            value={formData.fin}
            onChange={handleInputSelect}
          />
        </Grid>
        {/* {formData.fin} */}
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
              disabled={isButtonDisabled}
              onClick={fetchHistorico}
            >
              Buscar eemento
            </Button>
          </Grid>

          <Grid item>
            <Button
              //   color="warning"
              variant="outlined"
              fullWidth
              startIcon={<CleanIcon />}
              onClick={handleLimpiarClick}
            >
              Limpiar
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {abrir0 && (
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
            <RenderDataGrid
              title="Generar Reporte SIRH "
              columns={columnstabla ?? []}
              rows={Historico ?? []}
            />

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
                  onClick={handlcerrar}
                  startIcon={<ClearIcon />}
                >
                  cerrar
                </Button>
              </Grid>

              <Grid item xs={12} sm={1}>
                <ButtonSalir />
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
