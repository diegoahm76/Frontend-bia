import type { FieldErrors, FieldValues } from 'react-hook-form';

export const validate_error = async (
  errors: FieldErrors<FieldValues>,
  keys_object: string[]
): Promise<boolean> => {
  return await new Promise((resolve, reject) => {
    for (let index = 0; index < keys_object.length; index++) {
      console.log(keys_object[index]);
      console.log(errors);
      const has_key = errors[keys_object[index]] !== undefined;
      console.log(has_key);
    }
    resolve(true);
  });
};
