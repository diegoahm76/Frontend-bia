import { Button, Grid, TextField } from '@mui/material';
import { Title } from '../../../../../../../../components';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import { control_warning } from '../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import Select from 'react-select';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { choicesRepresentacion } from '../../utils/choicesRepresentacion';
import { PropiaComponent } from './enRepresentacionDe/propiaComponent/PropiaComponent';

/* eslint-disable @typescript-eslint/naming-convention */
export const SelccionarPersona = (): JSX.Element => {
  const {
    control: control_seleccionar_persona,
    watch,
    reset: reset_seleccionar_persona,
  } = useForm<any>({});
  const watchExe = watch();

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
          <Title title="OPA" />
          <form
            style={{
              marginTop: '20px',
            }}
            onSubmit={(e: any) => {
              // on_submit_create_ccd(e);
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
                          {/* {ccd_current
                        ? `
                          Organigrama Seleccionado
                        `
                        : `Seleccionar Organigrama`}*/}
                        </small>
                      </label>
                    </div>
                  )}
                />
                {/*   {errors_create_ccd.organigrama != null && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}*/}
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
                          console.log(
                            control_seleccionar_persona._formValues
                              ?.en_representacion_de?.value
                          );
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
        <>Componente de apoderado</>
      ) : watchExe?.en_representacion_de?.value === 'EMPRESA' ? (
        <>Componente de empresa</>
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

{
  /*<ApoderadoComponent />*/
}
{
  /*<EmpresaComponent />*/
}
{
  /*<PropiaComponent />*/
}
