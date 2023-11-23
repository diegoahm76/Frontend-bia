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
import type {
  IObjDocumentType,
  IObjCompany,
  IObjListType,
} from '../../interfaces/pqrsdf';
import {
  set_companies,
  set_person,
  set_person_type,
  set_document_types,
  set_document_type,
} from '../../store/slice/pqrsdfSlice';
import { get_document_types_service } from '../../store/thunks/pqrsdfThunks';
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const TipoEmpresa = () => {
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const {
    control: control_tipo_empresa,
    reset: reset_empresa,
    getValues: get_values,
    watch,
  } = useForm<IObjCompany>();
  const {
    companies,
    company,
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
  const [aux_person_types, set_aux_person_types] = useState<IObjListType[]>([]);

  // useEffect(() => {
  //   // void dispatch(get_document_types_service());
  //   console.log(watch('document_type'));
  // }, [watch('document_type')]);

  useEffect(() => {
    void dispatch(get_document_types_service());
  }, []);
  useEffect(() => {
    reset_empresa(company);
  }, [company]);

  useEffect(() => {
    reset_empresa({
      ...company,
      person_type: person_type.key,
      document_type: document_type.cod_tipo_documento,
    });
  }, [document_type, person_type]);

  useEffect(() => {
    set_aux_document_types(
      document_types.filter(
        (objeto: IObjDocumentType) => objeto.cod_tipo_documento === 'NT'
      )
    );
    set_aux_person_types(
      person_types.filter((objeto: IObjListType) => objeto.key === 2)
    );
  }, [document_types, person_types]);

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
      field: 'tradename',
      headerName: 'Nombre comercial',
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
      } else {
        dispatch(set_person_type({ id: null, key: null, label: null }));
      }
    } else if (name === 'document_type') {
      if (value !== undefined) {
        dispatch(set_document_type(value));
      } else {
        dispatch(set_document_type({ cod_tipo_documento: null, nombre: null }));
      }
    }
  };

  const get_personas: any = async () => {
    const document = get_values('document') ?? '';
    const type = get_values('document_type') ?? '';
    const name = get_values('tradename') ?? '';
    const person_type = get_values('person_type') ?? '';
    console.log(document, type, name, person_type);
    // void dispatch(
    //   get_companies_service(
    //     type,
    //     document,
    //     primer_nombre,
    //     primer_apellido,
    //     razon_social,
    //     comercial_name
    //   )
    // );
  };

  const search_person: any = async () => {
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
          models={companies}
          get_filters_models={get_personas}
          set_models={set_companies}
          reset_values={reset_empresa}
          button_submit_label="BUSCAR"
          form_inputs={[
            {
              datum_type: 'title',
              title_label: 'A nombre de empresa',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 4,
              control_form: control_tipo_empresa,
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
              md: 3,
              control_form: control_tipo_empresa,
              control_name: 'document',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Número de documento',
              type: 'number',
              disabled: (document_type.cod_tipo_documento ?? null) === null,
              helper_text: 'Digite para buscar',
              on_blur_function: search_person,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 5,
              control_form: control_tipo_empresa,
              control_name: 'tradename',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Nombre comercial',
              type: 'text',
              disabled: true,
              helper_text: 'No se ha seleccionado empresa',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 6,
              control_form: control_tipo_empresa,
              control_name: 'business_name',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Razón social',
              type: 'text',
              disabled: true,
              helper_text: 'No se ha seleccionado empresa',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_tipo_empresa,
              control_name: 'representatives_document_type',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Tipo de documento representante',
              disabled: true,
              helper_text: 'No se ha seleccionado empresa',
              select_options: document_types,
              option_label: 'nombre',
              option_key: 'cod_tipo_documento',
              on_change_function: on_change_select,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_tipo_empresa,
              control_name: 'representatives_document',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Documento representante',
              type: 'number',
              disabled: true,
              helper_text: 'No se ha seleccionado empresa',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 9,
              control_form: control_tipo_empresa,
              control_name: 'representatives_full_name',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Nombre representante',
              type: 'text',
              disabled: true,
              helper_text: 'No se ha seleccionado empresa',
            },
          ]}
          modal_select_model_title="Buscar empresa"
          modal_form_filters={[
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 2,
              control_form: control_tipo_empresa,
              control_name: 'person_type',
              default_value: '',
              rules: {},
              label: 'Tipo de persona',
              disabled: false,
              helper_text: 'Debe seleccionar tipo',
              select_options: aux_person_types,
              option_label: 'label',
              option_key: 'key',
              on_change_function: on_change_select,
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 2,
              control_form: control_tipo_empresa,
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
              control_form: control_tipo_empresa,
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
              md: 3,
              control_form: control_tipo_empresa,
              control_name: 'tradename',
              default_value: '',
              rules: {},
              label: 'Nombre comercial',
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
export default TipoEmpresa;
