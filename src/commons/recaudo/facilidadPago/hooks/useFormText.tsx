/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react';

interface CustomForm {
  [key: string]: any;
  form_text: any;
  handle_change_text: (props: any) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const useFormText = (initialValue: any = {}): CustomForm => {
  const [form_text, set_form_text] = useState(initialValue);

  const handle_change_text = ({ target }: any): void => {
    const { value, name } = target;
    set_form_text({ ...form_text, [name]: value });
  };

  return { form_text, handle_change_text };
};
