/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint no-new-func: 0 */
import { useState } from "react";
import { Box, Button, Grid, List, ListItemText } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Title } from "../../../../components";
import { DetalleModal } from "./modal/DetalleModal";
import type { OpcionLiquidacion, RowDetalles } from "../../interfaces/liquidacion";
import AddIcon from '@mui/icons-material/Add';
interface IProps {
  rows_detalles: RowDetalles[];
  expediente_liquidado: boolean;
  add_new_row_detalles: (formula: string, nuevas_variables: Record<string, string>, opcion_liquidacion: OpcionLiquidacion, id_opcion_liquidacion: string, concepto: string) => void;
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
    renderCell: (params) => {
      return (
        <List dense>
          {Object.entries(params.value).map((entry, index) => {
            const [key, value] = entry;
            return <ListItemText key={index}>{key}: {value as string}</ListItemText>
          })}
        </List>
      );
    }
  },
  {
    field: 'valor_liquidado',
    headerName: 'Valor Liquidado',
    width: 150
  },
]

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare, no-import-assign, @typescript-eslint/no-unused-vars
export const DetalleLiquidacion: React.FC<IProps> = ({ rows_detalles, expediente_liquidado, add_new_row_detalles }: IProps) => {
  const [modal_detalle, set_modal_detalle] = useState<boolean>(false);

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
              rows={rows_detalles}
              columns={column_detalle}
              getRowHeight={() => 'auto'}
            />
          </Box>
        </Grid>
        <Grid container justifyContent='center' sx={{ my: '20px' }}>
          <Grid item xs={3}>
            {!expediente_liquidado && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<AddIcon />}
                onClick={handle_liquidar}
              >
                Agregar detalle de liquidación
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
      <DetalleModal
        is_modal_active={modal_detalle}
        set_is_modal_active={set_modal_detalle}
        add_new_row={add_new_row_detalles}
      />
    </>
  )
}
