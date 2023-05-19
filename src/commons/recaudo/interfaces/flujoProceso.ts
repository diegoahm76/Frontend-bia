export interface Nodes {
  id: number;
  data: {
    etapa: string;
    descripcion: string;
  }
}

export interface Edges {
  id: string;
  source: string;
  target: string;
  data: {
    fecha_flujo: string;
    descripcion: string;
    requisitos: string;
  };
}

export interface Dataflow {
  nodes: Nodes[];
  edges: Edges[];
}

export interface FormDataFlujo {
  id_etapa_origen: string;
  id_etapa_destino: string;
  fecha_flujo: string;
  descripcion: string;
  requisitos: string;
}