/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint no-new-func: 0 */
import { useState, type Dispatch, type SetStateAction } from "react";
import { Box, Button, Grid, List, ListItemText } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Title } from "../../../../components";
import { DetalleModal } from "./modal/DetalleModal";
import type { FormDetalleLiquidacion, FormLiquidacion, OpcionLiquidacion } from "../../interfaces/liquidacion";
import AddIcon from '@mui/icons-material/Add';
interface IProps {
  set_form_liquidacion: Dispatch<SetStateAction<FormLiquidacion>>;
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

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare, no-import-assign, @typescript-eslint/no-unused-vars
export const DetalleLiquidacion: React.FC<IProps> = ({ set_form_liquidacion, set_form_detalle_liquidacion }: IProps) => {
  const [rows, set_rows] = useState<Row[]>([]);
  const [modal_detalle, set_modal_detalle] = useState<boolean>(false);
  const [id_row, set_id_row] = useState(0);

  const add_new_row = (valor: string, nuevas_variables: Record<string, string>, opcion_liquidacion: OpcionLiquidacion, id_opcion_liquidacion: string, concepto: string): void => {
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
    set_form_liquidacion((previousData) => ({ ...previousData, valor: (previousData.valor as number || 0) + Number(funcion()) }));
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

  const handle_liquidar = (): void => {
    set_modal_detalle(true);
  }

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
          <Box sx={{ width: '100%', mt: '20px' }}>
            <DataGrid
              density="compact"
              autoHeight
              rows={rows}
              columns={column_detalle}
              getRowHeight={() => 'auto'}
            />
          </Box>
        </Grid>
        <Grid container justifyContent='center' sx={{ my: '20px' }}>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<AddIcon />}
              onClick={handle_liquidar}
            >
              Agregar detalle de liquidación
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <DetalleModal
        is_modal_active={modal_detalle}
        set_is_modal_active={set_modal_detalle}
        add_new_row={add_new_row}
      />
    </>
  )
}
