/* eslint-disable @typescript-eslint/naming-convention */
/* import type React from 'react';
import type { ModalProps } from './types'; */

import { Parser } from "../../utils/parser/parser";


export const ModalAtom = (props: any): any => {
  /* console.log(props); */
  const { arrayToRender, set_modal } = props;
  const { show, id } = props.data;
console.log(arrayToRender)
  if (show === false) {
    return null;
  }

  const selectedModal = arrayToRender.find((modal: any) => modal.id_auditoria === id);
  console.log(selectedModal)


  const parser = new Parser();
  const obj = parser.parse(selectedModal?.descripcion);
  console.log(obj);


  return (
    <div className={`modal ${selectedModal != null ? 'show' : ''}`}>
      {selectedModal != null && selectedModal != null && (
        <div className="modal-content">
          <div className="modal-header">
            <h2>{selectedModal.nombre_modulo}</h2>
          </div>
          <p className="modal-body">{selectedModal.nombre_permiso}</p>
          {/* <p className="modal-body">{selectedModal.descripcion}</p> */}
          <div className="modal-footer">
            <button className="close-button" onClick={() => set_modal(false)}>
              Close Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

