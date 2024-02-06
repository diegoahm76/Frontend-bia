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

export interface SerieSubserie {
  // id_catserie_unidadorg: number;
  // id_serie_doc: number;
  // nombre_serie_doc: string;
  // id_subserie_doc: number | null;
  // nombre_subserie_doc: string | null;


  id_cat_serie_und: number;
  id_serie_doc: number;
  cod_serie_doc: string;
  nombre_serie_doc: string;
  id_subserie_doc: number | null;
  cod_subserie_doc: string | null;
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
  // const [consecutivo, setConsecutivo] = useState<string | null>(null);

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
      // setConsecutivoActual(data.radicado_nuevo);
      await generarHistoricoBajas();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    generarHistoricoBajas();

  }, [consecutivoActual]);

  const [opcionSeleccionada, setOpcionSeleccionada] = useState('1');

  // Función para manejar el cambio en el select
  const handleChangeee = (event: { target: { value: SetStateAction<string>; }; }) => {
    setOpcionSeleccionada(event.target.value);
  };
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

    doc.text(`${nombreSerieSeleccionada} - ${nombreSubserieSeleccionada}`, 10, y);
    y += 6;

    doc.text(`Identificación: ${identificacion}`, 10, y);
    y += 6;
    doc.text(`Email: ${email}`, 10, y);
    y += 6;
    doc.text(`Tel.: ${telefono}`, 10, y);
    y += 6;
    doc.text(`Ciudad: ${ciudad}`, 10, y);

    y += 6; doc.text(``, 10, y);
    y += 6;

    let texto1 = ` hola`;
    let textoPersonalizado =

      `
    Asunto: Solicitud de información requerida para llevar a cabo el proceso de liquidación de los documentos de cobro de la vigencia  ${Fecha_vigencia ? Fecha_vigencia : '__________'} de la tasa por utilización de agua.

Cordial Saludo,
Teniendo en cuenta el proceso de liquidación del instrumento económico tasa por utilización del agua, por medio de la presente solicito amablemente su colaboración para obtener la siguiente información: 
a) Usuarios cuyos expedientes fueron archivados en el periodo comprendido del ${Fecha_a ? Fecha_a : '__________'} .  
b) Nuevos usuarios a quienes se les haya otorgado permiso de concesión de agua durante el periodo comprendido del ${Fecha_b ? Fecha_b : '__________'} .  
Este reporte se deberá diligenciar en la matriz que se remite como adjunto y debe ser enviada al correo gruporentas@cormacarena.gov.co  y/o facturacion.rentas@cormacarena.gov.co. Es importante mencionar la prioridad de esta información, por lo que se requiere que sea entregada a más tardar el ${Fecha_entrega ? Fecha_entrega : '__________'} , con la finalidad de llevar a cabo un proceso eficiente en términos de tiempo y manejo adecuado de la información. Agradezco la atención prestada.

 
     `;


    let textoAMostrar: string;

    if (opcionSeleccionada === '1') {
      textoAMostrar = `
  Asunto: Solicitud de información requerida para llevar a cabo el proceso de liquidación de los documentos de cobro de la vigencia  ${Fecha_vigencia ? Fecha_vigencia : '__________'} de la tasa por utilización de agua.

Cordial Saludo,
Teniendo en cuenta el proceso de liquidación del instrumento económico tasa por utilización del agua, por medio de la presente solicito amablemente su colaboración para obtener la siguiente información: 
a) Usuarios cuyos expedientes fueron archivados en el periodo comprendido del ${Fecha_a ? Fecha_a : '__________'} .  
b) Nuevos usuarios a quienes se les haya otorgado permiso de concesión de agua durante el periodo comprendido del ${Fecha_b ? Fecha_b : '__________'} .  
Este reporte se deberá diligenciar en la matriz que se remite como adjunto y debe ser enviada al correo gruporentas@cormacarena.gov.co  y/o facturacion.rentas@cormacarena.gov.co. Es importante mencionar la prioridad de esta información, por lo que se requiere que sea entregada a más tardar el ${Fecha_entrega ? Fecha_entrega : '__________'} , con la finalidad de llevar a cabo un proceso eficiente en términos de tiempo y manejo adecuado de la información. Agradezco la atención prestada.


   `;
    }


    else if (opcionSeleccionada === '2') {
      textoAMostrar = ` 
               «Por medio de la cual se otorga una facilidad de pago en instancia persuasiva a
                 la señora BLANCA LUCIA RAMIREZ TORO identificada con C.C. 32.505.396 y 
                                                 se toman otras determinaciones»

               El Jefe de la Oficina Asesora Jurídica de la Corporación para el Desarrollo
                 Sostenible del Área de Manejo Especial de la Macarena CORMACARENA, en
                        uso de sus facultades legales conferidas mediante la Resolución número
                                                  2.6.05.107 del 31 de enero de 2005

.                                                            CONSIDERANDO:

Que la Constitución Política de Colombia, en su artículo 209 establece que «la función administrativa está al servicio de los intereses generales y se desarrolla con fundamento en los principios de igualdad, moralidad, eficacia, economía, celeridad, imparcialidad y publicidad mediante la descentralización, la delegación y la desconcentración de funciones. Las autoridades administrativas deben coordinar sus actuaciones para el adecuado cumplimiento de los fines del Estado. La administración pública, en todos sus órdenes, tendrá un control interno que se ejercerá en los términos que señale la ley...»

Que de conformidad con la resolución No 2.6.07.073 de fecha quince (15) de febrero de 2007, artículo quinto, numeral 4, facilidades de pago, establece como requisitos y documentos necesarios para el trámite los siguientes          

1. Los deudores no deben encontrarse reportados en el boletín de deudores morosos del estado por incumplimiento de acuerdos de pago
2. Tener obligaciones a favor de CORMACARENA
3. Presentar un escrito en el cual solicite el plazo
4. Ofrecer garantías que respalden el pago de las obligaciones, determinando los usuarios y capacidades de pago de los mismos

Que mediante Resolución No 2.6.08.465 de fecha veintisiete (27) de junio de 2008, se adoptó El Manual de Cobro Persuasivo y coactivo de CORMACARENA, el cual tuvo su última actualización el día siete (07) de febrero de 2023.

 
Que la señora BLANCA LUCIA RAMIREZ TORO identificada con C.C. 32.505.396, mediante escrito radicado en la Corporación con el número 18922 de fecha veintisiete (27) de julio de 2023 solicitó se le concediera una facilidad de pago para pagar el valor capital e intereses de la multa impuesta mediante resolución PS-GJ.1.2.6.22.2004, de fecha veinte (20) de diciembre de 2022, confirmada mediante la resolución número PS-GJ.1.2.6.23.0723, de fecha dieciocho (18) de mayo de 2023, dentro del expediente sancionatorio número 3.11.011.494, la señora BLANCA LUCIA RAMIREZ TORO, realizó consignación del 30% del valor total de la deuda, capital más intereses, el día seis (06) de agosto de 2023, para dar continuidad al trámite de otorgamiento de la facilidad de pago.

Que una vez revisado el boletín de deudores morosos del estado BDME, a través de la página web de la contaduría general de la nación, se verifico que la señora BLANCA LUCIA RAMIREZ TORO identificada con C.C. 32.505.396, no se encuentra reportada por incumplimiento de acuerdos de pago. En mérito de lo expuesto,

                                                              RESUELVE
                                                             
 ARTÍCULO PRIMERO: Otorgar facilidad de pago a la señora BLANCA LUCIARAMIREZ TORO identificada con C.C. 32.505.396, con un plazo de nueve (09) cuotas mensuales de igual valor, para el pago de la multa impuesta mediante resolución PS-GJ.1.2.6.22.2004, de fecha veinte (20) de diciembre de 2022, confirmada mediante la resolución número PS-GJ.1.2.6.23.0723, de fecha dieciocho (18) de mayo de 2023, dentro del expediente sancionatorio número 3.11.011.494, incluido valor capital e intereses. PARÁGRAFO PRIMERO: Teniendo en cuenta que el valor capital de la presente facilidad de pago es la suma de UN MILLON SEISCIENTOS OCHENTA Y TRES MIL QUINIENTOS TREINTA Y CINCO PESOS MCTE ($1.683.535) y que la señora BLANCA LUCIA RAMIREZ TORO identificada con C.C. 32.505.396, consignó el día seis (06) de agosto de 2023, la suma de QUINIENTOS QUINCE MIL SEISCIENTOS SESENTA Y SEIS PESOS MCTE ($515.666), el cual se aplicó proporcionalmente a capital por valor de QUINIENTOS CINCO MIL OCHOCIENTOS OCHENTA Y SEIS PESOS MCTE ($505.886) y a intereses de mora por valor de NUEVE MIL SETECIENTOS OCHENTA PESOS MCTE ($9.780).

Conforme a lo anterior, queda un saldo a capital por valor de UN MILLON CIENTO SETENTA Y SIETE MIL SEISCIENTOS CUARENTA Y NUEVE PESOS MCTE ($1.177.649), más los intereses proyectados por el término de la facilidad de pago, es decir, al día cinco (05) de Junio del año 2024, fecha en la que se estima el pago total de las obligaciones, por valor de CIENTO CUARENTA Y DOS MIL CIENTO TRES PESOS MCTE ($142.103), y que arrojan una deuda total de UN MILLON TRESCIENTOS DIECINUEVE MIL SETECIENTOS CINCUENTA Y DOS PESOS MCTE ($1.319.752). ARTICULO SEGUNDO: Autorizar el pago del valor capital más los intereses que sumados arrojan un valor total de UN MILLON TRESCIENTOS DIECINUEVE MIL SETECIENTOS CINCUENTA Y DOS PESOS MCTE ($1.319.752) en nueve (09) cuotas, distribuido de la siguiente manera:



No cuota FECHAS DE PAGO CUOTA
1  05 de octubre de 2023 146,640
2  05 de noviembre de 2023 146,639
3  05 de diciembre de 2023 146,639
4  05 de enero de 2024 146,639
5  05 de febrero de 2024 146,639
6  05 de marzo de 2024 146,639
7  05 de abril de 2024 146,639
8  05 de mayo de 2024 146,639
9  05 de junio de 2024 146,639

TOTAL 1,319,752

PARÁGRAFO ÚNICO: Si el día acordado para el pago de las cuotas fuere feriado el pago se prorrogará hasta el día siguiente hábil.

ARTÍCULO TERCERO: El pago deberá efectuarse en la cuenta corriente 364190062-66 Bancolombia (convenio 87318) por concepto de multas Ref. 1 C.C. (32505396) y Ref. 2. Resolución facilidad de pago (126223020) a nombre de CORMACARENA; identificada con NIT. 822.000.091-2, a más tardar en la fecha de vencimiento de la respectiva cuota y acreditarlo en la oficina del Grupo Rentas de la Corporación.

ARTÍCULO CUARTO: En caso de presentarse incumplimiento por parte del deudor, en relación con el pago de una de las cuotas estipuladas y en las demás obligaciones contenidas en la presente resolución, CORMACARENA

dispondrá la terminación anticipada de la facilidad de pago y se iniciará el trámite del proceso administrativo de cobro coactivo. Parágrafo único: Los saldos de las obligaciones que resulten luego de dar por terminada la facilidad de pago, se continuarán ejecutando por medio del respectivo proceso administrativo de cobro coactivo, hasta cuando se satisfaga la obligación en su totalidad. ARTÍCULO QUINTO: Como consecuencia de lo convenido en la facilidad de pago, las partes acuerdan interrumpir los términos de prescripción de las obligaciones, y se reanudaran en el momento en que se declare el incumplimiento de la presente Resolución. ARTÍCULO SEXTO: Notificar el contenido de la presente resolución a la señora BLANCA LUCIA RAMIREZ TORO identificada con C.C. 32.505.396; al correo electrónico jandreitahr21@hotmail.com adjuntando copia de la misma. ARTICULO SEPTIMO: Contra esta decisión no procede recurso alguno, de conformidad con el artículo 833-1 del Estatuto Tributario. ARTICULO OCTAVO: Remitir copia de la presente Resolución a la Subdirección Administrativa y Financiera para lo de su competencia.

                                                             NOTIFÍQUESE Y CÚMPLASE,


`;
    }

    else if (opcionSeleccionada === '3') {
      textoAMostrar = ``
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
      let lines = doc.splitTextToSize(text, doc.internal.pageSize.width - 2 * margin); // Divide el texto en líneas

      lines.forEach((line: string | string[]) => {
        if (y > pageHeight - 20) { // 20 es el margen inferior
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
      const url = "/gestor/consecutivos-unidades/unidades_organigrama_actual/get/";
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

  useEffect(() => {
    generarHistoricoBajas();

  }, [opcionSeleccionada]);

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    setUnidadSeleccionada(event.target.value as string);
    const selectedId = event.target.value;
    setIdUnidadSeleccionada(selectedId);
  };

  const [selectedSerieSubserie, setSelectedSerieSubserie] = useState('');
  
  const [seriesSubseries, setSeriesSubseries] = useState<SerieSubserie[]>([]);
  const fetchSeriesSubseries = async () => {
    try {
      const url = `/gestor/consecutivos-unidades/serie_subserio_unidad/get/${idUnidadSeleccionada}/`;
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
  }, [idUnidadSeleccionada]);
  const [nombreSerieSeleccionada, setNombreSerieSeleccionada] = useState('');
  const [nombreSubserieSeleccionada, setNombreSubserieSeleccionada] = useState('');

  const handleChangee = (event: { target: { name: any; value: any; }; }) => {
    setSelectedSerieSubserie(event.target.value as string);

    const selectedValue = event.target.value;
    setSelectedSerieSubserie(selectedValue);

    const selectedElement = seriesSubseries.find((item) => item.id_cat_serie_und === selectedValue);

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
    set_is_buscar(true);
    crearConsecutivo()
    // realizarActualizacion();
  };


  const handle_close = (): void => {
    set_is_buscar(false);
    enviarDocumento();
  };


  async function crearConsecutivo() {
    try {
      const url = `/gestor/consecutivos-unidades/consecutivo/create/`;
      const data = {
        id_unidad: unidadSeleccionada,
        id_cat_serie_und: selectedSerieSubserie,
        id_persona: 215,
        fecha_actual: "2024-01-29T15:30:00"
      };
      // Asumiendo que `api` es una instancia de Axios o similar para hacer la petición
      const res = await api.post(url, data);
      console.log('Consecutivo creado con éxito', res.data);
      // Actualizar el DOM o el estado para mostrar el valor de consecutivo
      setConsecutivoActual(res.data?.data?.consecutivo);
    } catch (error:any) {
      console.error('Error al crear el consecutivo', error);
      control_error(error.response.data.detail);
      // Manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
    }
  }


  const isButtonDisabled = !unidadSeleccionada || !selectedSerieSubserie;


  return (
    <>

      {/* <Grid item > 
        <Button
          startIcon={<SaveIcon />}
          color='success'
          variant='contained'
          onClick={crearConsecutivo}
        >Enviar Documento
        </Button>
      </Grid> */}
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

        {/* <select value={opcionSeleccionada} onChange={handleChangeee}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>

        </select> */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="opcion-select-label">Plantilla</InputLabel>
            <Select
              labelId="Plantilla"
              value={opcionSeleccionada}
              label="Opción"
              onChange={handleChangeee}
            >
              <MenuItem value="1">Plantilla 1</MenuItem>
              <MenuItem value="2">Plantilla 2</MenuItem>
              <MenuItem value="3">Vacio</MenuItem>
            </Select>
          </FormControl>
        </Grid>

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
                <MenuItem key={item.id_cat_serie_und} value={item.id_cat_serie_und}>
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


        {opcionSeleccionada === '1' ? (

          <>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="date"
                size="small"
                variant="outlined"
                label=" Fecha vigencia"
                value={Fecha_vigencia}
                InputLabelProps={{ shrink: true }}
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
        <Grid item >

          <Button startIcon={<VisibilityIcon />} variant='contained' onClick={generarHistoricoBajas}>Ver borrador </Button>
        </Grid>
        <Grid item >

          <Button
            startIcon={<SaveIcon />}
            color='success'
            variant='contained'
            onClick={handle_open_buscar}
            disabled={isButtonDisabled}

          >Enviar Documento
          </Button>
        </Grid>
        <Grid item xs={12} sm={12}>
          {/* <Button onClick={enviarDocumento}>Enviar Documento</Button> */}
        </Grid>
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
