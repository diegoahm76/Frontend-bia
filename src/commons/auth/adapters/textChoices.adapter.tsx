import { type IList } from '../../../interfaces/globalModels';

export const text_choise_adapter = (data_array: string[]): IList[] => {
  const data_new_format = data_array.map((data_old) => ({
    label: data_old[1],
    value: data_old[0],
  }));
  return data_new_format;
};

interface IValue {
  value: string;
}

export const text_choise_adapter2 = (data_array: string[]): IValue[] => {
  const data_new_format = data_array.map((data_old) => ({
    value: data_old[0],
  }));
  return data_new_format;
};

export const text_choise_adapter_indicativo = (
  data_array: string[]
): IList[] => {
  const data_new_format = data_array.map((data_old) => ({
    label: data_old[0],
    value: data_old[0],
  }));
  return data_new_format;
};
