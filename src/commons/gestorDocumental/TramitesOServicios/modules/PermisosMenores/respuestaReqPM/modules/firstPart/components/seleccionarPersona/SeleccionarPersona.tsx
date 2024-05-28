import { Button, Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { choicesRepresentacion } from '../../utils/choices';
import { PropiaComponent } from './enRepresentacionDe/propiaComponent/PropiaComponent';
import { EmpresaComponent } from './enRepresentacionDe/empresaComponent/EmpresaComponent';
import { useAppDispatch } from '../../../../../../../../../../hooks';
import { Title } from '../../../../../../../../../../components';
import { setCurrentPersonaRespuestaUsuario } from '../../../../../../../respuestaRequerimientoOpa/toolkit/slice/ResRequerimientoOpaSlice';
import { ApoderadoComponent } from './enRepresentacionDe/apoderadoComp/ApCom';

/* eslint-disable @typescript-eslint/naming-convention */
export const SelccionarPersona = (): JSX.Element => {

  const {
    control: control_seleccionar_persona,
    watch,
    reset: reset_seleccionar_persona,
  } = useForm<any>({});
  const watchExe = watch();

  //* dispatch declaration 
  const dispatch = useAppDispatch()

  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Permiso menor" />
          <form
            style={{
              marginTop: '20px',
            }}
            onSubmit={(e: any) => {
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  zIndex: 2,
                }}
              >
                <Controller
                  name="a_nombre_de"
                  rules={{ required: true }}
                  control={control_seleccionar_persona}
                  render={({ field }) => (
                    <div>
                      <Select
                        {...field}
                        isDisabled={true}
                        value={{
                          value: 'TITULAR',
                          label: 'TITULAR',
                        }}
                        options={[] ?? []}
                        placeholder="Seleccionar"
                      />
                      <label htmlFor={field.name}>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem',
                          }}
                        >
                          A NOMBRE *
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="fecha_actual"
                  control={control_seleccionar_persona}
                  defaultValue={new Date().toISOString().slice(0, 10)}
                  rules={{ required: true }}
                  render={() => (
                    <TextField
                      type="date"
                      required
                      fullWidth
                      disabled={true}
                      size="small"
                      label="FECHA ACTUAL"
                      variant="outlined"
                      inputProps={{
                        shirnk: 'true',
                      }}
                      value={new Date().toISOString().slice(0, 10)}
                    />
                  )}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  zIndex: 20,
                }}
              >
                <Controller
                  //* estos names de los controllers deben ser modificiado para que sirvan a la busqueda del panel de ventanilla
                  name="en_representacion_de"
                  control={control_seleccionar_persona}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <div>
                      <Select
                        required
                        value={value}
                        onChange={(selectedOption) => {
                          //  console.log('')(selectedOption);
                          onChange(selectedOption);
                          dispatch(setCurrentPersonaRespuestaUsuario(null as any));
                        }}
                        options={choicesRepresentacion ?? []}
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
                          EN REPRESENTACIÓN DE *
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>

      {watchExe?.en_representacion_de?.value === 'APODERADO' ? (
        <ApoderadoComponent
          {...{
            control_seleccionar_persona,
            watchExe,
            reset_seleccionar_persona,
          }}
        />
      ) : watchExe?.en_representacion_de?.value === 'EMPRESA' ? (
        <EmpresaComponent
          {...{
            control_seleccionar_persona,
            watchExe,
            reset_seleccionar_persona,
          }}
        />
      ) : watchExe?.en_representacion_de?.value === 'PROPIA' ? (
        <PropiaComponent
          {...{
            control_seleccionar_persona,
            watchExe,
            reset_seleccionar_persona,
          }}
        />
      ) : (
        <></>
      )}
      {/*en base a los valores establecido ahí, se define en módulo de búsqueda y selección para cada una de los tipos de representación en caso de ser usuario interno, cuando se está como usuario externo, este módulo no se muestra en pantalla*/}
    </>
  );
};