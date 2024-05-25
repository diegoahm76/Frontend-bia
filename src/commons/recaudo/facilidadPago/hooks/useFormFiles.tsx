/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react';

interface CustomForm {
  [key: string]: any;
  form_files: any;
  name_files: any;
  handle_change_file: (props: any) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const useFormFiles = (initialValue: any = {}): CustomForm => {
  const [form_files, set_form_files] = useState(initialValue);
  const [name_files, set_name_files] = useState(initialValue);

  const handle_change_file = ({ target }: any) => {
    const { name, files } = target;
    const selected_file = files != null ? files[0] : null;
    if (selected_file != null) {
      set_form_files({ ...form_files, [name]: selected_file });
      set_name_files({ ...name_files, [name]: selected_file.name });
    }
  };
  const handle_delete_file = (name: string) => {
    const updated_form_files = { ...form_files };
    const updated_name_files = { ...name_files };
    delete updated_form_files[name];
    delete updated_name_files[name];
    set_form_files(updated_form_files);
    set_name_files(updated_name_files);
  };

  return { form_files, name_files, handle_change_file, handle_delete_file };
};
