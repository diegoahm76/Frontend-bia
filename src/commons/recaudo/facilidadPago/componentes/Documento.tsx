/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import jsPDF from 'jspdf';
import dayjs from 'dayjs';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import Divider from '@mui/material/Divider';
import { api } from '../../../../api/axios';
import { Title } from '../../../../components';
import { FormControl } from '@material-ui/core';
import SaveIcon from '@mui/icons-material/Save';
import React, { useEffect, useState } from 'react';
import { AuthSlice } from '../../../auth/interfaces';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Persona } from '../../../../interfaces/globalModels';
import { control_error, control_success } from '../../../../helpers';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { logo_cormacarena_h } from '../../../conservacion/Reportes/logos/logos';
import { Button, ButtonGroup, Dialog, Grid, InputLabel, MenuItem, Select, TextField, } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { miEstilo } from '../../../gestorDocumental/Encuesta/interfaces/types';
import { makeStyles } from '@material-ui/core/styles';
import { AlertaDocumento } from '../../screens/AlertaDocumento';


export interface UnidadOrganizaciona {
  id_unidad_organizacional: number;
  nombre: string;
  tiene_configuracion: any;
}
interface BuscarProps {
  is_modal_active_doc: any;
  set_doc: any;
  idFacilidadSeleccionada: any;
  idFacilidades: any
}
export interface SerieSubserie {
  id_cat_serie_und: number;
  id_serie_doc: number;
  cod_serie_doc: string;
  nombre_serie_doc: string;
  id_subserie_doc: number | null;
  cod_subserie_doc: string | null;
  nombre_subserie_doc: string | null;
  tiene_configuracion: any;
}
interface Cuota {
  id: number;
  nro_cuota: number;
  monto_cuota: string;
  id_plan_pago: number;
  id_tipo_pago: number;
  valor_capital: string;
  valor_interes: string;
  saldo_pendiente: string;
  fecha_vencimiento: string;
  fecha_pago: string | null;
  monto_pagado: string | null;
  id_cuota_anterior: number | null;
}

interface PlanPagoData {
  plan_pago: any;
  cuotas: Cuota[];
}

export const Documento: React.FC<BuscarProps> = ({ idFacilidades, idFacilidadSeleccionada, is_modal_active_doc, set_doc }) => {
  const [cuotas, setCuotas] = useState<Cuota[]>([]);

  const fetchPlanPago = async (): Promise<void> => {

    try {
      const url = `/recaudo/planes-pagos/validacion/${idFacilidadSeleccionada}/`;
      const res = await api.get(url);
      const planPagoData: PlanPagoData = res.data?.data || { plan_pago: {}, cuotas: [] };
      setCuotas(planPagoData?.cuotas);

    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {

    void fetchPlanPago();
    generarHistoricoBajas()
  }, [idFacilidadSeleccionada]);
  useEffect(() => {
    void fetchPlanPago();
    generarHistoricoBajas()
  }, []);
  const columns: GridColDef[] = [
    { field: 'nro_cuota', headerName: 'No cuota', width: 130, flex: 1 },
    { field: 'fecha_vencimiento', headerName: 'Fecha de vencimiento', width: 130, flex: 1 },
    { field: 'valor_capital', headerName: 'Valor capital ', width: 130, flex: 1 },
    { field: 'valor_interes', headerName: 'Valor interes ', width: 130, flex: 1 },
    {
      field: 'monto_cuota', headerName: 'Cuotas', width: 130, flex: 1, renderCell: (params) => `${params?.value} COP`
    },

  ];

  const totalValorCapital = cuotas.reduce((acc, cuota) => acc + parseFloat(cuota.valor_capital), 0);
  const totalValorInteres = cuotas.reduce((acc, cuota) => acc + parseFloat(cuota.valor_interes), 0);
  const totalMontoCuota = cuotas.reduce((acc, cuota) => acc + parseFloat(cuota.monto_cuota), 0);

  const handle_close = (): void => {
    set_doc(false);
  };

  const [opcionSeleccionada, setOpcionSeleccionada] = useState('2');
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState('plantilla1');
  const [consecutivoActual, setConsecutivoActual] = useState<number | null>(null);
  const { userinfo: { nombre_unidad_organizacional, nombre, id_persona } } = useSelector((state: AuthSlice) => state.auth);
  const [nombreSubserieSeleccionada, setNombreSubserieSeleccionada] = useState('');
  const [asunto, setAsunto] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [Fecha_vigencia, setFecha_vigencia] = useState('');
  const [Fecha_entrega, setFecha_entrega] = useState('');

  const [Fecha_a, setFecha_a] = useState('');
  const [Fecha_b, setFecha_b] = useState('');
  const [nombreSerieSeleccionada, setNombreSerieSeleccionada] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [ciudad, setCiudad] = useState('');



  const [visor, setVisor] = useState('');
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




    let textoAMostrar: any;

    let tituloColumnas = "Nro Cuota  | Fecha Venc.    | Valor Capital   | Valor Interés   | Monto Cuota  ";
    let divisor = "".repeat(tituloColumnas.length);  // Crea una línea divisora basada en el largo del título

    // Convertir los datos de las cuotas en filas de texto con formato tabular, asegurando alineación
    let filasCuotas = cuotas.map(cuota =>
      cuota.nro_cuota.toString().padEnd(10) + "           |" +
      cuota.fecha_vencimiento.padEnd(17) + "| " +
      parseFloat(cuota.valor_capital).toFixed(2).toString().padEnd(15) + "      | " +
      parseFloat(cuota.valor_interes).toFixed(2).toString().padEnd(14) + "      | " +
      parseFloat(cuota.monto_cuota).toFixed(2).toString().padEnd(12)
    ).join("\n" + "\n");  // Añade el divisor entre filas para simular las líneas horizontales de una tabla

    // Combinar el título, el divisor y las filas de datos para formar el texto completo de la tabla
    //  textoAMostrar = ``;

    let textoCuotas = cuotas.map((cuota, index) =>
      `-Nro Cuota: ${cuota.nro_cuota},
    -Fecha Vencimiento: ${cuota.fecha_vencimiento},
    -Valor Capital: ${cuota.valor_capital},
    -Valor Interés: ${cuota.valor_interes},
    -Monto Cuota: ${cuota.monto_cuota},`
    ).join("\n\n");

    if (opcionSeleccionada === '2') {
      textoAMostrar = ` 
      
                   «Por medio de la cual se otorga una facilidad de pago en instancia persuasiva a
                     la señora  ${idFacilidades.nombre_de_usuario} identificada con C.C.  ${idFacilidades.identificacion} y 
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
    
     
Que la señora  ${idFacilidades.nombre_de_usuario} identificada con C.C.  ${idFacilidades.identificacion}, mediante escrito radicado en la Corporación con el número 18922 de fecha veintisiete (27) de julio de 2023 solicitó se le concediera una facilidad de pago para pagar el valor capital e intereses de la multa impuesta mediante resolución PS-GJ.1.2.6.22.2004, de fecha veinte (20) de diciembre de 2022, confirmada mediante la resolución número PS-GJ.1.2.6.23.0723, de fecha dieciocho (18) de mayo de 2023, dentro del expediente sancionatorio número 3.11.011.494, la señora  ${idFacilidades.nombre_de_usuario}, realizó consignación del 30% del valor total de la deuda, capital más intereses, el día seis (06) de agosto de 2023, para dar continuidad al trámite de otorgamiento de la facilidad de pago.
    
Que una vez revisado el boletín de deudores morosos del estado BDME, a través de la página web de la contaduría general de la nación, se verifico que la señora  ${idFacilidades.nombre_de_usuario} identificada con C.C.  ${idFacilidades.identificacion}, no se encuentra reportada por incumplimiento de acuerdos de pago. En mérito de lo expuesto,
    
                                                                  RESUELVE
                                                                 
ARTÍCULO PRIMERO: Otorgar facilidad de pago a la señora BLANCA LUCIARAMIREZ TORO identificada con C.C.  ${idFacilidades.identificacion}, con un plazo de nueve (09) cuotas mensuales de igual valor, para el pago de la multa impuesta mediante resolución PS-GJ.1.2.6.22.2004, de fecha veinte (20) de diciembre de 2022, confirmada mediante la resolución número PS-GJ.1.2.6.23.0723, de fecha dieciocho (18) de mayo de 2023, dentro del expediente sancionatorio número 3.11.011.494, incluido valor capital e intereses. PARÁGRAFO PRIMERO: Teniendo en cuenta que el valor capital de la presente facilidad de pago es la suma de UN MILLON SEISCIENTOS OCHENTA Y TRES MIL QUINIENTOS TREINTA Y CINCO PESOS MCTE ($1.683.535) y que la señora  ${idFacilidades.nombre_de_usuario} identificada con C.C.  ${idFacilidades.identificacion}, consignó el día seis (06) de agosto de 2023, la suma de QUINIENTOS QUINCE MIL SEISCIENTOS SESENTA Y SEIS PESOS MCTE ($515.666), el cual se aplicó proporcionalmente a capital por valor de QUINIENTOS CINCO MIL OCHOCIENTOS OCHENTA Y SEIS PESOS MCTE ($505.886) y a intereses de mora por valor de NUEVE MIL SETECIENTOS OCHENTA PESOS MCTE ($9.780).
    
Conforme a lo anterior, queda un saldo a capital por valor de UN MILLON CIENTO SETENTA Y SIETE MIL SEISCIENTOS CUARENTA Y NUEVE PESOS MCTE ($1.177.649), más los intereses proyectados por el término de la facilidad de pago, es decir, al día cinco (05) de Junio del año 2024, fecha en la que se estima el pago total de las obligaciones, por valor de CIENTO CUARENTA Y DOS MIL CIENTO TRES PESOS MCTE ($142.103), y que arrojan una deuda total de UN MILLON TRESCIENTOS DIECINUEVE MIL SETECIENTOS CINCUENTA Y DOS PESOS MCTE ($1.319.752). ARTICULO SEGUNDO: Autorizar el pago del valor capital más los intereses que sumados arrojan un valor total de UN MILLON TRESCIENTOS DIECINUEVE MIL SETECIENTOS CINCUENTA Y DOS PESOS MCTE ($1.319.752) en nueve (09) cuotas, distribuido de la siguiente manera:
   
   
   
    ${tituloColumnas}\n${divisor}\n${filasCuotas}

    
Valor capital = ${totalValorCapital.toFixed(2)}
Valor intereces = ${totalValorInteres.toFixed(2)}
Total moto cuota = ${totalMontoCuota.toFixed(2)}
    
PARÁGRAFO ÚNICO: Si el día acordado para el pago de las cuotas fuere feriado el pago se prorrogará hasta el día siguiente hábil.
    
ARTÍCULO TERCERO: El pago deberá efectuarse en la cuenta corriente 364190062-66 Bancolombia (convenio 87318) por concepto de multas Ref. 1 C.C. (32505396) y Ref. 2. Resolución facilidad de pago (126223020) a nombre de CORMACARENA; identificada con NIT. 822.000.091-2, a más tardar en la fecha de vencimiento de la respectiva cuota y acreditarlo en la oficina del Grupo Rentas de la Corporación.
    
ARTÍCULO CUARTO: En caso de presentarse incumplimiento por parte del deudor, en relación con el pago de una de las cuotas estipuladas y en las demás obligaciones contenidas en la presente resolución, CORMACARENA
    
    dispondrá la terminación anticipada de la facilidad de pago y se iniciará el trámite del proceso administrativo de cobro coactivo. Parágrafo único: Los saldos de las obligaciones que resulten luego de dar por terminada la facilidad de pago, se continuarán ejecutando por medio del respectivo proceso administrativo de cobro coactivo, hasta cuando se satisfaga la obligación en su totalidad. ARTÍCULO QUINTO: Como consecuencia de lo convenido en la facilidad de pago, las partes acuerdan interrumpir los términos de prescripción de las obligaciones, y se reanudaran en el momento en que se declare el incumplimiento de la presente Resolución. ARTÍCULO SEXTO: Notificar el contenido de la presente resolución a la señora  ${idFacilidades.nombre_de_usuario} identificada con C.C.  ${idFacilidades.identificacion}; al correo electrónico jandreitahr21@hotmail.com adjuntando copia de la misma. ARTICULO SEPTIMO: Contra esta decisión no procede recurso alguno, de conformidad con el artículo 833-1 del Estatuto Tributario. ARTICULO OCTAVO: Remitir copia de la presente Resolución a la Subdirección Administrativa y Financiera para lo de su competencia.
    
                                                                 NOTIFÍQUESE Y CÚMPLASE,
    
    
    `;
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

  useEffect(() => {
    generarHistoricoBajas();

  }, []);

  const generarArchivo = () => {
    const blob = dataURItoBlob(visor);
    return new File([blob], "documento.pdf", { type: "application/pdf" });
  };
  const [is_modal_active, set_is_buscar] = useState<boolean>(false);

  const handle_open_buscar = (): void => {
    set_is_buscar(true);
    crearConsecutivo()
    // realizarActualizacion();
  };
  const [consecutivo_id, setConsecutivo_id] = useState<number | null>(null);

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
      setConsecutivo_id(res.data?.data?.id_consecutivo);

    } catch (error: any) {
      console.error('Error al crear el consecutivo', error);
      control_error(error.response.data.detail);
      // Manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
    }
  }

  const [unidades, setUnidades] = useState<UnidadOrganizaciona[]>([]);
  const [unidadSeleccionada, setUnidadSeleccionada] = useState('');

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


  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    setUnidadSeleccionada(event.target.value as string);
    const selectedId = event.target.value;
    setIdUnidadSeleccionada(selectedId);
  };
  const [idUnidadSeleccionada, setIdUnidadSeleccionada] = useState('');
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

  const [persona, set_persona] = useState<Persona | null>();
  const on_result = async (info_persona: Persona): Promise<void> => { set_persona(info_persona); }


  // const miVariable = `${formData.id_unidad_org_lider}`;

  // const enviarDocumento = async () => {

  //   try {
  //     const formData = new FormData();

  //     formData.append("radicado", `${consecutivoActual}`);
  //     formData.append("ids_destinatarios_personas", `${persona?.id_persona}`);
  //     formData.append("ids_destinatarios_unidades", `${persona?.id_persona}`);

  //     formData.append("id_persona", id_persona.toString());

  //     const archivo = generarArchivo();
  //     formData.append("archivo", archivo);
  //     const url = "/recaudo/formulario/documento_formulario_recuado/";
  //     const response = await api.post(url, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });
  //     console.log("Documento enviado con éxito", response.data);
  //     control_success("Documento enviado con éxito");

  //   } catch (error) {
  //     console.error("Error al enviar el documento", error);
  //   }
  // };



  const [personaselet, setpersona] = useState<string[]>([id_persona.toString()]);
  const [perfilselet, setperfilselet] = useState<string[]>([]); // Asumiendo que es un string
  const [lideresUnidad, setLideresUnidad] = useState<string[]>([]); // Asumiendo que es un string



  const enviarDocumento = async () => {

    try {
      const formData = new FormData();
      const personaseletArrayString = JSON.stringify(personaselet);
      const perfilseletArrayString = JSON.stringify(perfilselet);
      const liderseletArrayString = JSON.stringify(lideresUnidad);




      formData.append("radicado", `${consecutivoActual}`);
      formData.append("id_persona", id_persona.toString());





      formData.append("ids_destinatarios_personas", `${personaseletArrayString}`);
      formData.append("id_consecutivo", `${consecutivo_id}`);


      formData.append("ids_destinatarios_unidades", `${liderseletArrayString}`);
      formData.append("ids_destinatarios_perfiles", `${perfilseletArrayString}`);



      formData.append("archivo", formmmm.archivo);
      const url = "/recaudo/formulario/documento_formulario_recuado/";
      const response = await api.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Documento enviado con éxito", response.data);
      control_success("Documento enviado con éxito");

    } catch (error: any) {
      // console.error("Error al enviar el documento", error);}
      control_error(error.response.data.detail);
    }
  };


  const handle_close_documento = (): void => {
    set_is_buscar(false);
    enviarDocumento();
  };
  useEffect(() => {
    generarHistoricoBajas();
    generarHistoricoBajas()

  }, [consecutivoActual]);



  const [formmmm, set_form] = useState<{ archivo: null | any }>({ archivo: null });

  const isButtonDisabled = !unidadSeleccionada || !selectedSerieSubserie || !formmmm.archivo;




  const [fileExtension, setFileExtension] = useState<string | null>(null);
  const [file_nombre, set_file_nombre] = useState<string | null>(null);




  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const fileInput = event.target;
    if (fileInput?.files?.length) {
      const fileName = fileInput.files[0].name;
      const selectedFile = fileInput.files[0];


      // Verificar si selectedFile no es null antes de asignarlo a set_form

      set_form({ archivo: selectedFile });

      const extension = fileName.split('.').pop();
      if (extension) {
        setFileExtension(extension);
        set_file_nombre(fileName);
      } else {
        console.error('No se pudo determinar la extensión del archivo.');
        setFileExtension('Desconocido');
        set_file_nombre('Desconocido');
      }
    } else {
      console.warn('Ningún archivo seleccionado.');
      setFileExtension(null);
      set_file_nombre(null);
    }
  };

  const VisuallyHiddenInput = styled('input')`
clip: rect(0 0 0 0);
clip-path: inset(50%);
height: 1px;
overflow: hidden;
position: absolute;
bottom: 0;
left: 0;
white-space: nowrap;
width: 1px;
`;

  const handleRemoveFile = () => {
    // Limpia la selección actual del archivo
    set_form({

      archivo: null,
    });
    setFileExtension(null);
    set_file_nombre(null);
  };


  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      '& .MuiInputBase-root': {
        height: '30px', // Ajusta la altura a tu preferencia
        '& .MuiInputBase-input': {
          fontSize: '0.875rem', // Ajusta el tamaño de fuente a tu preferencia
        },
      },
    },
  }));


   

  return (

    <>

      <Dialog open={is_modal_active} onClose={handle_close_documento}

      >
        <Grid container xs={12}
          sx={miEstilo}
        >

          <Grid item xs={12} >
            <Title title="Número  de radicado" />

          </Grid>
          <Grid item xs={12} marginTop={3} >
            <div>
              <h3>Consecutivo  : {consecutivoActual}</h3>
            </div>
          </Grid>

        </Grid>
      </Dialog>


      <Dialog open={is_modal_active_doc} onClose={handle_close} fullWidth maxWidth="md" >
        <Grid container xs={12}
          sx={miEstilo}
        >
          <Grid container xs={12} spacing={2}    >
            <Title title="Facilidad de Pago " />

            <Grid item xs={12} sm={6}>
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

            <Grid item xs={12} sm={6}>
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
                    <MenuItem
                      key={item.id_cat_serie_und}
                      value={`${item.id_cat_serie_und}`}
                      disabled={!item.tiene_configuracion}
                    >
                      {item.nombre_serie_doc} {item.nombre_subserie_doc ? `- ${item.nombre_subserie_doc}` : ''}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>



            <Grid item xs={12} sm={6}>
              <Button
                style={{ marginTop: 20 }}
                fullWidth

                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
              // htmlFor="file-upload"
              >
                {formmmm.archivo ? (
                  <>
                    Quitar
                    <Button
                      size="small"
                      startIcon={<DeleteIcon />}

                      onClick={handleRemoveFile}
                      sx={{  marginLeft: 4 }}
                    >
                      {/* <DeleteIcon /> */}
                    </Button>
                  </>
                ) : (
                  'Seleccionar Documento'
                )}
                <VisuallyHiddenInput
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                />
              </Button>

            </Grid>










            <Grid item xs={12} sm={6}>
              <Button
                startIcon={<SaveIcon />}
                color='success'
                fullWidth
                style={{ marginTop: 20 }}

                variant='contained'
                onClick={handle_open_buscar}
                disabled={isButtonDisabled}

              >Enviar Documento
              </Button>
            </Grid>





          </Grid>






          {/*        
          <Grid item xs={12} sm={4}>

          </Grid> */}








          {/* <Grid container item xs={12} spacing={2} marginTop={2}>

            <Divider
              style={{
                width: '98%',
                marginTop: '8px',
                marginBottom: '8px',
                marginLeft: 'auto',
              }}
            />




































            <Grid item xs={12} sm={12} marginTop={0}>
              <DataGrid
                rows={cuotas}
                columns={columns}
                pageSize={5}
                autoHeight
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                disabled
                label="Total Valor Capital"
                value={totalValorCapital.toFixed(2)}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                size="small"
                disabled
                fullWidth
                label="Total Valor Interés"
                value={totalValorInteres.toFixed(2)}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                size="small"
                disabled
                fullWidth
                label="Total Monto Cuota"
                value={totalMontoCuota.toFixed(2)}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

          </Grid> */}

          <AlertaDocumento
              personaselet={personaselet}
              setpersona={setpersona}
              perfilselet={perfilselet}
              setperfilselet={setperfilselet}
              lideresUnidad={lideresUnidad}
              setLideresUnidad={setLideresUnidad}
            />
        </Grid>



      </Dialog>
    </>
  );
};