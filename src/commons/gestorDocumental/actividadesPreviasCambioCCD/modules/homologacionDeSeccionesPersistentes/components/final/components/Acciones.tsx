/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC, useState, useEffect } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import CleanIcon from '@mui/icons-material/CleaningServices';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { Title } from '../../../../../../../../components';
import { containerStyles } from '../../../../../../tca/screens/utils/constants/constants';
import {
  getOutModule,
  reset_all,
} from '../../../../../../../../utils/functions/getOutOfModule';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';
import { reset_states } from '../../../toolkit/slice/HomologacionesSeriesSlice';

export const Acciones: FC<any> = (): JSX.Element | null => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* navigate declaration
  const navigate = useNavigate();
  // ? loading  para los botones guardar y proceder respectivamente
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  // ! states from redux
  const { ccdOrganigramaCurrentBusqueda } = useAppSelector(
    (state) => state.HomologacionesSlice
  );

  const handleSubmit = () => {
    setLoadingButton(true);
    console.log('hello from submit');

    //* analizar los datos a enviar

   /* {
      "id_ccd_nuevo": 176,
      "unidades_persistentes":[
          {
          "id_unidad_actual": 5381,
          "id_unidad_nueva": 5385
          }
          ,
          {
          "id_unidad_actual": 5383,
          "id_unidad_nueva": 5387
          }
      ],
      "catalagos_persistentes":[
          {
              "id_catalogo_serie_actual": 1085,
              "id_catalogo_serie_nueva": 1094
          }
      ]
  } */


    setLoadingButton(false);
  };

  if (!ccdOrganigramaCurrentBusqueda) return null;

  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="Acciones" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            style={{
              textAlign: 'center',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <Grid
              container
              sx={{
                justifyContent: 'center',
              }}
              spacing={2}
            >
              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  // zIndex: 2,
                  justifyContent: 'center',
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}
                  sx={{ m: '20px 0' }}
                >
                  <Button
                    color="primary"
                    variant="outlined"
                    startIcon={<CleanIcon />}
                    onClick={() => {
                      reset_all([() => dispatch(reset_states())]);
                    }}
                  >
                    LIMPIAR CAMPOS
                  </Button>

                  <LoadingButton
                    loading={loadingButton}
                    color="success"
                    variant="contained"
                    type="submit"
                    startIcon={<SaveIcon />}
                  >
                    GUARDAR
                  </LoadingButton>

                  <Button
                    color="error"
                    variant="contained"
                    startIcon={<CloseIcon />}
                    onClick={() => {
                      getOutModule(navigate, [() => dispatch(reset_states())]);
                    }}
                  >
                    SALIR DEL MÓDULO
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
