/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { getSubGrupoAsiGrupo } from '../../services/getSubyGrups.service';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';
import { AutoInicioContext } from '../../context/ExpedienteContext';
import { Loader } from '../../../../../../../../utils/Loader/Loader';
import { stylesGrid } from './../../../../../../permisosSeriesDoc/utils/styles';
import { Title } from '../../../../../../../../components';

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
  } = useContext(AutoInicioContext);

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
              render={({
                field: { onChange, value },
              }) => (
                <div>
                  <Select
                    value={value}
                    onChange={(selectedOption) => {
                      const { value } = selectedOption;
                      //* llamada a funcion de las unidade que son o desprenden de ese valor que se está estableciendo arriba
                      void getSubGrupoAsiGrupo(handleSecondLoading, value).then(
                        (res) => {
                          setListaSubGrupos(res);
                        }
                      );

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
