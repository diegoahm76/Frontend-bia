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
  Planes,
  Programa,
  Proyecto,
  Producto,
  Actividad,
  Indicador,
  metas,
  EjeEstrategico,
  miEstilo,
  ConsultarSeguimiento,
  FormDataRegistro,
} from '../../Seguimientopoai/interface/types';
import {
  fetplames,
  fetmetas,
  fetproyecto,
  fetactividad,
  fetejeplan,
  fetproducto,
  fetprogramas,
  fetindicador,
} from '../../Seguimientopoai/services/select.service';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';

export interface Concepto {
  id_concepto: 0;
  id_indicador: 0;
  id_meta: 0;
  id_modalidad: 0;
  id_plan: 0;
  id_proyecto: 0;
  id_rubro: 0;
  id_unidad_organizacional: 0;
  nombre_concepto: '';
  nombre_modalidad: '';
  nombre_responsable: '';
  valor_inicial: any;
}

export interface UnidadOrganizaciona {
  nombre: string;
  id_unidad_organizacional: number;
}
export interface FormData {
  meta: any;
  plan: any;
  programa: any;
  proyecto: any;
  producto: any;
  actividad: any;
  indicador: any;
  eje: any;
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
  id_plan: any;
  id_proyecto: any;
  id_rubro: any;
  id_indicador: any;
  id_meta: any;
  id_modalidad: any;
  id_unidad_organizacional: any;
  nombre_concepto: string;
  valor_inicial: any;
}

// export const Resultados: React.FC = () => {
export const ConseptoPoai: React.FC = () => {
  const initialFormData: FormData = {
    eje: '',
    meta: '',
    plan: '',
    programa: '',
    proyecto: '',
    producto: '',
    actividad: '',
    indicador: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputSelect = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const initialConceptoPoai: ConceptoPoai = {
    id_plan: '',
    id_proyecto: '',
    id_rubro: '',
    id_indicador: '',
    id_meta: '',
    id_modalidad: '',
    id_unidad_organizacional: '',
    nombre_concepto: '',
    valor_inicial: '',
  };
  const [conceptoPoai, setConceptoPoai] =
    useState<ConceptoPoai>(initialConceptoPoai);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    const numberFields = [
      'id_plan',
      'id_proyecto',
      'id_rubro',
      'id_indicador',
      'id_meta',
      'id_modalidad',
      'id_unidad_organizacional',
      'valor_inicial',
    ];

    if (numberFields.includes(name)) {
      if (!/^\d*$/.test(value)) {
        return;
      }
    }

    const convertValue = (name: string, value: string): any => {
      if (numberFields.includes(name)) {
        return value === '' ? '' : Number(value);
      } else {
        return value;
      }
    };

    setConceptoPoai({ ...conceptoPoai, [name]: convertValue(name, value) });
  };
  const [selecTodosId, setSelecTodosId] = useState<any>('');
  useEffect(() => {
    if (selecTodosId) {
      setConceptoPoai((prevData: any) => ({
        ...prevData,
        id_plan: selecTodosId.id_plan,
        id_proyecto: selecTodosId.id_proyecto,
        id_rubro: selecTodosId.id_rubro,
        id_indicador: selecTodosId.id_indicador,
        id_meta: selecTodosId.id_meta,
        id_modalidad: selecTodosId.id_modalidad,
        id_unidad_organizacional: selecTodosId.id_unidad_organizacional,
        nombre_concepto: selecTodosId.nombre_concepto,
        valor_inicial: selecTodosId.valor_inicial,
      }));
    }
  }, [selecTodosId]);
  useEffect(() => {
    setConceptoPoai((prevData: any) => ({
      ...prevData,
      id_plan: selecTodosId.id_plan,
      id_proyecto: selecTodosId.id_proyecto,
      id_rubro: selecTodosId.id_rubro,
      id_indicador: selecTodosId.id_indicador,
      id_meta: selecTodosId.id_meta,
      id_modalidad: selecTodosId.id_modalidad,
      id_unidad_organizacional: selecTodosId.id_unidad_organizacional,
      nombre_concepto: selecTodosId.nombre_concepto,
      valor_inicial: selecTodosId.valor_inicial,
    }));
  }, [selecTodosId?.id_concepto]);

  const [abrir0, setabrir0] = useState(false);
  const [abrir1, setabrir1] = useState(false);

  const [Historico, setHistorico] = useState<Concepto[]>([]);
  const fetchHistorico = async (): Promise<void> => {
    try {
      const url = `seguimiento-planes/consultar-conceptos-poai-lista/?id_plan=${formData.plan}&id_proyecto=${formData.proyecto}&id_indicador=${formData.indicador}&id_meta=${formData.meta}`;

      // `/seguimiento-planes/consultar-conceptos-poai-lista/?id_plan=${formData.plan}&id_proyecto=${formData.proyecto}&id_indicador=${formData.indicador}&id_meta=${formData.meta}`
      const res = await api.get(url);
      const HistoricoData: Concepto[] = res.data?.data || [];
      setHistorico(HistoricoData);
      setabrir0(true);
      control_success('Datos encontrados con exito');
    } catch (error: any) {
      // console.error(error);
      control_error(error.response.data.detail);
    }
  };
  const [editar, seteditar] = useState(false);

  const handlcerrar = () => {
    setabrir1(false);
    setabrir0(false);
  };
  const columns = [
    {
      field: 'nombre_concepto',
      headerName: 'Nombre de concepto ',
      minWidth: 400,
    },
    {
      field: 'valor_inicial',
      headerName: 'Valor inicial',
      minWidth: 300,
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
    { field: 'nombre_responsable', headerName: 'Responsable', minWidth: 400 },
    {
      field: 'nombre_modalidad',
      headerName: 'Movilidad de contratación',
      minWidth: 400,
    },
    {
      field: 'Acciones',
      headerName: 'Acciones',
      minWidth: 100,
      renderCell: (params: any) => (
        <>
          <IconButton
            color="primary"
            aria-label="Ver"
            onClick={() => {
              setSelecTodosId(params.row);
              setConceptoPoai({
                id_plan: params.row.id_plan,
                id_proyecto: params.row.id_proyecto,
                id_rubro: params.row.id_rubro,
                id_indicador: params.row.id_indicador,
                id_meta: params.row.id_meta,
                id_modalidad: params.row.id_modalidad,
                id_unidad_organizacional: params.row.id_unidad_organizacional,
                nombre_concepto: params.row.nombre_concepto,
                valor_inicial: params.row.valor_inicial,
              });
              setabrir1(true);
              seteditar(true);
            }}
          >
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const [metas, setmetas] = useState<metas[]>([]);
  const [planes, setPlanes] = useState<Planes[]>([]);
  const [programa, setPrograma] = useState<Programa[]>([]);
  const [proyecto, setProyecto] = useState<Proyecto[]>([]);
  const [producto, setProducto] = useState<Producto[]>([]);
  const [actividad, setactividad] = useState<Actividad[]>([]);
  const [indicador, setindicador] = useState<Indicador[]>([]);
  const [ejeplan, setejeplan] = useState<EjeEstrategico[]>([]);

  useEffect(() => {
    fetplames({ setPlanes });
  }, []);

  useEffect(() => {
    setFormData((prevData: any) => ({
      ...prevData,
      eje: '',
    }));
    fetejeplan({ setejeplan, formData });
  }, [formData.plan]);

  useEffect(() => {
    fetprogramas({ setPrograma, formData });
  }, [formData.eje]);

  useEffect(() => {
    fetproyecto({ setProyecto, formData });
  }, [formData.programa]);

  useEffect(() => {
    fetproducto({ setProducto, formData });
  }, [formData.proyecto]);

  useEffect(() => {
    fetactividad({ setactividad, formData });
  }, [formData.producto]);

  useEffect(() => {
    fetindicador({ setindicador, formData });
  }, [formData.actividad]);

  useEffect(() => {
    setFormData((prevData: any) => ({
      ...prevData,
      meta: '',
    }));
    fetmetas({ setmetas, formData });
  }, [formData.indicador]);

  //actualizar
  const editartabla = async () => {
    try {
      const url = `seguimiento-planes/actualizar-conceptos-poai/${selecTodosId.id_concepto}/`;
      const res = await api.put(url, conceptoPoai);
      console.log('Configuración actualizada con éxito', res.data);
      control_success('Editado correctamente');
      fetchHistorico();
    } catch (error: any) {
      console.error('Error al actualizar la configuración', error);
      control_error(error.response.data.detail);
    }
  };

  //crear
  const crearConfiguracion = async () => {
    try {
      const url = 'seguimiento-planes/crear-conceptos-poai/';
      const res = await api.post(url, conceptoPoai);
      console.log('Formulario creado con éxito', res.data);
      control_success('Formulario creado con éxito');
      setConceptoPoai(initialConceptoPoai);
      fetchHistorico();
    } catch (error: any) {
      console.error('Error al crear el formulario', error);
      control_error(error.response.data.detail);
    }
  };

  const handlecrear = () => {
    setabrir1(true);
    seteditar(false);

    setConceptoPoai((prevData: any) => ({
      ...prevData,
      id_plan: formData.plan,
      id_proyecto: formData.proyecto,
      id_indicador: formData.indicador,
      id_meta: formData.meta,

      nombre_concepto: '',
      valor_inicial: '',
      id_unidad_organizacional: '',
      id_modalidad: '',

      id_rubro: 1,
    }));
  };

  const handlecerrar = () => {
    setabrir1(false);
  };

  const handleLimpiarClick = () => {
    // setConceptoPoai((prevData: any) => ({
    //   ...prevData,
    //   nombre_concepto: '',
    //   valor_inicial: '',
    //   id_unidad_organizacional: '',
    //   id_modalidad: '',
    // }));
  };

  const [unidades, setUnidades] = useState<UnidadOrganizaciona[]>([]);
  const fetchUnidades = async () => {
    try {
      const url =
        '/gestor/consecutivos-unidades/unidades_organigrama_actual/get/';
      const res = await api.get(url);
      const unidadesData = res.data.data;
      setUnidades(unidadesData);
      // control_success('Configuraciones encotradas  ');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUnidades();
  }, []);

  const [modalidad, setmodalidad] = useState<Modalidad[]>([]);
  const fetchmodalidad = async () => {
    try {
      const url = 'seguimiento-planes/consultar-modalidades/';
      const res = await api.get(url);
      const unidadesData = res.data.data;
      setmodalidad(unidadesData);
      // control_success('Configuraciones encotradas  ');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchmodalidad();
  }, []);
  const limpiartodo = (): void => {
    setFormData(initialFormData)
   };
  return (
    <>
    <Button
                color="primary"
                variant="outlined"
                fullWidth
                onClick={limpiartodo}
                // startIcon={<SaveIcon />}
              >
              
              </Button>
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
          <Title title="Registro de consepto POAI" />
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
          <Title title="Busquea por  Meta/Rubro" />
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
              onChange={handleInputSelect}
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
              onChange={handleInputSelect}
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
            <InputLabel id="si-no-select-label"> Nombre de programa</InputLabel>
            <Select
              name="programa"
              // disabled
              value={formData.programa}
              onChange={handleInputSelect}
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
              onChange={handleInputSelect}
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
            <InputLabel id="si-no-select-label">Nombre del producto</InputLabel>
            <Select
              name="producto"
              label="Nombre del producto"
              value={formData.producto}
              onChange={handleInputSelect}
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
              onChange={handleInputSelect}
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
              onChange={handleInputSelect}
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
              onChange={handleInputSelect}
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

        <Grid item xs={12} sm={12}>
          <FormControl fullWidth size="small">
            <InputLabel id="si-no-select-label"> Nombre de la cuenta</InputLabel>
            <Select
              name="Nombre de la cuenta"
              // disabled
              label="Nombre de la cuenta"
              // value={formData.plan}
              // onChange={handleInputSelect}
            >
              {planes.map((unidad: any) => (
                <MenuItem key={unidad.id_plan} value={unidad.id_plan}>
                  {unidad.nombre_plan}
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
          <Title title="Busqueda por Rubro / Codigo presupuestal" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Codigo presupuestal"
            // name="id_unidad_organizacional"
            // value={conceptoPoai.id_unidad_organizacional}
            // onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Cuenta"
            // name="id_unidad_organizacional"
            // value={conceptoPoai.id_unidad_organizacional}
            // onChange={handleInputChange}
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
      {abrir0 && (
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
                color="primary"
                variant="outlined"
                fullWidth
                onClick={handlecrear}
                // startIcon={<SaveIcon />}
              >
                Agregar segrimiento POAI
              </Button>
            </Grid>
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
                onClick={handlcerrar}
                startIcon={<ClearIcon />}
              >
                cerrar
              </Button>
            </Grid>
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
      )}

      {abrir1 && (
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
              <Title title="Agregar concepto POAI" />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                label="Nombre del Concepto"
                name="nombre_concepto"
                value={conceptoPoai.nombre_concepto}
                onChange={handleInputChange}
              />
            </Grid>

          
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                label="Valor Inicial"
                name="valor_inicial"
                value={conceptoPoai.valor_inicial}
                onChange={handleInputChange}
              />
            </Grid>
            {/* <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                label="ID Modalidad"
                name="id_modalidad"
                value={conceptoPoai.id_modalidad}
                onChange={handleInputChange}
              />
            </Grid> */}

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="unidad-organizacional-select-label">
                  Unidad Organizacional
                </InputLabel>
                <Select
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="ID Unidad Organizacional"
                  name="id_unidad_organizacional"
                  value={conceptoPoai.id_unidad_organizacional}
                  onChange={handleInputChange}
                >
                  {unidades.map((unidad) => (
                    <MenuItem
                      key={unidad.id_unidad_organizacional}
                      value={unidad.id_unidad_organizacional}
                    >
                      {unidad.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="unidad-organizacional-select-label">
                  Modalidad
                </InputLabel>
                <Select
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Modalidad"
                  name="id_modalidad"
                  value={conceptoPoai.id_modalidad}
                  onChange={handleInputChange}
                >
                  {modalidad.map((unidad) => (
                    <MenuItem
                      key={unidad.id_modalidad}
                      value={unidad.id_modalidad}
                    >
                      {unidad.nombre_modalidad}
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
      )}
    </>
  );
};
