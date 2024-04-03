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



import { IObjOtros } from '../../PQRSDF/interfaces/pqrsdf';
import { Title } from '../../../../components/Title';
import PrimaryForm from '../../../../components/partials/form/PrimaryForm';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

interface IProps {

  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  selected_otro:any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const OtroDialog = ({
 
  is_modal_active,
  set_is_modal_active, selected_otro
}: IProps) => {
  const dispatch = useAppDispatch();

  const {otro, pqr_request } = useAppSelector((state: { pqrsdf_slice: any; }) => state.pqrsdf_slice);

  const {
    control: control_detail,
    handleSubmit: handle_submit,
    reset: reset_detail,
    watch,
  } = useForm<IObjOtros >();
  const handle_close_add_bien = (): void => {
    set_is_modal_active(false);
  };

  useEffect(() => {
    reset_detail(selected_otro);
     console.log()
  }, [selected_otro]);
  useEffect(() => {
    reset_detail(pqr_request);
  }, [pqr_request]);

  return (
    <Dialog
      maxWidth="xl"
      open={is_modal_active}
      onClose={handle_close_add_bien}
      fullWidth
    >
      <Box component="form">
        <Grid item xs={12} marginLeft={2} marginRight={2} marginTop={3}>
          <Title
            title={
              
             'Resumen de la solicitud OTROS'
               
            }
          />
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
              form_inputs={
                 [
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 3,
                        control_form: control_detail,
                        control_name: 'cod_forma_presentacion',
                        default_value: '',
                        rules: {},
                        label: 'Codigo',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 3,
                        control_form: control_detail,
                        control_name: 'nombre_estado_solicitud',
                        default_value: '',
                        rules: {},
                        label: 'Estado',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 6,
                        control_form: control_detail,
                        control_name: 'nombre_completo_titular',
                        default_value: '',
                        rules: {},
                        label: 'Titular',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 6,
                        control_form: control_detail,
                        control_name: 'asunto',
                        default_value: '',
                        rules: {},
                        label: 'Asunto',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 6,
                        control_form: control_detail,
                        control_name: 'descripcion',
                        default_value: '',
                        rules: {},
                        multiline: true,
                        rows: 4,
                        label: 'Descripción',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'input_controller',
                        xs: 12,
                        md: 6,
                        control_form: control_detail,
                        control_name: 'numero_radicado',
                        default_value: '',
                        rules: {},
                        label:
                          otro.id_radicado === null
                            ? 'NO RADICADA AÚN'
                            : 'Número de radicado',
                        type: 'text',
                        disabled: true,
                        helper_text: '',
                      },
                      {
                        datum_type: 'date_picker_controller',
                        xs: 12,
                        md: 6,
                        control_form: control_detail,
                        control_name:
                          otro.fecha_radicado === null
                            ? 'fecha_registro'
                            : 'fecha_radicado',
                        default_value: '',
                        rules: {},
                        label:
                          otro.fecha_radicado === null
                            ? 'Fecha de registro'
                            : 'Fecha de radicado',
                        disabled: true,
                        helper_text: '',
                        format: 'YYYY-MM-DD',
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
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default OtroDialog;
