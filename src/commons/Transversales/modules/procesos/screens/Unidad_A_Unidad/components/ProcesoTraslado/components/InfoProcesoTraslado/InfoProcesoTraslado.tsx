/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC, useEffect, useState } from 'react';

import { Button, Grid, Stack, TextField } from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import dayjs from 'dayjs';
import { type ProcesoTypes } from '../../types/procesoTraslado.types';
import { useAppSelector } from '../../../../../../../../../../hooks';
import { Title } from '../../../../../../../../../../components';
import { containerStyles } from '../../../../../../../../../gestorDocumental/tca/screens/utils/constants/constants';
import { type AuthSlice } from '../../../../../../../../../auth/interfaces';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

export const InfoProcesoTraslado: FC<ProcesoTypes> = ({
  setmModalHistoricoTraslados,
  setModalTotalPersonas
}: ProcesoTypes): JSX.Element => {
  const { userinfo } = useAppSelector((state: AuthSlice) => state.auth);
  const { listado_personas_totales_unidades } = useAppSelector(
    (state: any) => state.uni_a_uni_slice
  );

  // ? use state to set the currentDate
  const [currentDate, setCurrentDate] = useState(dayjs().format('DD-MM-YYYY'));

  // ? useEffect to update the current date each day

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(dayjs().format('DD-MM-YYYY'));
    }, dayjs().endOf('day').diff(dayjs(), 'millisecond'));

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="Información Proceso traslado de unidad a unidad" />
          <Stack
            direction="row"
            justifyContent="center"
            spacing={3}
            sx={{ mt: '40px' }}
          >
            <Button
              color="primary"
              disabled={listado_personas_totales_unidades.length === 0}
              variant="outlined"
              startIcon={<PersonSearchIcon />}
              onClick={() => {
                setModalTotalPersonas(true);
              }}
            >
              TOTAL PERSONAS UNIDADES
            </Button>
            <Button
              color="warning"
              variant="contained"
              startIcon={<VisibilityIcon />}
              onClick={() => {
                setmModalHistoricoTraslados(true);
              }}
            >
              HISTORIAL DE TRASLADOS
            </Button>
            <TextField
              sx={{
                minWidth: '300px'
              }}
              label="Persona que realiza el traslado"
              variant="outlined"
              value={userinfo.nombre}
              InputLabelProps={{ shrink: true }}
              disabled={true}
            />

            <TextField
              label="Fecha de traslado"
              variant="outlined"
              value={currentDate}
              InputLabelProps={{ shrink: true }}
              disabled={true}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
