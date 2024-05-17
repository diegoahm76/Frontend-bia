
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

dayjs.extend(localizedFormat);
dayjs.locale('es');

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

export const DocumentoPersuasivoPago: React.FC<any> = ({
  datos,
  data_clean,
  current_deudor,
  is_generate_cobro,
  cobro_url,
  id_subetapa
}: {datos: any, is_generate_cobro: boolean, cobro_url: any, data_clean: any, current_deudor: any, id_subetapa: number}) => {
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

        const margin = 20;
        pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth - margin * 2, pdfHeight - margin * 2);
        pdf.save('myfile.pdf');
      });
    }
  };

  return (
    <>
      {is_generate_cobro && <>
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
              <StyledTableCell rowSpan={4} colSpan={8}>
                <article style={{display: 'flex', alignItems: 'center', gap: '15rem'}}>
                  <img src={logoEmpresa} alt="Cormacarena" style={{ height: 200, width: 300 }} />
                  <div style={{display: 'flex', flexDirection: 'column', gap:'1.5rem'}}>
                    <div>
                      <div style={{fontSize: '42px', fontWeight: 'bold', textAlign: 'center'}}>CORMACARENA</div>
                      <div style={{fontSize: '23px', fontWeight: 'bold', textAlign: 'center'}}>822000091-2</div>
                    </div>
                    <div>
                      <div style={{fontSize: '28px', fontWeight: 'bold', textAlign: 'center'}}>RECIBO OFICIAL DE PAGO</div>
                      <div style={{fontSize: '28px', fontWeight: 'bold'}}>TASA POR UTILIZACIÓN DEL AGUA</div>
                      {/* <div style={{fontSize: '28px', fontWeight: 'bold'}}>TASA RETRIBUTIVA Y COMPENSATORIA</div>
                      <div style={{fontSize: '28px', fontWeight: 'bold'}}>RENTA ASOCIADA</div> */}
                    </div>
                  </div>
                </article>
              </StyledTableCell>
              <StyledHeaderCell align="center">Ref. de Pago</StyledHeaderCell>
              <StyledTableCell align="center" sx={{ color: 'red', fontWeight: 'bold', fontSize: '29px' }}>TUA</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell align="center" colSpan={2}>FECHA LÍMITE DE PAGO</StyledHeaderCell>
            </TableRow>
            <TableRow>
              <StyledTableCell align="center" colSpan={2} sx={{fontSize: '26px', fontWeight: 'bold'}}>28 de Febrero de 2024</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell align="center">Doc. de Cobro N°</StyledHeaderCell>
              <StyledTableCell align="center" sx={{fontSize: '24px', fontWeight: 'bold'}}>GR- 2023 011883</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledCell colSpan={12}>Ley 99 de 1993 Art.43, Decreto 1076 de 2015, Decreto 1155 de 2017,Resoluciones 1571 de 2017 del MADS, Resolución No. PS-GJ 1.2.6.21.0293 de 2021 y Resolución No. PS-GJ 1.2.6.22.0332 de 2022 CORMACARENA.</StyledCell>
            </TableRow>
            <TableRow>
              <StyledTableCell colSpan={12}>
                <div style={{fontWeight: 'bold'}}>No contribuyente de renta, exenta de retención en la fuente (ET. Libro I Art. 22 y Libro II Art. 369).</div>
                <div style={{fontWeight: 'bold'}}>Intereses moratorios liquidados con corte a la fecha límite de pago y la tasa de interés correspondiente al mes de corte.</div>
                <div style={{fontWeight: 'bold'}}>expedida y certificada por la Superintendencia Financiera de Colombia para el respectivo mes de mora.</div>
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell sx={{width: '15%'}}>FECHA DE ELABORACION</StyledHeaderCell>
              <StyledTableCell colSpan={4} align='center'>{dayjs().format('LL')}</StyledTableCell>
              <StyledHeaderCell sx={{width: '8%'}}>PERIODO</StyledHeaderCell>
              <StyledTableCell colSpan={2} align='center'>Año {dayjs().year()}</StyledTableCell>
              <StyledHeaderCell sx={{width: '10%'}}>CEDULA/NIT</StyledHeaderCell>
              <StyledTableCell colSpan={2} align='center'>{datos?.id_deudor?.identificacion}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell colSpan={1}>NOMBRE DEL TITULAR</StyledHeaderCell>
              <StyledTableCell colSpan={11} sx={{fontWeight: 'bold'}}>{datos?.id_deudor?.nombres || ''} {datos?.id_deudor?.apellidos || ''}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell colSpan={1}>REPRESENTANTE LEGAL</StyledHeaderCell>
              <StyledTableCell colSpan={11}>TENIENTE CORONEL LEONARDO JAIRO TORRES CASTILLO</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell colSpan={1}>DIRECCIÓN</StyledHeaderCell>
              <StyledTableCell colSpan={7}>KM 7 VIA PUERTO LOPEZ, CANTON MILITAR DE APIAY, VILLAVICENCIO</StyledTableCell>
              <StyledHeaderCell colSpan={1}>TELÉFONOS</StyledHeaderCell>
              <StyledTableCell colSpan={3}>{datos?.id_deudor?.telefono || ''}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell sx={{width: '15%'}}>EXPEDIENTE</StyledHeaderCell>
              <StyledTableCell colSpan={4}>3.37.2.09.197</StyledTableCell>
              <StyledHeaderCell colSpan={2}>N° RESOLUCION Y FECHA</StyledHeaderCell>
              <StyledTableCell colSpan={5}>PS-GJ.1.2.6.19.2741 14 de Nov de 2019</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell colSpan={1}>NOMBRE DE LA FUENTE</StyledHeaderCell>
              <StyledTableCell colSpan={11}>POZO PROFUNDO</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell sx={{width: '100px'}}>PREDIO</StyledHeaderCell>
              <StyledTableCell colSpan={11}>SANTA ANA Y PRADO, KM 12 VIA PUERTO LOPEZ - META</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell sx={{width: '100px'}}>MUNICIPIO</StyledHeaderCell>
              <StyledTableCell colSpan={6}>VILLAVICENCIO</StyledTableCell>
              <StyledHeaderCell sx={{width: '15%'}}>DEPARTAMENTO</StyledHeaderCell>
              <StyledTableCell colSpan={5}>META</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledHeaderCell sx={{width: '20%'}}>CAUDAL CONCESIONADO (Q) L/sg</StyledHeaderCell>
              <StyledTableCell colSpan={6}>8.409</StyledTableCell>
              <StyledHeaderCell sx={{width: '15%'}}>USO</StyledHeaderCell>
              <StyledTableCell colSpan={5}>DOMESTICO</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell height={700} colSpan={12}></StyledTableCell>
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
              <StyledTableCell colSpan={5} align='right'>TASA DE USO DEL AGUA</StyledTableCell>
              <StyledTableCell colSpan={3} align='right'>{form_values.sumaConcepto}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell colSpan={5} align='right'>INTERESES DE MORA</StyledTableCell>
              <StyledTableCell colSpan={3} align='right'>{form_values.sumaIntereses}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell height={35} colSpan={8}></StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell colSpan={5} align='right'>TOTAL A PAGAR</StyledTableCell>
              <StyledTableCell colSpan={3} align='right' sx={{color: 'red', fontWeight: 'bold'}}>{form_values.sumaTotal}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell colSpan={1} align='right'>TOTAL A PAGAR</StyledTableCell>
              <StyledTableCell colSpan={10} align='left' sx={{color: 'red', fontWeight: 'bold'}}>{NumerosLetras(form_values.totalNumber)}</StyledTableCell>
            </TableRow>
            {/* Más filas según sean necesarias */}
          </TableBody>
        </Table>
        </TableContainer>
        <article style={{marginTop: '1rem'}}>
          <div style={{fontSize: '24px', fontWeight:'600',  textAlign: 'center'}}>UNA VEZ REALIZADO EL PAGO, ENVIAR COPIA DEL SOPORTE RESPECTIVO AL CORREO info@cormacarena.gov.co</div>
          <div style={{fontSize: '28px', fontWeight: 'bold', textAlign: 'center'}}>Evite el inicio de procesos jurídicos pagando oportunamente dicha obligación</div>
          <div style={{textAlign: 'justify', fontSize: '19px', fontWeight:'500'}}>Para la Expedición de su Paz y Salvo, debe hacer llegar mediante oficio original y/o copia de Recibo de Consignación Bancaria, donde el sello del Banco sea legible, a la siguiente dirección: Oficina Territorial del META, Carrera 44C No. 33B - 24 Urbanización Los Pinos, Barzal Alto, Sede Principal, Villavicencio – Meta Dirección Electrónica: Info@cormacarena.gov.co PBX 673 0420 - 673 0417 - 673 0417 Ext. 105 Línea Gratuita: 01-8000-117177</div>
        </article>
      </section>
      </>
      }
      {cobro_url && <Grid item xs={12} sm={12}>
          <embed
            src={cobro_url}
            type="application/pdf"
            width="100%"
            height="1080px"
          />
        </Grid>}
    </>
  );
}