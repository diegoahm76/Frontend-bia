import { useEffect, useState } from 'react';

import { api } from '../../../../../api/axios';
import { type Persona } from '../../../../../interfaces/globalModels';
import { useForm } from 'react-hook-form';
import { Avatar, Grid, IconButton, Tooltip } from '@mui/material';
import BuscarModelo from '../../../../../components/partials/getModels/BuscarModelo';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../../auth/interfaces';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { v4 as uuid } from 'uuid';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';

import PrimaryForm from '../../../../../components/partials/form/PrimaryForm';
import {
  set_request_status,
  set_request_type,
} from '../../store/slice/centralDigitalizacionSlice';
import {
  control_error,
  get_digitalization_requests_service,
} from '../../store/thunks/centralDigitalizacionThunks';
interface IProps {
  control_solicitud?: any;
  reset: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SolicitudSeleccionada = ({ control_solicitud, reset }: IProps) => {
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const { digitization_request, edit_digitization } = useAppSelector(
    (state) => state.central_digitalizacion_slice
  );
  useEffect(() => {
    reset(digitization_request);
  }, [digitization_request]);

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
              datum_type: 'date_picker_controller',
              xs: 12,
              md: 2,
              control_form: control_solicitud,
              control_name: 'fecha_solicitud',
              default_value: '',
              rules: {},
              label: 'Fecha de solicitud',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_solicitud,
              control_name: 'titular',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Requerido' },
              },
              label: 'Titular',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_solicitud,
              control_name: 'asunto',
              default_value: '',
              rules: {},
              label: 'Asunto',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_solicitud,
              control_name: 'numero_anexos',
              default_value: '',
              rules: {},
              label: 'Número de anexos',
              type: 'number',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 12,
              control_form: control_solicitud,
              control_name: 'observacion_digitalización',
              default_value: '',
              rules: {},
              multiline_text: true,
              rows_text: 4,
              label: 'Observación de digitalización',
              type: 'text',
              disabled: !edit_digitization,
              helper_text: '',
            },
          ]}
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SolicitudSeleccionada;
