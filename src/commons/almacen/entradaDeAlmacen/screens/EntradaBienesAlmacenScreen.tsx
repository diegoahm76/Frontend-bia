/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormControl, Grid, InputLabel, MenuItem, Select, type SelectChangeEvent, TextField, Box, Button, Stack, FormHelperText } from "@mui/material";
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
import { crear_entrada_bien, obtener_articulo_codigo, obtener_bodegas, obtener_consecutivo, obtener_tipos_entrada } from "../thunks/Entradas";
import { control_error } from "../../../../helpers";
import { get_tipo_documento } from "../../../../request";
import { useDropzone } from "react-dropzone";
import { BusquedaArticulos } from "../../../../components/BusquedaArticulos";
import AnularEntradaComponent from "./AnularEntrada";
import EntradaArticuloFijoComponent from "./EntradaArticuloFijo";
import { type IInfoEntrada, type crear_entrada, type IInfoItemEntrada } from "../interfaces/entradas";
import { BuscadorPersonaDialog } from "../../gestionDeInventario/gestionHojaDeVida/mantenimiento/components/RegistroMantenimiento/RegistroMantenimientoGeneral/BuscadorPersonaDialog";
import { v4 as uuid } from "uuid";
import BuscarEntradasComponent from "./BuscarEntradas";
// eslint-disable-next-line @typescript-eslint/naming-convention
export const EntradaBienesAlmacenScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [entradas, set_entradas] = useState<crear_entrada>();
  const [info_items, set_info_items] = useState<IInfoItemEntrada[]>([]);
  const [user_info, set_user_info] = useState<any>({});
  const [detalles_entrada, set_detalles_entrada] = useState<any[]>([]);
  // const [previsualizacion, set_previsualizacion] = useState<any[]>([]);
  const [articulo, set_articulo] = useState<any>({codigo_bien: ""});
  const [buscar_articulo, set_buscar_articulo] = useState<any>(null);
  const [msj_error_articulo, set_msj_error_articulo] = useState<string>("");
  const [codigo_articulo, set_codigo_articulo] = useState<string | number>("");
  const [numero_entrada, set_numero_entrada] = useState<number>(0);
  const [fecha_entrada, set_fecha_entrada] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_entrada, set_msj_error_fecha_entrada] = useState<string>("");
  const [tipo_entrada, set_tipo_entrada] = useState<string>("");
  const [msj_error_tipo, set_msj_error_tipo] = useState<string>("");
  const [tipos_entrada, set_tipos_entrada] = useState<any>([]);
  const [observaciones, set_observaciones] = useState<string | null>("");
  const [motivo, set_motivo] = useState<string>("");
  const [msj_error_motivo, set_msj_error_motivo] = useState<string>("");
  const [tipos_documentos, set_tipos_documentos] = useState<any>([]);
  const [proveedor, set_proveedor] = useState<any>({nombre: ""});
  const [msj_error_proveedor, set_msj_error_proveedor] = useState<string>("");
  const [tipo_documento, set_tipo_documento] = useState<string>("");
  const [msj_error_tdoc, set_msj_error_tdoc] = useState<string>("");
  const [numero_documento, set_numero_documento] = useState<string>("");
  const [bodegas, set_bodegas] = useState<any>([]);
  const [bodega_ingreso, set_bodega_ingreso] = useState<string>("22");
  const [bodega_detalle, set_bodega_detalle] = useState<string>("22");
  const [msj_error_bd, set_msj_error_bd] = useState<string>("");
  const [cantidad, set_cantidad] = useState<string>("");
  const [msj_error_cantidad, set_msj_error_cantidad] = useState<string>("");
  const [valor_unidad, set_valor_unidad] = useState<string>("");
  const [msj_error_vu, set_msj_error_vu] = useState<string>("");
  const [valor_iva, set_valor_iva] = useState<string>("");
  const [valor_total_item, set_valor_total_item] = useState<string>("");
  const [valor_total_entrada, set_valor_total_entrada] = useState<number>(0);
  const [buscar_articulo_is_active, set_buscar_articulo_is_active] = useState<boolean>(false);
  const [anular_entrada_is_active, set_anular_entrada_is_active] = useState<boolean>(false);
  const [entrada_af_is_active, set_entrada_af_is_active] = useState<boolean>(false);
  const [file, set_file] = useState<any>(null);
  const [abrir_modal_proveedor, set_abrir_modal_proveedor] = useState<boolean>(false);
  const [buscar_entrada_is_active, set_buscar_entrada_is_active] = useState<boolean>(false);


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
        set_numero_entrada(response.numero_entrada);
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
      set_msj_error_tipo("");
  }

  const cambio_bodega_ingreso: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_bodega_ingreso(e.target.value);
  }

  const cambio_bodega_detalle: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_bodega_detalle(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_bd("");
  }

  const cambio_fecha_entrada = (date: Dayjs | null): void => {
    if(date !== null){
      set_fecha_entrada(date); 
      set_msj_error_fecha_entrada("");
    }else{
      set_msj_error_fecha_entrada("El campo fecha entrada es obligatorio.");
    }
  };

  const cambio_motivo: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_motivo(e.target.value);
  };

  const buscar_x_codigo: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== null && e.target.value !== undefined) {
      set_codigo_articulo(parseInt(e.target.value));
      dispatch(obtener_articulo_codigo(e.target.value)).then((response: {success: boolean,detail: string, data: any}) => {
        if(response.success){
          set_articulo(response.data);
        }
      }).catch((error: any) => {
        control_error(error);
      })
    }
  };

  const cambio_observacion: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_observaciones(e.target.value);
  };
  const cambio_cantidad: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(parseInt(e.target.value) > 0){
      set_cantidad(e.target.value);
      set_msj_error_cantidad("");
    }else{
      set_msj_error_cantidad("El campo Cantidad no puede ser menor a 1.");
    }
  };
  const cambio_valor_unidad: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(parseInt(e.target.value) >= 0){
      set_valor_unidad(e.target.value);
      set_msj_error_vu("");
    }else{
      set_msj_error_vu("El campo Valor unidad no puede ser menor a 0.");
    }
  };

  const cambio_tipo_documento: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_tipo_documento(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_tdoc("");
  }

  const calcular_totales = (): void => {
      const total_iva = ((parseInt(valor_unidad) * (articulo.porcentaje_iva/100)));
      const total_unidad = parseInt(valor_unidad) + total_iva;
      const total_entrada = total_unidad * parseInt(cantidad);
      set_valor_iva(total_iva.toString());
      set_valor_total_item(total_unidad.toString());
      set_valor_total_entrada(total_entrada);
  }

  const validar_entrada = (): void => {
    if(validar_formulario()){
      articulo.cod_tipo_bien === "A" ? set_entrada_af_is_active(true) : carga_info_items();
    }
  }

  const cargar_entradas = (): void => {
    const encabezado: IInfoEntrada = {
      id_entrada_almacen: numero_entrada,
      fecha_entrada: fecha_entrada.format("YYYY-MM-DD"), 
      motivo, 
      observacion: observaciones, 
      id_proveedor: proveedor.id_persona, 
      id_tipo_entrada: parseInt(tipo_entrada),  
      id_bodega: parseInt(bodega_ingreso), 
      valor_total_entrada
    };
    set_entradas({...entradas, info_entrada: encabezado,info_items_entrada: info_items});
  }

  const carga_info_items = (): void => {
    if(detalles_entrada.length > 0){
      detalles_entrada.forEach((info_item: any) => {
        set_info_items(prevArray => [...prevArray, {
          id_entrada_local: String(uuid()),
          id_item_entrada_almacen: null,
          id_entrada_almacen: numero_entrada,
          id_bien: articulo.id_bien,
          codigo: articulo.codigo_bien,
          nombre: articulo.nombre,
          cantidad: 1,
          id_bodega: parseInt(bodega_detalle),
          numero_posicion: 0,
          porcentaje_iva: articulo.porcentaje_iva,
          id_bien_padre: articulo.id_bien_padre,
          valor_unitario: parseFloat(valor_unidad),
          valor_residual: info_item.valor_residual,
          valor_iva: parseFloat(valor_iva),
          valor_total_item: parseFloat(valor_total_item)
        }])
      });
    }else{
      set_info_items(prevArray => [...prevArray, {
        id_entrada_local: String(uuid()),
        id_item_entrada_almacen: null,
        id_entrada_almacen: numero_entrada,
        id_bien: articulo.id_bien,
        codigo: articulo.codigo_bien,
        nombre: articulo.nombre,
        cantidad: parseInt(cantidad),
        id_bodega: parseInt(bodega_detalle),
        numero_posicion: 0,
        porcentaje_iva: articulo.porcentaje_iva,
        id_bien_padre: articulo.id_bien_padre,
        valor_unitario: parseFloat(valor_unidad),
        valor_residual: null,
        valor_iva: parseFloat(valor_iva),
        valor_total_item: parseFloat(valor_total_item)
      }])
    }
    set_detalles_entrada([]);
  }
  
  const validar_formulario = (): boolean =>{
    if(tipo_entrada === "")
      set_msj_error_tipo("El campo Tipo de entrada es obligatorio.")
    if(motivo === "")
      set_msj_error_motivo("El campo Motivo es obligatorio.")
    if(proveedor.tipo_documento === undefined || tipo_documento === undefined || tipo_documento === "")
      set_msj_error_tdoc("El campo Tipo de documento es obligatorio.");
    if(proveedor.nombre_completo === undefined || proveedor.nombre_completo === "")
      set_msj_error_proveedor("El campo Nombre proveedor es obligatorio.");
    if(articulo.nombre === undefined || articulo.nombre === "")
      set_msj_error_articulo("El campo Nombre articulo es obligatorio.");
    if(cantidad === "")
      set_msj_error_cantidad("El campo Cantidad es obligatorio.");
    if(valor_unidad === "")
      set_msj_error_vu("El campo Cantidad es obligatorio.");

    return (msj_error_fecha_entrada === "" && msj_error_tipo === "" && msj_error_motivo === "" && msj_error_tdoc === ""
            && msj_error_proveedor === "" && msj_error_bd === "" && msj_error_cantidad === "" && msj_error_vu === "" && msj_error_articulo === "" && msj_error_proveedor === "");
  }

  const guardar_entrada = (): void => {
    cargar_entradas();
  }

  useEffect(() => {
    if(entradas !== undefined)
      dispatch(crear_entrada_bien(entradas)).then((response: any) =>{
        console.log("Se creo una entrada: ",response);
      });
  }, [entradas]);

  useEffect(() => {
    if(cantidad !== "" && valor_unidad !== ""){
      calcular_totales();
    }else{
      set_valor_iva("");
      set_valor_total_item("");
      set_valor_total_entrada(0);
    }
  },[cantidad,valor_unidad]);

  useEffect(() => {
    articulo ?? set_codigo_articulo(articulo.codigo_bien);
    set_msj_error_articulo("");
  },[articulo]);

  useEffect(() => {
    if(detalles_entrada.length > 0){
      carga_info_items();
    }
  },[detalles_entrada]);

  useEffect(() => {
    if(proveedor !== null){
      set_tipo_documento(proveedor.tipo_documento);
      set_numero_documento(proveedor.numero_documento);
      set_msj_error_proveedor("");
      set_msj_error_tdoc("");
    }
  },[proveedor]);

  useEffect(() => {
    buscar_articulo === null ? set_buscar_articulo(null) : set_buscar_articulo(buscar_articulo);
  }, [buscar_articulo]);

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
                    error={msj_error_tipo !== ""}
                  >
                    {tipos_entrada.map((te: any) => (
                      <MenuItem key={te.cod_tipo_entrada} value={te.cod_tipo_entrada}>
                        {te.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {(msj_error_tipo !== "") && (<FormHelperText error >{msj_error_tipo}</FormHelperText>)}
              </Grid>
              <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Fecha entrada"
                    value={fecha_entrada}
                    onChange={(newValue) => { cambio_fecha_entrada(newValue); }}
                    renderInput={(params) => (
                      <TextField
                        required
                        fullWidth
                        size="small"
                        {...params}
                        error={msj_error_fecha_entrada !== ""}
                      />
                    )}
                    maxDate={dayjs()}
                  />
                </LocalizationProvider>
                {(msj_error_fecha_entrada !== "") && (<FormHelperText error >{msj_error_fecha_entrada}</FormHelperText>)}
              </Grid>
            </Grid>
          </Box>
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  multiline
                  rows={2}
                  value={motivo}
                  label="Motivo"
                  size="small"
                  fullWidth
                  onChange={cambio_motivo} 
                  error={msj_error_motivo !== ""}/>
              {(msj_error_motivo !== "") && (<FormHelperText error >{msj_error_motivo}</FormHelperText>)}
              </Grid>
            </Grid>
          </Box>
          <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  multiline
                  rows={2}
                  value={observaciones}
                  label="Observaciones"
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
                    value={proveedor.tipo_documento ?? ""}
                    label="Tipo de documento"
                    onChange={cambio_tipo_documento}
                    error={msj_error_tdoc !== ""}
                  >
                    {tipos_documentos.map((tipos: any) => (
                      <MenuItem key={tipos.value} value={tipos.value}>
                        {tipos.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {(msj_error_tdoc !== "") && (<FormHelperText error >{msj_error_tdoc}</FormHelperText>)}
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Numero documento"
                  type={'text'}
                  size="small"
                  fullWidth
                  value={proveedor.numero_documento ?? ""}
                  error={msj_error_proveedor !== ""}
                />
                {(msj_error_proveedor !== "") && (<FormHelperText error >El campo Numero documento es obligatorio.</FormHelperText>)}
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Nombre proveedor"
                  type={'text'}
                  size="small"
                  fullWidth
                  value={proveedor.nombre_completo ?? ""}
                  error={msj_error_proveedor !== ""}
                />
                {(msj_error_proveedor !== "") && (<FormHelperText error >{msj_error_proveedor}</FormHelperText>)}
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  color='primary'
                  variant='contained'
                  startIcon={<SearchIcon />}
                  onClick={() => { set_abrir_modal_proveedor(true); }}
                >
                  Buscar proveedor
                </Button>
                {abrir_modal_proveedor && (
                    <BuscadorPersonaDialog
                        is_modal_active={abrir_modal_proveedor}
                        set_is_modal_active={set_abrir_modal_proveedor}
                        title={"Busqueda de proveedor"}
                        set_persona={set_proveedor} />
                )}
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
                  value={articulo.codigo_bien ?? ""}
                  onBlur={buscar_x_codigo}
                  error={msj_error_articulo !== ""}
                />
                {(msj_error_articulo !== "") && (<FormHelperText error >El campo Código es obligatorio.</FormHelperText>)}
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  label="Nombre"
                  type={'text'}
                  size="small"
                  fullWidth
                  value={articulo.nombre ?? ""}
                  error={msj_error_articulo !== ""}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                {(msj_error_articulo !== "") && (<FormHelperText error >{msj_error_articulo}</FormHelperText>)}
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
                  value={cantidad}
                  onChange={cambio_cantidad}
                  error={msj_error_cantidad !== ""}
                />
                {(msj_error_cantidad !== "") && (<FormHelperText error >{msj_error_cantidad}</FormHelperText>)}
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Valor unidad"
                  type={'number'}
                  size="small"
                  fullWidth
                  value={valor_unidad}
                  onChange={cambio_valor_unidad}
                  error={msj_error_vu !== ""}
                />
                {(msj_error_vu !== "") && (<FormHelperText error >{msj_error_vu}</FormHelperText>)}
              </Grid>
              <Grid item xs={12} sm={1}>
                <TextField
                  label="% Iva"
                  type={'number'}
                  size="small"
                  fullWidth
                  value={articulo.porcentaje_iva ?? ""}
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
                  value={valor_iva}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Valor total item"
                  type={'number'}
                  size="small"
                  fullWidth
                  value={valor_total_item}
                  InputProps={{
                    readOnly: true,
                  }}
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
                    error={msj_error_bd !== ""}
                  >
                    {bodegas.map((bg: any) => (
                      <MenuItem key={bg.id_bodega} value={bg.id_bodega}>
                        {bg.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {(msj_error_bd !== "") && (<FormHelperText error >{msj_error_bd}</FormHelperText>)}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Valor total entrada"
                  type={'number'}
                  size="small"
                  fullWidth
                  value={valor_total_entrada}
                  InputProps={{
                    readOnly: true,
                  }}
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
              onClick={validar_entrada}
            >
              Agregar
            </Button>
            {entrada_af_is_active && (
                  <EntradaArticuloFijoComponent
                is_modal_active={entrada_af_is_active}
                set_is_modal_active={set_entrada_af_is_active}
                articulo_entrada={articulo}
                cantidad_entrada={parseInt(cantidad)} detalles_entrada={set_detalles_entrada}/>
                )}
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
                    value={info_items}
                    sortField="nombre"
                    stripedRows
                    paginator
                    rows={5}
                    scrollable scrollHeight="flex"
                    tableStyle={{ minWidth: '85rem' }}
                    rowsPerPageOptions={[5, 10, 25, 50]}
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
                    {/* <Column header="Acciones" align={'center'} body={(rowData) => {
                      return <Button color="error" size="small" variant='contained' onClick={() => { console.log(rowData); }}><DeleteForeverIcon fontSize="small" /></Button>;
                    }}></Column> */}
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
              onClick={guardar_entrada}
            >
              Guardar
            </Button>
            <Button
              color='error'
              variant='contained'
              startIcon={<DeleteForeverIcon />}
              onClick={() => { set_anular_entrada_is_active(true) }}
              disabled={false}
            >
              Anular
            </Button>
            <AnularEntradaComponent is_modal_active={anular_entrada_is_active}
              set_is_modal_active={set_anular_entrada_is_active}
              title={"Anular entrada"} user_info={user_info} id_entrada={0}></AnularEntradaComponent>
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
              onClick={() => { set_buscar_entrada_is_active(true) }}
            >
              Buscar
            </Button>
            <BuscarEntradasComponent is_modal_active={buscar_entrada_is_active}
            set_is_modal_active={set_buscar_entrada_is_active}
            title={"Buscar entrada"} 
            tipos_entrada={tipos_entrada} 
            set_articulo={set_buscar_articulo} 
            set_entrada={set_entradas}></BuscarEntradasComponent>
            <Button
              color='secondary'
              variant='contained'
              startIcon={<PrintIcon />}
              onClick={() => { window.print() }}
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
