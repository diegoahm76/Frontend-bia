/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { estado } from '../../interface/types';
import { getEstadoOpas } from '../../services/opas/getEstadoOpas.service';

export const BuscadorOpas = (props: any): JSX.Element => {
  const { control_consulta_estado_sol } = props;

  // ? useState necearios
  const [estado, setEstado] = useState<estado[]>([]);

  useEffect(() => {
    (async () => {
      await getEstadoOpas(setEstado);
    })();
  }, []);

  return (
    <>
      <Grid
        item
        xs={12}
        sm={4}
        sx={{
          zIndex: 20,
        }}
      >
        <Controller
          name="estado"
          control={control_consulta_estado_sol}
          render={({ field: { onChange, value } }) => (
            <div>
              <Select
                value={value}
                onChange={(selectedOption) => {
                  onChange(selectedOption);
                }}
                options={estado || []}
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
                  Estado de solicitud de opas
                </small>
              </label>
            </div>
          )}
        />
      </Grid>
    </>
  );
};
