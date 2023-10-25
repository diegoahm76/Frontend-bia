
import { api } from '../../../../../api/axios';
// Types
import { type AxiosError, } from 'axios';
// Reducers
import { toast, type ToastContent } from 'react-toastify';


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const control_error = (message: ToastContent = 'Algo pasó, intente de nuevo') =>
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });

// // Consumo Bienes por Unidad
// export const obtener_movimientos_incautados: any = (filtros: { fecha_desde: string,fecha_hasta: string }) => {
//   return async () => {
//     try {
//       const { data } = await api.get(`almacen/reportes/movimientos-incautados/get-list/?fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}`);
//       return data;
//     } catch (error: any) {
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };
