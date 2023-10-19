/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField } from '@mui/material';
import { stylesGrid } from '../../../../../../../permisosSeriesDoc/utils/styles';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { useAsignacionesResp } from '../../../../hook/useAsignacionesResp';
import { Title } from '../../../../../../../../../components';
import { useAppSelector } from '../../../../../../../../../hooks';

export const SeccionSelecccionada = (): JSX.Element => {
  //* hooks
  const { control_asignaciones_resp } = useAsignacionesResp();

  const { seriesSeccionSeleccionadaSinResponsable } = useAppSelector(
    (state) => state.AsigUniRespSlice
  );

  if (!seriesSeccionSeleccionadaSinResponsable?.coincidencias?.length)
    return <></>;
  {
    /* también se debe establecer la validación de la carga del componente para el loader */
  }

  return (
    <>
      <Title title="Selección de sección" />
      <Grid
        item
        xs={12}
        sm={5}
        sx={{
          ...stylesGrid,
          zIndex: 5,
          mt: '4rem',
        }}
      >
        <TextField
          fullWidth
          label="Sección seleccionada"
          size="small"
          variant="outlined"
          disabled={true}
          value={
            `${seriesSeccionSeleccionadaSinResponsable?.seccionSeleccionada?.nombre} - ${seriesSeccionSeleccionadaSinResponsable?.seccionSeleccionada?.codigo}` ||
            ''
          }
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

          {/* se le debe establecer el loader de la peticiones de las unidades organizacionales relaciadas al ccd */}



      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          ...stylesGrid,
          zIndex: 5,
        }}
      >
        <Controller
          name="id_unidad_organizacional"
          control={control_asignaciones_resp}
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div>
              <Select
                value={value}
                onChange={(selectedOption) => {
                  console.log(selectedOption);
                  onChange(selectedOption);
                }}
                options={[] as any}
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
                  Sección de nuevo CCD responsable
                </small>
              </label>
            </div>
          )}
        />
      </Grid>
    </>
  );
};
