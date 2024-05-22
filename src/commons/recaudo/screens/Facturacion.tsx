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
  Select,
  TextField,
  Button,
  Dialog,
  Switch,
} from '@mui/material';
import { SetStateAction, useEffect, useState } from 'react';
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
import {
  remicion_viso,
  constancia_publicacion,
  plantila_4,
  constancia_publicaci5,
  citacion,
  documento8,
} from '../plantillasRecaudo/miguel';
import { AlertaDestinatario } from '../alertas/components/AlertaDestinatario';
import { DialogGeneradorDeDirecciones } from '../../../components/DialogGeneradorDeDirecciones';
import { AlertaDocumento } from './AlertaDocumento';

export interface SerieSubserie {
  tiene_configuracion: any;
  id_cat_serie_und: number;
  id_serie_doc: number;
  cod_serie_doc: string;
  nombre_serie_doc: string;
  id_subserie_doc: number | null;
  cod_subserie_doc: string | null;
  nombre_subserie_doc: string | null;
}

export interface UnidadOrganizaciona {
  codigo: any;
  nombre: string;
  tiene_configuracion: any;
  id_unidad_organizacional: number;
}
interface TipoRadicado {
  value: string;
  label: string;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Facturacion: React.FC = () => {
  const {
    userinfo: { nombre_unidad_organizacional, nombre, id_persona },
  } = useSelector((state: AuthSlice) => state.auth);
  const [visor, setVisor] = useState('');
  // const [consecutivo, setConsecutivo] = useState<string | null>(null);
  const [personaselet, setpersona] = useState<string[]>([]);
  const [perfilselet, setperfilselet] = useState<string[]>([]); // Asumiendo que es un string
  const [lideresUnidad, setLideresUnidad] = useState<string[]>([]); // Asumiendo que es un string

  const [consecutivoActual, setConsecutivoActual] = useState<number | null>(
    null
  );
  const [consecutivo_id, setConsecutivo_id] = useState<number | null>(null);

  const [radicadof, setradicadof] = useState<number | null>(null);

  const handleSubmitRadicado = async () => {
    try {
      const url = '/gestor/adminitrador_radicados/crear-radicado/';
      const fecha_actual = new Date().toISOString(); // Formato de fecha ISO

      const payload = {
        id_persona: id_persona,
        tipo_radicado: tipos_radicado,
        fecha_actual: fecha_actual,
        modulo_radica: 'Generador de Documento',
      };
      const response = await api.post(url, payload);
      setradicadof(response.data?.data?.radicado_nuevo);

      const numeroRadicado = response.data.nro_radicado;

      control_success('Numero de radicado creado');
    } catch (error: any) {
      // control_error(error.response.data.detail?.error);
      control_error(error.response.data.detail);
    }
  };

  const [tipos_radicado, settipos_radicado] = useState('');

  // Función para manejar el cambio en el select
  const handleradicado = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    settipos_radicado(event.target.value);
  };
  const [tiposRadicado, setTiposRadicado] = useState<TipoRadicado[]>([]);

  const fetchTiposRadicado = async () => {
    try {
      const response = await api.get('/gestor/choices/tipo-radicado/');

      // Aseguramos que cada elemento mapeado cumpla con la interfaz TipoRadicado
      const tipos: TipoRadicado[] = response.data.map(
        ([value, label]: [string, string]) => ({ value, label })
      );

      setTiposRadicado(tipos);
    } catch (error: any) {
      // console.error('Error al obtener los tipos de radicado:', error);
      control_error(error.response.data.detail);
    }
  };

  useEffect(() => {
    fetchTiposRadicado();
  }, []);

  const realizarActualizacion = async () => {
    try {
      const url =
        '/gestor/adminitrador_radicados/config_tipos_radicado_agno/generar_n/';
      const payload = {
        cod_tipo_radicado: 'U',
        id_persona: id_persona, // Asumiendo que id_persona viene del estado de Redux
        fecha_actual: new Date().toISOString(), // O la fecha que necesites enviar
      };

      const res = await api.put(url, payload);
      const data = res.data.data;
      // setConsecutivoActual(data.radicado_nuevo);
      await generarHistoricoBajas();
    } catch (error: any) {
      // console.error(error);
      control_error(error.response.data.detail);
    }
  };

  useEffect(() => {
    generarHistoricoBajas();
  }, [consecutivoActual]);

  const [opcionSeleccionada, setOpcionSeleccionada] = useState('1');

  // Función para manejar el cambio en el select
  const handleChangeee = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setOpcionSeleccionada(event.target.value);
  };
  const [plantillaSeleccionada, setPlantillaSeleccionada] =
    useState('plantilla1');

  const generarHistoricoBajas = () => {
    const doc = new jsPDF();
    const anchoPagina = doc.internal.pageSize.width;
    const agregarEncabezado = () => {
      doc.setFontSize(22);
      doc.text('    ', anchoPagina / 2, 20, { align: 'center' });
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
        doc.text('Cormacarena ', xCuadro + 30, yTexto);
        yTexto += espacioEntreLineas; // Aumentar Y para la siguiente línea
        doc.text(`Radicado: ${radicadof}`, xCuadro + 10, yTexto);
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
        doc.text('Cormacarenaccc ', xCuadro + 30, yTexto);
        yTexto += espacioEntreLineas; // Aumentar Y para la siguiente línea
        doc.text(`Radicado: ${radicadof}`, xCuadro + 10, yTexto);
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
    // ${nombreSerieSeleccionada} - ${nombreSubserieSeleccionada}

    doc.text(`${consecutivoActual}`, 10, y);
    y += 6;

    // doc.text(`Serie ${unidadSeleccionada} - Subserie ${selectedSerieSubserie}`, 10, y);
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
    y += 6;

    let textoPersonalizado = `
    Asunto: Solicitud de información requerida para llevar a cabo el proceso de liquidación de los documentos de cobro de la vigencia  ${
      Fecha_vigencia ? Fecha_vigencia : '__________'
    } de la tasa por utilización de agua.

Cordial Saludo,
Teniendo en cuenta el proceso de liquidación del instrumento económico tasa por utilización del agua, por medio de la presente solicito amablemente su colaboración para obtener la siguiente información:
a) Usuarios cuyos expedientes fueron archivados en el periodo comprendido del ${
      Fecha_a ? Fecha_a : '__________'
    } .
b) Nuevos usuarios a quienes se les haya otorgado permiso de concesión de agua durante el periodo comprendido del ${
      Fecha_b ? Fecha_b : '__________'
    } .
Este reporte se deberá diligenciar en la matriz que se remite como adjunto y debe ser enviada al correo gruporentas@cormacarena.gov.co  y/o facturacion.rentas@cormacarena.gov.co. Es importante mencionar la prioridad de esta información, por lo que se requiere que sea entregada a más tardar el ${
      Fecha_entrega ? Fecha_entrega : '__________'
    } , con la finalidad de llevar a cabo un proceso eficiente en términos de tiempo y manejo adecuado de la información. Agradezco la atención prestada.


     `;

    let textoAMostrar: string;

    if (opcionSeleccionada === '1') {
      textoAMostrar = `
  Asunto: Solicitud de información requerida para llevar a cabo el proceso de liquidación de los documentos de cobro de la vigencia  ${
    Fecha_vigencia ? Fecha_vigencia : '__________'
  } de la tasa por utilización de agua.

Cordial Saludo,
Teniendo en cuenta el proceso de liquidación del instrumento económico tasa por utilización del agua, por medio de la presente solicito amablemente su colaboración para obtener la siguiente información:
a) Usuarios cuyos expedientes fueron archivados en el periodo comprendido del ${
        Fecha_a ? Fecha_a : '__________'
      } .
b) Nuevos usuarios a quienes se les haya otorgado permiso de concesión de agua durante el periodo comprendido del ${
        Fecha_b ? Fecha_b : '__________'
      } .
Este reporte se deberá diligenciar en la matriz que se remite como adjunto y debe ser enviada al correo gruporentas@cormacarena.gov.co  y/o facturacion.rentas@cormacarena.gov.co. Es importante mencionar la prioridad de esta información, por lo que se requiere que sea entregada a más tardar el ${
        Fecha_entrega ? Fecha_entrega : '__________'
      } , con la finalidad de llevar a cabo un proceso eficiente en términos de tiempo y manejo adecuado de la información. Agradezco la atención prestada.


   `;
    } else if (opcionSeleccionada === '2') {
      textoAMostrar = `${remicion_viso(expediente_2, Fecha_2, opcionSiNo2)}  `;
    } else if (opcionSeleccionada === '3') {
      textoAMostrar = `${constancia_publicacion(
        Fecha_3,
        Fecha_acto_3,
        expediente_3,
        fijacion_3,
        des_fijacion_3,
        cc_3,
        nombre_3,
        empresa_3,
        nombre_nit_3,
        nombre_enpresa_3
      )}`;
    } else if (opcionSeleccionada === '4') {
      textoAMostrar = ` ${plantila_4(
        Fecha_4,
        nombre_4,
        cc_4,
        constancia_4,
        constancia_des_4,
        opcionSiNo,
        dias_4
      )}`;
    } else if (opcionSeleccionada === '5') {
      textoAMostrar = `  ${constancia_publicaci5(email)}  `;
    } else if (opcionSeleccionada === '6') {
      textoAMostrar = `  ${citacion(opcion_6, numero_6)}  `;
    } else if (opcionSeleccionada === '8') {
      textoAMostrar = `  ${documento8(
        Fecha_8,
        Fecha_8remi,
        empresa_8,
        nit_8,
        opcion_8,
        dias_8
      )}  `;
    } else if (opcionSeleccionada === '9') {
      textoAMostrar = ``;
    } else {
      textoAMostrar = ''; // Valor predeterminado o manejo del caso 'undefined'
    }
    // Configuraciones iniciales
    const lineHeight = 6; // Altura de línea para el texto
    const margin = 10; // Márgenes izquierdo y derecho
    const pageHeight = doc.internal.pageSize.height; // Altura de la página

    // let y = 30; // posición inicial para el texto

    // Función para añadir texto con control de páginas
    const addTextWithPageControl = (text: string) => {
      let lines = doc.splitTextToSize(
        text,
        doc.internal.pageSize.width - 2 * margin
      ); // Divide el texto en líneas

      lines.forEach((line: string | string[]) => {
        if (y > pageHeight - 20) {
          // 20 es el margen inferior
          doc.addPage();
          y = 20; // Restablecer Y para la nueva página
        }
        doc.text(line, margin, y);
        y += lineHeight;
      });
    };

    // Añadir texto con control de páginas
    addTextWithPageControl(textoAMostrar);

    // y += 6; doc.text(textoAMostrar, 10, y);
    //     y += 6;

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
    // doc.text(`Firma _____________________`, 10, yFinal);
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
      const url =
        '/gestor/consecutivos-unidades/unidades_organigrama_actual/get/';
      const res = await api.get(url);
      const unidadesData = res.data.data;
      setUnidades(unidadesData);
    } catch (error: any) {
      // console.error(error);
      control_error(error.response.data.detail);
    }
  };

  useEffect(() => {
    fetchUnidades();
  }, []);

  useEffect(() => {
    generarHistoricoBajas();
  }, [opcionSeleccionada]);

  const handleChange = (event: any) => {
    setUnidadSeleccionada(event.target.value as string);
    const selectedId = event.target.value;
    setIdUnidadSeleccionada(selectedId);
  };

  const [selectedSerieSubserie, setSelectedSerieSubserie] = useState(null);

  const [seriesSubseries, setSeriesSubseries] = useState<SerieSubserie[]>([]);
  const fetchSeriesSubseries = async () => {
    try {
      const url = `/gestor/consecutivos-unidades/serie_subserio_unidad/get/${idUnidadSeleccionada}/`;
      const res = await api.get(url);
      const data = res.data.data;
      setSeriesSubseries(data);
    } catch (error: any) {
      // console.error(error);
      // control_error(error.response.data.detail);
    }
  };

  useEffect(() => {
    fetchSeriesSubseries();
  }, [idUnidadSeleccionada]);

  useEffect(() => {
    fetchSeriesSubseries();
  }, [idUnidadSeleccionada]);
  const [nombreSerieSeleccionada, setNombreSerieSeleccionada] = useState('');
  const [nombreSubserieSeleccionada, setNombreSubserieSeleccionada] =
    useState('');

  const handleChangee = (event: { target: { name: any; value: any } }) => {
    setSelectedSerieSubserie(event.target.value as any);

    const selectedValue = event.target.value;
    setSelectedSerieSubserie(selectedValue);

    const selectedElement = seriesSubseries.find(
      (item) => item.id_cat_serie_und === selectedValue
    );

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
  const [Fecha_vigencia, setFecha_vigencia] = useState('');
  const [Fecha_entrega, setFecha_entrega] = useState('');

  const [Fecha_a, setFecha_a] = useState('');
  const [Fecha_b, setFecha_b] = useState('');

  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ciudad, setCiudad] = useState('');

  const [expediente_2, setexpediente_2] = useState('');
  const [Fecha_2, setFecha_2] = useState('');
  const [opcionSiNo2, setOpcionSiNo2] = useState('');
  const handleChangeSiNo2 = (event: any) => {
    setOpcionSiNo2(event.target.value);
  };

  const [Fecha_3, setFecha_3] = useState('');
  const [Fecha_acto_3, setFecha_acto3] = useState('');
  const [expediente_3, setexpediente_3] = useState('');
  const [fijacion_3, setfijacion_3] = useState('');
  const [des_fijacion_3, setdes_fijacion_3] = useState('');
  const [cc_3, setcc_3] = useState('');
  const [nombre_3, setnombre_3] = useState('');

  const [nombre_enpresa_3, setnombre_enpresa_3] = useState('');
  const [nombre_nit_3, setnombre_nit_3] = useState('');
  const [empresa_3, setempresa_3] = useState('Si');
  const handleChangeSiNo3 = (event: any) => {
    setempresa_3(event.target.value);
  };
  const [Fecha_4, setFecha_4] = useState('');
  const [nombre_4, setnombre_4] = useState('');
  const [cc_4, setcc_4] = useState('');
  const [constancia_4, setconstancia_4] = useState('');
  const [constancia_des_4, setconstancia_des_4] = useState('');
  const [dias_4, setdias_4] = useState('');

  const handleInputChangel = (e: { target: { value: any } }) => {
    const inputValue = e.target.value;
    // Expresión regular para permitir solo números
    const numericInput = inputValue.replace(/[^0-9]/g, '');
    setdias_4(numericInput);
  };

  const [opcionSiNo, setOpcionSiNo] = useState('');
  const handleChangeSiNo = (event: any) => {
    setOpcionSiNo(event.target.value);
  };

  const [numero_6, setnumero_6] = useState('');

  const [opcion_6, setOpcion_6] = useState('');
  const handleChange_6 = (event: any) => {
    setOpcion_6(event.target.value);
  };

  const [Fecha_8, setFecha_8] = useState('');
  const [Fecha_8remi, setFecha_8remi] = useState('');

  const [empresa_8, setempresa_8] = useState('');
  const [nit_8, setnit_8] = useState('');
  const [opcion_8, setOpcion_8] = useState('');
  const handleChange_8 = (event: any) => {
    setOpcion_8(event.target.value);
  };
  const [dias_8, setdias_8] = useState('');

  const handleInputChangel_8 = (e: { target: { value: any } }) => {
    const inputValue = e.target.value;
    // Expresión regular para permitir solo números
    const numericInput = inputValue.replace(/[^0-9]/g, '');
    setdias_8(numericInput);
  };

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
    return new File([blob], 'documento.pdf', { type: 'application/pdf' });
  };
  const initialFormData = {
    id_persona_alertar: null,
    perfil_sistema: null,
    cod_clase_alerta: String,
    id_persona: null,
    id_unidad_org_lider: undefined,
  };
  const [formData, setFormData] = useState(initialFormData);
  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    generarHistoricoBajas();
  }, [empresa_3]);

  const miVariable = `${formData.id_unidad_org_lider}`;
  const enviarDocumento = async () => {
    try {
      const formData = new FormData();
      const personaseletArrayString = JSON.stringify(personaselet);
      const perfilseletArrayString = JSON.stringify(perfilselet);
      const liderseletArrayString = JSON.stringify(lideresUnidad);

      formData.append('radicado', `${consecutivoActual}`);
      formData.append('id_persona', id_persona.toString());

      formData.append(
        'ids_destinatarios_personas',
        `${personaseletArrayString}`
      );
      formData.append('id_consecutivo', `${consecutivo_id}`);

      formData.append('ids_destinatarios_unidades', `${liderseletArrayString}`);
      formData.append(
        'ids_destinatarios_perfiles',
        `${perfilseletArrayString}`
      );

      const archivo = generarArchivo();
      formData.append('archivo', archivo);
      const url = '/recaudo/formulario/documento_formulario_recuado/';
      const response = await api.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Documento enviado con éxito', response.data);
      control_success('Documento enviado con éxito');
    } catch (error: any) {
      // console.error("Error al enviar el documento", error);}
      control_error(error.response.data.detail);
    }
  };

  const [persona, set_persona] = useState<Persona | null>();
  const on_result = async (info_persona: Persona): Promise<void> => {
    set_persona(info_persona);
  };

  const [lider, set_lider] = useState<UnidadOrganizacional[]>([]);

  useEffect(() => {
    const fetch_perfil = async (): Promise<void> => {
      try {
        const url = `/transversal/organigrama/unidades/get-list/organigrama-actual/`;
        const res_lider = await api.get(url);
        const alertas_lider = res_lider.data.data;
        set_lider(alertas_lider);
        console.log('222222222222');
        console.log(alertas_lider);
        console.log('111111111111');
      } catch (error: any) {
        // console.error(error);
        control_error(error.response.data.detail);
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
      setFormData(
        (prevData) =>
          ({
            ...prevData,
            id_persona:
              persona?.id_persona !== undefined ? persona.id_persona : null,
          } as typeof formData)
      ); // Utilizamos "as typeof formData" para asegurar la compatibilidad de tipos
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
    handleSubmitRadicado();

    set_is_buscar(true);
    crearConsecutivo();
    // realizarActualizacion();
  };

  const [consecutivo_error, setconsecutivo_error] = useState<any>(null);

  // const handle_close = (): void => {
  //   set_is_buscar(false);
  //   enviarDocumento();
  // };
  const handle_close = (): void => {
    set_is_buscar(false);
    // setConsecutivoActual(null);
    if (!consecutivo_error) {
      enviarDocumento();
      setconsecutivo_error('Documento no enviado ');
    }
    setconsecutivo_error(null);
  };

  async function crearConsecutivo() {
    try {
      const fechaActual = new Date().toISOString();
      const url = `/gestor/consecutivos-unidades/consecutivo/create/`;
      const data = {
        id_unidad: unidadSeleccionada,
        id_cat_serie_und: selectedSerieSubserie,
        id_persona: id_persona,
        fecha_actual: fechaActual,
      };
      // Asumiendo que `api` es una instancia de Axios o similar para hacer la petición
      const res = await api.post(url, data);
      console.log('Consecutivo creado con éxito', res.data);
      // Actualizar el DOM o el estado para mostrar el valor de consecutivo
      setConsecutivoActual(res.data?.data?.consecutivo);
      setConsecutivo_id(res.data?.data?.id_consecutivo);
    } catch (error: any) {
      console.error('Error al crear el consecutivo', error);
      control_error(error.response.data.detail);
      setconsecutivo_error(error.response.data.detail);
      // Manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
    }
  }

  const isButtonDisabled = !unidadSeleccionada;

  const [opengeneradordirecciones, setopengeneradordirecciones] =
    useState(false);
  const [
    type_direction, // set_type_direction
  ] = useState('');
  const [Fecha_e, setFecha_e] = useState('');

  useEffect(() => {
    setSeriesSubseries([]);
  }, [unidadSeleccionada]);

  return (
    <>
      <DialogGeneradorDeDirecciones
        open={opengeneradordirecciones}
        openDialog={setopengeneradordirecciones}
        onChange={setFecha_e} // Pasa la función para mostrar la dirección generada
        type={type_direction}
      />
      <Grid
        container
        spacing={2}
        m={2}
        p={2}
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
        {/* {Fecha_e} */}
        {/* {radicadof} */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="opcion-select-label">Plantilla</InputLabel>
            <Select
              labelId="Plantilla"
              value={opcionSeleccionada}
              label="Opción"
              onChange={handleChangeee}
            >
              <MenuItem value="9">Vacio</MenuItem>
              {/* <MenuItem value="5">5 </MenuItem> */}
              <MenuItem value="6">Citación</MenuItem>
              <MenuItem value="8">Notificación </MenuItem>
              <MenuItem value="2">Remisión por aviso</MenuItem>
              <MenuItem value="1">Solicitud de información</MenuItem>
              <MenuItem value="3">
                Constancia de publicación de citación
              </MenuItem>
              <MenuItem value="4">
                Constancia de publicación de notificación{' '}
              </MenuItem>
              {/* <MenuItem value="7">7</MenuItem> */}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="opcion-select-label">Radicado</InputLabel>
            <Select
              labelId="Radicado"
              value={tipos_radicado}
              label="Opción"
              onChange={handleradicado}
            >
              <MenuItem value="NA">Sin radicado</MenuItem>
              {tiposRadicado.map((tipo) => (
                <MenuItem key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* <Grid item xs={4}>
          <Button
            variant="contained"
            onClick={() => {
              setopengeneradordirecciones(true);
            }}
          >
            {' '}
            Generar dirección
          </Button>
        </Grid> */}

        <Dialog open={is_modal_active} onClose={handle_close} maxWidth="xl">
          <Grid
            container
            item
            xs={12}
            marginLeft={2}
            marginRight={2}
            marginTop={3}
            sx={{
              width: '900px', // Cambia '700px' por el ancho que desees
              height: '900px', // Cambia '500px' por el alto que desees
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px',
              m: '10px 0 20px 0',
              mb: '20px',
              boxShadow: '0px 3px 6px #042F4A26',
            }}
          >
            <Grid item xs={12}>
              <Title title="Numero de radicado" />
            </Grid>
            <Grid item xs={12} marginTop={3}>
              <div>
                <h3>Radicado : {radicadof}</h3>

                <h3>N Consecutivo: {consecutivoActual}</h3>
              </div>
            </Grid>
          </Grid>
        </Dialog>

        <>{/* ... (resto de tu JSX) */}</>
        {/* miguel
        {id_persona} */}
        {/* {idUnidadSeleccionada} */}

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="unidad-organizacional-select-label">
              Unidad Organizacional
            </InputLabel>
            <Select
              labelId="unidad-organizacional-select-label"
              id="unidad-organizacional-select"
              value={unidadSeleccionada}
              label="Unidad Organizacional"
              onChange={handleChange}
            >
              {unidades.map((unidad) => (
                <MenuItem
                  key={unidad.id_unidad_organizacional}
                  value={unidad.id_unidad_organizacional}
                  disabled={!unidad.tiene_configuracion} // Deshabilita el MenuItem si tiene_configuracion es false
                >
                  {unidad.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="serie-subserie-select-label">
              Serie/Subserie
            </InputLabel>
            <Select
              labelId="serie-subserie-select-label"
              id="serie-subserie-select"
              value={selectedSerieSubserie}
              label="Serie/Subserie"
              onChange={handleChangee}
            >
              {seriesSubseries.map((item) => (
                <MenuItem
                  key={item.id_cat_serie_und}
                  value={`${item.id_cat_serie_und}`}
                  disabled={!item.tiene_configuracion}
                >
                  {item.nombre_serie_doc}{' '}
                  {item.nombre_subserie_doc
                    ? `- ${item.nombre_subserie_doc}`
                    : ''}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* id_cat_serie_und */}
        {/* {selectedSerieSubserie} */}

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

        {opcionSeleccionada === '1' ? (
          <>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="date"
                size="small"
                variant="outlined"
                label=" Fecha vigencia"
                InputLabelProps={{ shrink: true }}
                value={Fecha_vigencia}
                onChange={(e) => setFecha_vigencia(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="date"
                size="small"
                value={Fecha_a}
                label="Fecha (A"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setFecha_a(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="date"
                size="small"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                label="Fecha (B"
                value={Fecha_b}
                onChange={(e) => setFecha_b(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="date"
                size="small"
                variant="outlined"
                value={Fecha_entrega}
                label=" Fecha entrega"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setFecha_entrega(e.target.value)}
              />
            </Grid>
          </>
        ) : null}

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            label="Email"
            value={email}
            variant="outlined"
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

        {opcionSeleccionada === '2' ? (
          <>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                value={expediente_2}
                label="N Expediente"
                variant="outlined"
                onChange={(e) => setexpediente_2(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="date"
                size="small"
                variant="outlined"
                label="Fecha"
                value={Fecha_2}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setFecha_2(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="si-no-select-label">
                  {' '}
                  procede recurso
                </InputLabel>
                <Select
                  labelId="Procede recurso"
                  value={opcionSiNo2}
                  label="procede recurso"
                  onChange={handleChangeSiNo2}
                >
                  <MenuItem value="Si">Sí</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </>
        ) : null}

        {opcionSeleccionada === '3' ? (
          <>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="date"
                size="small"
                variant="outlined"
                label="Fecha"
                value={Fecha_3}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setFecha_3(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                value={expediente_3}
                label="N Expediente"
                variant="outlined"
                onChange={(e) => setexpediente_3(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={12} sm={4}>
              <Switch
                defaultChecked={empresa_3} // Establece el estado predeterminado del Switch
                onChange={(event) => setempresa_3(event.target.checked)} // Maneja el cambio de estado del Switch y actualiza el estado
              />
            </Grid> */}

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="si-no-select-label">
                  Persona / Empresa
                </InputLabel>
                <Select
                  labelId="Procede recurso"
                  value={empresa_3}
                  label="Persona / Empresa"
                  onChange={handleChangeSiNo3}
                >
                  <MenuItem value="Si">persona</MenuItem>
                  <MenuItem value="No">empresa</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* {empresa_3} */}

            {empresa_3 === 'Si' ? (
              <>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    value={nombre_3}
                    label="Nombre"
                    onChange={(e) => setnombre_3(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    value={cc_3}
                    label="N Identificacion    "
                    onChange={(e) => setcc_3(e.target.value)}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    value={nombre_enpresa_3}
                    label="Nombre de empresa"
                    onChange={(e) => setnombre_enpresa_3(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    value={nombre_nit_3}
                    label="Nit de empresa"
                    onChange={(e) => setnombre_nit_3(e.target.value)}
                  />
                </Grid>
              </>
            )}

            {empresa_3 ? <></> : <></>}

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={fijacion_3}
                label="Constancio de fijación"
                onChange={(e) => setfijacion_3(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                value={des_fijacion_3}
                label="Constancio de desfijación"
                variant="outlined"
                onChange={(e) => setdes_fijacion_3(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="date"
                size="small"
                variant="outlined"
                label="Fecha del acto administrativo"
                value={Fecha_acto_3}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setFecha_acto3(e.target.value)}
              />
            </Grid>
          </>
        ) : null}
        {opcionSeleccionada === '4' ? (
          <>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="date"
                size="small"
                variant="outlined"
                label="Fecha"
                value={Fecha_4}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setFecha_4(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Nombre"
                variant="outlined"
                size="small"
                fullWidth
                value={nombre_4}
                onChange={(e) => setnombre_4(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Numeor de dias     "
                variant="outlined"
                size="small"
                fullWidth
                value={dias_4}
                onChange={handleInputChangel}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Nit"
                variant="outlined"
                size="small"
                fullWidth
                value={cc_4}
                onChange={(e) => setcc_4(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="si-no-select-label">
                  {' '}
                  procede recurso
                </InputLabel>
                <Select
                  labelId="Procede recurso"
                  value={opcionSiNo}
                  label="procede recurso"
                  onChange={handleChangeSiNo}
                >
                  <MenuItem value="Si">Sí</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Constancia de fijación "
                variant="outlined"
                size="small"
                fullWidth
                value={constancia_4}
                onChange={(e) => setconstancia_4(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Constancia de desfijación "
                variant="outlined"
                size="small"
                fullWidth
                value={constancia_des_4}
                onChange={(e) => setconstancia_des_4(e.target.value)}
              />
            </Grid>

            {/* {opcionSiNo} */}
          </>
        ) : null}
        {opcionSeleccionada === '6' ? (
          <>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="si-no-select-label">Artículo </InputLabel>
                <Select
                  labelId="Articulo"
                  value={opcion_6}
                  label="Confirmación"
                  onChange={handleChange_6}
                >
                  <MenuItem value="artículo 44 CCA">artículo 44 CCA</MenuItem>
                  <MenuItem value=" artículo 68 CPACA">
                    {' '}
                    artículo 68 CPACA
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Numero"
                variant="outlined"
                size="small"
                fullWidth
                value={numero_6}
                onChange={(e) => setnumero_6(e.target.value)}
              />
            </Grid>

            {/* {opcion_6} */}
          </>
        ) : null}
        {opcionSeleccionada === '8' ? (
          <>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="date"
                size="small"
                variant="outlined"
                label="Fecha"
                value={Fecha_8}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setFecha_8(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="date"
                size="small"
                variant="outlined"
                label="Fecha remicion"
                value={Fecha_8remi}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setFecha_8remi(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Nombre de empresa"
                variant="outlined"
                size="small"
                fullWidth
                value={empresa_8}
                onChange={(e) => setempresa_8(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Nit"
                variant="outlined"
                size="small"
                fullWidth
                value={nit_8}
                onChange={(e) => setnit_8(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="si-no-select-label">
                  procede recurso de reposición
                </InputLabel>
                <Select
                  labelId="procede recurso de reposición"
                  value={opcion_8}
                  label="procede recurso de reposición"
                  onChange={handleChange_8}
                >
                  <MenuItem value="si">Si</MenuItem>
                  <MenuItem value="no ">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Numeor de dias     "
                variant="outlined"
                size="small"
                fullWidth
                value={dias_8}
                onChange={handleInputChangel_8}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              />
            </Grid>
          </>
        ) : null}

        <Grid item xs={12} sm={12}>
          <TextField
            rows={3}
            fullWidth
            multiline
            size="small"
            label="Observaciones"
            value={asunto}
            variant="outlined"
            onChange={(e) => setAsunto(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button
            startIcon={<VisibilityIcon />}
            variant="contained"
            onClick={generarHistoricoBajas}
          >
            Ver borrador{' '}
          </Button>
        </Grid>
        <Grid item>
          <Button
            startIcon={<SaveIcon />}
            color="success"
            variant="contained"
            onClick={handle_open_buscar}
            disabled={isButtonDisabled}
          >
            Enviar Documento
          </Button>
        </Grid>
        <Grid item xs={12} sm={12}>
          {/* <Button onClick={enviarDocumento}>Enviar Documento</Button> */}
        </Grid>
      </Grid>

      <AlertaDocumento
        personaSelected={personaselet}
        setpersona={setpersona}
        perfilselet={perfilselet}
        setperfilselet={setperfilselet}
        lideresUnidad={lideresUnidad}
        setLideresUnidad={setLideresUnidad}
      />

      <Grid
        container
        spacing={2}
        m={2}
        p={2}
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
          <embed
            src={visor}
            type="application/pdf"
            width="100%"
            height="1080px"
          />
        </Grid>
      </Grid>
    </>
  );
};