import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  type SelectChangeEvent,
  Button
} from "@mui/material"
import { Title } from "../../../components"
import { useState } from 'react';


const tipo_desde = [
  { value: 'cobro_coactivo', label: 'Cobro Coactivo' },
  { value: 'embargo', label: 'Embargo' },
  { value: 'mandamiento_pago', label: 'Mandamiento de Pago' },
  { value: 'remate', label: 'Remate' },
  { value: 'cobro_persuasivo', label: 'Cobro persuasivo' },
]

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FlujoProcesosScreen:React.FC = () => {

  const [tipo, set_tipo] = useState("");

  const handle_change:(event:SelectChangeEvent) => void = (event: SelectChangeEvent) => {
      set_tipo(event.target.value);
  }


  const [tipo_hasta, set_tipo_hasta] = useState("");

  const handle_change_hasta:(event:SelectChangeEvent) => void = (event: SelectChangeEvent) => {
      set_tipo_hasta(event.target.value);
  }

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
          boxShadow: '0px 3px 6px #042F4A26'
        }}
      >
        <Grid item xs={12}>
          <Title title="Flujo Proceso"></Title>
            <Box
              component='form'
              sx={{ mt: '20px' }}
              noValidate
              autoComplete="off"
            >
              <Grid 
                container
                sx={{
                  pt: '480px'
                }}
              >
                {/* AQUI ES DONDE ESTARIA EL FLUJO DE PROCESO */}
              </Grid>
              <Grid container spacing={1} justifyContent={"space-between"}>

                <Grid item xs={12} sm={4}>
                  <FormControl size='small' fullWidth>
                      <InputLabel>Desde</InputLabel>
                      <Select
                          label='Desde'
                          value={tipo}
                          onChange={handle_change}
                      >
                          { tipo_desde.map(({value, label}) => (
                              <MenuItem key={value} value={value}>
                                  {label}
                              </MenuItem>
                          ))}
                      </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl size='small' fullWidth>
                      <InputLabel>Hasta</InputLabel>
                      <Select
                          label='Hasta'
                          value={tipo_hasta}
                          onChange={handle_change_hasta}
                      >
                          { tipo_desde.map(({value, label}) => (
                              <MenuItem key={value} value={value}>
                                  {label}
                              </MenuItem>
                          ))}
                      </Select>
                  </FormControl>
                </Grid>
                  <Stack
                    justifyContent="flex-end"
                  >
                    <Button
                      color="success"
                      variant="contained"
                    >
                      Agregar
                    </Button>
                  </Stack>
              </Grid>
            </Box>
        </Grid>
      </Grid>
    </>
  )
}
