import type { FieldErrors, FieldValues } from 'react-hook-form';

export const validate_error = async (
  errors: FieldErrors<FieldValues>,
  keys_object: string[]
): Promise<boolean> => {
  return await new Promise((resolve, reject) => {
    keys_object.forEach((e) => {
      if(errors[e]?.type === 'required'){
        reject(new Error(`${e} is required`))
      }
    });
    resolve(true);
  });
};
