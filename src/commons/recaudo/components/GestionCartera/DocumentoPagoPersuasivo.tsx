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
  InputLabel
} from "@mui/material"
import { Close, Save, CloudUpload } from '@mui/icons-material';
import type { FlujoProceso } from "../../interfaces/flujoProceso";
import { type Dispatch, type SetStateAction } from "react";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import SaveIcon from '@mui/icons-material/Save';
import type { AtributoEtapa } from "../../interfaces/proceso";
import { Title } from "../../../../components/Title";


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
export const DocumentoPagoPersuasivo: React.FC = ({
  // id_flujo_destino,
  // selected_proceso,
  // flujos_destino,
  // id_proceso,
  // id_cartera,
  // id_subetapa_destino,
  // subetapas,
  // handle_select_change,
  // set_open_requisitos_modal,
  // set_open_create_proceso_modal,
  // mover_subetapa_actual,
  // datos
}) => {


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
        <Title title="Crear Resolución de Respuesta - Usuario Cormacarena"></Title>
        <Typography variant="h6" mt={4} mb={1}>Datos de encabezado</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              size="small"
              name="documento"
              label="Documento"
              helperText="Documento"
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              size="small"
              name="nombreDeudor"
              label="Nombre deudor"
              helperText="Nombre deudor"
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              size="small"
              name="nombreFacilidadPago"
              label="Nombre facilidad pago"
              helperText="Nombre facilidad pago"
              disabled
            />
          </Grid>
        </Grid>
        <Typography variant="h6" mt={5} mb={1}>Crear Documento</Typography>
        <Button
          variant="outlined"
          fullWidth
          size='medium'
          component="label"
          startIcon={<CloudUpload />}
        >
          CARGAR RESOLUCIÓN
          {/* {name_multiple_files.length !== 0 ?
            name_multiple_files.map((name: string, index: number) => (`${index + 1}. ${name} `))
            : 'Anexos y Pruebas'} */}
            <input
              hidden
              type="file"
              multiple
              required
              autoFocus
              style={{ opacity: 0 }}
              name="anexos"
              // onChange={handle_change_multiple_files}
            />
        </Button>
      </Grid>
    </>
  )
}
