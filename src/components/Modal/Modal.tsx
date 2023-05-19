/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { Parser } from '../../utils/parser/parser';
import type { ModalProps } from './types';
import { Typography } from '@mui/material';
import './Modal.css';

export const ModalAtom: React.FC<ModalProps> = ({
  data: { show, id },
  arrayToRender,
  set_modal,
}: ModalProps) => {
  if (!show) {
    return null;
  }

  const selectedModal = arrayToRender.find(
    (modal: any) => modal.id_auditoria === id
  );
  // console.log('selectedModal', selectedModal);
  const { formatStringWithSpaces, parse } = new Parser();

  const { objeto, keys, values } = parse(selectedModal?.descripcion);

  const {
    objeto: obj2,
    keys: keys2,
    values: values2,
  } = parse(selectedModal?.valores_actualizados);

  // console.log(objeto);

  console.log('obj2', obj2);

  return (
    <div className={`modal ${selectedModal != null ? 'show' : ''}`}>
      {selectedModal != null && (
        <div className="modal-content">
          <section className="grid-modal">
            <div>
              {keys.map((key: any, index: number) => {
                if (key === false) return null;
                return (
                  <div key={index}>
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '20px',
                        mb: '10px',
                        border: '1px solid red',
                      }}
                    >
                      {formatStringWithSpaces(key)}
                    </Typography>
                    {/*  <p className="modal-body">{values[index]}</p> */}
                  </div>
                );
              })}
            </div>
            <div>
              {values.map((key: any, index: number) => {
                if (key === false) return null;
                return (
                  <div key={index}>
                    <Typography
                      sx={{
                        fontWeight: 'normal',
                        fontSize: '20px',
                        mb: '10px',
                        border: '1px solid red',
                      }}
                    >
                      {key}
                    </Typography>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="modal-footer">
            <button
              className="close-button"
              onClick={() => {
                set_modal(!show);
              }}
            >
              Close Modal
            </button>
          </div>

          <details>
            <summary>Título del acordeón</summary>
            <section className="grid-modal">
              {
                <div>
                  {keys2?.map((key: any, index: number) => {
                    if (key === false) return null;
                    return (
                      <div key={index}>
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            fontSize: '20px',
                            mb: '10px',
                            border: '1px solid red',
                          }}
                        >
                          {formatStringWithSpaces(key)}
                        </Typography>
                      </div>
                    );
                  })}
                </div>
              }
              {
                <div>
                  {values2?.map((key: any, index: number) => {
                    if (key === false) return null;
                    return (
                      <div key={index}>
                        <Typography
                          sx={{
                            fontWeight: 'normal',
                            fontSize: '20px',
                            mb: '10px',
                            border: '1px solid red',
                          }}
                        >
                          {key}
                        </Typography>
                      </div>
                    );
                  })}
                </div>
              }
            </section>
          </details>
        </div>
      )}
    </div>
  );
};
