import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../auth/interfaces';
import SeleccionTipoPersona from '../componentes/SolicitudPQRSDF/SeleccionTipoPersona';
import EstadoPqrsdf from '../componentes/SolicitudPQRSDF/EstadoPqrsdf';
import ListadoPqrsdf from '../componentes/SolicitudPQRSDF/ListadoPqrsdf';
import TipoEmpresa from '../componentes/SolicitudPQRSDF/TipoEmpresa';
import TipoPoderdante from '../componentes/SolicitudPQRSDF/TipoPoderdante';
import TipoPersona from '../componentes/SolicitudPQRSDF/TipoPersona';
import FormButton from '../../../../components/partials/form/FormButton';
import Limpiar from '../../../conservacion/componentes/Limpiar';
import SaveIcon from '@mui/icons-material/Save';
import { reset_state } from '../store/slice/pqrsdfSlice';
import FormStepper from '../../../../components/partials/form/FormStepper';
import { get_document_types_service, get_list_applicant_types_service, get_list_on_behalf_service, get_person_types_service, get_pqrs_status_aux_service } from '../store/thunks/pqrsdfThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function SolicitudPqrsdfScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const {
    type_applicant,
    on_behalf_of,
    person,
    company,
    grantor,
    attorney,
    pqr_status,
  } = useAppSelector((state) => state.pqrsdf_slice);
  const initial_values = (): void => {
    // resetear variables con valores iniciales
  };

  useEffect(() => {
    dispatch(get_document_types_service())
    dispatch(get_person_types_service())
    dispatch(get_list_applicant_types_service())
    dispatch(get_list_on_behalf_service())
    dispatch(get_pqrs_status_aux_service())

  }, []);
  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12} marginY={2}>
          <Title title="Solicitud PQRSDF"></Title>
        </Grid>
        <SeleccionTipoPersona />
        {type_applicant.id === 'T' && on_behalf_of.id === 'P' && <TipoPersona />}
        {type_applicant.id === 'T' && on_behalf_of.id === 'E' && <TipoEmpresa />}
        {type_applicant.id === 'T' && on_behalf_of.id === 'A' && <TipoPoderdante />}
        {on_behalf_of.id === 'P'
          ? person.id_persona !== null && <EstadoPqrsdf />
          : on_behalf_of.id === 'E'
            ? company.id_persona !== null && <EstadoPqrsdf />
            : on_behalf_of.id === 'A' &&
            grantor.id_persona !== null &&
            attorney.id_persona !== null && <EstadoPqrsdf />}
        {pqr_status.key === 'ESR' && <ListadoPqrsdf />}
        <Grid container direction="row" padding={2} spacing={2}>
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="contained"
              on_click_function={null}
              icon_class={<SaveIcon />}
              disabled={!(pqr_status.key === 'N' || type_applicant.key === 'A')}
              label="Crear PQRSDF"
              type_button="button"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Limpiar
              dispatch={dispatch}
              reset_state={reset_state}
              set_initial_values={initial_values}
              variant_button={'outlined'}
              clean_when_leaving={false}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
