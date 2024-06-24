/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'leaflet/dist/leaflet.css';
import { 
  useEffect,
  useState,
} from 'react';
import { SearchOutlined } from '@mui/icons-material';

import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import {
    Button,
    Grid,
  Dialog,
  TextField,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { api } from '../../../../api/axios';
import { RenderDataGrid } from '../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import { miEstilo } from '../../Seguimientopoai/interface/types';
import { Title } from '../../../../components';
export interface BuscarProps { 
    is_modal_active: any;
    set_is_modal_active: any;
  }
  export interface Historico {
    descripcion: any;
    nombre: any;
    nivel: any;
    valor: any;
    año: any;
  }
// export const Resultados: React.FC = () => {
export const Busquedaobjetivos: React.FC<BuscarProps> = ({
  
  is_modal_active,
  set_is_modal_active,

}) => {
  const [Historico, setHistorico] = useState<Historico[]>([]);
  const fetchHistorico = async (): Promise<void> => {
    try {
      const url = '/recaudo/configuracion_baisca/administracionpersonal/';
      const res = await api.get(url);
      const HistoricoData: Historico[] = res.data?.data || [];
      setHistorico(HistoricoData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void fetchHistorico();
  }, []);
  const columns = [
    { field: 'nivel', headerName: 'Nombre de concepto ', flex: 1 },
    { field: 'nombre', headerName: 'Valor inicial', flex: 1 },
    {
      field: 'valor',
      headerName: 'Responsable',

      flex: 1,
      renderCell: (params: any) => {
        // Formatear el valor a pesos colombianos
        const valorFormateado = new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0, // Ajusta según la precisión deseada
        }).format(params.value);

        return <>{valorFormateado}</>;
      },
    },
    { field: 'descripcion', headerName: 'Movilidad de contratación', flex: 1 },
    {
      field: 'Acciones',
      headerName: 'Acciones',

      flex: 1,
      renderCell: () => (
        <>
          <IconButton color="primary" aria-label="Ver" onClick={handle_close}>
            <PlaylistAddCheckIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handle_close = (): void => {
    set_is_modal_active(false);
  
  };
 
  return (
    <>
      <Dialog
        open={is_modal_active}
        onClose={handle_close}
        fullWidth={true}
        maxWidth="lg"
      >
        <Grid
        container
        item
        xs={12}
        marginLeft={2}
        marginRight={2}
        marginTop={3}
        spacing={2}
        sx={miEstilo}
      >
        <Grid item xs={12} sm={12}>
          <Title title="Buesqueda de objetivos " />
        </Grid>

        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Nombre de plan"
            name="descripcion"
            // value={formData.descripcion}
            // onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Nombre de objetivo"
            name="descripcion"
            // value={formData.descripcion}
            // onChange={handleInputChange}
          />
        </Grid>

        <Grid item>
          <Button startIcon={<SearchOutlined />} variant="contained" fullWidth>
            Buscar
          </Button>
        </Grid>
      </Grid>

        <RenderDataGrid
          title="Buesqueda de objetivos"
          columns={columns ?? []}
          rows={Historico ?? []}
        />
      </Dialog>
    </>
  );
};
