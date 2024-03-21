/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useEffect } from 'react';
import { type Dispatch, type SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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

import { IObjMetaData } from '../../PQRSDF/interfaces/pqrsdf';
import {
  set_metadata,
  set_file_fisico,
} from '../../PQRSDF/store/slice/pqrsdfSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { Title } from '../../../../components';
import PrimaryForm from '../../../../components/partials/form/PrimaryForm';
import { control_success } from '../../PQRSDF/store/thunks/pqrsdfThunks';
import { jsPDF } from 'jspdf';
import { logo_cormacarena_h } from '../../../conservacion/Reportes/logos/logos';
import dayjs from 'dayjs';

interface IProps {
  action?: string;
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  get_values_anexo: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const MetadataFormDialogOtros = ({
  action,
  is_modal_active,
  set_is_modal_active,
  get_values_anexo,
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
    storage_mediums,
  } = useAppSelector((state) => state.pqrsdf_slice);
  const [checked_tiene_tipologia, set_checked_tiene_tipologia] = useState(
    metadata.id_tipologia_doc !== null
  );
  const [checked_tiene_replica_fisica, set_checked_tiene_replica_fisica] =
    useState(metadata.tiene_replica_fisica);
  const {
    control: control_metadata,
    handleSubmit: handle_submit,
    reset: reset_metadata,
    setValue,
    watch,
  } = useForm<IObjMetaData>();
  const [keywords_object, set_keywords_object] = useState<any[]>([]);
  const [doc, set_doc] = useState<jsPDF>(new jsPDF());
  const [doc_height, set_doc_height] = useState<number>(0);
  const handle_close_add_bien = (): void => {
    set_is_modal_active(false);
  };

  useEffect(() => {
    reset_metadata({
      ...metadata,
      tiene_tipologia: (metadata.id_tipologia_doc ?? null) !== null,
    });
    set_checked_tiene_tipologia(metadata.id_tipologia_doc !== null);
    if (
      metadata.palabras_clave_doc !== null &&
      metadata.palabras_clave_doc !== '' &&
      metadata.palabras_clave_doc !== undefined
    ) {
      const labelsArray = metadata.palabras_clave_doc.split(',');
      const labelObjects = labelsArray.map((label: string, index: number) => ({
        key: index,
        label: label,
      }));
      set_keywords_object(labelObjects);
    } else {
      set_keywords_object([]);
    }
  }, [metadata]);

  useEffect(() => {
    if (watch('cod_origen_archivo') === 'F') {
      control_success(
        'Al seleccionar fisico se reemplazará el archivo por uno por defecto y se configurará el numero de folios en 1'
      );
    }
  }, [watch('cod_origen_archivo')]);

  const on_submit: SubmitHandler<IObjMetaData> = (data: IObjMetaData): void => {
    //  console.log('')(data);
    if (data.cod_origen_archivo === 'F') {
      set_doc(new jsPDF());
      set_doc_height(doc.internal.pageSize.getHeight());
      crear_encabezado(data);
    }
    dispatch(set_metadata(data));
    set_is_modal_active(false);
  };

  const crear_encabezado: (data: IObjMetaData) => {
    title: string;
  } = (data: IObjMetaData) => {
    const title = `Archivo no digitalizado - solo almacenado en físico`;
    doc.setFont('Arial', 'normal');
    doc.setFontSize(12);
    doc.addImage(logo_cormacarena_h, 'PNG', 160, 10, 40, 15);
    doc.setFont('Arial', 'bold'); // establece la fuente en Arial
    doc.text(
      '(Buscar en carpeta física)',
      (doc.internal.pageSize.width -
        doc.getTextWidth('(Buscar en carpeta física)')) /
        2,
      10
    );
    doc.text(
      title,
      (doc.internal.pageSize.width - doc.getTextWidth(title)) / 2,
      15
    );
    doc.setFont('Arial', 'normal'); // establece la fuente en Arial
    const fecha_generacion = `Fecha de creación ${dayjs().format(
      'DD/MM/YYYY'
    )}`;
    doc.text(
      fecha_generacion,
      doc.internal.pageSize.width - doc.getTextWidth(fecha_generacion) - 5,
      5
    );
    doc.line(5, 30, doc.internal.pageSize.width - 5, 30);
    doc.line(5, 35, doc.internal.pageSize.width - 5, 35);
    const linea_uno = `Nombre del anexo: ${
      get_values_anexo('nombre_anexo') ?? ''
    }               Medio de almacenamiento: ${
      get_values_anexo('cod_medio_almacenamiento') === 'Ot'
        ? get_values_anexo('medio_almacenamiento_otros_cual')
        : storage_mediums.find(
            (objeto) =>
              objeto.key === get_values_anexo('cod_medio_almacenamiento')
          )?.label
    }`;
    const ancho_texto_linea_uno = doc.getTextWidth(linea_uno);
    const x_linea_uno =
      (doc.internal.pageSize.width - ancho_texto_linea_uno) / 2;
    doc.text(linea_uno, x_linea_uno, 45);

    const linea_dos = `Categoría de archivo: ${
      file_categories.find(
        (objeto) => objeto.key === data.cod_categoria_archivo
      )?.label
    }           Tipología documental: ${
      data.id_tipologia_doc !== null
        ? file_typologies.find((objeto) => objeto.key === data.id_tipologia_doc)
            ?.label
        : data.tipologia_no_creada_en_TRD
    }`;
    const ancho_texto_linea_dos = doc.getTextWidth(linea_dos);
    const x_linea_dos =
      (doc.internal.pageSize.width - ancho_texto_linea_dos) / 2;
    doc.text(linea_dos, x_linea_dos, 55);

    const linea_tres = `Asunto: ${data.asunto}`;
    const ancho_texto_linea_tres = doc.getTextWidth(linea_tres);
    const x_linea_tres =
      (doc.internal.pageSize.width - ancho_texto_linea_tres) / 2;
    doc.text(linea_tres, x_linea_tres, 65);

    const pdfBlob = doc.output('blob');
    const pdfFile = new File([pdfBlob], 'generado.pdf', {
      type: 'application/pdf',
    });
    dispatch(set_file_fisico(pdfFile));
    return { title };
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
                  datum_type: 'select_controller',
                  xs: 12,
                  md: 4,
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
                  datum_type: 'checkbox_controller',
                  xs: 12,
                  md: 4,
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
                  datum_type: 'select_controller',
                  xs: 12,
                  md: 4,
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
                  md: 4,
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
                  rules: {
                    required_rule: { rule: true, message: 'Requerido' },
                  },
                  label: 'Tipología relacionada',
                  disabled: false,
                  helper_text: '',
                  select_options: file_typologies,
                  option_label: 'label',
                  option_key: 'key',
                  hidden_text: !checked_tiene_tipologia,
                },
                {
                  datum_type: 'input_controller',
                  xs: 12,
                  md: 4,
                  control_form: control_metadata,
                  control_name: 'tipologia_no_creada_en_TRD',
                  default_value: '',
                  rules: {
                    required_rule: { rule: true, message: 'Requerido' },
                  },
                  label: '¿Cual?',
                  disabled: false,
                  helper_text: '',
                  hidden_text: checked_tiene_tipologia,
                },

                {
                  datum_type: 'input_controller',
                  xs: 12,
                  md: 12,
                  control_form: control_metadata,
                  control_name: 'asunto',
                  default_value: '',
                  rules: {
                    required_rule: { rule: true, message: 'Requerido' },
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
                  rules: {
                    required_rule: { rule: true, message: 'Requerido' },
                  },
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
                  character_separator: ',',
                  set_form: setValue,
                  keywords: 'palabras_clave_doc',
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
              type="button"
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
export default MetadataFormDialogOtros;
