import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";
import SeleccionarPersonaDatos from "../../../components/partials/SeleccionarPersonaDatos";
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ActualizacionDatosRestringidosScreen: React.FC = () => {
  const tiposdoc_n = [
    {
      value: 'CC',
      label: 'Cédula de ciudadanía'
    },
    {
      value: 'CE',
      label: 'Cédula extranjería',
    },
    {
      value: 'TI',
      label: 'Tarjeta de identidad',
    },
    {
      value: 'RC',
      label: 'Registro civil',
    },
    {
      value: 'NU',
      label: 'NUIP'
    },
    {
      value: 'PA',
      label: 'Pasaporte',
    },
    {
      value: 'PE',
      label: 'Permiso especial de permanencia',
    },
  ];
  const tiposdoc_j = [
    {
      value: 'NT',
      label: 'NIT',
    },
  ];
  const tipo_persona = [
    {
      value: 'N',
      label: 'Natural'
    },
    {
      value: 'J',
      label: 'Juridica',
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
        <Box>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Tipo de persona"
                select
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
              >
                {tipo_persona.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Tipo de Identificación"
                select
                fullWidth
                size="small"
                margin="dense"
                disabled={true}
                autoFocus
              >
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Número Identificación"
                type="number"
                fullWidth
                size="small"
                margin="dense"
                disabled={true}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button variant="contained" color="primary" type="submit">
                Buscar
              </Button>
            </Grid>
          </Grid>
        </Box>
        
      </Grid>
      <SeleccionarPersonaDatos />
    </>
  );
}

