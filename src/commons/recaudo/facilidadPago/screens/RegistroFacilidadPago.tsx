/* eslint-disable @typescript-eslint/naming-convention */
import { Title } from '../../../../components/Title';
import { EncabezadoRegistro } from '../componentes/EncabezadoRegistro';
import { TablaObligacionesRegistro } from '../componentes/TablaObligacionesRegistro';
import { DialogoRegistro } from '../componentes/DialogoRegistro';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Grid, Box, FormControl, InputLabel, Select, MenuItem, TextField, Stack, Button, Checkbox, FormGroup, FormControlLabel, Tooltip, IconButton } from "@mui/material";
import { Save, CloudUpload, Delete } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { use_form } from '../../../../hooks/useForm';
import { useFormFiles } from '../hooks/useFormFiles';
import { faker } from '@faker-js/faker';
import { type event, type check, type Deudor, type Obligacion, type Contacto } from '../interfaces/interfaces';
import { post_registro_fac_pago, get_tipo_bienes, get_roles_garantia } from '../requests/requests';
import esLocale from 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { control_error } from '../../../../helpers';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

interface RootStateDeudor {
  deudores: {
    deudores: Deudor;
  }
}

interface RootStateObligaciones {
  obligaciones: {
    obligaciones: Obligacion[];
  }
}

interface RootStateSolicitud {
  solicitud_facilidad: {
    solicitud_facilidad: Contacto;
  }
}

interface BienInput {
  id: number;
  descripcion: string;
  vigencia_avaluo: number;
}

interface GarantiaInput {
  id: number;
  descripcion: string;
}

interface RelacionBien {
  id: string;
  id_tipo_bien: number;
  valor: number;
  direccion: string;
  descripcion: string;
}

interface RespuestaRegistroFacilidad {
  numero_radicacion: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegistroFacilidadPago: React.FC = () => {
  const [persona, set_persona] = useState(0);
  const [num_periodicidad, set_num_periodicidad] = useState(0);
  const [periodicidad, set_periodicidad] = useState('');
  const [limite, set_limite] = useState(0);
  const [arr_periodicidad, set_arr_periodicidad] = useState(Array<number>);
  const [plazo, set_plazo] = useState(0);
  const [date_abono, set_date_abono] = useState<Date | null>(new Date());
  const [autorizacion_notificacion, set_autorizacion_notificacion] = useState(false);
  const [obligaciones_ids, set_obligaciones_ids] = useState(Array<number>);
  const [bienes_options, set_bienes_options] = useState<BienInput[]>([]);
  const [garantias_options, set_garantias_options] = useState<GarantiaInput[]>([]);
  const [rows_bienes, set_rows_bienes] = useState(Array<RelacionBien>);

  console.log("rows_bienes", rows_bienes);

  const [tipo_bien, set_tipo_bien] = useState(0);
  const [tipos_bienes, set_tipos_bienes] = useState(Array<number>);
  const [identificacion_bien, set_identificacion_bien] = useState('');
  const [identificaciones_bienes, set_identificaciones_bienes] = useState(Array<string>);
  const [direccion_bien, set_direccion_bien] = useState('');
  const [direcciones_bienes, set_direcciones_bienes] = useState(Array<string>);
  const [valor_bien, set_valor_bien] = useState(0);
  const [valores_bienes, set_valores_bienes] = useState(Array<number>);
  const [archivos_bienes, set_archivos_bienes] = useState(Array<File>);
  const [archivo_bien, set_archivo_bien] = useState<File | null>(null);
  const [nombre_archivo_bien, set_nombre_archivo_bien] = useState('');
  const [ubicaciones_bienes, set_ubicaciones_bienes] = useState(Array<number>);
  const [respuesta_registro, set_respuesta_registro] = useState<RespuestaRegistroFacilidad>();
  const [modal, set_modal] = useState(false);
  const { form_state, on_input_change } = use_form({});
  
  const { form_files, name_files, handle_change_file, handle_delete_file } = useFormFiles({});
  const { deudores } = useSelector((state: RootStateDeudor) => state.deudores);
  const { obligaciones } = useSelector((state: RootStateObligaciones) => state.obligaciones);
  const { solicitud_facilidad } = useSelector((state: RootStateSolicitud) => state.solicitud_facilidad);

  const handle_change_date_abono = (date: Date | null): void => {
    set_date_abono(date);
  };

  const handle_file_bienes = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selected_file = event.target.files != null ? event.target.files[0] : null;
    set_archivo_bien(selected_file);
    set_nombre_archivo_bien(selected_file ? selected_file.name : '');
  };

  const eliminarArchivoSeleccionado = () => {
    set_archivo_bien(null); // Restablece el archivo a null
    set_nombre_archivo_bien(''); // Restablece el nombre del archivo a una cadena vacía
  };
  useEffect(() => {
    if (respuesta_registro !== undefined) {
      set_modal(true)
    }
  }, [respuesta_registro])

  useEffect(() => {
    const arr_ids = [];
    for (let i = 0; i < obligaciones.length; i++) {
      arr_ids.push(obligaciones[i].id);
    }
    set_obligaciones_ids(arr_ids);
  }, [obligaciones])

  const handle_close = (): void => { set_modal(false) };

  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const get_lista_bienes = async (): Promise<void> => {
    try {
      const { data: { data: res_bienes } } = await get_tipo_bienes();
      set_bienes_options(res_bienes ?? []);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const get_lista_garantias = async (): Promise<void> => {
    try {
      const { data: { data: res_garantias } } = await get_roles_garantia();
      set_garantias_options(res_garantias ?? []);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    void get_lista_bienes();
    void get_lista_garantias();
  }, [])

  useEffect(() => {
    let count: number = 0;
    const arr: number[] = []
    for (let i = 0; i < limite; i++) {
      count = count + 1
      arr.push(count)
    }
    set_arr_periodicidad(arr);
  }, [limite])



  const columns_bienes: GridColDef[] = [
    {
      field: 'id_tipo_bien',
      headerName: 'Tipo Bien',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'descripcion',
      headerName: 'Identificación',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'valor',
      headerName: 'Avalúo',
      width: 150,
      renderCell: (params) => {
        const precio_cop = new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "COP",
        }).format(params.value)
        return (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {precio_cop}
          </div>
        )
      },
    },
    {
      field: 'direccion',
      headerName: 'Dirección',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];
  const [totalSum, setTotalSum] = useState<number>(0);
  console.log("totalSum", totalSum)
  const updateTotalSum = (sum: number) => {
    setTotalSum(sum);
  };
  return (
    <>
      <Title title='Solicitud de Facilidad de Pago - Usuario Externo' />
      <EncabezadoRegistro />
      <TablaObligacionesRegistro updateTotalSum={updateTotalSum} />
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          mb: '20px',
          mt: '20px',
          p: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={16}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={11} sm={5}>
                <Tooltip title={`Carga Documento Solicitud`}>
                  <Button
                    variant="outlined"
                    fullWidth
                    size='medium'
                    component="label"
                    startIcon={<CloudUpload />}
                  >
                    {name_files.documento_soporte !== undefined ? name_files.documento_soporte : 'Carga Documento Solicitud'}
                    <input
                      hidden
                      type="file"
                      required
                      autoFocus
                      style={{ opacity: 0 }}
                      name='documento_soporte'
                      onChange={handle_change_file}
                    />
                  </Button>
                </Tooltip>
              </Grid>

              {name_files.documento_soporte && (
                <Tooltip title={`Eliminar Documento Solicitud`}>
                  <Grid item>
                    <IconButton
                      color="error"
                      onClick={() => handle_delete_file('documento_soporte')}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Tooltip>
              )}

              <Grid item xs={11} sm={5}>
                <Tooltip title={`Carga Soporte Consignación`}>
                  <Button
                    variant="outlined"
                    fullWidth
                    size='medium'
                    component="label"
                    startIcon={<CloudUpload />}
                  >
                    {name_files.consignacion_soporte !== undefined ? name_files.consignacion_soporte : 'Carga Soporte Consignación'}
                    <input
                      hidden
                      type="file"
                      required
                      autoFocus
                      style={{ opacity: 0 }}
                      name='consignacion_soporte'
                      onChange={handle_change_file}
                    />
                  </Button>
                </Tooltip>
              </Grid>

              {name_files.consignacion_soporte && (
                <Tooltip title={`Eliminar Soporte Consignación`}>
                  <Grid item>
                    <IconButton
                      color="error"
                      onClick={() => handle_delete_file('consignacion_soporte')}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Tooltip>
              )}
              <Grid item xs={11} sm={5}>
                <FormControl size='small' fullWidth>
                  <InputLabel>Calidad en que actúa la persona</InputLabel>
                  <Select
                    label="Calidad en que actúa la persona"
                    defaultValue={""}
                    onChange={(event: event) => {
                      const { value } = event.target
                      set_persona(parseInt(value))
                    }}
                  >
                    <MenuItem value='1'>Persona Natural</MenuItem>
                    <MenuItem value='2'>Persona Juridica / Apoderado</MenuItem>
                    <MenuItem value='3'>Deudor Solidario Natural</MenuItem>
                    <MenuItem value='4'>Deudor Solidario Juridico</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={11} sm={5}>
                <TextField
                  required
                  label="Valor Abonado"
                  helperText='Escribe el Valor Abonado'
                  size="small"
                  fullWidth
                  onChange={on_input_change}
                  name='valor_abonado'
                  type='number'
                />
              </Grid>
              <Grid item xs={11} sm={5}>
                <FormControl size='small' fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={esLocale}>
                    <DatePicker
                      label="Fecha del Abono"
                      inputFormat="DD/MM/YYYY"
                      openTo="day"
                      views={['day', 'month', 'year']}
                      value={date_abono}
                      onChange={handle_change_date_abono}
                      renderInput={(params) => (
                        <TextField
                          name='fecha_abono'
                          size='small'
                          required
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {
        persona === 1 ? (
          <>
            <Grid
              container
              sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                mb: '20px',
                mt: '20px',
                p: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
              }}
            >
              <h3>Caso Persona Natural</h3>
              <Grid item xs={12}>
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                >
                  <Grid container spacing={2}>
                    <Grid item xs={11} sm={5}>
                      <Tooltip title={`Carga Documento de Identidad`}>

                        <Button
                          variant="outlined"
                          fullWidth
                          size='medium'
                          component="label"
                          startIcon={<CloudUpload />}
                        >
                          {name_files.documento_identidad !== undefined ? name_files.documento_identidad : 'Carga Documento de Identidad'}
                          <input
                            hidden
                            type="file"
                            required
                            autoFocus
                            style={{ opacity: 0 }}
                            name='documento_identidad'
                            onChange={handle_change_file}
                          />
                        </Button>
                      </Tooltip>


                    </Grid>
                    {name_files.documento_identidad && (
                      <Tooltip title={`Eliminar  Documento de Identidad`}>
                        <Grid item>
                          <IconButton
                            color="error"
                            onClick={() => handle_delete_file('documento_identidad')}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Tooltip>
                    )}
                    <Grid item xs={12} sm={5}>
                      <TextField
                        label="Dirección Notificación"
                        value={''.concat(solicitud_facilidad.direccion_notificaciones)}
                        size="small"
                        fullWidth
                        disabled
                        name='direccion'
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        label="Ciudad"
                        value={''.concat(solicitud_facilidad.ciudad)}
                        size="small"
                        fullWidth
                        disabled
                        name='ciudad'
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        label="Teléfono Contacto"
                        value={''.concat(solicitud_facilidad.telefono_celular)}
                        size="small"
                        fullWidth
                        disabled
                        name='telefono'
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </>
        ) : persona === 2 ? (
          <>
            <Grid
              container
              sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                mb: '20px',
                mt: '20px',
                p: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
              }}
            >
              <h3>Caso Persona Juridica / Apoderado</h3>
              <Grid item xs={12}>
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                >
                  <Grid container spacing={2}>
                    <Grid item xs={11} sm={5}>
                      <Tooltip title={`Carga Documento de Identidad Apoderado`}>

                        <Button
                          variant="outlined"
                          fullWidth
                          size='medium'
                          component="label"
                          startIcon={<CloudUpload />}
                        >
                          {name_files.documento_identidad !== undefined ? name_files.documento_identidad : 'Carga Documento de Identidad Apoderado'}
                          <input
                            hidden
                            type="file"
                            required
                            autoFocus
                            style={{ opacity: 0 }}
                            name='documento_identidad'
                            onChange={handle_change_file}
                          />
                        </Button>
                      </Tooltip>
                    </Grid>
                    {name_files.documento_identidad && (
                      <Tooltip title={`Eliminar Documento de Identidad Apoderado`}>
                        <Grid item>
                          <IconButton
                            color="error"
                            onClick={() => handle_delete_file('documento_identidad')}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Tooltip>
                    )}
                    <Grid item xs={11} sm={5}>
                      <Tooltip title={`Carga Documento Poder`}>
                        <Button
                          variant="outlined"
                          fullWidth
                          size='medium'
                          component="label"
                          startIcon={<CloudUpload />}
                        >
                          {name_files.documento_respaldo !== undefined ? name_files.documento_respaldo : 'Carga Documento Poder'}
                          <input
                            hidden
                            type="file"
                            required
                            autoFocus
                            style={{ opacity: 0 }}
                            name='documento_respaldo'
                            onChange={handle_change_file}
                          />
                        </Button>
                      </Tooltip>
                    </Grid>

                    {name_files.documento_respaldo && (
                      <Tooltip title={`Eliminar  Documento Poder`}>
                        <Grid item>
                          <IconButton
                            color="error"
                            onClick={() => handle_delete_file('documento_respaldo')}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Tooltip>
                    )}
                    <Grid item xs={11} sm={5}>
                      <Tooltip title={`Carga Cert. Existencia y Representación Legal`}>
                        <Button
                          variant="outlined"
                          fullWidth
                          size='medium'
                          component="label"
                          startIcon={<CloudUpload />}
                        >
                          {name_files.certificado_legal !== undefined ? name_files.certificado_legal : 'Carga Cert. Existencia y Representación Legal'}
                          <input
                            hidden
                            type="file"
                            required
                            autoFocus
                            style={{ opacity: 0 }}
                            name='certificado_legal'
                            onChange={handle_change_file}
                          />
                        </Button>
                      </Tooltip>
                    </Grid>

                    {name_files.certificado_legal && (
                      <Tooltip title={`Eliminar  Cert. Existencia y Representación Legal`}>
                        <Grid item>
                          <IconButton
                            color="error"
                            onClick={() => handle_delete_file('certificado_legal')}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Tooltip>
                    )}



                    <Grid item xs={12} sm={5}>
                      <TextField
                        label="Dirección Notificación"
                        value={''.concat(solicitud_facilidad.direccion_notificaciones)}
                        size="small"
                        fullWidth
                        name='direccion'
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        label="Ciudad"
                        value={''.concat(solicitud_facilidad.ciudad)}
                        size="small"
                        fullWidth
                        name='ciudad'
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        label="Teléfono Contacto"
                        value={''.concat(solicitud_facilidad.telefono_celular)}
                        size="small"
                        fullWidth
                        name='telefono'
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </>
        ) : persona === 3 ? (
          <>
            <Grid
              container
              sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                mb: '20px',
                mt: '20px',
                p: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
              }}
            >
              <h3>Caso Deudor Solidario Natural</h3>
              <Grid item xs={12}>
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                >
                  <Grid container spacing={2}>
                    <Grid item xs={11} sm={5}>
                      <Tooltip title={`Carga Documento Deudor Solidario`}>

                        <Button
                          variant="outlined"
                          fullWidth
                          size='medium'
                          component="label"
                          startIcon={<CloudUpload />}
                        >
                          {name_files.documento_identidad !== undefined ? name_files.documento_identidad : 'Carga Documento Deudor Solidario'}
                          <input
                            hidden
                            type="file"
                            required
                            autoFocus
                            style={{ opacity: 0 }}
                            name='documento_identidad'
                            onChange={handle_change_file}
                          />
                        </Button>
                      </Tooltip>
                    </Grid>

                    {name_files.documento_identidad && (
                      <Tooltip title={`Eliminar Documento Deudor Solidario`}>
                        <Grid item>
                          <IconButton
                            color="error"
                            onClick={() => handle_delete_file('documento_identidad')}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Tooltip>
                    )}
                    <Grid item xs={11} sm={5}>
                      <Tooltip title={`Carga Documento Deudor Solidario`}>
                        <Button
                          variant="outlined"
                          fullWidth
                          size='medium'
                          component="label"
                          startIcon={<CloudUpload />}
                        >
                          {name_files.documento_respaldo !== undefined ? name_files.documento_respaldo : 'Carga Oficio Respaldando Deuda'}
                          <input
                            hidden
                            type="file"
                            required
                            autoFocus
                            style={{ opacity: 0 }}
                            name='documento_respaldo'
                            onChange={handle_change_file}
                          />
                        </Button>
                      </Tooltip>
                    </Grid>
                    {name_files.documento_respaldo && (
                      <Tooltip title={`Eliminar  Oficio Respaldando Deuda`}>
                        <Grid item>
                          <IconButton
                            color="error"
                            onClick={() => handle_delete_file('documento_respaldo')}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Tooltip>
                    )}



                    <Grid item xs={12} sm={5}>
                      <TextField
                        label="Dirección Notificación"
                        value={''.concat(solicitud_facilidad.direccion_notificaciones)}
                        size="small"
                        fullWidth
                        name='direccion'
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        label="Ciudad"
                        value={''.concat(solicitud_facilidad.ciudad)}
                        size="small"
                        fullWidth
                        name='ciudad'
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        label="Teléfono Contacto"
                        value={''.concat(solicitud_facilidad.telefono_celular)}
                        size="small"
                        fullWidth
                        name='telefono'
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </>
        ) : persona === 4 ? (
          <>
            <Grid
              container
              sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                mb: '20px',
                mt: '20px',
                p: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
              }}
            >
              <h3>Caso Deudor Solidario Juridico</h3>
              <Grid item xs={12}>
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                >
                  <Grid container spacing={2}>
                    <Grid item xs={11} sm={5}>
                      <Tooltip title={`Carga Documento Deudor Solidario`}>
                        <Button
                          variant="outlined"
                          fullWidth
                          size='medium'
                          component="label"
                          startIcon={<CloudUpload />}
                        >
                          {name_files.documento_identidad !== undefined ? name_files.documento_identidad : 'Carga Documento Deudor Solidario'}
                          <input
                            hidden
                            type="file"
                            required
                            autoFocus
                            style={{ opacity: 0 }}
                            name='documento_identidad'
                            onChange={handle_change_file}
                          />
                        </Button>
                      </Tooltip>
                    </Grid>

                    {name_files.documento_identidad && (
                      <Tooltip title={`Eliminar Documento Deudor Solidario`}>
                        <Grid item>
                          <IconButton
                            color="error"
                            onClick={() => handle_delete_file('documento_identidad')}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Tooltip>
                    )}


                    <Grid item xs={11} sm={5}>
                      <Tooltip title={`Carga Oficio Respaldando Deuda`}>
                        <Button
                          variant="outlined"
                          fullWidth
                          size='medium'
                          component="label"
                          startIcon={<CloudUpload />}
                        >
                          {name_files.documento_respaldo !== undefined ? name_files.documento_respaldo : 'Carga Oficio Respaldando Deuda'}
                          <input
                            hidden
                            type="file"
                            required
                            autoFocus
                            style={{ opacity: 0 }}
                            name='documento_respaldo'
                            onChange={handle_change_file}
                          />
                        </Button>
                      </Tooltip>
                    </Grid>

                    {name_files.documento_respaldo && (
                      <Tooltip title={`Eliminar Oficio Respaldando Deuda`}>
                        <Grid item>
                          <IconButton
                            color="error"
                            onClick={() => handle_delete_file('documento_respaldo')}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Tooltip>
                    )}


                    <Grid item xs={11} sm={5}>
                      <Tooltip title={`Carga Cert. Existencia y Representación Legal`}>
                        <Button
                          variant="outlined"
                          fullWidth
                          size='medium'
                          component="label"
                          startIcon={<CloudUpload />}
                        >
                          {name_files.certificado_legal !== undefined ? name_files.certificado_legal : 'Carga Cert. Existencia y Representación Legal'}
                          <input
                            hidden
                            type="file"
                            required
                            autoFocus
                            style={{ opacity: 0 }}
                            name='certificado_legal'
                            onChange={handle_change_file}
                          />
                        </Button>
                      </Tooltip>
                    </Grid>
                    {name_files.certificado_legal && (
                      <Tooltip title={`Eliminar Cert. Existencia y Representación Legal`}>
                        <Grid item>
                          <IconButton
                            color="error"
                            onClick={() => handle_delete_file('certificado_legal')}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Tooltip>
                    )}
                    <Grid item xs={12} sm={5}>
                      <TextField
                        label="Dirección Notificación"
                        value={''.concat(solicitud_facilidad.direccion_notificaciones)}
                        size="small"
                        fullWidth
                        name='direccion'
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        label="Ciudad"
                        value={''.concat(solicitud_facilidad.ciudad)}
                        size="small"
                        fullWidth
                        name='ciudad'
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        label="Teléfono Contacto"
                        value={''.concat(solicitud_facilidad.telefono_celular)}
                        size="small"
                        fullWidth
                        name='telefono'
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </>
        ) : null
      }
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          mb: '20px',
          mt: '20px',
          p: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Periodicidad y Modalidad</InputLabel>
                  <Select
                    label="Periodicidad y Modalidad"
                    name='periodicidad'
                    defaultValue={""}
                    onChange={(event: event) => {
                      const { value } = event.target
                      set_num_periodicidad(parseInt(value))
                      if (value === '1') {
                        set_periodicidad('meses')
                        set_limite(60)
                      }
                      if (value === '3') {
                        set_periodicidad('trimestres')
                        set_limite(20)
                      }
                      if (value === '6') {
                        set_periodicidad('semestres')
                        set_limite(10)
                      }
                      if (value === '12') {
                        set_periodicidad('años')
                        set_limite(5)

                      }
                      if (value === '2') {
                        set_periodicidad('bimestra')
                        set_limite(30)
                      }
                    }}
                  >
                    <MenuItem value="12">Anual</MenuItem>
                    <MenuItem value="6">Semestral</MenuItem>
                    <MenuItem value="3">Trimestral</MenuItem>
                    <MenuItem value="2">Bimestral</MenuItem>
                    <MenuItem value="1">Mensual</MenuItem>

                  </Select>
                </FormControl>
              </Grid>


              <Grid item xs={12} sm={5}>
                <FormControl size="small" fullWidth>
                  <InputLabel>{periodicidad !== '' ? `Plazo (${periodicidad})` : 'Plazo'}</InputLabel>
                  <Select
                    required
                    label={periodicidad !== '' ? `Plazo (${periodicidad})` : 'Plazo'}
                    name='cuota'
                    defaultValue={""}
                    onChange={(event: event) => {
                      const { value } = event.target
                      set_plazo(parseInt(value))
                    }}
                  >
                    {
                      arr_periodicidad.map((count) => (
                        <MenuItem key={count} value={count}>{count}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              {
                periodicidad === 'años' && plazo > 1 ||
                  periodicidad === 'semestres' && plazo > 2 ||
                  periodicidad === 'trimestres' && plazo > 4 ||
                  periodicidad === 'meses' && plazo > 12 ? (
                  <>
                    <Grid item xs={12} sm={5} direction="row" rowSpacing={2}>
                      <FormControl size="small" fullWidth>
                        <InputLabel>Garantía Ofrecida</InputLabel>
                        <Select
                          label="Garantía Ofrecida"
                          onChange={on_input_change}
                          name='id_rol'
                          defaultValue={""}
                        >
                          {
                            garantias_options.map((garantia) => (
                              <MenuItem key={garantia.id} value={garantia.id}>{capitalize(garantia.descripcion.toLowerCase())}</MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={11} sm={5}>
                      <Tooltip title={`Carga Garantía Ofrecida`}>
                        <Button
                          variant="outlined"
                          fullWidth
                          size='medium'
                          component="label"
                          startIcon={<CloudUpload />}
                        >
                          {name_files.documento_garantia !== undefined ? name_files.documento_garantia : 'Carga Garantía Ofrecida'}
                          <input
                            hidden
                            type="file"
                            required
                            autoFocus
                            style={{ opacity: 0 }}
                            name='documento_garantia'
                            onChange={handle_change_file}
                          />
                        </Button>
                      </Tooltip>


                    </Grid>
                    {name_files.documento_garantia && (
                      <Tooltip title={`Eliminar Garantía Ofrecida`}>
                        <Grid item>
                          <IconButton
                            color="error"
                            onClick={() => handle_delete_file('documento_garantia')}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Tooltip>
                    )}
                  </>
                ) : null
              }
              <Grid item xs={11} sm={5}>
                <Tooltip title={`Carga Documento No Enajenación`}>
                  <Button
                    variant="outlined"
                    fullWidth
                    size='medium'
                    component="label"
                    startIcon={<CloudUpload />}
                  >
                    {name_files.documento_no_enajenacion !== undefined ? name_files.documento_no_enajenacion : 'Carga Documento No Enajenación'}
                    <input
                      hidden
                      type="file"
                      required
                      autoFocus
                      style={{ opacity: 0 }}
                      name='documento_no_enajenacion'
                      onChange={handle_change_file}
                    />
                  </Button>
                </Tooltip>
              </Grid>
              {name_files.documento_no_enajenacion && (
                <Tooltip title={`Eliminar Documento No Enajenación`}>
                  <Grid item>
                    <IconButton
                      color="error"
                      onClick={() => handle_delete_file('documento_no_enajenacion')}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Tooltip>
              )}
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
          mb: '20px',
          mt: '20px',
          p: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <h3>Relación de bienes</h3>
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2} marginBottom={3}>
              <Grid item xs={12} sm={5} >
                <FormControl size="small" fullWidth>
                  <InputLabel>Tipo Bien</InputLabel>
                  <Select
                    label="Tipo Bien"
                    name='id_tipo_bien'
                    defaultValue={""}
                    onChange={(event: event) => {
                      const { value } = event.target
                      set_tipo_bien(parseInt(value))
                    }}
                  >
                    {
                      bienes_options.map((bien) => (
                        <MenuItem key={bien.id} value={bien.id}>{capitalize(bien.descripcion.toLowerCase())}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  required
                  size="small"
                  fullWidth
                  label='Identificación'
                  helperText='Escribe el Documento de Identificación'
                  variant="outlined"
                  name='descripcion'
                  onChange={(event: event) => {
                    const { value } = event.target
                    set_identificacion_bien(value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  required
                  label="Avalúo"
                  helperText='Escribe el Avalúo'
                  size="small"
                  fullWidth
                  type='number'
                  name='valor'
                  onChange={(event: event) => {
                    const { value } = event.target
                    set_valor_bien(parseFloat(value))
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  required
                  label="Dirección"
                  helperText='Escribe la Dirección'
                  size="small"
                  fullWidth
                  name='direccion'
                  onChange={(event: event) => {
                    const { value } = event.target
                    set_direccion_bien(value)
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <Tooltip title={`Carga el Documento Impuesto`}>
                  <Button
                    variant="outlined"
                    fullWidth
                    size='medium'
                    component="label"
                    startIcon={<CloudUpload />}
                  >
                    {nombre_archivo_bien !== '' ? nombre_archivo_bien : 'Carga el Documento Impuesto'}
                    <input
                      hidden
                      type="file"
                      required
                      autoFocus
                      style={{ opacity: 0 }}
                      name='documento_soporte_bien'
                      onChange={handle_file_bienes}
                    />
                  </Button>
                </Tooltip>
              </Grid>
              {nombre_archivo_bien && (
                <Grid item>
                  <IconButton
                    color="error"
                    onClick={eliminarArchivoSeleccionado}
                  >
                    <DeleteIcon />

                  </IconButton>
                </Grid>
              )}
              <Grid item xs={12} sm={3.1}>
                <Button
                  color='primary'
                  variant='outlined'
                  onClick={() => {
                    set_rows_bienes(rows_bienes.concat({
                      id: faker.database.mongodbObjectId(),
                      id_tipo_bien: tipo_bien,
                      descripcion: identificacion_bien,
                      direccion: direccion_bien,
                      valor: valor_bien,
                    }))
                    set_tipos_bienes(tipos_bienes.concat(tipo_bien))
                    set_identificaciones_bienes(identificaciones_bienes.concat(identificacion_bien))
                    set_direcciones_bienes(direcciones_bienes.concat(direccion_bien))
                    set_valores_bienes(valores_bienes.concat(valor_bien))
                    set_archivos_bienes(archivos_bienes.concat(archivo_bien as any))
                    set_ubicaciones_bienes(ubicaciones_bienes.concat(1))
                  }}
                >
                  Agregar
                </Button>
              </Grid>
            </Grid>
            {
              rows_bienes.length !== 0 ? (
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
                  <Grid item xs={15}>
                    <Grid item>
                      <Box sx={{ width: '100%' }}>
                        <DataGrid
                          autoHeight
                          disableSelectionOnClick
                          rows={rows_bienes}
                          columns={columns_bienes}
                          pageSize={10}
                          rowsPerPageOptions={[10]}
                          experimentalFeatures={{ newEditingApi: true }}
                          getRowId={(row) => row.id}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              ) : null
            }
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          mb: '20px',
          mt: '20px',
          p: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={15}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Grid item xs={12} sm={15} mb='20px'>
              <TextField
                multiline
                required
                rows={4}
                label="Observación"
                helperText="Escribe una observación"
                size="small"
                fullWidth
                name='observaciones'
                onChange={on_input_change}
              />
            </Grid>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Aceptar términos y condiciones" />
              <FormControlLabel
                control={<Checkbox
                  name='notificaciones'
                  onChange={(event: check) => {
                    const { checked } = event.target
                    set_autorizacion_notificacion(checked)
                  }}
                />}
                label="Autorizar notificación por correo electrónico" />
            </FormGroup>
            <Stack
              direction="row"
              justifyContent="right"
              spacing={2}
              sx={{ mb: '20px', mt: '20px' }}
            >
            <Button
  color='primary'
  variant='contained'
  startIcon={<Save />}
  onClick={async () => {
    const valorAbonado = form_state.valor_abonado;

    if (valorAbonado > totalSum) {
      Swal.fire({
        icon: 'error',
        title: "Valor abonado es mayor que la suma total",
      });
    } else {
      try {
        const { data: { data: res_registro } } = await post_registro_fac_pago({
          ...form_state,
          id_deudor: deudores.id,
          id_tipo_actuacion: persona,
          fecha_generacion: dayjs(Date()).format('YYYY-MM-DD'),
          periodicidad: num_periodicidad,
          cuotas: plazo,
          fecha_abono: dayjs(date_abono).format('YYYY-MM-DD'),
          documento_no_enajenacion: form_files.documento_no_enajenacion,
          consignacion_soporte: form_files.consignacion_soporte,
          documento_soporte: form_files.documento_soporte,
          id_funcionario: 1,
          notificaciones: autorizacion_notificacion,
          documento_garantia: form_files.documento_garantia,
          ids_obligaciones: obligaciones_ids,
          documento_deudor1: form_files.documento_identidad,
          documento_deudor2: form_files.documento_respaldo,
          documento_deudor3: form_files.certificado_legal,
          id_tipo_bienes: tipos_bienes,
          identificaciones: identificaciones_bienes,
          direcciones: direcciones_bienes,
          valores: valores_bienes,
          documentos_soporte_bien: archivos_bienes,
          id_ubicaciones: ubicaciones_bienes,
        });
        set_respuesta_registro(res_registro ?? {});
      } catch (error: any) {
        control_error(error.response.data.detail);
      }
    }
  }}
>
  Enviar Solicitud
</Button>

            </Stack>
          </Box>
        </Grid>
      </Grid>
      <DialogoRegistro
        titulo_notificacion='La Solicitud de Facilidad de Pago fue Registrada con Éxito'
        tipo='Radicación'
        numero_registro={respuesta_registro?.numero_radicacion}
        abrir_modal={modal}
        abrir_dialog={handle_close}
      />
    </>
  )
}
