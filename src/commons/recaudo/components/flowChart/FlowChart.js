/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/prop-types */
import { useCallback, useEffect } from 'react';
import ReactFlow, { Background, ConnectionLineType, Controls, MiniMap, addEdge, useEdgesState, useNodesState } from 'reactflow';
import { FlowNode } from './CustomNode/FlowNode';
import { getLayoutedElements } from './LayoutedElements/getLayoutedElements';
import 'reactflow/dist/style.css';
import './styles.css';

// Nodos son los cuadros rectangulares, con coordenadas X y Y.
// const initialNodes = [
//   { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
//   { id: '2', position: { x: 150, y: 100 }, data: { label: '2' } },
// ];

// Edges son las líneas que conectan los nodos.
// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

// Este componente será la cuadrícula del diagrama de flujo de datos.

const nodeTypes = { infoFlujoNode: FlowNode };

export const FlowChart = ({ initialNodes, initialEdges }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep }, eds)
      ),
    []
  );

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction
      );

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      connectionLineType={ConnectionLineType.SmoothStep}
      nodeTypes={nodeTypes}
      style={{ border: '1px solid #181818' }}
      fitView
    >
      <Controls />
      <MiniMap />
      <Background variant='dots' gap={12} size={1} />
      <div className="verhor-controls">
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
      </div>
    </ReactFlow>
  );
};