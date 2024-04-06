/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext } from 'react';
import { AsignacionGrupoContext } from '../../context/AsignacionGrupoContext';
import { ModalAndLoadingContext } from '../../../../../../../context/GeneralContext';
import { Loader } from './../../../../../../../utils/Loader/Loader';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { stylesGrid } from './../../../../../permisosSeriesDoc/utils/styles';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { Title } from '../../../../../../../components';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { getLiderByUnidadOrganizacional } from '../../services/getLiderUnidadOrganizacional.service';

export const SeleccionGrupo = (): JSX.Element => {
  const { listaSubGrupos, liderAsignado, setLiderAsignado, setCurrentGrupo } = useContext(
    AsignacionGrupoContext
  );

  const { secondLoading } = useContext(ModalAndLoadingContext);

  const {
    control: control_seccion_asociada_control,
    reset: reset_select_seccion_asociada,
  } = useForm();

  //* Funciones
  const handleCleanSelect = () => {
    reset_select_seccion_asociada({
      id_unidad_org: {
        value: '',
        label: '',
      },
    });
    setLiderAsignado(undefined);
    //* ademas de estepar de acciones e deben limpiar los demas controles que esten debajo del mismop
  };

  if (secondLoading) {
    return (
      <Grid
        container
        sx={{
          position: 'relative',
          justifyContent: 'center',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Loader altura={270} />
      </Grid>
    );
  }

  return (
    <>
      {listaSubGrupos.length > 0 ? (
        <Grid
          container
          sx={{
            position: 'relative',
            justifyContent: 'center',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26',
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            sx={{
              ...stylesGrid,
              mt: '1.8rem',
              mb: '1.8rem',

              zIndex: 7,
            }}
          >
            <section
              style={{
                marginTop: '2.2rem',
                marginBottom: '2.2rem',
              }}
            >
              <Title title="Asginar a: " />
            </section>
            <Controller
              name="id_unidad_org"
              control={control_seccion_asociada_control}
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
                      //* se va a tener que hacer la consulta de si la unidad tiene lider actual o si no no se deben permite asignala la pqrsdf a dicha unidad}
                      setCurrentGrupo(selectedOption);
                      void getLiderByUnidadOrganizacional(
                        value,
                        setLiderAsignado
                      )
                        .then((res) => {
                          //  console.log('')(res);

                          if (Array.isArray(res)) {
                            setLiderAsignado(undefined);
                            return;
                          }

                          setLiderAsignado(res);
                        })
                      onChange(selectedOption);
                    }}
                    // listaSubGrupos
                    options={listaSubGrupos ?? []}
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
                      Sección o subsección (unidad organizacional)
                    </small>
                  </label>
                </div>
              )}
            />
          </Grid>

          {liderAsignado ? (
            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                ...stylesGrid,
                mt: '1.8rem',
                mb: '1.8rem',

                zIndex: 5,
              }}
            >
              <TextField
                fullWidth
                disabled
                label="Líder de la unidad seleccionada"
                size="small"
                variant="outlined"
                value={liderAsignado?.lider ?? ''}
                sx={{ mt: '.3rem', mb: '.45rem' }}
              />
            </Grid>
          ) : (
            <></>
          )}

          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: 'flex-end',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <Button
              onClick={handleCleanSelect}
              variant="outlined"
              color="primary"
              startIcon={<CleanIcon />}
            >
              LIMPIAR CAMPO SELECCIONADO
            </Button>
          </Stack>
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
};
