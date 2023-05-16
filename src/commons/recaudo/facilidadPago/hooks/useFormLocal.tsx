/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react';

interface CustomForm {
  [key: string]: any;
  form_local: any;
  handle_change_local: (props: any) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const useFormLocal = (initialValue: any = {}): CustomForm => {
  const [form_local, set_form_local] = useState(initialValue);

  const handle_change_local = ({ target }: any): void => {
    const { value, name } = target;
    set_form_local({ ...form_local, [name]: value });
  };

  return { form_local, handle_change_local };
};
