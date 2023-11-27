/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint no-new-func: 0 */
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Box, Button, FormControl, Grid, InputLabel, List, ListItemText, MenuItem, Select, type SelectChangeEvent, TextField, Typography, Stack } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Title } from "../../../../components";
import type { OpcionLiquidacion, RowDetalles } from "../../interfaces/liquidacion";
import AddIcon from '@mui/icons-material/Add';
import { api } from "../../../../api/axios";
interface IProps {
  rows_detalles: RowDetalles[];
  expediente_liquidado: boolean;
  set_rows_detalles: Dispatch<SetStateAction<RowDetalles[]>>;
  add_new_row_detalles: (formula: string, nuevas_variables: Record<string, string>, opcion_liquidacion: OpcionLiquidacion, id_opcion_liquidacion: string, concepto: string) => void;
  check_ciclo_and_periodo: (next: Function) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare, no-import-assign, @typescript-eslint/no-unused-vars
export const DetalleLiquidacion: React.FC<IProps> = ({ rows_detalles, expediente_liquidado, set_rows_detalles, add_new_row_detalles, check_ciclo_and_periodo }: IProps) => {
  const [opciones_liquidacion, set_opciones_liquidacion] = useState<OpcionLiquidacion[]>([]);
  const [id_opcion_liquidacion, set_id_opcion_liquidacion] = useState("");
  const [concepto, set_concepto] = useState('');
  const [variables_datos, set_variables_datos] = useState<Record<string, string>>({});

  const opcion_liquidacion: OpcionLiquidacion = useMemo(() => opciones_liquidacion.filter(opcion_liquidacion => opcion_liquidacion.id === Number(id_opcion_liquidacion))[0], [id_opcion_liquidacion]);

  useEffect(() => {
    api.get('recaudo/liquidaciones/opciones-liquidacion-base/')
      .then((response) => {
        set_opciones_liquidacion(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const handle_liquidar = (): void => {
  //   set_modal_detalle(true);
  // }

  const get_calculated_variables = (funcion: string, variables: Record<string, string>): string => {
    const regex = new RegExp(Object.keys(variables).map((propiedad) => `\\b${propiedad}\\b`).join('|'), 'g');
    const formula = funcion.replace(regex, matched => variables[matched]);
    return new Function(`return ${formula}`)();
  };

  const handle_select_change: (event: SelectChangeEvent) => void = (event: SelectChangeEvent) => {
    set_id_opcion_liquidacion(event.target.value);
  }

  const handle_input_change = (event: React.ChangeEvent<HTMLInputElement>): void => {
    set_concepto(event.target.value);
  };

  const handle_variables_change = (event: React.ChangeEvent<HTMLInputElement>, key: string): void => {
    const { value } = event.target;
    set_variables_datos((prevInputs) => ({
      ...prevInputs,
      [key]: value,
    }));
  };

  const handle_agregar_detalle = (): void => {
    add_new_row_detalles(get_calculated_variables(opcion_liquidacion.funcion, variables_datos), variables_datos, opcion_liquidacion, id_opcion_liquidacion, concepto);
    set_id_opcion_liquidacion('');
    set_concepto('');
    set_variables_datos({});
  };

  const handle_variable_input_change = (event: React.ChangeEvent<HTMLInputElement>, index: number, key: string): void => {
    const { value } = event.target;
    const row_detalle = rows_detalles[index];
    const new_variables = { ...row_detalle.variables, [key]: value };
    const new_detalle: RowDetalles = { ...row_detalle, variables: new_variables, valor_liquidado: get_calculated_variables(row_detalle.formula_aplicada, new_variables) };
    const new_detalles = rows_detalles.map((detalle, arrayIndex) => arrayIndex === index ? new_detalle : detalle);
    set_rows_detalles(new_detalles);
  };

  const column_detalle: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 20
    },
    {
      field: 'nombre_opcion',
      headerName: 'Nombre opción',
      width: 200
    },
    {
      field: 'concepto',
      headerName: 'Concepto',
      width: 200
    },
    {
      field: 'formula_aplicada',
      headerName: 'Formula Aplicada',
      width: 400
    },
    {
      field: 'variables',
      headerName: 'Variables',
      width: 300,
      renderCell: (params) => {
        return (
          <List dense>
            {Object.entries(params.value).map((entry) => {
              const [key, value] = entry;
              return (
                <ListItemText key={params.row.id}>
                  <Stack direction={'row'} spacing={2} alignItems={'center'}>
                    <Typography variant="body1">{key}</Typography>:
                    {expediente_liquidado ?
                      <Typography variant="body1">{value as string}</Typography> :
                      <TextField
                        name={key}
                        value={rows_detalles[params.row.id].variables[key]}
                        type="number"
                        size="small"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handle_variable_input_change(event, params.row.id, key)}
                      />
                    }
                  </Stack>
                </ListItemText>
              )
            })}
          </List>
        );
      }
    },
    {
      field: 'valor_liquidado',
      headerName: 'Valor Liquidado',
      width: 150,
      valueGetter: (params) => {
        if (!params.value) {
          return params.value;
        }
        return `$ ${params.value}`;
      }
    },
  ]

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
          boxShadow: '0px 3px 6px #042F4A26'
        }}
      >
        <Grid item xs={12}>
          <Title title="Detalle de liquidación"></Title>
          <Grid container direction={'column'} sx={{ my: '20px' }} gap={1}>
            <Grid item xs={12}>
              <FormControl sx={{ pb: '10px' }} size='small' fullWidth required>
                <InputLabel>Selecciona opción liquidación</InputLabel>
                <Select
                  label='Selecciona opción liquidación'
                  value={id_opcion_liquidacion}
                  MenuProps={{
                    style: {
                      maxHeight: 224,
                    }
                  }}
                  onChange={handle_select_change}
                >
                  {opciones_liquidacion.map((opc_liquidacion) => (
                    <MenuItem key={opc_liquidacion.id} value={opc_liquidacion.id}>
                      {opc_liquidacion.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Concepto'
                size="small"
                fullWidth
                value={concepto}
                onChange={handle_input_change}
                required
              />
            </Grid>
          </Grid>

          <Grid container justifyContent={'center'} spacing={2}>
            <Grid item>
              <InputLabel sx={{ fontWeight: 'bold', p: '20px' }}>Parametros</InputLabel>
              {opcion_liquidacion && Object.keys(opcion_liquidacion?.variables).map((key, index) => (
                <div key={index}>
                  <InputLabel sx={{ p: '18.5px' }}>{key}</InputLabel>
                </div>
              ))}
            </Grid>

            <Grid item>
              <InputLabel sx={{ fontWeight: 'bold', p: '20px' }}>Valor</InputLabel>
              {opcion_liquidacion && Object.keys(opcion_liquidacion?.variables).map((key, index) => (
                <div key={index}>
                  <TextField
                    type="number"
                    sx={{ p: '10px' }}
                    size="small"
                    value={variables_datos[key] || ''}
                    required
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => { handle_variables_change(event, key) }}
                  />
                </div>
              ))}
            </Grid>
          </Grid>

          <Grid container justifyContent='center' sx={{ my: '20px' }}>
            <Grid item xs={3}>
              {!expediente_liquidado && (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<AddIcon />}
                  onClick={() => check_ciclo_and_periodo(handle_agregar_detalle)}
                  disabled={id_opcion_liquidacion === '' || concepto === ''}
                >
                  Agregar detalle de liquidación
                </Button>
              )}
            </Grid>
          </Grid>

          <Box sx={{ width: '100%', mt: '20px' }}>
            <DataGrid
              density="compact"
              autoHeight
              rows={rows_detalles}
              columns={column_detalle}
              getRowHeight={() => 'auto'}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
