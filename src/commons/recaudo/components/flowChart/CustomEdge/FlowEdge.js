/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/prop-types */
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from "reactflow";

export const FlowEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style,
  markerEnd,
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            background: '#ffcc00',
            padding: 10,
            fontSize: 12,
            fontWeight: 700,
            border: '1px solid black',
            borderRadius: 5,
          }}
        >
          <p>Fecha: {data.fecha_flujo}</p>
          <p>Descripción: {data.descripcion}</p>
          <p>Requisitos: {data.requisitos}</p>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};