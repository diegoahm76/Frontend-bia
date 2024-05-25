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
  initial_state_pqr,
  set_pqr,
  set_exhibits,
} from '../../store/slice/pqrsdfSlice';
import { get_pqrs_service } from '../../store/thunks/pqrsdfThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const EstadoPqrsdf = () => {
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const { control: control_estado, reset } = useForm<any>();
  const {
    list_pqr_status,
    pqr_status,
    company,
    person,
    grantor,
    on_behalf_of,
  } = useAppSelector((state) => state.pqrsdf_slice);

  const on_change_select = (value: any, name: string): void => {
    if (name === 'pqr_status') {
      if (value !== undefined) {
        dispatch(set_pqr_status(value));
        //  console.log('')(value);
        if (value.key === 'ESR') {
          if (on_behalf_of.key === 'P') {
            if (person.id_persona !== null && person.id_persona !== undefined) {
              void dispatch(get_pqrs_service(person.id_persona));
            }
          } else if (on_behalf_of.key === 'E') {
            if (
              company.id_persona !== null &&
              company.id_persona !== undefined
            ) {
              void dispatch(get_pqrs_service(company.id_persona));
            }
          } else {
            if (
              grantor.id_persona !== null &&
              grantor.id_persona !== undefined
            ) {
              void dispatch(get_pqrs_service(grantor.id_persona));
            }
          }
        } else {
          dispatch(set_pqrs([]));
          dispatch(set_pqr(initial_state_pqr));
          dispatch(set_exhibits([]));
        }
      } else {
        dispatch(set_pqr_status({ id: null, key: null, label: null }));
        dispatch(set_pqrs([]));
        dispatch(set_pqr(initial_state_pqr));
        dispatch(set_exhibits([]));
      }
    }
  };
  useEffect(() => {
    reset({
      pqr_status: pqr_status.key,
    });
  }, [pqr_status]);

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
              title_label: 'Estado del PQRSDF',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 4,
              control_form: control_estado,
              control_name: 'pqr_status',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Estado de PQRSDF',
              disabled: false,
              helper_text: 'Debe seleccionar campo',
              select_options: list_pqr_status,
              option_label: 'label',
              option_key: 'key',
              on_change_function: on_change_select,
            },
          ]}
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default EstadoPqrsdf;
