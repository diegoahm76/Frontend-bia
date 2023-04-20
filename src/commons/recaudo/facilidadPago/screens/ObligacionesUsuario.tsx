import { Title } from '../../../../components/Title';
import { TablaGeneral } from '../../../../components/TablaGeneral';
import { Grid, Box, TextField, Button, Stack, Checkbox } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ObligacionesUsuario: React.FC = () => {

  const rows = [
    {
      id: '1',
      solicitarFacPago: <Checkbox />,
      nombreObligacion: 'Permiso 1',
      fechaInicio: '01/01/2015',
      expediente: '378765',
      nroResolucion: '378765-143',
      valorCapital: 120000000,
      valorIntereses: 35000000,
      diasMora: 390,
      valorAbonado: 21000000,
      estado: 'En Curso'
    },
    {
      id: '2',
      solicitarFacPago: <Checkbox />,
      nombreObligacion: 'Concesion Aguas',
      fechaInicio: '01/04/2015',
      expediente: '3342765',
      nroResolucion: '3342765-4546',
      valorCapital: 190700000,
      valorIntereses: 45000000,
      diasMora: 180,
      valorAbonado: 76000000,
      estado: 'En Curso'
    },
  ];

  const columns = [
    { field: "solicitarFacPago", header: "[Solicitar Fac. Pago]", visible: true },
    { field: "nombreObligacion", header: "Nombre Obligación", visible: true },
    { field: "fechaInicio", header: "Fecha Inicio", visible: true },
    { field: "expediente", header: "Expediente", visible: true },
    { field: "nroResolucion", header: "Nro. Resolución", visible: true },
    { field: "valorCapital", header: "Valor Capital $", visible: true },
    { field: "valorIntereses", header: "Valor Intereses $", visible: true },
    { field: "diasMora", header: "Días Mora", visible: true },
    { field: "valorAbonado", header: "Valor Abonado", visible: true },
    { field: "estado", header: "Estado", visible: true },
  ];

  return (
    <>
      <Title title='Listado de Obligaciones del usuario'/>
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="outlined-error-helper-text"
                  label="Nombres"
                  helperText='Escribe Nombre y Apellido'
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="outlined-error-helper-text"
                  label="Identificación"
                  helperText='Escribe Número de Identificación'
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="outlined-error-helper-text"
                  label="Correo Electrónico"
                  helperText='Escribe Correo Electrónico'
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <p>Sus obligaciones pendientes por pago son las siguientes:</p>
      <TablaGeneral
        showButtonExport
        tittle={'Sus obligaciones pendientes por pago son las siguientes:'}
        columns={columns}
        rowsData={rows}
        staticscroll={true}
        stylescroll={"780px"}
      />
      <Stack
        direction="row"
        justifyContent="right"
        spacing={10}
        sx={{ mb: '20px', marginTop: '30px' }}
      >
        <h3>Total</h3>
        <Stack
        direction="column"
        justifyContent="center"
        spacing={1}
        sx={{ mb: '20px' }}
        >
          <h3>Capital</h3>
          <p>{130000}</p>
        </Stack>
        <Stack
        direction="column"
        justifyContent="center"
        spacing={1}
        sx={{ mb: '20px' }}
        >
          <h3>Intereses</h3>
          <p>{130000}</p>
        </Stack>
        <Stack
        direction="column"
        justifyContent="center"
        spacing={1}
        sx={{ mb: '20px' }}
        >
          <h3>Abonado</h3>
          <p>{130000}</p>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent="right"
        spacing={2}
        sx={{ mb: '20px' }}
      >
        <Button
          color='info'
          variant='contained'
          sx={{ marginTop: '30px' }}
        >
        Crear Facilidad de Pago
        </Button>
      </Stack>
    </>
  )
}
