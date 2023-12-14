import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../auth/interfaces';
// import SeleccionTipoPersona from '../componentes/SolicitudPQRSDF/SeleccionTipoPersona';
// import EstadoPqrsdf from '../componentes/SolicitudPQRSDF/EstadoPqrsdf';
// import ListadoPqrsdf from '../componentes/SolicitudPQRSDF/ListadoPqrsdf';
// import TipoEmpresa from '../componentes/SolicitudPQRSDF/TipoEmpresa';
// import TipoPoderdante from '../componentes/SolicitudPQRSDF/TipoPoderdante';
// import TipoPersona from '../componentes/SolicitudPQRSDF/TipoPersona';
import FormButton from '../../../../components/partials/form/FormButton';
import Limpiar from '../../../conservacion/componentes/Limpiar';
import SaveIcon from '@mui/icons-material/Save';

import SeleccionTipoPersonaOtros from '../components/SelecionTipoPersonaOtros';
import { get_list_on_behalf_service } from '../../PQRSDF/store/thunks/pqrsdfThunks';
import EstadOtros from '../components/EstadOtros';
import TipoEmpresaOtros from '../components/TipoEmpresa';
import TipoPoderdanteOtros from '../components/TipoPoderdante';
import TipoPersonaOtros from '../components/TipoPersona';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function SolicitudesOtroScreen(): JSX.Element {
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
  // const initial_values = (): void => {
  //   dispatch(get_document_types_service());
  //   dispatch(get_person_types_service());
  //   dispatch(get_list_applicant_types_service());
  //   dispatch(get_list_on_behalf_service());
  //   dispatch(get_pqrs_status_aux_service());
  // };

   useEffect(() => {
  //   dispatch(get_document_types_service());
  //   dispatch(get_person_types_service());
  //   dispatch(get_list_applicant_types_service());
     dispatch(get_list_on_behalf_service());
  //   dispatch(get_pqrs_status_aux_service());
   }, []);

  // useEffect(() => {
  //   dispatch(set_pqr_status({ id: null, key: null, label: null }));
  //   dispatch(set_pqrs([]));
  // }, [person, grantor, company]);
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
          <Title title="Solicitud Otros"></Title>
        </Grid>
        <SeleccionTipoPersonaOtros />
        {type_applicant.id === 'T' && on_behalf_of.id === 'P' && (
          <TipoPersonaOtros />
        )}
        {type_applicant.id === 'T' && on_behalf_of.id === 'E' && (
          <TipoEmpresaOtros />
        )}
        {type_applicant.id === 'T' && on_behalf_of.id === 'A' && (
          <TipoPoderdanteOtros />
        )}
        {on_behalf_of.id === 'P'
          ? person.id_persona !== null && <EstadOtros />
          : on_behalf_of.id === 'E'
          ? company.id_persona !== null && <EstadOtros />
          : on_behalf_of.id === 'A' &&
            grantor.id_persona !== null &&
            attorney.id_persona !== null && <EstadOtros />}
        {/* {pqr_status.key === 'ESR' && <ListadoPqrsdf />} */}
        <Grid container direction="row" padding={2} spacing={2}>
          <Grid item xs={12} md={3}  alignItems={'center'}>
            <FormButton
              href={`/#/app/gestor_documental/pqrsdf/crear_pqrsdf/`}
              variant_button="contained"
              on_click_function={null}
              icon_class={<SaveIcon />}
              disabled={!(pqr_status.key === 'N' || type_applicant.key === 'A')}
              label="Crear Solicitud Otros"
              type_button="button"
              color_button="success"
            />
          </Grid>
{/* 
          <Grid item xs={12} md={3}>
            <Limpiar
              dispatch={dispatch}
              reset_state={reset_state}
              set_initial_values={initial_values}
              variant_button={'outlined'}
              clean_when_leaving={false}
            />
          </Grid> */}
        </Grid>
      </Grid>
    </>
  );
}
