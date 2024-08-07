/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { GridRenderCellParams } from '@mui/x-data-grid';

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { SearchOutlined } from '@mui/icons-material';
import CleanIcon from '@mui/icons-material/CleaningServices';
import {
  Button,
  Dialog,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { FormControl } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { api } from '../../../api/axios';
import { Title } from '../../../components/Title';
import { control_error, control_success } from '../../../helpers';

import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import { miEstilo } from '../../gestorDocumental/Encuesta/interfaces/types';
import { RenderDataGrid } from '../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
interface Solicitud {
  id_medio_solicitud: any;
  nombre: any;
  aplica_para_pqrsdf: any;
  aplica_para_tramites: any;
  aplica_para_otros: any;
  registro_precargado: any;
  activo: any;
  item_ya_usado: any;
}
export interface SucursalEmpresa {
  id_sucursal_empresa: number;
  numero_sucursal: number;
  descripcion_sucursal: string;
  direccion: string;
}




export interface FormData {
  selectedCuenca: any;
  nombre_tipo_uso_agua: any;
  id_sub_zona_hidrica: any;
  id_zona_hidrica: any;
  id_cuenca: any;
}
export const UsoAgua: React.FC = () => {
  const initialFormData: FormData = {
    selectedCuenca: null,
    id_zona_hidrica: '',
    id_sub_zona_hidrica: '',
    nombre_tipo_uso_agua: '',
    id_cuenca: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [editar, seteditar] = useState(false);
  const [id_editar, setid_editar] = useState(false);

  const columns = [
    { field: 'id_cuenca', headerName: 'id_cuenca', flex: 1 },
    { field: 'id_tipo_uso_agua', headerName: 'id_tipo_uso_agua', flex: 1 },

    {
      field: 'nombre_tipo_uso_agua',
      headerName: 'nombre_tipo_uso_agua',
      flex: 1,
    },
    {
      field: 'Acciones',
      headerName: 'Acciones',

      flex: 1,
      renderCell: (params: any) => (
        <>
    
          <IconButton color="primary" onClick={() => {
    setModo('Editar'),
    setid_editar(params.row.id_tipo_uso_agua), seteditar(params.row)}}>
            <EditIcon />
          </IconButton>

          <IconButton
            color="error"
            // onClick={() => handleEliminarConfiguracion(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
  const [modo, setModo] = useState<'Crear' | 'Editar' | null>("Crear");

  const [cuencas, setCuencas] = useState<any[]>([]);
  const fetchCuencas = async (): Promise<void> => {
    try {
      const url = '/hidrico/zonas-hidricas/macro-cuencas/get/';
      const res = await api.get(url);
      const cuencasData: any[] = res.data?.data || [];
      setCuencas(cuencasData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    void fetchCuencas();
  }, []);

  const [Historico, setHistorico] = useState<any[]>([]);
  const fetchHistorico = async (): Promise<void> => {
    try {
      const url = `hidrico/zonas-hidricas/tipos_uso_agua/`;

      // `/seguimiento-planes/consultar-conceptos-poai-lista/?id_plan=${formData.plan}&id_proyecto=${formData.proyecto}&id_indicador=${formData.indicador}&id_meta=${formData.meta}`
      const res = await api.get(url);
      const HistoricoData: any[] = res.data?.data || [];
      setHistorico(HistoricoData);

      control_success('Datos encontrados con exito');
    } catch (error: any) {
      setHistorico([]);
      // console.error(error);

      control_error(error.response.data.detail);
    }
  };

  useEffect(() => {
    fetchHistorico();
  }, []);

  const [zonahidrica, setZonahidrica] = useState<any[]>([]);

  const fetchZonahidricas = async (): Promise<void> => {
    try {
      const url = `/hidrico/zonas-hidricas/zona_hidrica/get/${formData.selectedCuenca}/`;
      const res = await api.get(url);
      const zonahidricaData: any[] = res.data?.data || [];
      setZonahidrica(zonahidricaData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void fetchZonahidricas();
  }, [formData.selectedCuenca]);

  const [zonasHidricas, setZonasHidricas] = useState<any[]>([]);
  const fetchZonasHidricas2 = async (): Promise<void> => {
    try {
      const url = `/hidrico/zonas-hidricas/subZonahidrica/get/${formData.id_zona_hidrica}/`;
      const res = await api.get(url);
      const zonasHidricasData: any[] = res.data?.data || [];
      setZonasHidricas(zonasHidricasData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchZonasHidricas2();
  }, [formData.id_zona_hidrica]);

  const [rios, setrios] = useState<any[]>([]);
  const fetchrios = async (): Promise<void> => {
    try {
      const url = `/hidrico/zonas-hidricas/cuencas/get/${formData.id_sub_zona_hidrica}/`;
      const res = await api.get(url);
      const zonasHidricasData: any[] = res.data?.data || [];
      setrios(zonasHidricasData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchrios();
  }, [formData.id_sub_zona_hidrica]);


  const handleSubmitCrear = async () => {
    try {
      const url = 'hidrico/zonas-hidricas/tipos_uso_agua/';
      const response = await api.post(url, formData);
      control_success('Guardado exitosamente');
      fetchHistorico()
    } catch (error: any) {
      //  console.log('')(error.response.data.detail.detail);
      control_error(error.response.data.detail?.error);
    }
  };

  const handleSubmit = async () => {
    try {
      const url = `hidrico/zonas-hidricas/tipos_uso_agua/${id_editar}/`;
      await api.put(url, formData);
      control_success('Editado  exitosamente');
      setModo('Crear'),
      fetchHistorico();
    } catch (error: any) {
      console.error('Error al actualizar la configuración', error);
      control_error(error.response.data.detail);
    }
  };

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
          <Title title="Profesionales" />
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl required size="small" fullWidth>
            <InputLabel id="select-cuenca-label">Macro cuenca</InputLabel>
            <Select
              labelId="Macro cuenca"
              id="select-cuenca"
              value={formData.selectedCuenca}
              label="Macro cuenca"
              name="selectedCuenca"
              onChange={handleInputChange}
            >
              {cuencas.map((cuenca) => (
                <MenuItem
                  key={cuenca.id_macro_cuenca}
                  value={cuenca.id_macro_cuenca}
                >
                  {cuenca.nombre_macro_cuenca}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* {formData.selectedCuenca} */}

        <Grid item xs={12} sm={4}>
          {/* Select para Zona Hidrica */}
          <FormControl required size="small" fullWidth>
            <InputLabel id="select-zonahidrica-label">Zona Hídrica</InputLabel>
            <Select
              labelId="select-zonahidrica-label"
              id="id_zona_hidrica"
              value={formData.id_zona_hidrica}
              label="Zona Hidrica"
              name="id_zona_hidrica"
              onChange={handleInputChange}
            >
              {zonahidrica.map((zona) => (
                <MenuItem
                  key={zona.id_zona_hidrica}
                  value={zona.id_zona_hidrica}
                >
                  {zona.nombre_zona_hidrica}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl required size="small" fullWidth>
            <InputLabel id="select-zonahidrica-label">
              sub zona hidrica
            </InputLabel>
            <Select
              labelId="select-zonahidrica-label"
              id="id_zona_hidrica"
              value={formData.id_sub_zona_hidrica}
              label="id_sub_zona_hidrica"
              name="id_sub_zona_hidrica"
              onChange={handleInputChange}
            >
              {zonasHidricas.map((zona) => (
                <MenuItem
                  key={zona.id_zona_hidrica}
                  value={zona.id_sub_zona_hidrica}
                >
                  {zona.nombre_sub_zona_hidrica}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl required size="small" fullWidth>
            <InputLabel id="select-zonahidrica-label">Cuenca</InputLabel>
            <Select
              labelId="select-zonahidrica-label"
              id="id_zona_hidrica"
              value={formData.id_cuenca}
              label="id_cuenca"
              name="id_cuenca"
              onChange={handleInputChange}
            >
              {rios.map((zona) => (
                <MenuItem key={zona.id_cuenca} value={zona.id_cuenca}>
                  {zona.nombre_cuenca}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Nombre tipo uso de agua "
            onChange={handleInputChange}
            name="nombre_tipo_uso_agua"
            value={formData.nombre_tipo_uso_agua}
            size="small" 
            fullWidth 
          />
        </Grid>

        <Grid item>
              <Button
                color="success"
                variant="contained"
                startIcon={<SaveIcon />}
                fullWidth
                onClick={() => {
                  if (modo === 'Crear') {
                    handleSubmitCrear();
                  } else if (modo === 'Editar') {
                    handleSubmit();
                  }
                }}
              >
                {modo} tipos de uso
              </Button>
            </Grid>
      </Grid>

      <RenderDataGrid
        title="Listado de profesionales"
        columns={columns ?? []}
        rows={Historico ?? []}
      />
    </>
  );
};
