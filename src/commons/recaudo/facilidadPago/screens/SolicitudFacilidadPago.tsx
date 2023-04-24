import { Title } from '../../../../components/Title';
import { InputsEncabezado } from '../componentes/InputsEncabezado';
import { TablaObligacionesSolicitud } from '../componentes/TablaObligacionesSolicitud';
import { PersonaNatural, PersonaJuridica, DeudorSolidario } from '../componentes/CasoPersona';
import { Grid, Box, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
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
              <input
                required
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-button-solicitud"
                type="file"
              />
              <label htmlFor="upload-button-solicitud">
                <Button
                  variant="outlined"
                  component="span"
                >
                  Cargar Documento Solicitud
                </Button>
              </label>
              </Grid>
              <Grid item xs={12} sm={3}>
              <input
                required
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-button-consignacion"
                type="file"
              />
              <label htmlFor="upload-button-consignacion">
                <Button
                  variant="outlined"
                  component="span"
                >
                  Cargar Soporte Consignación
                </Button>
              </label>
              </Grid>
              <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
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
    </>
  )
}
