/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { ConsultaPrograma } from '../components/Planes/ConsultaPrograma';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
import { ConsultaProyecto } from '../components/Planes/ConsultaProyecto';
import { useContext } from 'react';
import { DataContextConsulas } from '../context/context';
import { PlanSelected } from '../components/Planes/PlanSelected';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsultasScreen: React.FC = () => {
  const { tipo_consulta } = useContext(DataContextConsulas);

  return (
    <>
      <PlanSelected />
      {tipo_consulta === 'programa' ? <ConsultaPrograma /> : null}
      {tipo_consulta === 'proyecto' ? <ConsultaProyecto /> : null}
      {/* <ConsultaPrograma />
      <ConsultaProyecto /> */}
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
        justifyContent="flex-end"
      >
        <Grid item>
          <ButtonSalir />
        </Grid>
      </Grid>
    </>
  );
};
