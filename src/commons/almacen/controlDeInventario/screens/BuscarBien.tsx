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
  Grid,
  Stack,
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
import { obtener_bienes } from '../thunks/ControlDeInventarios';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  title: string;
  filtros: any;
  seleccion_bien: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const BuscarBien = (props: IProps) => {
  const dispatch = useAppDispatch();
  const [seleccion_bien, set_seleccion_bien] = useState<any | null>(null);
  const [data_bienes, set_data_bienes] = useState<any[]>([]);
  const [data_filtrada, set_data_filtrada] = useState<any[]>([]);
  const [nombre, set_nombre] = useState<string>('');
  const [serial, set_serial] = useState<string>('');
  const [categoria, set_categoria] = useState<string>('');
  const [marca, set_marca] = useState<string>('');
  const [codigo_bien, set_codigo_bien] = useState<string>('');

  useEffect(() => {
    dispatch(obtener_bienes()).then((response: any) => {
      response.data.map((resp: any, index: number) => {
        resp.id = index;
        if (resp.codigo_bien === null || resp.codigo_bien === undefined)
          resp.codigo_bien = 'N/A';
        if (resp.nombre_marca === null || resp.nombre_marca === undefined)
          resp.nombre_marca = 'N/A';
        if (resp.serial === null || resp.serial === undefined)
          resp.serial = 'N/A';
      });
      set_data_bienes(response.data);
      set_data_filtrada(response.data);
    });
  }, []);

  const cambio_nombre: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_nombre(e.target.value);
  };
  const cambio_categoria: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_categoria(e.target.value);
  };
  const cambio_marca: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_marca(e.target.value);
  };
  const cambio_serial: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_serial(e.target.value);
  };
  const cambio_codigo_bien: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_codigo_bien(e.target.value);
  };

  const buscar_bien = (): void => {
    let data_filter: any = [...data_bienes];
    if (nombre === '' && codigo_bien === '' && serial === '' && categoria === '' && marca === '') {
      set_data_filtrada(data_bienes);
      return;
    }
    if (codigo_bien !== '')
      data_filter = [
        ...data_filter.filter((da: any) =>
          da.codigo_bien.includes(codigo_bien)
        ),
      ];
    if (serial !== '')
      data_filter = [
        ...data_filter.filter((da: any) =>
          da.serial.toLowerCase().includes(serial.toLowerCase())
        ),
      ];
    if (nombre !== '')
      data_filter = [
        ...data_filter.filter((da: any) =>
          da.nombre_bien.toLowerCase().includes(nombre.toLowerCase())
        ),
      ];
    if (categoria !== '')
      data_filter = [
        ...data_filter.filter((da: any) =>
          da.categoria.toLowerCase().includes(categoria.toLowerCase())
        ),
      ];
    if (marca !== '')
      data_filter = [
        ...data_filter.filter((da: any) =>
          da.nombre_marca.toLowerCase().includes(marca.toLowerCase())
        ),
      ];
    set_data_filtrada(data_filter);
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
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Código"
                    helperText=" "
                    size="small"
                    fullWidth
                    value={codigo_bien}
                    onChange={cambio_codigo_bien}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="serial"
                    helperText=" "
                    size="small"
                    fullWidth
                    value={serial}
                    onChange={cambio_serial}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Nombre"
                    helperText=" "
                    size="small"
                    fullWidth
                    value={nombre}
                    onChange={cambio_nombre}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Categoría"
                    helperText=" "
                    size="small"
                    fullWidth
                    value={categoria}
                    onChange={cambio_categoria}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Marca"
                    helperText=" "
                    size="small"
                    fullWidth
                    value={marca}
                    onChange={cambio_marca}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
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
                        field="nombre_marca"
                        header="Marca"
                        style={{ width: '8%' }}
                      ></Column>
                      <Column
                        field="serial"
                        header="Serial"
                        style={{ width: '8%' }}
                      ></Column>
                      <Column
                        field="categoria"
                        header="Categoría"
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
export default BuscarBien;