// import AddIcon from '@mui/icons-material/Add';
import { DataGrid ,type GridColDef } from "@mui/x-data-grid"
import { Grid, Box, Stack, TextField, Button } from "@mui/material";
import { Title } from '../../../components/Title';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LiquidacionTUAScreen:React.FC = () => {

    const columns:GridColDef[] = [
        { 
            field: 'numero_factura',
            headerName: 'No.Factura',
            width: 200
        },
        {
            field: 'fecha_facturacion',
            headerName: 'Fecha Factuación',
            width: 200
        },
        {
            field: 'fecha_limite',
            headerName: 'Fecha Límite Pago',
            width: 200
        },
        {
            field: 'nombre_titular',
            headerName: 'Nombre del Titular',
            width: 200
        },
        {
            field: 'nombre_representante_legal',
            headerName: 'Nombre del Representante Legal',
            width: 200
        },
        {
            field: 'cedula_nit',
            headerName: 'Cédula/NIT',
            width: 200
        },
        {
            field: 'direccion',
            headerName: 'Dirección',
            width: 200
        },
        {
            field: 'telefono',
            headerName: 'Teléfono',
            width: 200
        },
        {
            field: 'expedicion',
            headerName: 'Expedición',
            width: 200
        },
        {
            field: 'numero_resolucion_fecha',
            headerName: 'No.Resolución y Fecha',
            width: 200
        },

    ]

    const columns_unidades = [
      {
        field: 'concepto',
        headerName: 'Concepto',
        width: 200
      },
      {
        field: 'capital',
        headerName: 'Capital',
        width: 200
      },
      {
        field: 'interes',
        headerName: 'Interes',
        width: 200
      },
      {
        field: 'descuento',
        headerName: 'Descuento',
        width: 200
      },
      {
        field: 'total',
        headerName: 'Total',
        width: 200
      },
    ]

    const organigram = [
        {
            id: 1,
            numero_factura: 'hola',
            fecha_facturacion: 21,
        },
        {
            id: 2,
            numero_factura: 'hola',
            fecha_facturacion: 21,
        },
        {
            id: 3,
            numero_factura: 'hola',
            fecha_facturacion: 21,
        },
        {
            id: 4,
            numero_factura: 'hola',
            fecha_facturacion: 21,
        },
        {
            id: 5,
            numero_factura: 'hola',
            fecha_facturacion: 21,
        },
    ]

    const unity_organigram = [
      {
        id: 1,
        concepto: 'Saldo Facilidad de Pago',
      },
      {
        id: 2,
        concepto: 'Documento de Cobro',
      },
      {
        id: 3,
        concepto: 'Total a Pagar',
      },
    ]

  return (
    <>
      <Grid
          container
          sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26',
          }}
      >
        <Grid item xs={12}>
          <Title title="LIQUIDACIÓN TUA"></Title>
          <Stack
            direction="row"
            spacing={2}
            sx={{ m: '20px 0' }}
            justifyContent='flex-end'
          >
            <Button
              variant="outlined"
            >
              Reporte general
            </Button>
          </Stack>
          <Grid item>
            <Box sx={{ width: '100%' }}>
              <DataGrid
                density="compact"
                autoHeight
                rows={organigram}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id}
              />
            </Box>
          </Grid>
          {/* <CrearOrganigramaDialogForm
            is_modal_active={crear_organigrama_is_active}
            set_is_modal_active={set_crear_organigrama_is_active}
          /> */}
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          mb: '20px',
          p: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >

        <Grid item xs={12}>
          <Box
            component="form"
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >

            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mb: '20px' }}
            >
              <Button color="primary" variant="outlined">
                Historico
              </Button>
            </Stack>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="outlined-error-helper-text"
                  label="NIT"
                  helperText='Escribe NIT'
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="outlined-error-helper-text"
                  label="Razon Social"
                  helperText='Escribe Razon Social'
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="outlined-error-helper-text"
                  label="Nombre y Apellidos"
                  helperText='Escribe Nombres y Apellidos'
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="outlined-error-helper-text"
                  label="Direccion"
                  helperText='Escribe Direccion'
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="outlined-error-helper-text"
                  label="Telefono"
                  helperText='Escribe Telefono'
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="outlined-error-helper-text"
                  label="Fecha Vencimiento"
                  helperText='Escribe Fecha Vencimiento'
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="outlined-error-helper-text"
                  label="Fecha Factura"
                  helperText='Escribe Fecha Factura'
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="outlined-error-helper-text"
                  label="Fecha Pago"
                  helperText='Escribe Fecha Pago'
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="outlined-error-helper-text"
                  label="Dias de Mora"
                  helperText='Escribe Dias Mora'
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ mb: '20px' }}
          >
            <Button color="primary" variant="outlined">
              Informacion Detallada
            </Button>
          </Stack>
          <Grid item>
            <Box sx={{ width: '100%' }}>
              <DataGrid
                density="compact"
                autoHeight
                rows={unity_organigram}
                columns={columns_unidades}
                pageSize={10}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id}
              />
            </Box>
          </Grid>
            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mb: '20px', paddingTop: '20px' }}
            >
              <Button color="primary" variant="outlined">
                Generar Intereses
              </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}
