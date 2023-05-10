/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Grid, Box, TextField, Checkbox, FormGroup, FormControlLabel, Button } from "@mui/material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { PersonaNatural } from './CalidadPersona';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const VistaSolicitud: React.FC = () => {

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
      <Grid container spacing={5}>
        <Grid item xs={12} sm={3}>
          <Button
            color='primary'
            variant='outlined'
            size='medium'
            startIcon={<CloudDownloadIcon />}
            onClick={() => {}}
          >
            Ver Documento Solicitud
          </Button>
        </Grid>
        <Grid item xs={12} sm={3.1}>
          <Button
            color='primary'
            variant='outlined'
            size='medium'
            startIcon={<CloudDownloadIcon />}
            onClick={() => {}}
          >
            Ver Soporte Consignación
          </Button>
        </Grid>
        <Grid item xs={12} sm={3.1}>
          <TextField
            label="Calidad en que actúa la persona"
            size="small"
            fullWidth
            value={'Persona Natural'}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={10}>
          <PersonaNatural />
        </Grid>
        <Grid item xs={12} sm={2.9}>
          <TextField
            label="Periodicidad y Modalidad"
            size="small"
            fullWidth
            value={'Semestral'}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={2.9}>
          <TextField
            label="Plazo"
            size="small"
            fullWidth
            value={2}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={3.4}>
          <Button
            color='primary'
            variant='outlined'
            size='medium'
            startIcon={<CloudDownloadIcon />}
            onClick={() => {}}
          >
            Ver Documento No Enajenación
          </Button>
        </Grid>
        <Grid item xs={12} sm={2.9}>
          <Button
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
          value={'Aquí van todas las observaciones escritas por el usuario externo.'}
          label="Observación Usuario"
          size="small"
          disabled
          fullWidth
        />
      </Grid>
      <FormGroup>
        <FormControlLabel checked disabled control={<Checkbox />} label="Aceptar términos y condiciones" />
        <FormControlLabel checked disabled control={<Checkbox />} label="Autorizar notificación por correo electrónico" />
      </FormGroup>
    </>
  )
}
