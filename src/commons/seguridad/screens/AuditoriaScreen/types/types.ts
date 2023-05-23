import type { Dayjs } from 'dayjs';
import type { IList } from '../../../../../interfaces/globalModels';

export interface IFormValues {
  rango_inicial_fecha: Dayjs | string | null;
  rango_final_fecha: Dayjs | string | null;
  rango_actual_fecha: string | Date;
  numero_documento: string;
  tipo_documento: IList;
  subsistema: IList;
  modulo: IList;
  page: string;
}

// inicializar valores del formulario
export const form_values: IFormValues = {
  rango_inicial_fecha: null,
  rango_final_fecha: null,
  rango_actual_fecha: new Date(),
  numero_documento: '',
  tipo_documento: {
    label: '',
    value: ''
  },
  subsistema: {
    label: '',
    value: ''
  },
  modulo: {
    label: '',
    value: ''
  },
  page: '1'
};
