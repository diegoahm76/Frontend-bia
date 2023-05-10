import {
  Box,
  Grid,
  Stack,
  type SelectChangeEvent,
  Button
} from "@mui/material"
import { Title } from "../../../components"
import { useCallback, useEffect, useState } from 'react';
import { FlowChart } from '../components/flowChart/FlowChart';
import axios from "axios";
import { getLayoutedElements } from "../components/flowChart/LayoutedElements/getLayoutedElements";
import { AddFlujoProcesoModal } from "../components/flujoProcesos/modal/AddFlujoProcesoModal";
import type { Etapa } from "../interfaces/proceso";

interface Nodes {
  id: number;
  data: {
    nombre: string;
    fecha: string;
    descripcion: string;
  }
}

interface Edges {
  id: string;
  source: string;
  target: string;
}

interface Dataflow {
  nodes: Nodes[];
  edges: Edges[];
}

interface FormDataFlujo {
  id_etapa_origen: string;
  id_etapa_destino: string;
  fecha_flujo: string;
  descripcion: string;
  requisitos: string;
}

// const tipo_desde = [
//   { value: 'cobro_coactivo', label: 'Cobro Coactivo' },
//   { value: 'embargo', label: 'Embargo' },
//   { value: 'mandamiento_pago', label: 'Mandamiento de Pago' },
//   { value: 'remate', label: 'Remate' },
//   { value: 'cobro_persuasivo', label: 'Cobro persuasivo' },
// ]

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FlujoProcesosScreen: React.FC = () => {
  const [dataflow, set_dataflow] = useState<Dataflow>();
  const [etapas_proceso, set_etapas_proceso] = useState<Etapa[]>([]);
  const [form_data_flujo, set_form_data_flujo] = useState<FormDataFlujo>({
    id_etapa_origen: '',
    id_etapa_destino: '',
    fecha_flujo: '',
    descripcion: '',
    requisitos: '',
  });
  const [add_flujo_proceso, set_add_flujo_proceso] = useState<boolean>(false);
  const [is_submit, set_is_submit] = useState<boolean>(false);
  
  useEffect(() => {
    axios.get('http://macarenia.bitpointer.co/api/recaudo/procesos/grafica')
      .then((response) => {
        set_dataflow(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [is_submit]);

  useEffect(() => {
    axios.get('http://macarenia.bitpointer.co/api/recaudo/procesos/etapas/')
      .then((response) => {
        set_etapas_proceso(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  // const { nodes, edges } = getLayoutedElements(dataflow?.nodes, dataflow?.edges);
  const nodes_edges = useCallback(() => {
    const new_nodes = dataflow?.nodes.map((node) => ({
      id: node.id.toString(),
      data: node.data,
      type: 'infoFlujoNode',
      position: { x: 0, y: 0 },
    }));

    const new_edges = dataflow?.edges.map((edge) => ({
      id: edge.id.toString(),
      source: edge.source.toString(),
      target: edge.target.toString(),
      type: 'smoothstep',
      style: {
        stroke: 'black',
        strokeWidth: 2
      },
      markerEnd: {
        type: 'arrowclosed',
        color: 'black',
      }
    }));

    return getLayoutedElements(new_nodes, new_edges);
  }, [dataflow]);

  const handle_input_change = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    set_form_data_flujo(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handle_select_change: (event: SelectChangeEvent) => void = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    set_form_data_flujo(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handle_submit = (): void => {
    axios.post('http://macarenia.bitpointer.co/api/recaudo/procesos/flujos/', {
      ...form_data_flujo
    })
      .then((response) => {
        console.log(response);
        set_is_submit(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        set_is_submit(false);
      });
  };

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
          <Title title="Flujo de Procesos"></Title>
          <Box
            component='form'
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <Grid
              container
              sx={{
                width: 1/1,
                height: 600,
                marginTop: 2,
                marginBottom: 2
              }}
            >
              {/* AQUI ES DONDE ESTARIA EL FLUJO DE PROCESO */}
              <FlowChart initialNodes={nodes_edges().nodes} initialEdges={nodes_edges().edges} />
            </Grid>
            <Grid container spacing={0} justifyContent={"space-between"}>
              <Stack
                justifyContent="flex-end"
              >
                <Button
                  color="success"
                  variant="contained"
                  onClick={() => {
                    set_add_flujo_proceso(true);
                  }}
                >
                  Agregar nuevo flujo
                </Button>
              </Stack>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <AddFlujoProcesoModal
        is_modal_active={add_flujo_proceso}
        set_is_modal_active={set_add_flujo_proceso}
        etapas_proceso={etapas_proceso}
        form_data_flujo={form_data_flujo}
        handle_input_change={handle_input_change}
        handle_select_change={handle_select_change}
        handle_submit={handle_submit}
      />
    </>
  )
}
