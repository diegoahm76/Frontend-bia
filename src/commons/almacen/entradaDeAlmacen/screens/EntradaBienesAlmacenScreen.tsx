/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormControl, Grid, InputLabel, MenuItem, Select, type SelectChangeEvent, TextField, Box, Button, Stack } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { type Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { Title } from "../../../../components";
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PrintIcon from '@mui/icons-material/Print';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useAppDispatch } from "../../../../hooks";
import { obtener_consecutivo } from "../thunks/Entradas";
import { control_error } from "../../../../helpers";
import { get_tipo_documento } from "../../../../request";

const tipos_entrada = [{ value: "O", label: "óptimo" }, { value: "D", label: "Defectuoso" }, { value: "A", label: "Averiado" }];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EntradaBienesAlmacenScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [user_info, set_user_info ] = useState<any>({});
  const [numero_entrada, set_numero_entrada] = useState<string>("");
  const [fecha_entrada, set_fecha_entrada] = useState<Dayjs | null>(dayjs());
  const [tipo_entrada, set_tipo_entrada] = useState<string>("");
  const [mensaje_error_tipo, set_mensaje_error_tipo] = useState<string>("");
  const [observaciones, set_observaciones] = useState<string | null>("");
  const [motivo, set_motivo] = useState<string | null>("");
  const [tipo_documento, set_tipo_documento] = useState<string>("");
  const [tipos_documentos, set_tipos_documentos] = useState<any>([]);
  const [numero_documento, set_numero_documento] = useState<string>("");
  const [mensaje_error_documento, set_mensaje_error_documento] = useState<string>("");
  const [nombre_proveedor, set_nombre_proveedor] = useState<string>("");

  useEffect(() => {
    void get_list_tipo_doc();
    obtener_usuario();
    obtener_consecutivo_fc();
  }, []);

  const obtener_consecutivo_fc: () => void = () =>{
    dispatch(obtener_consecutivo()).then((response: { success: boolean, numero_entrada: number }) => {
      if (response.success)
        set_numero_entrada(response.numero_entrada.toString());
    })
  }

  const obtener_usuario:() => void = () =>{
    const data = localStorage.getItem('persist:macarenia_app');
    if (data !== null) {
        const data_json = JSON.parse(data);
        const data_auth = JSON.parse(data_json.auth);
        set_user_info(data_auth.userinfo);
    }
  }

  const get_list_tipo_doc = async (): Promise<void> => {
    try {
      const {
        data: { data: res_tipo_documento },
      } = await get_tipo_documento();
      set_tipos_documentos(res_tipo_documento ?? []);
    } catch (err) {
      control_error(err);
    }
  };

  const cambio_tipo_entrada: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_tipo_entrada(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_mensaje_error_tipo("");
  }

  const cambio_fecha_entrada = (date: Dayjs | null): void => {
    set_fecha_entrada(date);
  };

  const cambio_motivo: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_motivo(e.target.value);
  };

  const cambio_observacion: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_observaciones(e.target.value);
  };

  const cambio_tipo_documento: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_tipo_documento(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_mensaje_error_documento("");
  }
  return (
    <>
      <h1>Entrada de bienes de Almacen</h1>
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
        <Grid item md={12} xs={12}>
          <Title title="Entrada" />
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Numero de entrada"
                  type={'number'}
                  size="small"
                  fullWidth
                  value={numero_entrada}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl required size='small' fullWidth>
                  <InputLabel>Tipo de entrada</InputLabel>
                  <Select
                    value={tipo_entrada}
                    label="Tipo de entrada"
                    onChange={cambio_tipo_entrada}
                    error={mensaje_error_tipo !== ""}
                  >
                    {tipos_entrada.map(({ value, label }) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Fecha mantenimiento"
                    value={fecha_entrada}
                    onChange={(newValue) => { cambio_fecha_entrada(newValue); }}
                    renderInput={(params) => (
                      <TextField
                        required
                        fullWidth
                        size="small"
                        {...params}
                      />
                    )}
                    maxDate={dayjs()}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Box>
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  multiline
                  rows={3}
                  value={motivo}
                  label="Motivo"
                  helperText="Ingresar motivo"
                  size="small"
                  fullWidth
                  onChange={cambio_motivo} />
              </Grid>
            </Grid>
          </Box>
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  multiline
                  rows={3}
                  value={observaciones}
                  label="Observaciones"
                  helperText="Ingresar observaciones"
                  size="small"
                  fullWidth
                  onChange={cambio_observacion} />
              </Grid>
            </Grid>
          </Box>
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
        <Grid item md={12} xs={12}>
          <Title title="Proveedor" />
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={3}>
                <FormControl required size='small' fullWidth>
                  <InputLabel>Tipo de documento</InputLabel>
                  <Select
                    value={tipo_documento}
                    label="Tipo de documento"
                    onChange={cambio_tipo_documento}
                    error={mensaje_error_documento !== ""}
                  >
                    {tipos_documentos.map((tipos: any) => (
                      <MenuItem key={tipos.value} value={tipos.value}>
                        {tipos.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Numero documento"
                  type={'text'}
                  size="small"
                  fullWidth
                  value={numero_documento}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Nombre proveedor"
                  type={'text'}
                  size="small"
                  fullWidth
                  value={nombre_proveedor}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
              <Button
                  color='primary'
                  variant='contained'
                  startIcon={<SearchIcon />}
                  onClick={() => { }}
                >
                  Buscar proveedor
                </Button>
              </Grid>
            </Grid>

          </Box>
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FormControl required size='small' fullWidth>
                  <InputLabel>Bodega de ingreso</InputLabel>
                  <Select
                    value={tipo_documento}
                    label="Bodega de ingreso"
                    onChange={cambio_tipo_documento}
                    error={mensaje_error_documento !== ""}
                  >
                    {tipos_entrada.map(({ value, label }) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  color='primary'
                  variant='contained'
                  startIcon={<AttachFileIcon />}
                  onClick={() => { }}
                >
                  Adjuntar
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Elaborado por"
                  type={'text'}
                  size="small"
                  fullWidth
                  value={user_info.nombre}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
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
        <Grid item md={12} xs={12}>
          <Title title="Detalle" />
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={5}>
                <TextField
                  label="Código"
                  type={'number'}
                  size="small"
                  fullWidth
                  value={nombre_proveedor}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  label="Nombre"
                  type={'text'}
                  size="small"
                  fullWidth
                  value={nombre_proveedor}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
              <Button
                  color='primary'
                  variant='contained'
                  startIcon={<SearchIcon />}
                  onClick={() => { }}
                >
                  Buscar articulo
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">

            <Grid item container spacing={2}>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Cantidad"
                  type={'number'}
                  size="small"
                  fullWidth
                  value={nombre_proveedor}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Valor unidad"
                  type={'number'}
                  size="small"
                  fullWidth
                  value={nombre_proveedor}
                />
              </Grid>
              <Grid item xs={12} sm={1}>
                <TextField
                  label="% Iva"
                  type={'number'}
                  size="small"
                  fullWidth
                  value={nombre_proveedor}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Valor iva"
                  type={'number'}
                  size="small"
                  fullWidth
                  value={nombre_proveedor}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Valor total item"
                  type={'number'}
                  size="small"
                  fullWidth
                  value={nombre_proveedor}
                />
              </Grid>
            </Grid>
          </Box>
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl required size='small' fullWidth>
                  <InputLabel>Bodega</InputLabel>
                  <Select
                    value={tipo_documento}
                    label="Bodega"
                    onChange={cambio_tipo_documento}
                    error={mensaje_error_documento !== ""}
                  >
                    {tipos_entrada.map(({ value, label }) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Valor total entrada"
                  type={'number'}
                  size="small"
                  fullWidth
                  value={nombre_proveedor}
                />
              </Grid>
            </Grid>
          </Box>
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ mt: '20px' }}
          >
            <Button
              color='primary'
              variant='contained'
              onClick={() => { }}
            >
              Agregar
            </Button>
          </Stack>
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
        <Grid item md={12} xs={12}>
          <Title title="Entradas" />
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={12}>
                <div className="card">
                  <DataTable
                    value={[{ codigo: '10011111', nombre: 'Articulo nivel 5', cantidad: 1, valor_total: 50000 }]}
                    sortField="nombre"
                    stripedRows
                    paginator
                    rows={5}
                    scrollable scrollHeight="flex"
                    tableStyle={{ minWidth: '85rem' }}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    dataKey="id_programacion_mantenimiento"
                  >
                    <Column
                      field="codigo"
                      header="Código"
                      style={{ width: '20%' }}
                    ></Column>
                    <Column
                      field="nombre"
                      header="Nombre"
                      style={{ width: '40%' }}
                    ></Column>
                    <Column
                      field="cantidad"
                      header="Cantidad"
                      style={{ width: '10%' }}
                    ></Column>
                    <Column
                      field="valor_total"
                      header="Valor total"
                      style={{ width: '20%' }}
                    ></Column>
                    <Column header="Acciones" align={'center'} body={(rowData) => {
                      return <Button color="error" size="small" variant='contained' onClick={() => { console.log(rowData); }}><DeleteForeverIcon fontSize="small" /></Button>;
                    }}></Column>
                  </DataTable>
                </div>
              </Grid>
            </Grid>

          </Box>

        </Grid>

      </Grid>
      <Grid item xs={6}>
        <Box
          component="form"
          sx={{ mt: '20px', mb: '20px' }}
          noValidate
          autoComplete="off"
        >
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ mt: '20px' }}
          >
            <Button
              color='primary'
              variant='contained'
              startIcon={<SaveIcon />}
              onClick={() => { }}
            >
              Guardar
            </Button>
            <Button
              color='error'
              variant='contained'
              startIcon={<DeleteForeverIcon />}
              onClick={() => { }}
              disabled={false}
            >
              Anular
            </Button>
            <Button
              color='inherit'
              variant="contained"
              startIcon={<CleanIcon />}
              onClick={() => { }}
            >
              Limpiar
            </Button>
            <Button
              color='secondary'
              variant='contained'
              startIcon={<SearchIcon />}
              onClick={() => { }}
            >
              Buscar
            </Button>
            <Button
              color='secondary'
              variant='contained'
              startIcon={<PrintIcon />}
              onClick={() => { }}
            >
              Imprimir
            </Button>
            <Button
              color='error'
              variant='contained'
              startIcon={<ClearIcon />}
              onClick={() => { }}
            >
              Salir
            </Button>
          </Stack>
        </Box>
      </Grid>
    </>
  );
}
