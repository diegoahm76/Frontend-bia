/* eslint-disable @typescript-eslint/consistent-type-imports */
import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { IBienGet} from "../interfaces/catalogodebienes";

import { api} from "../../../../api/axios";


export const initial_state_bien: IBienGet = {
  bien: [],
  dataEdit: {
    edit: false,
    id_bien_padre: 0,
    nivel_jerarquico: 0,
  },
  bien_seleccionado: {
    id_bien: 0,
    codigo_bien: "",
    nro_elemento_bien: 0,
    nombre: "",
    cod_tipo_bien: "",
    cod_tipo_activo: "",
    nivel_jerarquico: 0,
    nombre_cientifico: "",
    descripcion: "",
    doc_identificador_nro: "",
    cod_metodo_valoracion: 0,
    cod_tipo_depreciacion: 0,
    cantidad_vida_util: 0,
    valor_residual: 0,
    stock_minimo: 0,
    stock_maximo: 0,
    solicitable_vivero: false,
    tiene_hoja_vida: false,
    maneja_hoja_vida: false,
    visible_solicitudes: false,
    id_marca: 0,
    id_unidad_medida: 0,
    id_porcentaje_iva: 0,
    id_unidad_medida_vida_util: 0,
    id_bien_padre: null,
  },

};

export const bien_form = createSlice({
  name: "bien",
  initialState: initial_state_bien,
  reducers: {
    obtener_bienes: (state, action) => {
      state.bien = action.payload;
    },
    crear_bien_action: (state, action) => {
      state.bien.push(action.payload);
      console.log(action.payload);
    },
    editar_bien_action: (state, action) => {
      // eslint-disable-next-line array-callback-return
      state.bien.map((bienA, index) => {
        if (bienA.id_bien === action.payload.id_bien) {
          state.bien[index] = action.payload;
        }
      });
    },
    seleccionar_bien_model_crete: (state, action) => {
      state.bien_seleccionado = action.payload;
      state.dataEdit = {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        nivel_jerarquico: action.payload.nivel_jerarquico + 1,
        id_bien_padre: action.payload?.id_bien,
        edit: false
      };
    },
    seleccionar_bien_model_edit: (state, action) => {
      state.bien_seleccionado = action.payload;
      state.dataEdit = {
        nivel_jerarquico: action.payload.nivel_jerarquico,
        id_bien_padre: action.payload?.id_bien,
        edit: true
      };
    },
    obtener_bien_action: (state, action) => {
      state.bien_seleccionado = action.payload;
    },
    eliminar_bien_action: (state, action) => {
      state.bien = state.bien.filter(b => b.id_bien !== action.payload)
    },
  },
});

export const {
  obtener_bienes,
  seleccionar_bien_model_crete,
  seleccionar_bien_model_edit,
  editar_bien_action,
  crear_bien_action,
  obtener_bien_action,
  eliminar_bien_action,
} = bien_form.actions;



// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const obtener_todos_bienes = async (dispatch: (arg0: { payload: any; type: "bien/obtener_bienes"; }) => void) => {
  await api
    .get("almacen/bienes/catalogo-bienes/get-list")
    .then((bienes: { data: { data: any; }; }) => {
      dispatch(obtener_bienes(bienes.data.data));
    })
    .catch(() => {
      void Swal.fire({
        position: "center",
        icon: "error",
        title: "Algo pasó, intente de nuevo",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
    });
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const crear_bien = async (dispatch: (arg0: { payload: any; type: "bien/crear_bien_action"; }) => void, dataBien: any) => {

  await api
    .put("almacen/bienes/catalogo-bienes/create/", dataBien)
    .then(() => {
      // falta la llamada del servicio
      dispatch(crear_bien_action(dataBien));
      void Swal.fire({
        position: "center",
        icon: "success",
        title: "Articulo agreado correctamente",
        showConfirmButton: false,
        timer: 2000,
      })
    }).catch((err: { response: { data: { detail: any; }; }; }) => {
      void Swal.fire({
        position: "center",
        icon: "error",
        title: err.response.data.detail,
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
    });;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const obtener_bien = async (dispatch: (arg0: { payload: any; type: "bien/obtener_bien_action"; }) => void, nodo: { id_bien: any; }) => {
  await api
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    .get(`almacen/bienes/catalogo-bienes/get/${nodo.id_bien}`) // la peticion se llma delete pero es get
    .then((response: { data: any; }) => {
      dispatch(obtener_bien_action(response.data));
    })
    .catch(() => {
      void Swal.fire({
        position: "center",
        icon: "error",
        title: "Ha ocurrido un error intentelo de nuevo por favor",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
    });
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const eliminar_bien = async (dispatch: (arg0: { payload: any; type: "bien/eliminar_bien_action"; }) => void, nodo: { data: { id_nodo: any; }; }) => {

  await api
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    .delete(`almacen/bienes/catalogo-bienes/delete/${nodo.data.id_nodo}`)
    .then(() => {
      dispatch(eliminar_bien_action(nodo.data.id_nodo))
      console.log(nodo);
      void Swal.fire("Correcto", "La Carpeta se elimino correctamente", "success");
    })
    .catch(() => {
      console.log(nodo);
      void Swal.fire({
        position: "center",
        icon: "error",
        title: "Ha ocurrido un error intentelo de nuevo por favor",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
    });
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const seleccionar_bien_edit = (dispatch: (arg0: { payload: any; type: "bien/seleccionar_bien_model_edit"; }) => void, bien: any) => {
  dispatch(seleccionar_bien_model_edit(bien));
};
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const seleccionar_bien_create = (dispatch: (arg0: { payload: any; type: "bien/seleccionar_bien_model_crete"; }) => void, bien: any) => {
  const data = { ...bien };
  data.id_bien_padre = data.id_bien === 0 ? 0 : data.id_bien;
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  data.nivel_jerarquico = data.nivel_jerarquico + 1;
  data.id_bien = null;
  dispatch(seleccionar_bien_model_crete(data));
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const editar_bien = async (dispatch: (arg0: { payload: any; type: "bien/editar_bien_action"; }) => void, dataEdit: any) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const dataModel = construir_modelo(dataEdit);
  await api
    .put("almacen/bienes/catalogo-bienes/create/", dataModel)
    .then(() => {
      // cambiar llamado de servicio
      dispatch(editar_bien_action(dataModel));
      void Swal.fire({
        position: "center",
        icon: "success",
        title: "Articulo actualizado correctamente",
        showConfirmButton: false,
        timer: 2000,
      });
    })
    .catch((error: { response: { data: any; }; }) => {
      void Swal.fire({
        position: "center",
        icon: "error",
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        title: `Algo pasó, intente de nuevo, ${error.response.data} `,
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
    });
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const construir_modelo = (data: { id_bien: any; codigo_bien: any; nro_elemento_bien: any; nombre: any; cod_tipo_bien: any; cod_tipo_activo: any; nivel_jerarquico: any; nombre_cientifico: any; descripcion: any; doc_identificador_nro: any; cod_metodo_valoracion: any; cod_tipo_depreciacion: any; cantidad_vida_util: any; valor_residual: any; stock_minimo: any; stock_maximo: any; solicitable_vivero: any; tiene_hoja_vida: any; maneja_hoja_vida: any; visible_solicitudes: any; id_marca: any; id_unidad_medida: any; id_porcentaje_iva: any; id_unidad_medida_vida_util: any; id_bien_padre: any; }) => {
  return {
    id_bien: data.id_bien,
    codigo_bien: data.codigo_bien,
    nro_elemento_bien: data.nro_elemento_bien,
    nombre: data.nombre,
    cod_tipo_bien: data.cod_tipo_bien,
    cod_tipo_activo: data.cod_tipo_activo,
    nivel_jerarquico: data.nivel_jerarquico,
    nombre_cientifico: data.nombre_cientifico,
    descripcion: data.descripcion,
    doc_identificador_nro: data.doc_identificador_nro,
    cod_metodo_valoracion: data.cod_metodo_valoracion,
    cod_tipo_depreciacion: data.cod_tipo_depreciacion,
    cantidad_vida_util: data.cantidad_vida_util,
    valor_residual: data.valor_residual,
    stock_minimo: data.stock_minimo,
    stock_maximo: data.stock_maximo,
    solicitable_vivero: data.solicitable_vivero,
    tiene_hoja_vida: data.tiene_hoja_vida,
    maneja_hoja_vida: data.maneja_hoja_vida,
    visible_solicitudes: data.visible_solicitudes,
    id_marca: data.id_marca,
    id_unidad_medida: data.id_unidad_medida,
    id_porcentaje_iva: data.id_porcentaje_iva,
    id_unidad_medida_vida_util: data.id_unidad_medida_vida_util,
    id_bien_padre: data.id_bien_padre,
  };
};
