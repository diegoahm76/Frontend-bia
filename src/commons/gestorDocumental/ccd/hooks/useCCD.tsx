/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// Components
import { useAppDispatch, useAppSelector } from '../../../../hooks';
// Actions
// Interfaces
import {
  // type IAssignmentsObject,
  type ICCDAsingForm,
  type ICCDForm,
  type IListOrganigrama,
} from '../interfaces/ccd';
import { get_ccd_current } from '../store/slices/ccdSlice';
import { get_assignments_ccd_current } from '../store/slices/assignmentsSlice';
import {
  create_ccds_service,
  update_ccds_service,
} from '../store/thunks/ccdThunks';
import {
  get_organigrams_service,
  get_unitys_service,
} from '../../organigrama/store/thunks/organigramThunks';
import { get_series_service } from '../store/thunks/seriesThunks';
import { get_subseries_service } from '../store/thunks/subseriesThunks';
import {
  create_assignments_service,
  get_assignments_service,
} from '../store/thunks/assignmentsThunks';
import type { GridColDef } from '@mui/x-data-grid';
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const use_ccd = () => {
  const dispatch = useAppDispatch();
  // Extracción estado global
  const { organigram, unity_organigram } = useAppSelector(
    (state) => state.organigram
  );
  const { ccd_current } = useAppSelector((state) => state.ccd);
  const { series_ccd } = useAppSelector((state) => state.series);
  const { subseries_ccd } = useAppSelector((state) => state.subseries);
  const { assignments_ccd, assignments_ccd_current } = useAppSelector(
    (state) => state.assignments
  );

  const [title, set_title] = useState<string>('');
  const [title_button_asing, set_title_button_asing] =
    useState<string>('Guardar relación');
  const [create_is_active, set_create_is_active] = useState<boolean>(false);
  const [consulta_ccd_is_active, set_consulta_ccd_is_active] =
    useState<boolean>(false);
  const [save_ccd, set_save_ccd] = useState<boolean>(false);
  const [list_unitys, set_list_unitys] = useState<IListOrganigrama[]>([
    {
      label: '',
      value: 0,
    },
  ]);
  const [list_organigrams, set_list_organigrams] = useState<IListOrganigrama[]>(
    [
      {
        label: '',
        value: 0,
      },
    ]
  );
  const [list_sries, set_list_sries] = useState<IListOrganigrama[]>([
    {
      label: '',
      value: 0,
    },
  ]);
  const [list_subsries, set_list_subsries] = useState<any[]>([
    {
      label: '',
      value: 0,
    },
  ]);
  // const [file, set_file] = useState(null);

  // Estado Inicial de Formulario de Crear CCD
  const initial_state: ICCDForm = {
    id_ccd: 0,
    nombre_ccd: '',
    organigrama: { label: '', value: 0 },
    unidades_organigrama: { label: '', value: 0 },
    version: '',
    fecha_terminado: '',
  };
  // Estado Inicial de Formulario de Crear Asignación
  const initial_state_asig: ICCDAsingForm = {
    sries_asignacion: { label: '', value: 0 },
    sries: '',
    subserie_asignacion: [],
    subserie: '',
    unidades_asignacion: { label: '', value: 0 },
  };
  // configuración de tabla por defecto
  const default_col_def = {
    sortable: true,
    editable: false,
    flex: 1,
    filter: true,
    wrapHeaderText: true,
    resizable: true,
    initialWidth: 200,
    autoHeaderHeight: true,
    suppressMovable: true,
  };

  // useForm Asignar CCD
  const {
    handleSubmit: handle_submit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initial_state_asig });
  const data_asing = watch();
  //  console.log(data_asing, 'data_asing')

  // useForm Crear CCD
  const {
    register: register_create_ccd,
    handleSubmit: handle_submit_create_ccd,
    control: control_create_ccd,
    reset: reset_create_ccd,
    watch: watch_create_ccd,
    formState: { errors: errors_create_ccd },
  } = useForm<ICCDForm>({ defaultValues: initial_state });
  const data_create_ccd = watch_create_ccd();

  //  UseEffect para obtener organigramas
  useEffect(() => {
    if (ccd_current !== null) {
      const result_name = organigram.filter(
        (item) => item.id_organigrama === ccd_current.id_organigrama
      );
      const obj: ICCDForm = {
        id_ccd: ccd_current.id_ccd,
        nombre_ccd: ccd_current.nombre,
        organigrama: {
          label: result_name[0].nombre,
          value: ccd_current.id_organigrama,
        },
        unidades_organigrama: { label: '', value: 0 },
        version: ccd_current.version,
        fecha_terminado: ccd_current.fecha_terminado,
      };
      reset_create_ccd(obj);
      set_save_ccd(true);
    }
  }, [ccd_current]);

  useEffect(() => {
    if (assignments_ccd_current !== null) {
      const obj = {
        sries_asignacion: {
          label: assignments_ccd_current.nombre_serie,
          value: assignments_ccd_current.id_serie_doc,
        },
        sries: '',
        subserie_asignacion: assignments_ccd_current.subseries?.map(
          (item: { label: string; value: any }) => {
            return {
              label: item.label,
              value: item.value,
            };
          }
        ),
        subserie: '',
        unidades_asignacion: {
          label: assignments_ccd_current.seccion,
          value: assignments_ccd_current.id_unidad_organizacional,
        },
      };
      reset(obj);
      set_title_button_asing('Editar relación');
    }
  }, [assignments_ccd_current]);

  //  UseEffect para obtener organigramas
  useEffect(() => {
    void dispatch(get_organigrams_service());
  }, [ccd_current]);
  //  UseEffect para obtener series
  useEffect(() => {
    void dispatch(get_series_service());
  }, [ccd_current]);
  //  UseEffect para obtener subSeries
  useEffect(() => {
    void dispatch(get_subseries_service());
  }, [ccd_current]);
  //  UseEffect para obtener asignaciones
  useEffect(() => {
    void dispatch(get_assignments_service());
  }, [ccd_current]);

  // useEffect para obtener el MoldOrganigram (jerarquia de niveles & unidades)
  useEffect(() => {
    if (data_create_ccd.organigrama.value !== 0)
      void dispatch(get_unitys_service(data_create_ccd.organigrama.value));
  }, [data_create_ccd.organigrama.value]);

  useEffect(() => {
    set_list_unitys(
      unity_organigram.map((item) => ({
        label: item?.nombre,
        value: item.id_unidad_organizacional!,
      }))
    );
  }, [unity_organigram]);

  useEffect(() => {
    set_list_organigrams(
      organigram.map((item) => ({
        label: item?.nombre,
        value: item.id_organigrama!,
      }))
    );
  }, [organigram]);

  useEffect(() => {
    set_list_sries(
      series_ccd.map((item) => ({
        label: item.nombre,
        value: item.id_serie_doc!,
      }))
    );
  }, [series_ccd]);

  useEffect(() => {
    set_list_subsries(
      subseries_ccd.map((item: { nombre: any; id_subserie_doc: any }) => ({
        label: item?.nombre,
        value: item?.id_subserie_doc,
      }))
    );
  }, [subseries_ccd]);

  // submit Asignar CCD
  const on_submit = (): void => {
    create_asing();
  };
  // submit Crear CCD
  const on_submit_create_ccd = (): void => {
    console.log('ccd_current', ccd_current);
    if (ccd_current !== null) {
      update_ccd();
    } else {
      create_ccd();
    }
  };

  // Funcion para crear el CCD
  const create_ccd = (): void => {
    const new_ccd = {
      id_organigrama: data_create_ccd.organigrama.value,
      version: data_create_ccd.version,
      nombre: data_create_ccd.nombre_ccd,
    };
    void dispatch(create_ccds_service(new_ccd, set_save_ccd));
  };
  // Funcion para actualizar el CCD
  const update_ccd = (): void => {
    const new_ccd = {
      id_organigrama: data_create_ccd.organigrama.value,
      version: data_create_ccd.version,
      nombre: data_create_ccd.nombre_ccd,
    };
    void dispatch(update_ccds_service(new_ccd));
  };
  console.log(data_asing, 'data_asing');

  // Funcion para crear la asignacion
  const create_asing = (): void => {
    let new_item: any[] = [];
    const old_items = assignments_ccd.map(
      (item: {
        id_unidad_organizacional: number;
        id_serie_doc: any;
        subseries: any;
      }) => {
        return {
          id_unidad_organizacional: item.id_unidad_organizacional,
          id_serie_doc: item.id_serie_doc,
          subseries: item.subseries?.map((item: { value: any }) => item.value),
        };
      }
    );
    if (title_button_asing === 'Guardar relación') {
      new_item = [
        ...old_items,
        {
          id_unidad_organizacional: data_asing.unidades_asignacion.value,
          id_serie_doc: data_asing.sries_asignacion.value,
          subseries: data_asing.subserie_asignacion.map((item) => item.value),
        },
      ];
    } else {
      new_item = assignments_ccd.map((item) => {
        return item.id === assignments_ccd_current?.id
          ? {
              id_unidad_organizacional: data_asing.unidades_asignacion.value,
              id_serie_doc: data_asing.sries_asignacion.value,
              subseries: data_asing.subserie_asignacion.map(
                (item) => item.value
              ),
            }
          : {
              id_unidad_organizacional: item.id_unidad_organizacional,
              id_serie_doc: item.id_serie_doc,
              subseries: item.subseries?.map(
                (item: { value: any }) => item.value
              ),
            };
      });
    }
    void dispatch(create_assignments_service(new_item, clean_asing));
  };

  // Funcio_s para limpiar el formulario de Crear CCD
  const clean_ccd = (): void => {
    reset_create_ccd(initial_state);
    set_save_ccd(false);
    dispatch(get_ccd_current(null));
    clean_asing();
  };
  // Funcion para limpiar el formulario de asignar CCD
  const clean_asing = (): void => {
    reset(initial_state_asig);
    set_title_button_asing('Guardar relación');
    dispatch(get_assignments_ccd_current(null));
  };

  // Funcion para eliminar Asignaciones
  // const delete_asing = (id: any): void => {
  //   const new_items = assignments_ccd.filter((item) => item.id !== id);
  //   const item_final = new_items.map((item: any) => {
  //     return {
  //       id_unidad_organizacional: item?.id_unidad_organizacional,
  //       id_serie_doc: item?.codigo_serie,
  //       subseries: item?.subseries?.map((item: { value: any }) => item.value),
  //     };
  //   });
  //   void dispatch(create_assignments_service(item_final, clean_asing));
  // };

  const columns_asignacion: GridColDef[] = [
    {
      headerName: 'Sección',
      field: 'seccion',
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: 'Subsección',
      field: 'subseccion',
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: 'serie',
      field: 'nombre_serie',
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: 'subserie',
      field: 'subseries_nombres',
      minWidth: 150,
      // cellStyle: {
      //   'white-space': 'pre-wrap',
      // },
    },
    {
      headerName: 'Acciones',
      field: 'accion',
      // cellRendererFramework: (params: {
      //   row: IAssignmentsObject | null;
      //   data: { id: any };
      // }) => (
      //   <div>
      //     <button
      //       className="btn text-capitalize "
      //       type="button"
      //       title="Editar"
      //       onClick={() => {
      //         dispatch(get_assignments_ccd_current(params.row));
      //       }}
      //     >
      //       <i className="fa-regular fa-pen-to-square fs-4"></i>
      //     </button>
      //     <button
      //       className="btn text-capitalize "
      //       type="button"
      //       title="Eliminar"
      //       onClick={() => {
      //         delete_asing(params.data.id);
      //       }}
      //     >
      //       <i className="fa-regular fa-trash-can fs-4"></i>
      //     </button>
      //   </div>
      // ),
    },
  ];

  const get_row_class = (params: { data: { price: number } }): string => {
    if (params.data.price >= 50000) {
      return 'high-price';
    }
    return '';
  };

  return {
    // States
    list_unitys,
    list_organigrams,
    list_sries,
    list_subsries,
    title,
    title_button_asing,
    create_is_active,
    consulta_ccd_is_active,
    columns_asignacion,
    control,
    control_create_ccd,
    default_col_def,
    errors,
    errors_create_ccd,
    save_ccd,
    // Edita States
    set_title,
    set_create_is_active,
    set_consulta_ccd_is_active,
    // Functions
    get_row_class,
    on_submit_create_ccd,
    on_submit,
    register_create_ccd,
    handle_submit,
    handle_submit_create_ccd,
    clean_ccd,
  };
};

// eslint-disable-next-line no-restricted-syntax
export default use_ccd;
