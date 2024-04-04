/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { ModalAndLoadingContext } from '../../../../../../../context/GeneralContext';
import { Loader } from './../../../../../../../utils/Loader/Loader';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { stylesGrid } from './../../../../../permisosSeriesDoc/utils/styles';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { Title } from '../../../../../../../components';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { getLiderByUnidadOrganizacional } from '../../services/getLiderUnidadOrganizacional.service';
import { ReasignacionContext } from '../../context/ReasignacionContext';
import { useAppSelector } from '../../../../../../../hooks';

export const SeleccionarUsuario = (): JSX.Element => {
  const { userinfo } = useAppSelector((state) => state.auth);

  const {
    listaSubGrupos,
    liderAsignado,
    setLiderAsignado,
    setCurrentGrupo,
    comentario,
    setComentario,
  } = useContext(ReasignacionContext);

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
    setComentario(undefined);
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
              <Title title="Seleccionar usuario" />
            </section>
            <Controller
              name="id_unidad_org"
              control={control_seccion_asociada_control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <div>
                  <Select
                    value={value}
                    onChange={(selectedOption) => {
                      console.log(selectedOption)
                      setCurrentGrupo(selectedOption); // ? en realidad es para seleccionar el usuario jiji
                      (async () => {
                        try {
                          const res = await getLiderByUnidadOrganizacional(
                            userinfo?.id_unidad_organizacional_actual,
                            setLiderAsignado
                          );
                          if (Array.isArray(res)) {
                            setLiderAsignado(undefined);
                            return;
                          }
                          setLiderAsignado(res);
                        } catch (error) {
                          console.error(error);
                        }
                      })();
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
            <>
             {/* <Grid
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
              </Grid>*/}
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
                  multiline
                  rows={5}
                  label="Comentario de re-asignación"
                  onChange={(e) => {
                    setComentario(e.target.value);
                  }}
                  size="small"
                  variant="outlined"
                  value={comentario ?? ''}
                  sx={{ mt: '.3rem', mb: '.45rem' }}
                />
              </Grid>
            </>
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
