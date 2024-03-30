import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  type SelectChangeEvent,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ButtonGroup,
} from '@mui/material';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Title } from '../../../../components/Title';
import { type obtener_arriendo } from '../interfaces/ArriendoVehiculo';
import { useAppDispatch } from '../../../../hooks';
import { obtener_arriendos } from '../thunks/Arriendo';
import SearchIcon from '@mui/icons-material/Search';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  title: string;
  lista_marcas: any[];
  arriendo_veh: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const BuscarArriendoComponent = (props: IProps) => {
  const dispatch = useAppDispatch();
  const [nombre, set_nombre] = useState<string>('');
  const [placa, set_placa] = useState<string>('');
  const [marca, set_marca] = useState<string>('');
  const [proveedor, set_proveedor] = useState<string>('');
  const [seleccion_arriendo, set_seleccion_arriendo] = useState<any | null>(
    null
  );
  const [data_arriendos, set_data_arriendos] = useState<obtener_arriendo[]>([]);
  const [data_filtrada, set_data_filtrada] = useState<obtener_arriendo[]>([]);

  useEffect(() => {
    dispatch(obtener_arriendos()).then((response: any) => {
      set_data_arriendos(response.data);
      set_data_filtrada([...response.data]);
    });
    // //  console.log('')(data_filtrada);
  }, []);

  const cambio_nombre: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_nombre(e.target.value);
  };
  const cambio_placa: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_placa(e.target.value);
  };

  const cambio_marca: (event: SelectChangeEvent) => void = (
    e: SelectChangeEvent
  ) => {
    set_marca(e.target.value);
  };

  const cambio_proveedor: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_proveedor(e.target.value);
  };

  const buscar_arriendo = (): void => {
    let data_filter: any;
    if (nombre === '' && placa === '' && marca === '' && proveedor === '') {
      set_data_filtrada(data_arriendos);
      return;
    }
    if (nombre !== '')
      data_filter = [
        ...data_arriendos.filter((da) => da.nombre.includes(nombre)),
      ];
    if (placa !== '')
      data_filter = [
        ...data_filter.filter((da: any) => da.placa.includes(placa)),
      ];
    if (marca !== '')
      data_filter = [
        ...data_filter.filter((da: any) => da.id_marca === parseInt(marca)),
      ];
    if (proveedor !== '')
      data_filter = [
        ...data_filter.filter((da: any) =>
          da.empresa_contratista.includes(proveedor)
        ),
      ];
    set_data_filtrada(data_filter);
  };

  const seleccionar_arriendo = (): void => {
    props.arriendo_veh(seleccion_arriendo);
    props.set_is_modal_active(false);
  };

  const columnsss = [
    { field: "nombre", header: "Nombre" },
    { field: "placa", header: "Placa" },
    { field: "empresa_contratista", header: "Empresa contratista" }
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
        <DialogContentText id="alert-dialog-slide-description">
          <Box
            component="form"
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Nombre"
                  helperText=" "
                  size="small"
                  required
                  fullWidth
                  value={nombre}
                  onChange={cambio_nombre}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Placa"
                  helperText=" "
                  size="small"
                  required
                  fullWidth
                  value={placa}
                  onChange={cambio_placa}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl required size="small" fullWidth>
                  <InputLabel>Marca</InputLabel>
                  <Select
                    label="Marca"
                    value={marca}
                    required
                    onChange={cambio_marca}
                  >
                    <MenuItem key={''} value={''}>
                      {'Seleccionar marca'}
                    </MenuItem>
                    {props.lista_marcas.map((m: any) => (
                      <MenuItem key={m.id_marca} value={m.id_marca}>
                        {m.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Empresa proveedora"
                  helperText=" "
                  size="small"
                  required
                  fullWidth
                  value={proveedor}
                  onChange={cambio_proveedor}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<SearchIcon />}
                  onClick={buscar_arriendo}
                >
                  Buscar
                </Button>
              </Grid>
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
                  <div className="card">
                    <ButtonGroup style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}>
                      {download_xls({
                        nurseries: data_filtrada,
                        columns:columnsss,
                      })}
                      {download_pdf({
                        nurseries: data_filtrada,
                        columns:columnsss,
                        title: 'Resultados',
                      })}
                    </ButtonGroup>
                    <DataTable
                      value={data_filtrada}
                      sortField="nombre"
                      stripedRows
                      paginator
                      rows={10}
                      rowsPerPageOptions={[5, 10, 25, 50]}
                      tableStyle={{ minWidth: '60rem' }}
                      selectionMode="single"
                      selection={seleccion_arriendo}
                      onSelectionChange={(e) => {
                        set_seleccion_arriendo(e.value);
                      }}
                      dataKey="id_vehiculo_arrendado"
                    >
                      <Column
                        field="nombre"
                        header="Nombre"
                        style={{ width: '10%' }}
                      ></Column>
                      <Column
                        field="placa"
                        header="Placa"
                        style={{ width: '5%' }}
                      ></Column>
                      <Column
                        field="empresa_contratista"
                        header="Empresa contratista"
                        style={{ width: '20%' }}
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
          color="inherit"
          variant="contained"
          startIcon={<ClearIcon />}
          onClick={() => {
            props.set_is_modal_active(false);
          }}
        >
          Cancelar
        </Button>
        <Button
          color="primary"
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={seleccionar_arriendo}
        >
          Seleccionar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
// eslint-disable-next-line no-restricted-syntax
export default BuscarArriendoComponent;
