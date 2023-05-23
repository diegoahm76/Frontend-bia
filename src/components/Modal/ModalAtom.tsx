/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { Parser } from '../../utils/parser/parser';
import type { ModalProps } from './types';
import './Modal.css';
import { ModalContent } from './Content/ModalContent';
import { Button } from 'primereact/button';

export const ModalAtom: React.FC<ModalProps> = ({
  data: { show, id },
  arrayToRender,
  set_modal
}: ModalProps) => {
  if (!show) {
    return null;
  }

  const findById = <T extends { id: number }>(
    array: T[],
    id: number,
    selector: (item: T) => boolean
  ) => {
    return array.find(selector);
  };

  const selectedModal = findById(
    arrayToRender,
    id,
    (modal) => modal.id_auditoria === id
  );

  const { parse } = new Parser();
  const { keys, values } = parse(selectedModal?.descripcion);
  const { keys: keys2, values: values2 } = parse(
    selectedModal?.valores_actualizados
  );

  return (
    <div className={`modal ${selectedModal != null ? 'show' : ''}`}>
      {selectedModal != null && (
        <div className="modal-content">
          {values !== false && keys !== false && (
            <ModalContent keys={keys} values={values} />
          )}
          {values2 !== false && keys2 !== false && (
            <details>
              <summary>Valores Actualizados</summary>
              <ModalContent keys={keys2} values={values2} />
            </details>
          )}
          <div className="modal-footer">
            <Button
              type="button"
              icon="pi pi-times"
              onClick={() => {
                set_modal({ show: false, id: 0 });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
