/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select, TextField, Button, Dialog
} from '@mui/material';
import { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import dayjs from 'dayjs';
import { logo_cormacarena_h } from '../../conservacion/Reportes/logos/logos';
import { Title } from '../../../components';
import { useSelector } from 'react-redux';
import { AuthSlice } from '../../auth/interfaces';
import { api } from '../../../api/axios';
import { BuscadorPersona } from '../../../components/BuscadorPersona';
import { control_error, control_success } from '../../../helpers';
import { Persona } from '../../../interfaces/globalModels';
import { UnidadOrganizacional } from '../../conservacion/solicitudMaterial/interfaces/solicitudVivero';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveIcon from '@mui/icons-material/Save';

export interface SerieSubserie {
  id_catserie_unidadorg: number;
  id_serie_doc: number;
  nombre_serie_doc: string;
  id_subserie_doc: number | null;
  nombre_subserie_doc: string | null;
}
export interface UnidadOrganizaciona {
  id_unidad_organizacional: number;
  nombre: string;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Facturacion: React.FC = () => {
  const { userinfo: { nombre_unidad_organizacional, nombre, id_persona } } = useSelector((state: AuthSlice) => state.auth);
  const [visor, setVisor] = useState('');

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
      await generarHistoricoBajas();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    generarHistoricoBajas();

  }, [consecutivoActual]);
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState('plantilla1');

  const generarHistoricoBajas = () => {
    const doc = new jsPDF();
    const anchoPagina = doc.internal.pageSize.width;
    const agregarEncabezado = () => {
      doc.setFontSize(22);
      doc.text("    ", anchoPagina / 2, 20, { align: 'center' });
      doc.setFontSize(12);
      doc.addImage(logo_cormacarena_h, 160, 10, 40, 10);

      if (plantillaSeleccionada === 'plantilla1') {
        let xCuadro = 120; // Ajusta según sea necesario
        let yCuadro = 25; // Ubicación justo debajo de la imagen
        let anchoCuadro = 80; // Ajusta según sea necesario
        let altoCuadro = 30; // Ajusta según sea necesari
        // Dibujar el cuadro
        doc.rect(xCuadro, yCuadro, anchoCuadro, altoCuadro);
        // Agregar texto dentro del cuadro
        doc.setFontSize(9);
        const espacioEntreLineas = 6; // Espacio entre líneas de texto
        let yTexto = yCuadro + 10; // Posición inicial del texto en Y
        doc.text("Cormacarena ", xCuadro + 30, yTexto);
        yTexto += espacioEntreLineas; // Aumentar Y para la siguiente línea
        doc.text(`Radicado: ${consecutivoActual}`, xCuadro + 10, yTexto);
        yTexto += espacioEntreLineas;

        doc.text(dayjs().format('DD/MM/YYYY'), xCuadro + 10, yTexto);
        yTexto += espacioEntreLineas; // Aumentar Y para la siguiente línea

        doc.text(`Nombre: ${nombre}`, xCuadro + 10, yTexto); // Reemplazar X con el número de hojas
      } else if (plantillaSeleccionada === 'plantilla2') {
        let xCuadro = 120; // Ajusta según sea necesario
        let yCuadro = 25; // Ubicación justo debajo de la imagen
        let anchoCuadro = 80; // Ajusta según sea necesario
        let altoCuadro = 30; // Ajusta según sea necesari
        // Dibujar el cuadro
        doc.rect(xCuadro, yCuadro, anchoCuadro, altoCuadro);
        // Agregar texto dentro del cuadro
        doc.setFontSize(9);
        const espacioEntreLineas = 6; // Espacio entre líneas de texto
        let yTexto = yCuadro + 10; // Posición inicial del texto en Y
        doc.text("Cormacarenaccc ", xCuadro + 30, yTexto);
        yTexto += espacioEntreLineas; // Aumentar Y para la siguiente línea
        doc.text(`Radicado: ${consecutivoActual}`, xCuadro + 10, yTexto);
        yTexto += espacioEntreLineas;

        doc.text(dayjs().format('DD/MM/YYYY'), xCuadro + 10, yTexto);
        yTexto += espacioEntreLineas; // Aumentar Y para la siguiente línea

        doc.text(`Nombre: ${nombre}`, xCuadro + 10, yTexto); // Reemplazar X con el número de hojas
      }


    };
    agregarEncabezado();
    // Añadir información del usuario   
    doc.setFontSize(12);
    let y = 30; // posición inicial para el texto
    // doc.text(`${consecutivoActual}`, 10, y);
    // y += 6;
    doc.text(`${nombreSerieSeleccionada} - ${nombreSubserieSeleccionada}`, 10, y);
    y += 6;
    // doc.text(dayjs().format('DD/MM/YYYY'), 10, y);
    // y += 6;
    doc.text(`Identificación: ${identificacion}`, 10, y);
    y += 6;
    doc.text(`Email: ${email}`, 10, y);
    y += 6;
    doc.text(`Tel.: ${telefono}`, 10, y);
    y += 6;
    doc.text(`Ciudad: ${ciudad}`, 10, y);
    y += 6;
    doc.text(``, 10, y);
    y += 6; doc.text(``, 10, y);
    y += 6;
//     y += 6;
//     doc.text(`Cordial Saludo, En consideración al proceso de liquidación del instrumento económico mencionado 
// en el asunto, por medio de la presente solicito amablemente su colaboración para obtener 
// la siguiente información:`, 10, y);

    doc.text(`Asunto: Solicitud de información requerida para llevar a cabo el proceso de liquidación de los 
documentos de cobro de la vigencia 2023 de la tasa por utilización de agua.

Cordial Saludo,
    
Teniendo en cuenta el proceso de liquidación del instrumento económico tasa por utilización del agua, 
por medio de la presente solicito amablemente su colaboración para obtener la siguiente información: 
    
a)Usuarios cuyos expedientes fueron archivados en el periodo comprendido del 01 de enero al 31 
de diciembre de 2023. 
    
b)Nuevos usuarios a quienes se les haya otorgado permiso de concesión de agua durante el 
periodo comprendido del 01 de enero al 31 de diciembre de 2023. 
    
Este reporte se deberá diligenciar en la matriz que se remite como adjunto y debe ser enviada
al correo gruporentas@cormacarena.gov.co  y/o facturacion.rentas@cormacarena.gov.co. Es importante
mencionar la prioridad de esta información, por lo que se requiere que sea entregada a más tardar 
el 12 de enero del 2024, con la finalidad de llevar a cabo un proceso eficiente en términos de
tiempo y manejo adecuado de la información. Agradezco la atención prestada.
    
Atentamente,    
    `, 10, y);
y += 6;




    y += 6;
    // doc.text(`mencionado en el asunto, por medio de la presente solicito amablemente su colaboración para obtener la siguiente información:`, 10, y);
    // y += 6;
    doc.text(``, 10, y);
    y += 6;
    doc.text(``, 10, y);
    y += 6;
    doc.text(``, 10, y);
    y += 6; doc.text(``, 10, y);
    y += 6; doc.text(``, 10, y);
    y += 6;
    y += 6; doc.text(``, 10, y);
    y += 6;
    y += 6; doc.text(``, 10, y);
    y += 6;
    y += 6; doc.text(``, 10, y);
    y += 6;
    y += 6; doc.text(``, 10, y);
    y += 6;
    y += 6; doc.text(``, 10, y);
    y += 6;
  
    
    // Espacio antes del asunto
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


  const [idUnidadSeleccionada, setIdUnidadSeleccionada] = useState('');
  
  const [unidadSeleccionada, setUnidadSeleccionada] = useState('');

  const [unidades, setUnidades] = useState<UnidadOrganizaciona[]>([]);

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
  const [asunto, setAsunto] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [Fecha, setFecha] = useState('');

  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ciudad, setCiudad] = useState('');


  const dataURItoBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const generarArchivo = () => {
    const blob = dataURItoBlob(visor);
    return new File([blob], "documento.pdf", { type: "application/pdf" });
  };
  const initialFormData = {
    id_persona_alertar: null,
    perfil_sistema: null,
    cod_clase_alerta: String,
    id_persona: null,
    id_unidad_org_lider: undefined,

  };
  const [formData, setFormData] = useState(initialFormData);
  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,

    }));
  };


  const miVariable = `${formData.id_unidad_org_lider}`;
  const enviarDocumento = async () => {

    try {
      const formData = new FormData();

      formData.append("radicado", `${consecutivoActual}`);
      formData.append("ids_destinatarios_personas", `${persona?.id_persona}`);
      formData.append("ids_destinatarios_unidades", `${miVariable}`);

      formData.append("id_persona", id_persona.toString());

      const archivo = generarArchivo();
      formData.append("archivo", archivo);
      const url = "/recaudo/formulario/documento_formulario_recuado/";
      const response = await api.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Documento enviado con éxito", response.data);
      control_success("Documento enviado con éxito");

    } catch (error) {
      console.error("Error al enviar el documento", error);
    }
  };






  const [persona, set_persona] = useState<Persona | null>();
  const on_result = async (info_persona: Persona): Promise<void> => { set_persona(info_persona); }









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

  const handle_selectbuscar = (): void => {
    setselected_button('buscador');
    setFormData(initialFormData);
  };
  // crear 

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
        id_unidad_org_lider: undefined,
      }));
    }
  }, [formData.perfil_sistema]);

  useEffect(() => {
    if (formData.id_unidad_org_lider !== undefined) {
      set_persona(undefined);
      setFormData((prevData) => ({
        ...prevData,
        perfil_sistema: null,
      }));
    }
  }, [formData.id_unidad_org_lider]);

  const [is_modal_active, set_is_buscar] = useState<boolean>(false);
  const handle_open_buscar = (): void => {
    if (persona?.id_persona === undefined && formData.id_unidad_org_lider === undefined) {
      control_error("Deves de elejir un destinatario ");
    } else {
      set_is_buscar(true);
      realizarActualizacion();

    }
  };


  const handle_close = (): void => {
    set_is_buscar(false);
    enviarDocumento();
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

        {/* <FormControl fullWidth size="small">
          <InputLabel id="plantilla-select-label">Seleccionar Plantilla</InputLabel>
          <Select
            labelId="plantilla-select-label"
            id="plantilla-select"
            value={plantillaSeleccionada}
            label="Seleccionar Plantilla"
            onChange={(e) => setPlantillaSeleccionada(e.target.value)}
          >
            <MenuItem value="plantilla1">Plantilla con Cuadro</MenuItem>
            <MenuItem value="plantilla2">Plantilla sin Cuadro</MenuItem>
          </Select>
        </FormControl> */}

        <Dialog open={is_modal_active} onClose={handle_close} maxWidth="xl">
          <Grid container
            item xs={12} marginLeft={2} marginRight={2} marginTop={3}
            sx={{

              width: '900px', // Cambia '700px' por el ancho que desees
              height: '900px', // Cambia '500px' por el alto que desees
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px', m: '10px 0 20px 0', mb: '20px',
              boxShadow: '0px 3px 6px #042F4A26',
            }}

          >
            <Grid item xs={12} >
              <Title title="Numero de radicado" />

            </Grid>
            <Grid item xs={12} marginTop={3} >
              <div>
                <h3>Radicado : {consecutivoActual}</h3>
              </div>
            </Grid>

          </Grid>
        </Dialog>

        <>


          {/* ... (resto de tu JSX) */}

        </>
        {/* miguel
        {id_persona} */}
        {/* {idUnidadSeleccionada} */}
        <Grid item xs={12} sm={4}>
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
        <Grid item xs={12} sm={4}>
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
        <Grid item xs={12} sm={4}>
          <TextField
            label="Identificación Usuario "
            variant="outlined"
            size="small"
            fullWidth
            value={identificacion}
            onChange={(e) => setIdentificacion(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Fecha"
            variant="outlined"
            size="small"
            fullWidth
            value={Fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Teléfono"
            variant="outlined"
            size="small"
            fullWidth
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
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
        <Grid item >

          <Button startIcon={<VisibilityIcon />} variant='contained' onClick={generarHistoricoBajas}>Ver borrador </Button>
        </Grid>
        <Grid item >

          <Button
            startIcon={<SaveIcon />}
            color='success'
            variant='contained'
            onClick={handle_open_buscar}
          >Enviar Documento
          </Button>
        </Grid>
        <Grid item xs={12} sm={12}>
          {/* <Button onClick={enviarDocumento}>Enviar Documento</Button> */}
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
            <Button variant="contained" color="primary" onClick={handle_selectbuscar}>  BuscadorPersona</Button>
          </Grid>
        </Grid>
        {/* {formData.id_unidad_org_lider} */}
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

        {/* <>{persona?.id_persona}</> */}


      </Grid>
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
        <Grid item xs={12} sm={12}>
          <embed src={visor} type="application/pdf" width="100%" height="1080px" />
        </Grid>

      </Grid>








    </>
  );
};
