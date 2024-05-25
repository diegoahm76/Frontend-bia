import { useEffect, useState } from 'react';

import { api } from '../../../../api/axios';
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';
import { set_current_nuevo_viverista } from '../store/slice/viveroSlice';
import { useAppSelector } from '../../../../hooks';
import { type IObjViveristaActual } from '../interfaces/vivero';

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
  const { control: control_persona, reset: reset_persona } =
    useForm<IObjViveristaActual>();
  const { current_viverista } = useAppSelector((state) => state.nursery);

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
    reset_persona(current_viverista);
  }, [current_viverista]);

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2} marginTop={1}>
        <BuscarModelo
          set_current_model={set_current_nuevo_viverista}
          row_id={''}
          columns_model={columns_personas}
          models={[]}
          get_filters_models={null}
          set_models={null}
          button_submit_label=""
          show_search_button={false}
          form_inputs={[
            {
              datum_type: 'title',
              title_label: 'Viverista actual',              
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_persona,
              control_name: 'tipo_documento',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Tipo de documento',
              disabled: true,
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
              disabled: true,
              helper_text: 'Digite para buscar',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_persona,
              control_name: 'nombre',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Nombre',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'date_picker_controller',
              xs: 12,
              md: 3,
              control_form: control_persona,
              control_name: 'fecha_inicio_viverista_actual',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Fecha requerida' },
              },
              label: 'Fecha de inicio',
              disabled: true,
              helper_text: '',
              min_date: null,
              max_date: null,
              format: 'YYYY-MM-DD',
            },
          ]}
          modal_select_model_title=""
          modal_form_filters={[]}
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarNuevoViverista;
