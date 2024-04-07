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
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PrimaryForm from '../../../../../components/partials/form/PrimaryForm';
import type { IObjDocumentType, IObjPerson } from '../../interfaces/pqrsdf';
import {
  set_grantors,
  set_person,
  set_person_type,
  set_document_types,
  set_document_type,
  set_grantor,
  set_attorney,
  set_attorneys,
  initial_state_person,
} from '../../store/slice/pqrsdfSlice';
import {
  get_attorney_document_service,
  get_attorneys_service,
  get_document_types_service,
  get_person_document_service,
  get_persons_service,
} from '../../store/thunks/pqrsdfThunks';
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const TipoPoderdante = () => {
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const { representacion_legal } = useAppSelector((state) => state.auth);
  const {
    control: control_tipo_poderdante,
    reset: reset_poderdante,
    getValues: get_values,
  } = useForm<IObjPerson>();
  const {
    control: control_apoderado,
    reset: reset_apoderado,
    getValues: get_values_apoderado,
  } = useForm<IObjPerson>();
  const {
    grantors,
    grantor,
    attorneys,
    attorney,
    document_types,
    document_type,
    person_types,
    person_type,
    type_applicant,
    on_behalf_of,
  } = useAppSelector((state) => state.pqrsdf_slice);
  const [aux_document_types, set_aux_document_types] = useState<
    IObjDocumentType[]
  >([]);
  const [active_dialog_attroneys, set_active_dialog_attroneys] =
    useState(false);

  // useEffect(() => {
  //   // void dispatch(get_document_types_service());
  //   //  console.log('')(watch('document_type'));
  // }, [watch('document_type')]);

  useEffect(() => {
    void dispatch(get_document_types_service());
  }, []);
  useEffect(() => {
    reset_poderdante(grantor);
    dispatch(set_attorney(initial_state_person));
    if (representacion_legal.tipo_sesion === 'E') {
      void dispatch(
        get_attorney_document_service(
          userinfo.tipo_documento ?? '',
          userinfo.numero_documento ?? ''
        )
      );
    } else {
      dispatch(set_attorney(initial_state_person));

      if (grantor.id_persona !== null && grantor.id_persona !== undefined) {
        dispatch(get_attorneys_service(grantor.id_persona));
      }
    }
  }, [grantor]);

  useEffect(() => {
    reset_apoderado(attorney);
  }, [attorney]);

  useEffect(() => {
    if (attorneys.length > 0) {
      set_active_dialog_attroneys(true);
    }
  }, [attorneys]);

  useEffect(() => {
    set_aux_document_types(document_types);
  }, [document_types]);

  const columns_personas: GridColDef[] = [
    {
      field: 'tipo_documento',
      headerName: 'Tipo de documento',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'numero_documento',
      headerName: 'Número de documento',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nombre_completo',
      headerName: 'Nombre completo',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },

    {
      field: 'tipo_persona',
      headerName: 'Tipo de persona',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];

  const on_change_select = (value: any, name: string): void => {
    if (name === 'tipo_persona') {
      dispatch(set_document_type({ cod_tipo_documento: null, nombre: null }));
      if (value !== undefined) {
        dispatch(set_person_type(value));
        set_aux_document_types(
          document_types.filter((objeto: IObjDocumentType) =>
            value.id === 'N'
              ? objeto.cod_tipo_documento !== 'NT'
              : objeto.cod_tipo_documento === 'NT'
          )
        );
      } else {
        dispatch(set_person_type({ id: null, key: null, label: null }));
        set_aux_document_types(document_types);
      }
    } else if (name === 'tipo_documento') {
      if (value !== undefined) {
        dispatch(set_document_type(value));
      } else {
        dispatch(set_document_type({ cod_tipo_documento: null, nombre: null }));
      }
    }
  };

  const get_personas: any = async () => {
    const document = get_values('numero_documento') ?? '';
    const type = get_values('tipo_documento') ?? '';
    const name = get_values('primer_nombre') ?? '';
    const last_name = get_values('primer_apellido') ?? '';
    //  console.log('')(document, type, name, last_name, person_type);
    void dispatch(
      get_persons_service(type, document, name, last_name, '', '', false)
    );
  };

  const search_person: any = async () => {
    const document = get_values('numero_documento') ?? '';
    const type = get_values('tipo_documento') ?? '';
    void dispatch(get_person_document_service(type, document, false));
  };
  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <BuscarModelo
          set_current_model={set_grantor}
          row_id={'id_persona'}
          columns_model={columns_personas}
          models={grantors}
          get_filters_models={get_personas}
          set_models={set_grantors}
          reset_values={reset_poderdante}
          button_submit_label="BUSCAR"
          button_submit_disabled={representacion_legal.tipo_sesion === 'E'}
          show_search_button={!(representacion_legal.tipo_sesion === 'E')}
          form_inputs={[
            {
              datum_type: 'title',
              title_label: 'A nombre propio - Titular',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_tipo_poderdante,
              control_name: 'tipo_documento',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Tipo de documento',
              disabled: representacion_legal.tipo_sesion === 'E',
              helper_text: 'Debe seleccionar campo',
              select_options: aux_document_types,
              option_label: 'nombre',
              option_key: 'cod_tipo_documento',
              on_change_function: on_change_select,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_tipo_poderdante,
              control_name: 'numero_documento',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Número de documento',
              type: 'number',
              disabled:
                (document_type.cod_tipo_documento ?? null) === null ||
                representacion_legal.tipo_sesion === 'E',
              helper_text: 'Digite para buscar',
              on_blur_function: search_person,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_tipo_poderdante,
              control_name: 'nombre_completo',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Nombre completo',
              type: 'text',
              disabled: true,
              helper_text:
                grantor.id_persona === null
                  ? 'No se ha seleccionado poderdante'
                  : '',
            },
          ]}
          modal_select_model_title="Buscar poderdante"
          modal_form_filters={[
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 2,
              control_form: control_tipo_poderdante,
              control_name: 'tipo_persona',
              default_value: '',
              rules: {},
              label: 'Tipo de persona',
              disabled: false,
              helper_text: 'Debe seleccionar tipo',
              select_options: person_types,
              option_label: 'label',
              option_key: 'key',
              on_change_function: on_change_select,
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 2,
              control_form: control_tipo_poderdante,
              control_name: 'tipo_documento',
              default_value: '',
              rules: {},
              label: 'Tipo de documento',
              disabled: person_type.id === null,
              helper_text: '',
              select_options: aux_document_types,
              option_label: 'nombre',
              option_key: 'cod_tipo_documento',
              on_change_function: on_change_select,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_tipo_poderdante,
              control_name: 'numero_documento',
              default_value: '',
              rules: {},
              label: 'Número de documento',
              type: 'number',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_tipo_poderdante,
              control_name: 'primer_nombre',
              default_value: '',
              rules: {},
              label: 'Nombre',
              type: 'text',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_tipo_poderdante,
              control_name: 'primer_apellido',
              default_value: '',
              rules: {},
              label: 'Apellido',
              type: 'text',
              disabled: false,
              helper_text: '',
            },
          ]}
        />
        <BuscarModelo
          modal_active_init={active_dialog_attroneys}
          set_current_model={set_attorney}
          row_id={'id_persona'}
          columns_model={columns_personas}
          models={attorneys}
          get_filters_models={null}
          set_models={set_attorneys}
          reset_values={reset_poderdante}
          button_submit_label="Seleccionar apoderado"
          button_icon_class={<AdminPanelSettingsIcon />}
          button_submit_disabled={grantor.id_persona === null}
          show_search_button={!(representacion_legal.tipo_sesion === 'E')}
          form_inputs={[
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_apoderado,
              control_name: 'tipo_documento',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Tipo de documento apoderado',
              disabled: true,
              helper_text:
                attorney.id_persona === null
                  ? 'No se ha seleccionado apoderado'
                  : '',
              select_options: aux_document_types,
              option_label: 'nombre',
              option_key: 'cod_tipo_documento',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_apoderado,
              control_name: 'numero_documento',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Número de documento apoderado',
              type: 'number',
              disabled: true,
              helper_text:
                attorney.id_persona === null
                  ? 'No se ha seleccionado apoderado'
                  : '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_apoderado,
              control_name: 'nombre_completo',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Nombre apoderado',
              type: 'text',
              disabled: true,
              helper_text:
                attorney.id_persona === null
                  ? 'No se ha seleccionado apoderado'
                  : '',
            },
          ]}
          title_table_modal="Listado de apoderados"
          modal_select_model_title="Seleccioner apoderado"
          modal_form_filters={[]}
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default TipoPoderdante;
