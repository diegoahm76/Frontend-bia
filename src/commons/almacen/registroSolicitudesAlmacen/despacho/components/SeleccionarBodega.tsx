import { useEffect, useState } from 'react';

import { Chip, Grid } from '@mui/material';

import BuscarModelo from '../../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import {
  set_bodega_seleccionada,
  get_bodega,
} from '../../../configuracion/store/slice/BodegaSlice';
import { get_bodega_service } from '../../../configuracion/store/thunks/BodegaThunks';
import { api } from '../../../../../api/axios';
import type { IList } from '../../../../../interfaces/globalModels';
import { type IBodega } from '../../../configuracion/interfaces/Bodega';
import { useForm } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarBodega = () => {
  const { control: control_bodega, reset: reset_bodega } = useForm<IBodega>();
  const { bodegas, bodega_seleccionada } = useAppSelector(
    (state: { bodegas: any }) => state.bodegas
  );

  const [municipalities, set_municipalities] = useState<IList[]>([]);
  const dispatch = useAppDispatch();

  const text_choise_adapter: any = (dataArray: string[]) => {
    const data_new_format: IList[] = dataArray.map((dataOld) => ({
      label: dataOld[1],
      value: dataOld[0],
    }));
    return data_new_format;
  };
  useEffect(() => {
    reset_bodega(bodega_seleccionada);
  }, [bodega_seleccionada]);

  useEffect(() => {
    const get_selects_options: any = async () => {
      try {
        const { data: municipalities_no_format } = await api.get(
          'choices/municipios/'
        );

        const municipalities_format: IList[] = text_choise_adapter(
          municipalities_no_format
        );

        set_municipalities(municipalities_format);
      } catch (err) {
        //  console.log('')(err);
      }
    };

    void get_selects_options();
  }, []);

  useEffect(() => { }, [bodega_seleccionada]);

  const columns_solicitudes: GridColDef[] = [

    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 200,
    },

    {
      field: 'direccion',
      headerName: 'Dirección',
      width: 350,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'es_principal',
      headerName: 'Bodega principal',
      width: 150,
      renderCell: (params) => {
        return params.row.es_principal === true ? (
          <Chip size="small" label="Sí" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="No" color="error" variant="outlined" />
        );
      },
    },
    {
      field: 'nombre_completo_responsable',
      headerName: 'Responsable de Bodega',
      width: 350,
    },
  ];

  const get_bodegas_filtro: any = async () => {
    void dispatch(get_bodega_service());
  };

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <BuscarModelo
          set_current_model={set_bodega_seleccionada}
          row_id={'id_bodega'}
          columns_model={columns_solicitudes}
          models={bodegas}
          get_filters_models={get_bodegas_filtro}
          set_models={get_bodega}
          reset_values={reset_bodega}
          button_submit_label="Buscar bodega"
          form_inputs={[
            {
              datum_type: 'title',
              title_label: 'Selección de bodega predeterminada',
            },

            {
              datum_type: 'input_controller',
              xs: 12,
              md: 5,
              control_form: control_bodega,
              control_name: 'nombre',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'campo requerido' },
              },
              label: 'Nombre',
              type: 'text',
              disabled: false,
              helper_text: '',
            },

            {
              datum_type: 'select_controller',
              xs: 12,
              md: 4,
              control_form: control_bodega,
              control_name: 'cod_municipio',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'requerido' } },
              label: 'Municipio',
              disabled: false,
              select_options: municipalities,
              option_label: 'label',
              option_key: 'value',
            },
          ]}
          modal_select_model_title="Buscar bodega"
          modal_form_filters={[
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_bodega,
              control_name: 'id_bodega',
              default_value: '',
              rules: {},
              label: 'Número de bodega',
              type: 'number',
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
export default SeleccionarBodega;
