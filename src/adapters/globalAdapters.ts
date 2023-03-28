import { type IList } from '../interfaces/globalModels';

// Transforma un array que contiene arrays con 2 valores tipo string en un array de tipo Ilist
// Dato de entrada [["N","Natural"],["J","Juridica"]]
// Dato de salida [{label: "Natural", value: "N"},[label: "Juridica", value: "J"]]
export const select_adapter = (data: [[string, string]]): IList[] => {
  return data.map(([value, label]: any) => {
    return {
      label,
      value
    };
  });
};
