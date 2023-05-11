/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint no-new-func: 0 */
import { useMemo, useState, type Dispatch, type SetStateAction } from "react"
import { Box, Button, FormControl, Grid, MenuItem, Select, type SelectChangeEvent, Stack, InputLabel, TextField, List, ListItemText } from "@mui/material"
import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import { Title } from "../../../../components"
import { DetalleModal } from "./modal/DetalleModal"
import type { FormDetalleLiquidacion, OpcionLiquidacion } from "../../interfaces/liquidacion"

interface IProps {
  opciones_liquidacion: OpcionLiquidacion[];
  set_total_obligacion: Dispatch<SetStateAction<number>>;
  set_form_detalle_liquidacion: Dispatch<SetStateAction<FormDetalleLiquidacion[]>>;
}

interface Row {
  id: number,
  nombre_opcion: string;
  concepto: string;
  formula_aplicada: string;
  variables: Record<string, string>;
  valor_liquidado: string;
}

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
    renderCell: (cellValues) => {
      return (
        <List dense>
          {Object.entries(cellValues.row.variables).map((entry, index) => {
            const [key, value] = entry;
            return <ListItemText key={index}>{key}: {value as string}</ListItemText>
          })}
        </List>
      )
    }
  },
  {
    field: 'valor_liquidado',
    headerName: 'Valor Liquidado',
    width: 150
  },
]

// const rows_detalle = [
//   {
//     id: 1,
//     liquidacion: 'Liquidacion 1',
//     concepto: 'Interes por mora',
//     valor_base_liquidacion: '465.402',
//     formula_aplicada: 'valor*0.02*12',
//     valor_liquidado: '65000'
//   },
//   {
//     id: 2,
//     liquidacion: 'Liquidacion 2',
//     concepto: 'Sancion',
//     valor_base_liquidacion: '465.402',
//     formula_aplicada: 'valor*0.1',
//     valor_liquidado: '465540'
//   },
// ]

// const tipo_liquidacion = [{ value: 'liquidacion_mora_sancion', label: 'Liquidacion de mora con sancion' }]

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare, no-import-assign, @typescript-eslint/no-unused-vars
export const DetalleLiquidacion: React.FC<IProps> = ({ opciones_liquidacion, set_total_obligacion, set_form_detalle_liquidacion }: IProps) => {
  const [rows, set_rows] = useState<Row[]>([]);
  const [modal_detalle, set_modal_detalle] = useState<boolean>(false);
  const [concepto, set_concepto] = useState('');
  const [id_opcion_liquidacion, set_id_opcion_liquidacion] = useState("");
  const [id_row, set_id_row] = useState(0);

  const opcion_liquidacion: OpcionLiquidacion = useMemo(() => opciones_liquidacion.filter(opcion_liquidacion => opcion_liquidacion.id === Number(id_opcion_liquidacion))[0], [id_opcion_liquidacion]);

  const handle_select_change: (event: SelectChangeEvent) => void = (event: SelectChangeEvent) => {
    set_id_opcion_liquidacion(event.target.value);
  }

  const handle_input_change = (event: React.ChangeEvent<HTMLInputElement>): void => {
    set_concepto(event.target.value);
  };

  const add_new_row = (valor: string, nuevas_variables: Record<string, string>): void => {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const funcion = new Function(`return ${valor}`);
    const new_row: Row = {
      id: id_row,
      nombre_opcion: opcion_liquidacion.nombre,
      concepto,
      formula_aplicada: opcion_liquidacion.funcion,
      variables: nuevas_variables,
      valor_liquidado: funcion()
    };
    set_total_obligacion(prevTotal => prevTotal + Number(funcion()));
    set_rows([...rows, new_row]);
    set_id_row(prevID => prevID + 1);
    set_form_detalle_liquidacion((prevData) => [
      ...prevData,
      {
        variables: nuevas_variables,
        id_opcion_liq: id_opcion_liquidacion,
        valor: Number(funcion()),
        estado: 1,
        concepto: concepto,
      }
    ]);
  };

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
          <Box
            component='form'
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <Stack
              direction="column"
              spacing={2}
              sx={{ m: '20px 0' }}
              justifyContent="flex-end"
            >
              <TextField
                label='Concepto'
                size="small"
                value={concepto}
                onChange={handle_input_change}
                required
              />
              <FormControl sx={{ pb: '10px' }} size='small' fullWidth>
                <InputLabel>Selecciona opción liquidación</InputLabel>
                <Select
                  label='Selecciona opción liquidación'
                  value={id_opcion_liquidacion}
                  onChange={handle_select_change}
                >
                  {opciones_liquidacion.map((opc_liquidacion) => (
                    <MenuItem key={opc_liquidacion.id} value={opc_liquidacion.id}>
                      {opc_liquidacion.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  set_modal_detalle(true);
                }}
                disabled={id_opcion_liquidacion === ''}
              >
                Liquidar
              </Button>
            </Stack>

            <Box sx={{ width: '100%' }}>
              <DataGrid
                density="compact"
                autoHeight
                rows={rows}
                columns={column_detalle}
                getRowHeight={() => 'auto'}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      {opcion_liquidacion && <DetalleModal
        is_modal_active={modal_detalle}
        set_is_modal_active={set_modal_detalle}
        opcion_liquidacion={opcion_liquidacion}
        add_new_row={add_new_row}
      />}
    </>
  )
}
