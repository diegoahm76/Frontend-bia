import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useAppDispatch } from '../../../../../../hooks';
import { Title } from '../../../../../../components/Title';
import { obtener_bodegas } from '../../../../entradaDeAlmacen/thunks/Entradas';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  title: string;
  set_bodega: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const BuscarBodegaComponent = (props: IProps) => {
  const dispatch = useAppDispatch();
  const [grid_filtrada, set_grid_filtrada] = useState<any[]>([]);
  const [selected_bodega, set_selected_bodega] = useState<any | null>(null);

  useEffect(() => {
    dispatch(obtener_bodegas()).then((response: any) => {
      const data_bodegas = response.filter((dr: any) => dr.activo);
      set_grid_filtrada([...data_bodegas]);
    });
    //  console.log('')(grid_filtrada);
  }, []);

  const selected_bodega_grid: any = () => {
    if (selected_bodega !== null) {
      props.set_bodega(selected_bodega);
      props.set_is_modal_active(false);
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Dialog
      fullWidth
      maxWidth="md"
      open={props.is_modal_active}
      onClose={() => {
        props.set_is_modal_active(false);
      }}
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText
          component={'span'}
          id="alert-dialog-slide-description"
        >
          <Box
            component="form"
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <Grid
              container
              sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
              }}
            >
              <Grid item xs={12} sm={12}>
                <Title title="Bodegas" />
                <Box sx={{ width: '100%', mt: '20px' }}>
                  <div className="card">
                    <DataTable
                      value={grid_filtrada}
                      sortField="nombre"
                      stripedRows
                      paginator
                      rows={5}
                      rowsPerPageOptions={[5, 10, 25, 50]}
                      tableStyle={{ minWidth: '50rem' }}
                      selectionMode="single"
                      selection={selected_bodega}
                      onSelectionChange={(e) => {
                        set_selected_bodega(e.value);
                      }}
                      dataKey="id_bodega"
                    >
                      <Column
                        field="nombre"
                        header="Nombre"
                        style={{ width: '20%' }}
                      ></Column>
                      <Column
                        field="cod_municipio"
                        header="Municipio"
                        style={{ width: '30%' }}
                      ></Column>
                      <Column
                        field="direccion"
                        header="Direcciòn"
                        style={{ width: '50%' }}
                      ></Column>
                    </DataTable>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={selected_bodega_grid}
        >
          Seleccionar
        </Button>
        <Button
          color="inherit"
          variant="contained"
          onClick={() => {
            props.set_is_modal_active(false);
          }}
        >
          Salir
        </Button>
      </DialogActions>
    </Dialog>
  );
};
// eslint-disable-next-line no-restricted-syntax
export default BuscarBodegaComponent;
