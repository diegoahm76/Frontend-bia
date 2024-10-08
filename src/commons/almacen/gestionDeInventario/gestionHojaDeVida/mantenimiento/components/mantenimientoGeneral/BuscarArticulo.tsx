import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack, TextField } from "@mui/material"
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Title } from '../../../../../../../components';
import { useAppDispatch } from "../../../../../../../hooks";
import { get_article_by_type } from "./thunks/maintenanceThunks";
import { DataGrid } from "@mui/x-data-grid";


interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  title: string;
  parent_details: any;
}
const tipos_articulos = [{ value: "Veh", tipo: "vehículos" }, { value: "Com", tipo: "computadores" }, { value: "OAc", tipo: "otros activos" }];
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const BuscarArticuloComponent = ({
  is_modal_active,
  set_is_modal_active,
  title,
  parent_details
}: IProps) => {
  const dispatch = useAppDispatch();
  const [codigo, set_codigo] = useState<string>("");
  const [nombre, set_nombre] = useState<string>("");
  const [placa, set_placa] = useState<string>("");
  const [marca, set_marca] = useState<string>("");
  const [grid_busqueda, set_grid_busqueda] = useState<any[]>([]);
  const [grid_busqueda_before, set_grid_busqueda_before] = useState<any[]>([]);
  const [selected_product, set_selected_product] = useState<Record<string, any> | null>(null);
  const [columna_hidden, set_columna_hidden] = useState<boolean>(false);

  let identificador_nro = grid_busqueda.length > 0 ? (grid_busqueda[0].cod_tipo_activo == 'Veh' ? 'Placa' : 'Serial') : 'Placa - Serial';

  const columns = [
    // { field: 'id_bien', headerName: 'Id', width: 200 },
    { field: 'codigo_bien', headerName: 'Código', width: 160 },
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'doc_identificador_nro', headerName: identificador_nro, width: 100, renderCell: (params: any) => params.value.toUpperCase()},
    { field: 'marca', headerName: 'Marca', width: 200, renderCell: (params: any) => params.value ? params.value : 'Sin Marca'},
    { field: 'descripcion', headerName: 'Descripcion', width: 200 },
    { field: 'estado', headerName: 'Estado', width: 200, renderCell: (params: any) => params.value ? params.value : 'Sin Estado'},
  ];

  const on_change_codigo: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_codigo(e.target.value);
  }

  const on_change_nombre: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_nombre(e.target.value);
  }

  const on_change_placa: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_placa(e.target.value);
  }

  const on_change_marca: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_marca(e.target.value);
  }

  const accionar_busqueda: any = () => {
    console.log(grid_busqueda_before);
    if (nombre === '' && codigo === '' && placa === '' && marca === '') {
      set_grid_busqueda(grid_busqueda_before);
      return
    }
    const data_filter = grid_busqueda_before.filter(gv => (
      (gv.nombre?.toLowerCase()?.includes(nombre.toLowerCase()) ?? false) &&
      gv.codigo_bien.toString().toLowerCase().includes(codigo.toLowerCase()) &&
      (gv.doc_identificador_nro?.toLowerCase()?.includes(placa.toLowerCase()) ?? false) &&
      (gv.marca?.toLowerCase()?.includes(marca.toLowerCase()) ?? false)
    ));
    set_grid_busqueda(data_filter);
  }

  const selected_product_grid: any = () => {
    parent_details(selected_product);
    set_is_modal_active(false);
  }

  useEffect(() => {
    const tipo = tipos_articulos.find(ta => ta.tipo === title);
    set_columna_hidden(false);
    dispatch(get_article_by_type(tipo?.value)).then((response: any) => {
      const articulos = response.Elementos.filter((e: { nivel_jerarquico: number; }) => e.nivel_jerarquico === 5);
      set_grid_busqueda(articulos);
      set_grid_busqueda_before([...articulos]);
    })
  }, [title])
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Dialog
      fullWidth
      maxWidth="md"
      open={is_modal_active}
      onClose={() => { set_is_modal_active(false); }}
    >
      <DialogTitle>Buscar {title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Box
            component="form"
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={2}>
                <TextField
                  label="Código"
                  helperText="Ingrese código"
                  size="small"
                  fullWidth
                  value={codigo}
                  onChange={on_change_codigo}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Nombre"
                  helperText="Ingrese nombre"
                  size="small"
                  fullWidth
                  value={nombre}
                  onChange={on_change_nombre}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  label="Placa / Serial"
                  helperText="Ingrese placa"
                  size="small"
                  fullWidth
                  value={placa}
                  onChange={on_change_placa}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Marca"
                  helperText="Ingrese marca"
                  size="small"
                  fullWidth
                  value={marca}
                  onChange={on_change_marca}
                />
              </Grid>
              <Stack
                direction="row"
                justifyContent="flex-end"
                sx={{ mt: '17px' }}
              >
                <Grid item ml={1}>
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
                  <DataGrid
                    density="compact"
                    autoHeight
                    rows={grid_busqueda ?? []}
                    columns={columns}
                    pageSize={8}
                    rowsPerPageOptions={[8]}
                    rowHeight={60}
                    getRowId={(row) => row.id_bien}
                    onSelectionModelChange={(newSelection) => {
                      const selected_row = grid_busqueda.find((row) => row.id_bien === newSelection[0]);
                      set_selected_product(selected_row);
                    }}
                    selectionModel={selected_product ? [selected_product.id_bien] : []}
                  />
                  {/* <DataTable value={grid_busqueda} sortField="nombre" stripedRows paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                    selectionMode="single" selection={selected_product} onSelectionChange={(e) => { set_selected_product(e.value as any); }} dataKey="id_bien"
                  >
                    <Column field="id_bien" header="Id" style={{ width: '25%' }}></Column>
                    <Column field="codigo_bien" header="Código" style={{ width: '25%' }}></Column>
                    <Column field="nombre" header="Nombre" style={{ width: '25%' }}></Column>
                    <Column field="doc_identificador_nro" header="Placa" style={{ width: '25%' }} hidden={columna_hidden}></Column>
                    <Column field="doc_identificador_nro" header="Serial" style={{ width: '25%' }} hidden={!columna_hidden}></Column>
                  </DataTable> */}
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