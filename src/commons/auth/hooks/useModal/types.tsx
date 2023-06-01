export type ModalId = number | null;

export interface Modal {
    id: ModalId;
    open_modal: (id: ModalId) => void;
    close_modal: (id?: ModalId) => void;
}
export interface ModalProps extends Omit <Modal, 'id' >{
    modal: any;
}
