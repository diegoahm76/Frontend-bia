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
import { DocumentoPagoTUA } from "./DocumentoPagoTUA";
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
  form_liquidacion: any;

}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare, no-import-assign, @typescript-eslint/no-unused-vars
export const DetalleLiquidacion: React.FC<IProps> = ({ form_liquidacion, rows_detalles, estado_expediente, set_rows_detalles, add_new_row_detalles, check_ciclo_and_periodo, edit_detalles_liquidacion }: IProps) => {
  const [opciones_liquidacion, set_opciones_liquidacion] = useState<OpcionLiquidacion[]>([]);
  const [id_opcion_liquidacion, set_id_opcion_liquidacion] = useState("");
  const [concepto, set_concepto] = useState('');
  const [variables_datos, set_variables_datos] = useState<Record<string, string>>({});
  const [ver_factura, set_ver_factura] = useState(false);

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

  useEffect(() => console.log(estado_expediente), [estado_expediente])

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
    let { value } = event.target;
    // Si la clave es 'T', establece el valor en 8 en lugar del valor ingresado
    // if (key === 'T') {
    //   value = '8';
    // }
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

  // const handle_variable_input_change = (event: React.ChangeEvent<HTMLInputElement>, id: number, key: string): void => {
  //   const { value } = event.target;
  //   const row_detalle = rows_detalles.find((detalle) => detalle.id === id);
  //   if (row_detalle) {
  //     const new_variables = { ...row_detalle.variables, [key]: value === '' ? '0' : value };
  //     const new_detalle: RowDetalles = { ...row_detalle, variables: new_variables, valor_liquidado: get_calculated_variables(row_detalle.formula_aplicada, new_variables) };
  //     const new_detalles = rows_detalles.map((detalle) => detalle.id === id ? new_detalle : detalle);
  //     set_rows_detalles(new_detalles);
  //   }
  // };
  const handle_variable_input_change = (event: React.ChangeEvent<HTMLInputElement>, id: number, key: string): void => {
    const { value } = event.target;
    const row_detalle = rows_detalles.find((detalle) => detalle.id === id);
    if (row_detalle) {
      let finalValue = value;
      if (key === 'T') {
        const monthName = months[(id - 1) % months.length];
        const year = parseInt(año);
        finalValue = getDaysInMonth(monthName, year).toString(); // Asigna el número de días del mes si la variable es "T"
      } else {
        finalValue = value === '' ? '0' : value;
      }
      const new_variables = { ...row_detalle.variables, [key]: finalValue };
      const new_detalle: RowDetalles = { ...row_detalle, variables: new_variables, valor_liquidado: get_calculated_variables(row_detalle.formula_aplicada, new_variables) };
      const new_detalles = rows_detalles.map((detalle) => detalle.id === id ? new_detalle : detalle);
      set_rows_detalles(new_detalles);
    }
  };

  const handle_form_submit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    check_ciclo_and_periodo(handle_agregar_detalle);
  };
  //febrero 29 viciesto
  const lastYear = new Date().getFullYear() - 1;

  // Initialize the state with the calculated year
  const [año, set_año] = useState(lastYear.toString());
  const getDaysInMonth = (monthName: string, year: number) => {
    const monthIndex = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ].indexOf(monthName);
    // Crear una fecha que corresponde al primer día del mes siguiente, y restar un día (getTime devuelve tiempo en milisegundos)
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  const [ciclo, set_ciclo] = useState(`${form_liquidacion.periodo_liquidacion}`);
  const handleAddDetail = () => {
    set_ciclo(form_liquidacion.periodo_liquidacion);
    set_ver_factura(false)
  };


  useEffect(() => {
    set_ciclo(form_liquidacion.periodo_liquidacion);
  }, [form_liquidacion.periodo_liquidacion]);
  // }, []);


  const parseCicloToMonths = (ciclo: string) => {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    if (ciclo.toLowerCase() === 'pago unico') {
      return ['Pago único']; // Devuelve un array con un solo elemento "Pago único"
    } else if (ciclo.includes(' a ')) {
      let [start, end] = ciclo.split(' a ').map((month) => month.trim().toLowerCase());
      let startIndex = months.findIndex(m => m.toLowerCase() === start);
      let endIndex = months.findIndex(m => m.toLowerCase() === end);

      // Asegurarse de que los índices son válidos y que endIndex es inclusivo
      if (startIndex !== -1 && endIndex !== -1 && endIndex >= startIndex) {
        return months.slice(startIndex, endIndex + 1);
      }
    } else {
      let monthIndex = months.findIndex(m => m.toLowerCase() === ciclo.toLowerCase());
      if (monthIndex !== -1) {
        return [months[monthIndex]];
      }
    }
    return [];
  };

  const months = parseCicloToMonths(ciclo);



  const column_detalle: GridColDef[] = [
    // {
    //   field: 'id',
    //   headerName: 'ID',
    //   width: 20
    // },
    {
      field: 'mes',
      headerName: 'Mes',
      flex: 1,
      valueGetter: (params) => months[(params.row.id - 0) % months.length]
    },
    {
      field: 'nombre_opcion',
      headerName: 'Nombre opción',
      flex: 1,

    },
    {
      field: 'concepto',
      headerName: 'Concepto',
      flex: 1,
    },
    {
      field: 'formula_aplicada',
      headerName: 'Formula Aplicada',
      flex: 1,
    },


    // {
    //   field: 'dias',
    //   headerName: 'Días del Mes',
    //   width: 110,
    //   valueGetter: (params) => {
    //     const monthName = months[(params.row.id - 0) % months.length];
    //     const year = parseInt(año);
    //     return getDaysInMonth(monthName, year);
    //   }
    // },
    {
      field: 'variables',
      headerName: 'Variables',
      flex: 1,
      renderCell: (params) => {
        return (
          <List dense>
            {Object.entries(params.value).map((entry) => {
              const [key, value] = entry;
              let displayValue = value;
              if (key === 'T') {
                const monthName = months[(params.row.id - 0) % months.length];
                const year = parseInt(año);
                displayValue = getDaysInMonth(monthName, year).toString(); // Actualiza el valor mostrado si la clave es "T"
              }

              return (
                <ListItemText key={`${params.row.id}-${key}`}>
                  <Stack direction={'row'} spacing={2} alignItems={'center'}>
                    <Typography variant="body1">{key}</Typography>:
                    {estado_expediente?.toLowerCase() === 'liquidado' ?
                      <Typography variant="body1">{value as string}</Typography> :
                      <TextField
                        name={key}
                        value={displayValue}
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
      flex: 1,
      valueFormatter: (params) => {
        if (!params.value) {
          return params.value;
        }
        return currency_formatter(Number(params.value), 4);
      }
    },

    // {
    //   field: 'variables',
    //   headerName: 'Variables',
    //   width: 300,
    //   renderCell: (params) => {
    //     return (
    //       <List dense>
    //         {Object.entries(params.value).map((entry) => {
    //           const [key, value] = entry;
    //           return (
    //             <ListItemText key={`${params.row.id}-${key}`}>
    //               <Stack direction={'row'} spacing={2} alignItems={'center'}>
    //                 <Typography variant="body1">{key}</Typography>:
    //                 {estado_expediente?.toLowerCase() === 'liquidado' ?
    //                   <Typography variant="body1">{value as string}</Typography> :
    //                   <TextField
    //                     name={key}
    //                     value={rows_detalles.find((detalle) => detalle.id === params.row.id)?.variables[key]}
    //                     type="number"
    //                     size="small"
    //                     onChange={(event: React.ChangeEvent<HTMLInputElement>) => handle_variable_input_change(event, params.row.id, key)}
    //                   />
    //                 }
    //               </Stack>
    //             </ListItemText>
    //           )
    //         })}
    //       </List>
    //     );
    //   }
    // },

  ]
  console.log("rows_detalles", rows_detalles, estado_expediente);
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

  useEffect(() => {
    if (opcion_liquidacion && opcion_liquidacion.variables) {
      set_variables_datos(opcion_liquidacion.variables);
    }
  }, [opcion_liquidacion]);


  const [tasa, settasa] = useState('Copia Factor Regional TUA');


  useEffect(() => {
    const opcionPreseleccionada = opciones_liquidacion.find(opc => opc.nombre === tasa);
    if (opcionPreseleccionada) {
      set_id_opcion_liquidacion(opcionPreseleccionada.id.toString());
    }
  }, [opciones_liquidacion, tasa]);


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
          {/* <div>
          </div> */}
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
                {/* {estado_expediente?.toLowerCase() === 'activo' && ( */}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<AddIcon />}
                    onClick={handleAddDetail}

                    disabled={id_opcion_liquidacion === '' || concepto === ''}
                  >
                    Agregar detalle de liquidación
                  </Button>
                {/* )} */}
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ width: '100%', mt: '20px' }}>
            <Grid sx={{display: 'flex', justifyContent: 'end', mb: '1rem'}}>
              <Button
                variant="contained"
                color="primary"
                disabled={ver_factura || rows_detalles.length === 0}
                onClick={() => set_ver_factura(true)}
              >
                Ver factura
              </Button>
            </Grid>
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
          {ver_factura && <DocumentoPagoTUA datos={rows_detalles}/>}
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
