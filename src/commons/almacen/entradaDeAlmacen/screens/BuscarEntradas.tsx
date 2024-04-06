import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl,
  Grid, InputLabel, MenuItem, Select, type SelectChangeEvent, Stack, TextField, ButtonGroup
} from '@mui/material';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';
import { useAppDispatch } from '../../../../hooks';
import { obtener_entrada_items, obtener_entradas } from '../thunks/Entradas';
import { Title } from '../../../../components/Title';
import dayjs from 'dayjs';
import { download_xls_dos } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf_dos } from '../../../../documentos-descargar/PDF_descargar';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  title: string;
  tipos_entrada: any;
  set_articulo: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const BuscarEntradasComponent = (props: IProps) => {
  const dispatch = useAppDispatch();
  const [tipo_entrada, set_tipo_entrada] = useState<string>('');
  const [msj_error_tipo, set_msj_error_tipo] = useState<string>('');
  const [grid_busqueda, set_grid_busqueda] = useState<any[]>([]);
  const [grid_filtrada, set_grid_filtrada] = useState<any[]>([]);
  const [selected_entrada, set_selected_entrada] = useState<any | null>(null);
  const [fecha_desde, set_fecha_desde] = useState<Date | null>(null);
  const [fecha_hasta, set_fecha_hasta] = useState<Date | null>(null);

  const cambio_tipo_entrada: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_tipo_entrada(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_tipo("");
  }

  const handle_change_fecha_desde = (date: Date | null): void => {
    set_fecha_desde(date);
  };

  const handle_change_fecha_hasta = (date: Date | null): void => {
    set_fecha_hasta(date);
  };

  useEffect(() => {
    dispatch(obtener_entradas()).then((response: any) => {
      set_grid_busqueda(response.data);
      set_grid_filtrada([...response.data]);
    });
    //  console.log('')(grid_filtrada);
  }, []);

  const accionar_busqueda: any = () => {
    if (fecha_desde === null && fecha_hasta === null && tipo_entrada === "") {
      set_grid_filtrada(grid_busqueda);
      return
    }
    if (fecha_desde !== null && fecha_hasta !== null && tipo_entrada !== "") {
      const data_filter = grid_filtrada.filter(gf => ((dayjs(gf.fecha_entrada).toDate() >= fecha_desde) && (dayjs(gf.fecha_entrada).toDate() <= fecha_hasta)) && gf.id_tipo_entrada === parseInt(tipo_entrada));
      set_grid_filtrada(data_filter);
      return
    }
    if (fecha_desde !== null && fecha_hasta !== null && tipo_entrada === "") {
      const data_filter = grid_filtrada.filter(gf => ((dayjs(gf.fecha_entrada).toDate() >= fecha_desde) && (dayjs(gf.fecha_entrada).toDate() <= fecha_hasta)));
      set_grid_filtrada(data_filter);
      return
    }
    if ((fecha_desde === null || fecha_hasta === null) && tipo_entrada !== "") {
      const data_filter = grid_filtrada.filter(gf => gf.id_tipo_entrada === parseInt(tipo_entrada));
      set_grid_filtrada(data_filter);
    }
  };

  const selected_entrada_grid: any = () => {
    if (selected_entrada !== null) {
      dispatch(obtener_entrada_items(selected_entrada.id_entrada_almacen)).then((response: any) => {
        props.set_articulo(response.data);
        props.set_is_modal_active(false);
      })
    }
  };

  const columnsss = [
    {
      field: "numero_entrada_almacen",
      header: "#",
      style: { width: '10%' },
    },
    {
      field: "fecha_entrada",
      header: "Fecha entrada",
      style: { width: '30%' },
    },
    {
      field: "motivo",
      header: "Motivo",
      style: { width: '60%' },
    },
  ];

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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <FormControl required size='small' fullWidth>
                  <InputLabel>Tipo de entrada</InputLabel>
                  <Select
                    value={tipo_entrada}
                    label="Tipo de entrada"
                    onChange={cambio_tipo_entrada}
                    error={msj_error_tipo !== ""}
                  >
                    <MenuItem value={''}>
                      <em>Seleccionar opción</em>
                    </MenuItem>
                    {props.tipos_entrada.map((te: any) => (
                      <MenuItem key={te.cod_tipo_entrada} value={te.cod_tipo_entrada}>
                        {te.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Fecha desde"
                    value={fecha_desde}
                    onChange={(newValue) => {
                      handle_change_fecha_desde(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField required fullWidth size="small" {...params} />
                    )}
                    maxDate={fecha_hasta}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Fecha hasta"
                    value={fecha_hasta}
                    onChange={(newValue) => {
                      handle_change_fecha_hasta(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField required fullWidth size="small" {...params} />
                    )}
                    minDate={fecha_desde}
                    disabled={fecha_desde == null}
                  />
                </LocalizationProvider>
              </Grid>
              <Stack
                direction="row"
                justifyContent="flex-end"
                sx={{ mt: '17px' }}
              >
                <Grid item xs={12} sm={3}>
                  <Button
                    color="primary"
                    variant="contained"
                    startIcon={<SearchIcon />}
                    onClick={accionar_busqueda}
                  >
                    Buscar
                  </Button>
                </Grid>
              </Stack>
            </Grid>
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
                <Title title="Resultados" />
                <Box sx={{ width: '100%', mt: '20px' }}>
                <ButtonGroup style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}>
              {download_xls_dos({ nurseries: grid_filtrada, columns:columnsss })}
              {download_pdf_dos({ nurseries: grid_filtrada, columns:columnsss, title: 'Resultados' })}
            </ButtonGroup>
                  <div className="card">
                    <DataTable
                      value={grid_filtrada}
                      sortField="nombre"
                      stripedRows
                      paginator
                      rows={10}
                      rowsPerPageOptions={[5, 10, 25, 50]}
                      tableStyle={{ minWidth: '50rem' }}
                      selectionMode="single"
                      selection={selected_entrada}
                      onSelectionChange={(e) => {
                        set_selected_entrada(e.value);
                      }}
                      dataKey="numero_entrada_almacen"
                    >
                      <Column
                        field="numero_entrada_almacen"
                        header="#"
                        style={{ width: '10%' }}
                      ></Column>
                      <Column
                        field="fecha_entrada"
                        header="Fecha entrada"
                        style={{ width: '30%' }}
                      ></Column>
                      <Column
                        field="motivo"
                        header="Motivo"
                        style={{ width: '60%' }}
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
          onClick={selected_entrada_grid}
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
export default BuscarEntradasComponent;
