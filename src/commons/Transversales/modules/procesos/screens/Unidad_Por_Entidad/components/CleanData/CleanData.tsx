/* eslint-disable @typescript-eslint/naming-convention */
import { type FC, useContext } from 'react';
import { containerStyles } from '../../../../../../../gestorDocumental/tca/screens/utils/constants/constants';
import { Button, Grid, Stack } from '@mui/material';
import { Title } from '../../../../../../../../components';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { ContextUnidadxEntidad } from '../../context/ContextUnidadxEntidad';
import { ModalHistoricoTraslados } from '../ModalHistoricoTraslado/screen/ModalHistoricoTraslados';

export const CleanData: FC<any> = (): JSX.Element => {
  //* elements from context

  const { handleModalHistoricos } = useContext(ContextUnidadxEntidad);

  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="Acciones" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log('hello from submit');
            }}
            style={{
              marginTop: '20px'
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={8}
                sx={{
                  zIndex: 2
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  spacing={2}
                  sx={{ m: '20px 0' }}
                >
                  <Button
                    color="primary"
                    variant="outlined"
                    startIcon={<CleanIcon />}
                    onClick={() => {
                      // eslint-disable-next-line no-console
                      console.log('cleaning fields');
                    }}
                  >
                    REINICIAR CAMPOS
                  </Button>

                  <Button
                    color="primary"
                    variant="outlined"
                    startIcon={<CleanIcon />}
                    onClick={handleModalHistoricos}
                  >
                    VER HISTÓRICO DE TRASLADOS MASIVOS
                  </Button>

                  <Button
                    color="primary"
                    variant="outlined"
                    startIcon={<CleanIcon />}
                    onClick={() => {
                      // eslint-disable-next-line no-console
                      console.log('cleaning fields');
                    }}
                  >
                    REINICIAR CAMPOS
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>

      {/*  modal historico traslados masivos, solo debe estar en la opción numero 2
        Traslado de unidades organizacionales de organigrama anterior a actual
      
                    SE DEBE HABILITAR LA CONDICIONAL DE MUESTRA O NO DEPDENDIENDO EL ESCENARIO (MODE)

      */}

      <ModalHistoricoTraslados />
    </>
  );
};
