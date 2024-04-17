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
} from '../../store/slice/pqrsdfSlice';
import { setCurrentPersonaRespuestaUsuario } from '../../../TramitesOServicios/respuestaRequerimientoOpa/toolkit/slice/ResRequerimientoOpaSlice';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionTipoPersona = () => {
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const { representacion_legal } = useAppSelector((state) => state.auth);
  const { control: control_seleccion_tipo_persona, reset } = useForm<any>();
  const {
    list_applicant_types,
    list_on_behalf_of,
    type_applicant,
    on_behalf_of,
  } = useAppSelector((state) => state.pqrsdf_slice);

  const on_change_select = (value: any, name: string): void => {
    dispatch(set_person(initial_state_person));
    dispatch(set_company(initial_state_company));
    dispatch(set_grantor(initial_state_person));
    dispatch(set_attorney(initial_state_person));
    if (name === 'type_applicant') {
      dispatch(set_on_behalf_of({ id: null, key: '', label: null }));
      if (value !== undefined) {
        dispatch(set_type_applicant(value));
      } else {
        dispatch(set_type_applicant({ id: null, key: null, label: null }));
      }
    } else if (name === 'on_behalf_of') {
      if (value !== undefined) {
        dispatch(set_on_behalf_of(value));
      } else {
        dispatch(set_on_behalf_of({ id: null, key: null, label: null }));
      }
    }
  };
  useEffect(() => {
    reset({
      type_applicant: type_applicant.key,
      on_behalf_of: on_behalf_of.key,
    });
  }, [type_applicant, on_behalf_of]);


  useEffect(() => {
    if (representacion_legal.tipo_sesion === 'E') {
      //* analizar si se debe cambiar la forma en la que se estructura el datos para almacenarlo de manera mas ordenada
      dispatch(
        setCurrentPersonaRespuestaUsuario({
          ...userinfo,
          ...representacion_legal,
        } as any)
      );
      return;
    }

    dispatch(setCurrentPersonaRespuestaUsuario(null as any));
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
              title_label: 'PQRSDF',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 4,
              control_form: control_seleccion_tipo_persona,
              control_name: 'type_applicant',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'A nombre de',
              disabled: representacion_legal.tipo_sesion === 'E',
              helper_text: 'Debe seleccionar campo',
              select_options: list_applicant_types,
              option_label: 'label',
              option_key: 'key',
              on_change_function: on_change_select,
            },
            {
              datum_type: 'date_picker_controller',
              xs: 12,
              md: 4,
              control_form: control_seleccion_tipo_persona,
              control_name: 'fecha_actual',
              default_value: new Date(),
              rules: {},
              label: 'Fecha',
              disabled: true,
              helper_text: '',
              format: 'YYYY-MM-DD',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_seleccion_tipo_persona,
              control_name: 'on_behalf_of',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'En representación de',
              disabled: representacion_legal.tipo_sesion === 'E',
              helper_text: 'Debe seleccionar campo',
              select_options: list_on_behalf_of,
              option_label: 'label',
              option_key: 'key',
              hidden_text: type_applicant.id !== 'T',
              on_change_function: on_change_select,
            },
          ]}
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SeleccionTipoPersona;
