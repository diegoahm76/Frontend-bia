import { type Dispatch } from 'react';
import { type NavigateFunction } from 'react-router-dom';
import { toast, type ToastContent } from 'react-toastify';
// import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
  type AxiosError
  // type AxiosResponse
} from 'axios';
// Slices
import {
    get_marca,
    marca_seleccionada,
    get_porcentaje,
    porcentaje_seleccionado,
    get_medida,
    medida_seleccionada,

} from '../slice/MarcaMedidaPorcentajeSlice';
import { api } from '../../../../../api/axios';
import { type IMedidas, type IMarcas, type IPorcentajes} from "../../interfaces/MarcaMedidaPorcentaje"

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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const control_success = (message: ToastContent) =>
  toast.success(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });


// Obtener Marca
export const get_marca_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('almacen/marcas/get-list');
      // //  console.log('')(data)
      dispatch(get_marca(data));
      return data;
    } catch (error: any) {
      // //  console.log('')('get_marca_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Agregar Marca
export const add_marca_service: any = (
  marca: any,
  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      // //  console.log('')(marca);
      const { data } = await api.post(
        'almacen/marcas/create/',
        marca
      );

      dispatch(get_marca_service());
      dispatch(marca_seleccionada(data.detail));
      control_success('La marca se agrego correctamente');
      
      return data;
    } catch (error: any) {
      // //  console.log('')('add_marca_service');
      control_error(error.response.data.detail);
      //  console.log('')(error.response.data);
      
      return error as AxiosError;
    }
  };
};

// editar marca 

export const edit_marca_service: any = (
  marca: any,
  id: string|number,

  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `almacen/marcas/update/${id}/`,
        marca
      );
      dispatch(get_marca_service());
      control_success('La marca se edito correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      //  console.log('')(error.response.data);
      return error as AxiosError;
    }
  };
};



// eliminar marca 

export const delete_marca_service: any = (id: string | number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.delete(
        `almacen/marcas/delete/${id}/`
      );
      dispatch(get_marca_service());
      control_success('Se elimino la marca');

      return data;
    } catch (error: any) {
      // //  console.log('')('delete nursery service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// desactivar -activar marca

export const activate_deactivate_marca_service: any = (id: string | number, marca: IMarcas) => {

  const form_data = {
    
    nombre: marca.nombre,
    activo: !marca.activo,

  }
  return async (dispatch: Dispatch<any>) => {
    try {
      
      const { data } = await api.put(
        `almacen/marcas/update/${id}/`,
        form_data
      );
      dispatch(get_marca_service());
      form_data.activo?
      
      control_success('Se activo la marca correctamente '):
      control_success('Se desactivo la marca correctamente');
    

      return data;
    } catch (error: any) {
      // //  console.log('')('activate-deactivate nursery service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};






// porcentaje

// Obtener Porcentaje
export const get_porcentaje_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('almacen/porcentajes/get-list');
      // //  console.log('')(data)
      dispatch(get_porcentaje(data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_porcentaje_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Agregar Porcentaje
export const add_porcentaje_service: any = (
  porcentaje: any,
  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      // //  console.log('')(porcentaje);
      const { data } = await api.post(
        'almacen/porcentajes/create/',
        porcentaje
      );

      dispatch(get_porcentaje_service());
      dispatch(porcentaje_seleccionado(data.detail));
      control_success('El porcentaje se agrego correctamente');
      
      return data;
    } catch (error: any) {
      // //  console.log('')('add_porcentaje_service');
      control_error(error.response.data.detail);
      //  console.log('')(error.response.data);
      
      return error as AxiosError;
    }
  };
};

// editar porcentaje

export const edit_porcentaje_service: any = (
  porcentaje: any,
  id: string|number,

  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `almacen/porcentajes/update/${id}/`,
       porcentaje
      );
      dispatch(get_porcentaje_service());
      control_success('El porcentaje se edito correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      //  console.log('')(error.response.data);
      return error as AxiosError;
    }
  };
};

// eliminar porcentaje

export const delete_porcentaje_service: any = (id: string | number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.delete(
        `almacen/porcentajes/delete/${id}/`
      );
      dispatch(get_porcentaje_service());
      control_success('Se eliminó el porcentaje correctamente');

      return data;
    } catch (error: any) {
      // //  console.log('')('delete porentaje service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// desactivar -activar porcentaje

export const activate_deactivate_porcentaje_service: any = (id: string | number, porcentaje: IPorcentajes) => {

  const form_data = {
    
    porcentaje: porcentaje.porcentaje,
    observacion: porcentaje.observacion,
    activo: !porcentaje.activo,

  }
  return async (dispatch: Dispatch<any>) => {
    try {
      

      const { data } = await api.put(

        `almacen/porcentajes/update/${id}/`,
      form_data
      );

      //  console.log('')(data)
      dispatch(get_porcentaje_service());
      form_data.activo?
      
      control_success('Se activo el porcentaje correctamente '):
      control_success('Se desactivo el porcentaje correctamente');
  
      return data;
    } catch (error: any) {
      //  console.log('')('activate-deactivate nursery service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};




// Medida

// Obtener Medida
export const get_medida_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('almacen/unidades-medida/get-list/');
      //  console.log('')("medida")
      //  console.log('')(data)
      dispatch(get_medida(data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_medida_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Agregar Medida
export const add_medida_service: any = (
  medida: any,
  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      //  console.log('')(medida);
      const { data } = await api.post(
        'almacen/unidades-medida/create/',
        medida
      );

      dispatch(get_medida_service());
      dispatch(medida_seleccionada(data.detail));
      control_success('La medida se agrego correctamente');
      
      return data;
    } catch (error: any) {
      //  console.log('')('add_medida_service');
      control_error(error.response.data.detail);
      //  console.log('')(error.response.data);
      
      return error as AxiosError;
    }
  };
};

// editar medida

export const edit_medida_service: any = (
  medida: any,
  id: string|number,

  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `almacen/unidades-medida/update/${id}/`,
        medida
      );
      //  console.log('')(data)
      dispatch(get_medida_service());
      control_success('La medida se editó correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      //  console.log('')(error.response.data);
      return error as AxiosError;
    }
  };
};

// eliminar medida

export const delete_medida_service: any = (id: string | number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.delete(
        `almacen/unidades-medida/delete/${id}/`
      );
      dispatch(get_medida_service());
      control_success('Se eliminó la medida correctamente');

      return data;
    } catch (error: any) {
      //  console.log('')('delete nursery service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};


// desactivar -activar marca

export const activate_deactivate_medida_service: any = (id: string | number, medida: IMedidas ) => {

  const form_data = { 
    nombre: medida.nombre,
    abreviatura: medida.abreviatura,
    id_magnitud: medida.id_magnitud,
    activo: !medida.activo,

  }

  return async (dispatch: Dispatch<any>) => {
    try {
     
      const { data } = await api.put(
        `almacen/unidades-medida/update/${id}/`,
       form_data
      );
      dispatch(get_medida_service());
      form_data.activo?
      control_success('Se activo la unidad de medida '):
      control_success('Se desactivo la unidad de medida ');

      return data;
    } catch (error: any) {
      //  console.log('')('activate-deactivate nursery service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
