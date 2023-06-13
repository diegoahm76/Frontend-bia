import { type Dispatch, type SetStateAction } from 'react';

export interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}