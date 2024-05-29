/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from 'react';
import { api } from '../../../../../api/axios';
import { type Persona } from '../../../../../interfaces/globalModels';
import { useForm } from 'react-hook-form';
import { Avatar, Box, Grid, IconButton, Tooltip } from '@mui/material';
import BuscarModelo from '../../../../../components/partials/getModels/BuscarModelo';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../../auth/interfaces';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';

import PrimaryForm from '../../../../../components/partials/form/PrimaryForm';

import { v4 as uuid } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  control_error,
  get_anexos_tarea,
  get_anexos_tarea_aux,
  get_causas_notificacion,
  get_tipos_soporte,
} from '../store/thunks/notificacionesThunks';
import { DownloadButton } from '../../../../../utils/DownloadButton/DownLoadButton';
import { IObjSoporte } from '../interfaces/notificaciones';
import { set_soporte, set_soportes } from '../store/slice/notificacionesSlice';
interface IProps {
  control_form: any | null;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const StepTwo = () => {
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const { representacion_legal } = useAppSelector((state) => state.auth);
  const {
    soportes,
    soporte,
    causas_notificacion,
    tipos_soporte,
    notification_per_request,
    notification_request,
  } = useAppSelector((state) => state.notificaciones_slice);
  const {
    control: control_form,
    handleSubmit: handle_submit_soporte,
    reset,
    getValues: get_values,
    watch,
  } = useForm<IObjSoporte>();
  const [action, set_action] = useState<string>('Agregar');

  const [file_name, set_file_name] = useState<string>('');
  const [selected_image_aux, set_selected_image_aux] = useState<any>(null);
  const [file, set_file] = useState<any>(null);
  const [add_metadata_is_active, set_add_metadata_is_active] =
    useState<boolean>(false);
  const [cual_medio_view, set_cual_medio_view] = useState<boolean>(false);

  useEffect(() => {
    void dispatch(get_tipos_soporte());
    void dispatch(get_causas_notificacion());
    void dispatch(
      get_anexos_tarea_aux(
        notification_per_request?.id_registro_notificacion_correspondencia
      )
    );
  }, []);

  const on_submit_soporte = (data: IObjSoporte): void => {
    //  console.log('')(data, metadata);
    const soporte_aux: IObjSoporte | undefined = soportes.find(
      (p: IObjSoporte) => p.nombre_anexo === data.nombre_anexo
    );
    if (soporte_aux === undefined) {
      //  console.log('')(data);
      dispatch(
        set_soportes([
          ...soportes,
          {
            ...data,
          },
        ])
      );
      dispatch(
        set_soporte({
          id_anexo: null,
          id_causa_o_anomalia: null,
          id_tipo_anexo: null,
          numero_folios: null,
          nombre_anexo: null,
          ruta_archivo: null,
          observaciones: null,
        })
      );
      set_file(null);
      set_file_name('');
      set_action('agregar');
    } else {
      control_error(`Ya existe un archivo con este nombre`);
    }
  };

  useEffect(() => {
    reset(soporte ?? {});
    if ((soporte?.id_anexo ?? null) !== null) {
      if (
        soporte?.ruta_archivo !== null &&
        soporte?.ruta_archivo !== undefined
      ) {
        if (typeof soporte?.ruta_archivo === 'string') {
          const name = soporte?.ruta_archivo?.split('/').pop() ?? '';
          set_file_name(soporte?.ruta_archivo);
        }
        // else {
        //   if ('name' in soporte?.ruta_archivo) {
        //     set_file_name('');
        //   }
        // }
      }
      // else {
      //   dispatch(
      //     set_soporte({
      //       ...soporte,
      //       ruta_archivo: soporte?.ruta_archivo ?? null,
      //     })
      //   );
      // }
    } else {
      if (
        soporte?.ruta_archivo !== null &&
        soporte?.ruta_archivo !== undefined
      ) {
        if (typeof soporte?.ruta_archivo === 'string') {
          const name = soporte?.ruta_archivo?.split('/').pop() ?? '';
          set_file_name(soporte?.ruta_archivo);
        }
        // else {
        //   if ('name' in soporte?.ruta_archivo) {
        //     //set_file_name('');
        //     set_file_name(String(soporte?.ruta_archivo ?? ''));
        //   }
        // }
      }
    }
  }, [soporte]);

  useEffect(() => {
    if (file !== null) {
      if ('name' in file) {
        console.log(file);
        set_file_name(file.name);
        dispatch(
          set_soporte({
            ...soporte,
            id_tipo_anexo: get_values('id_tipo_anexo'),
            link_publicacion: get_values('link_publicacion'),
            id_causa_o_anomalia: get_values('id_causa_o_anomalia'),
            fecha_registro: get_values('fecha_registro'),
            nombre_anexo: get_values('nombre_anexo'),
            numero_folios: get_values('numero_folios'),
            observaciones: get_values('observaciones'),
            ruta_archivo: file,
          })
        );
      }
    }
  }, [file]);

  // useEffect(() => {
  //   if (file_fisico !== null) {
  //     if ('name' in file_fisico) {
  //       set_file_name(file_fisico.name);
  //       dispatch(
  //         set_soporte({
  //           ...soporte,
  //           id_tipo_anexo: get_values('id_tipo_anexo'),
  //           link_publicacion: get_values('link_publicacion'),
  //           id_causa_o_anomalia: get_values('id_causa_o_anomalia'),
  //           fecha_registro: get_values(
  //             'fecha_registro'
  //           ),
  //           numero_folios: 1,
  //           ya_digitalizado: metadata?.asunto ?? null !== null ? true : false,
  //           ruta_archivo: file_fisico,
  //           metadatos:
  //             soporte.id_anexo === null
  //               ? metadata.asunto ?? null !== null
  //                 ? metadata
  //                 : null
  //               : metadata,
  //         })
  //       );
  //     }
  //   }
  // }, [file_fisico]);

  // const add_metadata_form = (): void => {
  //   const id_tipo_anexo = get_values('id_tipo_anexo') ?? '';
  //   const fecha_registro =
  //     get_values('fecha_registro') ?? '';
  //   const id_causa_o_anomalia =
  //     get_values('id_causa_o_anomalia') ?? '';
  //   if (id_tipo_anexo !== '' && id_causa_o_anomalia !== '') {
  //     if (id_causa_o_anomalia === 'Ot') {
  //       if (fecha_registro !== '') {
  //         set_add_metadata_is_active(true);
  //       } else {
  //         control_error('Debe ingresar el nombre del medio de almacenamiento');
  //       }
  //     } else {
  //       set_add_metadata_is_active(true);
  //     }
  //   } else {
  //     control_error(
  //       'Debe ingresar el nombre del anexo y el medio de almacenamiento'
  //     );
  //   }
  // };

  const columns_list: GridColDef[] = [
    {
      field: 'descargar',
      headerName: 'Ver',
      width: 90,
      renderCell: (params) => (
        <>
          {(params.row.ruta_archivo ?? null) !== '' &&
            (params.row.ruta_archivo ?? null) !== null &&
            typeof (params.row.ruta_archivo ?? null) === 'string' && (
              <Tooltip title="Ver archivo">
                <Grid item xs={0.5} md={0.5}>
                  <DownloadButton
                    fileUrl={params.row.ruta_archivo}
                    fileName={'ruta_archivo'}
                    condition={false}
                  />
                </Grid>
              </Tooltip>
            )}
        </>
      ),
    },
    {
      field: 'id_tipo_anexo',
      headerName: 'Tipo de anexo',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {tipos_soporte?.find(
            (p) =>
              p.id_tipo_anexo_soporte === params.value ||
              p.id_tipo_anexo_soporte === params.row.id_tipo_documento_anexo
          )?.nombre ?? ''}
        </div>
      ),
    },
    {
      field: 'id_causa_o_anomalia',
      headerName: 'Causa o anomalia',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {causas_notificacion?.find(
            (p) => p.id_causa_o_anomalia === params.value
          )?.nombre ?? ''}
        </div>
      ),
    },
    {
      field: 'nombre_anexo',
      headerName: 'Nombre',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'numero_folios',
      headerName: 'Cantidad de folios',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value ?? params.row.nro_folios}
        </div>
      ),
    },
    {
      field: 'observaciones',
      headerName: 'Observación',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },

    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 90,
      renderCell: (params) => (
        <>
          {params.row.id_anexo === null && (
            <Tooltip title="Editar">
              <IconButton
                onClick={() => {
                  edit_soporte(params.row);
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
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          )}
          {params.row.id_anexo === null && (
            <Tooltip title="Borrar">
              <IconButton
                onClick={() => {
                  delete_soporte(params.row);
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
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          )}
        </>
      ),
    },
  ];

  const edit_soporte = (item: IObjSoporte): void => {
    set_action('editar');
    dispatch(set_soporte(item));
    const aux_items: IObjSoporte[] = [];
    soportes.forEach((option: IObjSoporte) => {
      if (option.id_tipo_anexo !== item.id_tipo_anexo) {
        aux_items.push(option);
      }
    });
    dispatch(set_soportes(aux_items));
  };

  const delete_soporte = (item: IObjSoporte): void => {
    dispatch(
      set_soporte({
        id_anexo: null,
        id_causa_o_anomalia: null,
        id_tipo_anexo: null,
        nombre_anexo: null,
        numero_folios: null,
        ruta_archivo: null,
        observaciones: null,
      })
    );
    set_file(null);
    set_file_name('');
    set_action('agregar');
    const aux_items: IObjSoporte[] = [];
    soportes.forEach((option: IObjSoporte) => {
      if (option.id_tipo_anexo !== item.id_tipo_anexo) {
        aux_items.push(option);
      }
    });
    //  console.log('')(aux_items);
    dispatch(set_soportes(aux_items));
  };

  const on_change_select = (value: any, name: string): void => {
    if (name === 'id_causa_o_anomalia') {
      if (value !== undefined) {
        if (value.key === 'Ot') {
          set_cual_medio_view(true);
        } else {
          set_cual_medio_view(false);
        }
      }
    }
  };

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <PrimaryForm
          on_submit_form={null}
          button_submit_label={action}
          button_submit_icon_class={null}
          button_submit_type={'button'}
          button_submit_function={handle_submit_soporte(on_submit_soporte)}
          form_inputs={[
            {
              datum_type: 'title',
              title_label: 'Soportes',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_form,
              control_name: 'id_tipo_anexo',
              default_value: '',
              rules: {
                required_rule: { rule: false, message: 'Requerido' },
              },
              label: 'Tipo de anexo',
              disabled: false,
              helper_text: '',
              select_options: tipos_soporte?.filter(
                (objeto: any) =>
                  objeto.id_tipo_notificacion_correspondencia ===
                  notification_per_request?.id_tipo_notificacion_correspondencia
              ),
              option_label: 'nombre',
              option_key: 'id_tipo_anexo_soporte',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_form,
              control_name: 'id_causa_o_anomalia',
              default_value: '',
              rules: {
                required_rule: { rule: false, message: 'Requerido' },
              },
              label: 'Causa o anomalia',
              disabled: false,
              helper_text: '',
              select_options: causas_notificacion?.filter(
                (objeto: any) =>
                  objeto.id_tipo_notificacion_correspondencia ===
                  notification_per_request?.id_tipo_notificacion_correspondencia
              ),
              option_label: 'nombre',
              option_key: 'id_causa_o_anomalia',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_form,
              control_name: 'nombre_anexo',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Requerido' },
              },
              label: 'Nombre',
              type: 'text',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'date_picker_controller',
              xs: 12,
              md: 2,
              control_form: control_form,
              control_name: 'fecha_soporte',
              default_value: new Date(),
              rules: {},
              label: 'Fecha de soporte',
              disabled: true,
              helper_text: '',
              format: 'YYYY-MM-DD',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_form,
              control_name: 'numero_folios',
              default_value: '',
              rules: {
                required_rule: { rule: false, message: 'Requerido' },
                min_rule: { rule: 0, message: 'el valor minimo debe ser 0' },
              },
              label: 'Número de folios',
              type: 'number',
              disabled: false,
              helper_text: '',
              step_number: '1',
            },

            {
              datum_type: 'input_file_controller',
              xs: 12,
              md: 6,
              control_form: control_form,
              control_name: 'ruta_archivo',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Archivo requerido' },
              },
              label: 'Documento soporte',
              disabled: false,
              helper_text: '',
              set_value: set_file,
              file_name: file_name,
              // value_file:
              //   (soporte?.id_anexo ?? null) !== null
              //     ? soporte?.ruta_archivo ?? null
              //     : null,
            },
            // {
            //   datum_type: 'image_uploader',
            //   xs: 12,
            //   md: 4,
            //   margin: 0,
            //   selected_image: selected_image_aux,
            //   width_image: '150px',
            //   height_image: 'auto',
            // },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 12,
              control_form: control_form,
              control_name: 'observaciones',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Observación',
              disabled: false,
              helper_text: '',
              multiline_text: true,
              rows_text: 4,
            },

            // {
            //   datum_type: 'button',
            //   xs: 12,
            //   md: 3,
            //   label: 'Agregar metadatos',
            //   type_button: 'button',
            //   disabled: false,
            //   variant_button: 'contained',
            //   on_click_function: add_metadata_form,
            //   color_button: 'warning',
            //   hidden_text: representacion_legal?.tipo_sesion === 'E',
            // },
          ]}
        />
        <Grid
          container
          spacing={2}
          justifyContent="center"
          direction="row"
          marginTop={2}
        >
          <Box sx={{ width: '80%' }}>
            <Grid item xs={12} md={12} marginTop={2}>
              <DataGrid
                density="compact"
                autoHeight
                rows={soportes}
                columns={columns_list}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) =>
                  row.id_anexo ?? null === null
                    ? uuid()
                    : row.id_anexo ?? uuid()
                }
              />
            </Grid>
          </Box>
        </Grid>
        {/* <MetadataFormDialog
          is_modal_active={add_metadata_is_active}
          set_is_modal_active={set_add_metadata_is_active}
          get_values_anexo={get_values}
        /> */}
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default StepTwo;
