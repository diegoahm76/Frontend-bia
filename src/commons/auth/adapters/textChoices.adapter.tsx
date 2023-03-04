import { type IList } from '../interfaces/authModels';
export const text_choise_adapter = (data_array: string[]): IList[] => {
  const data_new_format = data_array.map((dataOld) => ({
    label: dataOld[1],
    value: dataOld[0],
  }));
  return data_new_format;
};

export const text_choise_adapter_indicativo = (
  data_array: string[]
): IList[] => {
  const data_new_format = data_array.map((dataOld) => ({
    label: dataOld[0],
    value: dataOld[0],
  }));
  return data_new_format;
};
