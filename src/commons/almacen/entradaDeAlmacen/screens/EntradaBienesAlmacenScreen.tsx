/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormControl, Grid, InputLabel, MenuItem, Select, type SelectChangeEvent, TextField, Box, Button, Stack, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { type Dayjs } from "dayjs";
import { useCallback, useEffect, useState } from "react";
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
import { obtener_bodegas, obtener_consecutivo, obtener_tipos_entrada } from "../thunks/Entradas";
import { control_error } from "../../../../helpers";
import { get_tipo_documento } from "../../../../request";
import { useDropzone } from "react-dropzone";
import { BusquedaArticulos } from "../../../../components/BusquedaArticulos";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EntradaBienesAlmacenScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [user_info, set_user_info] = useState<any>({});
  const [articulo, set_articulo] = useState<any>({});
  const [nombre_articulo, set_nombre_articulo] = useState<string>("");
  const [codigo_articulo, set_codigo_articulo] = useState<string>("");
  const [numero_entrada, set_numero_entrada] = useState<string>("");
  const [fecha_entrada, set_fecha_entrada] = useState<Dayjs | null>(dayjs());
  const [tipo_entrada, set_tipo_entrada] = useState<string>("");
  const [tipos_entrada, set_tipos_entrada] = useState<any>([]);
  const [mensaje_error_tipo, set_mensaje_error_tipo] = useState<string>("");
  const [observaciones, set_observaciones] = useState<string | null>("");
  const [motivo, set_motivo] = useState<string | null>("");
  const [tipo_documento, set_tipo_documento] = useState<string>("");
  const [tipos_documentos, set_tipos_documentos] = useState<any>([]);
  const [numero_documento, set_numero_documento] = useState<string>("");
  const [mensaje_error_documento, set_mensaje_error_documento] = useState<string>("");
  const [nombre_proveedor, set_nombre_proveedor] = useState<string>("");
  const [bodegas, set_bodegas] = useState<any>([]);
  const [bodega_ingreso, set_bodega_ingreso] = useState<string>("");
  const [mensaje_error_bodega, set_mensaje_error_bodega] = useState<string>("");
  const [bodega_detalle, set_bodega_detalle] = useState<string>("");
  const [mensaje_error_bodega_detalle, set_mensaje_error_bodega_detalle] = useState<string>("");
  const [buscar_articulo_is_active, set_buscar_articulo_is_active] = useState<boolean>(false);
  const [file, set_file] = useState<any>(null);

  useEffect(() => {
    void get_list_tipo_doc();
    void obtener_tipos_entrada_fc();
    obtener_bodegas_fc();
    obtener_usuario();
    obtener_consecutivo_fc();
  }, []);

  const obtener_tipos_entrada_fc = async (): Promise<void> => {
    try {
      const { data: { data: response } } = await obtener_tipos_entrada();
      set_tipos_entrada(response ?? []);
    } catch (err) {
      control_error(err);
    }
  };

  const obtener_bodegas_fc: () => void = () => {
    dispatch(obtener_bodegas()).then((response: any) => {
      set_bodegas(response);
    })
  }

  const obtener_consecutivo_fc: () => void = () => {
    dispatch(obtener_consecutivo()).then((response: { success: boolean, numero_entrada: number }) => {
      if (response.success)
        set_numero_entrada(response.numero_entrada.toString());
    })
  }

  const obtener_usuario: () => void = () => {
    const data = localStorage.getItem('persist:macarenia_app');
    if (data !== null) {
      const data_json = JSON.parse(data);
      const data_auth = JSON.parse(data_json.auth);
      set_user_info(data_auth.userinfo);
    }
  }

  const get_list_tipo_doc = async (): Promise<void> => {
    try {
      const { data: { data: res_tipo_documento } } = await get_tipo_documento();
      set_tipos_documentos(res_tipo_documento ?? []);
    } catch (err) {
      control_error(err);
    }
  };

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const onDrop = useCallback((acceptedFiles: any) => {
    set_file(acceptedFiles[0]);
  }, [])
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { getInputProps, getRootProps } = useDropzone({ onDrop });


  const cambio_tipo_entrada: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_tipo_entrada(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_mensaje_error_tipo("");
  }

  const cambio_bodega_ingreso: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_bodega_ingreso(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_mensaje_error_bodega("");
  }

  const cambio_bodega_detalle: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_bodega_detalle(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_mensaje_error_bodega_detalle("");
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

  useEffect(()=>{
    if(articulo !== null || articulo !== undefined){
      set_codigo_articulo(articulo.codigo_bien);
      set_nombre_articulo(articulo.nombre);
    }
  },[articulo])

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
                    {tipos_entrada.map((te: any) => (
                      <MenuItem key={te.cod_tipo_entrada} value={te.cod_tipo_entrada}>
                        {te.nombre}
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
                    value={bodega_ingreso}
                    label="Bodega de ingreso"
                    onChange={cambio_bodega_ingreso}
                    error={mensaje_error_bodega !== ""}
                  >
                    {bodegas.map((bg: any) => (
                      <MenuItem key={bg.id_bodega} value={bg.id_bodega}>
                        {bg.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Archivo"
                  type={'text'}
                  size="small"
                  fullWidth
                  value={file === null ? "" : file.name}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Button
                    color='primary'
                    variant='contained'
                    startIcon={<AttachFileIcon />}
                  >
                    Adjuntar
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12} sm={4}>
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
                  value={codigo_articulo}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  label="Nombre"
                  type={'text'}
                  size="small"
                  fullWidth
                  value={nombre_articulo}
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
                  onClick={() => { set_buscar_articulo_is_active(true) }}
                >
                  Buscar articulo
                </Button>
                {buscar_articulo_is_active && (
                                <BusquedaArticulos
                                    is_modal_active={buscar_articulo_is_active}
                                    set_is_modal_active={set_buscar_articulo_is_active}
                                    articulo={set_articulo} />
                            )}
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
                    value={bodega_detalle}
                    label="Bodega"
                    onChange={cambio_bodega_detalle}
                    error={mensaje_error_bodega_detalle !== ""}
                  >
                    {bodegas.map((bg: any) => (
                      <MenuItem key={bg.id_bodega} value={bg.id_bodega}>
                        {bg.nombre}
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
