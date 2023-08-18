/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { Title } from '../../../../../components';
import { useEffect, useState } from 'react';
import { Destinatario } from './Destinatario';
import { PrioridadAlerta } from './PrioridadAlerta';
import { api } from '../../../../../api/axios';

export interface SelectAlerta {
  cod_clase_alerta: string;
  nombre_subsistema: string;
  nombre_clase_alerta: string;
  descripcion_clase_alerta: string;
  cod_tipo_clase_alerta: string;
  cod_categoria_clase_alerta: string;
  cant_dias_previas: number | null;
  frecuencia_previas: string | null;
  cant_dias_post: number | null;
  frecuencia_post: string | null;
  envios_email: boolean;
  mensaje_base_dia: string;
  mensaje_base_previo: string | null;
  mensaje_base_vencido: string | null;
  nivel_prioridad: string;
  activa: boolean;
  asignar_responsable: boolean;
  nombre_funcion_comple_mensaje: string;
  id_modulo_destino: number;
  id_modulo_generador: number;
}
 

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Selectalerta: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [selectedOption, setSelectedOption] = useState('');
  const [
    // textvalue
    , settextvalue] = useState('');
  const selectchange = (event: SelectChangeEvent<string>): any => {
    setSelectedOption(event.target.value);
  };
  const handletextchange = (event: React.ChangeEvent<HTMLInputElement>): any => {
    settextvalue(event.target.value);
  };

  const [alertas, set_alertas] = useState<SelectAlerta[]>([]);
  useEffect(() => {
    const fetch_alertas = async (): Promise<void> => {
      try {
        const url = "/transversal/alertas/configuracion_clase_alerta/get-by-subsistema/GEST/";
        const res = await api.get(url);
        const alertas_data = res.data.data;
        set_alertas(alertas_data);
      } catch (error) {
        console.error(error);
      }
    };
    void fetch_alertas();
  }, []);

  const [alertas_get, set_alertas_get] = useState<SelectAlerta[]>([]);

  useEffect(() => {
    const fetch_alertas_get = async (): Promise<void> => {
      try {
        const url = `/transversal/alertas/configuracion_clase_alerta/get-by-cod/${selectedOption}/`;
        const res_get = await api.get(url);
        const alertas_data_get = res_get.data.data;
        set_alertas_get(alertas_data_get);
      } catch (error) {
        console.error(error);
      }
    };
    void fetch_alertas_get();
  }, [selectedOption]);


 
  return (
    <>
      <Grid container
        spacing={2} m={2} p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      > 
        {/* {alertas_get.find(alerta_get => alerta_get.cod_clase_alerta === selectedOption)?.descripcion_clase_alerta} */}
        {/* {selectedOption}  */}
        <Grid item marginTop={-2} xs={12}>
          <Title title="Selección de alerta" />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth size="small">
            <InputLabel>Organizacional</InputLabel>
            <Select value={selectedOption} label="Organizacional" onChange={selectchange}>
              {alertas.map(alerta => (
                <MenuItem key={alerta.cod_clase_alerta} value={alerta.cod_clase_alerta}>
                  {alerta.nombre_clase_alerta}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* {alertas.find(alerta => alerta.cod_clase_alerta === selectedOption)?.descripcion_clase_alerta} */}
        {selectedOption && (
          <>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                size="small"
                label="Tipo de alerta"
                fullWidth
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
                name="cod_tipo_clase_alerta"
                value={alertas_get.find(alerta_get => alerta_get.cod_clase_alerta === selectedOption)?.cod_categoria_clase_alerta ?? null}
                onChange={handletextchange}
              />
            </Grid>


            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                size="small"
                label="Mensaje base"
                fullWidth
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
                name="mensaje_base_dia"
                value={alertas_get.find(alerta_get => alerta_get.cod_clase_alerta === selectedOption)?.mensaje_base_dia ?? null}
                onChange={handletextchange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                size="small"
                label="Descripción"
                fullWidth
                disabled
                multiline
                rows={3}
                InputLabelProps={{
                  shrink: true,
                }}
                name="descripcion_clase_alerta"
                value={alertas_get.find(alerta_get => alerta_get.cod_clase_alerta === selectedOption)?.descripcion_clase_alerta ?? null}
                onChange={handletextchange}
              />
            </Grid>
          </>
        )}
      </Grid>
      {selectedOption && <Destinatario />}

      {selectedOption && <PrioridadAlerta />}
    </>
  );
};