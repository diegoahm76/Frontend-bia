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
} from '../../store/slice/complementoPqrsdfSlice';
import ListadoComplementos from './ListadoComplementos';
interface IProps {
  control_form: any | null;
  reset: any | null;
  delete_function: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const StepOne = ({ control_form, reset, delete_function }: IProps) => {
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const {
    presentation_types,
    pqr_types,
    media_types,
    destination_offices,
    type_applicant,
  } = useAppSelector((state) => state.pqrsdf_slice);
  const { pqr } = useAppSelector((state) => state.complemento_pqrsdf_slice);
  const [requiere_rta_view, set_requiere_rta_view] = useState<boolean>(false);

  useEffect(() => {
    reset(pqr);
  }, []);
  useEffect(() => {
    reset(pqr);
  }, [pqr]);

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
              title_label: 'Información del PQRSDF',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 6,
              control_form: control_form,
              control_name: 'nombre_tipo_pqrsdf',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Tipo de PQRSDF',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 6,
              control_form: control_form,
              control_name: 'nombre_estado_pqrsdf',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Asunto',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 6,
              control_form: control_form,
              control_name: 'numero_radicado_completo',
              default_value: '',
              rules: { required_rule: { rule: false, message: 'Requerido' } },
              label: 'Número de radicado',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'date_picker_controller',
              xs: 12,
              md: 6,
              control_form: control_form,
              control_name: 'fecha_radicado',
              default_value: new Date(),
              rules: {},
              label: 'Fecha de radicado',
              disabled: true,
              helper_text: '',
              format: 'YYYY-MM-DD',
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
              disabled: true,
              helper_text: '',
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
              disabled: true,
              helper_text: '',
            },
          ]}
        />
        <ListadoComplementos delete_function={delete_function} />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default StepOne;
