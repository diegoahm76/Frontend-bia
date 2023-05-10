/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/prop-types */
import { Handle, Position } from "reactflow";
import './styles.css';

export const FlowNode = ({ data, isConnectable }) => {
  // const onChange = useCallback((evt) => {
  //   console.log(evt.target.value);
  // }, []);

  return (
    <div className="custom-node-wrapper">
      <Handle type="target" position={Position.Top} id="top" isConnectable={isConnectable} />
      {/* <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} /> */}
      <div>
        <p>{data.nombre}</p>
        <p>{data.fecha}</p>
        <p>{data.descripcion}</p>
      </div>
      <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={isConnectable} />
      {/* <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} /> */}
    </div>
  );
};