/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/prop-types */
import { Handle, Position } from "reactflow";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../../../api/axios";
import './styles.css';

export const FlowNode = ({ data, isConnectable }) => {
  const [subetapas, setSubetapas] = useState([]);
  // const onChange = useCallback((evt) => {
  //   //  console.log('')(evt.target.value);
  // }, []);

  useEffect(() => {
    api.get(`recaudo/procesos/categoria-por-etapas/${data.id}`)
      .then((response) => {
        if (response.data.success) {
          setSubetapas(response.data.data);
        }
      })
      .catch((error) => {
        //  console.log('')(error);
      });
  }, []);

  return (
    <div className="custom-node-wrapper">
      <Handle type="target" position={Position.Top} id="top" isConnectable={isConnectable} />
      {/* <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} /> */}
      <div>
        <p><strong>Etapa:</strong> {data.etapa}</p>
        <p><strong>Descripción:</strong> {data.descripcion}</p>
        {subetapas.length > 0 && (<div className="subetapas">
          <h3>Subetapas:</h3>
          <ul>
            {subetapas && subetapas.map(subetapa => (
              <li key={subetapa.id}>{subetapa.categoria}</li>
            ))}
          </ul>
        </div>)}
      </div>
      <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={isConnectable} />
      {/* <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} /> */}
      <div className="link-wrapper">
        <Link to='../estados_proceso'>Editar etapa</Link>
      </div>
    </div>
  );
};