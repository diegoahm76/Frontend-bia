import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack, TextField } from "@mui/material"
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Title } from '../../../../../../../components';
import { get_vehicles_all_service } from "../../../hojaDeVidaVehiculo/store/thunks/cvVehiclesThunks";
import { useAppDispatch } from "../../../../../../../hooks";
import { get_vehicles } from "../../../hojaDeVidaVehiculo/store/slices/indexCvVehiculo";


interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  title: string;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const BuscarArticuloComponent = ({
  is_modal_active,
  set_is_modal_active,
  title,
}: IProps) => {
  const dispatch = useAppDispatch();
  const [codigo, set_codigo] = useState<string>("");
  const [nombre, set_nombre] = useState<string>("");
  const [grid_vehivulos, set_grid_vehivulos] = useState<any[]>([]);
  const [grid_vehivulos_before, set_grid_vehivulos_before] = useState<any[]>([]);
  const [selected_product, set_selected_product] = useState(null);
  const [columna_hidden, set_columna_hidden] = useState<boolean>(false);

  const on_change_codigo: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_codigo(e.target.value);
    console.log(codigo)
  }

  const on_change_nombre: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_nombre(e.target.value);
    console.log(nombre)
  }

  const accionar_busqueda: any = () => {
    if(nombre === '' && codigo === ''){
      set_grid_vehivulos(grid_vehivulos_before);
      return
    }
    const data_filter = grid_vehivulos_before.filter(gv => ((Boolean(gv.nombre.includes(nombre))) && gv.codigo_bien.toString().includes(codigo)));
    set_grid_vehivulos(data_filter);
  }

  const selected_product_grid: any = () => {
    console.log(selected_product)
  }

  useEffect(() => {
    dispatch(get_vehicles_all_service()).then((response: any) => {
      set_grid_vehivulos(response.Elementos);
      set_grid_vehivulos_before([...response.Elementos]);
    })
  }, []);

  useEffect(() => {
    console.log(get_vehicles);
  }, [grid_vehivulos]);

  useEffect(() => {
    title ==='Buscar vehículos' ? set_columna_hidden(false) : set_columna_hidden(true);
  }, [title])
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Dialog
      fullWidth
      maxWidth="md"
      open={is_modal_active}
      onClose={() => { set_is_modal_active(false); }}
    >
      <DialogTitle>{title}</DialogTitle>
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
                    <DataTable value={grid_vehivulos} sortField="nombre" stripedRows  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                    selectionMode="single" selection={selected_product} onSelectionChange={(e) => { set_selected_product(e.value); }} dataKey="id_bien"
                    >
                      <Column field="id_bien" header="Id" style={{ width: '25%' }}></Column>
                      <Column field="codigo_bien" header="Código" style={{ width: '25%' }}></Column>
                      <Column field="nombre" header="Nombre" style={{ width: '25%' }}></Column>
                      <Column field="doc_identificador_nro" header="Placa" style={{ width: '25%' }} hidden={columna_hidden}></Column>
                      <Column field="doc_identificador_nro" header="Serial" style={{ width: '25%' }} hidden={!columna_hidden}></Column>
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
          onClick={() => { set_is_modal_active(false); }}>Cerrar</Button>
        <Button
          color='primary'
          variant='contained'
          onClick={selected_product_grid}>Seleccionar</Button>
      </DialogActions>
    </Dialog>
  )
}
// eslint-disable-next-line no-restricted-syntax
export default BuscarArticuloComponent;