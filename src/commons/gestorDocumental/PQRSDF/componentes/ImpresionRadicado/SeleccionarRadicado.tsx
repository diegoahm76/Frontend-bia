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
  IObjFiled,
  IObjPerson,
} from '../../interfaces/pqrsdf';
import {
  set_persons,
  set_person,
  set_person_type,
  set_document_types,
  set_document_type,
  set_filed,
  set_filings,
} from '../../store/slice/pqrsdfSlice';
import {
  get_document_types_service,
  get_person_document_service,
  get_persons_service,
} from '../../store/thunks/pqrsdfThunks';
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarRadicado = () => {
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const {
    control: control_radicado,
    reset: reset_radicado,
    getValues: get_values,
    watch,
  } = useForm<IObjFiled>();
  const { filed_types, filed_type, filings, filed, person } = useAppSelector(
    (state) => state.pqrsdf_slice
  );

  // useEffect(() => {
  //   // void dispatch(get_document_types_service());
  //   console.log(watch('document_type'));
  // }, [watch('document_type')]);

  useEffect(() => {
    void dispatch(get_document_types_service());
  }, []);
  useEffect(() => {
    reset_radicado(filed);
  }, [filed]);

  const columns_radicados: GridColDef[] = [
    {
      field: 'tipo_radicado',
      headerName: 'Tipo de radicado',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'prefijo_radicado',
      headerName: 'Prefijo de radicado',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'agno_radicado',
      headerName: 'Año de radicado',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },

    {
      field: 'numero_radicado',
      headerName: 'Número de radicado',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'fecha_radicado',
      headerName: 'Fecha de radicado',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(params.value).toDateString()}
        </div>
      ),
    },
  ];

  const get_radicados: any = async () => {
    const tipo_radicado = get_values('cod_tipo_radicado') ?? '';
    const prefijo_radicado = get_values('prefijo_radicado') ?? '';
    const agno_radicado = get_values('agno_radicado') ?? '';
    const nro_radicado = get_values('nro_radicado') ?? '';
    const fecha_radicado = get_values('fecha_radicado') ?? '';
    // void dispatch(
    //   get_filings_service(tipo_radicado, prefijo_radicado, agno_radicado, nro_radicado, fecha_radicado)
    // );
  };

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <BuscarModelo
          set_current_model={set_filed}
          row_id={'id_persona'}
          columns_model={columns_radicados}
          models={filings}
          get_filters_models={get_radicados}
          set_models={set_filings}
          reset_values={reset_radicado}
          button_submit_label="BUSCAR"
          form_inputs={[
            {
              datum_type: 'title',
              title_label: 'Radicado',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 4,
              control_form: control_radicado,
              control_name: 'cod_tipo_radicado',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Tipo de radicado',
              disabled: true,
              helper_text:
                filed.id_radicado !== null
                  ? 'Debe seleccionar un radicado'
                  : '',
              select_options: filed_types,
              option_label: 'label',
              option_key: 'key',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_radicado,
              control_name: 'prefijo_radicado',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Prefijo de radicado',
              type: 'text',
              disabled: true,
              helper_text:
                filed.id_radicado !== null
                  ? 'Debe seleccionar un radicado'
                  : '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_radicado,
              control_name: 'agno_radicado',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Año de radicado',
              type: 'number',
              disabled: true,
              helper_text:
                filed.id_radicado !== null
                  ? 'Debe seleccionar un radicado'
                  : '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 5,
              control_form: control_radicado,
              control_name: 'numero_radicado',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Número de radicado',
              type: 'number',
              disabled: true,
              helper_text:
                filed.id_radicado !== null
                  ? 'Debe seleccionar un radicado'
                  : '',
            },
            {
              datum_type: 'date_picker_controller',
              xs: 12,
              md: 4,
              control_form: control_radicado,
              control_name: 'fecha_radicado',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Fecha requerida' },
              },
              label: 'Fecha de radicado',
              disabled: true,
              helper_text:
                filed.id_radicado !== null
                  ? 'Debe seleccionar un radicado'
                  : '',
              format: 'YYYY-MM-DD',
            },
          ]}
          modal_select_model_title="Buscar radicado"
          modal_form_filters={[
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 4,
              control_form: control_radicado,
              control_name: 'cod_tipo_radicado',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Tipo de radicado',
              disabled: false,
              helper_text: '',
              select_options: filed_types,
              option_label: 'label',
              option_key: 'key',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_radicado,
              control_name: 'prefijo_radicado',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Prefijo de radicado',
              type: 'text',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_radicado,
              control_name: 'agno_radicado',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Año de radicado',
              type: 'number',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 5,
              control_form: control_radicado,
              control_name: 'numero_radicado',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Número de radicado',
              type: 'number',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'date_picker_controller',
              xs: 12,
              md: 4,
              control_form: control_radicado,
              control_name: 'fecha_radicado',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Fecha requerida' },
              },
              label: 'Fecha de radicado',
              disabled: false,
              helper_text: '',
              format: 'YYYY-MM-DD',
            },
          ]}
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarRadicado;
