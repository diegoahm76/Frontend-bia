/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';
import { listaEstadosTramite } from '../../services/consultaTramites/listaEstadosTramite.service';
import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

export const BuscadorTramites = (props: any): JSX.Element => {
  const { control_consulta_estado_sol } = props;

  // ? useState necearios
  const [estado, setestado] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      await listaEstadosTramite().then((data) => {
        setestado(data);
      });
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
          //* estos names de los controllers deben ser modificiado para que sirvan a la busqueda del panel de ventanilla
          name="estado"
          control={control_consulta_estado_sol}
          render={({ field: { onChange, value } }) => (
            <div>
              <Select
                value={value}
                onChange={(selectedOption) => {
                  onChange(selectedOption);
                }}
                options={
                  estado.map((item) => ({
                    ...item,
                    label: item.nombre,
                    value: item.id_estado_solicitud,
                  })) || []
                }
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
                  Estado de solicitud de otros
                </small>
              </label>
            </div>
          )}
        />
      </Grid>
    </>
  );
};
