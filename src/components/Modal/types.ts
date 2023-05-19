export interface ModalProps {
  data: {
    show: boolean;
    id: number;
  };
  arrayToRender: any[];
  set_modal: React.Dispatch<React.SetStateAction<any>>;
}
