import { useState } from 'react';

interface CustomForm {
  [key: string]: any; // Permite recibir cualquier propiedad no definida
  form_state: any;
  on_input_change: (props: any) => void;
  on_reset_form: () => void;
}

export const use_form = (initial_form: any = {}): CustomForm => {
  const [form_state, set_form_state] = useState(initial_form);

  const on_input_change = ({ target }: any): void => {
    const { name, value } = target;
    set_form_state({
      ...form_state,
      [name]: value,
    });
  };

  const on_reset_form = (): void => {
    set_form_state(initial_form);
  };

  return {
    ...form_state,
    form_state,
    on_input_change,
    on_reset_form,
  };
};
