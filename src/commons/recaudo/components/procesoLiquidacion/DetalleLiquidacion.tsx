/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint no-new-func: 0 */
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Box, Button, FormControl, Grid, InputLabel, List, ListItemText, MenuItem, Select, type SelectChangeEvent, TextField, Typography, Stack } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Title } from "../../../../components";
import type { EstadoExpediente, OpcionLiquidacion, RowDetalles } from "../../interfaces/liquidacion";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { api } from "../../../../api/axios";
import { currency_formatter } from "../../../../utils/functions/getFormattedCurrency";
import { jsPDF } from 'jspdf';
import { htmlContent } from "./cons";
interface LiquidacionResponse {
  success: boolean;
  detail: string;
  data: {
      rp: number;
      limite_pago: string;
      doc_cobro: string;
      ley: string;
      fecha_impresion: string;
      anio: number;
      cedula: string;
      titular: string;
      representante_legal: string;
      direccion: string;
      telefono: string;
      expediente: string;
      exp_resolucion: string;
      nombre_fuente: string;
      predio: string;
      municipio: string;
      caudal_consecionado: number;
      uso: string;
      fr: number;
      tt: number;
      numero_cuota: string;
      valor_cuota: number;
      codigo_barras: string;
      factor_costo_oportunidad: number;
  };
}


interface IProps {
  rows_detalles: RowDetalles[];
  estado_expediente: EstadoExpediente;
  set_rows_detalles: Dispatch<SetStateAction<RowDetalles[]>>;
  add_new_row_detalles: (formula: string, nuevas_variables: Record<string, string>, opcion_liquidacion: OpcionLiquidacion, id_opcion_liquidacion: string, concepto: string) => void;
  check_ciclo_and_periodo: (next: Function) => void;
  edit_detalles_liquidacion: () => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare, no-import-assign, @typescript-eslint/no-unused-vars
export const DetalleLiquidacion: React.FC<IProps> = ({ rows_detalles, estado_expediente, set_rows_detalles, add_new_row_detalles, check_ciclo_and_periodo, edit_detalles_liquidacion }: IProps) => {
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
        //  console.log('')(error);
      });
  }, []);

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

  const handle_variable_input_change = (event: React.ChangeEvent<HTMLInputElement>, id: number, key: string): void => {
    const { value } = event.target;
    const row_detalle = rows_detalles.find((detalle) => detalle.id === id);
    if (row_detalle) {
      const new_variables = { ...row_detalle.variables, [key]: value === '' ? '0' : value };
      const new_detalle: RowDetalles = { ...row_detalle, variables: new_variables, valor_liquidado: get_calculated_variables(row_detalle.formula_aplicada, new_variables) };
      const new_detalles = rows_detalles.map((detalle) => detalle.id === id ? new_detalle : detalle);
      set_rows_detalles(new_detalles);
    }
  };

  const handle_form_submit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    check_ciclo_and_periodo(handle_agregar_detalle);
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
                <ListItemText key={`${params.row.id}-${key}`}>
                  <Stack direction={'row'} spacing={2} alignItems={'center'}>
                    <Typography variant="body1">{key}</Typography>:
                    {estado_expediente?.toLowerCase() === 'liquidado' ?
                      <Typography variant="body1">{value as string}</Typography> :
                      <TextField
                        name={key}
                        value={rows_detalles.find((detalle) => detalle.id === params.row.id)?.variables[key]}
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
      valueFormatter: (params) => {
        if (!params.value) {
          return params.value;
        }
        return currency_formatter(Number(params.value), 4);
      }
    },
  ]

//codigo miguel para visor de factura 
  const encodedHtml = encodeURIComponent(htmlContent);
  const dataUri = 'data:text/html;charset=utf-8,' + encodedHtml;
  const [liquidacion, setLiquidacion] = useState<LiquidacionResponse | null>(null);


  const cargarLiquidacion = async (setLiquidacion: React.Dispatch<React.SetStateAction<LiquidacionResponse | null>>) => {
    try {
        const response = await api.get<LiquidacionResponse>('/recaudo/liquidaciones/liquidacion-pdf_miguel/16/');
       
            setLiquidacion(response.data);
            console.log("Datos de liquidación cargados con éxito"); 
    } catch (error: any) {
        console.error('Error al cargar los datos de liquidación', error);
        // Aquí puedes manejar los errores, por ejemplo, mostrando una alerta
    }
};
  useEffect(() => {
      cargarLiquidacion(setLiquidacion);
  }, []);

  return (
    <>
    
{/* {liquidacion?.data.cedula} */}

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

          <Box component={'form'} sx={{ width: '100%' }} onSubmit={handle_form_submit}>
            {opcion_liquidacion && (
              <Grid container justifyContent={'center'} spacing={2}>
                <Grid item>
                  <InputLabel sx={{ fontWeight: 'bold', p: '20px' }}>Parametros</InputLabel>
                  {Object.keys(opcion_liquidacion?.variables).map((key, index) => (
                    <div key={index}>
                      <InputLabel sx={{ p: '18.5px' }}>{key}</InputLabel>
                    </div>
                  ))}
                </Grid>

                <Grid item>
                  <InputLabel sx={{ fontWeight: 'bold', p: '20px' }}>Valor</InputLabel>
                  {Object.keys(opcion_liquidacion?.variables).map((key, index) => (
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
            )}

            <Grid container justifyContent='center' sx={{ my: '20px' }}>
              <Grid item xs={3}>
                {estado_expediente?.toLowerCase() === 'activo' && (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<AddIcon />}
                    disabled={id_opcion_liquidacion === '' || concepto === ''}
                  >
                    Agregar detalle de liquidación
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ width: '100%', mt: '20px' }}>
            <DataGrid
              density="compact"
              autoHeight
              rows={rows_detalles}
              columns={column_detalle}
              getRowHeight={() => 'auto'}
            />
            <Grid container justifyContent='center' sx={{ my: '20px' }}>
              <Grid item xs={3}>
                {estado_expediente?.toLowerCase() === 'guardado' && (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<EditIcon />}
                    onClick={edit_detalles_liquidacion}
                  >
                    Editar detalles de liquidación
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>


      {/* <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          width: '100%',
          height: '800px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26'
        }}
      >
        <Grid item xs={12} sm={8}>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} style={{ width: '50%', height: '50%' }} />
        </Grid>

        <Grid item xs={12} sm={12}> 
          <embed src={dataUri} type="text/html" width="100%" height="100%" />
        </Grid>


      </Grid> */}
    </>
  )
}
