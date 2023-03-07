import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
// Componentes de material UI
import { Chip, Avatar, IconButton } from '@mui/material';
import { type GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// Interfaces
import {
  // type IObjLevels as FormValuesLevels,
  // type FormValuesUnitys,
  // type IDocumentaryGroup,
  // type ILevelFather,
  // type ILevelUnity,
  type IObjCreateOrganigram as FormValuesOrganigram,
  // type ITypeUnity,
} from '../interfaces/organigrama';
// Hooks
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
// Midleware - asincronicos
import {
  get_levels_service,
  get_unitys_service,
  get_mold_organigrams_service,
  edit_organigrams_service,
} from '../store/thunks/organigramThunks';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const use_editar_organigrama = () => {
  const dispatch = useAppDispatch();
  // Redux State Extraction
  const {
    organigram_current,
    // levels_organigram,
    unity_organigram,
  } = useAppSelector((state) => state.organigram);

  // ------> Use State <------ //

  //   const [orden_nivel, set_orden_nivel] = useState<number>(0);
  //   const [title_nivel, set_title_nivel] = useState<string>('Agregar');
  //   const [title_unidades, set_title_unidades] =
  //     useState<string>('Agregar Unidades');
  //   const [option_nivel, set_option_nivel] = useState<ILevelUnity[]>([
  //     {
  //       label: '',
  //       value: '',
  //       orden: '',
  //     },
  //   ]);
  //   const [option_unidad_padre, set_option_unidad_padre] = useState<
  //     ILevelFather[]
  //   >([
  //     {
  //       label: '',
  //       value: '',
  //       id_nivel_organigrama: 0,
  //       isDisabled: false,
  //     },
  //   ]);
  //   const [options_tipo_unidad, set_option_tipo_unidad] = useState<ITypeUnity[]>([
  //     {
  //       label: '',
  //       value: null,
  //       isDisabled: false,
  //     },
  //   ]);
  //   const [options_agrupacion_d, set_option_agrupacion_d] = useState<
  //     IDocumentaryGroup[]
  //   >([]);
  //   const option_raiz = [
  //     { label: 'Si', value: true },
  //     { label: 'No', value: false },
  //   ];
  //   const initial_state_levels: FormValuesLevels = {
  //     id_nivel_organigrama: '',
  //     id_organigrama: '',
  //     orden_nivel: 0,
  //     nombre: '',
  //   };
  //   // Estado Inicial de las unidades
  //   const initial_state_unitys: FormValuesUnitys = {
  //     unidad_raiz: {
  //       label: 'si',
  //       value: true,
  //     },
  //     codigo: '',
  //     nombre: '',
  //     tipo_unidad: {
  //       label: '',
  //       value: null,
  //       isDisabled: false,
  //     },
  //     nivel_unidad: {
  //       label: '',
  //       value: null,
  //       orden: '',
  //     },
  //     agrupacion_documental: {
  //       label: '',
  //       value: null,
  //       isDisabled: false,
  //     },
  //     nivel_padre: {
  //       label: '',
  //       value: null,
  //       id_nivel_organigrama: 0,
  //       isDisabled: false,
  //     },
  //   };

  // ------> useForm <------ //

  //  Organigrama
  const {
    control: control_organigrama,
    handleSubmit: handle_submit_organigrama,
    reset: reset_organigrama,
    formState: { errors: errors_organigrama },
  } = useForm<FormValuesOrganigram>();

  // useForm Nivel
  // const {
  //   control: control_nivel,
  //   handleSubmit: handle_submit_nivel,
  //   reset: reset_nivel,
  //   formState: { errors: errors_nivel },
  // } = useForm<FormValuesLevels>({ defaultValues: initial_state_levels });

  // useForm Unidades
  // const {
  //   control: control_unidades,
  //   handleSubmit: handle_submit_unidades,
  //   // register: register_unidades,
  //   reset: reset_unidades,
  //   watch: watch_unidades,
  //   setValue: set_value_unidades,
  //   formState: { errors: errors_unidades },
  // } = useForm<FormValuesUnitys>({ defaultValues: initial_state_unitys });
  // const datos_unidades = watch_unidades();

  // Colums

  const columns_nivel: GridColDef[] = [
    { headerName: 'Nivel', field: 'orden_nivel', minWidth: 100 },
    { headerName: 'Nombre', field: 'nombre', minWidth: 200 },
    {
      headerName: 'Acciones',
      field: 'editar',
      minWidth: 140,
      renderCell: (params: {
        row: {
          orden_nivel: number;
        };
      }) => (
        <>
          <IconButton
            onClick={() => {
              //   set_title_nivel('Editar');
              //   set_orden_nivel(params.row.orden_nivel);
              //   reset_nivel(params.row);
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
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
          <IconButton
          // className={`${
          //   // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          //   params.row.orden_nivel !==
          //     levels_organigram[levels_organigram.length - 1].orden_nivel &&
          //   'd-none'
          // }`}
          // style={{ border: 'none', background: 'none' }}
          // type="button"
          // title="Eliminar"
          // onClick={() => {
          //   delete_level(params.row.orden_nivel);
          // }}
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
                sx={{ color: 'red', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];
  const columns_unidades: GridColDef[] = [
    { headerName: 'Código', field: 'codigo', minWidth: 100, maxWidth: 100 },
    { headerName: 'Nombre', field: 'nombre', minWidth: 250 },
    {
      headerName: 'Tipo unidad',
      field: 'cod_tipo_unidad',
      minWidth: 130,
      maxWidth: 130,
    },
    {
      headerName: 'Agrupacion documental',
      field: 'cod_agrupacion_documental',
      minWidth: 200,
      maxWidth: 200,
      valueFormatter: (params) => {
        // eslint-disable-next-line no-extra-boolean-cast
        if (!Boolean(params.value)) {
          return 'N/A'; // o cualquier otro valor predeterminado que desee mostrar
        }
        return params.value;
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
      headerName: 'Acciones',
      field: 'editar',
      minWidth: 140,
      maxWidth: 140,
      renderCell: (params: {
        row: {
          unidad_raiz: boolean;
          codigo: any;
          nombre: any;
          cod_tipo_unidad: string | null | undefined;
          id_nivel_organigrama: string | number | null;
          cod_agrupacion_documental: string | null;
        };
      }) => (
        <>
          <IconButton
            onClick={() => {
              // reset_unidades({
              //   unidad_raiz: {
              //     label: option_raiz.filter(
              //       (item) => item.value === params.row.unidad_raiz
              //     )[0].label,
              //     value: params.row.unidad_raiz,
              //   },
              //   codigo: params.row.codigo,
              //   nombre: params.row.nombre,
              //   tipo_unidad: {
              //     label: options_tipo_unidad.filter(
              //       (tipo) => tipo.value === params.row.cod_tipo_unidad
              //     )[0].label,
              //     value: params.row.cod_tipo_unidad,
              //     isDisabled: false,
              //   },
              //   nivel_unidad: {
              //     label: option_nivel.filter(
              //       (nivel) => nivel.value === params.row.id_nivel_organigrama
              //     )[0].label,
              //     value: params.row.id_nivel_organigrama,
              //     orden: option_nivel.filter(
              //       (nivel) => nivel.value === params.row.id_nivel_organigrama
              //     )[0].orden,
              //   },
              //   agrupacion_documental: {
              //     label: params.row.cod_agrupacion_documental
              //       ? options_agrupacion_d.filter(
              //           (agrupacion) =>
              //             agrupacion.value ===
              //             params.row.cod_agrupacion_documental
              //         )[0].label
              //       : '',
              //     value: params.row.cod_agrupacion_documental,
              //     isDisabled: false,
              //   },
              //   nivel_padre: {
              //     label: params.row.nombre,
              //     value: params.row.codigo,
              //   },
              // });
              // set_title_unidades('Editar Unidad');
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
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
          <IconButton
            onClick={() => {
              // delete_unidades(params.row.codigo);
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
                sx={{ color: 'red', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];

  // UseEffects

  // ueeEffect para obtener el organigrama a editar
  useEffect(() => {
    reset_organigrama(organigram_current);
  }, [organigram_current]);

  // useEffect para consultar los niveles y unidades
  useEffect(() => {
    if (organigram_current.id_organigrama != null)
      void dispatch(get_levels_service(organigram_current.id_organigrama));
    if (organigram_current.id_organigrama != null)
      void dispatch(get_unitys_service(organigram_current.id_organigrama));
  }, [organigram_current]);

  // useEffect para obtener el MoldOrganigram (jerarquia de niveles & unidades)
  useEffect(() => {
    void dispatch(
      get_mold_organigrams_service(organigram_current.id_organigrama)
    );
  }, [unity_organigram]);

  // useEffect(() => {
  //   set_orden_nivel(levels_organigram.length + 1);
  //   set_option_nivel(
  //     levels_organigram.map((item) => ({
  //       label: item.nombre,
  //       value: item.id_nivel_organigrama,
  //       orden: item.orden_nivel,
  //     }))
  //   );
  // }, [levels_organigram]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onsubmit_edit_organigrama = async ({
    nombre,
    id_organigrama,
    version,
    descripcion,
  }: any) => {
    const obj: FormValuesOrganigram = {
      nombre,
      descripcion,
      version,
    };
    await dispatch(edit_organigrams_service(obj, id_organigrama));
  };

  return {
    columns_nivel,
    columns_unidades,
    //     control_unidades,
    // default_col_def_organigrama,
    // errors_nivel,
    errors_organigrama,
    // errors_unidades,
    // option_nivel,
    // option_raiz,
    // options_agrupacion_d,
    // options_tipo_unidad,
    // option_unidad_padre,
    // orden_nivel,
    // title_nivel,
    // // Edita States

    // // Functions
    control_organigrama,
    handle_submit_organigrama,
    onsubmit_edit_organigrama,

    // // handle_submit_nivel,
    // // register_nivel,
    // // submit_nivel,

    // // handle_submit_unidades,
    // // register_unidades,
    // // set_value_unidades,
    // // submit_unidades,

    // // on_grid_ready,
  };
};

// eslint-disable-next-line no-restricted-syntax
export default use_editar_organigrama;
