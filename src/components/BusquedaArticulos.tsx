import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack, TextField } from '@mui/material';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { obtener_bienes } from '../commons/almacen/entradaDeAlmacen/thunks/Entradas';
import { useAppDispatch } from '../hooks';
import { Title } from './Title';
import SearchIcon from '@mui/icons-material/Search';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  articulo: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaArticulos: React.FC<IProps> = (props: IProps) => {
  const dispatch = useAppDispatch();
  const [codigo, set_codigo] = useState<string>("");
  const [nombre, set_nombre] = useState<string>("");
  const [grid_busqueda, set_grid_busqueda] = useState<any[]>([]);
  const [grid_busqueda_before, set_grid_busqueda_before] = useState<any[]>([]);
  const [seleccion_articulo, set_seleccion_articulo] = useState(null);

  const on_change_codigo: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_codigo(e.target.value);
  }

  const on_change_nombre: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_nombre(e.target.value);
  }

  const accionar_busqueda: any = () => {
    if (nombre === '' && codigo === '') {
      set_grid_busqueda(grid_busqueda_before);
      return
    }
    const data_filter = grid_busqueda_before.filter(gv => ((Boolean(gv.nombre.includes(nombre))) && gv.codigo_bien.toString().includes(codigo)));
    set_grid_busqueda(data_filter);
  }

  const selected_product_grid: any = () => {
    props.articulo(seleccion_articulo);
    props.set_is_modal_active(false);
  }

  useEffect(() => {
    dispatch(obtener_bienes()).then((response: { success: boolean, detail: string, data: any[] }) => {
      if (response.success) {
        const articulos = response.data.filter((e: { nivel_jerarquico: number; }) => e.nivel_jerarquico === 5);
        set_grid_busqueda(articulos);
        set_grid_busqueda_before([...articulos]);
      }
    });
  }, []);

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Dialog
      fullWidth
      maxWidth="md"
      open={props.is_modal_active}
      onClose={() => { props.set_is_modal_active(false); }}
    >
      <DialogTitle>Selección de articulos</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Box
            component="form"
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Código"
                  helperText="Ingrese código"
                  size="small"
                  fullWidth
                  value={codigo}
                  onChange={on_change_codigo}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Nombre"
                  helperText="Ingrese nombre"
                  size="small"
                  fullWidth
                  value={nombre}
                  onChange={on_change_nombre}
                />
              </Grid>
              <Stack
                direction="row"
                justifyContent="flex-end"
                sx={{ mt: '17px' }}
              >
                <Grid item xs={12} sm={4}>
                  <Button
                    color='primary'
                    variant='contained'
                    startIcon={<SearchIcon />}
                    onClick={accionar_busqueda}
                  >
                    Buscar
                  </Button>
                </Grid>
              </Stack>

            </Grid>
            <Grid container
              sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
              }}>
              <Grid item xs={12} sm={12}>
                <Title title='Resultados' />
                <Box sx={{ width: '100%', mt: '20px' }}>
                  <div className="card">
                    <DataTable value={grid_busqueda} sortField="nombre" stripedRows paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                    // @ts-ignore
                      selectionMode="single" selection={seleccion_articulo} onSelectionChange={(e) => { set_seleccion_articulo(e.value); }} dataKey="id_bien"
                    >
                      <Column field="id_bien" header="Id" style={{ width: '25%' }}></Column>
                      <Column field="codigo_bien" header="Código" style={{ width: '25%' }}></Column>
                      <Column field="nombre" header="Nombre" style={{ width: '25%' }}></Column>
                      <Column field="cod_tipo_bien" header="Tipo bien" style={{ width: '25%' }}></Column>
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
          color='inherit'
          variant='contained'
          onClick={() => { props.set_is_modal_active(false); }}>Cerrar</Button>
        <Button
          color='primary'
          variant='contained'
          onClick={selected_product_grid}>Seleccionar</Button>
      </DialogActions>
    </Dialog>
  )
}




