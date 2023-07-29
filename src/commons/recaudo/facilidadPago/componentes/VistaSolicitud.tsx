/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Grid, Box, TextField, Checkbox, FormGroup, FormControlLabel, Button } from "@mui/material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { PersonaNatural, PersonaJuridica, DeudorSolidarioNatural, DeudorSolidarioJuridico } from './CalidadPersona';
import { useSelector } from 'react-redux';
import { type FacilidadPagoSolicitud } from '../interfaces/interfaces';
import { faker } from '@faker-js/faker';

interface RootState {
  solicitud_facilidad: {
    solicitud_facilidad: FacilidadPagoSolicitud;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const VistaSolicitud: React.FC = () => {
  const { solicitud_facilidad } = useSelector((state: RootState) => state.solicitud_facilidad);

  const columns_bienes: GridColDef[] = [
    {
      field: 'nombre_tipo_bien',
      headerName: 'Tipo Bien',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'identificacion',
      headerName: 'Identificación',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'valor',
      headerName: 'Avalúo',
      width: 150,
      renderCell: (params) => {
        const precio_cop = new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "COP",
        }).format(params.value)
        return (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {precio_cop}
        </div>
        )
      },
    },
    {
      field: 'Direccion',
      headerName: 'Dirección',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {`${params.row.direccion as string}, ${params.row.ubicacion as string}`}
        </div>
      ),
    },
    {
      field: 'documento_soporte',
      headerName: 'Doc. Impuestos',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          <a href={params.value} target="_blank" rel="noreferrer">
            <Button
              color='primary'
              variant='outlined'
              size='small'
              startIcon={<CloudDownloadIcon />}
            >
              Ver Documento
            </Button>
          </a>
        </div>
      ),
    },
  ];

  return (
    <>
      <h3>Detalle</h3>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <a href={solicitud_facilidad.facilidad_pago.documento_soporte} target="_blank" rel="noreferrer">
            <Button
              fullWidth
              color='primary'
              variant='outlined'
              size='medium'
              startIcon={<CloudDownloadIcon />}
            >
              Ver Documento Solicitud
            </Button>
          </a>
        </Grid>
        <Grid item xs={12} sm={5}>
          <a href={solicitud_facilidad.facilidad_pago.consignacion_soporte} target="_blank" rel="noreferrer">
            <Button
              fullWidth
              color='primary'
              variant='outlined'
              size='medium'
              startIcon={<CloudDownloadIcon />}
            >
              Ver Soporte Consignación
            </Button>
          </a>
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            label="Calidad en que actúa la persona"
            size="small"
            fullWidth
            value={`${solicitud_facilidad.facilidad_pago.tipo_actuacion}`}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            label="Valor Abonado"
            size="small"
            fullWidth
            value={`${'Aún no esta'}`}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={15}>
          {
            solicitud_facilidad.facilidad_pago.id_tipo_actuacion === 1 ? (
              <PersonaNatural />
            ) : solicitud_facilidad.facilidad_pago.id_tipo_actuacion === 2 ? (
              <PersonaJuridica />
            ) : solicitud_facilidad.facilidad_pago.id_tipo_actuacion === 3 ? (
              <DeudorSolidarioNatural />
            ) : solicitud_facilidad.facilidad_pago.id_tipo_actuacion === 4 ?  (
              <DeudorSolidarioJuridico />
            ) : null
          }
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            label="Periodicidad y Modalidad"
            size="small"
            fullWidth
            value={
              solicitud_facilidad.facilidad_pago.periodicidad === 1 ?
              'Mensual' : solicitud_facilidad.facilidad_pago.periodicidad === 3 ?
              'Trimestral' : solicitud_facilidad.facilidad_pago.periodicidad === 6 ?
              'Semestral' : solicitud_facilidad.facilidad_pago.periodicidad === 12 ?
              'Anual' : solicitud_facilidad.facilidad_pago.periodicidad
            }
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            label="Plazo"
            size="small"
            fullWidth
            value={`${solicitud_facilidad.facilidad_pago.cuotas}`}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <a href={solicitud_facilidad.facilidad_pago.documento_no_enajenacion} target="_blank" rel="noreferrer">
            <Button
              fullWidth
              color='primary'
              variant='outlined'
              size='medium'
              startIcon={<CloudDownloadIcon />}
            >
              Ver Documento No Enajenación
            </Button>
          </a>
        </Grid>
        <Grid item xs={12} sm={5}>
          <a href={solicitud_facilidad.documento_garantia} target="_blank" rel="noreferrer">
            <Button
              fullWidth
              color='primary'
              variant='outlined'
              size='medium'
              startIcon={<CloudDownloadIcon />}
            >
              Ver Garantías Ofrecidas
            </Button>
          </a>
        </Grid>
      </Grid>
      <p><strong>Relación de bienes</strong></p>
      <Grid item xs={12}>
        <Grid item>
           <Box sx={{ width: '100%' }}>
            <DataGrid
              autoHeight
              disableSelectionOnClick
              rows={solicitud_facilidad.bienes}
              columns={columns_bienes}
              pageSize={10}
              rowsPerPageOptions={[10]}
              experimentalFeatures={{ newEditingApi: true }}
              getRowId={(row) => faker.database.mongodbObjectId()}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={15} mt='20px' mb='20px'>
        <TextField
          multiline
          rows={4}
          value={`${solicitud_facilidad.facilidad_pago.observaciones}`}
          label="Observación Usuario"
          size="small"
          fullWidth
          disabled
        />
      </Grid>
      <FormGroup>
        <FormControlLabel checked disabled control={<Checkbox />} label="Aceptar términos y condiciones" />
        {
          solicitud_facilidad.facilidad_pago.notificaciones !== undefined ?
          solicitud_facilidad.facilidad_pago.notificaciones ?
          (<FormControlLabel checked disabled control={<Checkbox />} label="Autorizar notificación por correo electrónico" />) :
          (<FormControlLabel disabled control={<Checkbox />} label="Autorizar notificación por correo electrónico" />) : null
        }
      </FormGroup>
    </>
  )
}
