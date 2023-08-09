/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, type SelectChangeEvent, TextField, Typography, FormHelperText } from "@mui/material";
import type { Expediente, FormDetalleLiquidacion, FormLiquidacion } from "../../interfaces/liquidacion";
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from "react";
import { api } from "../../../../api/axios";
// import { api } from "../../../../api/axios";

interface IProps {
  form_liquidacion: FormLiquidacion;
  nombre_deudor: string;
  form_detalle_liquidacion: FormDetalleLiquidacion[];
  handle_input_form_liquidacion_change: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handle_select_form_liquidacion_change: (event: SelectChangeEvent) => void;
  handle_submit_liquidacion: () => void;
}

const periodos = [
  { id: 0, nombre: 'enero' },
  { id: 1, nombre: 'febrero' },
  { id: 2, nombre: 'marzo' },
  { id: 3, nombre: 'abril' },
  { id: 4, nombre: 'mayo' },
  { id: 5, nombre: 'junio' },
  { id: 6, nombre: 'julio' },
  { id: 7, nombre: 'agosto' },
  { id: 8, nombre: 'septiembre' },
  { id: 9, nombre: 'octubre' },
  { id: 10, nombre: 'noviembre' },
  { id: 11, nombre: 'diciembre' }
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GenerarLiquidacion: React.FC<IProps> = ({
  form_liquidacion,
  nombre_deudor,
  form_detalle_liquidacion,
  handle_input_form_liquidacion_change,
  handle_select_form_liquidacion_change,
  handle_submit_liquidacion
}: IProps) => {
  const [expedientes_deudor, set_expedientes_deudor] = useState<Expediente[]>([]);
  const [expediente_liquidado, set_expediente_liquidado] = useState(false);

  useEffect(() => {
    if (form_liquidacion.id_deudor) {
      api.get(`recaudo/liquidaciones/expedientes-deudor/get/${form_liquidacion.id_deudor}/`)
        .then((response) => {
          set_expedientes_deudor(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [form_liquidacion.id_deudor]);

  useEffect(() => {
    if (form_liquidacion.id_expediente) {
      api.get(`recaudo/liquidaciones/expedientes/${form_liquidacion.id_expediente}`)
        .then((response) => {
          set_expediente_liquidado(response.data.data.liquidado);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [form_liquidacion.id_expediente]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label='Deudor'
            value={nombre_deudor}
            size="small"
            fullWidth
            disabled
            onChange={handle_input_form_liquidacion_change}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl size="small" fullWidth>
            <InputLabel>Expediente</InputLabel>
            <Select
              label='Expediente'
              name="id_expediente"
              value={form_liquidacion.id_expediente}
              MenuProps={{
                style: {
                  maxHeight: 224,
                }
              }}
              onChange={handle_select_form_liquidacion_change}
            >
              {expedientes_deudor.map((expediente) => (
                <MenuItem key={expediente.id} value={expediente.id}>
                  {expediente.cod_expediente}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Seleccione el expediente</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            type="date"
            label='Fecha de liquidación'
            InputLabelProps={{ shrink: true }}
            helperText='Ingrese la fecha de liquidación'
            size="small"
            fullWidth
            name="fecha_liquidacion"
            value={form_liquidacion.fecha_liquidacion}
            onChange={handle_input_form_liquidacion_change}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            type="date"
            label='Fecha de vencimiento'
            InputLabelProps={{ shrink: true }}
            helperText='Ingrese la fecha de vencimiento'
            size="small"
            fullWidth
            name="vencimiento"
            value={form_liquidacion.vencimiento}
            onChange={handle_input_form_liquidacion_change}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl size="small" fullWidth>
            <InputLabel>Periodo</InputLabel>
            <Select
              label='Periodo'
              name="periodo_liquidacion"
              value={form_liquidacion.periodo_liquidacion}
              MenuProps={{
                style: {
                  maxHeight: 224,
                }
              }}
              onChange={handle_select_form_liquidacion_change}
            >
              {periodos.map((periodo) => (
                <MenuItem key={periodo.id} value={periodo.nombre}>
                  {periodo.nombre}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Seleccione el periodo</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          py: '20px'
        }}
      >
        <Typography color='black' variant="h4">Total de la obligacion</Typography>
        <Typography color='green' variant="h4" sx={{ textAlign: 'center' }}>${form_liquidacion.valor}</Typography>
      </Grid>

      <Grid container justifyContent={'center'}>
        <Grid item xs={12} sm={3}>
          {expediente_liquidado ?
            <Typography variant="h5" color={'green'} sx={{ textAlign: 'center' }}>Expediente ya liquidado</Typography> :
            <Button
              color="primary"
              variant="contained"
              startIcon={<SaveIcon />}
              fullWidth
              disabled={form_liquidacion.id_deudor === '' || form_liquidacion.id_expediente === '' || form_liquidacion.fecha_liquidacion === '' || form_liquidacion.vencimiento === '' || form_liquidacion.periodo_liquidacion === '' || form_detalle_liquidacion.length === 0}
              onClick={handle_submit_liquidacion}
            >
              Guardar nueva liquidación
            </Button>
          }
        </Grid>
      </Grid>
    </>
  )
}
