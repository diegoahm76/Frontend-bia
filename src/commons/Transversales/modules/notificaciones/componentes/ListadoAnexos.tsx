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
import {
  set_metadata,
  initial_state_metadata,
  set_exhibit,
  set_exhibits,
  initial_state_exhibit,
} from '../../../../gestorDocumental/CentralDigitalizacion/store/slice/centralDigitalizacionSlice';
import MetadataFormDialog from '../../../../gestorDocumental/CentralDigitalizacion/componentes/CentralDigitalizacion/MetadataFormDialog';
import { IObjExhibit } from '../../../../gestorDocumental/CentralDigitalizacion/interfaces/central_digitalizacion';
import { v4 as uuid } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

import {
  control_error,
  get_anexos_notificacion,
  get_anexos_tarea,
} from '../store/thunks/notificacionesThunks';
import { DownloadButton } from '../../../../../utils/DownloadButton/DownLoadButton';
import { Title } from '../../../../../components/Title';
import React from 'react';
import FormButton from '../../../../../components/partials/form/FormButton';
interface IProps {
  control_form?: any | null;
  type?: string | null;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const ListadoAnexos = ({ type }: IProps) => {
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);

  const {
    exhibits,
    metadata,
    exhibit,
    storage_mediums,
    digitization_request,
    file_fisico,
    edit_digitization,
  } = useAppSelector((state) => state.central_digitalizacion_slice);
  const { notification_request, notification_per_request } = useAppSelector(
    (state) => state.notificaciones_slice
  );
  const {
    control: control_form,
    handleSubmit: handle_submit_exhibit,
    reset,
    getValues: get_values,
  } = useForm<IObjExhibit>();
  const [action, set_action] = useState<string>('Agregar');
  const [cual_medio_view, set_cual_medio_view] = useState<boolean>(false);
  const [file, set_file] = useState<any>(null);
  const [file_name, set_file_name] = useState<string>('');

  const [add_metadata_is_active, set_add_metadata_is_active] =
    useState<boolean>(false);

  useEffect(() => {
    if ((type ?? '') === 'soporte') {
      if (notification_per_request !== null) {
        if (
          notification_per_request.id_registro_notificacion_correspondencia !==
            null &&
          notification_per_request.anexos !== undefined
        ) {
          //dispatch(set_exhibits(notification_per_request.anexos));
          console.log(notification_per_request.anexos);
          dispatch(
            get_anexos_tarea(
              notification_per_request.id_registro_notificacion_correspondencia
            )
          );
        }
      }
    } else {
      if (notification_request !== null) {
        if (
          notification_request.id_notificacion_correspondencia !== null &&
          notification_request.anexos !== undefined
        ) {
          dispatch(
            get_anexos_notificacion(
              notification_request.id_notificacion_correspondencia
            )
          );
        }
      }
    }
  }, []);

  useEffect(() => {
    //  console.log('')(exhibit);
    reset(exhibit);

    if (exhibit.exhibit_link !== null && exhibit.exhibit_link !== undefined) {
      if (typeof exhibit.exhibit_link === 'string') {
        const name = exhibit.exhibit_link?.split('/').pop() ?? '';
        set_file_name(name);
      } else {
        if ('name' in exhibit.exhibit_link) {
          set_file_name(String(exhibit.exhibit_link.name ?? ''));
        }
      }
    } else {
      set_file_name('');

      if ((exhibit.metadatos?.archivo ?? null) !== null) {
        dispatch(
          set_exhibit({
            ...exhibit,
            exhibit_link: exhibit.metadatos?.archivo?.ruta_archivo ?? null,
          })
        );
      }
    }

    dispatch(
      set_metadata(
        {
          ...exhibit.metadatos,
          tiene_tipologia: exhibit.metadatos?.id_tipologia_doc !== null,
          observacion_digitalizacion: exhibit.observacion_digitalizacion,
        } ?? initial_state_metadata
      )
    );
  }, [exhibit]);

  useEffect(() => {
    if (file !== null) {
      if ('name' in file) {
        set_file_name(file.name);
        dispatch(
          set_exhibit({
            ...exhibit,
            nombre_anexo: get_values('nombre_anexo'),
            orden_anexo_doc: get_values('orden_anexo_doc'),
            cod_medio_almacenamiento: get_values('cod_medio_almacenamiento'),
            medio_almacenamiento_otros_cual: get_values(
              'medio_almacenamiento_otros_cual'
            ),
            numero_folios: get_values('numero_folios'),
            ya_digitalizado: exhibit?.ya_digitalizado,
            // ya_digitalizado: metadata?.asunto ?? null !== null ? true : false,
            exhibit_link: file,
            metadatos:
              exhibit.id_anexo === null
                ? metadata.asunto ?? null !== null
                  ? metadata
                  : null
                : metadata,
          })
        );
      }
    }
  }, [file]);

  useEffect(() => {
    if (file_fisico !== null) {
      if ('name' in file_fisico) {
        set_file_name(file_fisico.name);
        dispatch(
          set_exhibit({
            ...exhibit,
            nombre_anexo: get_values('nombre_anexo'),
            orden_anexo_doc: get_values('orden_anexo_doc'),
            cod_medio_almacenamiento: get_values('cod_medio_almacenamiento'),
            medio_almacenamiento_otros_cual: get_values(
              'medio_almacenamiento_otros_cual'
            ),
            numero_folios: 1,
            // ya_digitalizado: metadata?.asunto ?? null !== null ? true : false,
            ya_digitalizado: exhibit?.ya_digitalizado,
            exhibit_link: file_fisico,
            metadatos:
              exhibit.id_anexo === null
                ? metadata.asunto ?? null !== null
                  ? metadata
                  : null
                : metadata,
          })
        );
      }
    }
  }, [file_fisico]);

  const add_metadata_form = (): void => {
    const nombre_anexo = get_values('nombre_anexo') ?? '';
    const medio_almacenamiento_otros_cual =
      get_values('medio_almacenamiento_otros_cual') ?? '';
    const cod_medio_almacenamiento =
      get_values('cod_medio_almacenamiento') ?? '';
    if (nombre_anexo !== '' && cod_medio_almacenamiento !== '') {
      if (cod_medio_almacenamiento === 'Ot') {
        if (medio_almacenamiento_otros_cual !== '') {
          set_add_metadata_is_active(true);
        } else {
          control_error('Debe ingresar el nombre del medio de almacenamiento');
        }
      } else {
        set_add_metadata_is_active(true);
      }
    } else {
      control_error(
        'Debe ingresar el nombre del anexo y el medio de almacenamiento'
      );
    }
  };
  const [selectedExhibit, setSelectedExhibit] = React.useState(null);

  const selectExhibit = (rowData: any) => {
    setSelectedExhibit(rowData);
  };

  const handleClick = () => {
    console.log(selectedExhibit);
  };

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
                    fileName={'exhibit_link'}
                    condition={false}
                  />
                </Grid>
              </Tooltip>
            )}
        </>
      ),
    },
    {
      field: 'nombre_anexo',
      headerName: 'Nombre',
      width: 250,
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
    // {
    //   field: 'nombre_medio_almacenamiento',
    //   headerName: 'Medio de almacenamiento',
    //   width: 200,
    //   renderCell: (params) => (
    //     <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
    //       {params.value}
    //     </div>
    //   ),
    // },
    {
      field: 'ya_digitalizado',
      headerName: 'Digitalizado',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value ? 'SI' : 'NO'}
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
  ];

  const select_exhibit = (item: IObjExhibit): void => {
    set_action('editar');
    dispatch(set_exhibit(item));
  };

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          direction="row"
          marginTop={2}
        >
          <Box sx={{ width: '80%' }}>
            <Grid item xs={12} marginY={2}>
              <Title title="Listado de anexos"></Title>
              {/* <button onClick={handleClick}>Mostrar Digitalizado</button> */}
            </Grid>
            <Grid item xs={12} md={12} marginTop={2}>
              <DataGrid
                density="compact"
                autoHeight
                rows={exhibits}
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
            {type !== 'soporte' &&
              notification_request?.id_persona_asignada ===
                userinfo.id_persona &&
              notification_request?.estado_solicitud !== 'NT' && (
                <Grid item xs={12} md={3}>
                  <FormButton
                    disabled={notification_request?.estado_solicitud === 'NT'}
                    href={`/#/app/transversal/notificaciones/generador_documentos/generar/`}
                    variant_button="outlined"
                    on_click_function={null}
                    icon_class={null}
                    label={'Generar documento'}
                    type_button="button"
                    color_button="primary"
                  />
                </Grid>
              )}
          </Box>
        </Grid>
        {exhibit.id_anexo !== null && (
          <PrimaryForm
            on_submit_form={null}
            button_submit_label={action}
            button_submit_icon_class={null}
            button_submit_type={'button'}
            button_submit_function={null}
            show_button={false}
            form_inputs={[
              {
                datum_type: 'title',
                title_label: `Anexo - ${exhibit.nombre_anexo}`,
              },
              {
                datum_type: 'input_file_controller',
                xs: 12,
                md: 6,
                control_form: control_form,
                control_name: 'exhibit_link',
                default_value: '',
                rules: {
                  required_rule: { rule: true, message: 'Archivo requerido' },
                },
                label: 'Documento',
                disabled:
                  exhibit.metadatos?.cod_origen_archivo === 'F' ||
                  !edit_digitization,
                helper_text: '',
                set_value: set_file,
                file_name,
                value_file:
                  (exhibit.id_anexo ?? null) !== null
                    ? exhibit.exhibit_link ?? null
                    : null,
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 6,
                control_form: control_form,
                control_name: 'nombre_anexo',
                default_value: '',
                rules: {},
                label: 'Nombre de archivo',
                type: 'text',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'select_controller',
                xs: 12,
                md: 3,
                control_form: control_form,
                control_name: 'cod_medio_almacenamiento',
                default_value: '',
                rules: {},
                label: 'Medio de almacenamiento',
                disabled: true,
                helper_text: '',
                select_options: storage_mediums,
                option_label: 'label',
                option_key: 'key',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_form,
                control_name: 'medio_almacenamiento_otros_cual',
                default_value: '',
                rules: {},
                label: '¿Cual?',
                type: 'text',
                disabled: true,
                helper_text: '',
                hidden_text: !(
                  (exhibit.cod_medio_almacenamiento ?? null) === 'Ot'
                ),
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_form,
                control_name: 'numero_folios',
                default_value: '',
                rules: {},
                label: 'Número de folios',
                type: 'number',
                disabled: true,
                helper_text: '',
                step_number: '1',
              },
              {
                datum_type: 'button',
                xs: 12,
                md: 3,
                label: 'Agregar metadatos',
                type_button: 'button',
                disabled: false,
                variant_button: 'contained',
                on_click_function: add_metadata_form,
                color_button: 'warning',
              },
            ]}
          />
        )}
        <MetadataFormDialog
          is_modal_active={add_metadata_is_active}
          set_is_modal_active={set_add_metadata_is_active}
          get_values_anexo={get_values}
          selectedExhibit={selectedExhibit}
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default ListadoAnexos;
