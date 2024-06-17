/* eslint-disable array-callback-return */
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Title } from '../../../../components/Title';
import { useAppDispatch } from '../../../../hooks';
import { download_pdf_dos } from '../../../../documentos-descargar/PDF_descargar';
import { download_xls_dos } from '../../../../documentos-descargar/XLS_descargar';
import { obtener_bienes_consumo, obtener_lista_tipo } from '../thunks/ControlDeInventarios';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  title: string;
  seleccion_bien: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const BuscarBienConsumo = (props: IProps) => {
  const dispatch = useAppDispatch();
  const [seleccion_bien, set_seleccion_bien] = useState<any | null>(null);
  const [lt_tipos, set_lt_tipos] = useState<any[]>([]);
  const [data_bienes, set_data_bienes] = useState<any[]>([]);
  const [data_filtrada, set_data_filtrada] = useState<any[]>([]);
  const [nombre, set_nombre] = useState<string>('');
  const [codigo_bien, set_codigo_bien] = useState<string>('');
  const [seleccion_tipo, set_seleccion_tipo] = useState<string>('');
  const [solicitable, set_solicitable] = useState<boolean>(false);

  useEffect(() => {
    obtener_tipos_fc();
    buscar_bien();
  }, []);

  const obtener_tipos_fc: () => void = () => {
    dispatch(obtener_lista_tipo()).then((response: any) => {
      set_lt_tipos(response);
    })
  }

  const cambio_nombre: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_nombre(e.target.value);
  };
  const cambio_codigo_bien: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_codigo_bien(e.target.value);
  };
  const cambio_tipo_elemento: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_tipo(e.target.value);
  }

  const buscar_bien = (): void => {
    dispatch(obtener_bienes_consumo(codigo_bien, nombre, seleccion_tipo == 'Todos' ? '' : seleccion_tipo, solicitable ? 'True' : 'False')).then((response: any) => {
      response.data.map((resp: any, index: number) => {
        resp.id = index;
        if (resp.codigo_bien === null || resp.codigo_bien === undefined)
          resp.codigo_bien = 'N/A';
        if (resp.tipo_consumo_vivero === null || resp.tipo_consumo_vivero === undefined)
          resp.tipo_consumo_vivero = 'N/A';
      });
      set_data_bienes(response.data);
      set_data_filtrada(response.data);
    });
    // let data_filter: any = [...data_bienes];
    // if (nombre === '' && codigo_bien === '' && seleccion_tipo === '') {
    //   set_data_filtrada(data_bienes);
    //   return;
    // }
    // if (codigo_bien !== '')
    //   data_filter = [...data_filter.filter((da: any) => da.codigo_bien.includes(codigo_bien))];
    // if (nombre !== '')
    //   data_filter = [...data_filter.filter((da: any) => da.nombre_bien.toLowerCase().includes(nombre.toLowerCase()))];
    // if (seleccion_tipo !== '')
    //   data_filter = [...data_filter.filter((da: any) => da.cod_tipo_elemento_vivero === seleccion_tipo)];

    // data_filter = [...data_filter.filter((da: any) => da.solicitable_vivero === solicitable)];
    // set_data_filtrada(data_filter);
  };

  const seleccionar_bien = (): void => {
    props.seleccion_bien(seleccion_bien);
    props.set_is_modal_active(false);
  };
  const columnsss = [
    { field: 'codigo_bien', header: 'Código', style: { width: '5%' } },
    { field: 'serial', header: 'Serial', style: { width: '8%' } },
    { field: 'nombre_bien', header: 'Bien', style: { width: '8%' } },
    { field: 'categoria', header: 'Categoría', style: { width: '8%' } },
    { field: 'nombre_marca', header: 'Marca', style: { width: '8%' } },
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
      <Grid item xs={12} marginLeft={2} marginRight={2} marginTop={3}>
        <Title title={`${props.title} `} />
      </Grid>
      <DialogTitle> </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Código"
                    helperText=" "
                    size="small"
                    fullWidth
                    value={codigo_bien}
                    onChange={cambio_codigo_bien}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nombre"
                    helperText=" "
                    size="small"
                    fullWidth
                    value={nombre}
                    onChange={cambio_nombre}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl size='small' fullWidth>
                        <InputLabel>Tipo elemento</InputLabel>
                        <Select
                          value={seleccion_tipo}
                          label="Tipo elemento"
                          onChange={cambio_tipo_elemento}
                        >
                          <MenuItem value={"Todos"}>Todos</MenuItem>
                          {lt_tipos.map((lt: any) => (
                            <MenuItem key={lt[0]} value={lt[0]}>
                              {lt[1]}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    spacing={2}>
                    <span style={{ margin: '7px' }}>Solicitable </span><Switch color="primary" onChange={() => { set_solicitable(!solicitable) }} />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Stack direction="row" justifyContent="center">
                    <Button
                      color="primary"
                      variant="contained"
                      startIcon={<SearchIcon />}
                      onClick={buscar_bien}
                    >
                      Buscar
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Title title="Resultados" />
                <Box sx={{ width: '100%', mt: '20px' }}>
                  <ButtonGroup
                    style={{
                      margin: 7,
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {download_xls_dos({
                      nurseries: data_filtrada,
                      columns: columnsss,
                    })}
                    {download_pdf_dos({
                      nurseries: data_filtrada,
                      columns: columnsss,
                      title: 'Resultados',
                    })}
                  </ButtonGroup>
                  <div className="card">
                    <DataTable
                      value={data_filtrada}
                      sortField="codigo_bien"
                      stripedRows
                      paginator
                      rows={10}
                      rowsPerPageOptions={[5, 10, 25, 50]}
                      tableStyle={{ minWidth: '50rem' }}
                      selectionMode="single"
                      selection={seleccion_bien}
                      onSelectionChange={(e) => {
                        set_seleccion_bien(e.value);
                      }}
                      dataKey="id_bien"
                    >
                      <Column
                        field="codigo_bien"
                        header="Código"
                        style={{ width: '5%' }}
                      ></Column>
                      <Column
                        field="nombre_bien"
                        header="Bien"
                        style={{ width: '8%' }}
                      ></Column>
                      <Column
                        field="tipo_consumo_vivero"
                        header="Tipo elemento"
                        style={{ width: '8%' }}
                      ></Column>
                      <Column
                        field="solicitable_vivero"
                        header="Solicitable"
                        style={{ width: '8%' }}
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
          color="error"
          variant="outlined"
          startIcon={<ClearIcon />}
          onClick={() => {
            props.set_is_modal_active(false);
          }}
        >
          Cancelar
        </Button>
        <Button
          color="success"
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={seleccionar_bien}
        >
          Seleccionar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
// eslint-disable-next-line no-restricted-syntax
export default BuscarBienConsumo;