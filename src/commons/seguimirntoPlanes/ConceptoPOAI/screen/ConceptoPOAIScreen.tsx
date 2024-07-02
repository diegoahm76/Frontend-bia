/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react'; 
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
import { control_warning } from '../../../almacen/configuracion/store/thunks/BodegaThunks';

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
  rubro: any;
  programa: any;
  proyecto: any;
  producto: any;
  actividad: any;
  indicador: any;
  eje: any;
  cuenta: any;
  cod_presupuestal: any;
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
  id_plan: number | null;
  id_proyecto: number | null;
  id_rubro: number | null;
  id_indicador: number | null;
  id_meta: number | null;
  id_modalidad: number | null;
  id_unidad_organizacional: number | null;
  nombre_concepto: string | null;
  valor_inicial: any;
}
interface Rubro {
  id_rubro: number;
  cod_pre: string;
  cuenta: string;
  valcuenta: string;
  valor_fuentes: number;
  agno: number;
  adicion: boolean;
  id_plan: number;
  id_meta: number;
  id_fuente: number;
}

// export const Resultados: React.FC = () => {
export const ConceptoPOAIScreen: React.FC = () => {
  const initialFormData: FormData = {
    eje: '',
    meta: '',
    rubro: '',
    plan: '',
    programa: '',
    proyecto: '',
    producto: '',
    actividad: '',
    indicador: '',
    cod_presupuestal: '',
    cuenta: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputSelect = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const initialConceptoPoai: ConceptoPoai = {
    id_plan: null,
    id_proyecto: null,
    id_rubro: null,
    id_indicador: null,
    id_meta: null,
    id_modalidad: null,
    id_unidad_organizacional: null,
    nombre_concepto: "",
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

    const currencyFields = ['valor_inicial']; // Lista de campos que deben formatearse como moneda

    const convertValue = (name: string, value: string): any => {
      if (value === '') {
        return null;
      }

      if (numberFields.includes(name)) {
        return Number(value);
      } else {
        return value;
      }
    };

    let formattedValue = value;
    if (currencyFields.includes(name)) {
      formattedValue = value.replace(/\D/g, ''); // Elimina caracteres no numéricos
    }

    setConceptoPoai({
      ...conceptoPoai,
      [name]: convertValue(name, formattedValue),
    });
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
 
  const [abrir0, setabrir0] = useState(false);
  const [abrir1, setabrir1] = useState(false);
  const [uno1, setuno1] = useState(false);

  const [Historico, setHistorico] = useState<Concepto[]>([]);
  const fetchHistorico = async (): Promise<void> => {
    try {
      const url = `seguimiento-planes/consultar-conceptos-poai-lista/?id_plan=${formData.plan}&id_proyecto=${formData.proyecto}&id_indicador=${formData.indicador}&id_meta=${formData.meta}`;
      setuno1(true);
      // `/seguimiento-planes/consultar-conceptos-poai-lista/?id_plan=${formData.plan}&id_proyecto=${formData.proyecto}&id_indicador=${formData.indicador}&id_meta=${formData.meta}`
      const res = await api.get(url);
      const HistoricoData: Concepto[] = res.data?.data || [];
      setHistorico(HistoricoData);
      setabrir0(true);
      control_success('Datos encontrados con exito');
    } catch (error: any) {
      // console.error(error);
      setabrir0(true);
      control_error(error.response.data.detail);
    }
  };

  const fetchbusquedaDos = async (): Promise<void> => {
    try {
      const url = `seguimiento-planes/consultar-conceptos-poai-avanzado/?cod_pre=${formData.cod_presupuestal}&cuenta=${formData.cuenta}`;
      setuno1(false);
      // `/seguimiento-planes/consultar-conceptos-poai-lista/?id_plan=${formData.plan}&id_proyecto=${formData.proyecto}&id_indicador=${formData.indicador}&id_meta=${formData.meta}`
      const res = await api.get(url);
      const HistoricoData: Concepto[] = res.data?.data || [];
      setHistorico(HistoricoData);
      setabrir0(true);
      control_success('Datos encontrados con exito');
    } catch (error: any) {
      // console.error(error);
      setabrir0(true);
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
      minWidth: 500,
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
      // eje: '',
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
      // meta: '',
    }));
    fetmetas({ setmetas, formData });
  }, [formData.indicador]);

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
  //actualizar
  const editartabla = async () => {
    try {
      const conceptoPoaiToSend = transformEmptyFieldsToNull(conceptoPoai);
      const url = `seguimiento-planes/actualizar-conceptos-poai/${selecTodosId.id_concepto}/`;
      const res = await api.put(url, conceptoPoaiToSend);
      console.log('Configuración actualizada con éxito', res.data);
      control_success('Editado correctamente');
      if (uno1) {
        fetchHistorico();
      } else {
        fetchbusquedaDos();
      }
    } catch (error: any) {
      console.error('Error al actualizar la configuración', error);
      control_error(error.response.data.detail);
    }
  };

  //crear

  const crearConfiguracion = async () => {
    try {
      const conceptoPoaiToSend = transformEmptyFieldsToNull(conceptoPoai);

      const url = 'seguimiento-planes/crear-conceptos-poai/';
      const res = await api.post(url, conceptoPoaiToSend);
      console.log('Formulario creado con éxito', res.data);
      control_success('Formulario creado con éxito');
      setConceptoPoai(initialConceptoPoai);
      if (uno1) {
        fetchHistorico();
      } else {
        fetchbusquedaDos();
      }
    } catch (error: any) {
      console.error('Error al crear el formulario', error);
      control_error(error.response.data.detail);
    }
  };

  const handlecrear = () => {
    if (!formData.indicador) {
      handleBuscarClick();
      control_error('Datos necesarios para crear el concepto  ');
    } else {
      setabrir1(true);
      seteditar(false);

      setConceptoPoai((prevData: any) => ({
        ...prevData,
        id_plan: formData.plan,
        id_proyecto: formData.proyecto,
        id_indicador: formData.indicador,
        id_meta: formData.meta,
        id_rubro: formData.rubro,

        nombre_concepto: '',
        valor_inicial: '',
        id_unidad_organizacional: '',
        id_modalidad: '',
      }));
    }
  };

  const handlecrearmodal = () => {
    if (!formData.indicador) {
 
      control_warning('Datos necesarios para crear el concepto');
    } else {
      setabrir1(true);
      seteditar(false);

      setConceptoPoai((prevData: any) => ({
        ...prevData,
        id_plan: formData.plan,
        id_proyecto: formData.proyecto,
        id_indicador: formData.indicador,
        id_meta: formData.meta,
        id_rubro: formData.rubro, 
        nombre_concepto: '',
        valor_inicial: '',
        id_unidad_organizacional: '',
        id_modalidad: '',
      }));
      handle_close()
    }
  };



  const handlecerrar = () => {
    setabrir1(false);
  };

  const handleLimpiarClick = () => {
    setConceptoPoai((prevData: any) => ({
      ...prevData,
      nombre_concepto: '',
      valor_inicial: '',
      id_unidad_organizacional: '',
      id_modalidad: '',
    }));
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
    setFormData(initialFormData);
  };

  const [cuenca, setcuenca] = useState<Rubro[]>([]);
  const fetchcuenca = async () => {
    try {
      const url = `seguimiento/planes/consultar-rubros-id-meta/${formData.meta}/`;
      const res = await api.get(url);
      const unidadesData = res.data.data;
      setcuenca(unidadesData);
      // control_success('Configuraciones encotradas  ');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchcuenca();
  }, [formData.meta]);

 

  const formatCurrency = (value: string) => {
    if (!value) return '';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(Number(value));
  };
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  useEffect(() => {
    // Verificar si alguno de los campos tiene valor
    if (formData.cod_presupuestal || formData.cuenta) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [formData.cod_presupuestal, formData.cuenta]);

  const [is_modal_active, set_is_buscar] = useState<boolean>(false);

  const handleBuscarClick = () => {
    set_is_buscar(true);
  };
  const handle_close = (): void => {
    set_is_buscar(false);
    // setShowHeader(true);
  };
  return (
    <>
      <Dialog
        open={is_modal_active}
        onClose={handle_close}
        fullWidth={true}
        maxWidth="lg"
      >
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
            <Title title="Registro de Conceptos POAI" />
          </Grid>
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
              <InputLabel id="si-no-select-label">
                {' '}
                Nombre de programa
              </InputLabel>
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
              <InputLabel id="si-no-select-label">
                Nombre del producto
              </InputLabel>
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
              <InputLabel id="si-no-select-label">
                {' '}
                Nombre de la cuenta
              </InputLabel>
              <Select
                name="rubro"
                // disabled
                label="Nombre de la cuenta"
                value={formData.rubro}
                onChange={handleInputSelect}
              >
                {cuenca.map((unidad: any) => (
                  <MenuItem key={unidad.id_rubro} value={unidad.id_rubro_parametrica}>
                    {unidad.cuenta}
                  </MenuItem>
                ))}
                {/* {cuenca.slice(0, 4).map((unidad: any) => (
                <MenuItem key={unidad.id_rubro} value={unidad.id_rubro}>
                  {unidad.cuenta}
                </MenuItem>
              ))} */}
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
                onClick={ handle_close}
                startIcon={<ClearIcon />}
              >
                cerrar
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="outlined"
                fullWidth
                onClick={handlecrearmodal}
              >
                Agregar concepto POAI
              </Button>
            </Grid>
          </Grid>


        </Grid>
      </Dialog>

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
          <Title title="Registro de Conceptos POAI" />
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
          <Title title="Busquea por  Meta / Rubro" />
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
            <InputLabel id="si-no-select-label">
              {' '}
              Nombre de la cuenta
            </InputLabel>
            <Select
              name="rubro"
              // disabled
              label="Nombre de la cuenta"
              value={formData.rubro}
              onChange={handleInputSelect}
            >
              {cuenca.map((unidad: any) => (
                <MenuItem key={unidad.id_rubro} value={unidad.id_rubro_parametrica}>
                  {unidad.cuenta}
                </MenuItem>
              ))}
              {/* {cuenca.slice(0, 4).map((unidad: any) => (
                <MenuItem key={unidad.id_rubro} value={unidad.id_rubro}>
                  {unidad.cuenta}
                </MenuItem>
              ))} */}
            </Select>
          </FormControl>
        </Grid>
        {/* {formData.rubro} */}
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
              disabled={!formData.rubro}
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
            name="cod_presupuestal"
            value={formData.cod_presupuestal}
            onChange={handleInputSelect}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Cuenta"
            name="cuenta"
            value={formData.cuenta}
            onChange={handleInputSelect}
          />
        </Grid>
        {/* el filtro ya no funciona el de dos , ultimo selce mal filtro , crear
        dejo de funcionar */}
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
              onClick={fetchbusquedaDos}
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
              >
                Agregar concepto POAI
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

            {/* <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                label="Valor Inicial"
                name="valor_inicial"
                value={conceptoPoai.valor_inicial}
                onChange={handleInputChange}
              />
            </Grid> */}

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                label="Valor Inicial"
                name="valor_inicial"
                value={formatCurrency(conceptoPoai.valor_inicial)}
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
                  {editar ? 'Actualizar' : 'Guardar'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
