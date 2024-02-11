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
  estado,
  Pqr,
  TipoPQRSDF,
  AsignacionEncuesta,
  FormData,
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
  Tooltip,
} from '@mui/material';
import {
  cargarAsignaciones,
  cargarestado,
  fetchSpqrs,
  fetchTipoPQRSDF,
} from '../services/consultainternoPqrsd.service';
import { useSelector } from 'react-redux';
import { AuthSlice } from '../../../auth/interfaces';
import { COLUMS_PQRSDF } from '../utils/columnsPqrsdf';
import { RenderDataGrid } from '../../tca/Atom/RenderDataGrid/RenderDataGrid';

export const ConsultaEstadoPQR: React.FC = () => {
  const {
    userinfo: { nombre_de_usuario, id_persona },
  } = useSelector((state: AuthSlice) => state.auth);

  const initialFormData: FormData = {
    id_persona_alertar: null,
    pqrs: '',
    estado: '',
    radicado: '',
    fecha_desde: '',
    fecha_hasta: '',
    organigrama: '',
    tipo_solicitud: '',
    estado_solicitud: '',
  };

  //* ESTADOS NECESARIOS PARA EL FUNCIONAMIENTO DEL COMPONENTE

  const [asignaciones, setAsignaciones] = useState<AsignacionEncuesta[]>([]);
  const [formData, setFormData] = useState(initialFormData);
  const [estado, setestado] = useState<estado[]>([]);
  const [tipoPQRSDF, setTipoPQRSDF] = useState<TipoPQRSDF[]>([]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Efecto para cargar los datos del pqrs
  const [pqrss, setpqrs] = useState<Pqr[]>([]);
  useEffect(() => {
    fetchSpqrs({ setpqrs });
  }, []);

  //Tipo de PQRSDF

  useEffect(() => {
    fetchTipoPQRSDF({ setTipoPQRSDF });
  }, []);
  //Estado

  useEffect(() => {
    cargarestado({ setestado });
  }, []);
  const handleResetForm = () => {
    setFormData(initialFormData);
    ({
      setAsignaciones: setAsignaciones,
      formData: formData,
    });
  };

  //* columns for the data grid in pqrsdf

  const columns = [
    ...COLUMS_PQRSDF,
    {
      field: 'ruta_archivo',
      headerName: 'Archivo',
      width: 200,
      flex: 1,
      renderCell: (params: any) => (
        <Tooltip
          title={
            params.row.URL_Documento === null
              ? 'No hay documento disponible para descargar' // si no hay documento
              : 'Descargar documento' // si hay documento
          }
        >
          <DownloadButton
            condition={params.row.URL_Documento === null}
            fileUrl={params.row.Archivo.ruta_archivo}
            fileName={params?.value?.Id_PQRSDF}
          />
        </Tooltip>
      ),
    },
  ];

  //* columns for the data grid in tramites

  //* columns for the datagrid in otros

  //* columns for the datagrid in OPAS

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
          <Title title="Consultar estado de una solicitud - usuario interno" />
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
          <Title title="Filtro de búsqueda" />
        </Grid>

        {/* filtros para pqrsdf */}

        {/* espacio para los inputs de busqueda */}

        {/* filtros para pqrsdf */}

        {/* el tipo de solicitud va a seguir como una constante, no va a cambiar en ninguna de las vistas */}

        {/* constantes */}
        <Grid item xs={12} sm={3}>
          <FormControl size="small" fullWidth>
            <InputLabel>Tipos de solicitud</InputLabel>
            <Select
              onChange={handleInputChange}
              value={formData.tipo_solicitud}
              name="tipo_solicitud"
              label="tipo_solicitud"
            >
              {tipoPQRSDF.map((tipo_solicitud) => (
                <MenuItem
                  key={tipo_solicitud.codigo}
                  value={tipo_solicitud.codigo}
                >
                  {tipo_solicitud.descripcion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

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
            label="Fecha hasta"
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
        {/* constantes */}

        {/* filtros para pqrsdf */}

        <Grid item xs={12} sm={3}>
          <FormControl size="small" fullWidth>
            <InputLabel>PQRS</InputLabel>
            <Select
              onChange={handleInputChange}
              value={formData.pqrs}
              name="pqrs"
              label="PQRS"
            >
              {pqrss.map((pqrs) => (
                <MenuItem key={pqrs.value} value={pqrs.value}>
                  {pqrs.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
              {estado.map((estado) => (
                <MenuItem
                  key={estado.id_estado_solicitud}
                  value={estado.nombre}
                >
                  {estado.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* filtros para pqrsdf */}

        {/* botones de interacción con el usuario */}

        <Grid item>
          <Button
            variant="outlined"
            startIcon={<CleanIcon />}
            onClick={() => {
              handleResetForm();
            }}
          >
            Limpiar campos
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            startIcon={<SearchIcon />}
            sx={{
              my: '2rem',
            }}
            onClick={() => {
              cargarAsignaciones({
                setAsignaciones: setAsignaciones,
                formData: formData,
                id_persona: id_persona,
              });
            }}
          >
            BUSCAR
          </Button>
        </Grid>
      </Grid>

      {/* listado de opciones, render de datos para cada busqueda */}

      <Grid item xs={12} sm={12}>
        <RenderDataGrid
          title="Resultado de la búsqueda"
          columns={[]} // se debe realizar condicionales para las columnas, ya que por cada busqueda se llaman servicios diferentes
          rows={[]} // en las rows se debe realizar condicionales para las columnas, ya que por cada busqueda se llaman servicios diferentes
        />
      </Grid>
    </>
  );
};
