/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react';

interface CustomForm {
  [key: string]: any;
  form_file: any;
  name_file: any;
  handle_change_one_file: (props: any) => void;
}

interface CustomFormMultiple {
  [key: string]: any;
  form_multiple_files: any;
  name_multiple_files: any;
  handle_change_multiple_files: (props: any) => void;
}

export const useFormFile = (initialValue: any = {}): CustomForm => {
  const [form_file, set_form_file] = useState(initialValue);
  const [name_file, set_name_file] = useState(initialValue);

    const handle_change_one_file = ({ target }: any) => {
      const { name, files } = target;
      const selected_file = files != null ? files[0] : null;
      if (selected_file != null) {
        set_form_file({ [name]: selected_file });
        set_name_file({ [name]: selected_file.name });
      }
  };

  return { form_file, name_file, handle_change_one_file };
};

export const useFormMultipleFiles = (initialValue: any = {}): CustomFormMultiple => {
  const [form_multiple_files, set_form_multiple_files] = useState(initialValue);
  const [name_multiple_files, set_name_multiple_files] = useState([]);

    const handle_change_multiple_files = ({ target }: any) => {
      const { name, files } = target;
      const arr_names = [];
      const selected_files = files != null ? files : null;
      if (selected_files != null) {
        set_form_multiple_files({ [name]: selected_files });
        for(let i=0; i<selected_files.length; i++){
          arr_names.push(selected_files[i].name)
        }
        set_name_multiple_files(arr_names as any);
      }
  };

  return { form_multiple_files, name_multiple_files, handle_change_multiple_files };
};
