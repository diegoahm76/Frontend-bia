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
  set_type_applicant,
  set_on_behalf_of,
  initial_state_person,
  initial_state_company,
  set_attorney,
  set_person,
  set_company,
  set_grantor,
  set_pqrs,
  set_pqr_status,
  set_metadata,
  initial_state_metadata,
  set_exhibit,
  set_exhibits,
  initial_state_exhibit,
} from '../../store/slice/pqrsdfSlice';
import MetadataFormDialog from './MetadataFormDialog';
import { IObjExhibit } from '../../interfaces/pqrsdf';
import { v4 as uuid } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  control_error,
  get_storage_mediums_service,
} from '../../store/thunks/pqrsdfThunks';
import { DownloadButton } from '../../../../../utils/DownloadButton/DownLoadButton';
interface IProps {
  control_form?: any | null;
  flag_metadata?: boolean | null;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const StepTwo = ({ flag_metadata }: IProps) => {
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const { representacion_legal } = useAppSelector((state) => state.auth);
  const {
    exhibits,
    metadata,
    exhibit,
    storage_mediums,
    type_applicant,
    file_fisico,
  } = useAppSelector((state) => state.pqrsdf_slice);
  const {
    control: control_form,
    handleSubmit: handle_submit_exhibit,
    reset,
    getValues: get_values,
    watch,
  } = useForm<IObjExhibit>();
  const [action, set_action] = useState<string>('Agregar');

  const [file, set_file] = useState<any>(null);
  const [file_name, set_file_name] = useState<string>('');
  const [add_metadata_is_active, set_add_metadata_is_active] =
    useState<boolean>(false);
  const [cual_medio_view, set_cual_medio_view] = useState<boolean>(false);
  useEffect(() => {
    void dispatch(get_storage_mediums_service());
  }, []);

  const on_submit_exhibit = (data: IObjExhibit): void => {
    //  console.log('')(data, metadata);
    const exhibit_aux: IObjExhibit | undefined = exhibits.find(
      (p: IObjExhibit) => p.nombre_anexo === data.nombre_anexo
    );
    if (exhibit_aux === undefined) {
      //  console.log('')(data);
      dispatch(
        set_exhibits([
          ...exhibits,
          {
            ...data,
            metadatos:
              data.id_anexo === null
                ? metadata.asunto ?? null !== null
                  ? metadata
                  : null
                : metadata,
          },
        ])
      );
      dispatch(set_exhibit(initial_state_exhibit));
      set_file(null);
      set_file_name('');
      set_action('agregar');
    } else {
      control_error(`Ya existe un archivo con nombre ${data.nombre_anexo}`);
    }
  };

  useEffect(() => {
    //  console.log('')(exhibit);
    reset({
      ...exhibit,
      cod_medio_almacenamiento:
        representacion_legal?.tipo_sesion === 'E'
          ? 'Na'
          : exhibit.cod_medio_almacenamiento,
    });
    if ((exhibit.id_anexo ?? null) !== null) {
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
        dispatch(
          set_exhibit({
            ...exhibit,
            exhibit_link: exhibit.metadatos?.archivo?.ruta_archivo ?? null,
          })
        );
      }
    } else {
      if (exhibit.exhibit_link !== null && exhibit.exhibit_link !== undefined) {
        if (typeof exhibit.exhibit_link === 'string') {
          const name = exhibit.exhibit_link?.split('/').pop() ?? '';
          set_file_name(name);
        } else {
          if ('name' in exhibit.exhibit_link) {
            set_file_name(String(exhibit.exhibit_link.name ?? ''));
          }
        }
      }
    }
    dispatch(set_metadata(exhibit.metadatos ?? initial_state_metadata));
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
            medio_almacenamiento: get_values('medio_almacenamiento'),
            cod_medio_almacenamiento: get_values('cod_medio_almacenamiento'),
            medio_almacenamiento_otros_cual: get_values(
              'medio_almacenamiento_otros_cual'
            ),
            numero_folios: get_values('numero_folios'),
            ya_digitalizado: metadata?.asunto ?? null !== null ? true : false,
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
            medio_almacenamiento: get_values('medio_almacenamiento'),
            cod_medio_almacenamiento: get_values('cod_medio_almacenamiento'),
            medio_almacenamiento_otros_cual: get_values(
              'medio_almacenamiento_otros_cual'
            ),
            numero_folios: 1,
            ya_digitalizado: metadata?.asunto ?? null !== null ? true : false,
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

  const columns_list: GridColDef[] = [
    {
      field: 'descargar',
      headerName: 'Ver',
      width: 90,
      renderCell: (params) => (
        <>
          {(params.row.metadatos?.archivo?.ruta_archivo ?? null) !== '' &&
            (params.row.metadatos?.archivo?.ruta_archivo ?? null) !== null &&
            typeof (params.row.metadatos?.archivo?.ruta_archivo ?? null) ===
              'string' && (
              <Tooltip title="Ver archivo">
                <Grid item xs={0.5} md={0.5}>
                  <DownloadButton
                    fileUrl={params.row.metadatos.archivo.ruta_archivo}
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
          {params.value}
        </div>
      ),
    },
    {
      field: 'cod_medio_almacenamiento',
      headerName: 'Medio de almacenamiento',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {storage_mediums.find((p) => p.key === params.value)?.label ?? ''}
        </div>
      ),
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 90,
      renderCell: (params) => (
        <>
          <Tooltip title="Editar">
            <IconButton
              onClick={() => {
                edit_exhibit(params.row);
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
          </Tooltip>

          <Tooltip title="Borrar">
            <IconButton
              onClick={() => {
                delete_exhibit(params.row);
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
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const edit_exhibit = (item: IObjExhibit): void => {
    set_action('editar');
    dispatch(set_exhibit(item));
    const aux_items: IObjExhibit[] = [];
    exhibits.forEach((option: IObjExhibit) => {
      if (option.nombre_anexo !== item.nombre_anexo) {
        aux_items.push(option);
      }
    });
    dispatch(set_exhibits(aux_items));
  };

  const delete_exhibit = (item: IObjExhibit): void => {
    dispatch(set_exhibit(initial_state_exhibit));
    const aux_items: IObjExhibit[] = [];
    exhibits.forEach((option: IObjExhibit) => {
      if (option.nombre_anexo !== item.nombre_anexo) {
        aux_items.push(option);
      }
    });
    //  console.log('')(aux_items);
    dispatch(set_exhibits(aux_items));
  };

  const on_change_select = (value: any, name: string): void => {
    if (name === 'cod_medio_almacenamiento') {
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
          button_submit_function={handle_submit_exhibit(on_submit_exhibit)}
          form_inputs={[
            {
              datum_type: 'title',
              title_label: 'Anexos',
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
              disabled: exhibit.metadatos?.cod_origen_archivo === 'F',
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
              rules: { required_rule: { rule: false, message: 'Requerido' } },
              label: 'Nombre de archivo',
              type: 'text',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_form,
              control_name: 'cod_medio_almacenamiento',
              default_value: '',
              rules: {
                required_rule: { rule: false, message: 'Requerido' },
              },
              label: 'Medio de almacenamiento',
              disabled: representacion_legal?.tipo_sesion === 'E',
              helper_text: '',
              select_options: storage_mediums,
              option_label: 'label',
              option_key: 'key',
              on_change_function: on_change_select,
              hidden_text: flag_metadata ?? false,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_form,
              control_name: 'medio_almacenamiento_otros_cual',
              default_value: '',
              rules: { required_rule: { rule: false, message: 'Requerido' } },
              label: '¿Cual?',
              type: 'text',
              disabled: false,
              helper_text: '',
              hidden_text:
                flag_metadata ?? false
                  ? true
                  : !(
                      cual_medio_view ||
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
              rules: {
                required_rule: { rule: false, message: 'Requerido' },
                min_rule: { rule: 0, message: 'el valor minimo debe ser 0' },
              },
              label: 'Número de folios',
              type: 'number',
              disabled: exhibit.metadatos?.cod_origen_archivo === 'F',
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
              hidden_text:
                (flag_metadata ?? false) ||
                representacion_legal?.tipo_sesion === 'E',
            },
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
          </Box>
        </Grid>
        <MetadataFormDialog
          is_modal_active={add_metadata_is_active}
          set_is_modal_active={set_add_metadata_is_active}
          get_values_anexo={get_values}
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default StepTwo;
