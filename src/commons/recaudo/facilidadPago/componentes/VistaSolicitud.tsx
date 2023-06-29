/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Grid, Box, TextField, Checkbox, FormGroup, FormControlLabel, Button } from "@mui/material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { PersonaNatural, PersonaJuridica, DeudorSolidarioNatural, DeudorSolidarioJuridico } from './CalidadPersona';
import { useSelector } from 'react-redux';
import { type FacilidadPagoSolicitud } from '../interfaces/interfaces';

interface RootState {
  solicitud_facilidad: {
    solicitud_facilidad: FacilidadPagoSolicitud;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const VistaSolicitud: React.FC = () => {
  const { solicitud_facilidad } = useSelector((state: RootState) => state.solicitud_facilidad);

  const rows_bienes = [
    {
      id: 'jsjsjq939',
      bien: 'Casa',
      identificacion: 'reg-9233319',
      avaluo: 120000000,
      direccion: 'Cl 45 # 120 - 123',
    },
    {
      id: 'jfsmd30230',
      bien: 'Auto',
      identificacion: 'GMW-604',
      avaluo: 100000000,
      direccion: 'Cra 4 # 120 - 678',
    },
  ];

  const columns_bienes: GridColDef[] = [
    {
      field: 'bien',
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
      field: 'avaluo',
      headerName: 'Avalúo',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'direccion',
      headerName: 'Dirección',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'docImpuesto',
      headerName: 'Doc. Impuestos',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          <Button
            color='primary'
            variant='outlined'
            size='small'
            startIcon={<CloudDownloadIcon />}
            onClick={() => {}}
          >
            Ver Documento
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <Button
            fullWidth
            color='primary'
            variant='outlined'
            size='medium'
            startIcon={<CloudDownloadIcon />}
            onClick={() => {}}
          >
            Ver Documento Solicitud
          </Button>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Button
            fullWidth
            color='primary'
            variant='outlined'
            size='medium'
            startIcon={<CloudDownloadIcon />}
            onClick={() => {}}
          >
            Ver Soporte Consignación
          </Button>
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            label="Calidad en que actúa la persona"
            size="small"
            fullWidth
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            value={`${solicitud_facilidad.tipo_actuacion === 'tipo 1' ? 'Persona Natural' : solicitud_facilidad.tipo_actuacion === 'tipo 2' ? 'Persona Juridica' : solicitud_facilidad.tipo_actuacion === 'tipo 3' ? 'Deudor Solidario Natural' : solicitud_facilidad.tipo_actuacion === 'tipo 4' ? 'Deudor Solidario Juridico' : null}`}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={15}>
          {
            solicitud_facilidad.tipo_actuacion === 'tipo 1' ? (
              <PersonaNatural />
            ) : solicitud_facilidad.tipo_actuacion === 'tipo 2' ? (
              <PersonaJuridica />
            ) : solicitud_facilidad.tipo_actuacion === 'tipo 3' ? (
              <DeudorSolidarioNatural />
            ) : solicitud_facilidad.tipo_actuacion === 'tipo 4' ?  (
              <DeudorSolidarioJuridico />
            ) : null
          }
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            label="Periodicidad y Modalidad"
            size="small"
            fullWidth
            value={`${solicitud_facilidad.periodicidad}`}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            label="Plazo"
            size="small"
            fullWidth
            value={`${solicitud_facilidad.cuotas}`}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Button
            fullWidth
            color='primary'
            variant='outlined'
            size='medium'
            startIcon={<CloudDownloadIcon />}
            onClick={() => {}}
          >
            Ver Documento No Enajenación
          </Button>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Button
            fullWidth
            color='primary'
            variant='outlined'
            size='medium'
            startIcon={<CloudDownloadIcon />}
            onClick={() => {}}
          >
            Ver Garantías Ofrecidas
          </Button>
        </Grid>
      </Grid>
      <p><strong>Relación de bienes</strong></p>
      <Grid item xs={12}>
        <Grid item>
           <Box sx={{ width: '100%' }}>
            <DataGrid
              autoHeight
              disableSelectionOnClick
              rows={rows_bienes}
              columns={columns_bienes}
              pageSize={10}
              rowsPerPageOptions={[10]}
              experimentalFeatures={{ newEditingApi: true }}
              getRowId={(row) => row.id}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={15} mt='20px' mb='20px'>
        <TextField
          multiline
          rows={4}
          value={`${solicitud_facilidad.observaciones}`}
          label="Observación Usuario"
          size="small"
          fullWidth
          disabled
        />
      </Grid>
      <FormGroup>
        <FormControlLabel checked disabled control={<Checkbox />} label="Aceptar términos y condiciones" />
        {
          solicitud_facilidad.notificaciones !== undefined ? solicitud_facilidad.notificaciones ?  (<FormControlLabel checked disabled control={<Checkbox />} label="Autorizar notificación por correo electrónico" />)  : (<FormControlLabel disabled control={<Checkbox />} label="Autorizar notificación por correo electrónico" />) : null
        }
      </FormGroup>
    </>
  )
}
