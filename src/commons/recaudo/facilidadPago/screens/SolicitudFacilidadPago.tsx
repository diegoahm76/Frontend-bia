/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Title } from '../../../../components/Title';
import { EncabezadoRegistro } from '../componentes/EncabezadoRegistro';
import { TablaObligacionesSolicitud } from '../componentes/TablaObligacionesSolicitud';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Grid, Box, FormControl, InputLabel, Select, MenuItem, TextField, Stack, Button, Checkbox, FormGroup, FormControlLabel, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material";
import { Close, Save, CloudUpload } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { use_form } from '../../../../hooks/useForm';
import { useFormText } from '../hooks/useFormText';
import { useFormFiles } from '../hooks/useFormFiles';
import { faker } from '@faker-js/faker';
import { type event, type check, type Deudor, type Bien } from '../interfaces/interfaces';
import { post_registro_fac_pago, get_tipo_bienes, get_roles_garantia } from '../requests/requests';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

interface RootState {
  deudores: {
    deudores: Deudor;
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

interface RespuestaRegistroFacilidad {
  consignacion_soporte: string;
  cuotas: number;
  documento_no_enajenacion: string;
  documento_soporte: string;
  fecha_generacion: string;
  id: number;
  id_deudor: number;
  id_funcionario: number;
  id_tipo_actuacion: number;
  notificaciones: boolean;
  numero_radicacion: string;
  observaciones: string;
  periodicidad: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SolicitudFacilidadPago: React.FC = () => {
  const [persona, set_persona] = useState(0);
  const [num_periodicidad, set_num_periodicidad] = useState(0);
  const [periodicidad, set_periodicidad] = useState('');
  const [limite, set_limite] = useState(0);
  const [arr_periodicidad, set_arr_periodicidad] = useState(Array<number>);
  const [plazo, set_plazo] = useState(0);
  const [notificacion, set_notificacion] = useState(false);
  const [bienes_options, set_bienes_options] = useState<BienInput[]>([]);
  const [garantias_options, set_garantias_options] = useState<GarantiaInput[]>([]);
  const [rows_bienes, set_rows_bienes] = useState(Array<Bien>);
  const [respuesta_registro, set_respuesta_registro] = useState<RespuestaRegistroFacilidad>();
  const { form_state, on_input_change } = use_form({});
  const { form_text, handle_change_text } = useFormText({});
  const { form_files, name_files, handle_change_file } = useFormFiles({});
  const [modal, set_modal] = useState(false);
  const { deudores } = useSelector((state: RootState) => state.deudores);

  useEffect(() => {
    if(respuesta_registro !== undefined){
      set_modal(true)
    }
  }, [respuesta_registro])

  const handle_close = () => { set_modal(false) }

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const get_lista_bienes = async (): Promise<void> => {
    try {
      const { data: { data: res_bienes } } = await get_tipo_bienes();
      set_bienes_options(res_bienes ?? []);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  const get_lista_garantias = async (): Promise<void> => {
    try {
      const { data: { data: res_garantias } } = await get_roles_garantia();
      set_garantias_options(res_garantias ?? []);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    void get_lista_bienes();
    void get_lista_garantias();
  }, [])

  useEffect(() => {
    let count:number = 0;
    const arr:number[] = []
    for (let i=0; i<limite; i++){
      count = count + 1
      arr.push(count)
    }
    set_arr_periodicidad(arr)
  },[limite])

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
    {
      field: 'documento_soporte',
      headerName: 'Doc. Impuestos',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          <Button
            color='primary'
            variant='outlined'
            size='small'
            onClick={() => {}}
          >
            Ver Documento
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Title title='Solicitud de Facilidad de Pago - Usuario Externo' />
      <EncabezadoRegistro />
      <TablaObligacionesSolicitud />
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
                </Grid>
                <Grid item xs={11} sm={5}>
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
                </Grid>
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
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        required
                        label="Dirección Notificación"
                        helperText='Escribe la Dirección de Notificación'
                        size="small"
                        fullWidth
                        onChange={on_input_change}
                        name='direccion'
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        required
                        label="Ciudad"
                        helperText='Escribe la Ciudad'
                        size="small"
                        fullWidth
                        onChange={on_input_change}
                        name='ciudad'
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        required
                        label="Teléfono Contacto"
                        helperText='Escribe el Teléfono de Contacto'
                        size="small"
                        fullWidth
                        onChange={on_input_change}
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
                      <Button
                        variant="outlined"
                        fullWidth
                        size='medium'
                        component="label"
                        startIcon={<CloudUpload />}
                      >
                        {name_files.documento_apoderado !== undefined ? name_files.documento_apoderado : 'Carga Documento de Identidad Apoderado'}
                          <input
                            hidden
                            type="file"
                            required
                            autoFocus
                            style={{ opacity: 0 }}
                            name='documento_apoderado'
                            onChange={handle_change_file}
                          />
                      </Button>
                    </Grid>
                    <Grid item xs={11} sm={5}>
                      <Button
                        variant="outlined"
                        fullWidth
                        size='medium'
                        component="label"
                        startIcon={<CloudUpload />}
                      >
                        {name_files.documento_poder !== undefined ? name_files.documento_poder :'Carga Documento Poder'}
                          <input
                            hidden
                            type="file"
                            required
                            autoFocus
                            style={{ opacity: 0 }}
                            name='documento_poder'
                            onChange={handle_change_file}
                          />
                      </Button>
                    </Grid>
                    <Grid item xs={11} sm={5}>
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
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        required
                        label="Dirección Notificación"
                        helperText='Escribe la Dirección de Notificación'
                        size="small"
                        fullWidth
                        onChange={on_input_change}
                        name='direccion'
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        required
                        label="Ciudad"
                        helperText='Escribe la Ciudad'
                        size="small"
                        fullWidth
                        onChange={on_input_change}
                        name='ciudad'
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        required
                        label="Teléfono Contacto"
                        helperText='Escribe el Teléfono de Contacto'
                        size="small"
                        fullWidth
                        onChange={on_input_change}
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
                      <Button
                        variant="outlined"
                        fullWidth
                        size='medium'
                        component="label"
                        startIcon={<CloudUpload />}
                      >
                        {name_files.documento_deudor !== undefined ? name_files.documento_deudor : 'Carga Documento Deudor Solidario'}
                          <input
                            hidden
                            type="file"
                            required
                            autoFocus
                            style={{ opacity: 0 }}
                            name='documento_deudor'
                            onChange={handle_change_file}
                          />
                      </Button>
                    </Grid>
                    <Grid item xs={11} sm={5}>
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
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        required
                        label="Dirección Notificación"
                        helperText='Escribe la Dirección de Notificación'
                        size="small"
                        fullWidth
                        onChange={on_input_change}
                        name='direccion'
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        required
                        label="Ciudad"
                        helperText='Escribe la Ciudad'
                        size="small"
                        fullWidth
                        onChange={on_input_change}
                        name='ciudad'
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        required
                        label="Teléfono Contacto"
                        helperText='Escribe el Teléfono de Contacto'
                        size="small"
                        fullWidth
                        onChange={on_input_change}
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
                      <Button
                        variant="outlined"
                        fullWidth
                        size='medium'
                        component="label"
                        startIcon={<CloudUpload />}
                      >
                        {name_files.documento_deudor !== undefined ? name_files.documento_deudor : 'Carga Documento Deudor Solidario'}
                          <input
                            hidden
                            type="file"
                            required
                            autoFocus
                            style={{ opacity: 0 }}
                            name='documento_deudor'
                            onChange={handle_change_file}
                          />
                      </Button>
                    </Grid>
                    <Grid item xs={11} sm={5}>
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
                    </Grid>
                    <Grid item xs={11} sm={5}>
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
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        required
                        label="Dirección Notificación"
                        helperText='Escribe la Dirección de Notificación'
                        size="small"
                        fullWidth
                        onChange={on_input_change}
                        name='direccion'
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        required
                        label="Ciudad"
                        helperText='Escribe la Ciudad'
                        size="small"
                        fullWidth
                        onChange={on_input_change}
                        name='ciudad'
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        required
                        label="Teléfono Contacto"
                        helperText='Escribe el Teléfono de Contacto'
                        size="small"
                        fullWidth
                        onChange={on_input_change}
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
                      if(value === '1') {
                        set_periodicidad('meses')
                        set_limite(60)
                      }
                      if(value === '3') {
                        set_periodicidad('trimestres')
                        set_limite(20)
                      }
                      if(value === '6') {
                        set_periodicidad('semestres')
                        set_limite(10)
                      }
                      if(value === '12') {
                        set_periodicidad('años')
                        set_limite(5)
                      }
                    }}
                  >
                    <MenuItem value="1">Mensual</MenuItem>
                    <MenuItem value="3">Trimestral</MenuItem>
                    <MenuItem value="6">Semestral</MenuItem>
                    <MenuItem value="12">Anual</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={5}>
                <FormControl size="small" fullWidth>
                  <InputLabel>{periodicidad !== '' ? `Plazo (${periodicidad})`: 'Plazo'}</InputLabel>
                  <Select
                    required
                    label={periodicidad !== '' ? `Plazo (${periodicidad})`: 'Plazo'}
                    name='cuota'
                    defaultValue={""}
                    onChange={(event: event) => {
                      const { value } = event.target
                      set_plazo(parseInt(value))
                    }}
                  >
                    {
                      arr_periodicidad.map((count)=>(
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
                    </Grid>
                  </>
                ) : null
              }
              <Grid item xs={11} sm={5}>
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
                    onChange={handle_change_text}
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
                  onChange={handle_change_text}
                  name='descripcion'
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
                  onChange={handle_change_text}
                  name='valor'
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  required
                  label="Dirección"
                  helperText='Escribe la Dirección'
                  size="small"
                  fullWidth
                  onChange={handle_change_text}
                  name='direccion'
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <Button
                  variant="outlined"
                  fullWidth
                  size='medium'
                  component="label"
                  startIcon={<CloudUpload />}
                >
                  {name_files.documento_soporte_bien !== undefined ? name_files.documento_soporte_bien : 'Carga el Documento Impuesto'}
                    <input
                      hidden
                      type="file"
                      required
                      autoFocus
                      style={{ opacity: 0 }}
                      name='documento_soporte_bien'
                      onChange={handle_change_file}
                    />
                </Button>
              </Grid>
              <Grid item xs={12} sm={3.1}>
                <Button
                  color='primary'
                  variant='outlined'
                  onClick={() => {
                    set_rows_bienes(rows_bienes.concat({...form_text, id: faker.database.mongodbObjectId()}))
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
                      set_notificacion(checked)
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
                  onClick={() => {
                      const post_registro = async (): Promise<void> => {
                        try {
                          const { data: { data: res_registro } } = await post_registro_fac_pago({
                            ...form_state,
                            id_deudor: deudores.id,
                            id_tipo_actuacion: persona,
                            fecha_generacion: dayjs(Date()).format('YYYY-MM-DD'),
                            periodicidad: num_periodicidad,
                            cuotas: plazo,
                            documento_no_enajenacion: form_files.documento_no_enajenacion,
                            consignacion_soporte: form_files.consignacion_soporte,
                            documento_soporte: form_files.documento_soporte,
                            id_funcionario: 1,
                            notificaciones: notificacion,
                            documento_garantia: form_files.documento_garantia,
                            documento_deudor: form_files.documento_identidad,
                            ...form_text,
                            id_ubicacion: 1,
                            documento_soporte_bien: form_files.documento_soporte_bien,
                          })
                          set_respuesta_registro(res_registro ?? {});
                        } catch (error: any) {
                          throw new Error(error);
                        }
                      }
                      void post_registro();
                  }}
                >
                  Enviar Solicitud
                </Button>
              </Stack>
          </Box>
        </Grid>
      </Grid>
      <Dialog
        open={modal}
        onClose={handle_close}
        maxWidth="xs"
      >
        <Box component="form"
          onSubmit={()=>{}}>
          <DialogTitle align='center'>La solicitud de facilidad de pago fue registrada con éxito</DialogTitle>
          <Divider />
          <DialogContent sx={{ mb: '0px' }}>
            <Grid container spacing={1}>
              <p><strong>Número de radicación:</strong> {respuesta_registro?.numero_radicacion}</p>
              <p><strong>Fecha y Hora:</strong> {dayjs(Date()).format('DD/MM/YYYY')} - {dayjs(Date()).hour()}:{dayjs(Date()).minute()} horas</p>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              variant='outlined'
              color="primary"
              startIcon={<Close />}
              onClick={handle_close}
            >
              Cerrar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}
