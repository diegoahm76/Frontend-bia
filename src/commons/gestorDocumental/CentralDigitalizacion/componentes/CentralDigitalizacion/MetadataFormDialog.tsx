/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useEffect } from 'react';
import { type Dispatch, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Button,
  Box,
  Divider,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import PrimaryForm from '../../../../../components/partials/form/PrimaryForm';
import { Title } from '../../../../../components';
import {
  IObjMetaData,
  IObjPqr,
  IObjPqrRequest,
} from '../../interfaces/central_digitalizacion';
import {
  set_exhibit,
  set_metadata,
} from '../../store/slice/centralDigitalizacionSlice';
import {
  get_file_categories_service,
  get_file_origin_service,
  get_file_typology_service,
  get_storage_mediums_service,
} from '../../store/thunks/centralDigitalizacionThunks';

interface IProps {
  action?: string;
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const MetadataFormDialog = ({
  action,
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
  const dispatch = useAppDispatch();

  const {
    pqr,
    pqr_request,
    file_categories,
    metadata,
    file_origins,
    file_typologies,
    exhibit,
  } = useAppSelector((state) => state.central_digitalizacion_slice);

  const {
    control: control_metadata,
    handleSubmit: handle_submit,
    reset: reset_metadata,
    setValue,
    getValues: get_values,
    watch,
  } = useForm<IObjMetaData>();
  const [keywords_object, set_keywords_object] = useState<any[]>([]);
  const [checked_tiene_tipologia, set_checked_tiene_tipologia] = useState(
    metadata.tiene_tipologia
  );
  const handle_close_add_bien = (): void => {
    set_is_modal_active(false);
  };

  useEffect(() => {
    void dispatch(get_storage_mediums_service());
    void dispatch(get_file_categories_service());
    void dispatch(get_file_origin_service());
    void dispatch(get_file_typology_service());
  }, []);

  useEffect(() => {
    console.log(metadata);
    reset_metadata(metadata);
    if (
      metadata.palabras_clave_doc !== null &&
      metadata.palabras_clave_doc !== '' &&
      metadata.palabras_clave_doc !== undefined
    ) {
      const labelsArray = metadata.palabras_clave_doc.split('|');
      const labelObjects = labelsArray.map((label: string, index: number) => ({
        key: index,
        label: label,
      }));
      set_keywords_object(labelObjects);
    } else {
      set_keywords_object([]);
    }
  }, [metadata]);

  const on_submit = (data: IObjMetaData): void => {
    dispatch(set_metadata(data));
    set_is_modal_active(false);
  };

  return (
    <Dialog
      maxWidth="xl"
      open={is_modal_active}
      onClose={handle_close_add_bien}
      fullWidth
    >
      <Box component="form">
        <Grid item xs={12} marginLeft={2} marginRight={2} marginTop={3}>
          <Title title={'Metadatos del archivo'} />
        </Grid>
        <DialogTitle></DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container>
            <PrimaryForm
              show_button={false}
              on_submit_form={null}
              button_submit_label=""
              button_submit_icon_class={null}
              form_inputs={[
                {
                  datum_type: 'date_picker_controller',
                  xs: 12,
                  md: 2,
                  control_form: control_metadata,
                  control_name: 'fecha_creacion_doc',
                  default_value: '',
                  rules: {
                    required_rule: { rule: true, message: 'Requerido' },
                  },
                  label: 'Fecha creación',
                  disabled: true,
                  helper_text: '',
                },
                {
                  datum_type: 'input_controller',
                  xs: 12,
                  md: 2,
                  control_form: control_metadata,
                  control_name: 'nro_folios_documento',
                  default_value: '',
                  rules: {
                    required_rule: { rule: true, message: 'Requerido' },
                  },
                  label: 'Número de folios',
                  type: 'number',
                  disabled: true,
                  helper_text: '',
                  step_number: '1',
                },
                {
                  datum_type: 'select_controller',
                  xs: 12,
                  md: 3,
                  control_form: control_metadata,
                  control_name: 'cod_categoria_archivo',
                  default_value: '',
                  rules: {
                    required_rule: { rule: true, message: 'Requerido' },
                  },
                  label: 'Categoria de archivo',
                  disabled: false,
                  helper_text: '',
                  select_options: file_categories,
                  option_label: 'label',
                  option_key: 'key',
                },
                {
                  datum_type: 'select_controller',
                  xs: 12,
                  md: 3,
                  control_form: control_metadata,
                  control_name: 'cod_origen_archivo',
                  default_value: '',
                  rules: {
                    required_rule: { rule: true, message: 'Requerido' },
                  },
                  label: 'Origen del archivo',
                  disabled: false,
                  helper_text: '',
                  select_options: file_origins,
                  option_label: 'label',
                  option_key: 'key',
                },
                {
                  datum_type: 'checkbox_controller',
                  xs: 12,
                  md: 2,
                  control_form: control_metadata,
                  control_name: 'es_version_original',
                  default_value: metadata.es_version_original ?? true,
                  rules: {},
                  label: 'Versión original',
                  disabled: true,
                  helper_text: '',
                },
                {
                  datum_type: 'checkbox_controller',
                  xs: 12,
                  md: 3,
                  control_form: control_metadata,
                  control_name: 'tiene_replica_fisica',
                  default_value: metadata.tiene_replica_fisica,
                  rules: {
                    required_rule: { rule: true, message: 'Requerido' },
                  },
                  label: 'Tiene réplica física',
                  disabled: false,
                  helper_text: '',
                },

                {
                  datum_type: 'checkbox_controller',
                  xs: 12,
                  md: 3,
                  control_form: control_metadata,
                  control_name: 'tiene_tipologia',
                  default_value: checked_tiene_tipologia,

                  rules: {
                    required_rule: { rule: true, message: 'Requerido' },
                  },
                  label: 'Tiene tipología relacionada',
                  disabled: false,
                  helper_text: '',
                  checked: checked_tiene_tipologia,
                  set_checked: set_checked_tiene_tipologia,
                },
                {
                  datum_type: 'select_controller',
                  xs: 12,
                  md: 4,
                  control_form: control_metadata,
                  control_name: 'id_tipologia_doc',
                  default_value: '',
                  hidden_text: !checked_tiene_tipologia,
                  rules: {
                    required_rule: { rule: false, message: 'Requerido' },
                  },
                  label: 'Tipología relacionada',
                  disabled: false,
                  helper_text: '',
                  select_options: file_typologies,
                  option_label: 'label',
                  option_key: 'key',
                },
                {
                  datum_type: 'input_controller',
                  xs: 12,
                  md: 3,
                  control_form: control_metadata,
                  control_name: 'tipologia_no_creada_en_TRD',
                  hidden_text: checked_tiene_tipologia,
                  default_value: '',
                  rules: {
                    required_rule: { rule: false, message: 'Requerido' },
                  },
                  label: '¿Cual?',
                  disabled: false,
                  helper_text: '',
                },

                {
                  datum_type: 'input_controller',
                  xs: 12,
                  md: 12,
                  control_form: control_metadata,
                  control_name: 'asunto',
                  default_value: '',
                  rules: {
                    required_rule: { rule: false, message: 'Requerido' },
                  },
                  label: 'Asunto',
                  type: 'text',
                  disabled: false,
                  helper_text: '',
                },
                {
                  datum_type: 'input_controller',
                  xs: 12,
                  md: 12,
                  control_form: control_metadata,
                  control_name: 'descripcion',
                  default_value: '',
                  rules: {},
                  multiline_text: true,
                  rows_text: 4,
                  label: 'Descripción',
                  type: 'text',
                  disabled: false,
                  helper_text: '',
                },
                {
                  datum_type: 'keywords',
                  initial_values: keywords_object,
                  hidden_text: false,
                  character_separator: '|',
                  set_form: setValue,
                  keywords: 'palabras_clave_doc',
                },
                {
                  datum_type: 'input_controller',
                  xs: 12,
                  md: 12,
                  control_form: control_metadata,
                  control_name: 'observacion_digitalizacion',
                  default_value: '',
                  rules: {},
                  multiline_text: true,
                  rows_text: 4,
                  label: 'Observación',
                  type: 'text',
                  disabled: false,
                  helper_text: '',
                },
              ]}
            />
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mr: '15px', mb: '10px', mt: '10px' }}
          >
            <Button
              color="primary"
              variant="contained"
              onClick={handle_submit(on_submit)}
              startIcon={<SaveIcon />}
            >
              Agregar
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={handle_close_add_bien}
              startIcon={<CloseIcon />}
            >
              CERRAR
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default MetadataFormDialog;
