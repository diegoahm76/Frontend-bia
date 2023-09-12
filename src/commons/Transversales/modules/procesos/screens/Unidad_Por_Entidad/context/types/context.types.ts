import { type ReactNode } from 'react';

export interface ModalContextInterface {
  modalHistoricos: boolean;
  handleModalHistoricos: () => void;
  loadingConsultaT026: boolean;
  setloadingConsultaT026: (value: boolean) => void;
  gridActualANuevo: boolean;
  handleGridActualANuevo: (value: boolean) => void;
  mood: boolean;
  handleMood: (value: boolean) => void;
}
export interface ContextProps {
  children: ReactNode;
}
