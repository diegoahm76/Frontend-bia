

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
import React from 'react';
import { Barras } from './Barras';
import { api } from '../../../../api/axios';
import { useSelector } from 'react-redux';
import { AuthSlice } from '../../../auth/interfaces';
import { edit_baja_service } from '../../../conservacion/gestorVivero/store/thunks/gestorViveroThunks';

import { currency_formatter } from '../../../../utils/functions/getFormattedCurrency';

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

export const DocumetoPagoTR: React.FC<any> = ({
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
  }: {id_cc:any, liquidacion:any ,obligaciones:any , form_liquidacion:any, rows_detalles:any, months:any, datos: any, is_generate_cobro: boolean, cobro_url: any, data_clean: any, current_deudor: any, id_subetapa: number}) => {
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


  // const exportPDF = () => {
  //   if (receiptRef.current) {
  //     const element = receiptRef.current;

  //     html2canvas(element, { scale: 1 }).then(canvas => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF({
  //         orientation: 'portrait',
  //         unit: 'px',
  //         format: 'a4'
  //       });

  //       const imgProps = pdf.getImageProperties(imgData);
  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  //       const margin = 10;
  //       pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth - margin * 2, pdfHeight - margin * 2);
  //       pdf.save('myfile.pdf');
  //     });
  //   }
  // };
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
  
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
  
        // Resize the canvas image to fit a single PDF page
        const imgWidth = pdfWidth - 20; // 10 px margin on each side
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
        // If the height of the image is greater than the PDF height, scale it down
        const finalImgHeight = imgHeight > pdfHeight - 20 ? pdfHeight - 20 : imgHeight;
  
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, finalImgHeight);
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

const variable = `(415)7709998094819(8020)${String(configData.referencia_actual).padStart(18, '0')}(3900)${form_liquidacion.valor.toString().padStart(14, '0')}(96)${dayjs().add(90, 'day').format('YYYYMMDD')}`;

  return (
    <>
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
      <section ref={receiptRef} style={{transform: 'scale(0.6)', margin: '-24rem 0'}}>
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
                      <div style={{fontSize: '28px', fontWeight: 'bold', textAlign: 'center'}}>RECIBO OFICIAL DE PAGO</div>
                      <div style={{fontSize: '28px', fontWeight: 'bold', textAlign: 'center'}}>TASA RETRIBUTIVA POR VERTIMENTOS PUNTUALES </div>
                      {/* <div style={{fontSize: '28px', fontWeight: 'bold', textAlign: 'center'}}> PUNTUALES</div> */}

                      {/* <div style={{fontSize: '28px', fontWeight: 'bold'}}>TASA RETRIBUTIVA Y COMPENSATORIA</div>
                      <div style={{fontSize: '28px', fontWeight: 'bold'}}>RENTA ASOCIADA</div> */}
                    </div>
                  </div>
                </article>
              </StyledTableCell>
              <StyledHeaderCell align="center" colSpan={2}>Ref. de Pago</StyledHeaderCell>
              <StyledTableCell align="center" sx={{ color: 'red', fontWeight: 'bold', fontSize: '29px' }}>TR {configData && (<>{String(configData.referencia_actual).padStart(6, '0')}</>)}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell align="center" colSpan={5}>FECHA LÍMITE  d DE PAGO</StyledHeaderCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center" colSpan={5} sx={{fontSize: '26px', fontWeight: 'bold'}}>{dayjs().add(90, 'day').format('LL')}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell align="center" colSpan={2}>Doc. de Cobro N°</StyledHeaderCell>
              <StyledTableCell align="center" sx={{fontSize: '24px', fontWeight: 'bold'}}>GR- 2023 011883</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledCell colSpan={12}>Ley 99 de 1993 Artículo 42, Decreto 901 de 1997, Resoluciones 0273 de 1997 y 0372 de 1998 del Ministerio del Medio Ambiente, Acuerdo 011 del 2000 de CORMACARENA (Por medio del cual se creó El Fondo Regional de Descontaminación), Decreto 2667 de 2012, Decreto 1076 de 2015 y Resolución PS-GJ.1.2.6.23.1974 de 2023.
              </StyledCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell sx={{width: '15%'}}>FECHA DE ELABORACION</StyledHeaderCell>
              <StyledTableCell colSpan={3} align='center'>{dayjs().format('LL')}</StyledTableCell>
              <StyledHeaderCell sx={{width: '8%'}}>PERIODO</StyledHeaderCell>
              <StyledTableCell colSpan={2} align='center'>Año {dayjs().year()}</StyledTableCell>
              <StyledHeaderCell sx={{width: '10%'}}>CEDULA/NIT</StyledHeaderCell>
              <StyledTableCell colSpan={4} align='center'>{obligaciones?.numero_identificacion}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell colSpan={1}>Ubicación</StyledHeaderCell>
              <StyledTableCell colSpan={11}>Puerto Gaitán</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell colSpan={1}>NOMBRE DEL TITULAR</StyledHeaderCell>
              <StyledTableCell colSpan={11} sx={{fontWeight: 'bold'}}> {obligaciones?.nombre_completo} </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell colSpan={1}>REPRESENTANTE LEGAL</StyledHeaderCell>
              <StyledTableCell colSpan={11}>{historico?.representante_legal}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell sx={{width: '15%'}}>DIRECCIÓN</StyledHeaderCell>
              <StyledTableCell colSpan={5}>{historico?.direccion_titular}</StyledTableCell>
              <StyledHeaderCell colSpan={2}>TELÉFONOS</StyledHeaderCell>
              <StyledTableCell colSpan={4}>{historico?.telefono_titular}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell colSpan={1}>EXPEDIENTE</StyledHeaderCell>
              <StyledTableCell colSpan={11}>{historico?.expediente}</StyledTableCell>
              {/* <StyledHeaderCell colSpan={2}>N° RESOLUCION Y FECHA</StyledHeaderCell>
              <StyledTableCell colSpan={5}>PS-GJ.1.2.6.19.2741 14 de Nov de 2019</StyledTableCell> */}
            </TableRow>
            <TableRow>
              <StyledHeaderCell colSpan={1}>NOMBRE DE LA FUENTE</StyledHeaderCell>
              <StyledTableCell colSpan={11}>{historico?.nombre_fuente_hidrica}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell colSpan={1}>NOMBRE DEL TRAMO</StyledHeaderCell>
              <StyledTableCell colSpan={11}></StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell sx={{width: '15%'}}>¿PRESENTA AUTODECLARACION?</StyledHeaderCell>
              <StyledTableCell colSpan={1}>SI</StyledTableCell>
              <StyledHeaderCell colSpan={2}>RESOLUCIÓN PSMV</StyledHeaderCell>
              <StyledTableCell colSpan={8}>PS-GJ.1.2.6.19.2741 14 de Nov de 2019</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell sx={{width: '15%'}}>¿AUTODECLARACIÓN APROBADA?</StyledHeaderCell>
              <StyledTableCell colSpan={1}>NO</StyledTableCell>
              <StyledHeaderCell colSpan={2}>RES. PERMISO DE VERTIMENTO</StyledHeaderCell>
              <StyledTableCell colSpan={8}>PS-GJ.1.2.6.19.2741 14 de Nov de 2019</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell sx={{width: '20%'}}>Parámetros generales</StyledHeaderCell>
              <StyledHeaderCell colSpan={4}>Factor Regional(Fr)</StyledHeaderCell>
              <StyledHeaderCell colSpan={4}>Tarifa Mínima(TM)($)</StyledHeaderCell>
              <StyledHeaderCell colSpan={4}>Tarifa de la tasa (TR=TM*Fr)($/Kg)</StyledHeaderCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell sx={{width: '15%'}}>DBO - Demanda Bioquímica de Oxigeno</StyledHeaderCell>
              <StyledTableCell colSpan={4}>{historico?.factor_regional}</StyledTableCell>
              <StyledTableCell colSpan={4}>1.00</StyledTableCell>
              <StyledTableCell colSpan={4}>1.00</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell sx={{width: '15%'}}>SST - Sólidos Suspedidos Totales</StyledHeaderCell>
              <StyledTableCell colSpan={4}>{historico?.factor_regional}</StyledTableCell>
              <StyledTableCell colSpan={4}>1.00</StyledTableCell>
              <StyledTableCell colSpan={4}>1.00</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell colSpan={12} sx={{textAlign: 'center'}}>LIQUIDACIÓN DE LA CARGA CONTAMINANTE</StyledHeaderCell>
            </TableRow>
            {/* <TableRow>
              <StyledHeaderCell sx={{width: '10%'}}>¿Se liquida con PSMV?</StyledHeaderCell>
              <StyledTableCell colSpan={1}>NO</StyledTableCell>
              <StyledHeaderCell colSpan={1}>Personas/Anim. DBO/SST:</StyledHeaderCell>
              <StyledTableCell colSpan={1}></StyledTableCell>
              <StyledHeaderCell colSpan={1}>Concentración Pers/Dia (DBO):</StyledHeaderCell>
              <StyledTableCell colSpan={1}>0.000</StyledTableCell>
              <StyledHeaderCell colSpan={1}>Concentración Pers/Dia (SST):</StyledHeaderCell>
              <StyledTableCell colSpan={1}>0.00 0</StyledTableCell>
            </TableRow> */}
            <TableRow>
              <StyledHeaderCell sx={{width: '15%'}}>¿Se liquida con PSMV?</StyledHeaderCell>
              <StyledTableCell colSpan={1}>NO</StyledTableCell>
              <StyledHeaderCell colSpan={2}>Personas/Anim. DBO/SST:</StyledHeaderCell>
              <StyledTableCell colSpan={2}></StyledTableCell>
              <StyledHeaderCell colSpan={2}>Concentración Pers/Dia (DBO):</StyledHeaderCell>
              <StyledTableCell colSpan={1}>0.000</StyledTableCell>
              <StyledHeaderCell colSpan={2}>Concentración Pers/Dia (SST):</StyledHeaderCell>
              <StyledTableCell colSpan={1}>0.000</StyledTableCell>
            </TableRow> 
            
            <TableRow>
              <StyledHeaderCell sx={{width: '10%'}}>PARÁMETRO / MESES DEL AÑO</StyledHeaderCell>
              <StyledHeaderCell colSpan={2}>Enero</StyledHeaderCell>
              <StyledHeaderCell colSpan={2}>Febrero</StyledHeaderCell>
              <StyledHeaderCell colSpan={2}>Marzo</StyledHeaderCell>
              <StyledHeaderCell colSpan={2}>Abril</StyledHeaderCell>
              <StyledHeaderCell colSpan={1}>Mayo</StyledHeaderCell>
              <StyledHeaderCell colSpan={2}>Junio</StyledHeaderCell>
            </TableRow>



            <TableRow>
              <StyledTableCell sx={{width: '10%'}}>(Q) (L/sg) - Caudal Vertido</StyledTableCell>
              <StyledTableCell colSpan={2}>47.52</StyledTableCell>
              <StyledTableCell colSpan={2}>47.81</StyledTableCell>
              <StyledTableCell colSpan={2}>41.37</StyledTableCell>
              <StyledTableCell colSpan={2}>61.68</StyledTableCell> 
              <StyledTableCell colSpan={1}>69.51</StyledTableCell>
              <StyledTableCell colSpan={2}>66.04</StyledTableCell>
            </TableRow>

            <TableRow>
              <StyledTableCell sx={{width: '10%'}}>Concentración DBO para el mes (Mg/L)</StyledTableCell>
              <StyledTableCell colSpan={2}>14.00</StyledTableCell>
              <StyledTableCell colSpan={2}>14.00</StyledTableCell>
              <StyledTableCell colSpan={2}>14.00</StyledTableCell>
              <StyledTableCell colSpan={2}>14.00</StyledTableCell> 
              <StyledTableCell colSpan={1}>14.00</StyledTableCell>
              <StyledTableCell colSpan={2}>14.00</StyledTableCell>
            </TableRow>
            
            <TableRow>
              <StyledTableCell sx={{width: '10%'}}>Carga Contaminante DBO (Kg)</StyledTableCell>
              <StyledTableCell colSpan={2}>1,781.89</StyledTableCell>
              <StyledTableCell colSpan={2}>1,619.27</StyledTableCell>
              <StyledTableCell colSpan={2}>1,551.28</StyledTableCell>
              <StyledTableCell colSpan={2}>2,238.24</StyledTableCell> 
              <StyledTableCell colSpan={1}>2,606.46</StyledTableCell>
              <StyledTableCell colSpan={2}>2,396.46</StyledTableCell>
            </TableRow>



            <TableRow>
              <StyledTableCell sx={{width: '10%'}}>SUBTOTAL DBO : $2,289,349</StyledTableCell>
              <StyledTableCell colSpan={2}>$334,550</StyledTableCell> 
              <StyledTableCell colSpan={2}>$304,018</StyledTableCell>
              <StyledTableCell colSpan={2}>$291,253</StyledTableCell>
              <StyledTableCell colSpan={2}>$420,230</StyledTableCell> 
              <StyledTableCell colSpan={1}>$489,363</StyledTableCell>
              <StyledTableCell colSpan={2}>$449,935</StyledTableCell>

            </TableRow>

            <TableRow>
              <StyledTableCell sx={{width: '10%'}}>Concentración SST para el mes (Mg/L)</StyledTableCell>
              <StyledTableCell colSpan={2}>10.00</StyledTableCell> 
              <StyledTableCell colSpan={2}>10.00</StyledTableCell>
              <StyledTableCell colSpan={2}>10.00</StyledTableCell>
              <StyledTableCell colSpan={2}>10.00</StyledTableCell> 
              <StyledTableCell colSpan={1}>10.00</StyledTableCell>
              <StyledTableCell colSpan={2}>10.00</StyledTableCell>
              
            </TableRow>

            
            <TableRow>
              <StyledTableCell sx={{width: '10%'}}>Carga Contaminante SST (Kg)</StyledTableCell>
              <StyledTableCell colSpan={2}>1,272.78</StyledTableCell> 
              <StyledTableCell colSpan={2}>1,156.62</StyledTableCell>
              <StyledTableCell colSpan={2}>1,108.05</StyledTableCell>
              <StyledTableCell colSpan={2}>1,598.75</StyledTableCell> 
              <StyledTableCell colSpan={1}>1,861.76</StyledTableCell>
              <StyledTableCell colSpan={2}>1,711.76</StyledTableCell> 
            </TableRow>

 
            <TableRow>
              <StyledTableCell sx={{width: '10%'}}>SUBTOTAL SST: $699,216</StyledTableCell>
              <StyledTableCell colSpan={2}>$102,179</StyledTableCell> 
              <StyledTableCell colSpan={2}>$92,853</StyledTableCell>
              <StyledTableCell colSpan={2}>$88,954</StyledTableCell>
              <StyledTableCell colSpan={2}>$128,348</StyledTableCell> 
              <StyledTableCell colSpan={1}>$149,462</StyledTableCell>
              <StyledTableCell colSpan={2}>$137,420</StyledTableCell> 
            </TableRow>



            <TableRow>
              <StyledTableCell sx={{width: '10%'}}>SUBTOTALES POR MES</StyledTableCell>
              <StyledTableCell colSpan={2}>{months.includes("Enero") ? currency_formatter(rows_detalles[0].valor_liquidado, 0) : "0"}</StyledTableCell>
              <StyledTableCell colSpan={2}>{months.includes("Febrero") ? currency_formatter(rows_detalles[1].valor_liquidado, 0) : "0"}</StyledTableCell>
              <StyledTableCell colSpan={2}>{months.includes("Marzo") ? currency_formatter(rows_detalles[2].valor_liquidado, 0) : "0"}</StyledTableCell>
              <StyledTableCell colSpan={2}>{months.includes("Abril") ? currency_formatter(rows_detalles[3].valor_liquidado, 0) : "0"}</StyledTableCell>
              <StyledTableCell colSpan={2}>{months.includes("Mayo") ? currency_formatter(rows_detalles[4].valor_liquidado, 0) : "0"}</StyledTableCell>
              <StyledTableCell colSpan={2}>{months.includes("Junio") ? currency_formatter(rows_detalles[5].valor_liquidado, 0) : "0"}</StyledTableCell> 
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
           
            <TableRow>
              <StyledTableCell colSpan={5} align='right'>TOTAL A PAGAR</StyledTableCell>
              <StyledTableCell colSpan={3} align='right' sx={{color: 'red', fontWeight: 'bold'}}>{currency_formatter(form_liquidacion.valor ?? 0, 0)} </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell colSpan={2} align='right'>TOTAL A PAGAR</StyledTableCell>
              <StyledTableCell colSpan={10} align='left' sx={{color: 'red', fontWeight: 'bold'}}>{NumerosLetras(form_liquidacion.valor)} </StyledTableCell>
            </TableRow>
            {/* Más filas según sean necesarias */}
          </TableBody>
        </Table>
        </TableContainer>
        <article style={{marginTop: '1rem'}}>
          <div style={{textAlign: 'justify', fontSize: '19px', fontWeight:'500'}}>De acuerdo con lo establecido en la Ley 1066 de 2006, el interés moratorio se cobrará a la tasa efectiva de usura certificada por la Superintendencia Financiera.
            El no recibo del documento de cobro no lo exonera del pago, por lo tanto, deberá solicitarlo en las instalaciones de CORMACARENA para cumplir con su obligación.
            Una vez realizado el pago, enviar copia del soporte respectivo al correo info@cormacarena.gov.co.<br />
            Contra este acto administrativo proceden los recursos y reclamaciones de ley.<br />
            No contribuyente de renta, no sujeto de retención (Art. 22 libro I E.T. y Art. 369 Libro II E.T.).<br />
            Para la Expedición de su Paz y Salvo, debe hacer llegar mediante oficio original y/o copia de Recibo de Consignación Bancaria, donde el sello del Banco sea legible, a la siguiente<br />
            dirección: Oficina Territorial del META, Carrera 44C No. 33B - 24 Urbanización Los Pinos, Barzal Alto, Sede Principal, Villavicencio – Meta<br />
            Dirección Electrónica: Info@cormacarena.gov.co PBX 673 0420 - 673 0417 - 673 0417 Ext. 105 Línea Gratuita: 01-8000-117177
          </div>
        </article>
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
      </section>
      <Grid item xs={12} sm={12}>
        <embed
          src={cobro_url}
          type="application/pdf"
          width="100%"
          height="1080px"
        />
      </Grid>
    </>
  );
}