export interface Props {
    titulo: string;
    precio?: string;
    numero_principal?: string;
    porcentaje?: string;
    color?: string;
    icono: any
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (values: string[]) => void;
};