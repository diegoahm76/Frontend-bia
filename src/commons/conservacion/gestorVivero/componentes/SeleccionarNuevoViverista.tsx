import { useEffect, useState } from 'react';

import { api } from '../../../../api/axios';
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';
import {
  set_nuevos_viveristas,
  set_current_nuevo_viverista,
} from '../store/slice/viveroSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  get_viverista_document_service,
  get_nuevos_viveristas_service,
} from '../store/thunks/gestorViveroThunks';
import { type IObjBuscarNuevoViverista } from '../interfaces/vivero';

interface IList {
  value: string | number;
  label: string | number;
}
const initial_options: IList[] = [
  {
    label: '',
    value: '',
  },
];

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarNuevoViverista = () => {
  const dispatch = useAppDispatch();
  const {
    control: control_persona,
    reset: reset_persona,
    getValues: get_values,
  } = useForm<IObjBuscarNuevoViverista>();
  const { current_nuevo_viverista, nuevos_viveristas } = useAppSelector(
    (state) => state.nursery
  );

  const [document_type, set_document_type] = useState<IList[]>(initial_options);
  const columns_personas: GridColDef[] = [
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
      headerName: 'Nombre',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },

    {
      field: 'razon_social',
      headerName: 'Razón social',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nombre_comercial',
      headerName: 'Nombre comercial',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];

  const text_choise_adapter: any = (dataArray: string[]) => {
    const data_new_format: IList[] = dataArray.map((dataOld) => ({
      label: dataOld[1],
      value: dataOld[0],
    }));
    return data_new_format;
  };

  useEffect(() => {
    const get_selects_options: any = async () => {
      try {
        const { data: document_type_no_format } = await api.get(
          'choices/tipo-documento/'
        );

        const document_type_format: IList[] = text_choise_adapter(
          document_type_no_format
        );
        set_document_type(document_type_format);
      } catch (err) {
        //  console.log('')(err);
      }
    };
    void get_selects_options();
  }, []);

  useEffect(() => {
    reset_persona(current_nuevo_viverista);
  }, [current_nuevo_viverista]);

  const search_person: any = async () => {
    const document = get_values('numero_documento') ?? '';
    const type = get_values('tipo_documento') ?? '';
    void dispatch(get_viverista_document_service(type, document));
  };

  const get_personas: any = async () => {
    const document = get_values('numero_documento') ?? '';
    const type = get_values('tipo_documento') ?? '';
    const segundo_nombre = get_values('segundo_nombre') ?? '';
    const primer_nombre = get_values('primer_nombre') ?? '';
    const primer_apellido = get_values('primer_apellido') ?? '';
    const segundo_apellido = get_values('segundo_apellido') ?? '';
    void dispatch(
      get_nuevos_viveristas_service(
        type,
        document,
        primer_nombre,
        primer_apellido,
        segundo_apellido,
        segundo_nombre
      )
    );
  };

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <BuscarModelo
          set_current_model={set_current_nuevo_viverista}
          row_id={'id_persona'}
          columns_model={columns_personas}
          models={nuevos_viveristas}
          get_filters_models={get_personas}
          set_models={set_nuevos_viveristas}
          button_submit_label="BUSCAR"
          form_inputs={[
            {
              datum_type: 'title',
              title_label: 'Seleccione nuevo viverista',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_persona,
              control_name: 'tipo_documento',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Tipo documento',
              disabled: false,
              helper_text: 'Debe seleccionar campo',
              select_options: document_type,
              option_label: 'label',
              option_key: 'value',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_persona,
              control_name: 'numero_documento',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Número de documento',
              type: 'number',
              disabled:
                get_values('tipo_documento') === null ||
                get_values('tipo_documento') === undefined,
              helper_text: 'Digite para buscar',
              on_blur_function: search_person,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_persona,
              control_name: 'nombre_completo',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Nombre',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
          ]}
          modal_select_model_title="Buscar persona"
          modal_form_filters={[
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 2,
              control_form: control_persona,
              control_name: 'tipo_documento',
              default_value: '',
              rules: {},
              label: 'Tipo de documento',
              disabled: false,
              helper_text: '',
              select_options: document_type,
              option_label: 'label',
              option_key: 'value',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_persona,
              control_name: 'numero_documento',
              default_value: '',
              rules: {},
              label: 'Número de documento',
              type: 'number',
              disabled:
                get_values('tipo_documento') === null ||
                get_values('tipo_documento') === undefined,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_persona,
              control_name: 'primer_nombre',
              default_value: '',
              rules: {},
              label: 'Primer nombre',
              type: 'text',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_persona,
              control_name: 'Segundo_nombre',
              default_value: '',
              rules: {},
              label: 'Segundo Nombre',
              type: 'text',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_persona,
              control_name: 'primer_apellido',
              default_value: '',
              rules: {},
              label: 'Primer Apellido',
              type: 'text',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_persona,
              control_name: 'segundo_apellido',
              default_value: '',
              rules: {},
              label: 'Segundo Apellido',
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
export default SeleccionarNuevoViverista;
