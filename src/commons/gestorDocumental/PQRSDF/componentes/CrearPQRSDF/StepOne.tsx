import { useEffect, useState } from 'react';

import { api } from '../../../../../api/axios';
import { type Persona } from '../../../../../interfaces/globalModels';
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import BuscarModelo from '../../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';
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
} from '../../store/slice/pqrsdfSlice';
interface IProps {
  control_form: any | null;
  reset: any | null;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const StepOne = ({ control_form, reset }: IProps) => {
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const { representacion_legal } = useAppSelector((state) => state.auth);
  const {
    presentation_types,
    pqr_types,
    pqr,
    media_types,
    destination_offices,
    type_applicant,
  } = useAppSelector((state) => state.pqrsdf_slice);
  const [requiere_rta_view, set_requiere_rta_view] = useState<boolean>(false);

  const on_change_select = (value: any, name: string): void => {
    if (name === 'cod_tipo_PQRSDF') {
      if (value !== undefined) {
        if (value.key === 'F') {
          set_requiere_rta_view(true);
        } else {
          set_requiere_rta_view(false);
        }
      }
    }
  };
  useEffect(() => {
    reset({
      ...pqr,
      cod_forma_presentacion:
        representacion_legal?.tipo_sesion === 'E'
          ? 'E'
          : pqr.cod_forma_presentacion,
      id_medio_solicitud:
        representacion_legal?.tipo_sesion === 'E' ? 2 : pqr.id_medio_solicitud,
    });
  }, []);

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <PrimaryForm
          on_submit_form={null}
          button_submit_label=""
          button_submit_icon_class={null}
          show_button={false}
          form_inputs={[
            {
              datum_type: 'title',
              title_label: 'Tipo de PQRSDF',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 4,
              control_form: control_form,
              control_name: 'cod_tipo_PQRSDF',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Tipo de PQRSDF',
              disabled: false,
              helper_text: 'Debe seleccionar campo',
              select_options: pqr_types,
              option_label: 'label',
              option_key: 'key',
              on_change_function: on_change_select,
            },
            {
              datum_type: 'date_picker_controller',
              xs: 12,
              md: 4,
              control_form: control_form,
              control_name: 'fecha_registro',
              default_value: new Date(),
              rules: {},
              label: 'Fecha de elaboración',
              disabled: true,
              helper_text: '',
              format: 'YYYY-MM-DD',
            },
            {
              datum_type: 'checkbox_controller',
              xs: 12,
              md: 4,
              control_form: control_form,
              control_name: 'requiere_rta',
              default_value: pqr.requiere_rta ?? true,
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Requiere respuesta',
              disabled: false,
              helper_text: '',
              hidden_text: !(
                requiere_rta_view || (pqr.cod_tipo_PQRSDF ?? null) === 'F'
              ),
            },
            {
              datum_type: 'title',
              title_label: 'Información de PQRSDF',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 12,
              control_form: control_form,
              control_name: 'asunto',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Asunto',
              type: 'text',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 4,
              control_form: control_form,
              control_name: 'cod_forma_presentacion',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Forma de presentación',
              disabled: representacion_legal?.tipo_sesion === 'E',
              helper_text: 'Debe seleccionar campo',
              select_options: presentation_types,
              option_label: 'label',
              option_key: 'key',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 4,
              control_form: control_form,
              control_name: 'id_medio_solicitud',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Medio de solicitud',
              disabled: representacion_legal?.tipo_sesion === 'E',
              helper_text: 'Debe seleccionar campo',
              select_options: media_types,
              option_label: 'label',
              option_key: 'key',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 4,
              control_form: control_form,
              control_name: 'id_sucursal_especifica_implicada',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Dirigida a la sucursal',
              disabled: false,
              helper_text: 'Debe seleccionar campo',
              select_options: destination_offices,
              option_label: 'label',
              option_key: 'key',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 12,
              control_form: control_form,
              control_name: 'descripcion',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Descripción',
              type: 'text',
              multiline_text: true,
              rows_text: 4,
              disabled: false,
              helper_text: '',
            },
          ]}
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default StepOne;
