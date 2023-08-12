/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';
import { type ProcesoTypes } from '../types/procesoTraslado.types';
import { useAppSelector } from '../../../../../../../../../hooks';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { Title } from '../../../../../../../../../components';
import { Controller } from 'react-hook-form';
import { containerStyles } from '../../../../../../../../gestorDocumental/tca/screens/utils/constants/constants';
import { type AuthSlice } from '../../../../../../../../auth/interfaces';

import VisibilityIcon from '@mui/icons-material/Visibility';

export const ProcesoTrasladoScreen: FC<ProcesoTypes> = ({
  setmModalHistoricoTraslados
}: ProcesoTypes): JSX.Element => {
  const { unidades_org_anterior } = useAppSelector(
    (state) => state.uni_a_uni_slice
  );
  const { userinfo } = useAppSelector((state: AuthSlice) => state.auth);
  console.log(userinfo);

  // ? use state to set the currentDate
  // const [currentDate, setCurrentDate] = useState(dayjs().format('YYYY-MM-DD'));

  // ? useEffect to update the current date each day

  /*  useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentDate(dayjs().format('YYYY-MM-DD'));
      }, dayjs().endOf('day').diff(dayjs(), 'millisecond'));
  
      return () => {
        clearInterval(intervalId);
      };
    }, []); */

  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="Proceso de traslado unidad a unidad" />
          <form
            onSubmit={(w) => {
              w.preventDefault();
              console.log('submit');
              // onSubmit();
            }}
            style={{
              marginTop: '20px'
            }}
          >
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={3.5}>
                <Controller
                  name="nombre"
                  control={control_organigrama_anterior}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      fullWidth
                      label="Nombre del Organigrama"
                      size="small"
                      variant="outlined"
                      onChange={onChange}
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      disabled={true}
                    />
                  )}
                />
              </Grid> */}
            </Grid>
          </form>
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={3}
            sx={{ mt: '40px' }}
          >
            <TextField
              fullWidth
              
              label="Persona que realiza el traslado"
              variant="outlined"
              value={userinfo.nombre}
              InputLabelProps={{ shrink: true }}
              disabled={true}
            />

            <Button
              color="warning"
              sx={{
                height: '56px'
              }}
              variant="contained"
              startIcon={<VisibilityIcon />}
              onClick={() => {
                setmModalHistoricoTraslados(true);
              }}
            >
              HISTORIAL DE TRASLADOS
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
