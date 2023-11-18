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
        {type_applicant.id === 1 && on_behalf_of.id === 1 && <TipoPersona />}
        {type_applicant.id === 1 && on_behalf_of.id === 2 && <TipoEmpresa />}
        {type_applicant.id === 1 && on_behalf_of.id === 3 && <TipoPoderdante />}
        {on_behalf_of.id === 1
          ? person.id_person !== null && <EstadoPqrsdf />
          : on_behalf_of.id === 2
          ? company.id_company !== null && <EstadoPqrsdf />
          : on_behalf_of.id === 3 &&
            grantor.id_person !== null &&
            attorney.id_person !== null && <EstadoPqrsdf />}
        {pqr_status.key === 2 && <ListadoPqrsdf />}
        <EstadoPqrsdf />
        <ListadoPqrsdf />
        <Grid container direction="row" padding={2} spacing={2}>
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="contained"
              on_click_function={null}
              icon_class={<SaveIcon />}
              disabled={!(pqr_status.key === 1 || type_applicant.key === 2)}
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
