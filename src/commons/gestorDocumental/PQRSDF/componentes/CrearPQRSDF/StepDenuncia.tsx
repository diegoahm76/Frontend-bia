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
  set_pqr,
} from '../../store/slice/pqrsdfSlice';
import type { IObjPqrDenuncia } from '../../interfaces/pqrsdf';
import {
  get_areas_service,
  get_departments_service,
  get_municipalities_service,
} from '../../store/thunks/pqrsdfThunks';
interface IProps {
  control_form: any | null;
  reset: any | null;
  watch: any | null;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const StepDenuncia = ({ control_form, reset, watch }: IProps) => {
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const {
    presentation_types,
    pqr_types,
    pqr,
    media_types,
    destination_offices,
    type_applicant,
    denuncia,
    areas,
    departments,
    municipalities,
    resources,
  } = useAppSelector((state) => state.pqrsdf_slice);

  const [requiere_rta_view, set_requiere_rta_view] = useState<boolean>(false);
  const [otro, set_otro] = useState<boolean>(false);

  const on_change_select = (value: any, name: string): void => {
    if (name === 'cod_departamento') {
      if (value !== undefined) {
        void dispatch(get_municipalities_service(value.key));
      }
    }
  };

  useEffect(() => {
    void dispatch(get_areas_service());
    void dispatch(get_departments_service());
    if (denuncia !== null) {
      if (typeof denuncia?.cod_recursos_fectados_presuntos === 'string') {
        reset({
          ...denuncia,
          cod_recursos_fectados_presuntos: (
            denuncia?.cod_recursos_fectados_presuntos ?? ''
          ).split('|'),
        });
      } else {
        if (denuncia?.cod_recursos_fectados_presuntos === null) {
          reset({
            ...denuncia,
            cod_recursos_fectados_presuntos: [],
          });
        } else {
          reset(denuncia);
        }
      }
      set_requiere_rta_view(
        pqr?.denuncia?.ya_habia_puesto_en_conocimiento ?? false
      );
    }
  }, []);

  useEffect(() => {
    if (watch('cod_recursos_fectados_presuntos')?.includes('Otro')) {
      set_otro(true);
    } else {
      set_otro(false);
    }
  }, [watch('cod_recursos_fectados_presuntos')]);

  useEffect(() => {
    //  console.log('')(denuncia);
    if (denuncia !== null) {
      if (typeof denuncia?.cod_recursos_fectados_presuntos === 'string') {
        reset({
          ...denuncia,
          cod_recursos_fectados_presuntos: (
            denuncia?.cod_recursos_fectados_presuntos ?? ''
          ).split('|'),
          cod_departamento: (
            denuncia.cod_municipio_cocalizacion_hecho ?? ''
          ).substring(0, 2),
        });
      } else {
        if (denuncia?.cod_recursos_fectados_presuntos === null) {
          reset({
            ...denuncia,
            cod_recursos_fectados_presuntos: [],
            cod_departamento: (
              denuncia.cod_municipio_cocalizacion_hecho ?? ''
            ).substring(0, 2),
          });
        } else {
          reset({
            ...denuncia,
            cod_departamento: (
              denuncia.cod_municipio_cocalizacion_hecho ?? ''
            ).substring(0, 2),
          });
        }
      }
      if ((denuncia.cod_municipio_cocalizacion_hecho ?? null) !== null) {
        void dispatch(
          get_municipalities_service(
            (denuncia.cod_municipio_cocalizacion_hecho ?? '').substring(0, 2)
          )
        );
      }
      set_requiere_rta_view(
        pqr?.denuncia?.ya_habia_puesto_en_conocimiento ?? false
      );
    }
  }, [denuncia]);

  useEffect(() => {
    //  console.log('')(pqr);
    if (pqr.denuncia !== null && pqr.denuncia !== undefined) {
      dispatch(set_denuncia(pqr.denuncia));
    } else {
      dispatch(set_denuncia(initial_state_denuncia));
    }
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
              title_label: 'Información de la denuncia',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 4,
              control_form: control_form,
              control_name: 'Cod_zona_localizacion',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Zona',
              disabled: false,
              helper_text: 'Debe seleccionar campo',
              select_options: areas,
              option_label: 'label',
              option_key: 'key',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 4,
              control_form: control_form,
              control_name: 'cod_departamento',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Departamento',
              disabled: false,
              helper_text: 'Debe seleccionar campo',
              select_options: departments,
              option_label: 'label',
              option_key: 'key',
              on_change_function: on_change_select,
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 4,
              control_form: control_form,
              control_name: 'cod_municipio_cocalizacion_hecho',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Municipio',
              disabled: false,
              helper_text: 'Debe seleccionar campo',
              select_options: municipalities,
              option_label: 'label',
              option_key: 'key',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 6,
              control_form: control_form,
              control_name: 'barrio_vereda_localizacion',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Barrio o vereda',
              type: 'text',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 6,
              control_form: control_form,
              control_name: 'direccion_localizacion',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Dirección',
              type: 'text',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 4,
              control_form: control_form,
              control_name: 'cod_recursos_fectados_presuntos',
              default_value: [],
              rules: { required_rule: { rule: false, message: 'requerido' } },
              label: 'Recursos afectados',
              disabled: false,
              helper_text: 'Debe seleccionar campo',
              select_options: resources,
              option_label: 'label',
              option_key: 'key',
              multiple: true,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 6,
              control_form: control_form,
              control_name: 'otro_recurso_Afectado_cual',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: '¿Cual?',
              type: 'text',
              disabled: false,
              helper_text: '',
              hidden_text: !otro,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 12,
              control_form: control_form,
              control_name: 'evidencias_soportan_hecho',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Evidencias que soportan el hecho',
              type: 'text',
              multiline_text: true,
              rows_text: 4,
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 12,
              control_form: control_form,
              control_name: 'nombre_completo_presunto_infractor',
              default_value: '',
              rules: { required_rule: { rule: false, message: 'Requerido' } },
              label: 'Nombre completo infractor',
              type: 'text',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 6,
              control_form: control_form,
              control_name: 'telefono_presunto_infractor',
              default_value: '',
              rules: { required_rule: { rule: false, message: 'Requerido' } },
              label: 'Telefono infractor',
              type: 'text',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 6,
              control_form: control_form,
              control_name: 'direccion_presunto_infractor',
              default_value: '',
              rules: { required_rule: { rule: false, message: 'Requerido' } },
              label: 'Dirección infractor',
              type: 'text',
              disabled: false,
              helper_text: '',
            },

            {
              datum_type: 'checkbox_controller',
              xs: 12,
              md: 6,
              control_form: control_form,
              control_name: 'ya_habia_puesto_en_conocimiento',
              default_value: requiere_rta_view,
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Ya se habia puesto en conocimiento el mismo hecho',
              disabled: false,
              helper_text: '',
              checked: requiere_rta_view,
              set_checked: set_requiere_rta_view,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 6,
              control_form: control_form,
              control_name: 'ante_que_autoridad_había_interpuesto',
              default_value: '',
              rules: { required_rule: { rule: false, message: 'Requerido' } },
              label: 'Ante que autoridad',
              type: 'text',
              disabled: false,
              helper_text: '',
              hidden_text: !requiere_rta_view,
            },
          ]}
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default StepDenuncia;
