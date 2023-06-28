/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';

const useModal1 = () => {
  const context = useContext(ModalContext);
  if (context == null) {
    throw new Error('useModal1 debe ser usado dentro de un ModalProvider');
  }
  return {
    isOpen: context.modal1,
    open: context.openModal1,
    close: context.closeModal1,
  };
};

const useModal2 = () => {
  const context = useContext(ModalContext);
  if (context == null) {
    throw new Error('useModal2 debe ser usado dentro de un ModalProvider');
  }
  return {
    isOpen: context.modal2,
    open: context.openModal2,
    close: context.closeModal2,
  };
};

const useModal3 = () => {
  const context = useContext(ModalContext);
  if (context == null) {
    throw new Error('useModal3 debe ser usado dentro de un ModalProvider');
  }
  return {
    isOpen: context.modal3,
    open: context.openModal3,
    close: context.closeModal3,
  };
};

export { useModal1, useModal2, useModal3 };


/* import React from 'react';
import { useModal1, useModal2, useModal3 } from './ModalHooks';

const MyComponent: React.FC = () => {
  const modal1 = useModal1();
  const modal2 = useModal2();
  const modal3 = useModal3();

  return (
    <div>
      <button onClick={modal1.open}>Abrir modal 1</button>
      {modal1.isOpen && (
        <div>
          <h2>Contenido del modal 1</h2>
          <button onClick={modal1.close}>Cerrar modal 1</button>
        </div>
      )}

      <button onClick={modal2.open}>Abrir modal 2</button>
      {modal2.isOpen && (
        <div>
          <h2>Contenido del modal 2</h2>
          <button onClick={modal2.close}>Cerrar modal 2</button>
        </div>
      )}

      <button onClick={modal3.open}>Abrir modal 3</button>
      {modal3.isOpen && (
        <div>
          <h2>Contenido del modal 3</h2>
          <button onClick={modal3.close}>Cerrar modal 3</button>
        </div>
      )}
    </div>
  );
};

export default MyComponent; */
