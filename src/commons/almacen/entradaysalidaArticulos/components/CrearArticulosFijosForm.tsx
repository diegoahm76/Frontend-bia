/* eslint-disable eqeqeq */
import type React from "react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { use_app_dispatch, use_app_selector } from "../../entradaysalidaArticulos/hooks/hooks";
import { type IBienes, type IGeneric} from "../../entradaysalidaArticulos/interfaces/catalogodebienes";
import { api } from "../../../../api/axios";
import {
  crear_bien,
  editar_bien,
  obtener_todos_bienes,
} from "../../entradaysalidaArticulos/slices/indexCatalogodeBienes";
import Swal from "sweetalert2";
import { Title } from "../../../../components";
import { Grid } from "@mui/material";

const edit_state: any = {
  id_bien: 0,
  codigo_bien: "",
  nro_elemento_bien: 0,
  nombre: "",
  cod_tipo_bien: { value: "", label: "" },
  cod_tipo_activo: { value: "", label: "" },
  nivel_jerarquico: 0,
  nombre_cientifico: "",
  descripcion: "",
  doc_identificador_nro: "",
  cod_metodo_valoracion: { value: "", label: "" },
  cod_tipo_depreciacion: { value: "", label: "" },
  cantidad_vida_util: 0,
  valor_residual: 0,
  stock_minimo: 0,
  stock_maximo: 0,
  solicitable_vivero: false,
  tiene_hoja_vida: false,
  maneja_hoja_vida: false,
  visible_solicitudes: false,
  id_marca: { value: "", label: "" },
  id_unidad_medida: { value: "", label: "" },
  id_porcentaje_iva: { value: "", label: "" },
  id_unidad_medida_vida_util: { value: "", label: "" },
  id_bien_padre: 0,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CreacionArticulosFijosForm: React.FC = () => {
  const initial_options: IGeneric[] = [
    {
      label: "",
      value: "",
    },
  ];

  const {
    register,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const data = watch();
  console.log(data, "data");
  const navigate = useNavigate();
  // state
  const bien_seleccionado: IBienes = use_app_selector(
    (state) => state.bien.bien_seleccionado);

  console.log(bien_seleccionado, "bien_seleccionado");
  const data_edit = use_app_selector((state) => state.bien.data_edit);

  // choice
  const [tipo_bien_options, set_tipo_bien_options] = useState(initial_options);
  const [tipo_activo_options, set_tipo_activo_options] = useState(initial_options);
  const [unidad_medida_options, set_unidad_medida_options] =
    useState(initial_options);
  const [metodo_valoracion_options, set_metodo_valoracion_options] =
    useState(initial_options);
  const [porcentaje_options, set_porcentaje_options] = useState(initial_options);
  const [depresiacion_options, set_depresiacion_options] =
    useState(initial_options);
  const [marca_options, set_marca_options] = useState(initial_options);
  // checkbox
  const [check_box_soli, set_check_box_soli] = useState(false);
  const [check_box_hoja, set_check_box_hoja] = useState(false);
  const [check_box_vivero, set_check_box_vivero] = useState(false);
  const [flag, set_flag] = useState(false);
  const [max_length, set_max_length] = useState(1);

  // estados definicion inicial
  const [is_edit,] = useState(data_edit.edit);

  const [bien_edit, set_bien_edit] = useState(edit_state);
  // estado edit --bien_seleccionado

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
 // const { loading } = use_app_selector((state) => state.loading);
  const dispatch = use_app_dispatch();
  // False = crear
  // true = editar

  useEffect(() => {
    void get_tipo_bien();
    void get_tipo_activo();
    void get_unidad_medida();
    void get_porcentaje();
    void get_depresiacion();
    void get_marca();
    void get_metodo_valoracion();
  }, []); // las funciones depende d euna de estas variables, si estan solos se va ejecutar solo una vez

  useEffect(() => {
    cargar_datos_iniciales();
  }, [
    porcentaje_options,
    tipo_bien_options,
    unidad_medida_options,
    metodo_valoracion_options,
    depresiacion_options,
    marca_options,
  ]);

  console.log(bien_edit.id_unidad_medida.value, "bien_edit.id_unidad_medida");

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const cargar_datos_iniciales = () => {
    let catalogo_bien;
    // if (is_edit) {

    const bien_edit = tipo_bien_options.filter((perce) => {
      return (
        perce.value.toString() === bien_seleccionado.cod_tipo_bien?.toString()
      );
    });
    const activo_edit = tipo_activo_options.filter((perce) => {
      return (
        perce.value.toString() === bien_seleccionado.cod_tipo_activo?.toString()
      );
    });
    const porcentaje_edit = porcentaje_options.filter((perce) => {
      return (
        perce.value.toString() ===
        bien_seleccionado.id_porcentaje_iva?.toString()
      );
    });
    const marca_edit = marca_options.filter((marca) => {
      return marca.value.toString() === bien_seleccionado.id_marca?.toString();
    });
    const valora_edit = metodo_valoracion_options.filter((val) => {
      return (
        val.value.toString() ===
        bien_seleccionado.cod_metodo_valoracion?.toString()
      );
    });

    const unidad_vida_edit = unidad_medida_options.filter((unidad) => {
      return (
        unidad.value.toString() ===
        bien_seleccionado.id_unidad_medida_vida_util?.toString()
      );
    });
    const depresiacion_edit = depresiacion_options.filter((unidad) => {
      return (
        unidad.value.toString() ===
        bien_seleccionado.cod_tipo_depreciacion?.toString()
      );
    });

    // eslint-disable-next-line prefer-const
    catalogo_bien = {
      ...bien_seleccionado,
      cod_tipo_bien: { value: bien_edit[0]?.value, label: bien_edit[0]?.label },
      cod_tipo_activo: {
        value: activo_edit[0]?.value,
        label: activo_edit[0]?.label,
      },

      cod_metodo_valoracion: {
        value: valora_edit[0]?.value,
        label: valora_edit[0]?.label,
      },
      cod_tipo_depreciacion: {
        value: depresiacion_edit[0]?.value,
        label: depresiacion_edit[0]?.label,
      },
      id_marca: { value: marca_edit[0]?.value, label: marca_edit[0]?.label },
      id_unidad_medida: {
        value: unidad_vida_edit[0]?.value,
        label: unidad_vida_edit[0]?.label,
      },
      id_porcentaje_iva: {
        value: porcentaje_edit[0]?.value,
        label: porcentaje_edit[0]?.label,
      },
      id_unidad_medida_vida_util: {
        value: unidad_vida_edit[0]?.value,
        label: unidad_vida_edit[0]?.label,
      },
    };
    // } else {
    // catalogo_bien = {
    //   ...bien_edit,
    //   id_bien: bien_seleccionado.id_bien,
    //   id_bien_padre: bien_seleccionado.id_bien_padre,
    //   nivel_jerarquico: bien_seleccionado.nivel_jerarquico,
    // };

    // }
    set_bien_edit(catalogo_bien);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const get_tipo_bien = async () => {
    const { data } = await api.get("almacen/choices/tipo-bien");
    const tipo_bien_maped = data.map((bien: any[]) => ({
      label: bien[1],
      value: bien[0],
    }));
    set_tipo_bien_options(tipo_bien_maped);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const  get_tipo_activo = async () => {
    const { data } = await api.get("almacen/choices/tipo-activo");
    const tipo_activo_maped = data.map((activo: any[]) => ({
      label: activo[1],
      value: activo[0],
    }));
    set_tipo_activo_options(tipo_activo_maped);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const get_unidad_medida = async () => {
    const { data } = await api.get("almacen/unidades-medida/get-list");
    const unidad_medida_maped = data.map((bien: { nombre: any; id_unidad_medida: any; }) => ({
      label: bien.nombre,
      value: bien.id_unidad_medida,
    }));
    set_unidad_medida_options(unidad_medida_maped);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const get_porcentaje = async () => {
    const { data } = await api.get("almacen/porcentajes/get-list");
    const porcentaje_maped = data.map((porcentaje: { porcentaje: any; id_porcentaje_iva: any; }) => ({
      label: porcentaje.porcentaje,
      value: porcentaje.id_porcentaje_iva,
    }));
    set_porcentaje_options(porcentaje_maped );
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const get_depresiacion = async () => {
    const { data } = await api.get(
      "almacen/choices/tipo-depreciacion-activo"
    );
    const depresiacion_maped = data.map((depresiacion: any[]) => ({
      label: depresiacion[1],
      value: depresiacion[0],
    }));
    set_depresiacion_options(depresiacion_maped);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const get_marca = async () => {
    const { data } = await api.get("almacen/marcas/get-list");
    const marca_maped = data.map((marca: { nombre: any; id_marca: any; }) => ({
      label: marca.nombre,
      value: marca.id_marca,
    }));
    set_marca_options(marca_maped);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const get_metodo_valoracion = async () => {
    const { data } = await api.get(
      "almacen/choices/metodo-valoracion-articulo/"
    );
    const metodo_maped = data.map((metodo: any[]) => ({
      label: metodo[1],
      value: metodo[0],
    }));
    set_metodo_valoracion_options(metodo_maped);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handle_validation = () => {
   
    // eslint-disable-next-line @typescript-eslint/naming-convention
    let requiredFields: any = [];
    // eslint-disable-next-line eqeqeq
    if (bien_edit.cod_tipo_bien.value == "A") {
      requiredFields = [
        { name: 'Tipo de activo', value: bien_edit.cod_tipo_activo.value },
        { name: 'Unidad de medida', value: bien_edit.id_unidad_medida.value },
        { name: 'Porcentaje IVA', value: bien_edit.id_porcentaje_iva.value },
        { name: 'Tipo de depreciación', value: bien_edit.cod_tipo_depreciacion.value },
        { name: 'Unidad de vida útil', value: bien_edit.id_unidad_medida_vida_util.value },
        { name: 'Marca', value: bien_edit.id_marca.value },
      ];
    } else {
      requiredFields = [
        { name: 'Metodo de valoración', value: bien_edit.cod_metodo_valoracion.value },
        { name: 'Unidad de medida', value: bien_edit.id_unidad_medida.value },
        { name: 'Porcentaje IVA', value: bien_edit.id_porcentaje_iva.value },
      ];
    }
    // Validar que todos los campos requeridos tengan un valor seleccionado
    const invalid_fields = requiredFields.filter((field: { value: any; }) => !field.value);
    if (invalid_fields.length > 0) {
      const field_names = invalid_fields.map((field: { name: any; }) => field.name).join(', ');
      void Swal.fire({
        position: "center",
        icon: "info",
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        title: `Debe seleccionar un valor para los siguientes campos requeridos: ${field_names}`,
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
      return false;
    }
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
   const crear_modelo_data = () => {
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const bien_model: IBienes = {
  //     id_bien: bien_edit.id_bien !== 0 ? bien_edit.id_bien : null,
  //     cantidad_vida_util: bien_edit.cantidad_vida_util,
  //     cod_metodo_valoracion: bien_edit.cod_metodo_valoracion.value,
  //     cod_tipo_activo: bien_edit.cod_tipo_activo.value,
  //     cod_tipo_bien: bien_edit.cod_tipo_bien.value,
  //     cod_tipo_depreciacion: bien_edit.cod_tipo_depreciacion.value,
  //     codigo_bien: bien_edit.codigo_bien, // quemado
  //     descripcion: bien_edit.descripcion,
  //     doc_identificador_nro: bien_edit.doc_identificador_nro,
  //     maneja_hoja_vida: check_box_hoja,
  //     nivel_jerarquico:
  //     bien_edit.nivel_jerarquico !== 0 ? bien_edit.nivel_jerarquico : 1,
  //     nombre: bien_edit.nombre,
  //     nombre_cientifico: bien_edit.nombre_cientifico,
  //     nro_elemento_bien: bien_edit.nro_elemento_bien,
  //     solicitable_vivero: check_box_hoja,
  //     stock_maximo: bien_edit.stock_maximo,
  //     stock_minimo: bien_edit.stock_minimo,
  //     tiene_hoja_vida: check_box_hoja,
  //     valor_residual: bien_edit.valor_residual,
  //     visible_solicitudes: check_box_soli,
  //     id_bien_padre:
  //     bien_edit.id_bien_padre !== 0 ? bien_edit.id_bien_padre : null,
  //     id_marca: bien_edit.id_marca.value,
  //     id_porcentaje_iva: bien_edit.id_porcentaje_iva.value,
  //     id_unidad_medida: bien_edit.id_unidad_medida.value,
  //     id_unidad_medida_vida_util: bien_edit.id_unidad_medida_vida_util.value,
    };
  //   return field_names;
  // };

  //   const dataForm: IBienes = {
  //     id_bien: bien_seleccionado.id_bien,
  //     codigo_bien: bien_seleccionado.codigo_bien,
  //     nro_elemento_bien: bien_seleccionado.nro_elemento_bien,
  //     nombre: bien_seleccionado.nombre,
  //     cod_tipo_bien: bien_seleccionado.cod_tipo_bien,
  //     cod_tipo_activo: bien_seleccionado!.cod_tipo_activo,
  //     nivel_jerarquico: bien_seleccionado.nivel_jerarquico,
  //     nombre_cientifico: bien_seleccionado.nombre_cientifico,
  //     descripcion: bienSeleccionado.descripcion,
  //     doc_identificador_nro: bienSeleccionado.doc_identificador_nro,
  //     cod_metodo_valoracion: bienSeleccionado.cod_metodo_valoracion,
  //     cod_tipo_depreciacion: bienSeleccionado.cod_tipo_depreciacion,
  //     cantidad_vida_util: bienSeleccionado.cantidad_vida_util,
  //     valor_residual: bienSeleccionado.valor_residual,
  //     stock_minimo: bienSeleccionado.stock_minimo,
  //     stock_maximo: bienSeleccionado.stock_maximo,
  //     solicitable_vivero: bienSeleccionado.solicitable_vivero,
  //     tiene_hoja_vida: bienSeleccionado.tiene_hoja_vida,
  //     maneja_hoja_vida: bienSeleccionado.maneja_hoja_vida,
  //     visible_solicitudes: bienSeleccionado.visible_solicitudes,
  //     id_marca: bienSeleccionado.id_marca,
  //     id_unidad_medida: bienSeleccionado.id_unidad_medida,
  //     id_porcentaje_iva: bienSeleccionado.id_porcentaje_iva,
  //     id_unidad_medida_vida_util: bienSeleccionado.id_unidad_medida_vida_util,
  //     id_bien_padre: bienSeleccionado.id_bien_padre,
  //   };
  //   //setValue("t006mensajeUp", alarmaSeleccionada.t006mensajeUp);
  //   //set_bien_edit(dataForm);
  // };

  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
  const onSubmit = () => {
    console.log("onSubmit", handle_validation());
    if (!handle_validation()) {
      return;
    }
    if (is_edit) {
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      void editar_bien(dispatch, crear_modelo_data());
      void obtener_todos_bienes(dispatch);
      navigate(
        "/dashboard/almacen/entrada-y-salida-de-articulos/catalogo-bienes"
      );
    } else {
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      void crear_bien(dispatch, crear_modelo_data());
      void obtener_todos_bienes(dispatch);
      navigate(
        "/dashboard/almacen/entrada-y-salida-de-articulos/catalogo-bienes"
      );
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handle_change = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    set_bien_edit({ ...bien_edit, [name]: value });
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const change_select_tipo_activo = (e: { value: any; label: any; }) => {
    // eslint-disable-next-line prefer-const
    let catalogo_bien = { ...bien_edit};
    catalogo_bien.cod_tipo_activo = {
      value: e.value,
      label: e.label,
    };
    set_bien_edit(catalogo_bien);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const change_select_tipo_bien = (e: { value: any; label: any; }) => {
    // eslint-disable-next-line prefer-const
    let catalogo_bien = { ...bien_edit };
    catalogo_bien.cod_tipo_bien = {
      value: e.value,
      label: e.label,
    };
    set_bien_edit(catalogo_bien);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const change_select_tipo_unidad_medida = (e: { value: any; label: any; }) => {
    // eslint-disable-next-line prefer-const
    let catalogo_bien = { ...bien_edit};
    catalogo_bien.id_unidad_medida = {
      value: e.value,
      label: e.label,
    };
    set_bien_edit(catalogo_bien);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const change_select_tipo_marca = (e: { value: any; label: any; }) => {
    // eslint-disable-next-line prefer-const
    let catalogo_bien = { ...bien_edit };
    catalogo_bien.id_marca = {
      value: e.value,
      label: e.label,
    };
    set_bien_edit(catalogo_bien);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const change_select_tipo_porcentaje = (e: { value: any; label: any; }) => {
    // eslint-disable-next-line prefer-const
    let catalogo_bien = { ...bien_edit };
    catalogo_bien.id_porcentaje_iva = {
      value: e.value,
      label: e.label,
    };
    set_bien_edit(catalogo_bien);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const change_select_tipo_depreciacion = (e: { value: any; label: any; }) => {
    // eslint-disable-next-line prefer-const
    let catalogo_bien = { ...bien_edit};
    catalogo_bien.cod_tipo_depreciacion = {
      value: e.value,
      label: e.label,
    };
    set_bien_edit(catalogo_bien);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const change_select_tipo_metodo_valoracion = (e: { value: any; label: any; }) => {
    // eslint-disable-next-line prefer-const
    let catalogo_bien = { ...bien_edit};
    catalogo_bien.cod_metodo_valoracion = {
      value: e.value,
      label: e.label,
    };
    set_bien_edit(catalogo_bien);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const change_select_tipo_vida_util = (e: { value: any; label: any; }) => {
    // eslint-disable-next-line prefer-const
    let catalogo_bien = { ...bien_edit };
    catalogo_bien.id_unidad_medida_vida_util = {
      value: e.value,
      label: e.label,
    };
    set_bien_edit(catalogo_bien);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const volver = () => {
    navigate("/dashboard/Recaudo/gestor-notificacion/catalogo-bienes-Screen");
  };

  useEffect(() => {
    console.log(bien_edit.codigo_bien.split(""), ".split()");
    console.log(bien_edit.codigo_bien.split("")[0], "[0]");
    console.log(
      bien_edit.codigo_bien.split("").length,
      "bien_edit.codigo_bien.split()[0]"
    );
    if (bien_edit.codigo_bien.split("").length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression, no-sequences
      return console.log("entro hijo 1"), set_max_length(1);
    }
    if (
      bien_edit.codigo_bien.split("")[0] !== "" &&
      bien_edit.codigo_bien.split("").length === 1
    ) {
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression, no-sequences
      return console.log("entro hijo 2"), set_max_length(2);
    }
    if (bien_edit.codigo_bien.split("").length === 2) {
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression, no-sequences
      return console.log("entro hijo 4"), set_max_length(4);
    }
    if (bien_edit.codigo_bien.split("").length === 4) {
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression, no-sequences
      return console.log("entro hijo 7"), set_max_length(7);
    }
    if (bien_edit.codigo_bien.split("").length === 7) {
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression, no-sequences
      return console.log("entro hijo 12"), set_max_length(12);
    }
  }, [flag]);
  console.log(bien_edit, "este es el bienEdir");

 
  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative ">
          <h3 className="text-rigth  fw-light mt-4 mb-2">
            <b>Creación de artículo</b>
          </h3>

          <Title title='CATÁLOGO DE BIENES' />
           <Grid/>

          <div className="row">
            <div className="col-12 col-lg-3  mt-2">
              <label className="form-floating input-group input-group-dynamic ms-2">
                Tipo de bien<span className="text-danger">*</span>
              </label>
              <Controller
                name="tipoBien"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={tipo_bien_options}
                    placeholder="Seleccionar"
                    value={bien_edit.cod_tipo_bien}
                    onChange={change_select_tipo_bien}
                    required
                  />
                )}
              />
            </div>
            <div className="col-12 col-md-3 mt-2"></div>
          </div>

          {bien_edit.cod_tipo_bien.value == "A" ? (
            <div>
              <form
                className="row"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={handleSubmit(onSubmit)}
                id="configForm"
              >
                <div className="row">
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="ms-2 text-terciary">
                      Código<span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control border border-terciary border rounded-pill px-3"
                      type="text"
                      onMouseOver={() => { set_flag(true); }}
                      maxLength={max_length}
                      placeholder="Código"
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      disabled={data_edit.edit!}
                      value={bien_edit.codigo_bien}
                      name="codigo_bien"
                      onChange={handle_change}
                      required
                    />
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Nombre<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control border border-terciary border rounded-pill px-3"
                        type="text"
                        placeholder="Nombre"
                        name="nombre"
                        value={bien_edit.nombre}
                        onChange={handle_change}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Tipo de activo<span className="text-danger">*</span>
                    </label>
                    <Select
                      options={tipo_activo_options}
                      placeholder="Seleccionar"
                      value={bien_edit.cod_tipo_activo}
                      onChange={change_select_tipo_activo}
                      required={true} // Hacer el campo requerido
                    />
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="ms-2 text-terciary">Carpeta padre</label>
                    <input
                      className="form-control border border-terciary border rounded-pill px-3"
                      type="text"
                      placeholder="Carpeta Padre"
                      value={bien_edit.nombre_padre}
                      disabled={true}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Unidad de medida<span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="unidadmedida"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={unidad_medida_options}
                          placeholder="Seleccionar"
                          value={bien_edit.id_unidad_medida}
                          onChange={change_select_tipo_unidad_medida}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Porcentaje IVA<span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="porcentaje"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={porcentaje_options}
                          placeholder="Seleccionar"
                          value={bien_edit.id_porcentaje_iva}
                          onChange={change_select_tipo_porcentaje}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Tipo de depreciación<span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="depresiacion"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={depresiacion_options}
                          placeholder="Seleccionar"
                          value={bien_edit.cod_tipo_depreciacion}
                          onChange={change_select_tipo_depreciacion}
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Unidad de vida útil<span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="unidadvida"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={unidad_medida_options}
                          placeholder="Seleccionar"
                          value={bien_edit.id_unidad_medida_vida_util}
                          onChange={change_select_tipo_vida_util}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Cantidad de vida útil <span className="text-danger">*</span>
                      </label>
                      <input
                        name="cantidad_vida_util"
                        className="form-control border border-terciary border rounded-pill px-3"
                        type="text"
                        value={bien_edit.cantidad_vida_util}
                        placeholder="Cantidad de vida util"
                        onChange={handle_change}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Valor residual
                      </label>
                      <input
                        name="valor_residual"
                        className="form-control border border-terciary border rounded-pill px-3"
                        type="text"
                        value={bien_edit.valor_residual}
                        placeholder="Valor residual"
                        onChange={handle_change}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Marca <span className="text-danger">*</span>
                    </label>
                    <Select
                      name="marca"
                      options={marca_options}
                      placeholder="Seleccionar"
                      value={bien_edit.id_marca}
                      onChange={change_select_tipo_marca}
                    />
                  </div>
                  <div className="col-12 col-lg-3  mt-3 d-flex">
                    <div className="col-12 col-lg-6 text-center mt-4 ">
                      <label className="form-floating input-group input-group-dynamic ms-2 mt-2">
                        Visible en solicitudes :
                      </label>
                    </div>
                    <div className="col-12 col-lg-6 text-center mt-3">
                      <button
                        className="btn btn-sm btn-tablas mt-2"
                        type="button"
                        title="Solicitudes"
                        onClick={() => { set_check_box_soli(!check_box_soli); }}
                      >
                        {!check_box_soli ? (
                          <i
                            className="fa-solid fa-toggle-off fs-3"
                            style={{ color: "black" }}
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-toggle-on fs-3"
                            style={{ color: "#8cd81e" }}
                          ></i>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="col-12 col-lg-3  mt-3 d-flex">
                    <div className="col-12 col-lg-6 text-center mt-4 ">
                      <label className="form-floating input-group input-group-dynamic ms-2 mt-2">
                        Maneja hoja de vida :
                      </label>
                    </div>
                    <div className="col-12 col-lg-6 text-center mt-3">
                      <button
                        className="btn btn-sm btn-tablas mt-2"
                        type="button"
                        title="Solicitudes"
                        onClick={() => { set_check_box_hoja(!check_box_hoja); }}
                      >
                        {!check_box_hoja ? (
                          <i
                            className="fa-solid fa-toggle-off fs-3"
                            style={{ color: "black" }}
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-toggle-on fs-3"
                            style={{ color: "#8cd81e" }}
                          ></i>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-12 mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Descripción
                    </label>
                    <textarea
                      className="form-control border rounded-pill px-4 border border-terciary"
                      placeholder="Descripción"
                      value={bien_edit.descripcion}
                      rows={3}
                      name="descripcion"
                      onChange={handle_change}
                    />
                  </div>
                </div>
                <div className="row ">
                  <div className="d-flex justify-content-end mt-3">
                    <button
                      type="button"
                      className="btn   text-capitalize"
                      onClick={() => { volver(); }}
                    >
                      <i className="fa-solid fa-x fs-3"></i>
                    </button>
                    <button type="submit" className="btn   text-capitalize">
                      <i className="fa-regular fa-floppy-disk fs-3"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            ""
          )}
          {bien_edit.cod_tipo_bien.value == "C" ? (
            <div>
              <form
                className="row"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={handleSubmit(onSubmit)}
                id="configForm"
              >
                <div className="row">
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="ms-2 text-terciary">
                      Código<span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control border border-terciary border rounded-pill px-3"
                      type="text"
                      onMouseOver={() => { set_flag(true); }}
                      maxLength= {max_length}
                      placeholder="Código"
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      disabled={data_edit.edit!}
                      value={bien_edit.codigo_bien}
                      {...register("codigo_bien")}
                      onChange={handle_change}
                      required
                    />
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Nombre<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control border border-terciary border rounded-pill px-3"
                        type="text"
                        value={bien_edit.nombre}
                        placeholder="Nombre"
                        {...register("nombre", { required: "true" })}

                        onChange={handle_change}
                        required
                      />
                    </div>
                    {errors.nombre && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Metodo de valoración <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="tipoactivo"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={metodo_valoracion_options}
                          placeholder="Seleccionar"
                          value={bien_edit.cod_metodo_valoracion}
                          onChange={change_select_tipo_metodo_valoracion}
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="ms-2 text-terciary">Carpeta padre</label>
                    <input
                      className="form-control border border-terciary border rounded-pill px-3"
                      type="text"
                      placeholder="Carpeta Padre"
                      {...register("padre")}
                      value={bien_edit.nombre_padre}
                      required
                      disabled
                    />
                    {errors.padre && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Unidad de medida <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="unidadmedida"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={unidad_medida_options}
                          placeholder="Seleccionar"
                          value={bien_edit.id_unidad_medida}
                          onChange={change_select_tipo_unidad_medida}
                          required
                        />
                      )}
                    />
                    {errors.unidadmedida && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Stock minimo
                      </label>
                      <input
                        name="stock_minimo"
                        className="form-control border border-terciary border rounded-pill px-3"
                        type="text"
                        placeholder="Stock minimo"
                        value={bien_edit.stock_minimo}
                        onChange={handle_change}
                      />
                      {errors.stockminimo && (
                        <small className="text-danger">
                          Este campo es obligatorio
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Stock maximo
                      </label>
                      <input
                        name="stock_maximo"
                        className="form-control border border-terciary border rounded-pill px-3"
                        type="text"
                        placeholder="Stock maximo"
                        value={bien_edit.stock_maximo}
                        onChange={handle_change}
                      />
                      {errors.stockmaximo && (
                        <small className="text-danger">
                          Este campo es obligatorio
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Porcentaje IVA<span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="porcentaje"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={porcentaje_options}
                          placeholder="Seleccionar"
                          value={bien_edit.id_porcentaje_iva}
                          onChange={change_select_tipo_porcentaje}
                        />
                      )}
                    />
                    {errors.porcentaje && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-3  mt-3 d-flex">
                    <div className="col-12 col-lg-6  mt-4 ">
                      <label className="form-floating input-group input-group-dynamic ms-2 mt-2">
                        Visible en solicitudes :
                      </label>
                    </div>
                    <div className="col-12 col-lg-6 text-center mt-3">
                      <button
                        className="btn btn-sm btn-tablas mt-2"
                        type="button"
                        title="Solicitudes"
                        onClick={() => { set_check_box_soli(!check_box_soli); }}
                      >
                        {!check_box_soli ? (
                          <i
                            className="fa-solid fa-toggle-off fs-3"
                            style={{ color: "black" }}
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-toggle-on fs-3"
                            style={{ color: "#8cd81e" }}
                          ></i>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="col-12 col-lg-3  mt-3 d-flex">

                    <div className="col-12 col-lg-6  mt-4 ">
                      <label className="form-floating input-group input-group-dynamic ms-2 mt-2">
                        Solicitable por vivero:
                      </label>
                    </div>
                    <div className="col-12 col-lg-6 text-center mt-3">
                      <button
                        className="btn btn-sm btn-tablas"
                        type="button"
                        title="Vivero"
                        onClick={() => { set_check_box_vivero(!check_box_vivero); }}
                      >
                        {!check_box_vivero ? (
                          <i
                            className="fa-solid fa-toggle-off fs-3"
                            style={{ color: "black" }}
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-toggle-on fs-3"
                            style={{ color: "#8cd81e" }}
                          ></i>
                        )}
                      </button>
                    </div>
                  </div>
                  {check_box_vivero ? (
                    <div className="col-12 col-lg-3  mt-3">
                      <div>
                        <label className="ms-2 text-terciary">
                          Nombre cientifico
                        </label>
                        <input
                          name="nombre_cientifico"
                          className="form-control border border-terciary border rounded-pill px-3"
                          type="text"
                          placeholder="Nombre cientifico"
                          value={bien_edit.nombre_cientifico}
                          onChange={handle_change}
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="row">
                  <div className="col-12 col-lg-12 mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Descripción
                    </label>
                    <textarea
                      className="form-control border rounded-pill px-4 border border-terciary"
                      placeholder="Descripción"
                      value={bien_edit.descripcion}
                      rows={3}
                      name="descripcion"
                      onChange={handle_change}
                    />
                  </div>
                </div>
                <div className="row ">
                  <div className="d-flex justify-content-end mt-3">
                    <button
                      type="submit"
                      className="btn   text-capitalize"
                      onClick={() => { volver(); }}
                    >
                      <i className="fa-solid fa-x fs-3"></i>
                    </button>
                    <button type="submit" className="btn   text-capitalize">
                      <i className="fa-regular fa-floppy-disk fs-3"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
          }