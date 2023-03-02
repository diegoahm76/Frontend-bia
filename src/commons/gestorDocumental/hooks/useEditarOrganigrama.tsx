import { useEffect } from 'react';
import { Chip, Avatar, IconButton } from '@mui/material';
import { type GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
// Midleware - asincronicos
import {
  get_levels_service,
  get_unitys_service,
} from '../store/thunks/organigramThunks';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const use_editar_organigrama = () => {
  const dispatch = useAppDispatch();
  // Redux State Extraction
  const {
    organigram_current,
    // levels_organigram,
    // unity_organigram
  } = useAppSelector((state) => state.organigram);

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

  // useEffect para consultar los niveles y unidades
  useEffect(() => {
    if (organigram_current.id_organigrama != null)
      void dispatch(get_levels_service(organigram_current.id_organigrama));
    if (organigram_current.id_organigrama != null)
      void dispatch(get_unitys_service(organigram_current.id_organigrama));
  }, [organigram_current]);

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

  return {
    columns_nivel,
    columns_unidades,
  };
};

// eslint-disable-next-line no-restricted-syntax
export default use_editar_organigrama;
