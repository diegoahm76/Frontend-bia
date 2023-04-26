import { Title } from '../../../../components/Title';
import { InputsEncabezado } from '../componentes/InputsEncabezado';
import { TablaObligacionesSolicitud } from '../componentes/TablaObligacionesSolicitud';
import { PersonaNatural, PersonaJuridica, DeudorSolidario } from '../componentes/CasoPersona';
import { Grid, Box, FormControl, InputLabel, Select, MenuItem, TextField, TextareaAutosize, Stack, Button, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import { useState } from 'react';

interface event {
  target: {
    value: string;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SolicitudFacilidadPago: React.FC = () => {
  const [persona, set_persona] = useState('')
  const rows = [
    {
      id: '1',
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
    { field: "id", header: "ID", visible: false },
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
      <Title title='Solicitud de Facilidad de Pago - Usuario Externo' />
      <InputsEncabezado />
      <TablaObligacionesSolicitud
        showButtonExport
        tittle={'Solicitud de Facilidad de Pago - Usuario Externo: '}
        columns={columns}
        rowsData={rows}
        staticscroll={true}
        stylescroll={"780px"}
      />
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          mb: '20px',
          mt: '20px',
          p: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >

        <Grid item xs={16}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={10}>
              <Grid item xs={11} sm={3} >
                <TextField
                  size="small"
                  sx={{ width: '300px' }}
                  fullWidth
                  helperText='Cargar Documento Solicitud'
                  variant="outlined"
                  type="file"
                />
              </Grid>
              <Grid item xs={11} sm={3} >
                <TextField
                  size="small"
                  sx={{ width: '300px' }}
                  fullWidth
                  helperText="Cargar Soporte Consignación"
                  variant="outlined"
                  type="file"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
              <FormControl size='small' sx={{ width: '300px' }}>
                <InputLabel id="demo-simple-select-label">Calidad en que actúa la persona</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Calidad en que actúa la persona"
                  onChange={(event: event) => {
                    const { value } = event.target
                    if(value === 'Natural') {
                      set_persona('1')
                    }
                    if(value === 'Juridica') {
                      set_persona('2')
                    }
                    if(value === 'DeudorSolidario') {
                      set_persona('3')
                    }
                  }}
                >
                  <MenuItem value='Natural'>Persona Natural</MenuItem>
                  <MenuItem value='Juridica'>Persona Juridica / Apoderado</MenuItem>
                  <MenuItem value='DeudorSolidario'>Deudor Solidario</MenuItem>
                </Select>
              </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {
        persona === '1' ? (<PersonaNatural />) : persona === '2' ? (<PersonaJuridica />) : persona === '3' ? (<DeudorSolidario />) : null
      }
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          mb: '20px',
          mt: '20px',
          p: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">Periodicidad y Modalidad</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Periodicidad y Modalidad"
                  >
                    <MenuItem>Ej 1</MenuItem>
                    <MenuItem>Ej 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">Plazo</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Plazo"
                  >
                    <MenuItem>Ej 1</MenuItem>
                    <MenuItem>Ej 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3} direction="row" rowSpacing={2}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">Garantías Ofrecidas</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Garantías Ofrecidas"
                  >
                    <MenuItem>Ej 1</MenuItem>
                    <MenuItem>Ej 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  size="small"
                  fullWidth
                  helperText='Carga Garantías Ofrecidas'
                  variant="outlined"
                  type="file"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  size="small"
                  fullWidth
                  helperText='Carga Documento No Enajenación'
                  variant="outlined"
                  type="file"
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid
      container
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        mb: '20px',
        mt: '20px',
        p: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <h3>Relación de bienes</h3>
      <Grid item xs={12}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3} >
              <TextField
                size="small"
                fullWidth
                label='Identificación'
                helperText='Escribe Documento de Identidad'
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="outlined-error-helper-text"
                label="Avalúo"
                helperText='Escribe el Avalúo'
                size="small"
                fullWidth
                type='number'
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="outlined-error-helper-text"
                label="Dirección"
                helperText='Escribe la Dirección'
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="outlined-error-helper-text"
                helperText='Carga el Documento Impuesto'
                size="small"
                fullWidth
                type='file'
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                color='info'
                variant='outlined'
                size='small'
                onClick={() => {}}
              >
                Agregar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          mb: '20px',
          mt: '20px',
          p: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          width='350px'
        >
          <p>Observación</p>
          <TextareaAutosize minRows={8} cols={153} />
        </Box>
      </Grid>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: '20px', mt: '20px' }}
      >
        <FormGroup>
          <FormControlLabel required control={<Checkbox />} label="Aceptar términos y condiciones" />
          <FormControlLabel required control={<Checkbox />} label="Autorizar notificación por correo electrónico" />
        </FormGroup>
        <Button
          color='info'
          variant='contained'
          onClick={() => {}}
        >
        Enviar Solicitud
        </Button>
      </Stack>
    </>
  )
}
