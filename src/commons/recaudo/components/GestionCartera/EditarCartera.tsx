import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent,
  Stack,
  InputLabel
} from "@mui/material"
import type { EtapaProceso } from "../../interfaces/proceso";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

interface IProps {
  etapas_destino: EtapaProceso[];
  etapa_destino: string;
  handle_select_change: (event: SelectChangeEvent) => void;
  mover_estado_actual: () => void;
  selected_proceso: {
    fecha_facturacion: string;
    numero_factura: string;
    codigo_contable: string;
    monto_inicial: string;
    dias_mora: string;
    valor_intereses: string;
    valor_sancion: string;
    etapa: string;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarCartera: React.FC<IProps> = ({
  etapas_destino,
  etapa_destino,
  handle_select_change,
  mover_estado_actual,
  selected_proceso
}: IProps) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid item xs={12}>
            <Stack
              direction='row'
              justifyContent="center"
              alignItems="center"
              sx={{ my: '10px' }}
            >
              <Grid item xs={3}>
                <Typography>Fecha facturación</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={selected_proceso.fecha_facturacion}
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#494949",
                    }
                  }}
                  disabled
                />
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction='row'
              justifyContent="center"
              alignItems="center"
              sx={{ my: '10px' }}
            >
              <Grid item xs={3}>
                <Typography>Número factura</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={selected_proceso.numero_factura}
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#494949",
                    }
                  }}
                  disabled
                />
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction='row'
              justifyContent="center"
              alignItems="center"
              sx={{ my: '10px' }}
            >
              <Grid item xs={3}>
                <Typography>Código contable</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={selected_proceso.codigo_contable}
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#494949",
                    }
                  }}
                  disabled
                />
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction='row'
              justifyContent="center"
              alignItems="center"
              sx={{ my: '10px' }}
            >
              <Grid item xs={3}>
                <Typography>Estado actual</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={selected_proceso.etapa}
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#494949",
                    }
                  }}
                  disabled
                />
              </Grid>
            </Stack>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={12}>
            <Stack
              direction='row'
              justifyContent="center"
              alignItems="center"
              sx={{ my: '10px' }}
            >
              <Grid item xs={3}>
                <Typography>Monto inicial</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={selected_proceso.monto_inicial}
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#494949",
                    }
                  }}
                  disabled
                />
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction='row'
              justifyContent="center"
              alignItems="center"
              sx={{ my: '10px' }}
            >
              <Grid item xs={3}>
                <Typography>Días de mora</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={selected_proceso.dias_mora}
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#494949",
                    }
                  }}
                  disabled
                />
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction='row'
              justifyContent="center"
              alignItems="center"
              sx={{ my: '10px' }}
            >
              <Grid item xs={3}>
                <Typography>Valor intereses</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={selected_proceso.valor_intereses}
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#494949",
                    }
                  }}
                  disabled
                />
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction='row'
              justifyContent="center"
              alignItems="center"
              sx={{ my: '10px' }}
            >
              <Grid item xs={3}>
                <Typography>Valor sanción</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  value={selected_proceso.valor_sancion}
                  size="small"
                  fullWidth
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#494949",
                    }
                  }}
                  disabled
                />
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ my: '30px' }}>
        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
          spacing={2}
        >
          <Grid item xs={12} sm={3}>
            <FormControl size='small' fullWidth>
              <InputLabel>Mover a</InputLabel>
              <Select
                label='Mover a'
                value={etapa_destino}
                onChange={handle_select_change}
              >
                {etapas_destino.map(({ id, etapa }) => (
                  <MenuItem key={id} value={id}>
                    {etapa}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              color='primary'
              variant='contained'
              startIcon={<ChangeCircleIcon />}
              fullWidth
              onClick={mover_estado_actual}
              disabled={!etapa_destino}
            >
              Mover estado actual
            </Button>
          </Grid>
        </Stack>
      </Grid>
      <Grid item xs={12} sx={{ my: '30px' }}>
        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
        >
          <Grid item xs={12} sm={2}>
            <Typography variant="h4">Saldo total</Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography color='green' variant="h4">
              $ {
                (Number(selected_proceso.monto_inicial) +
                  Number(selected_proceso.valor_intereses) +
                  Number(selected_proceso.valor_sancion)).toFixed(2)
              }
            </Typography>
          </Grid>
        </Stack>
      </Grid>
    </>
  )
}
