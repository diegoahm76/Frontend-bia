/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { Button, Grid, Stack, TextField } from '@mui/material';
import Select from 'react-select';
import { stylesGrid } from './../../../../../permisosSeriesDoc/utils/styles';
import { Controller, useForm } from 'react-hook-form';
import { ModalAndLoadingContext } from '../../../../../../../context/GeneralContext';
import { Loader } from '../../../../../../../utils/Loader/Loader';
import { Title } from '../../../../../../../components';
import { AsignacionGrupoContext } from '../../context/AsignacionGrupoContext';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { getSubGrupoAsiGrupo } from '../../services/getSubyGrups.service';
import { getSeriesByIdUnidad } from '../../../../../ReportesGeneralesGestorDocumental/services/getSeriesByIdUnidad.service';
import { getLiderByUnidadOrganizacional } from '../../services/getLiderUnidadOrganizacional.service';

export const SeleccionUnidadSecSub = (): JSX.Element => {
  const {
    control: control_seleccionar_seccion_control,
    reset: reset_select_seleccionar,
  } = useForm();

  //* context necesarios
  const { generalLoading, handleSecondLoading } = useContext(
    ModalAndLoadingContext
  );

  const {
    listaSeccionesSubsecciones,
    setListaSubGrupos,
    setLiderAsignado,
    setCurrentGrupo,
    setListaSeries,
    currentGrupo,
    listaSeries,
    liderAsignado,
  } = useContext(AsignacionGrupoContext);

  //* functions

  const handleCleanSelect = () => {
    reset_select_seleccionar({
      id_unidad_organizacional: {
        value: '',
        label: '',
      },
    });
    //* ademas de estepar de acciones e deben limpiar los demas controles que esten debajo del mismop
    setListaSubGrupos([]);
    setLiderAsignado(undefined);
  };

  if (generalLoading) {
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
      {listaSeccionesSubsecciones?.length > 0 ? (
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

              zIndex: 10,
            }}
          >
            <section
              style={{
                marginTop: '1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <Title title="Seleccionar sección o subsección" />
            </section>
            <Controller
              name="id_unidad_organizacional"
              control={control_seleccionar_seccion_control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <div>
                  <Select
                    value={value}
                    onChange={(selectedOption) => {
                      const { value } = selectedOption;
                      console.log('selectedOptioasdan', value);
                      //* se va a tener que hacer la consulta de si la unidad tiene lider actual o si no no se deben permite asignala la pqrsdf a dicha unidad}
                      setCurrentGrupo({
                        grupoSelected: selectedOption,
                        currentSerie: null,
                      });

                      {
                        /* revisar si el expediente generado será simple o complejo ya que en razón de ello se debe analizar de donde se va a sacar la serie */
                      }
                      Promise.all([
                        getSeriesByIdUnidad(value),
                        //getSubGrupoAsiGrupo(value),
                        getLiderByUnidadOrganizacional(value, setLiderAsignado),
                      ])
                        .then(([series, lider]) => {
                          console.log('series', series);
                          console.log('lider', lider);

                          if (Array.isArray(series)) {
                            setListaSeries(series);
                          }

                          /*if (Array.isArray(lider)) {
                            setListaSubGrupos(undefined);
                            return;
                          }*/

                          if (!Array.isArray(lider)) {
                            setLiderAsignado(lider);
                          }
                        })
                        .catch((error) => {
                          setListaSeries([]);
                          setLiderAsignado(undefined);
                          console.error(
                            'Error fetching series or lider:',
                            error
                          );
                        });

                      onChange(selectedOption);
                    }}
                    options={listaSeccionesSubsecciones ?? []}
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

          {listaSeries?.length > 0 && (
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
                  marginTop: '1rem',
                  marginBottom: '1rem',
                }}
              >
                <Title title="Seleccionar serie para creación de expediente" />
              </section>
              <Controller
                name="id_serie_doc"
                control={control_seleccionar_seccion_control}
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

                        onChange(selectedOption);
                        setCurrentGrupo({
                          ...currentGrupo,
                          currentSerie: selectedOption,
                        });
                      }}
                      // lista de series
                      options={listaSeries ?? []}
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
                        Serie - subserie
                      </small>
                    </label>
                  </div>
                )}
              />
            </Grid>
          )}

          {liderAsignado ? (
            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                ...stylesGrid,
                mt: '1rem',
                mb: '1rem',

                zIndex: 5,
              }}
            >
              <section
                style={{
                  marginTop: '1rem',
                  marginBottom: '1rem',
                }}
              >
                <Title title="Líder actual de la unidad seleccionada" />
              </section>
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
        <> </>
      )}
    </>
  );
};
