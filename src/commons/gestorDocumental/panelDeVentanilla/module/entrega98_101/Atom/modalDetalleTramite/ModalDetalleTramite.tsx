/* eslint-disable @typescript-eslint/naming-convention */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Title } from '../../../../../../../components';
import { ModalAndLoadingContext } from '../../../../../../../context/GeneralContext';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { TextFieldWithOutAction } from '../../../../../../../utils/TextFieldResume/TextFieldWithOutAction';
import { api } from '../../../../../../../api/axios';
import { setCurrentElementPqrsdComplementoTramitesYotros } from '../../../../toolkit/store/PanelVentanillaStore';
import { control_success } from '../../../../../../../helpers';
import { control_warning } from '../../../../../../almacen/configuracion/store/thunks/BodegaThunks';

export const ModalDetalleTramite = (): JSX.Element => {
  // ? redux states use
  const dispatch = useAppDispatch();
  const { currentElementPqrsdComplementoTramitesYotros } = useAppSelector(
    (state) => state.PanelVentanillaSlice
  );

  const [dataFromSasof, setDataFromSasof] = useState(null);

  // ? context necesario
  const { sixthLoading, handleSixthLoading } = useContext(
    ModalAndLoadingContext
  );

  // ? state para almacenar la informacion de los metadatos

  //* use effect para cargar los datos de los anexos
  useEffect(() => {
    if (!sixthLoading) return;

    const handleNoData = () => {
      setDataFromSasof(null);
      control_warning('no se ha encontrado información relacionada');
    };

    (async () => {
      try {
        const { data } = await api.get(
          `tramites/general/get/?radicado=${currentElementPqrsdComplementoTramitesYotros?.radicado}`
        );

        if (data?.data) {
          setDataFromSasof(data?.data);
          control_success('se ha encontrado la siguiente información');
        } else {
          handleNoData();
        }
      } catch (error) {
        console.error(error);
        handleNoData();
      }
    })();

    return () => setDataFromSasof(null);
  }, [sixthLoading]);

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={sixthLoading}
        onClose={() => {
          dispatch(setCurrentElementPqrsdComplementoTramitesYotros(null));
          setDataFromSasof(null);
          handleSixthLoading(false);
        }}
      >
        <Box component="form">
          <DialogTitle>
            <Title title="Información detallada del trámite" />
          </DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              mt: '1.2rem',
              mb: '1.2rem',
              justifyContent: 'center',
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                justifyContent: 'center',
              }}
            >
              {dataFromSasof ? (
                Object.keys(dataFromSasof).map((key, index) => {
                  const value = dataFromSasof[key];
                  if (
                    value === null ||
                    value === undefined ||
                    value === '' ||
                    !value ||
                    value === 'null' ||
                    key === 'procedure_id' ||
                    key === 'proceeding_id' ||
                    key === 'windowRadicate' ||
                    key === 'typeRequest_value' ||
                    key === 'remoteIp'
                  )
                    return <></>;

                  return (
                    <TextFieldWithOutAction
                      label={key
                        .split('_')
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(' ')}
                      value={value || 'N/A'}
                      key={index * 50 - 55}
                    />
                  );
                })
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                >
                  No se ha encontrado información relacionada
                </Typography>
              )}
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Stack
              direction="row"
              spacing={2}
              sx={{ mr: '15px', mb: '10px', mt: '10px' }}
            >
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  dispatch(
                    setCurrentElementPqrsdComplementoTramitesYotros(null)
                  );
                  setDataFromSasof(null);
                  handleSixthLoading(false);
                }}
                startIcon={<CloseIcon />}
              >
                CERRAR
              </Button>
            </Stack>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};
