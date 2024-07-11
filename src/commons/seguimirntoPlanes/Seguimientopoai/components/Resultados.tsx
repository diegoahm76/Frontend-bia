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
} from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { api } from '../../../../api/axios';
import { RenderDataGrid } from '../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import {
  fetplames,
  fetmetas,
  fetproyecto,
  fetactividad,
  fetejeplan,
  fetproducto,
  fetprogramas,
  fetindicador,
} from '../services/select.service';
import ClearIcon from '@mui/icons-material/Clear';

import { BuscarProps, Historico } from '../interface/types';
import { control_error, control_success } from '../../../../helpers';
export interface Concepto {
  id_concepto: 0,
  id_indicador: 0,
  id_meta: 0,
  id_modalidad: 0,
  id_plan: 0,
  id_proyecto: 0,
  id_rubro: 0,
  id_unidad_organizacional: 0,
  nombre_concepto: '',
  nombre_modalidad: '',
  nombre_responsable: '',
  valor_inicial: null,
}
// export const Resultados: React.FC = () => {
export const Resultados: React.FC<BuscarProps> = ({
  setSelecTodosId,
  setPlanes,
  planes,
  programa,
  proyecto,
  setProyecto,
  setShowHeader,
  formData,
  handleInputChange,
  handleBuscarClick,
  is_modal_active,
  set_is_modal_active,
  setPrograma,
  setProducto,
  producto,
  actividad,
  setactividad,
  setindicador,
  indicador,
  metas,
  setmetas,
  setFormData,
  ejeplan,
  setejeplan,
  setSelectedConceptoId,
}) => {
  const [Historico, setHistorico] = useState<Concepto[]>([]);
  const fetchHistorico = async (): Promise<void> => {
    try {
      const url = `/seguimiento-planes/consultar-conceptos-poai-lista/?id_plan=${formData.plan}&id_proyecto=${formData.proyecto}&id_indicador=${formData.indicador}&id_meta=${formData.meta}`;
      const res = await api.get(url);
      const HistoricoData: Concepto[] = res.data?.data || [];
      setHistorico(HistoricoData);
      control_success('Datos encontrados con exito');
    } catch (error: any) {
      // console.error(error);
      control_error(error.response.data.detail);
    }
  };

  // useEffect(() => {
  //   void fetchHistorico();
  // }, []);
  // const [selectedConceptoId, setSelectedConceptoId] = useState<number | null>(null);
  // const [selecTodosId, setSelecTodosId] = useState<number | null>(null);


  const handleRowClick = (id: number) => {
    setSelectedConceptoId(id);
    handle_tabla()
    setHistorico([])
  };
  const columns = [
    {
      field: 'nombre_concepto',
      headerName: 'Nombre de concepto ',
      minWidth: 300,
    },
    {
      field: 'valor_inicial',
      headerName: 'Valor inicial',
      minWidth: 200,
      renderCell: (params: any) => {
        // Formatear el valor a pesos colombianos
        const valorFormateado = new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0, // Ajusta según la precisión deseada
        }).format(params.value);
        return <>{valorFormateado}</>;
      },
    },
    { field: 'nombre_responsable', headerName: 'Responsable', minWidth: 300 },
    {
      field: 'nombre_modalidad',
      headerName: 'Movilidad de contratación',
      minWidth: 300,
    },
    {
      field: 'Acciones',
      headerName: 'Acciones',

      minWidth: 100,
      renderCell: (params:any) => (
        <>
          <IconButton color="primary" aria-label="Ver"
          //  onClick={handle_tabla}
          onClick={() =>{ handleRowClick(params.row.id_concepto) , setSelecTodosId(params.row)  }}
           >
            <PlaylistAddCheckIcon />
          </IconButton>
        </>
      ),
    },
  ];
  const handle_tabla = (): void => {
    set_is_modal_active(false);
    setShowHeader(true);
  };

  const handle_close = (): void => {
    set_is_modal_active(false);
    // setShowHeader(true);
  };

  useEffect(() => {
    fetplames({ setPlanes });
  }, []);

  useEffect(() => {
    setejeplan([]),
    setPrograma([]),
    setProyecto([]),
    setProducto([]),
    setactividad([]),
    setindicador([]),
    setmetas([]),
    setFormData((prevData: any) => ({
      ...prevData,
      eje: '', 
      programa: '', 
      proyecto: '', 
      producto: '', 
      actividad: '', 
      indicador: '', 
      meta: '', 
    }));
    fetejeplan({ setejeplan, formData });
  }, [formData.plan]);

  useEffect(() => {
    
    setPrograma([]),
    setProyecto([]),
    setProducto([]),
    setactividad([]),
    setindicador([]),
    setmetas([]),
    setFormData((prevData: any) => ({
      ...prevData,
     
      programa: '', 
      proyecto: '', 
      producto: '', 
      actividad: '', 
      indicador: '', 
      meta: '', 
    }));
    fetprogramas({ setPrograma, formData });
  }, [formData.eje]);

  useEffect(() => {
    
    setProyecto([]),
    setProducto([]),
    setactividad([]),
    setindicador([]),
    setmetas([]),
    setFormData((prevData: any) => ({
      ...prevData,
     
       
      proyecto: '', 
      producto: '', 
      actividad: '', 
      indicador: '', 
      meta: '', 
    }));
    fetproyecto({ setProyecto, formData });
  }, [formData.programa]);

  useEffect(() => {
      
    
    setProducto([]),
    setactividad([]),
    setindicador([]),
    setmetas([]),
    setFormData((prevData: any) => ({
      ...prevData,
     
       
       
      producto: '', 
      actividad: '', 
      indicador: '', 
      meta: '', 
    }));
    fetproducto({ setProducto, formData });
  }, [formData.proyecto]);

  useEffect(() => {
     
    
    setactividad([]),
    setindicador([]),
    setmetas([]),
    setFormData((prevData: any) => ({
      ...prevData,
     
       
   
      actividad: '', 
      indicador: '', 
      meta: '', 
    }));
    fetactividad({ setactividad, formData });
  }, [formData.producto]);

  useEffect(() => {
       
    setindicador([]),
    setmetas([]),
    setFormData((prevData: any) => ({
      ...prevData,
     
        
      indicador: '', 
      meta: '', 
    }));
    fetindicador({ setindicador, formData });
  }, [formData.actividad]);

  useEffect(() => {
   
    setmetas([]),
    setFormData((prevData: any) => ({
      ...prevData,
      
      meta: '', 
    }));
    
    fetmetas({ setmetas, formData });
  }, [formData.indicador]);


 

  return (
    <>
    
      <Dialog
        open={is_modal_active}
        onClose={handle_close}
        fullWidth={true}
        maxWidth="lg"
      >
        {/* plan
        {formData.plan}
        proyecto ${formData.proyecto}
        indicador
        {formData.indicador}
        meta
        {formData.meta}`; */}
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
            <Title title="Seleccione Meta/Producto" />
          </Grid>
{/* {selectedConceptoId} */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="si-no-select-label"> Nombre de plan</InputLabel>
              <Select
                name="plan"
                // disabled
                label="Nombre de plan"
                value={formData.plan}
                onChange={handleInputChange}
              >
                {planes.map((unidad: any) => (
                  <MenuItem key={unidad.id_plan} value={unidad.id_plan}>
                    {unidad.nombre_plan}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="si-no-select-label"> Nombre de eje</InputLabel>
              <Select
                name="eje"
                // disabled
                label="Nombre de plan"
                value={formData.eje}
                onChange={handleInputChange}
              >
                {ejeplan.map((unidad: any) => (
                  <MenuItem
                    key={unidad.id_eje_estrategico}
                    value={unidad.id_eje_estrategico}
                  >
                    {unidad.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="si-no-select-label">
                {' '}
                Nombre de programa
              </InputLabel>
              <Select
                name="programa"
                // disabled
                value={formData.programa}
                onChange={handleInputChange}
                label="Nombre de programa"
              >
                {programa.map((programa: any) => (
                  <MenuItem
                    key={programa.id_programa}
                    value={programa.id_programa}
                  >
                    {programa.nombre_programa}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Nombre del proyecto </InputLabel>
              <Select
                value={formData.proyecto}
                onChange={handleInputChange}
                name="proyecto"
                //  disabled
                label="Nombre del proyecto"
              >
                {proyecto.map((Proyecto: any) => (
                  <MenuItem
                    key={Proyecto.id_proyecto}
                    value={Proyecto.id_proyecto}
                  >
                    {Proyecto.nombre_proyecto}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="si-no-select-label">
                Nombre del producto
              </InputLabel>
              <Select
                name="producto"
                label="Nombre del producto"
                value={formData.producto}
                onChange={handleInputChange}
              >
                {producto.map((Proyecto: any) => (
                  <MenuItem
                    key={Proyecto.id_producto}
                    value={Proyecto.id_producto}
                  >
                    {Proyecto.nombre_producto}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="si-no-select-label">
                {' '}
                Nombre del la actividad
              </InputLabel>
              <Select
                value={formData.actividad}
                onChange={handleInputChange}
                name="actividad"
                label="Nombre del la actividad "
              >
                {actividad.map((Proyecto: any) => (
                  <MenuItem
                    key={Proyecto.id_actividad}
                    value={Proyecto.id_actividad}
                  >
                    {Proyecto.nombre_actividad}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="si-no-select-label">
                {' '}
                Nombre del indicador
              </InputLabel>
              <Select
                value={formData.indicador}
                onChange={handleInputChange}
                name="indicador"
                label="Nombre del la indicador "
              >
                {indicador.map((Proyecto: any) => (
                  <MenuItem
                    key={Proyecto.id_indicador}
                    value={Proyecto.id_indicador}
                  >
                    {Proyecto.nombre_indicador}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="si-no-select-label">
                {' '}
                Nombre del la Meta{' '}
              </InputLabel>
              <Select
                name="meta"
                value={formData.meta}
                onChange={handleInputChange}
                label="Nombre del la Meta"
              >
                {metas.map((Proyecto: any) => (
                  <MenuItem key={Proyecto.id_meta} value={Proyecto.id_meta}>
                    {Proyecto.nombre_indicador}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            container
            spacing={2}
            marginTop={2}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Grid item xs={12} sm={2}>
              <Button
                startIcon={<SearchOutlined />}
                variant="contained"
                fullWidth
                onClick={fetchHistorico}
              >
                Buscar
              </Button>
            </Grid>
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
          <RenderDataGrid
            title="Resultados de la Búsqueda Conceptos POAI"
            columns={columns ?? []}
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
                onClick={handle_close}
                startIcon={<ClearIcon />}
              >
                cerrar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};
