/* eslint-disable react/prop-types */

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Close, Save, CloudUpload } from '@mui/icons-material';
import logoEmpresa from '../../../recaudo/facilidadPago/assets/logo_cormacarena.png';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // importar localización en español
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { NumerosLetras } from '../../../gestorDocumental/Liquidacion_dos/utils/NumerosLetras';
import { currency_formatter } from '../../../../utils/functions/getFormattedCurrency';
import { Barras } from './Barras';
import { api } from '../../../../api/axios';
import { useSelector } from 'react-redux';
import { AuthSlice } from '../../../auth/interfaces';
import { edit_baja_service } from '../../../conservacion/gestorVivero/store/thunks/gestorViveroThunks';
import { control_error, control_success } from '../../../../helpers';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';


interface DataDetalles {
  id_opcion_liq: number;
  variables: {
    test: string;
  };
  valor: number;
  caudal_concesionado: number;
  concepto: string;
}

interface DataLiquidacion {
  fecha_liquidacion: string;
  vencimiento: string;
  num_factura:any,
  periodo_liquidacion: number;
  valor: number;
  id_expediente: number;
  ciclo_liquidacion: string;
  id_tipo_renta: number;
  num_liquidacion: number | null;
  agno: number | null;
  periodo: number | null;
  nit: string | null;
  fecha: string | null;
  valor_liq: number | null;
  valor_pagado: number | null;
  valor_prescripcion: number | null;
  anulado: boolean | null;
  num_resolucion: string | null;
  agno_resolucion: any | null;
  cod_origen_liq: number | null;
  observacion: string | null;
  cod_tipo_beneficio: number | null;
  fecha_contab: string | null;
  se_cobra: boolean | null;
  fecha_en_firme: string | null;
  nnum_origen_liq: number | null;
}


dayjs.extend(localizedFormat);
dayjs.locale('es');
interface ConfigResponse {
  id_config_ref_agno: any;
  agno_ref: any;
  consecutivo_inicial: any;
  cantidad_digitos: any;
  implementar: any;
  fecha_inicial_config_implementacion: any;
  referencia_actual: any;
  fecha_consecutivo_actual: any;
  id_persona_config_implementacion: any;
  id_persona_referencia_actual: any;
  id_catalogo_serie_unidad: string | null;
  id_unidad: any;
  conseg_nuevo: any;
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: `1px solid black`, // bordes negros más gruesos
  backgroundColor: '#fff', // fondo blanco
  fontWeight: '500',
  padding: theme.spacing(1),
  fontSize: 18, // tamaño de fuente aumentado
}));

const StyledHeaderCell = styled(StyledTableCell)({
  backgroundColor: '#E6E6E6', // color de fondo del encabezado
  color: '#000', // texto blanco
  fontWeight: 'bold', // texto en negrita
  fontSize: 18,
});

const StyledCell = styled(StyledTableCell)({
  backgroundColor: '#E6E6E6', // color de fondo del encabezado
  color: '#000', // texto blanco
  fontSize: 16,
});
// {historico?.nombre_titular}
export interface Concepto {
  nit_titular: string;
  nombre_titular: string;
  direccion_titular: string;
  telefono_titular: string;
  expediente: string;
  num_resolucion: string;
  fecha_resolucion: string;
  nombre_fuente_hidrica: string | null;
  caudal_concesionado: string;
  clase_uso_agua: string;
  
  factor_regional: number;
  fecha_vencimiento:any
}
export const DocumentoPagoTUA: React.FC<any> = ({
  fecha_liquidacion,
  id_fecha,
  fecha_vencimiento,
  id_cc,
  liquidacion,
  obligaciones,
  months,
  form_liquidacion,
  rows_detalles,
  datos,
  data_clean,
  current_deudor,
  is_generate_cobro,
  cobro_url,
  id_subetapa
}: {  id_fecha:any, fecha_liquidacion:any, fecha_vencimiento:any, id_cc:any, liquidacion:any ,obligaciones:any , form_liquidacion:any, rows_detalles:any, months:any, datos: any, is_generate_cobro: boolean, cobro_url: any, data_clean: any, current_deudor: any, id_subetapa: number}) => {
  const receiptRef = useRef(null);
  const [form_values, set_form_values] = useState({
    sumaConcepto: "",
    sumaIntereses: "",
    sumaTotal: "",
    totalNumber: 0
  });

  useEffect(() => {
    if(datos?.id_deudor && is_generate_cobro){
      const sumaConcepto = Number(datos.monto_inicial).toLocaleString('es-CO');
      const sumaIntereses = Number(datos.valor_intereses).toLocaleString('es-CO');
      const totalNumber = Number(datos.monto_inicial) + Number(datos.valor_intereses);
      const sumaTotal = (Number(datos.monto_inicial) + Number(datos.valor_intereses)).toLocaleString('es-CO');
      set_form_values({sumaConcepto, sumaIntereses, sumaTotal, totalNumber})
    }

    if(is_generate_cobro && data_clean?.length && !datos?.id_deudor){
      let data: any = []
      data_clean.forEach((item: any) => {
      if(item.id_deudor === current_deudor.id_deudor){
        data.push([item.nombre, item.monto_inicial, item.valor_intereses, (Number(item.monto_inicial) + Number(item.valor_intereses)).toLocaleString('es-CO')])
      }
      });
      const total1 = data.reduce((acc: any, curr: any) => acc + parseFloat(curr[1].replace(',', '')), 0);
      const total2 = data.reduce((acc: any, curr: any) => acc + parseFloat(curr[2].replace(',', '')), 0);
      const sumaConcepto = total1.toLocaleString('es-CO');
      const sumaIntereses = total2.toLocaleString('es-CO');
      const totalNumber = total1 + total2;
      const sumaTotal = (total1 + total2).toLocaleString('es-CO');
      set_form_values({sumaConcepto, sumaIntereses, sumaTotal, totalNumber})
    }
  }, [data_clean, datos])
  const generatePDF = async (): Promise<File | null> => {
    if (receiptRef.current) {
      const element = receiptRef.current;
      const canvas = await html2canvas(element, { scale: 1.1 });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
      });
  
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      const margin = 10;
      const pageHeight = pdf.internal.pageSize.getHeight();
      let position = 0;
  
      for (let i = 0; i < Math.ceil(pdfHeight / pageHeight); i++) {
        if (i > 0) {
          pdf.addPage();
          position = -pageHeight * i;
        }
        pdf.addImage(imgData, 'PNG', margin, position + margin, pdfWidth - margin * 2, pdfHeight);
      }
  
      const pdfBlob = pdf.output('blob');
      const file = new File([pdfBlob], 'archivo_liquidacion.pdf', { type: 'application/pdf' });
      setArchivoLiquidacion(file);
      return file;
    }
    return null;
  };


  
  const exportPDF = () => {
    if (receiptRef.current) {
      const element = receiptRef.current;

      html2canvas(element, { scale: 1 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: 'a4'
        });

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        const margin = 10;
        pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth - margin * 2, pdfHeight - margin * 2);
        pdf.save('myfile.pdf');
      });
    }
  };

 
 
  const [historico, setHistorico] = useState<Concepto | any>("");

  const fetchHistorico = async (): Promise<void> => {
    try {
      const url = `recaudo/cobros/info-tua/${id_cc}`;
      const res = await api.get(url);
      const historicoData: Concepto = res.data?.data || null;
      setHistorico(historicoData);
    } catch (error: any) {
      // console.error(error);
    }
  };
// {id_cc}

useEffect(() => {
  fetchHistorico();
}, []);

useEffect(() => {
  fetchHistorico();
}, [id_cc]);



const {
  userinfo: {  id_persona },
} = useSelector((state: AuthSlice) => state.auth);


const [configData, setConfigData] = useState<ConfigResponse | any>("");

const updateUnidadesConfig = async () => {
  const updateData = {
    id_persona: id_persona,
    fecha_actual: new Date().toISOString()
  };

  try {
    const url = `recaudo/configuracion_referencia/referencia/generar/`;
    const res = await api.put(url, updateData);
    setConfigData(res.data.data); // Acceder a la data dentro de la respuesta
    console.log('Configuración actualizada con éxito', res.data);
  } catch (error: any) {
    console.error('Error al actualizar la configuración', error);
  }
};

 

useEffect(() => {
  updateUnidadesConfig();
}, [id_cc]);


useEffect(() => {
  updateUnidadesConfig();
}, [id_cc]);

const variable = `(415)7709998443433(8020)${String(configData.referencia_actual).padStart(18, '0')}(3900)${form_liquidacion.valor.toString().padStart(14, '0')}(96)${dayjs().add(30, 'day').format('YYYYMMDD')}`;
const currency_formatter = (value: number, fraction_digits: number = 0): string => {
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    minimumFractionDigits: fraction_digits,
    maximumFractionDigits: fraction_digits,
    currency: 'COP'
  });
  return formatter.format(value);
};

const currency_formatter2 = (value: any | number | bigint, fraction_digits = 2) => {
  const formatter = new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: fraction_digits,
    maximumFractionDigits: fraction_digits
  });
  return formatter.format(value);
};

const firstRow = rows_detalles[0]?.variables;
const result = firstRow?.Q * firstRow?.FC * firstRow?.T;

const firstRow1 = rows_detalles[1]?.variables;
const result1 = firstRow1?.Q * firstRow1?.FC * firstRow1?.T;

const firstRow2 = rows_detalles[2]?.variables;
const result2 = firstRow2?.Q * firstRow2?.FC * firstRow2?.T;

const firstRow3 = rows_detalles[3]?.variables;
const result3 = firstRow3.Q * firstRow3?.FC * firstRow3?.T;

const firstRow4 = rows_detalles[4]?.variables;
const result4 = firstRow4.Q * firstRow4?.FC * firstRow4?.T;

const firstRow5 = rows_detalles[5]?.variables;
const result5 = firstRow5.Q * firstRow5?.FC * firstRow5?.T;

const firstRow6 = rows_detalles[6]?.variables;
const result6 = firstRow6?.Q * firstRow6?.FC * firstRow6?.T;

const firstRow7 = rows_detalles[7]?.variables;
const result7 = firstRow7?.Q * firstRow7?.FC * firstRow7?.T;

const firstRow8 = rows_detalles[8]?.variables;
const result8 = firstRow8?.Q * firstRow8?.FC * firstRow8?.T;

const firstRow9 = rows_detalles[9]?.variables;
const result9 = firstRow9?.Q * firstRow9?.FC * firstRow9?.T;

const firstRow10 = rows_detalles[10]?.variables;
const result10 = firstRow10?.Q * firstRow10?.FC * firstRow10?.T;

const firstRow11 = rows_detalles[11]?.variables;
const result11 = firstRow11?.Q * firstRow11?.FC * firstRow11?.T;

const firsttua = rows_detalles?.length > 0 ? rows_detalles[0]?.variables?.TUA: null;

useEffect(() => {
  firsttua
}, [rows_detalles]);

const firstFR = rows_detalles.length > 0 ? rows_detalles[0].variables?.FR : null;
  
const firstFCValue0 = rows_detalles.length > 0 ? rows_detalles[0].variables?.FOP : null;
const firstFCValue1 = rows_detalles.length > 1 ? rows_detalles[1].variables?.FOP : null;

const firstFCValue2 = rows_detalles.length > 2 ? rows_detalles[2].variables?.FOP : null;
const firstFCValue3 = rows_detalles.length > 3 ? rows_detalles[3].variables?.FOP : null;
const firstFCValue4 = rows_detalles.length > 4 ? rows_detalles[4].variables?.FOP : null;
const firstFCValue5 = rows_detalles.length > 5 ? rows_detalles[5].variables?.FOP : null;
const firstFCValue6 = rows_detalles.length > 6 ? rows_detalles[6].variables?.FOP : null;
const firstFCValue7 = rows_detalles.length > 7 ? rows_detalles[7].variables?.FOP : null;
const firstFCValue8 = rows_detalles.length > 8 ? rows_detalles[8].variables?.FOP : null;
const firstFCValue9 = rows_detalles.length > 9 ? rows_detalles[9].variables?.FOP : null;
const firstFCValue10 = rows_detalles.length > 10 ? rows_detalles[10].variables?.FOP : null;
const firstFCValue11 = rows_detalles.length > 11 ? rows_detalles[11].variables?.FOP : null;




const data_detalles: DataDetalles[] = [
  {
    concepto: "test",
    id_opcion_liq: 73,
    variables: { test: "test" },
    valor: 5000,
    caudal_concesionado: 23,
  },
  {
    id_opcion_liq: 73,
    variables: { test: "test 2" },
    valor: 5000,
    caudal_concesionado: 23,
    concepto: "test 2"
  }
];
const agno_resolucion = new Date(id_fecha.fecha_resolucion).getFullYear();

const referencia_actual = configData.referencia_actual ? String(configData.referencia_actual) : '';
const num_factura = `TUA-${referencia_actual.padStart(6, '0')}`;
const data_liquidacion: DataLiquidacion = {
  fecha_liquidacion: `${fecha_liquidacion.format('YYYY-MM-DD')}`,
  vencimiento:  `${fecha_vencimiento.format('YYYY-MM-DD')}`,
  periodo_liquidacion: 1,
  valor: form_liquidacion.valor,
  id_expediente: id_fecha.id_expediente,
  ciclo_liquidacion: `${form_liquidacion.ciclo_liquidacion}`,
  num_factura:num_factura,
  nit: id_fecha.nit_titular,
  valor_liq: form_liquidacion.valor,
  valor_pagado: form_liquidacion.valor,
  num_resolucion: id_fecha.resolucion,

  agno: dayjs().year(),
  agno_resolucion: agno_resolucion,

  id_tipo_renta: 30,
  fecha: null,
  // fecha creoo 



  num_liquidacion: null,
  periodo: null,
  valor_prescripcion: null,
  anulado: null,
  cod_origen_liq: null,
  observacion: null,
  cod_tipo_beneficio: null,
  fecha_contab: null,
  se_cobra: null,
  fecha_en_firme: null,
  nnum_origen_liq: null
};

const [formmmm, set_form] = useState<{ archivo: null | any }>({
  archivo: null,
});
const archivo_liquidacion = formmmm.archivo; // Suponiendo que el archivo es obtenido de algún input o variable

const fetch_Crear_archivo_digital = async () => {
  const archivo = await generatePDF();
  if (!archivo) {
    console.error('Error generating PDF');
    return;
  }

  try {
    const url = `/recaudo/liquidaciones/liquidacion-obligacion/`;
    const formData = new FormData();

    // Agregar data_liquidacion al FormData
    formData.append('data_liquidacion', JSON.stringify(data_liquidacion));

    // Agregar data_detalles al FormData
    formData.append('data_detalles', JSON.stringify(data_detalles));

    // Agregar archivo_liquidacion al FormData
    formData.append('archivo_liquidacion', archivo);

    // Realizar la solicitud POST
    const res = await api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (res.data) {
      control_success('se creo correctamente');
    } else {
      console.error('Error en la solicitud:', res.statusText);
    }
  } catch (error: any) {
    control_error(error.response.data.detail);
  }
};
const [archivoLiquidacion, setArchivoLiquidacion] = useState<File | null>(null);


const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files.length > 0) {
    setArchivoLiquidacion(event.target.files[0]);
  }
};
const handleLogRowsDetalles = () => {
  console.log("tua",rows_detalles);
};
  return (
    <>
     {/* <button onClick={handleLogRowsDetalles}>Log tua </button> */}

     <Grid
        container
        item
        xs={12}
        marginLeft={-2}
        marginRight={2}
        spacing={4}
        marginTop={3}
        
      > 
 

{/* <div>
      <input type="file" onChange={handleFileChange} />
    </div> */}
      <Grid
          container
          spacing={2}
          marginTop={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
  <Grid item  xs={2}>
    <Button
    fullWidth
            color="success"
            variant="contained"
            startIcon={<MonetizationOnIcon />}
            onClick={fetch_Crear_archivo_digital}
          >
            Liquidar 
          </Button>
  </Grid>
  <Grid item  xs={2}>
  <Button
        color="primary"
        size='medium'
        fullWidth
        startIcon={<CloudUpload />}
        variant="contained"
        onClick={exportPDF}
        // sx={{margin: '1.5rem auto', display: 'flex', justifyContent: 'center', width: '300px'}}
      >
        Descargar PDF
      </Button>
  </Grid>

        </Grid>

          {/* <Grid item xs={12} sm={12}>
             <Button
        color="primary"
        size='medium'
        startIcon={<CloudUpload />}
        variant="contained"
        onClick={exportPDF}
        sx={{margin: '1.5rem auto', display: 'flex', justifyContent: 'center', width: '300px'}}
      >
        Descargar PDF
      </Button>
          </Grid> */}
          <Grid item xs={12} sm={12}>
<section ref={receiptRef} style={{transform: 'scale(0.55)', margin: '-24rem 0'}}>
        <TableContainer component={Paper} sx={{ border: '1px solid black', borderRadius: 0}}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableBody>
            <TableRow>
              <StyledHeaderCell colSpan={12} align="center" sx={{fontSize: '26px'}}>CORPORACIÓN PARA EL DESARROLLO SOSTENIBLE DEL AREA DE MANEJO ESPECIAL LA MACARENA</StyledHeaderCell>
            </TableRow>
            <TableRow>
              <StyledTableCell rowSpan={4} colSpan={9}>
                <article style={{display: 'flex', alignItems: 'center', gap: '15rem'}}>
                  <img src={logoEmpresa} alt="Cormacarena" style={{ height: 200, width: 300 }} />
                  <div style={{display: 'flex', flexDirection: 'column', gap:'1.5rem'}}>
                    <div>
                      <div style={{fontSize: '42px', fontWeight: 'bold', textAlign: 'center'}}>CORMACARENA</div>
                      <div style={{fontSize: '23px', fontWeight: 'bold', textAlign: 'center'}}>822000091-2</div>
                    </div>
                    <div>
                      <div style={{fontSize: '27px', fontWeight: 'bold', textAlign: 'center'}}>DOCUMENTO DE COBRO</div>
                      <div style={{fontSize: '27px', fontWeight: 'bold'}}> TASA POR UTILIZACIÓN DEL AGUA</div>
                      {/* <div style={{fontSize: '28px', fontWeight: 'bold'}}>TASA RETRIBUTIVA Y COMPENSATORIA</div>
                      <div style={{fontSize: '28px', fontWeight: 'bold'}}>RENTA ASOCIADA</div> */}
                    </div>
                  </div>
                </article>
              </StyledTableCell>
              <StyledHeaderCell align="center" colSpan={2}>Ref. de Pago</StyledHeaderCell>
              <StyledTableCell align="center" sx={{ color: 'red', fontWeight: 'bold', fontSize: '29px' }}>TUA-{configData && (<>{String(configData.referencia_actual).padStart(6, '0')}</>)} </StyledTableCell>
            </TableRow>

            <TableRow>
              <StyledHeaderCell align="center" colSpan={5}>FECHA LÍMITE DE PAGO</StyledHeaderCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center" colSpan={5} sx={{fontSize: '26px', fontWeight: 'bold'}}>{fecha_vencimiento.add(0, 'day').format('LL')}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell align="center" colSpan={2}>Doc. de Cobro N°</StyledHeaderCell>
              <StyledTableCell align="center" sx={{fontSize: '24px', fontWeight: 'bold'}}>GR-   {configData && (<>{String(configData.referencia_actual).padStart(6, '0')}</>)} </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledCell colSpan={12}>No contribuyente de renta, exenta de retención en la fuente (ET. Libro I Art. 22 y Libro II Art. 369). Documento Equivalente a Factura Decreto 1001 de 1997.  De conformidad a 
                    lo establecido por ley 1066 de 2006.  Culminada la Fecha límite de pago de esta factura se causarán intereses moratorios, los cuales se cobrarán a la tasa efectiva de usura,
                    expedida y certificada por la Superintendencia Financiera de Colombia para el respectivo mes de mora.
              </StyledCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell sx={{width: '15%'}}>FECHA DE ELABORACION</StyledHeaderCell>
              <StyledTableCell colSpan={3} align='center'>{fecha_liquidacion.format('LL')}</StyledTableCell>
              <StyledHeaderCell sx={{width: '8%'}}>PERIODO</StyledHeaderCell>
              <StyledTableCell colSpan={2} align='center'>Año {dayjs().year()}</StyledTableCell>
              <StyledHeaderCell sx={{width: '10%'}}>CEDULA/NIT</StyledHeaderCell>
              <StyledTableCell colSpan={4} align='center'>{historico?.nit_titular}</StyledTableCell>
            </TableRow>
            {/* <TableRow>
              <StyledHeaderCell colSpan={1}>Ubicación</StyledHeaderCell>
              <StyledTableCell colSpan={11}>Puerto Gaitán</StyledTableCell>
            </TableRow> */}
            <TableRow>
              <StyledHeaderCell colSpan={1}>NOMBRE DEL TITULAR</StyledHeaderCell>
              <StyledTableCell colSpan={11} sx={{fontWeight: 'bold'}}>{historico?.nombre_titular} </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell colSpan={1}>REPRESENTANTE LEGAL	 </StyledHeaderCell>
              <StyledTableCell colSpan={11}>{historico?.representante_legal} </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell sx={{width: '15%'}}>DIRECCIÓN</StyledHeaderCell>
              <StyledTableCell colSpan={5}>{historico?.direccion_titular}</StyledTableCell>
              <StyledHeaderCell colSpan={2}>TELÉFONOS</StyledHeaderCell>
              <StyledTableCell colSpan={4}>{historico?.telefono_titular}
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell colSpan={1}>EXPEDIENTE</StyledHeaderCell>
              <StyledTableCell colSpan={5}>{historico?.expediente}</StyledTableCell>
              <StyledHeaderCell colSpan={2}>N° RESOLUCION Y FECHA</StyledHeaderCell>
              <StyledTableCell colSpan={5}> {historico?.num_resolucion}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell colSpan={1}>NOMBRE DE LA FUENTE</StyledHeaderCell>
              <StyledTableCell colSpan={11}> {historico?.nombre_fuente_hidrica}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell colSpan={1}>PREDIO</StyledHeaderCell>
              <StyledTableCell colSpan={11}>{historico?.predio}  </StyledTableCell>
            </TableRow>
            
            {/* <TableRow>
              <StyledHeaderCell sx={{width: '15%'}}>¿PRESENTA AUTODECLARACION?</StyledHeaderCell>
              <StyledTableCell colSpan={1}>SI</StyledTableCell>
              <StyledHeaderCell colSpan={2}>RESOLUCIÓN PSMV</StyledHeaderCell>
              <StyledTableCell colSpan={8}>PS-GJ.1.2.6.19.2741 14 de Nov de 2019</StyledTableCell>
            </TableRow> */}
            {/* <TableRow>
              <StyledHeaderCell sx={{width: '15%'}}>¿AUTODECLARACIÓN APROBADA?</StyledHeaderCell>
              <StyledTableCell colSpan={1}>SI</StyledTableCell>
              <StyledHeaderCell colSpan={2}>RES. PERMISO DE VERTIMENTO</StyledHeaderCell>
              <StyledTableCell colSpan={8}>PS-GJ.1.2.6.19.2741 14 de Nov de 2019</StyledTableCell>
            </TableRow> */}
            <TableRow>
              <StyledHeaderCell sx={{width: '20%'}}>Municipio   </StyledHeaderCell>
              <StyledTableCell colSpan={8}>{historico?.municipio} </StyledTableCell>
              <StyledHeaderCell colSpan={2}>FACTOR REGIONAL (FR)</StyledHeaderCell>
              <StyledHeaderCell colSpan={2}>TARIFA DE LA TASA $/m3 :TUA2022</StyledHeaderCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell sx={{width: '15%'}}>CAUDAL CONCESIONADO (Q) L/sg</StyledHeaderCell>
              <StyledTableCell colSpan={8}> {historico?.caudal_concesionado}</StyledTableCell>
              <StyledTableCell colSpan={2}>{historico?.factor_regional}</StyledTableCell>
              <StyledTableCell colSpan={2}>{currency_formatter(firsttua)}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell colSpan={1}>USO</StyledHeaderCell>
              <StyledTableCell colSpan={11}>1.00</StyledTableCell>
              
            </TableRow>
            <TableRow>
              <StyledHeaderCell colSpan={12} sx={{textAlign: 'center'}}>LIQUIDACION DEL CONSUMO </StyledHeaderCell>
            </TableRow>

            
            {/* <TableRow>
              <StyledHeaderCell sx={{width: '15%'}}>¿Se liquida con PSMV?</StyledHeaderCell>
              <StyledTableCell colSpan={1}>NO</StyledTableCell>
              <StyledHeaderCell colSpan={2}>Personas/Anim. DBO/SST:</StyledHeaderCell>
              <StyledTableCell colSpan={2}></StyledTableCell>
              <StyledHeaderCell colSpan={2}>Concentración Pers/Dia (DBO):</StyledHeaderCell>
              <StyledTableCell colSpan={1}>0.000</StyledTableCell>
              <StyledHeaderCell colSpan={2}>Concentración Pers/Dia (SST):</StyledHeaderCell>
              <StyledTableCell colSpan={1}>0.000</StyledTableCell>
            </TableRow> */}
            <TableRow>
              <StyledHeaderCell sx={{width: '10%'}}> MESES DEL AÑO</StyledHeaderCell>
              <StyledHeaderCell colSpan={2}>Enero</StyledHeaderCell>
              <StyledHeaderCell colSpan={2}>Febrero</StyledHeaderCell>
              <StyledHeaderCell colSpan={2}>Marzo</StyledHeaderCell>
              <StyledHeaderCell colSpan={2}>Abril</StyledHeaderCell>
              <StyledHeaderCell colSpan={2}>Mayo</StyledHeaderCell>
              <StyledHeaderCell colSpan={2}>Junio</StyledHeaderCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell colSpan={1}>VOLUMEN DE AGUA V (m3)</StyledHeaderCell>
              <StyledTableCell colSpan={2}>{currency_formatter2(result)}  </StyledTableCell>
              <StyledTableCell colSpan={2}>{currency_formatter2(result1)}</StyledTableCell>
              <StyledTableCell colSpan={2}>{currency_formatter2(result2)}  </StyledTableCell>
              <StyledTableCell colSpan={2}>{currency_formatter2(result3)}  </StyledTableCell>
              <StyledTableCell colSpan={2}>{currency_formatter2(result4)}  </StyledTableCell>
              <StyledTableCell colSpan={2}>{currency_formatter2(result5)}  </StyledTableCell> 
            </TableRow>
            <TableRow>
              <StyledHeaderCell colSpan={1}>FACTOR DE COSTO DE OPORTUNIDAD</StyledHeaderCell>
              <StyledTableCell colSpan={2}>{firstFCValue0} </StyledTableCell>
              <StyledTableCell colSpan={2}>{firstFCValue1}  </StyledTableCell>
              <StyledTableCell colSpan={2}>{firstFCValue2}   </StyledTableCell>
              <StyledTableCell colSpan={2}>{firstFCValue3}  </StyledTableCell>
              <StyledTableCell colSpan={2}>{firstFCValue4}  </StyledTableCell>
              <StyledTableCell colSpan={2}>{firstFCValue5}   </StyledTableCell> 
            </TableRow>
            <TableRow>
              <StyledHeaderCell colSpan={1}>MONTO A PAGAR($/m3)</StyledHeaderCell>
              <StyledTableCell colSpan={2}>{months.includes("Enero") ? currency_formatter(rows_detalles[0]?.valor_liquidado, 0) : "0"}</StyledTableCell>
              <StyledTableCell colSpan={2}>{months.includes("Febrero") ? currency_formatter(rows_detalles[1]?.valor_liquidado, 0) : "0"}</StyledTableCell>
              <StyledTableCell colSpan={2}>{months.includes("Marzo") ? currency_formatter(rows_detalles[2]?.valor_liquidado, 0) : "0"}</StyledTableCell>
              <StyledTableCell colSpan={2}>{months.includes("Abril") ? currency_formatter(rows_detalles[3]?.valor_liquidado, 0) : "0"}</StyledTableCell>
              <StyledTableCell colSpan={2}>{months.includes("Mayo") ? currency_formatter(rows_detalles[4]?.valor_liquidado, 0) : "0"}</StyledTableCell>
              <StyledTableCell colSpan={2}>  {months.includes("Junio") ? currency_formatter(rows_detalles[5]?.valor_liquidado, 0) : "0"}
             </StyledTableCell> 
            </TableRow>


           
            <TableRow>
              <StyledTableCell colSpan={7}>   </StyledTableCell> 
              <StyledHeaderCell colSpan={2}>SUBTOTAL 1er Semestre</StyledHeaderCell>
              <StyledTableCell colSpan={3}>   {
      currency_formatter(
        (months.includes("Enero") ? rows_detalles[0]?.valor_liquidado : 0) +
        (months.includes("Febrero") ? rows_detalles[1]?.valor_liquidado : 0) +
        (months.includes("Marzo") ? rows_detalles[2]?.valor_liquidado : 0) +
        (months.includes("Abril") ? rows_detalles[3]?.valor_liquidado : 0) +
        (months.includes("Mayo") ? rows_detalles[4]?.valor_liquidado : 0) +
        (months.includes("Junio") ? rows_detalles[5]?.valor_liquidado : 0),
        0
      )
    }  </StyledTableCell>
            </TableRow>


            <TableRow>
              <StyledHeaderCell sx={{width: '10%'}}>  MESES DEL AÑO</StyledHeaderCell>
              <StyledHeaderCell colSpan={2}>Julio</StyledHeaderCell>
              <StyledHeaderCell colSpan={2}>Agosto </StyledHeaderCell>
              <StyledHeaderCell colSpan={2}>Septiembre</StyledHeaderCell>
              <StyledHeaderCell colSpan={2}>Octubre</StyledHeaderCell>
              <StyledHeaderCell colSpan={2}>Noviembre</StyledHeaderCell>
              <StyledHeaderCell colSpan={2}>Diciembre</StyledHeaderCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell colSpan={1}>VOLUMEN DE AGUA V (m3)</StyledHeaderCell>
              <StyledTableCell colSpan={2}>{currency_formatter2(result6)}</StyledTableCell>
              <StyledTableCell colSpan={2}>{currency_formatter2(result7)}</StyledTableCell>
              <StyledTableCell colSpan={2}>{currency_formatter2(result8)} </StyledTableCell>
              <StyledTableCell colSpan={2}>{currency_formatter2(result9)} </StyledTableCell>
              <StyledTableCell colSpan={2}>{currency_formatter2(result10)} </StyledTableCell>
              <StyledTableCell colSpan={2}>{currency_formatter2(result11)} </StyledTableCell> 
            </TableRow>
            <TableRow>
              <StyledHeaderCell colSpan={1}>FACTOR DE COSTO DE OPORTUNIDAD</StyledHeaderCell>
              <StyledTableCell colSpan={2}>{firstFCValue6} </StyledTableCell>
              <StyledTableCell colSpan={2}>{firstFCValue7} </StyledTableCell>
              <StyledTableCell colSpan={2}>{firstFCValue8} </StyledTableCell>
              <StyledTableCell colSpan={2}>{firstFCValue9} </StyledTableCell>
              <StyledTableCell colSpan={2}>{firstFCValue10} </StyledTableCell>
              <StyledTableCell colSpan={2}>{firstFCValue11}</StyledTableCell> 
            </TableRow>
            <TableRow>
              <StyledHeaderCell colSpan={1}>MONTO A PAGAR($/m3)</StyledHeaderCell>
              <StyledTableCell colSpan={2}> {months.includes("Julio") ? currency_formatter(rows_detalles[6]?.valor_liquidado, 0) : "0"}</StyledTableCell>
              <StyledTableCell colSpan={2}> {months.includes("Agosto") ? currency_formatter(rows_detalles[7]?.valor_liquidado, 0) : "0"}</StyledTableCell>
              <StyledTableCell colSpan={2}> {months.includes("Septiembre") ? currency_formatter(rows_detalles[8]?.valor_liquidado, 0) : "0"}</StyledTableCell>
              <StyledTableCell colSpan={2}> {months.includes("Octubre") ? currency_formatter(rows_detalles[9]?.valor_liquidado, 0) : "0"}</StyledTableCell>
              <StyledTableCell colSpan={2}> {months.includes("Noviembre") ? currency_formatter(rows_detalles[10]?.valor_liquidado, 0) : "0"}</StyledTableCell>
              <StyledTableCell colSpan={2}> {months.includes("Diciembre") ? currency_formatter(rows_detalles[11]?.valor_liquidado, 0) : "0"}</StyledTableCell> 
            </TableRow>

           

            <TableRow>
              <StyledTableCell colSpan={7}>   </StyledTableCell> 
              <StyledHeaderCell colSpan={2}>SUBTOTAL 2do Semestre</StyledHeaderCell>
              <StyledTableCell colSpan={3}>{
      currency_formatter(
        (months.includes("Julio") ? rows_detalles[6]?.valor_liquidado : 0) +
        (months.includes("Agosto") ? rows_detalles[7]?.valor_liquidado : 0) +
        (months.includes("Septiembre") ? rows_detalles[8]?.valor_liquidado : 0) +
        (months.includes("Octubre") ? rows_detalles[9]?.valor_liquidado : 0) +
        (months.includes("Noviembre") ? rows_detalles[10]?.valor_liquidado : 0) +
        (months.includes("Diciembre") ? rows_detalles[11]?.valor_liquidado : 0),
        0
      )
    }  </StyledTableCell>
            </TableRow>

            <TableRow>
              <StyledHeaderCell colSpan={5} align='center'>DESCRIPCIÓN</StyledHeaderCell>
              <StyledHeaderCell colSpan={3} align='center'>VALOR</StyledHeaderCell>
              <StyledTableCell rowSpan={5} colSpan={4}>
              <article style={{display: 'flex', alignItems: 'center', gap: '13rem'}}>
                  <div style={{display: 'flex', flexDirection: 'column', gap:'1.5rem'}}>
                    <div>
                      <div style={{fontSize: '14', textAlign: 'center'}}>Páguese en</div>
                    </div>
                    <div>
                      <div style={{fontSize: '14', textAlign: 'center', marginLeft: '.7rem'}}>Banco Caja Social - Ahorros 26506619810</div>
                      <div style={{fontSize: '14', textAlign: 'center', marginLeft: '.7rem'}}>Banco Davivienda - Ahorros 096025324623</div>
                      <div style={{fontSize: '14', textAlign: 'center', marginLeft: '.7rem'}}>Banco BBVA - Ahorros 854001633</div>
                    </div>
                  </div>
                </article>
              </StyledTableCell>
              
            </TableRow>
            <TableRow>
              <StyledTableCell colSpan={5} align='right'>TOTAL LIQUIDADO</StyledTableCell>
              <StyledTableCell colSpan={3} align='right'>{currency_formatter(form_liquidacion.valor ?? 0, 0)}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell colSpan={5} align='right'>NOTA CREDITO</StyledTableCell>
              <StyledTableCell colSpan={3} align='right'>$ 0</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell colSpan={5} align='right'>CAPITAL</StyledTableCell>
              <StyledTableCell colSpan={3} align='right'>$ 0</StyledTableCell>
            </TableRow>
            {/* <TableRow>
              <StyledTableCell height={35} colSpan={8}></StyledTableCell>
            </TableRow> */}
            <TableRow>
              <StyledTableCell colSpan={5} align='right'>TOTAL A PAGAR</StyledTableCell>
              <StyledTableCell colSpan={3} align='right' sx={{color: 'red', fontWeight: 'bold'}}>{currency_formatter(form_liquidacion.valor ?? 0, 0)}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell colSpan={1}>TOTAL A PAGAR</StyledHeaderCell>
              <StyledTableCell colSpan={11} sx={{fontWeight: 'bold',color: 'red'}}>{NumerosLetras(form_liquidacion.valor)}  </StyledTableCell>
            </TableRow>
            {/* Más filas según sean necesarias */}
          </TableBody>
        </Table>
        </TableContainer>
        <article style={{marginTop: '1rem'}}>
          <div style={{textAlign: 'justify', fontSize: '19px', fontWeight:'500'}}>De conformidad con lo dispuesto por el Decreto 1076 de 2015, la presentación de cualquier reclamo o aclaración de esta factura deberá efectuarse por escrito dentro de un 
                término no superior a seis (6) meses siguientes a la fecha límite de pago del presente documento. <br />
                <strong>UNA VEZ REALIZADO EL PAGO, ENVIAR COPIA DEL SOPORTE RESPECTIVO AL CORREO info@cormacarena.gov.co</strong> Para la Expedición de su Paz y Salvo, debe hacer llegar mediante oficio original y/o copia de Recibo de Consignación Bancaria, donde el sello del Banco sea legible, a la 
                siguiente dirección: Oficina Territorial del META, Carrera 44C No. 33B - 24 Urbanización Los Pinos, Barzal Alto, Sede Principal, Villavicencio – Meta
                Dirección Electrónica: Info@cormacarena.gov.co PBX 673 0420 - 673 0417 - 673 0417 Ext. 105 Línea Gratuita: 01-8000-117177
          </div>
        </article>
        {/* <TableRow> 
    <div style={{marginTop: '5rem', textAlign: 'center'}}>
      <hr style={{width: '400px', border: '1px solid black'}} />
      <span>DIRECTOR GENERAL</span>
    </div> 
</TableRow> */}
<TableRow>
  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5rem', width: '100%' }}>
    <div style={{ textAlign: 'center', width: '50%' , marginTop: "50px" }}>
      <hr style={{ width: '400px', border: '1px solid black', margin: '0 auto' }} />
      <span>DIRECTOR GENERAL</span>
    </div>
    <div style={{ textAlign: 'center', width: '50%' , marginLeft: "500px" , marginTop: "-20px" }}>
    {configData && (
        <>
          <Barras variable={variable} configData={configData} />
        </>
      )}
    </div>
  </div>
</TableRow>

      {/* <hr style={{ width: '400px', border: '1px solid black', margin: '0 auto' }} /> */}
      {/* <span>(415)7709998443433(8020)000000(3900){form_liquidacion.valor .toString().padStart(14, '0')}(96){dayjs().format('YYYYMMDD')}</span> */}
      </section>


          </Grid>
 <Grid item xs={12} sm={12}>
        <embed
          src={cobro_url}
          type="application/pdf"
          width="100%"
          height="100px"
        />
      </Grid>
      </Grid>
    
     
      
     
    </>
  );
}