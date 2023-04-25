/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/prop-types */
import { useCallback, useEffect } from 'react';
import ReactFlow, { Background, Controls, MiniMap, addEdge, useEdgesState, useNodesState } from 'reactflow';
import { FlowNode } from './CustomNode/FlowNode';
import 'reactflow/dist/style.css';

// Nodos son los cuadros rectangulares, con coordenadas X y Y.
// const initialNodes = [
//   { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
//   { id: '2', position: { x: 150, y: 100 }, data: { label: '2' } },
// ];

// Edges son las líneas que conectan los nodos.
// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

// Este componente será la cuadrícula del diagrama de flujo de datos.
export const FlowChart = ({ dataflow }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    setNodes(dataflow?.nodes.map((node, index) => {
      return {
        ...node,
        type: 'infoNode',
        position: {x: (index * 270), y: (index * 200)}
      }
    }));
    setEdges(dataflow?.edges.map((edge) => {
      return {
        ...edge,
        style: {
          stroke: 'black',
        }
      }
    }));
  }, [dataflow]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={{infoNode: FlowNode}}
      style={{ border: '1px solid #181818' }}
      fitView
    >
      <Controls />
      <MiniMap />
      <Background variant='dots' gap={12} size={1} />
    </ReactFlow>
  );
};