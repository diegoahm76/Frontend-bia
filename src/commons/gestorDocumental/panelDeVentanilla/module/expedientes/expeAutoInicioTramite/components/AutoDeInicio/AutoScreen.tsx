/* eslint-disable @typescript-eslint/naming-convention */
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';
import { Title } from '../../../../../../../../components';
import { Controller, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Select from 'react-select';
import { handleApiError } from '../../../../../../../../utils/functions/errorManage';
import { api } from '../../../../../../../../api/axios';
import { stylesGrid } from './../../../../../../permisosSeriesDoc/utils/styles';
import { useAppSelector } from '../../../../../../../../hooks';
import { getAutosDeInicioCreados } from '../../services/getAutosCreados.service';
import { getExpedienteRelacionado } from '../../services/getExpedienteRelacionado.service';
import { AutoInicioContext } from '../../context/ExpedienteContext';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AutoScreen = (): JSX.Element => {
  const { openModalOne, handleOpenModalOne, openModalTwo, handleOpenModalTwo, handleGeneralLoading } =
    useContext(ModalAndLoadingContext);
  const [listaPlantillas, setListaPlantillas] = useState([]);
  const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
    (state) =>
      state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
  );
  const {
    listaAsignaciones,
    liderAsignado,
    currentGrupo,
    setListaAsignaciones,
    setExpediente,
    setListaAutoDeInicio,
  } = useContext(AutoInicioContext);


  const { control, reset, watch } = useForm();

  useEffect(() => {
    const fetchPlantillas = async () => {
      try {
        const url = `gestor/panel_ventanilla/lista-plantillas/`;
        const { data } = await api.get(url);
        console.log('data', data);

        setListaPlantillas(
          data?.data?.map((el: any) => ({
            ...el,
            value: el.id_plantilla_doc,
            label: el.nombre,
          })) ?? []
        );
      } catch (e) {
        handleApiError(e);
      }
    };
    fetchPlantillas();
  }, []);

  const crearAutoDeInicio = async () => {
    try {
      const url = `gestor/panel_ventanilla/crear-auto-inicio/`;
      const dataToSend = {
        id_solicitud_tramite:
          currentElementPqrsdComplementoTramitesYotros?.id_solicitud_tramite,
        id_tipo_acto_administrativo: 1, // SIEMPRE VA EN UNO
        id_plantilla: control._formValues.plantilla.value,
      }
      const response = await api.post(url, dataToSend);

      if(response){

      (async () => {
        try {
          const res = await getAutosDeInicioCreados(
            currentElementPqrsdComplementoTramitesYotros?.id_solicitud_tramite,
            handleGeneralLoading
          );
          setListaAutoDeInicio(res);
        } catch (error) {
          console.error(error);
        }
      })();
      //* get expediente relacionado
      (async () => {
        try {
          const res = await getExpedienteRelacionado(
            currentElementPqrsdComplementoTramitesYotros?.id_solicitud_tramite,
            handleGeneralLoading
          );
          setExpediente(res);
        } catch (error) {
          console.error(error);
        }
      })();
    }
    } catch (e) {
      handleApiError(e);
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={openModalOne}
      onClose={() => {
        handleOpenModalOne(false);
        /* set_is_modal_active(false);
      dispatch(get_ccds([]));
      reset_search_ccd({ nombre_ccd: '', version: '' });*/
      }}
    >
      <DialogTitle>
        <Title title="Crear auto de inicio" />
      </DialogTitle>
      {/*    <Divider /> */}
      <DialogContent sx={{ mb: '0px' }}>
        <Grid item xs={12}>
          <form
            style={{
              marginTop: '20px',
              marginBottom: '20px',
            }}
            onSubmit={(e: any) => {
              e.preventDefault();
              crearAutoDeInicio()
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  ...stylesGrid,
                  mt: '1.8rem',
                  mb: '1.8rem',
                  zIndex: 15,
                }}
              >
                <Controller
                  name="plantilla"
                  control={control}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select
                        value={value}
                        onChange={(selectedOption) => {
                          const { value } = selectedOption;
                          console.log('selectedOptioasdan', value);
                            onChange(selectedOption);

                          //* se va a tener que hacer la consulta de si la unidad tiene lider actual o si no no se deben permite asignala la pqrsdf a dicha unidad}
                        }}
                     
                        // listaSubGrupos
                        options={listaPlantillas?? []}
                        placeholder="Seleccionar"
                      />
                      <label>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem',
                            marginTop: '0.25rem',
                            marginLeft: '0.25rem',
                          }}
                        >
                          Sección plantilla
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack
                  direction="row"
                  spacing={2}
                  //  sx={{ mr: '15px', mb: '10px', mt: '10px' }}
                >
                  <LoadingButton
                    loading={openModalTwo}
                    color="primary"
                    variant="contained"
                    type="submit"
                    startIcon={<SaveIcon />}
                  >
                    crear auto de inicio
                  </LoadingButton>
                </Stack>
              </Grid>
            </Grid>
          </form>
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
            variant="contained"
            color="error"
            onClick={() => {
              handleOpenModalOne(false);
              /*  set_is_modal_active(false);
            dispatch(get_ccds([]));
            reset_search_ccd({ nombre_ccd: '', version: '' });*/
            }}
            startIcon={<CloseIcon />}
          >
            CERRAR
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
