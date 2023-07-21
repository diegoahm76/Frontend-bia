/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Button, Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { BusquedaSeccionSubseccion } from '../components/BusquedaSeccionSubseccion';
import { RegistroInstrumentos } from '../components/RegistroInstrumentos/RegistroInstrumento';
import { useContext } from 'react';
import { DataContext } from '../context/contextData';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
import { BusquedaAvanzadaInstrumentos } from '../components/BusquedaAvanzadaInstrumentos/BusquedaAvanzadaInstrumentos';
import { EditarInstrumento } from '../components/EditarInstrumento/EditarInstrumento';
import { SeleccionarInstrumento } from '../components/SeleccionarInstrumento/SeleccionarInstrumento';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InstrumentosScreen: React.FC = () => {
  const {
    id_seccion,
    id_subseccion,
    register_instrumento,
    edit_instrumento,
    select_instrumento,
    set_mode,
  } = useContext(DataContext);

  return (
    <>
      <Grid
        container
        spacing={2}
        m={2}
        p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        {edit_instrumento && (
          <Grid item xs={12}>
            <Title title="EDICIÓN DE INSTRUMENTOS EN BIBLIOTECA" />
          </Grid>
        )}
        {select_instrumento && (
          <Grid item xs={12}>
            <Title title="ADMINISTRACIÓN DE INSTRUMENTOS EN BIBLIOTECA" />
          </Grid>
        )}
        {register_instrumento && (
          <Grid item xs={12}>
            <Title title="REGISTRO DE INSTRUMENTOS EN BIBLIOTECA" />
          </Grid>
        )}
      </Grid>
      {register_instrumento && (
        <>
          <BusquedaSeccionSubseccion />
          {id_seccion && id_subseccion ? <RegistroInstrumentos /> : null}
        </>
      )}
      {edit_instrumento && (
        <>
          {' '}
          <EditarInstrumento />{' '}
        </>
      )}
      {select_instrumento && (
        <>
          {' '}
          <SeleccionarInstrumento />{' '}
        </>
      )}
      <Grid item spacing={2} justifyContent="end" container>
        {!register_instrumento ? (
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                set_mode('register_instrumento');
              }}
            >
              AGREGAR NUEVO INSTRUMENTO
            </Button>
          </Grid>
        ) : null}
        <BusquedaAvanzadaInstrumentos />
        <Grid item>
          <ButtonSalir />
        </Grid>
      </Grid>
    </>
  );
};
