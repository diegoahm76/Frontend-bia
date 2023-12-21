/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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

import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import PrimaryForm from '../../../../../components/partials/form/PrimaryForm';
import { Title } from '../../../../../components';
import {
  IObjMetaData,
  IObjPqr,
  IObjPqrRequest,
} from '../../interfaces/complemento_pqrsdf';
import {
  set_exhibit,
  set_metadata,
} from '../../store/slice/complementoPqrsdfSlice';
import { jsPDF } from 'jspdf';
import logo_cormacarena_h from '../images/26_logocorma2_200x200.png';
import dayjs from 'dayjs';

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
    filed,
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

  const on_submit: SubmitHandler<IObjMetaData> = (data: IObjMetaData): void => {
    console.log(data);
    if (data.cod_origen_archivo === 'F') {
      set_doc(new jsPDF());
      set_doc_height(doc.internal.pageSize.getHeight());
      crear_encabezado();
    }
    dispatch(set_metadata(data));

    set_is_modal_active(false);
  };
  const crear_encabezado: () => {
    title: string;
  } = () => {
    const title = `Resumen de radicado número ${
      filed.numero_radicado_completo ?? ''
    }`;
    doc.setFont('Arial', 'normal');
    doc.setFontSize(12);
    doc.addImage(logo_cormacarena_h, 'PNG', 160, 10, 40, 15);
    doc.setFont('Arial', 'bold'); // establece la fuente en Arial
    doc.text(
      'Reporte',
      (doc.internal.pageSize.width - doc.getTextWidth('Reporte')) / 2,
      10
    );
    doc.text(
      title,
      (doc.internal.pageSize.width - doc.getTextWidth(title)) / 2,
      15
    );
    doc.setFont('Arial', 'normal'); // establece la fuente en Arial
    const fecha_generacion = `Fecha de generación de reporte ${dayjs().format(
      'DD/MM/YYYY'
    )}`;
    doc.text(
      fecha_generacion,
      doc.internal.pageSize.width - doc.getTextWidth(fecha_generacion) - 5,
      5
    );
    doc.line(5, 30, doc.internal.pageSize.width - 5, 30);
    doc.line(5, 35, doc.internal.pageSize.width - 5, 35);
    const linea_uno = `Tipo de radicado: ${
      filed.nombre_tipo_radicado ?? 'Entrante'
    }               Fecha: ${filed.fecha_radicado ?? '2023/10/15 18:00:00'}`;
    const ancho_texto_linea_uno = doc.getTextWidth(linea_uno);
    const x_linea_uno =
      (doc.internal.pageSize.width - ancho_texto_linea_uno) / 2;
    doc.text(linea_uno, x_linea_uno, 45);

    const linea_dos = `Número de radicado: ${
      filed.numero_radicado_completo ?? '654664646546'
    }               Asunto: ${filed.asunto}`;
    const ancho_texto_linea_dos = doc.getTextWidth(linea_dos);
    const x_linea_dos =
      (doc.internal.pageSize.width - ancho_texto_linea_dos) / 2;
    doc.text(linea_dos, x_linea_dos, 55);

    const linea_tres = `Titular: ${
      filed.titular ?? 'Edgar Sneider Fuentes Agudelo'
    }`;
    const ancho_texto_linea_tres = doc.getTextWidth(linea_tres);
    const x_linea_tres =
      (doc.internal.pageSize.width - ancho_texto_linea_tres) / 2;
    doc.text(linea_tres, x_linea_tres, 65);

    const pdfBlob = doc.output('blob');
    const pdfFile = new File([pdfBlob], 'generated.pdf', {
      type: 'application/pdf',
    });
    console.log(pdfFile);
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
export default MetadataFormDialog;
