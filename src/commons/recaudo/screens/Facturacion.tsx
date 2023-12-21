/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  TextField,
  Box,
  Button,
  Stack,
  FormHelperText,
  Switch,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import dayjs from 'dayjs';
import { logo_cormacarena_h } from '../../conservacion/Reportes/logos/logos';
import { Title } from '../../../components';
import { useSelector } from 'react-redux';
import { AuthSlice } from '../../auth/interfaces';
import { LoadingButton } from '@mui/lab';
import { DataGrid } from '@mui/x-data-grid';
import { SelectItem } from 'primereact/selectitem';
import { api } from '../../../api/axios';
import { BuscadorPersona } from '../../../components/BuscadorPersona';
import { control_success, control_error } from '../../../helpers';
import { Persona } from '../../../interfaces/globalModels';
import { UnidadOrganizacional } from '../../conservacion/solicitudMaterial/interfaces/solicitudVivero';
import { Alertas } from '../../gestorDocumental/alertasgestor/interfaces/types';

interface UnidadOrganizaciona {
  id_unidad_organizacional: number;
  nombre: string;
}
interface SerieSubserie {
  id_catserie_unidadorg: number;
  id_serie_doc: number;
  nombre_serie_doc: string;
  id_subserie_doc: number | null;
  nombre_subserie_doc: string | null;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Facturacion: React.FC = () => {
  const { userinfo: { nombre_unidad_organizacional, nombre, id_persona } } = useSelector((state: AuthSlice) => state.auth);
  const [idUnidadSeleccionada, setIdUnidadSeleccionada] = useState('');
  const [unidades, setUnidades] = useState<UnidadOrganizaciona[]>([]);
  const [unidadSeleccionada, setUnidadSeleccionada] = useState('');

  const fetchUnidades = async () => {
    try {
      const url = "/gestor/configuracion-tipos-expendientes/seccion-subseccion/get/";
      const res = await api.get(url);
      const unidadesData = res.data.data;
      setUnidades(unidadesData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUnidades();
  }, []);

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    setUnidadSeleccionada(event.target.value as string);
    const selectedId = event.target.value;
    setIdUnidadSeleccionada(selectedId);
  };

  const [seriesSubseries, setSeriesSubseries] = useState<SerieSubserie[]>([]);
  const [selectedSerieSubserie, setSelectedSerieSubserie] = useState('');

  const fetchSeriesSubseries = async () => {
    try {
      const url = `/gestor/configuracion-tipos-expendientes/serie-subserie-unidad/get/${idUnidadSeleccionada}/`;
      const res = await api.get(url);
      const data = res.data.data;
      setSeriesSubseries(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchSeriesSubseries();
  }, [idUnidadSeleccionada]);

  useEffect(() => {
    fetchSeriesSubseries();
  }, []);
  const [nombreSerieSeleccionada, setNombreSerieSeleccionada] = useState('');
  const [nombreSubserieSeleccionada, setNombreSubserieSeleccionada] = useState('');

  const handleChangee = (event: { target: { name: any; value: any; }; }) => {
    setSelectedSerieSubserie(event.target.value as string);

    const selectedValue = event.target.value;
    setSelectedSerieSubserie(selectedValue);

    const selectedElement = seriesSubseries.find((item) => item.id_catserie_unidadorg === selectedValue);

    if (selectedElement) {
      setNombreSerieSeleccionada(selectedElement.nombre_serie_doc);
      setNombreSubserieSeleccionada(selectedElement.nombre_subserie_doc || ''); // Si no hay subserie, establece una cadena vacía
    } else {
      setNombreSerieSeleccionada('');
      setNombreSubserieSeleccionada('');
    }
  };
  const [visor, setVisor] = useState('');
  const [asunto, setAsunto] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ciudad, setCiudad] = useState('');

  const generarHistoricoBajas = () => {
    const doc = new jsPDF();
    const anchoPagina = doc.internal.pageSize.width;

    // Añadir título, fecha y logo
    const agregarEncabezado = () => {
      doc.setFontSize(22);
      doc.text("    ", anchoPagina / 2, 20, { align: 'center' });
      doc.setFontSize(12);
      doc.text(dayjs().format('DD/MM/YYYY'), anchoPagina - 40, 10);
      doc.addImage(logo_cormacarena_h, 160, 10, 40, 10); // Asegúrate de tener esta imagen
    };
    agregarEncabezado();

    // Añadir información del usuario   
    doc.setFontSize(12);
    let y = 30; // posición inicial para el texto
    doc.text(`${consecutivoActual}`, 10, y);
    y += 6;
    doc.text(`${nombreSerieSeleccionada} - ${nombreSubserieSeleccionada}`, 10, y);
    y += 6;
    doc.text(`Identificación: ${identificacion}`, 10, y);
    y += 6;
    doc.text(`Email: ${email}`, 10, y);
    y += 6;
    doc.text(`Tel.: ${telefono}`, 10, y);
    y += 6;
    doc.text(`Ciudad: ${ciudad}`, 10, y);
    y += 6; // Espacio antes del asunto

    // Añadir asunto
    const lineas = doc.splitTextToSize(asunto, anchoPagina - 20);
    for (let i = 0; i < lineas.length; i++) {
      if (y > 280) {
        doc.addPage();
        agregarEncabezado();
        y = 30;
      }
      doc.text(lineas[i], 10, y);
      y += 6;
    }

    let yFinal = doc.internal.pageSize.getHeight() - 30; // Ajusta esto según sea necesario
    doc.setFontSize(12);
    doc.text(`Nombre: ${nombre}`, 10, yFinal);
    yFinal += 10;
    doc.text(`Contratista Grupo: ${nombre_unidad_organizacional}`, 10, yFinal);

    setVisor(doc.output('datauristring'));
  };



  const initial_data: Alertas[] = [];
  const [persona, set_persona] = useState<Persona | undefined>();
  const on_result = async (info_persona: Persona): Promise<void> => { set_persona(info_persona); }

  const [data_entidad, setdata_entidad] = useState<Alertas[]>(initial_data);
  const fetch_dataget = async (): Promise<void> => {
    try {
      const url = "/transversal/alertas/personas_alertar/get-by-configuracion/Gst_SlALid/";
      const res = await api.get(url);
      const sucursales_data = res.data.data;
      setdata_entidad(sucursales_data);
      console.log(sucursales_data)
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetch_dataget().catch((error) => {
      console.error(error);
    });
  }, []);
  const columns = [
    {
      field: "detalle",
      headerName: "Detalle",
      width: 200,
      flex: 1,
      valueGetter: (params: any) => params.row.datos_reordenados.detalle
    },
    {
      field: "destinatario",
      headerName: "destinatario",
      width: 200,
      flex: 1,
      valueGetter: (params: any) => params.row.datos_reordenados.destinatario
    },
    {
      field: "nombre",
      headerName: "nombre",
      width: 200,
      flex: 1,
      valueGetter: (params: any) => params.row.datos_reordenados.nombre
    },

    {
      field: "accion",
      headerName: "Acción",
      width: 150,
      // flex: 1,
      renderCell: (params: any) => (
        <>
          <IconButton
            color="primary"
            aria-label="Eliminar"
            onClick={() => {
              // setselected_row(params.row);
              void handleeliminafila(params);
            }}
          >

            n
          </IconButton>

        </>
      ),
    },
  ];
  const handleeliminafila = async (params: any): Promise<void> => {

    try {
      const url = `/transversal/alertas/personas_alertar/delete/${params.row.id_persona_alertar}/`;
      await api.delete(url);
      // Actualiza el estado de los datos después de eliminar
      const updated_data = data_entidad.filter(row => row.id_persona_alertar !== params.row.id_persona_alertar);
      setdata_entidad(updated_data);
      control_success("Alerta eliminada correctamente");
      // setselected_row(null); // Limpia la fila seleccionada
    } catch (error) {
      console.error(error);
      control_error("Alerta no eliminada");

    }

  };

  const [perfil, set_perfil] = useState<SelectItem[]>([]);

  useEffect(() => {
    const fetch_perfil = async (): Promise<void> => {
      try {
        const url = `/listas/perfiles_sistema/`;
        const res_perfil = await api.get(url);
        const alertas_perfil = res_perfil.data.data;
        set_perfil(alertas_perfil);
      } catch (error) {
        console.error(error);
      }
    };
    void fetch_perfil();
  }, []);


  const [lider, set_lider] = useState<UnidadOrganizacional[]>([]);
  useEffect(() => {
    const fetch_perfil = async (): Promise<void> => {
      try {
        const url = `/transversal/organigrama/unidades/get-list/organigrama-actual/`;
        const res_lider = await api.get(url);
        const alertas_lider = res_lider.data.data;
        set_lider(alertas_lider);
        console.log("222222222222");
        console.log(alertas_lider);
        console.log("111111111111");
      } catch (error) {
        console.error(error);
      }
    };
    void fetch_perfil();
  }, []);
  const [selected_button, setselected_button] = useState<string | null>(null);
  const handle_selectlider = (): void => {
    setselected_button('lider');
    set_persona(undefined);
  };
  const handle_selectperfil = (): void => {
    setselected_button('perfil');
    set_persona(undefined);

  };
  const handle_selectbuscar = (): void => {
    setselected_button('buscador');
  };
  // crear 
  const initialFormData = {
    id_persona_alertar: null,
    perfil_sistema: null,
    cod_clase_alerta: String,
    id_persona: null,
    id_unidad_org_lider: null,
  };
  const [formData, setFormData] = useState(initialFormData);
  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,

    }));
  };

  useEffect(() => {
    if (persona?.id_persona !== formData.id_persona) {
      setFormData((prevData) => ({
        ...prevData,
        id_persona: persona?.id_persona !== undefined ? persona.id_persona : null,
      }) as typeof formData); // Utilizamos "as typeof formData" para asegurar la compatibilidad de tipos
    }
  }, [persona?.id_persona]);

  useEffect(() => {
    if (formData.perfil_sistema !== null) {
      set_persona(undefined);
      setFormData((prevData) => ({
        ...prevData,
        id_unidad_org_lider: null,
      }));
    }
  }, [formData.perfil_sistema]);

  useEffect(() => {
    if (formData.id_unidad_org_lider !== null) {
      set_persona(undefined);
      setFormData((prevData) => ({
        ...prevData,
        perfil_sistema: null,
      }));
    }
  }, [formData.id_unidad_org_lider]);


  const [consecutivoActual, setConsecutivoActual] = useState<number | null>(null);
  const realizarActualizacion = async () => {
    try {
      const url = "/gestor/adminitrador_radicados/config_tipos_radicado_agno/generar_n/";
      const payload = {
        cod_tipo_radicado: "U",
        id_persona: id_persona, // Asumiendo que id_persona viene del estado de Redux
        fecha_actual: new Date().toISOString() // O la fecha que necesites enviar
      };

      const res = await api.put(url, payload);
      const data = res.data.data;
      setConsecutivoActual(data.radicado_nuevo);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Grid
        container
        spacing={2} m={2} p={2}
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
        <Title title="Generación de documento" />
        <>
          {/* ... (resto de tu JSX) */}
          <button onClick={realizarActualizacion}>Actualizar Consecutivo</button>
        
        </>
        {/* miguel
        {id_persona} */}
        {/* {idUnidadSeleccionada} */}
        <Grid item xs={12} sm={3}>

          <FormControl fullWidth size="small">
            <InputLabel id="unidad-organizacional-select-label">Unidad Organizacional</InputLabel>
            <Select
              labelId="unidad-organizacional-select-label"
              id="unidad-organizacional-select"
              value={unidadSeleccionada}
              label="Unidad Organizacional"
              onChange={handleChange}
            >
              {unidades.map((unidad) => (
                <MenuItem key={unidad.id_unidad_organizacional} value={unidad.id_unidad_organizacional}>
                  {unidad.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>


          <FormControl fullWidth size="small">
            <InputLabel id="serie-subserie-select-label">Serie/Subserie</InputLabel>
            <Select
              labelId="serie-subserie-select-label"
              id="serie-subserie-select"
              value={selectedSerieSubserie}
              label="Serie/Subserie"
              onChange={handleChangee}
            >
              {seriesSubseries.map((item) => (
                <MenuItem key={item.id_catserie_unidadorg} value={item.id_catserie_unidadorg}>
                  {item.nombre_serie_doc} {item.nombre_subserie_doc ? `- ${item.nombre_subserie_doc}` : ''}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* {nombre}

          {nombre_unidad_organizacional} */}
        <Grid item xs={12} sm={3}>
          <TextField
            label="Identificación Usuario "
            variant="outlined"
            size="small"
            fullWidth
            value={identificacion}
            onChange={(e) => setIdentificacion(e.target.value)}
          />
        </Grid>



        <Grid item xs={12} sm={3}>
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Teléfono"
            variant="outlined"
            size="small"
            fullWidth
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            label="Ciudad"
            variant="outlined"
            size="small"
            fullWidth
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            rows={3}
            fullWidth
            multiline
            size="small"
            label="Asunto"
            value={asunto}
            variant="outlined"
            onChange={(e) => setAsunto(e.target.value)}
          />
        </Grid>

        <Button onClick={generarHistoricoBajas}>Generar Informe</Button>
        <Grid item xs={12} sm={12}>
          <div>
            <embed src={visor} type="application/pdf" width="100%" height="1080px" />
          </div>
        </Grid>
      </Grid>


      <Grid container
        spacing={2}
        m={2} p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px', m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item marginTop={-2} xs={12}>
          <Title title="Destinatario" />
        </Grid>
        <Grid container
          item
          // justifyContent="center"
          spacing={2}>

          {/* <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                set_mode('lider');
                limpiar_destinatario();
              }}
            >
              A lider de unidad
            </Button> */}
          <Grid item>
            <Button variant="contained" color="primary" onClick={handle_selectlider}>  Lider de unidad</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handle_selectperfil}>  Perfil</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handle_selectbuscar}>  BuscadorPersona</Button>
          </Grid>
        </Grid>
        {selected_button === 'lider' && (
          <Grid item xs={12}>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Lider de unidad</InputLabel>
                <Select value={formData.id_unidad_org_lider} label="Lider de unidad" name="id_unidad_org_lider" onChange={handleInputChange}>
                  {lider.map((unidad) => (
                    <MenuItem key={unidad.id_unidad_organizacional} value={unidad.id_unidad_organizacional}>
                      {unidad.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}
        {selected_button === 'perfil' && (
          <><Grid item xs={12}>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Perfil</InputLabel>
                <Select value={formData.perfil_sistema} label="Perfil" name="perfil_sistema" onChange={handleInputChange}>
                  {perfil.map(item => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          </>
        )}
        {/* {selected_button === 'buscador' && (
                <Grid item xs={12}>
                    <BuscadorPersona
                        onResult={(data) => {
                            void on_result(data);
                        }}
                    />
                </Grid>
                
            )} */}

        {selected_button === 'buscador' && (
          <>
            <Grid item xs={12}>
              <BuscadorPersona
                onResult={(data) => {
                  void on_result(data);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Primer Nombre"
                variant="outlined"
                fullWidth
                size="small"
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
                value={persona?.primer_nombre}
              />
            </Grid>
          </>
        )}
        {/* <Grid item xs={12}  sm={3}> 
            <TextField
                label="Primer Nombre"
                variant="outlined"
                fullWidth
                size="small" disabled
                InputLabelProps={{
                    shrink: true,
                }}
                //   onChange={onChange}
                value={persona?.primer_nombre}
            /> </Grid> */}

        {/* <>{persona?.primer_nombre}</> */}
        {/* <>{persona?.id_persona}</> */}
        <Grid item xs={12}  >
          <DataGrid
            density="compact"
            autoHeight
            columns={columns}
            rows={data_entidad}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => row.id_persona_alertar}
          />
        </Grid>

      </Grid>






    </>
  );
};
