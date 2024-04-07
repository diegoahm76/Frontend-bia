/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState, useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';
// Components
import { useAppDispatch, useAppSelector } from '../../../../hooks';
// Actions
// Interfaces
import {
  // type IAssignmentsObject,
  type ICCDAsingForm,
  type ICCDForm,
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
// import { get_series_service } from '../store/thunks/seriesThunks';
// import { get_subseries_service } from '../store/thunks/subseriesThunks';
import {
  create_or_delete_assignments_service,
  get_assignments_service,
} from '../store/thunks/assignmentsThunks';
import type { GridColDef } from '@mui/x-data-grid';
import type { IList } from '../../../../interfaces/globalModels';
import { get_series_service } from '../store/thunks/seriesThunks';
import { get_subseries_service } from '../store/thunks/subseriesThunks';
import { Avatar, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AvatarStyles } from '../componentes/crearSeriesCcdDialog/utils/constant';
import { ModalContext } from '../context/ModalContext';
import {
  get_serie_ccd_current,
  get_series_ccd,
} from '../store/slices/seriesSlice';
import {
  get_subseries_ccd,
  get_subseries_ccd_current,
} from '../store/slices/subseriesSlice';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const use_ccd = () => {
  const {
    openModalBusquedaCreacionCCD,
    closeModalBusquedaCreacionCCD,
    activateLoadingButton,
    desactivateLoadingButton,
    activateLoadingButtonGuardarRelacion,
    desactivateLoadingButtonGuardarRelacion,
  } = useContext(ModalContext);

  const dispatch = useAppDispatch();
  // Extracción estado global
  const { organigram, unity_organigram } = useAppSelector(
    (state) => state.organigram
  );
  const { ccd_current } = useAppSelector((state) => state.ccd);
  const { series_ccd } = useAppSelector((state) => state.series);
  const { subseries_ccd } = useAppSelector((state) => state.subseries);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { assignments_ccd, assignments_ccd_current } = useAppSelector(
    (state) => state.assignments
  );
  const { seriesAndSubseries } = useAppSelector(
    (state: any) => state.slice_series_and_subseries
  );

  const [title, set_title] = useState<string>('');
  const [title_button_asing, set_title_button_asing] =
    useState<string>('Guardar relación');
  const [create_is_active, set_create_is_active] = useState<boolean>(false);
  const [create_sub_serie_active, set_create_sub_serie_active] =
    useState<boolean>(false);
  const [consulta_ccd_is_active, set_consulta_ccd_is_active] =
    useState<boolean>(false);
  const [save_ccd, set_save_ccd] = useState<boolean>(false);
  const [list_unitys, set_list_unitys] = useState<IList[] | any>([
    {
      label: '',
      value: 0,
    },
  ]);
  const [list_organigrams, set_list_organigrams] = useState<IList[] | any>([
    {
      label: '',
      value: 0,
    },
  ]);
  const [list_sries, set_list_sries] = useState<IList[] | any>([
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

  const [list_sries_asignacion, set_list_sries_asignacion] = useState<
    IList[] | any
  >([
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
    valor_aumento_serie: '',
    valor_aumento_subserie: '',
    ruta_soporte: '',
  };
  // Estado Inicial de Formulario de Crear Asignación
  const initial_state_asig: ICCDAsingForm = {
    catalogo_asignacion: [],
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
    //! control series y subseries para catalogo de unidad organizacional
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initial_state_asig });
  const data_asing = watch();

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
  // //  console.log('')(data_create_ccd, 'data_create_ccd');

  //  UseEffect para obtener organigramas
  useEffect(() => {
    // //  console.log('')(data_create_ccd, 'data_create_ccd');
    // //  console.log('')(ccd_current, 'ccd_current');
    if (ccd_current !== null) {
      const result_name = organigram.filter((item: any) => {
        return item.id_organigrama === ccd_current.id_organigrama;
      });

      /* const result_unity = unity_organigram.filter(
        (item) => item.id_organigrama === ccd_current.id_organigrama
      ); */

      // //  console.log('')('result_name', result_name);
      // //  console.log('')('result_unity', result_unity);
      const obj: ICCDForm = {
        id_ccd: ccd_current.id_ccd ? ccd_current.id_ccd : 0,
        nombre_ccd: ccd_current.nombre ? ccd_current.nombre : '',
        organigrama: {
          label:
            result_name && result_name.length > 0 ? result_name[0].nombre : '',
          value: ccd_current.id_organigrama,
        },
        unidades_organigrama: {
          label:
            ' -- ' /* result_unity && result_unity.length > 0 ? result_unity[0].nombre : '' */,
          // value: result_unity && result_unity.length > 0 ? result_unity[0].id_unidad_organizacional : 0
        },
        version: ccd_current.version,
        fecha_terminado: ccd_current.fecha_terminado,
        valor_aumento_serie: ccd_current.valor_aumento_serie,
        valor_aumento_subserie: ccd_current.valor_aumento_subserie,
        ruta_soporte: ccd_current.ruta_soporte,
      };
      reset_create_ccd(obj);
      set_save_ccd(true);
    }
  }, [ccd_current]);

  //  UseEffect para obtener asignaciones
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
      // //  console.log('')(obj, 'obj');
      reset(obj);
      set_title_button_asing('Editar relación');
    }
  }, [assignments_ccd_current]);

  //  UseEffect para obtener organigramas
  useEffect(() => {
    void dispatch(get_organigrams_service());
  }, [ccd_current]);
  //  UseEffect para obtener series
  //! se retira de momento al mandar un error en la petición durante la primer petición al render de la pantalla
  useEffect(() => {
    void dispatch(get_series_service());
  }, [ccd_current]);
  //  UseEffect para obtener subSeries
  useEffect(() => {
    void dispatch(get_subseries_service());
  }, [ccd_current]);
  //  UseEffect para obtener asignaciones
  useEffect(() => {
    dispatch(get_assignments_service(ccd_current));
  }, [ccd_current]);

  //  UseEffect para obtener asignaciones
  /* useEffect(() => {
    return (ccd_current) ? dispatch(getCatalogoSeriesYSubseries(String(ccd_current.id_ccd!))) : null;
  }, [ccd_current]); */

  // useEffect para obtener el MoldOrganigram (jerarquia de niveles & unidades)
  useEffect(() => {
    if (data_create_ccd.organigrama.value !== 0)
      void dispatch(get_unitys_service(data_create_ccd.organigrama.value));
  }, [data_create_ccd.organigrama.value]);

  useEffect(() => {
    //  console.log('')('uniry_organigram', unity_organigram);
    const filteredUnityOrganigram = unity_organigram.filter(
      (item: any) => item.cod_agrupacion_documental !== null && item.activo
    );

    const filter = filteredUnityOrganigram.map((item: any) => ({
      item,
      label: item?.nombre,
      value: item.id_unidad_organizacional!,
    }));

    //  console.log('')(filter, 'filter');

    set_list_unitys(
      filteredUnityOrganigram
        .filter((item: any) => item.activo && item.cod_agrupacion_documental)
        .map((item: any) => ({
          label: item?.nombre,
          value: item.id_unidad_organizacional!,
        }))
    );
  }, [unity_organigram]);

  useEffect(() => {
    const orgActual = organigram.find((el: any) => el.actual);
    const filteredOrganigramas = organigram.filter(
      (el: any) =>
        el.fecha_terminado &&
        !el.fecha_retiro_produccion &&
        el.fecha_terminado >= orgActual.fecha_terminado
    );
    set_list_organigrams(
      filteredOrganigramas.map((item: any) => ({
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

  useEffect(() => {
    set_list_sries_asignacion(
      seriesAndSubseries
        /*        .filter(
          (el: { cod_agrupacion_documental: string }) =>
            el.cod_agrupacion_documental
        )*/
        ?.map((item: any) => ({
          item,
          label: `${item.codigo_serie ? item.codigo_serie : ''} - ${
            item.nombre_serie ? item.nombre_serie : ''
          } - ${
            item.nombre_subserie
              ? item.nombre_subserie
              : '(serie independiente)'
          } - ${item.codigo_subserie ? item.codigo_subserie : ''}`,
          value: `${item.id_serie_doc} - ${item.id_catalogo_serie}`,
        }))
    );
  }, [seriesAndSubseries]);

  // submit Crear CCD
  const on_submit_create_ccd = (e: any): void => {
    e.preventDefault();
    // //  console.log('')(data_create_ccd, 'data_create_ccd');
    // //  console.log('')('epa la patria', ccd_current);
    if (ccd_current !== null) {
      update_ccd(data_create_ccd);
    } else {
      create_ccd();
    }
  };

  //! Funcion para crear el CCD
  const create_ccd = (): void => {
    const new_ccd: any = {
      id_organigrama: data_create_ccd.organigrama.value,
      version: data_create_ccd.version,
      nombre: data_create_ccd.nombre_ccd,
      valor_aumento_serie: data_create_ccd.valor_aumento_serie,
      valor_aumento_subserie: data_create_ccd.valor_aumento_subserie,
      ruta_soporte: data_create_ccd.ruta_soporte,
    };

    // Convertir el objeto new_ccd en un objeto FormData
    const formData: any = new FormData();
    for (const key in new_ccd) {
      if (new_ccd[key] !== null) {
        formData.append(key, new_ccd[key]);
      }
    }

    // //  console.log('')('new_ccd', new_ccd);
    void dispatch(
      create_ccds_service(
        formData,
        set_save_ccd,
        openModalBusquedaCreacionCCD,
        activateLoadingButton,
        desactivateLoadingButton
      )
    );
  };

  //! Funcion para actualizar el CCD
  const update_ccd = (data_create_ccd: any): void => {
    const updatedCCD: any = {
      id_organigrama: data_create_ccd.organigrama.value,
      version: data_create_ccd.version,
      nombre: data_create_ccd.nombre_ccd ? data_create_ccd.nombre_ccd : null,
      valor_aumento_serie: data_create_ccd.valor_aumento_serie,
      valor_aumento_subserie: data_create_ccd.valor_aumento_subserie,
      ruta_soporte: data_create_ccd.ruta_soporte
        ? data_create_ccd.ruta_soporte
        : data_create_ccd.ruta_soporte,
    };
    // //  console.log('')(data_create_ccd.ruta_soporte, 'data_create_ccd.ruta_soporte')

    // Convertir el objeto new_ccd en un objeto FormData
    const formData: any = new FormData();
    formData.append('id_organigrama', String(updatedCCD.id_organigrama));
    formData.append('version', String(updatedCCD.version));
    if (updatedCCD.nombre !== null || updatedCCD.nombre !== undefined) {
      formData.append('nombre', updatedCCD.nombre);
    }
    formData.append(
      'valor_aumento_serie',
      String(updatedCCD.valor_aumento_serie)
    );
    formData.append(
      'valor_aumento_subserie',
      String(updatedCCD.valor_aumento_subserie)
    );
    // formData.append('ruta_soporte', updatedCCD.ruta_soporte);
    if (
      !updatedCCD.ruta_soporte ||
      typeof updatedCCD.ruta_soporte !== 'string'
    ) {
      formData.append('ruta_soporte', updatedCCD.ruta_soporte);
    }
    void dispatch(
      update_ccds_service(
        formData,
        data_create_ccd,
        activateLoadingButton,
        desactivateLoadingButton
      )
    );
  };

  // ? Funciones para limpiar el formulario de Crear CCD
  const clean_ccd = (): void => {
    closeModalBusquedaCreacionCCD();
    reset_create_ccd(initial_state);
    reset(initial_state_asig);
    set_save_ccd(false);
    dispatch(get_ccd_current(null));
    clean_asing();
    set_list_sries_asignacion([]);
    set_list_subsries([]);
    set_list_sries([]);
    dispatch(get_subseries_ccd([]));
    dispatch(get_series_ccd([]));
  };

  const clean_after_update = (): void => {
    reset_create_ccd(initial_state);
    reset(initial_state_asig);
    set_save_ccd(false);
    dispatch(get_ccd_current(null));
    clean_asing();
    set_list_sries_asignacion([]);
    set_list_subsries([]);
    set_list_sries([]);
  };

  // Funcion para limpiar el formulario de asignar CCD
  //! hasta el momento funciona de manera adecuada
  const clean_asing = useCallback((): void => {
    reset(initial_state_asig);
    set_title_button_asing('Guardar relación');
    dispatch(get_assignments_ccd_current(null));
    dispatch(get_series_service('0'));
    dispatch(get_subseries_service('0'));
    dispatch(get_serie_ccd_current(null));
    dispatch(get_subseries_ccd_current(null));
  }, [dispatch, reset, set_title_button_asing]);

  const create_or_delete_relation_unidad = (
    reset: any,
    activateLoadingButtonGuardarRelacion: any,
    desactivateLoadingButtonGuardarRelacion: any
  ): any => {
    //  console.log('')(data_asing, 'data_asing');
    //  console.log('')('epa la patria', ccd_current);
    const itemSend = data_asing.catalogo_asignacion.map(
      (item: {
        item: {
          codigo_serie: string;
          codigo_subserie: string;
          id_catalogo_serie: number;
          id_serie_doc: number;
          id_subserie_doc: number;
          nombre_serie: string;
          nombre_subserie: string;
        };
        value: number;
      }) => {
        return {
          // id_catalogo_serie_und: 'rigth now is null',
          // id_catalogo_serie_und: 19,
          id_unidad_organizacional: data_asing.unidades_asignacion.value,
          id_catalogo_serie: item.item.id_catalogo_serie,
          id_serie_doc: item.item.id_serie_doc,
          nombre_serie: item.item.nombre_serie,
          codigo_serie: item.item.codigo_serie,
          id_subserie_doc: item.item.id_subserie_doc,
          nombre_subserie: item.item.nombre_subserie,
          codigo_subserie: item.item.codigo_subserie,
        };
      }
    );

    const itemSendDef = [...assignments_ccd, ...itemSend];

    // //  console.log('')(itemSendDef, 'itemSendDef');

    void dispatch(
      create_or_delete_assignments_service(
        itemSendDef,
        ccd_current,
        reset,
        activateLoadingButtonGuardarRelacion,
        desactivateLoadingButtonGuardarRelacion
      )
    ).then(() => {
      void dispatch(get_assignments_service(ccd_current));
    });
  };

  // Funcion para eliminar Asignaciones
  const delete_asing = (id: any): void => {
    const new_items = assignments_ccd.filter((item) => item.id !== id);
    void dispatch(
      create_or_delete_assignments_service(
        new_items,
        ccd_current,
        reset,
        activateLoadingButtonGuardarRelacion,
        desactivateLoadingButtonGuardarRelacion
      )
    ).then(() => {
      void dispatch(get_assignments_service(ccd_current));
    });
  };

  const columns_asignacion: GridColDef[] = [
    {
      headerName: 'Unidad Organizacional',
      field: 'nombreUnidad',
      minWidth: 350,
      maxWidth: 400,
    },
    {
      headerName: 'Cód. Serie',
      field: 'codigo_serie',
      minWidth: 95,
      maxWidth: 100,
    },
    {
      headerName: 'Serie',
      field: 'nombre_serie',
      minWidth: 350,
      maxWidth: 400,
    },
    {
      headerName: 'Cód. Subserie',
      field: 'codigo_subserie',
      minWidth: 95,
      maxWidth: 100,
    },
    {
      headerName: 'Subserie',
      field: 'nombre_subserie',
      minWidth: 420,
      maxWidth: 520,
    },
    {
      headerName: 'Acciones',
      field: 'accion',
      minWidth: 110,
      maxWidth: 120,
      renderCell: (params: any) => {
        return ccd_current?.actual ? null : (
          <>
            <IconButton
              onClick={() => {
                // //  console.log('')('elimaniando relación');
                delete_asing(params.row.id);
                // //  console.log('')(params.row);
              }}
            >
              <Avatar sx={AvatarStyles} variant="rounded">
                <DeleteIcon
                  titleAccess="Eliminar relación"
                  sx={{ color: 'red', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </>
        );
      },
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
    list_sries_asignacion,
    set_list_subsries,
    title,
    title_button_asing,
    create_is_active,
    consulta_ccd_is_active,
    columns_asignacion,
    //! control series y subseries para catalogo de unidad organizacional
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
    clean_after_update,
    // Functions
    get_row_class,
    on_submit_create_ccd,
    register_create_ccd,
    handle_submit,
    handle_submit_create_ccd,
    clean_ccd,

    create_sub_serie_active,
    set_create_sub_serie_active,
    create_or_delete_relation_unidad,
    reset,
    // file,
    // set_file,
  };
};

// eslint-disable-next-line no-restricted-syntax
export default use_ccd;
