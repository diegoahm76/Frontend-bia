/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Title } from '../../../../components/Title';
import { InputsEncabezado } from '../componentes/InputsEncabezado';
import { TablaObligacionesSolicitud } from '../componentes/TablaObligacionesSolicitud';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Grid, Box, FormControl, InputLabel, Select, MenuItem, TextField, Stack, Button, Checkbox, FormGroup, FormControlLabel, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Close } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { use_form } from '../../../../hooks/useForm';
import { useFormLocal } from '../hooks/useFormLocal';
import { faker } from '@faker-js/faker';
import { type event } from '../interfaces/interfaces';

interface bien {
  id: string;
  bien: string;
  identificacion: string;
  avaluo: number;
  direccion: string;
  docImpuesto: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SolicitudFacilidadPago: React.FC = () => {
  const [persona, set_persona] = useState('');
  const [periodicidad, set_periodicidad] = useState('');
  const [limite, set_limite] = useState(0);
  const [arr_periodicidad, set_arr_periodicidad] = useState(Array<number>);
  const [plazo, set_plazo] = useState('');
  const [rows_bienes, set_rows_bienes] = useState(Array<bien>);
  const { form_state, on_input_change } = use_form({});
  const { form_local, handle_change_local } = useFormLocal({});
  const [modal, set_modal] = useState(false);
  const [file_name, set_file_name] = useState('');

  console.log('form', form_state)
  const handle_open = () => { set_modal(true) };
  const handle_close = () => { set_modal(false) };

  const handle_file_selected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected_file =
      event.target.files != null ? event.target.files[0] : null;
    if (selected_file != null) {
      set_file_name(selected_file.name);
    }
  };

  useEffect(()=>{
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
      field: 'bien',
      headerName: 'Tipo Bien',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'identificacion',
      headerName: 'Identificación',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'avaluo',
      headerName: 'Avalúo',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
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
      field: 'docImpuesto',
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
      <InputsEncabezado />
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
              <Grid item xs={11} sm={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    size='medium'
                    component="label"
                    startIcon={<CloudUploadIcon />}
                  >
                    {file_name !== '' ? file_name : 'Carga Documento Solicitud'}
                      <input
                        hidden
                        type="file"
                        required
                        autoFocus
                        style={{ opacity: 0 }}
                        onChange={handle_file_selected}
                      />
                  </Button>
                </Grid>
                <Grid item xs={11} sm={3.1}>
                  <Button
                    variant="outlined"
                    fullWidth
                    size='medium'
                    component="label"
                    startIcon={<CloudUploadIcon />}
                  >
                    {file_name !== '' ? file_name : 'Carga Soporte Consignación'}
                      <input
                        hidden
                        type="file"
                        required
                        autoFocus
                        style={{ opacity: 0 }}
                        onChange={handle_file_selected}
                      />
                  </Button>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl size='small' fullWidth>
                    <InputLabel>Calidad en que actúa la persona</InputLabel>
                    <Select
                      label="Calidad en que actúa la persona"
                      defaultValue={""}
                      onChange={(event: event) => {
                        const { value } = event.target
                        if(value === 'Natural') {
                          set_persona('1')
                        }
                        if(value === 'Juridica') {
                          set_persona('2')
                        }
                        if(value === 'DeudorSolidario') {
                          set_persona('3')
                        }
                      }}
                    >
                      <MenuItem value='Natural'>Persona Natural</MenuItem>
                      <MenuItem value='Juridica'>Persona Juridica / Apoderado</MenuItem>
                      <MenuItem value='DeudorSolidario'>Deudor Solidario</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {
        persona === '1' ? (
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
                    <Grid item xs={11} sm={3.2}>
                      <Button
                        variant="outlined"
                        fullWidth
                        size='medium'
                        component="label"
                        startIcon={<CloudUploadIcon />}
                      >
                        {file_name !== '' ? file_name : 'Carga Documento de Identidad'}
                          <input
                            hidden
                            type="file"
                            required
                            autoFocus
                            style={{ opacity: 0 }}
                            onChange={handle_file_selected}
                          />
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
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
                    <Grid item xs={12} sm={3}>
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
                    <Grid item xs={12} sm={3}>
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
        ) : persona === '2' ? (
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
                    <Grid item xs={11} sm={4}>
                      <Button
                        variant="outlined"
                        fullWidth
                        size='medium'
                        component="label"
                        startIcon={<CloudUploadIcon />}
                      >
                        {file_name !== '' ? file_name : 'Carga Documento de Identidad Apoderado'}
                          <input
                            hidden
                            type="file"
                            required
                            autoFocus
                            style={{ opacity: 0 }}
                            onChange={handle_file_selected}
                          />
                      </Button>
                    </Grid>
                    <Grid item xs={11} sm={3}>
                      <Button
                        variant="outlined"
                        fullWidth
                        size='medium'
                        component="label"
                        startIcon={<CloudUploadIcon />}
                      >
                        {file_name !== '' ? file_name : 'Carga Documento Poder'}
                          <input
                            hidden
                            type="file"
                            required
                            autoFocus
                            style={{ opacity: 0 }}
                            onChange={handle_file_selected}
                          />
                      </Button>
                    </Grid>
                    <Grid item xs={11} sm={4.4}>
                      <Button
                        variant="outlined"
                        fullWidth
                        size='medium'
                        component="label"
                        startIcon={<CloudUploadIcon />}
                      >
                        {file_name !== '' ? file_name : 'Carga Cert. Existencia y Representación Legal'}
                          <input
                            hidden
                            type="file"
                            required
                            autoFocus
                            style={{ opacity: 0 }}
                            onChange={handle_file_selected}
                          />
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
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
                    <Grid item xs={12} sm={3}>
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
                    <Grid item xs={12} sm={3}>
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
        ) : persona === '3' ? (
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
              <h3>Caso Deudor Solidario</h3>
              <Grid item xs={12}>
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <FormControl size="small" fullWidth>
                        <InputLabel>Tipo Deudor Solidario</InputLabel>
                        <Select
                          label="Tipo Deudor Solidario"
                          onChange={on_input_change}
                          name='tipoDeudor'
                        >
                          <MenuItem value='DeudorNatural'>Persona Natural</MenuItem>
                          <MenuItem value='DeudorJuridico'>Persona Juridica / Apoderado</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={11} sm={3.5}>
                      <Button
                        variant="outlined"
                        fullWidth
                        size='medium'
                        component="label"
                        startIcon={<CloudUploadIcon />}
                      >
                        {file_name !== '' ? file_name : 'Carga Documento Deudor Solidario'}
                          <input
                            hidden
                            type="file"
                            required
                            autoFocus
                            style={{ opacity: 0 }}
                            onChange={handle_file_selected}
                          />
                      </Button>
                    </Grid>
                    <Grid item xs={11} sm={3.3}>
                      <Button
                        variant="outlined"
                        fullWidth
                        size='medium'
                        component="label"
                        startIcon={<CloudUploadIcon />}
                      >
                        {file_name !== '' ? file_name : 'Carga Oficio Respaldando Deuda'}
                          <input
                            hidden
                            type="file"
                            required
                            autoFocus
                            style={{ opacity: 0 }}
                            onChange={handle_file_selected}
                          />
                      </Button>
                    </Grid>
                    <Grid item xs={11} sm={4.4}>
                      <Button
                        variant="outlined"
                        fullWidth
                        size='medium'
                        component="label"
                        startIcon={<CloudUploadIcon />}
                      >
                        {file_name !== '' ? file_name : 'Carga Cert. Existencia y Representación Legal'}
                          <input
                            hidden
                            type="file"
                            required
                            autoFocus
                            style={{ opacity: 0 }}
                            onChange={handle_file_selected}
                          />
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
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
                    <Grid item xs={12} sm={3}>
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
                    <Grid item xs={12} sm={3}>
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
              <Grid item xs={12} sm={3}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Periodicidad y Modalidad</InputLabel>
                  <Select
                    label="Periodicidad y Modalidad"
                    name='periodicidadymodalidad'
                    defaultValue={""}
                    onChange={(event: event) => {
                      const { value } = event.target
                      if(value === 'mensual') {
                        set_periodicidad('meses')
                        set_limite(60)
                      }
                      if(value === 'trimestral') {
                        set_periodicidad('trimestres')
                        set_limite(20)
                      }
                      if(value === 'semestral') {
                        set_periodicidad('semestres')
                        set_limite(10)
                      }
                      if(value === 'anual') {
                        set_periodicidad('años')
                        set_limite(5)
                      }
                    }}
                  >
                    <MenuItem value="mensual">Mensual</MenuItem>
                    <MenuItem value="trimestral">Trimestral</MenuItem>
                    <MenuItem value="semestral">Semestral</MenuItem>
                    <MenuItem value="anual">Anual</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl size="small" fullWidth>
                  <InputLabel>{periodicidad !== '' ? `Plazo (${periodicidad})`: 'Plazo'}</InputLabel>
                  <Select
                    required
                    label={periodicidad !== '' ? `Plazo (${periodicidad})`: 'Plazo'}
                    name='plazo'
                    defaultValue={""}
                    onChange={(event: event) => {
                      const { value } = event.target
                      set_plazo(value)
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
                periodicidad === 'años' && parseInt(plazo) > 1 || periodicidad === 'semestres' && parseInt(plazo) > 2 || periodicidad === 'trimestres' && parseInt(plazo) > 4 || periodicidad === 'meses' && parseInt(plazo) > 12 ? (
                  <>
                    <Grid item xs={12} sm={3} direction="row" rowSpacing={2}>
                      <FormControl size="small" fullWidth>
                        <InputLabel>Garantía Ofrecida</InputLabel>
                        <Select
                          label="Garantía Ofrecida"
                          onChange={on_input_change}
                          name='garantias'
                          defaultValue={""}
                        >
                          <MenuItem value="hipoteca">Hipoteca</MenuItem>
                          <MenuItem value="prenda">Prenda</MenuItem>
                          <MenuItem value="fideicomisoAdministracion">Fideicomiso en Administración</MenuItem>
                          <MenuItem value="fideicomisoGarantia">Fideicomiso en Garantía</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={11} sm={3}>
                      <Button
                        variant="outlined"
                        fullWidth
                        size='medium'
                        component="label"
                        startIcon={<CloudUploadIcon />}
                      >
                        {file_name !== '' ? file_name : 'Carga Garantía Ofrecida'}
                          <input
                            hidden
                            type="file"
                            required
                            autoFocus
                            style={{ opacity: 0 }}
                            onChange={handle_file_selected}
                          />
                      </Button>
                    </Grid>
                  </>
                ) : null
              }
              <Grid item xs={11} sm={3.4}>
                <Button
                  variant="outlined"
                  fullWidth
                  size='medium'
                  component="label"
                  startIcon={<CloudUploadIcon />}
                >
                  {file_name !== '' ? file_name : 'Carga Documento No Enajenación'}
                    <input
                      hidden
                      type="file"
                      required
                      autoFocus
                      style={{ opacity: 0 }}
                      onChange={handle_file_selected}
                          />
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {
        periodicidad === 'años' && parseInt(plazo) > 1 || periodicidad === 'semestres' && parseInt(plazo) > 2 || periodicidad === 'trimestres' && parseInt(plazo) > 4 || periodicidad === 'meses' && parseInt(plazo) > 12 ? (
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
              <Grid item xs={12} sm={3} >
              <FormControl size="small" fullWidth>
                  <InputLabel>Tipo Bien</InputLabel>
                  <Select
                    label="Tipo Bien"
                    name='bien'
                    defaultValue={""}
                    onChange={handle_change_local}
                  >
                    <MenuItem value="Casa">Casa</MenuItem>
                    <MenuItem value="Auto">Auto</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3} >
                <TextField
                  required
                  size="small"
                  fullWidth
                  label='Identificación'
                  helperText='Escribe el Documento de Identificación'
                  variant="outlined"
                  onChange={handle_change_local}
                  name='identificacion'
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  label="Avalúo"
                  helperText='Escribe el Avalúo'
                  size="small"
                  fullWidth
                  type='number'
                  onChange={handle_change_local}
                  name='avaluo'
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  label="Dirección"
                  helperText='Escribe la Dirección'
                  size="small"
                  fullWidth
                  onChange={handle_change_local}
                  name='direccion'
                />
              </Grid>
              <Grid item xs={11} sm={3.1}>
                <Button
                  variant="outlined"
                  fullWidth
                  size='medium'
                  component="label"
                  startIcon={<CloudUploadIcon />}
                >
                  {file_name !== '' ? file_name : 'Carga el Documento Impuesto'}
                    <input
                      hidden
                      type="file"
                      required
                      autoFocus
                      style={{ opacity: 0 }}
                      onChange={handle_file_selected}
                          />
                </Button>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  color='primary'
                  variant='outlined'
                  size='small'
                  onClick={() => {
                    set_rows_bienes(rows_bienes.concat({...form_local, id: faker.database.mongodbObjectId()}))
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
                  <Grid item xs={12}>
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
              <Grid item xs={12} sm={15} mb='20px'>
                <TextField
                  multiline
                  rows={4}
                  label="Observación"
                  helperText="Escribe una observación"
                  size="small"
                  fullWidth
                  name='observacion'
                  onChange={on_input_change}
                />
              </Grid>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Aceptar términos y condiciones" />
                <FormControlLabel control={<Checkbox />} label="Autorizar notificación por correo electrónico" />
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
                  startIcon={<SaveIcon />}
                  onClick={() => {
                    handle_open()
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
              <p><strong>Número de radicación:</strong> {'WQEQ123154'}</p>
              <p><strong>Fecha y Hora:</strong> {Date()}</p>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              variant='outlined'
              color="primary"
              startIcon={<Close />}
              onClick={() => {
                handle_close()
              }}
            >
              Cerrar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}
