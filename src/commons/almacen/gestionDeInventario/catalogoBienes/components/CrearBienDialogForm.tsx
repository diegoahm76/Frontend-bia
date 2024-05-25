import { useState, useEffect, useRef } from 'react';
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
import {
  add_bien_service,
  get_code_bien_service,
  get_marca_service,
  get_medida_service,
  get_porcentaje_service,
} from '../store/thunks/catalogoBienesThunks';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import {
  type IList,
  type IObjBien as FormValues,
} from '../interfaces/catalogodebienes';
import { api } from '../../../../../api/axios';
import { initial_state_current_nodo } from '../store/slices/indexCatalogodeBienes';
import PrimaryForm from '../../../../../components/partials/form/PrimaryForm';

interface IProps {
  action: string;
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const CrearBienDialogForm = ({
  action,
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
  const initial_options: IList[] = [
    {
      label: '',
      value: '',
    },
  ];
  const dispatch = useAppDispatch();

  const [activo_types, set_activo_types] = useState<IList[]>(initial_options);
  const [tipo_bien, set_tipo_bien] = useState<IList[]>(initial_options);
  const [metodo_valoracion, set_metodo_valoracion] =
    useState<IList[]>(initial_options);
  const [depreciacion_types, set_depreciacion_types] =
    useState<IList[]>(initial_options);
  const { marca, unidad_medida, porcentaje_iva, current_nodo, code_bien } = useAppSelector(
    (state) => state.bien
  );
  const selects_option_realizados = useRef(false);

  const {
    control: control_bien,
    handleSubmit: handle_submit,
    reset: reset_bien,
    watch,
  } = useForm<FormValues>();
  const handle_close_add_bien = (): void => {
    set_is_modal_active(false);
  };

  const text_choise_adapter: any = (dataArray: string[]) => {
    const data_new_format: IList[] = dataArray.map((dataOld) => ({
      label: dataOld[1],
      value: dataOld[0],
    }));
    return data_new_format;
  };
  // const on_change_tipo_bien: any = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   set_tipo_bien_selected(e.target.value);
  // };

  const on_submit = (data: FormValues): void => {
    if (action === 'create_sub') {
      data.id_bien = null;
      data.nivel_jerarquico =
        Number(current_nodo.data.bien?.nivel_jerarquico ?? 0) + 1;
      data.id_bien_padre = current_nodo.data.bien?.id_bien;
      data.nombre_padre = current_nodo.data.bien?.nombre;
    } else if (action === 'create') {
      data.nivel_jerarquico = 1;
    }
    data.maneja_hoja_vida = data.maneja_hoja_vida === 'true';
    data.solicitable_vivero = data.solicitable_vivero === 'true';
    data.visible_solicitudes = data.visible_solicitudes === 'true';
    //  console.log('')(data);
    void dispatch(add_bien_service(data));
    handle_close_add_bien();
  };
  useEffect(() => {
    const get_selects_options: any = async () => {
      try {
        const [
          tipo_bien_no_format,
          activo_types_no_format,
          metodo_valoracion_no_format,
          depreciacion_types_no_format
        ] = await Promise.all([
          api.get('almacen/choices/tipo-bien/'),
          api.get('almacen/choices/tipo-activo/'),
          api.get('almacen/choices/metodo-valoracion-articulo/'),
          api.get('almacen/choices/tipo-depreciacion-activo/')
        ]);
  
        const tipo_bien_format: IList[] = text_choise_adapter(tipo_bien_no_format.data);
        const activo_types_format: IList[] = text_choise_adapter(activo_types_no_format.data);
        const metodo_valoracion_format: IList[] = text_choise_adapter(metodo_valoracion_no_format.data);
        const depreciacion_types_format: IList[] = text_choise_adapter(depreciacion_types_no_format.data);
  
        set_tipo_bien(tipo_bien_format);
        set_activo_types(activo_types_format);
        set_metodo_valoracion(metodo_valoracion_format);
        set_depreciacion_types(depreciacion_types_format);
      } catch (err) {
        // Manejar errores aquí si es necesario
      }
    };
  
    if (is_modal_active) {
      if (!selects_option_realizados.current) {
        selects_option_realizados.current = true;
        get_selects_options(),
        dispatch(get_marca_service()),
        dispatch(get_porcentaje_service()),
        dispatch(get_medida_service())
      }
    }
  }, [is_modal_active]);

  useEffect(() => {
    if (action === 'create_sub') {
      if (current_nodo.data.bien?.nivel_jerarquico !== 5) {
        //  console.log('')(current_nodo.data.bien?.nivel_jerarquico)
        if(is_modal_active){
          void dispatch(
            get_code_bien_service(
              current_nodo.data.bien?.id_bien,
              (current_nodo.data.bien?.nivel_jerarquico ?? 0 )+ 1
            )
          );
        }
      }
      reset_bien({
        ...current_nodo.data.bien,
       
        maneja_hoja_vida:
          current_nodo.data.bien?.maneja_hoja_vida ?? false ? 'true' : 'false',
        solicitable_vivero:
          current_nodo.data.bien?.solicitable_vivero ?? false
            ? 'true'
            : 'false',
        visible_solicitudes:
          current_nodo.data.bien?.visible_solicitudes ?? false
            ? 'true'
            : 'false',
      });
    } else if (action === 'create') {
      if(is_modal_active){
        void dispatch(get_code_bien_service(null, 1));
      }
      reset_bien(initial_state_current_nodo.data.bien);
    } else {
      reset_bien({
        ...current_nodo.data.bien,
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        maneja_hoja_vida:
          current_nodo.data.bien?.maneja_hoja_vida ?? false ? 'true' : 'false',
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        solicitable_vivero:
          current_nodo.data.bien?.solicitable_vivero ?? false
            ? 'true'
            : 'false',
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        visible_solicitudes:
          current_nodo.data.bien?.visible_solicitudes ?? false
            ? 'true'
            : 'false',
      });
    }
    //  console.log('')(current_nodo)
  }, [current_nodo,is_modal_active]);

  useEffect(() => {
    reset_bien({ ...current_nodo.data.bien, codigo_bien: code_bien });
    //  console.log('')(code_bien)
  }, [code_bien]);

  return (
    <Dialog
      maxWidth="xl"
      open={is_modal_active}
      onClose={handle_close_add_bien}
      fullWidth
    >
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handle_submit(on_submit)}
      >
        <DialogTitle></DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container>
            <PrimaryForm
              show_button={false}
              on_submit_form={handle_submit(on_submit)}
              button_submit_label="Guardar"
              button_submit_icon_class={<SaveIcon />}
              form_inputs={
                watch('cod_tipo_bien') === 'A'
                  ? [
                      {
                        datum_type: 'title',
                        title_label: 'Tipo de bien',
                      },
                      {
                        datum_type: 'select_controller',
                        xs: 12,
                        md: 12,
                        control_form: control_bien,
                        control_name: 'cod_tipo_bien',
                        default_value: 'A',
                        rules: {
                          required_rule: {
                            rule: true,
                            message: 'Tipo de bien requerido',
                          },
                        },
                        label: 'Tipo de bien',
                        disabled: false,
                        helper_text: 'Seleccione Tipo de bien',
                        select_options: tipo_bien,
                        option_label: 'label',
                        option_key: 'value',
                      },
                      {
                        datum_type: 'title',
                        title_label: 'Información del bien',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: 'codigo_bien',
                        default_value: '',
                        rules: {},
                        label: 'Codigo',
                        type: 'number',
                        disabled: false,
                        helper_text: '',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: 'nombre',
                        default_value: '',
                        rules: {
                          required_rule: {
                            rule: true,
                            message: 'Nombre requerido',
                          },
                        },
                        label: 'Nombre',
                        type: 'text',
                        disabled: false,
                        helper_text: '',
                      },
                      {
                        datum_type: 'select_controller',
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: 'cod_tipo_activo',
                        default_value: '',
                        rules: {
                          required_rule: {
                            rule: true,
                            message: 'Tipo de activo requerido',
                          },
                        },
                        label: 'Tipo de bien',
                        disabled: false,
                        helper_text: 'Tipo de activo',
                        select_options: activo_types,
                        option_label: 'label',
                        option_key: 'value',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: 'nombre_padre',
                        default_value:
                          action === 'create_sub'
                            ? current_nodo.data.bien?.nombre
                            : '',
                        rules: {
                          required_rule: {
                            rule: false,
                            message: 'Nombre requerido',
                          },
                        },
                        label: 'Carpeta padre',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'select_controller',
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: 'id_unidad_medida',
                        default_value: '',
                        rules: {
                          required_rule: {
                            rule: true,
                            message: 'Unidad de medida requerida',
                          },
                        },
                        label: 'Unidad de medida',
                        disabled: false,
                        helper_text: '',
                        select_options: unidad_medida,
                        option_label: 'nombre',
                        option_key: 'id_unidad_medida',
                      },
                      {
                        datum_type: 'select_controller',
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: 'id_porcentaje_iva',
                        default_value: '',
                        rules: {
                          required_rule: {
                            rule: true,
                            message: 'Porcentaje IVA requerido',
                          },
                        },
                        label: 'Porcentaje IVA',
                        disabled: false,
                        helper_text: '',
                        select_options: porcentaje_iva,
                        option_label: 'porcentaje',
                        option_key: 'id_porcentaje_iva',
                      },
                      {
                        datum_type: 'select_controller',
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: 'cod_tipo_depreciacion',
                        default_value: '',
                        rules: {
                          required_rule: {
                            rule: true,
                            message: 'Tipo de depreciación requerido',
                          },
                        },
                        label: 'Tipo de depreciación',
                        disabled: false,
                        helper_text: '',
                        select_options: depreciacion_types,
                        option_label: 'label',
                        option_key: 'value',
                      },
                      {
                        datum_type: 'select_controller',
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: 'id_unidad_medida_vida_util',
                        default_value: '',
                        rules: {
                          required_rule: {
                            rule: true,
                            message: 'Unidad de medida vida util requerida',
                          },
                        },
                        label: 'Unidad de medida vida util',
                        disabled: false,
                        helper_text: '',
                        select_options: unidad_medida,
                        option_label: 'nombre',
                        option_key: 'id_unidad_medida',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: 'cantidad_vida_util',
                        default_value:
                          action === 'create_sub'
                            ? current_nodo.data.bien?.nombre
                            : '',
                        rules: {
                          required_rule: {
                            rule: true,
                            message: 'Cantidad de vida util requerido',
                          },
                        },
                        label: 'Cantidad de vida util',
                        type: 'number',
                        disabled: false,
                        helper_text: '',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: 'valor_residual',
                        default_value:
                          action === 'create_sub'
                            ? current_nodo.data.bien?.nombre
                            : '',
                        rules: {
                          required_rule: {
                            rule: true,
                            message: 'Valor residual requerido',
                          },
                        },
                        label: 'Valor residual',
                        type: 'number',
                        disabled: false,
                        helper_text: '',
                      },
                      {
                        datum_type: 'select_controller',
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: 'id_marca',
                        default_value: '',
                        rules: {
                          required_rule: {
                            rule: true,
                            message: 'Marca requerida',
                          },
                        },
                        label: 'Marca',
                        disabled: false,
                        helper_text: '',
                        select_options: marca,
                        option_label: 'nombre',
                        option_key: 'id_marca',
                      },

                      {
                        datum_type: 'select_controller',
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: 'visible_solicitudes',
                        default_value: '',
                        rules: {
                          required_rule: {
                            rule: true,
                            message:
                              'Visible en solicitudes por vivero requerida',
                          },
                        },
                        label: '¿Visible en solicitudes?',
                        disabled: false,
                        helper_text: '',
                        select_options: [
                          { label: 'SI', value: 'true' },
                          { label: 'NO', value: 'false' },
                        ],
                        option_label: 'label',
                        option_key: 'value',
                      },
                      {
                        datum_type: 'select_controller',
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: 'maneja_hoja_vida',
                        default_value: '',
                        rules: {
                          required_rule: {
                            rule: true,
                            message: 'Seleccionar una opción',
                          },
                        },
                        label: '¿Maneja hoja de vida?',
                        disabled: false,
                        helper_text: '',
                        select_options: [
                          { label: 'SI', value: 'true' },
                          { label: 'NO', value: 'false' },
                        ],
                        option_label: 'label',
                        option_key: 'value',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 12,
                        control_form: control_bien,
                        control_name: 'descripcion',
                        default_value: '',
                        rules: {
                          required_rule: {
                            rule: true,
                            message: 'Descripción requerida',
                          },
                        },
                        label: 'Descripción',
                        type: 'text',
                        multiline_text: true,
                        rows_text: 4,
                        disabled: false,
                        helper_text: '',
                      },
                    ]
                  : [
                      {
                        datum_type: 'title',
                        title_label: 'Tipo de bien',
                      },
                      {
                        datum_type: 'select_controller',
                        xs: 12,
                        md: 12,
                        control_form: control_bien,
                        control_name: 'cod_tipo_bien',
                        default_value: '',
                        rules: {
                          required_rule: {
                            rule: true,
                            message: 'Tipo de bien requerido',
                          },
                        },
                        label: 'Tipo de bien',
                        disabled: false,
                        helper_text: 'Seleccione Tipo de bien',
                        select_options: tipo_bien,
                        option_label: 'label',
                        option_key: 'value',
                      },
                      {
                        datum_type: 'title',
                        title_label: 'Información del bien',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: 'codigo_bien',
                        default_value: '',
                        rules: {
                          required_rule: { rule: true, message: 'requerida' },
                        },
                        label: 'Codigo',
                        type: 'number',
                        disabled: false,
                        helper_text: '',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: 'nombre',
                        default_value: '',
                        rules: {
                          required_rule: {
                            rule: true,
                            message: 'Nombre requerido',
                          },
                        },
                        label: 'Nombre',
                        type: 'text',
                        disabled: false,
                        helper_text: '',
                      },
                      {
                        datum_type: 'select_controller',
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: 'cod_metodo_valoracion',
                        default_value: '',
                        rules: {
                          required_rule: {
                            rule: true,
                            message: 'Tipo de activo requerido',
                          },
                        },
                        label: 'Metodo de valoración',
                        disabled: false,
                        helper_text: '',
                        select_options: metodo_valoracion,
                        option_label: 'label',
                        option_key: 'value',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: 'nombre_padre',
                        default_value:
                          action === 'create_sub'
                            ? current_nodo.data.bien?.nombre
                            : '',
                        rules: {
                          required_rule: {
                            rule: false,
                            message: 'Nombre requerido',
                          },
                        },
                        label: 'Carpeta padre',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'select_controller',
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: 'id_unidad_medida',
                        default_value: '',
                        rules: {
                          required_rule: {
                            rule: true,
                            message: 'Unidad de medida requerida',
                          },
                        },
                        label: 'Unidad de medida',
                        disabled: false,
                        helper_text: '',
                        select_options: unidad_medida,
                        option_label: 'nombre',
                        option_key: 'id_unidad_medida',
                      },
                      {
                        datum_type: 'select_controller',
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: 'id_porcentaje_iva',
                        default_value: '',
                        rules: {
                          required_rule: {
                            rule: true,
                            message: 'Porcentaje IVA requerido',
                          },
                        },
                        label: 'Porcentaje IVA',
                        disabled: false,
                        helper_text: '',
                        select_options: porcentaje_iva,
                        option_label: 'porcentaje',
                        option_key: 'id_porcentaje_iva',
                      },

                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: 'stock_minimo',
                        default_value:
                          action === 'create_sub'
                            ? current_nodo.data.bien?.nombre
                            : '',
                        rules: {
                          required_rule: {
                            rule: true,
                            message: 'Stock minimo requerido',
                          },
                        },
                        label: 'Stock minimo',
                        type: 'number',
                        disabled: false,
                        helper_text: '',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: 'stock_maximo',
                        default_value:
                          action === 'create_sub'
                            ? current_nodo.data.bien?.nombre
                            : '',
                        rules: {
                          required_rule: {
                            rule: true,
                            message: 'Stock maximo requerido',
                          },
                        },
                        label: 'Stock maximo',
                        type: 'number',
                        disabled: false,
                        helper_text: '',
                      },
                      {
                        datum_type: 'select_controller',
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: 'solicitable_vivero',
                        default_value: '',
                        rules: {
                          required_rule: {
                            rule: true,
                            message: 'Solicitable por vivero requerida',
                          },
                        },
                        label: 'Solicitable por vivero',
                        disabled: false,
                        helper_text: '',
                        select_options: [
                          { label: 'SI', value: 'true' },
                          { label: 'NO', value: 'false' },
                        ],
                        option_label: 'label',
                        option_key: 'value',
                      },

                      {
                        datum_type: 'select_controller',
                        xs: 12,
                        md: 2,
                        control_form: control_bien,
                        control_name: 'visible_solicitudes',
                        default_value: '',
                        rules: {
                          required_rule: {
                            rule: true,
                            message:
                              'Visible en solicitudes por vivero requerida',
                          },
                        },
                        label: '¿Visible en solicitudes?',
                        disabled: false,
                        helper_text: '',
                        select_options: [
                          { label: 'SI', value: 'true' },
                          { label: 'NO', value: 'false' },
                        ],
                        option_label: 'label',
                        option_key: 'value',
                      },

                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 12,
                        control_form: control_bien,
                        control_name: 'descripcion',
                        default_value: '',
                        rules: {
                          required_rule: {
                            rule: true,
                            message: 'Descripción requerida',
                          },
                        },
                        label: 'Descripción',
                        type: 'text',
                        multiline_text: true,
                        rows_text: 4,
                        disabled: false,
                        helper_text: '',
                      },
                    ]
              }
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
              color="error"
              variant="contained"
              onClick={handle_close_add_bien}
              startIcon={<CloseIcon />}
            >
              CERRAR
            </Button>
            <Button
              type="submit"
              color="success"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              GUARDAR
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default CrearBienDialogForm;
