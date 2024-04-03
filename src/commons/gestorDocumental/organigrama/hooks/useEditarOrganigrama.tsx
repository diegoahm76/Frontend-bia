/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { useEffect, useState } from 'react';
import { api } from '../../../../api/axios';
import { type SubmitHandler, useForm } from 'react-hook-form';
// Componentes de material UI
import { Chip, Avatar, IconButton, Checkbox } from '@mui/material';
import { type GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import DoneAllIcon from '@mui/icons-material/DoneAll';
// Interfaces
import {
  type IObjLevels as FormValuesLevels,
  type FormValuesUnitys,
  type IDocumentaryGroup,
  type ILevelFather,
  type ILevelUnity,
  type IObjCreateOrganigram as FormValuesOrganigram,
  type ITypeUnity,
  // IObjUnitys,
} from '../interfaces/organigrama';
// Hooks
import { useAppDispatch, useAppSelector } from '../../../../hooks';
// Midleware - asincronicos
import {
  edit_organigrams_service,
  get_levels_service,
  get_mold_organigrams_service,
  get_unitys_service,
  update_levels_service,
  update_unitys_service,
} from '../store/thunks/organigramThunks';
import { type FormValues } from '../componentes/DialogCrearOrganigrama/types/type';
import { control_warning } from '../../../almacen/configuracion/store/thunks/BodegaThunks';
import { get_unitys } from '../store/slices/organigramSlice';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const use_editar_organigrama = () => {
  const dispatch = useAppDispatch();
  const { organigram_current, levels_organigram, unity_organigram } =
    useAppSelector((state) => state.organigram);

  // ------> useState <------ //
  const [loadingEdicionOrgan, setLoadingEdicionOrgan] = useState(false);
  const [orden_nivel, set_orden_nivel] = useState<number>(0);
  const [title_nivel, set_title_nivel] = useState<string>('Agregar');
  const [title_unidades, set_title_unidades] = useState<string>('Agregar');
  const [option_nivel, set_option_nivel] = useState<ILevelUnity[]>([
    {
      label: '',
      value: '',
      orden: '',
    },
  ]);
  const [option_unidad_padre, set_option_unidad_padre] = useState<
    ILevelFather[]
  >([
    {
      label: '',
      value: '',
      id_nivel_organigrama: 0,
      isDisabled: false,
    },
  ]);
  const [options_tipo_unidad, set_option_tipo_unidad] = useState<ITypeUnity[]>([
    {
      label: '',
      value: null,
      isDisabled: false,
    },
  ]);
  const [options_agrupacion_d, set_option_agrupacion_d] = useState<
    IDocumentaryGroup[]
  >([]);

  const [loadingLevels, setloadingLevels] = useState<boolean>(false);
  const [dataloading, setDataloading] = useState<boolean>(false);
  // const [dataloadingUnidades, setDataloadingUnidades] = useState<boolean>(false);

  const option_raiz = [
    { label: 'Si', value: true },
    { label: 'No', value: false },
  ];
  const initial_state_levels: FormValuesLevels = {
    id_nivel_organigrama: '',
    id_organigrama: '',
    orden_nivel: 0,
    nombre: '',
  };
  // Estado Inicial de las unidades
  const initial_state_unitys: FormValuesUnitys = {
    codigoExtra: '',
    activo: true,
    id_unidad_organizacional: '',
    unidad_raiz: {
      label: 'si',
      value: true,
    },
    codigo: '',
    nombre: '',
    tipo_unidad: {
      label: '',
      value: null,
      isDisabled: false,
    },
    nivel_unidad: {
      label: '',
      value: null,
      orden: '',
    },
    agrupacion_documental: {
      label: '',
      value: null,
      isDisabled: false,
    },
    nivel_padre: {
      label: '',
      value: null,
      id_nivel_organigrama: 0,
      isDisabled: false,
    },
  };

  // configuración de tabla por defecto
  const default_col_def_organigrama = {
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

  // ------> useForm <------ //

  //  Organigrama
  const {
    control: control_organigrama,
    handleSubmit: handle_submit_organigrama,
    reset: reset_organigrama,
    formState: { errors: errors_organigrama },
  } = useForm<FormValuesOrganigram>();

  // useForm Nivel
  const {
    control: control_nivel,
    handleSubmit: handle_submit_nivel,
    reset: reset_nivel,
    formState: { errors: errors_nivel },
  } = useForm<FormValuesLevels>({ defaultValues: initial_state_levels });

  // useForm Unidades
  const {
    control: control_unidades,
    handleSubmit: handle_submit_unidades,
    // register: register_unidades,
    reset: reset_unidades,
    watch: watch_unidades,
    setValue: set_value_unidades,
    formState: { errors: errors_unidades },
  } = useForm<FormValuesUnitys>({ defaultValues: initial_state_unitys });
  const datos_unidades = watch_unidades();

  const {
    control: control_organigrama_creacion,
    handleSubmit: handle_submit,
    reset: reset_creacion_organigrama,
    watch: watch_creacion_organigrama,
  } = useForm<FormValues>({
    defaultValues: {
      nombre: '',
      version: '',
      descripcion: '',
      ruta_resolucion: '',
    },
  });

  const {
    control: control_edit__value_activo,
    // handleSubmit: handle_submit_edit_value_activo,
    reset: reset_edit_value_activo,
    watch: watch_edit_value_activo,
  } = useForm({});

  const edit_value_activo = watch_edit_value_activo();

  const creacion_organigrama_values = watch_creacion_organigrama();
  // const [selectedItems, setSelectedItems] = useState<any>([]);

  const handleCheckboxChange = (
    event: any,
    id_unidad_organizacional: number,
    params: any
  ): void => {
    //  console.log('')(params.row, 'params.row');
    const newUnidadesActualizaciónActivo = unity_organigram.map((unidad: any) =>
      unidad.id_unidad_organizacional === id_unidad_organizacional
        ? { ...unidad, activo: event.target.checked }
        : unidad
    );
    dispatch(get_unitys(newUnidadesActualizaciónActivo));
  };

  // ------> Colums <------ //

  const columns_nivel: GridColDef[] = [
    { headerName: 'Nivel', field: 'orden_nivel', minWidth: 100 },
    { headerName: 'Nombre', field: 'nombre', minWidth: 200 },
    {
      headerName: 'Acciones',
      field: 'editar',
      minWidth: 140,
      hide: organigram_current?.fecha_terminado,
      renderCell: (params: {
        row: {
          orden_nivel: number;
        };
      }) => (
        <>
          <IconButton
            onClick={() => {
              set_title_nivel('Editar');
              set_orden_nivel(params.row.orden_nivel);
              reset_nivel(params.row);
            }}
          >
            <Avatar
              sx={{
                width: 24,
                height: 24,
                background: '#fff',
                border: '2px solid',
              }}
              variant="rounded"
            >
              <EditIcon
                titleAccess="Editar nivel"
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
          <IconButton
            className={`${
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              params.row.orden_nivel !==
                levels_organigram[levels_organigram.length - 1].orden_nivel &&
              'd-none'
            }`}
            style={{ border: 'none', background: 'none' }}
            type="button"
            title="Eliminar"
            onClick={() => {
              delete_level(params.row.orden_nivel);
            }}
          >
            <Avatar
              sx={{
                width: 24,
                height: 24,
                background: '#fff',
                border: '2px solid',
              }}
              variant="rounded"
            >
              <DeleteIcon
                titleAccess="Eliminar nivel"
                sx={{ color: 'red', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];
  const columns_unidades: GridColDef[] = [
    {
      headerName: 'Código',
      field: 'codigo',
      headerAlign: 'center',
      minWidth: 100,
      maxWidth: 100,
    },
    {
      headerName: 'Nombre',
      field: 'nombre',
      headerAlign: 'center',
      minWidth: 250,
    },
    {
      headerName: 'Tipo unidad',
      field: 'cod_tipo_unidad',
      headerAlign: 'center',
      width: 120,
      renderCell: (params: { row: { cod_tipo_unidad: any } }) => {
        if (params.row.cod_tipo_unidad === 'LI') {
          return 'Línea';
        }
        if (params.row.cod_tipo_unidad === 'AP') {
          return 'Apoyo';
        }
        if (params.row.cod_tipo_unidad === 'AS') {
          return 'Asesor';
        }
      },
    },
    {
      headerName: 'Agrupacion documental',
      field: 'cod_agrupacion_documental',
      minWidth: 180,
      maxWidth: 180,
      valueFormatter: (params) => {
        if (params.value === 'SEC') {
          return 'Sección';
        }
        if (params.value === 'SUB') {
          return 'Subsección';
        }
        // eslint-disable-next-line no-extra-boolean-cast
        if (!Boolean(params.value)) {
          return 'N/A'; // o cualquier otro valor predeterminado que desee mostrar
        }
      },
    },
    {
      headerName: 'Unidad raíz',
      field: 'unidad_raiz',
      headerAlign: 'center',
      minWidth: 130,
      maxWidth: 130,
      // headerCheckboxSelection: false,
      // checkboxSelection: false,
      // showDisabledCheckboxes: false,
      renderCell: (params: { row: { unidad_raiz: any } }) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.unidad_raiz ? (
          <Chip size="small" label="Sí" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="No" color="error" variant="outlined" />
        );
      },
    },
    {
      headerName: 'Ítem activo',
      headerAlign: 'center',
      field: 'activo',
      renderCell: (params: { row: { activo: any } }) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.activo ? (
          <Chip size="small" label="Sí" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="No" color="error" variant="outlined" />
        );
      },
    },
    {
      headerName: 'Acciones',
      headerAlign: 'center',
      field: 'acciones',
      minWidth: 120,
      maxWidth: 160,
      // hide: organigram_current.fecha_terminado !== null,
      renderCell: (params: {
        row: {
          activo: boolean | undefined;
          id_unidad_organizacional: any;
          cod_unidad_org_padre: null;
          unidad_raiz: boolean;
          codigo: any;
          nombre: any;
          cod_tipo_unidad: string | null | undefined;
          id_nivel_organigrama: string | number | null;
          cod_agrupacion_documental: string | null;
          item_usado?: boolean;
        };
      }) => (
        <>
          {!organigram_current?.fecha_terminado &&
            !organigram_current?.actual && (
              <>
                <IconButton
                  onClick={() => {
                    reset_unidades({
                      codigoExtra: params.row.codigo,
                      activo: params.row.activo,
                      id_unidad_organizacional:
                        params.row.id_unidad_organizacional,
                      codigo: params.row.codigo,
                      nombre: params.row.nombre,
                      unidad_raiz: {
                        label: option_raiz.filter(
                          (item) => item.value === params.row.unidad_raiz
                        )[0].label,
                        value: params.row.unidad_raiz,
                      },
                      tipo_unidad: {
                        label: options_tipo_unidad.filter(
                          (tipo) => tipo.value === params.row.cod_tipo_unidad
                        )[0].label,
                        value: params.row.cod_tipo_unidad,
                        isDisabled: false,
                      },
                      nivel_unidad: {
                        label: option_nivel.filter(
                          (nivel) =>
                            nivel.value === params.row.id_nivel_organigrama
                        )[0].label,
                        value: params.row.id_nivel_organigrama,
                        orden: option_nivel.filter(
                          (nivel) =>
                            nivel.value === params.row.id_nivel_organigrama
                        )[0].orden,
                      },
                      agrupacion_documental: {
                        label:
                          params.row.cod_agrupacion_documental != null
                            ? options_agrupacion_d.filter(
                                (agrupacion) =>
                                  agrupacion.value ===
                                  params.row.cod_agrupacion_documental
                              )[0].label
                            : '',
                        value: params.row.cod_agrupacion_documental,
                        isDisabled: false,
                      },
                      nivel_padre: {
                        label:
                          params.row.cod_unidad_org_padre != null
                            ? option_unidad_padre.filter(
                                (agrupacion) =>
                                  agrupacion.value ===
                                  params.row.cod_unidad_org_padre
                              )[0].label
                            : '',
                        value: params.row.cod_unidad_org_padre,
                        isDisabled: false,
                      },
                    });
                    set_title_unidades('Editar Unidad');
                  }}
                >
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      background: '#fff',
                      border: '2px solid',
                    }}
                    variant="rounded"
                  >
                    <EditIcon
                      titleAccess="Editar unidad"
                      sx={{
                        color: 'primary.main',
                        width: '18px',
                        height: '18px',
                      }}
                    />
                  </Avatar>
                </IconButton>
                <IconButton
                  onClick={() => {
                    delete_unidades(params.row.codigo);
                  }}
                >
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      background: '#fff',
                      border: '2px solid',
                    }}
                    variant="rounded"
                  >
                    <DeleteIcon
                      titleAccess="Eliminar unidad"
                      sx={{ color: 'red', width: '18px', height: '18px' }}
                    />
                  </Avatar>
                </IconButton>

                <Checkbox
                  title={
                    params.row.item_usado
                      ? 'Item usado no se puede activar o desactivar'
                      : 'Activar o desactivar unidad'
                  }
                  checked={params.row.activo}
                  disabled={params.row.item_usado}
                  onChange={(event) =>
                    handleCheckboxChange(
                      event,
                      params.row.id_unidad_organizacional,
                      params
                    )
                  }
                  inputProps={{ 'aria-label': 'Seleccionar item' }}
                />
              </>
            )}

          {/* para el organigrama actual debe haber un checkbox de activar o desactivar unidades  y uno para eliminar los grupos del organigrama actual */}

          {organigram_current?.actual &&
          !params.row.cod_agrupacion_documental ? (
            <>
              <IconButton
                title={
                  params.row.item_usado
                    ? 'Item usado no se puede eliminar'
                    : 'Eliminar ítem'
                }
                onClick={() => {
                  //  console.log('')(params.row);

                  params.row.item_usado
                    ? control_warning(
                        'Un ítem (unidad) que está siendo usada no se puede eliminar'
                      )
                    : delete_unidades(params.row.codigo);
                }}
              >
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    background: '#fff',
                    border: '2px solid',
                  }}
                  variant="rounded"
                >
                  <DeleteIcon
                    sx={{
                      color: params.row.item_usado ? 'gray' : 'red',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>

              <Checkbox
                onClick={() => {
                  params.row.item_usado
                    ? control_warning(
                        'Un ítem (unidad) que está siendo usada no se puede activar o desactivar'
                      )
                    : null;
                }}
                title={
                  params.row.item_usado
                    ? 'Item usado no se puede activar o desactivar'
                    : 'Activar o desactivar unidad'
                }
                checked={params.row.activo}
                disabled={params.row.item_usado}
                onChange={(event) =>
                  handleCheckboxChange(
                    event,
                    params.row.id_unidad_organizacional,
                    params
                  )
                }
                inputProps={{ 'aria-label': 'Seleccionar item' }}
              />
            </>
          ) : null}

          {/* para el organigrama actual debe haber un checkbox de activar o desactivar unidades  y uno para eliminar los grupos del organigrama actual */}
        </>
      ),
    },
  ];

  // ------> useEffects <------ //

  // ueeEffect para obtener el organigrama a editar
  useEffect(() => {
    reset_organigrama(organigram_current);
  }, [organigram_current]);

  // useEffect para obtener el MoldOrganigram (jerarquia de niveles & unidades)
  useEffect(() => {
    void dispatch(
      get_mold_organigrams_service(organigram_current?.id_organigrama)
    );
  }, [unity_organigram]);

  useEffect(() => {
    set_orden_nivel((levels_organigram.length as number) + 1);
    set_option_nivel(
      levels_organigram.map((item: any) => ({
        label: item.nombre,
        value: item.id_nivel_organigrama,
        orden: item.orden_nivel,
      }))
    );
  }, [levels_organigram]);

  useEffect(() => {
    reset_unidades({
      unidadRaiz: { label: 'Si', value: true },
    });
    set_option_unidad_padre(
      unity_organigram.map((item: any) => ({
        label: item.nombre,
        value: item.codigo,
        id_nivel_organigrama: item.id_nivel_organigrama,
        isDisabled: false,
      }))
    );
  }, [unity_organigram]);

  // useEffect para desabilitar opciones de unidad padre
  useEffect(() => {
    if (datos_unidades.nivel_unidad != null) {
      set_option_unidad_padre(
        unity_organigram.map((item: any) =>
          item.id_nivel_organigrama <
          Number(datos_unidades!.nivel_unidad!.value!)
            ? {
                label: item.nombre,
                value: item.codigo,
                id_nivel_organigrama: item.id_nivel_organigrama,
                isDisabled: false,
              }
            : {
                label: item.nombre,
                value: item.codigo,
                id_nivel_organigrama: item.id_nivel_organigrama,
                isDisabled: true,
              }
        )
      );
      set_value_unidades('nivelPadre', {
        label: '',
        value: null,
        id_nivel_organigrama: 0,
        isDisabled: false,
      });
    }
  }, [datos_unidades.nivel_unidad, unity_organigram]);

  // useEffect para deshabilitar el nivel 1 cuando el tipo de unidad es de apoyo o soporte
  useEffect(() => {
    if (['AP', 'AS'].includes(String(datos_unidades?.tipoUnidad?.value))) {
      set_option_nivel((prev) =>
        prev.map((item) =>
          item.value === 'N1' ? { ...item, isDisabled: true } : item
        )
      );
      set_option_agrupacion_d((prev) =>
        prev.map((item) => ({ ...item, isDisabled: true }))
      );
    } else {
      set_option_nivel((prev) =>
        prev.map((item) =>
          item.value === 'N1' ? { ...item, isDisabled: false } : item
        )
      );
      set_option_agrupacion_d((prev) =>
        prev.map((item) => ({ ...item, isDisabled: false }))
      );
    }
  }, [datos_unidades.tipoUnidad]);

  // useEffect para consultar los niveles y unidades
  useEffect(() => {
    if (organigram_current?.id_organigrama != null)
      void dispatch(get_levels_service(organigram_current?.id_organigrama));
    if (organigram_current?.id_organigrama != null)
      void dispatch(
        get_unitys_service(organigram_current?.id_organigrama, setDataloading)
      );
  }, [organigram_current]);

  // useEffect para consultar  options
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const get_selects_options = async () => {
      try {
        const { data: agrupacion_documental_no_format } = await api.get(
          'transversal/choices/agrupacion-documental/'
        );
        const { data: tipo_unidad_no_format } = await api.get(
          'transversal/choices/tipo-unidad/'
        );

        const agrupacion_documental_format = textChoiseAdapter(
          agrupacion_documental_no_format
        );
        const tipo_unidad_format = textChoiseAdapter(tipo_unidad_no_format);

        set_option_agrupacion_d(
          agrupacion_documental_format.map((item: any) => ({
            ...item,
            isDisabled: false,
          }))
        );
        set_option_tipo_unidad(
          tipo_unidad_format.map((item: any) => ({
            ...item,
            isDisabled: false,
          }))
        );
      } catch (err) {
        //  console.log('')(err);
      }
    };
    void get_selects_options();
  }, []);

  // ------> Funciones <------ //

  // Funcion para actualizar un nivel
  const submit_nivel: SubmitHandler<FormValuesLevels> = (
    data: FormValuesLevels
  ) => {
    let new_niveles: FormValuesLevels[] = [];
    if (title_nivel === 'Agregar') {
      new_niveles = [
        ...levels_organigram,
        {
          id_organigrama: organigram_current?.id_organigrama,
          orden_nivel,
          nombre: data.nombre,
          id_nivel_organigrama: null,
        },
      ];
    } else {
      new_niveles = levels_organigram.map((item: any) => {
        return item.id_nivel_organigrama === data.id_nivel_organigrama
          ? { ...item, nombre: data.nombre }
          : item;
      });
      set_title_nivel('Agregar');
    }
    reset_nivel({
      nombre: '',
    });
    void dispatch(
      update_levels_service(
        organigram_current?.id_organigrama,
        new_niveles,
        setloadingLevels
      )
    );
  };

  // Vuelve a los valores iniciales
  const clean_unitys = (): void => {
    // //  console.log('')('datos unidades' , datos_unidades);
    reset_unidades({
      codigoExtra: '',
      activo: true,
      id_unidad_organizacional: '',
      unidad_raiz: {
        label: 'si',
        value: true,
      },
      codigo: '',
      nombre: '',
      tipo_unidad: {
        label: '',
        value: null,
        isDisabled: false,
      },
      nivel_unidad: {
        label: '',
        value: null,
        orden: '',
      },
      agrupacion_documental: {
        label: '',
        value: null,
        isDisabled: false,
      },
      nivel_padre: {
        label: '',
        value: null,
        id_nivel_organigrama: 0,
        isDisabled: false,
      },
    });
    // //  console.log('')('clean_unitys');
    set_title_unidades('Agregar');
  };

  // Funcion para actualizar un unidades
  //! ----------------

  const edit_unidad = ({
    codigo,
    nombre,
    activo,
    nivel_padre,
    tipo_unidad,
    agrupacion_documental,
    unidad_raiz,
    nivel_unidad,
    id_unidad_organizacional,
    codigoExtra,
  }: FormValuesUnitys) => {
    const newUnidad = {
      id_nivel_organigrama: nivel_unidad!.value!,
      nombre,
      codigo,
      activo,
      cod_tipo_unidad: tipo_unidad!.value,
      cod_agrupacion_documental: agrupacion_documental!.value === '' ? null : agrupacion_documental!.value,
      unidad_raiz: unidad_raiz!.value,
      id_organigrama: organigram_current?.id_organigrama,
      cod_unidad_org_padre: nivel_padre?.value ?? null,
      id_unidad_organizacional,
    };

    const newUnidades = unity_organigram.map((unidad: any) => {
      if (unidad.id_unidad_organizacional === id_unidad_organizacional) {
        return {
          ...newUnidad,
          cod_unidad_org_padre:
            unidad.cod_unidad_org_padre === codigoExtra
              ? codigo
              : unidad.cod_unidad_org_padre,
        };
      } else if (unidad.cod_unidad_org_padre === codigoExtra) {
        return {
          ...unidad,
          cod_unidad_org_padre: codigo,
        };
      } else {
        return unidad;
      }
    });

    set_title_unidades('Agregar');
    dispatch(
      update_unitys_service(
        organigram_current?.id_organigrama,
        newUnidades,
        clean_unitys,
        setloadingLevels,
        setDataloading
      )
    );
  };

  const create_unidad = ({
    activo,
    codigo,
    nombre,
    nivel_padre,
    tipo_unidad,
    agrupacion_documental,
    unidad_raiz,
    nivel_unidad,
  }: FormValuesUnitys) => {
    const newUnidad = {
      id_nivel_organigrama: nivel_unidad!.value!,
      nombre,
      codigo,
      cod_tipo_unidad: tipo_unidad!.value,
      cod_agrupacion_documental:
        agrupacion_documental!.value === ''
          ? null
          : agrupacion_documental!.value,
      unidad_raiz: unidad_raiz!.value,
      id_organigrama: organigram_current?.id_organigrama,
      cod_unidad_org_padre: nivel_padre?.value ?? null,
      activo: true,
    };
    //  console.log('')(newUnidad, 'newUnidad');

    const newUnidades = [...unity_organigram, newUnidad];
    console.log('nuevas unidade', newUnidades);
    set_title_unidades('Agregar');
    dispatch(
      update_unitys_service(
        organigram_current?.id_organigrama,
        newUnidades,
        clean_unitys,
        setloadingLevels,
        setDataloading
      )
    );
  };

  //* ------------------- FUNCIONES PARA ORGANIGRAMA ACTUAL ------------------- *//

  //! CREAR UNIDAD SIN AGRUPACION DOCUMENTAL
  const create_unidad_org_actual = ({
    codigo,
    nombre,
    nivel_padre,
    tipo_unidad,
    agrupacion_documental,
    unidad_raiz,
    nivel_unidad,
    activo,
  }: FormValuesUnitys) => {
    const newUnidad = {
      id_unidad_organizacional: null,
      id_nivel_organigrama: nivel_unidad!.value!,
      nombre,
      codigo,
      cod_tipo_unidad: tipo_unidad!.value,
      cod_agrupacion_documental:
        agrupacion_documental!.value === ' '
          ? null
          : agrupacion_documental!.value,
      unidad_raiz: unidad_raiz!.value,
      id_organigrama: organigram_current?.id_organigrama,
      cod_unidad_org_padre: nivel_padre?.value ?? null,
      activo: true,
    };
    console.log(newUnidad, 'newUnidad');
    const newUnidades = [...unity_organigram, newUnidad];

    set_title_unidades('Agregar');
    dispatch(
      update_unitys_service(
        organigram_current?.id_organigrama,
        newUnidades,
        clean_unitys,
        setloadingLevels,
        setDataloading
      )
    );
  };

  //! EDITAR UNIDAD - PROPIEDAD ACTIVO - ORGANIGRAMA ACTUAL (UNIDADES ORGANIZACIONALES SIN AGRUPACION DOCUMENTAL)

  const edit_prop_activo_unidad_org = (newObject: any) => {
    //  console.log('')(newObject, 'newObject');

    dispatch(
      update_unitys_service(
        organigram_current?.id_organigrama,
        newObject,
        clean_unitys,
        setloadingLevels,
        setDataloading
      )
    );
  };

  const on_grid_ready = (params: any): void => {
    // //  console.log('')(params, 'params');
  };

  // Funcion para eliminar un nivel
  const delete_level = (level_row: number): void => {
    const new_niveles = levels_organigram.filter(
      (nivel: any) => nivel.orden_nivel !== level_row
    );
    void dispatch(
      update_levels_service(
        organigram_current?.id_organigrama,
        new_niveles,
        setloadingLevels
      )
    );
  };

  // Funcion para eliminar una unidad
  const delete_unidades = (codigo_unidad: string): void => {
    const new_unidades = unity_organigram.filter(
      (unidad: any) => unidad.codigo !== codigo_unidad
    );
    void dispatch(
      update_unitys_service(
        organigram_current?.id_organigrama,
        new_unidades,
        clean_unitys,
        setloadingLevels,
        setDataloading
      )
    );
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onsubmit_edit_organigrama = async ({
    nombre,
    id_organigrama,
    version,
    descripcion,
    ruta_resolucion,
  }: any) => {
    const formData = new FormData();

    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('version', version);

    if (ruta_resolucion instanceof File) {
      formData.append('ruta_resolucion', ruta_resolucion);
    }

    dispatch(
      edit_organigrams_service(formData, id_organigrama, setLoadingEdicionOrgan)
    );
  };

  return {
    control_organigrama,
    errors_organigrama,
    handle_submit_organigrama,
    onsubmit_edit_organigrama,
    default_col_def_organigrama,

    columns_nivel,
    orden_nivel,
    title_nivel,
    errors_nivel,
    control_nivel,
    handle_submit_nivel,
    submit_nivel,

    option_raiz,
    option_nivel,
    options_tipo_unidad,
    option_unidad_padre,
    options_agrupacion_d,
    columns_unidades,
    errors_unidades,
    control_unidades,
    title_unidades,
    set_value_unidades,
    handle_submit_unidades,
    create_unidad,
    edit_unidad,
    edit_prop_activo_unidad_org,
    // submit_unidades,
    on_grid_ready,
    clean_unitys,

    control_organigrama_creacion,
    handle_submit,
    reset_creacion_organigrama,
    creacion_organigrama_values,

    loadingEdicionOrgan,
    create_unidad_org_actual,

    control_edit__value_activo,
    reset_edit_value_activo,
    edit_value_activo,
    loadingLevels,
    dataloading,
  };
};

// eslint-disable-next-line no-restricted-syntax
export default use_editar_organigrama;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function textChoiseAdapter(dataArray: string[]) {
  const data_new_format = dataArray.map((dataOld) => ({
    label: dataOld[1],
    value: dataOld[0],
  }));
  return data_new_format;
}
