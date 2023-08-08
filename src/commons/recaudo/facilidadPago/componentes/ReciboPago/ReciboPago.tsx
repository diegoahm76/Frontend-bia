/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Button, Grid, Stack } from '@mui/material';
import { CloudDownload } from '@mui/icons-material';
import './Estilos.css';
import dayjs from 'dayjs';
// import logo from '../../assets/logo_cormacarena.png';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ReciboPagoModulo: React.FC = () => {

  return (
    <Stack
      direction="column"
      spacing={2}
    >
      <div className='recibo'>
        <section className="recibo__titulo">
          <p className='descripcion'><strong>CORPORACIÓN PARA EL DESARROLLO SOSTENIBLE DEL ÁREA DE MANEJO ESPECIAL LA MACARENA</strong></p>
        </section>
        <section className='recibo__encabezado'>
          <img className='encabezado__logo' alt='logo' src="https://api.gbif.org/v1/image/unsafe/https%3A%2F%2Fraw.githubusercontent.com%2FSIB-Colombia%2Flogos%2Fmain%2Fsocio-SiB-cormacarena.png" />
          <div className='encabezado__empresa'>
            <h3 className='empresa'>CORMACARENA</h3>
            <h3 className='empresa--space'>822000091-2</h3>
            <h3 className='empresa'>RECIBO OFICIAL DE FACILIDAD DE PAGO</h3>
          </div>
          <div className='encabezado__pago'>
            <section className='pago__referencia'>
              <div className='referencia__titulo'>
                <p className='descripcion'><strong>Ref. Pago</strong></p>
              </div>
              <div className='referencia__info'>
                <p className='descripcion'><strong>{'WFE-19304023'}</strong></p>
              </div>
            </section>
            <section className='pago__fecha--titulo'>
              <p className='descripcion'><strong>FECHA LIMITE DE PAGO</strong></p>
            </section>
            <div className='pago__fecha--info'>
              <p className='descripcion'><strong>{'20-08-2023'}</strong></p>
            </div>
          </div>
        </section>
        <section className="recibo__ley">
          <p className='descripcion'>
            <strong>
              Ley 99 de 1993 art. 43, decreto 1076 de 2015, decreto 1155 de 2017, resoluciones 1571 de 2017 de MADS,
              Resolución No. PS-GI 1.2.6.21.0293 de 2021 y Resolución No. PS-GI 1.2.6.22.0332 de 2022 CORMACARENA.
            </strong>
          </p>
        </section>
        <section className="recibo__descripcion">
          <p className='descripcion'>No contribuyente de renta, exenta de retencion en la fuente (ET. Libro I Art. 22 y Libro II Art. 369).</p>
          <p className='descripcion'>Intereses moratorios liquidados con corte a la fecha limite de pago y la tasa de interes correspondiente al mes de corte.</p>
          <p className='descripcion'>Expedida y certificada por la Superintendencia Financiera de Colombia para el respectivo mes de mora.</p>
        </section>
        <section className='recibo__datos'>
          <section className='datos'>
            <div className='datos__titulo'>
              <p className='descripcion'><strong>Cédula/NIT</strong></p>
            </div>
            <div className='datos__info'>
              <p className='descripcion'><strong>{'12984244993'}</strong></p>
            </div>
          </section>
          <section className='datos'>
            <div className='datos__titulo'>
              <p className='descripcion'><strong>Nombre Titular</strong></p>
            </div>
            <div className='datos__info'>
              <p className='descripcion'><strong>{'Juan David Fajardo'}</strong></p>
            </div>
          </section>
          <section className='datos'>
            <div className='datos__titulo'>
              <p className='descripcion'><strong>Número Cuota</strong></p>
            </div>
            <div className='datos__info--ultimo'>
              <div className='datos__info--fila'>
                <p className='descripcion'><strong>{'3'}</strong></p>
              </div>
              <div className='datos__info--fila2'>
                <p className='descripcion'><strong>Valor Cuota</strong></p>
              </div>
              <div className='datos__info--fila'>
                <p className='descripcion'><strong>{'345.000,00 COP'}</strong></p>
              </div>
            </div>
          </section>
        </section>
        <section className='recibo__codigo'>
          <div className='codigo__fecha'>
            <p className='descripcion'><span className='fecha-impresion'>Fecha de impresión de Recibo: {dayjs(Date()).format('YYYY-MM-DD')}</span></p>
          </div>
          <div className='codigo__barras'>
            <img className='codigo__imagen' alt='codigo-barras' src="https://img.freepik.com/vector-premium/icono-codigo-barras-negro-sobre-fondo-blanco-aislado-10-eps-vectoriales_209910-531.jpg" />
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
            onClick={() => {
            }}
          >
            PSE
          </Button>
        </Grid>
      </Stack>
    </Stack>
  )
}
