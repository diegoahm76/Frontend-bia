/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useEffect, useContext } from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete';

import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import PrimaryForm from '../../../../../components/partials/form/PrimaryForm';
import { Title } from '../../../../../components';
import {
  IObjListType,
  IObjMetaData,
  IObjPqr,
  IObjPqrRequest,
} from '../../interfaces/central_digitalizacion';
import {
  initial_state_exhibit,
  set_exhibit,
  set_file_fisico,
  set_metadata,
} from '../../store/slice/centralDigitalizacionSlice';
import {
  add_metadata_service,
  add_metadata_opas_service,
  add_metadata_service_otros,
  control_error,
  control_success,
  delete_metadata_service,
  delete_metadata_opas_service,
  delete_metadata_service_otros,
  edit_metadata_service,
  edit_metadata_service_otros,
  edit_metadata_opas_service,
  get_file_categories_service,
  get_file_origin_service,
  get_file_typology_service,
  get_storage_mediums_service,
} from '../../store/thunks/centralDigitalizacionThunks';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../../auth/interfaces';
import { jsPDF } from 'jspdf';
import logo_cormacarena_h from '../images/26_logocorma2_200x200.png';
import dayjs from 'dayjs';
import { OpcionOtrosContext } from '../../context/BusquedaOtrosDigitalizacion';
interface IProps {
  action?: string;
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  get_values_anexo: any;
  selectedExhibit: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const MetadataFormDialog = ({
  action,
  is_modal_active,
  set_is_modal_active,
  get_values_anexo,
  selectedExhibit,
}: IProps) => {
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const { opcion_otros } = useContext(OpcionOtrosContext)

  const {
    pqr,
    pqr_request,
    file_categories,
    metadata,
    file_origins,
    file_typologies,
    exhibit,
    digitization_request,
    storage_mediums,
    file_fisico,
    edit_digitization,
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
  const [doc, set_doc] = useState<jsPDF>(new jsPDF());
  const [doc_height, set_doc_height] = useState<number>(0);
  const [aux_origen_archivos, set_aux_origen_archivos] = useState<
    IObjListType[]
  >([]);
  const [checked_tiene_tipologia, set_checked_tiene_tipologia] = useState(
    metadata.tiene_tipologia
  );
  const [checked_tiene_replica_fisica, set_checked_tiene_replica_fisica] =
    useState(metadata.tiene_tipologia);
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
    //  console.log('')(metadata);
    reset_metadata({
      ...metadata,
      fecha_creacion_doc:
        (metadata.fecha_creacion_doc ?? null) === null
          ? new Date()
          : metadata.fecha_creacion_doc,
    });
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
  useEffect(() => {
    if (watch('cod_origen_archivo') === 'F') {
      control_success(
        'Al seleccionar fisico se reemplazará el archivo por uno por defecto y se configurará el numero de folios en 1'
      );
      setValue('nro_folios_documento', 1);
    }
  }, [watch('cod_origen_archivo')]);
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
    const linea_uno = `Nombre del anexo: ${get_values_anexo('nombre_anexo') ?? ''
      }               Medio de almacenamiento: ${get_values_anexo('cod_medio_almacenamiento') === 'Ot'
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

    const linea_dos = `Categoría de archivo: ${file_categories.find(
      (objeto) => objeto.key === data.cod_categoria_archivo
    )?.label
      }           Tipología documental: ${data.id_tipologia_doc !== null
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
  const on_submit = (data: IObjMetaData): void => {
    let pdfFile = null;
    if (data.cod_origen_archivo === 'F') {
      set_doc(new jsPDF());
      set_doc_height(doc.internal.pageSize.getHeight());
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
      const linea_uno = `Nombre del anexo: ${get_values_anexo('nombre_anexo') ?? ''
        }               Medio de almacenamiento: ${get_values_anexo('cod_medio_almacenamiento') === 'Ot'
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

      const linea_dos = `Categoría de archivo: ${file_categories.find(
        (objeto) => objeto.key === data.cod_categoria_archivo
      )?.label
        }           Tipología documental: ${data.id_tipologia_doc !== null
          ? file_typologies.find(
            (objeto) => objeto.key === data.id_tipologia_doc
          )?.label
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
      pdfFile = new File([pdfBlob], 'generado.pdf', {
        type: 'application/pdf',
      });
      dispatch(set_file_fisico(pdfFile));
    } else {
      pdfFile = null;
      dispatch(set_file_fisico(null));
    }
    console.log(data.fecha_creacion_doc ?? '');
    const fecha = new Date(data.fecha_creacion_doc ?? '').toISOString();

    const data_edit: IObjMetaData = {
      ...data,
      fecha_creacion_doc: fecha.slice(0, 10),
      id_anexo: exhibit.id_anexo,
      id_persona_digitalizo: userinfo.id_persona,
      id_solicitud_de_digitalizacion:
        digitization_request.id_solicitud_de_digitalizacion,
      tiene_tipologia: checked_tiene_tipologia,
      id_tipologia_doc: checked_tiene_tipologia ? data.id_tipologia_doc : null,
      tipologia_no_creada_TRD: checked_tiene_tipologia
        ? null
        : data.tipologia_no_creada_en_TRD,
      tiene_replica_fisica: checked_tiene_replica_fisica ?? null,
      nro_folios_documento:
        pdfFile === null ? Number(data.nro_folios_documento) : 1,
    };
    //  console.log('')(data_edit);
    const form_data: any = new FormData();
    if (
      data.id_metadatos_anexo_tmp !== null &&
      data.id_metadatos_anexo_tmp !== undefined
    ) {
      const fecha_actual = new Date();
      const fecha_registro = new Date(data.fecha_creacion_doc ?? '');
      const diferencia_ms = fecha_actual.getTime() - fecha_registro.getTime();
      const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
      if (diferencia_dias <= 100) {
        form_data.append('data_digitalizacion', JSON.stringify(data_edit));

        if (pdfFile !== null) {
          form_data.append(`archivo`, pdfFile);
        } else {
          if (
            exhibit.exhibit_link !== exhibit.metadatos?.archivo?.ruta_archivo
          ) {
            if (
              exhibit.exhibit_link !== null &&
              exhibit.exhibit_link !== undefined
            ) {
              form_data.append(
                `archivo`,
                pdfFile === null ? exhibit.exhibit_link : pdfFile

              );
            }
          }
        }

        if (digitization_request.nombre_tipo_solicitud === "OPAS") {

          if (selectedExhibit?.ya_digitalizado === true) {
            void dispatch(
              edit_metadata_opas_service(
                form_data,
                digitization_request.id_solicitud_de_digitalizacion ?? 0
              )
            );
          }
        } else {
         
        }
 void dispatch(
            edit_metadata_service(
              form_data,
              digitization_request.id_solicitud_de_digitalizacion ?? 0
            )
          );
      } else {
        control_error(
          'Solo se pueden editar metadatos hasta 30 dias despues de la fecha de creación'
        );
      }
    } else {
      form_data.append('data_digitalizacion', JSON.stringify(data_edit));
      console.log(exhibit, pdfFile);
      if (pdfFile !== null) {
        form_data.append(`archiv`, pdfFile);
      } else {
        if (exhibit.exhibit_link !== exhibit.metadatos?.archivo?.ruta_archivo) {
          if (
            exhibit.exhibit_link !== null &&
            exhibit.exhibit_link !== undefined
          ) {
            form_data.append(
              `archivo`,
              pdfFile === null ? exhibit.exhibit_link : pdfFile
            );
          }
        }
      }

      if (digitization_request.nombre_tipo_solicitud === "OPAS") {
        void dispatch(
          add_metadata_opas_service(
            form_data,
            digitization_request.id_solicitud_de_digitalizacion ?? 0
          )

        );
      } else {

        void dispatch(
          add_metadata_service(
            form_data,
            digitization_request.id_solicitud_de_digitalizacion ?? 0
          )
          // add_metadata_service(
          //   form_data,
          //   digitization_request.id_solicitud_de_digitalizacion ?? 0
          // )

        );
      }


    }
    set_is_modal_active(false);
    dispatch(set_exhibit(initial_state_exhibit));
    dispatch(set_file_fisico(null));
  };

  const delete_metadata = (): void => {


    if (opcion_otros === "OTROS") {

      if (exhibit.id_anexo !== null && exhibit.id_anexo !== undefined) {
        const params = {
          id_anexo: exhibit.id_anexo,
          id_solicitud_de_digitalizacion:
            digitization_request.id_solicitud_de_digitalizacion,
        };

        void dispatch(delete_metadata_service_otros(params));

        return ;
      }
    }

      if (exhibit.id_anexo !== null && exhibit.id_anexo !== undefined) {
        const params = {
          id_anexo: exhibit.id_anexo,
          id_persona_digitalizo: userinfo.id_persona,
          id_solicitud_de_digitalizacion:
            digitization_request.id_solicitud_de_digitalizacion,
        };

      if (digitization_request.nombre_tipo_solicitud === "OPAS") {

        void dispatch(delete_metadata_opas_service(params));

      } else {

          void dispatch(delete_metadata_service(params));
      }





        set_is_modal_active(false);
        dispatch(set_exhibit(initial_state_exhibit));
        dispatch(set_file_fisico(null));
      }
    };

    useEffect(() => {
      set_aux_origen_archivos(file_origins);
    }, [file_origins]);
    useEffect(() => {
      if (exhibit.cod_medio_almacenamiento === 'Pa') {
        const arrayNuevo = file_origins.filter((objeto: any) => objeto.key !== 'Pa');
        set_aux_origen_archivos(arrayNuevo);
      } else {
        set_aux_origen_archivos(file_origins);
      }
    }, [exhibit]);
  const handleClick = () => {
    console.log(selectedExhibit);
    console.log("11111111111111111");

    console.log(selectedExhibit?.ya_digitalizado);
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
                    control_name: 'fecha_creacion_doc_',
                    default_value:
                      metadata.fecha_creacion_doc ?? null === null
                        ? new Date()
                        : metadata.fecha_creacion_doc ?? '' === ''
                          ? new Date()
                          : '2023-12-12',
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
                    disabled:
                      watch('cod_origen_archivo') === 'F' || !edit_digitization,
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
                    disabled: !edit_digitization,
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
                    disabled: !edit_digitization,
                    helper_text: '',
                    select_options: aux_origen_archivos,
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
                    disabled: !edit_digitization,
                    helper_text: '',
                  },
                  {
                    datum_type: 'checkbox_controller',
                    xs: 12,
                    md: 3,
                    control_form: control_metadata,
                    control_name: 'tiene_replica_fisica',
                    default_value: checked_tiene_replica_fisica,
                    rules: {
                      required_rule: { rule: true, message: 'Requerido' },
                    },
                    label: 'Tiene réplica física',
                    disabled: !edit_digitization,
                    helper_text: '',
                    checked: checked_tiene_replica_fisica,
                    set_checked: set_checked_tiene_replica_fisica,
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
                    disabled: !edit_digitization,
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
                    disabled: !edit_digitization,
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
                    disabled: !edit_digitization,
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
                    disabled: !edit_digitization,
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
                    disabled: !edit_digitization,
                    helper_text: '',
                  },
                  {
                    datum_type: 'keywords',
                    initial_values: keywords_object,
                    hidden_text: false,
                    character_separator: '|',
                    set_form: setValue,
                    keywords: 'palabras_clave_doc',
                    disabled: !edit_digitization
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
                    disabled: !edit_digitization,
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
              {edit_digitization && (
                <>
                  <Button
                    color="success"
                    variant="contained"
                    onClick={handle_submit(on_submit)}
                    startIcon={<SaveIcon />}
                  >
                    {exhibit.ya_digitalizado === true ? 'Actualizar' : 'Guardar'}
                  </Button>
                  {metadata.id_metadatos_anexo_tmp !== null && (
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={delete_metadata}
                      startIcon={<DeleteIcon />}
                    >
                      Eliminar
                    </Button>
                  )}
                </>
              )}
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
