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
} from '../../store/slice/pqrsdfSlice';
import { get_document_types_service } from '../../store/thunks/pqrsdfThunks';
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const TipoPoderdante = () => {
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
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

  // useEffect(() => {
  //   // void dispatch(get_document_types_service());
  //   console.log(watch('document_type'));
  // }, [watch('document_type')]);

  useEffect(() => {
    void dispatch(get_document_types_service());
  }, []);
  useEffect(() => {
    reset_poderdante(grantor);
    //dispatch(buscar_apoderadoscon poderdanteid)
  }, [grantor]);
  useEffect(() => {
    reset_apoderado(attorney);
  }, [attorney]);

  useEffect(() => {
    reset_poderdante({
      ...grantor,
      person_type: person_type.key,
      document_type: document_type.cod_tipo_documento,
    });
  }, [document_type, person_type]);

  useEffect(() => {
    set_aux_document_types(document_types);
  }, [document_types]);

  const columns_personas: GridColDef[] = [
    {
      field: 'document_type',
      headerName: 'Tipo de documento',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'document',
      headerName: 'Número de documento',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'full_name',
      headerName: 'Nombre completo',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },

    {
      field: 'person_type',
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
    if (name === 'person_type') {
      dispatch(set_document_type({ cod_tipo_documento: null, nombre: null }));
      if (value !== undefined) {
        dispatch(set_person_type(value));
        set_aux_document_types(
          document_types.filter((objeto: IObjDocumentType) =>
            value.id === 1
              ? objeto.cod_tipo_documento !== 'NT'
              : objeto.cod_tipo_documento === 'NT'
          )
        );
      } else {
        dispatch(set_person_type({ id: null, key: null, label: null }));
        set_aux_document_types(document_types);
      }
    } else if (name === 'document_type') {
      if (value !== undefined) {
        dispatch(set_document_type(value));
      } else {
        dispatch(set_document_type({ cod_tipo_documento: null, nombre: null }));
      }
    }
  };

  const get_grantors: any = async () => {
    const document = get_values('document') ?? '';
    const type = get_values('document_type') ?? '';
    const name = get_values('name') ?? '';
    const last_name = get_values('last_name') ?? '';
    const person_type = get_values('person_type') ?? '';
    console.log(document, type, name, last_name, person_type);
    // void dispatch(
    //   get_grantors_service(
    //     type,
    //     document,
    //     primer_nombre,
    //     primer_apellido,
    //     razon_social,
    //     comercial_name
    //   )
    // );
  };

  const search_grantor: any = async () => {
    const document = get_values('document') ?? '';
    const type = get_values('document_type') ?? '';
    console.log(document, type);
    // void dispatch(get_person_document_service(type, document));
  };
  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <BuscarModelo
          set_current_model={set_person}
          row_id={'id_person'}
          columns_model={columns_personas}
          models={grantors}
          get_filters_models={get_grantors}
          set_models={set_grantors}
          reset_values={reset_poderdante}
          button_submit_label="BUSCAR"
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
              control_name: 'document_type',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Tipo de documento',
              disabled: false,
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
              control_name: 'document',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Número de documento',
              type: 'number',
              disabled: (document_type.cod_tipo_documento ?? null) === null,
              helper_text: 'Digite para buscar',
              on_blur_function: search_grantor,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_tipo_poderdante,
              control_name: 'full_name',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Nombre completo',
              type: 'text',
              disabled: true,
              helper_text: 'No se ha seleccionado persona',
            },
          ]}
          modal_select_model_title="Buscar poderdante"
          modal_form_filters={[
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 2,
              control_form: control_tipo_poderdante,
              control_name: 'person_type',
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
              control_name: 'document_type',
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
              control_name: 'document',
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
              control_name: 'name',
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
              control_name: 'last_name',
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
          set_current_model={set_person}
          row_id={'id_person'}
          columns_model={columns_personas}
          models={grantors}
          get_filters_models={get_grantors}
          set_models={set_grantors}
          reset_values={reset_poderdante}
          button_submit_label="Seleccionar apoderado"
          button_icon_class={<AdminPanelSettingsIcon />}
          button_submit_disabled={grantor.id_person === null}
          form_inputs={[
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_apoderado,
              control_name: 'document_type',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Tipo de documento apoderado',
              disabled: true,
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
              control_form: control_apoderado,
              control_name: 'document',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Número de documento apoderado',
              type: 'number',
              disabled: true,
              helper_text: 'Digite para buscar',
              on_blur_function: search_grantor,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_apoderado,
              control_name: 'full_name',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Nombre apoderado',
              type: 'text',
              disabled: true,
              helper_text: 'No se ha seleccionado persona',
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
