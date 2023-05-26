import {useState} from 'react';
import type{ ModalId, ModalProps } from './types';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const useModal = (): ModalProps => {

    const [modal, set_modal] = useState(false);
    
    const open_modal = (id: ModalId): void => {
        set_modal(true);
    };
    
    const close_modal = (id?: ModalId): void => {
        set_modal(false);
    };
    
    return {
        modal,
        open_modal,
        close_modal,
    };
}
