import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';

import {
  initial_state_person,
} from '../../PQRSDF/store/slice/pqrsdfSlice';
import { IObjCompany, IObjPerson } from '../../PQRSDF/interfaces/pqrsdf';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import PrimaryForm from '../../../../components/partials/form/PrimaryForm';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const PersonaTitularOtros = () => {
  const dispatch = useAppDispatch();
  const { type_applicant, on_behalf_of, person, company, grantor, attorney } =
    useAppSelector((state) => state.pqrsdf_slice);
  const { control: control_persona_titular, reset } = useForm<
    IObjPerson | IObjCompany
  >();

  useEffect(() => {
    console.log(person, grantor, company);
    switch (on_behalf_of.key) {
      case 'P':
        reset(person);
        break;
      case 'E':
        reset(company);
        break;
      case 'A':
        reset(grantor);
        break;
      default:
        reset(initial_state_person);
        break;
    }
  }, [person, grantor, company]);

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <PrimaryForm
          on_submit_form={null}
          button_submit_label=""
          button_submit_icon_class={null}
          show_button={false}
          form_inputs={
            type_applicant.key === 'A'
              ? [
                  {
                    datum_type: 'title',
                    title_label: 'Persona anonima',
                  },
                ]
              : on_behalf_of.key === 'P'
              ? [
                  {
                    datum_type: 'title',
                    title_label: 'Persona titular',
                  },
                  {
                    datum_type: 'input_controller',
                    xs: 12,
                    md: 6,
                    control_form: control_persona_titular,
                    control_name: 'tipo_documento',
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
                    control_form: control_persona_titular,
                    control_name: 'numero_documento',
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
                    md: 12,
                    control_form: control_persona_titular,
                    control_name: 'nombre_completo',
                    default_value: '',
                    rules: {},
                    label: 'Nombre completo',
                    type: 'text',
                    disabled: true,
                    helper_text: '',
                  },
                ]
              : on_behalf_of.key === 'E'
              ? [
                  {
                    datum_type: 'title',
                    title_label: 'Empresa',
                  },
                  {
                    datum_type: 'input_controller',
                    xs: 12,
                    md: 6,
                    control_form: control_persona_titular,
                    control_name: 'tipo_documento',
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
                    control_form: control_persona_titular,
                    control_name: 'numero_documento',
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
                    control_form: control_persona_titular,
                    control_name: 'nombre_comercial',
                    default_value: '',
                    rules: {},
                    label: 'Nombre comercial',
                    type: 'text',
                    disabled: true,
                    helper_text: '',
                  },
                  {
                    datum_type: 'input_controller',
                    xs: 12,
                    md: 6,
                    control_form: control_persona_titular,
                    control_name: 'razon_social',
                    default_value: '',
                    rules: {},
                    label: 'Razón social',
                    type: 'text',
                    disabled: true,
                    helper_text: '',
                  },
                ]
              : on_behalf_of.key === 'A'
              ? [
                  {
                    datum_type: 'title',
                    title_label: 'Persona titular',
                  },
                  {
                    datum_type: 'input_controller',
                    xs: 12,
                    md: 6,
                    control_form: control_persona_titular,
                    control_name: 'tipo_documento',
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
                    control_form: control_persona_titular,
                    control_name: 'numero_documento',
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
                    md: 12,
                    control_form: control_persona_titular,
                    control_name: 'nombre_completo',
                    default_value: '',
                    rules: {},
                    label: 'Nombre completo',
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
export default PersonaTitularOtros;
