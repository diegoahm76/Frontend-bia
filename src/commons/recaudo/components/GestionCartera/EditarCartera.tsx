/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
  InputLabel,
  Box,
  Tab
} from "@mui/material"
import type { FlujoProceso } from "../../interfaces/flujoProceso";
import { type Dispatch, type SetStateAction } from "react";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import SaveIcon from '@mui/icons-material/Save';
import type { AtributoEtapa, CategoriaAtributo } from "../../interfaces/proceso";


interface IProps {
  id_flujo_destino: string;
  selected_proceso: {
    fecha_facturacion: string;
    numero_factura: string;
    codigo_contable: string;
    monto_inicial: string;
    dias_mora: string;
    valor_intereses: string;
    valor_sancion: string;
    etapa: string;

  },
  flujos_destino: FlujoProceso[];
  // categorias: CategoriaAtributo[];
  id_proceso: string;
  id_cartera: string;
  id_subetapa_destino: string;
  subetapas: AtributoEtapa[];
  handle_select_change: (event: SelectChangeEvent) => void;
  set_open_requisitos_modal: Dispatch<SetStateAction<boolean>>;
  set_open_create_proceso_modal: Dispatch<SetStateAction<boolean>>;
  mover_subetapa_actual: () => void;
  datos: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarCartera: React.FC<IProps> = ({
  id_flujo_destino,
  selected_proceso,
  flujos_destino,
  id_proceso,
  id_cartera,
  id_subetapa_destino,
  subetapas,
  handle_select_change,
  set_open_requisitos_modal,
  set_open_create_proceso_modal,
  mover_subetapa_actual,
  datos
}: IProps) => {

  // console.log("subetapas", subetapas)
  return (
    <>
      <Grid container spacing={2}>


        <Grid item xs={12} sm={4}>
          <TextField
            disabled
            fullWidth
            size="small"
            name="Nombre"
            label="Nombre"
            helperText="Nombre"
            value={datos.nombre}
            />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            disabled
            fullWidth
            size="small"
            name="Fecha inicio de mora"
            label="Fecha inicio de moran"
            value={datos.fecha_facturacion}
            helperText='Fecha inicio de mora'
             />
        </Grid>


        <Grid item xs={12} sm={4}>
          <TextField
            label="Número factura"
            helperText="Número factura"
            size="small"
            fullWidth
            name=" Número factura "
            value={datos.numero_factura}
            disabled />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label=" Código contable  "
            helperText=" Código contable  "
            size="small"
            fullWidth
            name=" Código contable"
            value={datos.codigo_contable}
            disabled />
        </Grid>





        <Grid item xs={12} sm={4}>
          <TextField
            label=" Estado actual "
            helperText="Estado actual  "
            size="small"
            fullWidth
            name="Estado actual"
            value={datos.etapa}
            disabled />
        </Grid>


        <Grid item xs={12} sm={4}>
          <TextField
            label=" Días de mora "
            helperText=" Días de mora  "
            size="small"
            fullWidth
            name="Días de mora"
            value={datos.dias_mora}
            disabled />
        </Grid>



        <Grid item xs={12} sm={4}>
          <TextField
            label=" Monto inicial"
            helperText="  Monto inicial "
            size="small"
            fullWidth
            name=" Monto inicial"
            value={datos.monto_inicial}
            disabled />
        </Grid>



        <Grid item xs={12} sm={4}>
          <TextField
            label=" Valor intereses"
            helperText="  Valor intereses "
            size="small"
            fullWidth
            name=" Valor intereses"
            value={datos.valor_intereses}
            disabled />
        </Grid>




        <Grid item xs={12} sm={4}>
          <TextField
            label=" Valor sanción"
            helperText="  Valor sanción "
            size="small"
            fullWidth
            name=" Valor sanción"
            value={datos.valor_sancion}
            disabled />
        </Grid>










        <Grid item xs={6}>
          <Grid item xs={12}>
            {/* <Stack
              direction='row'
              justifyContent="center"
              alignItems="center"
              sx={{ my: '10px' }}
            >
              {datos.fecha_facturacion}
              {/* <Grid item xs={3}>
                <Typography>Fecha inicio de mora</Typography>
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
              </Grid> */}
            {/* </Stack>  */}



          </Grid>
          {/* <Grid item xs={12}>
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
          </Grid> */}



          {/*
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
          </Grid> */}



          {/* <Grid item xs={12}>
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
          </Grid> */}
        </Grid>
        <Grid item xs={6}>
          {/* <Grid item xs={12}>
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
          </Grid> */}
          {/* <Grid item xs={12}>
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
          </Grid> */}
          {/* <Grid item xs={12}>
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
          </Grid> */}
          {/* <Grid item xs={12}>
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
          </Grid> */}
        </Grid>
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
