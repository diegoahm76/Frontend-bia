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
  initial_state_denuncia,
  set_denuncia,
} from '../../store/slice/complementoPqrsdfSlice';
import type { IObjPqrDenuncia } from '../../interfaces/complemento_pqrsdf';
import {
  get_areas_service,
  get_departments_service,
  get_municipalities_service,
} from '../../store/thunks/complementoPqrsdfThunks';
interface IProps {
  control_form: any | null;
  reset: any | null;
  watch: any | null;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const StepTwo = ({ control_form, reset, watch }: IProps) => {
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const { complement_pqr, media_types } = useAppSelector(
    (state) => state.complemento_pqrsdf_slice
  );

  useEffect(() => {
    reset({
      ...complement_pqr,
      id_medio_solicitud_comple:
        userinfo.tipo_usuario === 'E'
          ? 2
          : complement_pqr.id_medio_solicitud_comple,
    });
  }, []);

  useEffect(() => {
    reset({
      ...complement_pqr,
      id_medio_solicitud_comple:
        userinfo.tipo_usuario === 'E'
          ? 2
          : complement_pqr.id_medio_solicitud_comple,
    });
  }, [complement_pqr]);

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
              title_label: 'Complemento sobre PQRSDF',
            },
            {
              datum_type: 'date_picker_controller',
              xs: 12,
              md: 6,
              control_form: control_form,
              control_name: 'fecha_complemento',
              default_value: new Date(),
              rules: {},
              label: 'Fecha de elaboración',
              disabled: true,
              helper_text: '',
              format: 'YYYY-MM-DD',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 6,
              control_form: control_form,
              control_name: 'id_medio_solicitud_comple',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Medio de solicitud',
              disabled:
                complement_pqr.id_radicado !== null ||
                userinfo.tipo_usuario == 'E',
              helper_text: 'Debe seleccionar campo',
              select_options: media_types,
              option_label: 'label',
              option_key: 'key',
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
              disabled: complement_pqr.id_radicado !== null,
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
              disabled: complement_pqr.id_radicado !== null,
              helper_text: '',
            },
          ]}
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default StepTwo;
