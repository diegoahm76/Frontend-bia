/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Stack, MenuItem, FormControl, Select, InputLabel, Grid, TextField } from '@mui/material'
import { FileDownloadOutlined, KeyboardArrowDown, KeyboardArrowUp, SearchOutlined}  from '@mui/icons-material';
import { Fragment, useState, useEffect } from 'react';
import { type event } from '../../facilidadPago/interfaces/interfaces';

function createData(
  tipo_cobro: string,
  identificacion: string,
  nombre_deudor: string,
  numero_resolucion: string,
  pagos: any,
  total_local: string,
) {
  return {
    tipo_cobro,
    identificacion,
    nombre_deudor,
    numero_resolucion,
    pagos,
    total_local,
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, set_open] = useState(false);

  const total_local_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(parseFloat(row.total_local))

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              set_open(!open)
            }}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.tipo_cobro}</TableCell>
        <TableCell>{row.identificacion}</TableCell>
        <TableCell>{row.nombre_deudor}</TableCell>
        <TableCell>{row.numero_resolucion}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell># Cuota</TableCell>
                    <TableCell>Número Recibo</TableCell>
                    <TableCell>Fecha Pago</TableCell>
                    <TableCell>Estado Pago</TableCell>
                    <TableCell>Días Venc.</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.pagos.map((pago: any) => {
                    const precio_cop = new Intl.NumberFormat("es-ES", {
                      style: "currency",
                      currency: "COP",
                    }).format(pago.total)
                    return (
                      <TableRow key={pago.cuota}>
                        <TableCell component="th" scope="row">{pago.cuota}</TableCell>
                        <TableCell>{pago.numero_factura}</TableCell>
                        <TableCell>{pago.fecha_pago}</TableCell>
                        <TableCell sx={ pago.estado === "Pagada" ? { WebkitTextFillColor: "green"} : pago.estado === "Vencida" ? { WebkitTextFillColor: "red"} : { WebkitTextFillColor: "#BE8400"} }>
                          {pago.estado}
                        </TableCell>
                        <TableCell>{pago.dias_vencimiento}</TableCell>
                        <TableCell>{precio_cop}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
              <Stack
                direction="row"
                display='flex'
                justifyContent='flex-end'
              >
                <Grid item xs={12} sm={2.5} mt='20px' mb='20px'>
                  <TextField
                    label={<strong>Total General</strong>}
                    size="small"
                    fullWidth
                    value={total_local_cop}
                  />
                </Grid>
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

const rows = [
  createData('Cobro Coactivo', '12292393', 'Juan Perea', 'PS-GJ 1.4.32', [
    {
      cuota: 1,
      numero_factura: 'FP-2392',
      fecha_pago: '17-02-2021',
      estado: 'Pagada',
      dias_vencimiento: 0,
      total: '3200054',
    },
    {
      cuota: 2,
      numero_factura: 'FP-2012',
      fecha_pago: '17-03-2021',
      estado: 'Vencida',
      dias_vencimiento: 120,
      total: '3200054',
    },
    {
      cuota: 3,
      numero_factura: 'FP-2399',
      fecha_pago: '17-04-2021',
      estado: 'Pendiente',
      dias_vencimiento: 0,
      total: '3200054',
    }
  ], '9600162'),
  createData('Cobro Persuasivo', '60323909', 'Romero Giraldo', 'PS-GJ 1.4.32', [
    {
      cuota: 1,
      numero_factura: 'FP-2392',
      fecha_pago: '17-02-2021',
      estado: 'Pagada',
      dias_vencimiento: 0,
      total: '2589000',
    },
    {
      cuota: 2,
      numero_factura: 'FP-2012',
      fecha_pago: '17-03-2021',
      estado: 'Vencida',
      dias_vencimiento: 120,
      total: '2589000',
    },
  ], '5178000'),
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaFacilidadPagoVencimiento: React.FC = () => {
  const [total, set_total] = useState(0);
  const [total_coactivo, set_total_coactivo] = useState(0);
  const [total_persuasivo, set_total_persuasivo] = useState(0);
  const [type, set_type] = useState('');
  console.log('Estado Seleccionado', type);

  useEffect(() => {
    if(rows.length !== 0) {
      let total_coactivo = 0
      let total_persuasivo = 0
      for(let i=0; i< rows.length; i++){
        if(rows[i].tipo_cobro === 'Cobro Coactivo') {
          total_coactivo = total_coactivo + parseFloat(rows[i].total_local)
        }
        if(rows[i].tipo_cobro === 'Cobro Persuasivo') {
          total_persuasivo = total_persuasivo + parseFloat(rows[i].total_local)
        }
        set_total_coactivo(total_coactivo)
        set_total_persuasivo(total_persuasivo)
      }
      set_total(total_coactivo + total_persuasivo)
    }
  }, [rows])

  const total_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(total)

  const total_coactivo_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(total_coactivo)

  const total_persuasivo_cop = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
  }).format(total_persuasivo)

  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ mb: '20px' }}
      >
        <Stack
          direction="row"
          justifyContent="left"
          spacing={2}
        >
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Seleccionar Estado del Cobro: </InputLabel>
            <Select
              label="Seleccionar Estado del Cobro: "
              defaultValue={''}
              onChange={(event: event)=>{
                const { value } = event.target
                  set_type(value)
                }}
              >
                <MenuItem value='coactivo'>Coactivo</MenuItem>
                <MenuItem value='persuasivo'>Persuasivo</MenuItem>
            </Select>
          </FormControl>
          <Button
            color='primary'
            variant='contained'
            startIcon={<SearchOutlined />}
            onClick={() => {}}
          >
            Consultar
          </Button>
        </Stack>
        <Stack
          direction="row"
          justifyContent="right"
          spacing={2}
        >
          <Button
            color='primary'
            variant='outlined'
            startIcon={<FileDownloadOutlined />}
            onClick={() => {}}
          >
            Exportar Excel
          </Button>
          <Button
            color='primary'
            variant='outlined'
            startIcon={<FileDownloadOutlined />}
            onClick={() => {}}
          >
            Exportar PDF
          </Button>
        </Stack>
      </Stack>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Tipo Cobro</TableCell>
              <TableCell>NIT</TableCell>
              <TableCell>Nombre Deudor</TableCell>
              <TableCell>Resolución Facilidad de Pago</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.identificacion} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        direction="row"
        justifyContent="right"
        spacing={2}
        sx={{ mt: '30px' }}
      >
        <Grid item xs={12} sm={2.5}>
          <TextField
            label={<strong>Total Cobro Coactivo</strong>}
            size="small"
            fullWidth
            value={total_coactivo_cop}
          />
        </Grid>
        <Grid item xs={12} sm={2.5}>
          <TextField
            label={<strong>Total Cobro Persuasivo</strong>}
            size="small"
            fullWidth
            value={total_persuasivo_cop}
          />
        </Grid>
        <Grid item xs={12} sm={2.5}>
          <TextField
            label={<strong>Total General</strong>}
            size="small"
            fullWidth
            value={total_cop}
          />
        </Grid>
      </Stack>
    </Box>
  );
}
