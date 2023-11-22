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
  set_person,
  set_request_status,
  set_request_type,
} from '../../store/slice/centralDigitalizacionSlice';
import { get_pqrs_service } from '../../store/thunks/pqrsdfThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DigitalizacionesPendientes = () => {
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const { control: control_solicitud, reset } = useForm<any>();
  const { request_types, list_request_status, person } = useAppSelector(
    (state) => state.central_digitalizacion_slice
  );

  const on_change_select = (value: any, name: string): void => {
    if (name === 'pqr_status') {
      if (value !== undefined) {
        dispatch(set_request_type(value));
      } else {
        dispatch(set_request_type({ id: null, key: null, label: null }));
      }
    } else {
      if (value !== undefined) {
        dispatch(set_request_status(value));
      } else {
        dispatch(set_request_status({ id: null, key: null, label: null }));
      }
    }
  };

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
              title_label: 'Tareas de digitalización',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_solicitud,
              control_name: 'tipo_solicitud',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Tipo de solicitud',
              disabled: false,
              helper_text: '',
              select_options: request_types,
              option_label: 'label',
              option_key: 'key',
              on_change_function: on_change_select,
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_solicitud,
              control_name: 'estado_solicitud',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Estado de solicitud',
              disabled: false,
              helper_text: '',
              select_options: list_request_status,
              option_label: 'label',
              option_key: 'key',
              on_change_function: on_change_select,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_solicitud,
              control_name: ' nro_radicado',
              default_value: '',
              rules: {},
              label: 'Número de radicado',
              type: 'text',
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
export default DigitalizacionesPendientes;
