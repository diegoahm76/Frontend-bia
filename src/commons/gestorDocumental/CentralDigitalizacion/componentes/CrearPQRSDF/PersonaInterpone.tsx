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
} from '../../store/slice/centralDigitalizacionSlice';
import {
  IObjCompany,
  IObjPerson,
} from '../../interfaces/central_digitalizacion';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const PersonaInterpone = () => {
  const dispatch = useAppDispatch();
  const { type_applicant, on_behalf_of, person, company, grantor, attorney } =
    useAppSelector((state) => state.pqrsdf_slice);
  const { control: control_persona_interpone, reset } = useForm<
    IObjPerson | IObjCompany
  >();

  useEffect(() => {
    switch (on_behalf_of.key) {
      case 'P':
        reset(initial_state_person);
        break;
      case 'E':
        reset(company);
        break;
      case 'A':
        reset(attorney);
        break;
      default:
        reset(initial_state_person);
        break;
    }
  }, [attorney, company, person]);

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <PrimaryForm
          on_submit_form={null}
          button_submit_label=""
          button_submit_icon_class={null}
          show_button={false}
          form_inputs={
            on_behalf_of.key === 'E'
              ? [
                  {
                    datum_type: 'title',
                    title_label: 'Representante legal',
                  },
                  {
                    datum_type: 'input_controller',
                    xs: 12,
                    md: 6,
                    control_form: control_persona_interpone,
                    control_name: ' representatives_document_type',
                    default_value: '',
                    rules: {},
                    label: 'Tipo de documento',
                    type: 'text',
                    disabled: true,
                    helper_text: '',
                  },
                  {
                    datum_type: 'input_controller',
                    xs: 12,
                    md: 6,
                    control_form: control_persona_interpone,
                    control_name: 'representatives_document',
                    default_value: '',
                    rules: {
                      required_rule: { rule: true, message: 'Requerido' },
                    },
                    label: 'Número de documento',
                    type: 'text',
                    disabled: true,
                    helper_text: '',
                  },
                  {
                    datum_type: 'input_controller',
                    xs: 12,
                    md: 6,
                    control_form: control_persona_interpone,
                    control_name: 'representatives_full_name',
                    default_value: '',
                    rules: {},
                    label: 'Nombre completo',
                    type: 'text',
                    disabled: true,
                    helper_text: '',
                  },
                  {
                    datum_type: 'input_controller',
                    xs: 12,
                    md: 6,
                    control_form: control_persona_interpone,
                    control_name: 'business_name',
                    default_value: 'Representante legal',
                    rules: {},
                    label: 'Relación con el titular',
                    type: 'text',
                    disabled: true,
                    helper_text: '',
                  },
                ]
              : on_behalf_of.key === 'A'
              ? [
                  {
                    datum_type: 'title',
                    title_label: 'Persona apoderada',
                  },
                  {
                    datum_type: 'input_controller',
                    xs: 12,
                    md: 6,
                    control_form: control_persona_interpone,
                    control_name: 'document_type',
                    default_value: '',
                    rules: {},
                    label: 'Tipo de documento',
                    type: 'text',
                    disabled: true,
                    helper_text: '',
                  },
                  {
                    datum_type: 'input_controller',
                    xs: 12,
                    md: 6,
                    control_form: control_persona_interpone,
                    control_name: 'document',
                    default_value: '',
                    rules: {
                      required_rule: { rule: true, message: 'Requerido' },
                    },
                    label: 'Número de documento',
                    type: 'text',
                    disabled: true,
                    helper_text: '',
                  },
                  {
                    datum_type: 'input_controller',
                    xs: 12,
                    md: 6,
                    control_form: control_persona_interpone,
                    control_name: 'full_name',
                    default_value: '',
                    rules: {},
                    label: 'Nombre completo',
                    type: 'text',
                    disabled: true,
                    helper_text: '',
                  },
                  {
                    datum_type: 'input_controller',
                    xs: 12,
                    md: 6,
                    control_form: control_persona_interpone,
                    control_name: 'business_name',
                    default_value: 'Apoderado',
                    rules: {},
                    label: 'Relación con el titular',
                    type: 'text',
                    disabled: true,
                    helper_text: '',
                  },
                ]
              : []
          }
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default PersonaInterpone;
