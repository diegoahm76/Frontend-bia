import { Button, Grid, Stack } from '@mui/material';
import { CloudDownload } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { type CuotaPlanPagoValidacion, type FacilidadPagoSolicitud } from '../interfaces/interfaces';
import logoEmpresa from '../assets/logo_cormacarena.png';
import pse from '../assets/pse.png';
import dayjs from 'dayjs';
import './Estilos/ReciboPago.css';

interface RootStateDatosPago {
  deudores: {
    deudores: CuotaPlanPagoValidacion;
  }
}

interface RootStateDatosDeudor {
  solicitud_facilidad: {
    solicitud_facilidad: FacilidadPagoSolicitud;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ReciboPagoModulo: React.FC = () => {
  const { deudores } = useSelector((state: RootStateDatosPago) => state.deudores);
  const { solicitud_facilidad } = useSelector((state: RootStateDatosDeudor) => state.solicitud_facilidad);

  const total_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(parseFloat(deudores.monto_cuota))

  return (
    <Stack
      direction="column"
      spacing={2}
    >
      <div className='recibo'>
        <section className="recibo__titulo">
          <p className='descripcionRecibo'><strong>CORPORACIÓN PARA EL DESARROLLO SOSTENIBLE DEL ÁREA DE MANEJO ESPECIAL LA MACARENA</strong></p>
        </section>
        <section className='recibo__encabezado'>
          <figure className='encabezadoRecibo__logo'>
            <img alt='logo_coorporacion' src={logoEmpresa} />
          </figure>
          <div className='encabezadoRecibo__empresa'>
            <h3 className='empresaRecibo'>CORMACARENA</h3>
            <h3 className='empresaRecibo--space'>822000091-2</h3>
            <h3 className='empresaRecibo'>RECIBO OFICIAL DE FACILIDAD DE PAGO</h3>
          </div>
          <div className='encabezadoRecibo__pago'>
            <section className='pagoRecibo__referencia'>
              <div className='referenciaRecibo__titulo'>
                <p className='descripcionRecibo'><strong>Ref. Pago</strong></p>
              </div>
              <div className='referenciaRecibo__info'>
                <p className='descripcionRecibo'><strong>{solicitud_facilidad.facilidad_pago.numero_radicacion}</strong></p>
              </div>
            </section>
            <section className='pagoRecibo__fecha--titulo'>
              <p className='descripcionRecibo'><strong>FECHA LIMITE DE PAGO</strong></p>
            </section>
            <div className='pagoRecibo__fecha--info'>
              <p className='descripcionRecibo'><strong>{dayjs(deudores.fecha_vencimiento).format('DD/MM/YYYY')}</strong></p>
            </div>
          </div>
        </section>
        <section className="recibo__ley">
          <p className='descripcionRecibo'>
            <strong>
              Ley 99 de 1993 art. 43, decreto 1076 de 2015, decreto 1155 de 2017, resoluciones 1571 de 2017 de MADS,
              Resolución No. PS-GI 1.2.6.21.0293 de 2021 y Resolución No. PS-GI 1.2.6.22.0332 de 2022 CORMACARENA.
            </strong>
          </p>
        </section>
        <section className="recibo__descripcion">
          <p className='descripcionRecibo'>No contribuyente de renta, exenta de retencion en la fuente (ET. Libro I Art. 22 y Libro II Art. 369).</p>
          <p className='descripcionRecibo'>Intereses moratorios liquidados con corte a la fecha limite de pago y la tasa de interes correspondiente al mes de corte.</p>
          <p className='descripcionRecibo'>Expedida y certificada por la Superintendencia Financiera de Colombia para el respectivo mes de mora.</p>
        </section>
        <section className='recibo__datos'>
          <section className='datosRecibo'>
            <div className='datosRecibo__titulo'>
              <p className='descripcionRecibo'><strong>Cédula/NIT</strong></p>
            </div>
            <div className='datosRecibo__info'>
              <p className='descripcionRecibo'><strong>{solicitud_facilidad.deudor.identificacion}</strong></p>
            </div>
          </section>
          <section className='datosRecibo'>
            <div className='datosRecibo__titulo'>
              <p className='descripcionRecibo'><strong>Nombre Titular</strong></p>
            </div>
            <div className='datosRecibo__info'>
              <p className='descripcionRecibo'><strong>{''.concat(solicitud_facilidad.deudor.nombre_completo)}</strong></p>
            </div>
          </section>
          <section className='datosRecibo'>
            <div className='datosRecibo__titulo'>
              <p className='descripcionRecibo'><strong>Número Cuota</strong></p>
            </div>
            <div className='datosRecibo__info--ultimo'>
              <div className='datosRecibo__info--fila'>
                <p className='descripcionRecibo'><strong>{deudores.nro_cuota}</strong></p>
              </div>
              <div className='datosRecibo__info--fila2'>
                <p className='descripcionRecibo'><strong>Valor Cuota</strong></p>
              </div>
              <div className='datosRecibo__info--fila'>
                <p className='descripcionRecibo'><strong>{total_cop}</strong></p>
              </div>
            </div>
          </section>
        </section>
        <section className='recibo__codigo'>
          <div className='codigoRecibo__fecha'>
            <p className='descripcionRecibo'><span className='fechaRecibo-impresion'>Fecha de impresión de Recibo: {dayjs(Date()).format('DD/MM/YYYY')}</span></p>
          </div>
          <div className='codigoRecibo__barras'>
            <img className='codigoRecibo__imagen' alt='codigo-barras' src="https://img.freepik.com/vector-premium/icono-codigo-barras-negro-sobre-fondo-blanco-aislado-10-eps-vectoriales_209910-531.jpg" />
          </div>
        </section>
      </div>
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        sx={{ marginTop: '20px' }}
      >
        <Grid item xs={12} sm={3}>
          <Button
            fullWidth
            color='primary'
            variant='contained'
            startIcon={<CloudDownload />}
            onClick={() => {
            }}
          >
            Descargar
          </Button>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            fullWidth
            color='primary'
            variant='contained'
            startIcon={<img alt='logo_pse' src={pse} />}
            onClick={() => {
            }}
          >
            Pagar en Línea
          </Button>
        </Grid>
      </Stack>
    </Stack>
  )
}
