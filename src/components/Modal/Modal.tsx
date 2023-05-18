/* eslint-disable @typescript-eslint/naming-convention */
import type React from 'react';
import type { ModalProps } from './types';

interface ModalData {
  title: string;
  content: React.ReactNode;
}

interface CustomModalProps extends ModalProps {
  data: ModalData[];
}

export const ModalAtom: React.FC<CustomModalProps> = ({ show, onClose, data }: CustomModalProps) => {
  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      {show && data.map((modal, index) => (
        <div className="modal-content" key={index}>
          <div className="modal-header">
            <h2>{modal.title}</h2>
          </div>
          <div className="modal-body">
            {modal.content}
          </div>
          <div className="modal-footer">
            <button className="close-button" onClick={() => onClose(!show)}>
              Close Modal
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};


