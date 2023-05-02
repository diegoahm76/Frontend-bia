import { Title } from '../../../../components/Title';
import { InputsEncabezado } from '../componentes/InputsEncabezado';
import { TablaObligacionesSolicitud } from '../componentes/TablaObligacionesSolicitud';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Grid, Box, FormControl, InputLabel, Select, MenuItem, TextField, TextareaAutosize, Stack, Button, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import { useEffect, useState } from 'react';
import { use_form } from '../../../../hooks/useForm';
import { useFormLocal } from '../hooks/useFormLocal';
import { faker } from '@faker-js/faker';

interface event {
  target: {
    value: string;
    name: string;
  }
}

interface bien {
  id: string;
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
  console.log('form', form_state)

  useEffect(()=>{
    let count:number = 0;
    const arr:number[] = []
    for (let i=0; i<limite; i++){
      count = count + 1
      arr.push(count)
    }
    set_arr_periodicidad(arr)
  },[limite])

  const rows = [
    {
      id: '1',
      nombreObligacion: 'Permiso 1',
      fechaInicio: '01/01/2015',
      expediente: '378765',
      nroResolucion: '378765-143',
      valorCapital: 120000000,
      valorIntereses: 35000000,
      diasMora: 390,
      valorAbonado: 21000000,
      estado: 'En Curso'
    },
    {
      id: '2',
      nombreObligacion: 'Concesion Aguas',
      fechaInicio: '01/04/2015',
      expediente: '3342765',
      nroResolucion: '3342765-4546',
      valorCapital: 190700000,
      valorIntereses: 45000000,
      diasMora: 180,
      valorAbonado: 76000000,
      estado: 'En Curso'
    },
  ];

  const columns = [
    { field: "id", header: "ID", visible: false },
    { field: "nombreObligacion", header: "Nombre Obligación", visible: true },
    { field: "fechaInicio", header: "Fecha Inicio", visible: true },
    { field: "expediente", header: "Expediente", visible: true },
    { field: "nroResolucion", header: "Nro. Resolución", visible: true },
    { field: "valorCapital", header: "Valor Capital $", visible: true },
    { field: "valorIntereses", header: "Valor Intereses $", visible: true },
    { field: "diasMora", header: "Días Mora", visible: true },
    { field: "valorAbonado", header: "Valor Abonado", visible: true },
    { field: "estado", header: "Estado", visible: true },
  ];

  const columns_bienes: GridColDef[] = [
    {
      field: 'identificacion',
      headerName: 'Identificación Bien',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'ubicacion',
      headerName: 'Ubicación',
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
          {params.value}
        </div>
      ),
    },
  ];

  return (
    <>
      <Title title='Solicitud de Facilidad de Pago - Usuario Externo' />
      <InputsEncabezado />
      <TablaObligacionesSolicitud
        showButtonExport
        tittle={'Solicitud de Facilidad de Pago - Usuario Externo: '}
        columns={columns}
        rowsData={rows}
        staticscroll={true}
        stylescroll={"780px"}
      />
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
            <Grid container spacing={10}>
              <Grid item xs={11} sm={3} >
                <TextField
                  size="small"
                  sx={{ width: '300px' }}
                  fullWidth
                  helperText='Cargar Documento Solicitud'
                  variant="outlined"
                  type="file"
                  onChange={on_input_change}
                  name='docSolicitud'
                />
              </Grid>
              <Grid item xs={11} sm={3} >
                <TextField
                  size="small"
                  sx={{ width: '300px' }}
                  fullWidth
                  helperText="Cargar Soporte Consignación"
                  variant="outlined"
                  type="file"
                  onChange={on_input_change}
                name='docConsignacion'
                />
              </Grid>
              <Grid item xs={12} sm={3}>
              <FormControl size='small' sx={{ width: '300px' }}>
                <InputLabel id="demo-simple-select-label">Calidad en que actúa la persona</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
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
                    <Grid item xs={12} sm={3} >
                      <TextField
                        size="small"
                        fullWidth
                        helperText='Carga Documento de Identidad'
                        variant="outlined"
                        type="file"
                        onChange={on_input_change}
                        name='docIdentidad'
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        id="outlined-error-helper-text"
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
                        id="outlined-error-helper-text"
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
                        id="outlined-error-helper-text"
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
                    <Grid item xs={12} sm={3} >
                      <TextField
                        size="small"
                        fullWidth
                        helperText='Carga Documento de Identidad Apoderado'
                        variant="outlined"
                        type="file"
                        onChange={on_input_change}
                        name='docIdentidad'
                      />
                    </Grid>
                    <Grid item xs={12} sm={3} >
                      <TextField
                        size="small"
                        fullWidth
                        helperText='Carga Documento Poder'
                        variant="outlined"
                        type="file"
                        onChange={on_input_change}
                        name='docPoder'
                      />
                    </Grid>
                    <Grid item xs={12} sm={3} >
                      <TextField
                        size="small"
                        fullWidth
                        helperText='Carga Cert. Existencia y Representación Legal'
                        variant="outlined"
                        type="file"
                        onChange={on_input_change}
                        name='docRepresentacionLegal'
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        id="outlined-error-helper-text"
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
                        id="outlined-error-helper-text"
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
                        id="outlined-error-helper-text"
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
                        <InputLabel id="demo-simple-select-label">Tipo Deudor Solidario</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Tipo Deudor Solidario"
                          onChange={on_input_change}
                          name='tipoDeudor'
                        >
                          <MenuItem>Ej 1</MenuItem>
                          <MenuItem>Ej 2</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3} >
                      <TextField
                        size="small"
                        fullWidth
                        helperText='Carga Documento Deudor Solidario'
                        variant="outlined"
                        type="file"
                        onChange={on_input_change}
                        name='docIdentidad'
                      />
                    </Grid>
                    <Grid item xs={12} sm={3} >
                      <TextField
                        size="small"
                        fullWidth
                        helperText='Carga Oficio Respaldando Deuda'
                        variant="outlined"
                        type="file"
                        onChange={on_input_change}
                        name='docRespaldoDeuda'
                      />
                    </Grid>
                    <Grid item xs={12} sm={3} >
                      <TextField
                        size="small"
                        fullWidth
                        helperText='Carga Cert. Existencia y Representación Legal'
                        variant="outlined"
                        type="file"
                        onChange={on_input_change}
                        name='docRepresentacionLegal'
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        id="outlined-error-helper-text"
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
                        id="outlined-error-helper-text"
                        label="Ciudad"
                        helperText='Escribe la Ciudad'
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        id="outlined-error-helper-text"
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
                  <InputLabel id="demo-simple-select-label">Periodicidad y Modalidad</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
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
                  <InputLabel id="demo-simple-select-label">{periodicidad !== '' ? `Plazo (${periodicidad})`: 'Plazo'}</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
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
                        <InputLabel id="demo-simple-select-label">Garantías Ofrecidas</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Garantías Ofrecidas"
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
                    <Grid item xs={12} sm={3}>
                      <TextField
                        size="small"
                        fullWidth
                        helperText='Carga Garantías Ofrecidas'
                        variant="outlined"
                        type="file"
                        onChange={on_input_change}
                        name='docGarantias'
                      />
                    </Grid>
                  </>
                ) : null
              }
              <Grid item xs={12} sm={3}>
                <TextField
                  size="small"
                  fullWidth
                  helperText='Carga Documento No Enajenación'
                  variant="outlined"
                  type="file"
                  onChange={on_input_change}
                  name='docEnajenacion'
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
              <TextField
                required
                size="small"
                fullWidth
                label='Identificación'
                helperText='Escribe Documento de Identidad'
                variant="outlined"
                onChange={handle_change_local}
                name='identificacion'
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="outlined-error-helper-text"
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
                id="outlined-error-helper-text"
                label="Dirección"
                helperText='Escribe la Dirección'
                size="small"
                fullWidth
                onChange={handle_change_local}
                name='direccion'
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="outlined-error-helper-text"
                helperText='Carga el Documento Impuesto'
                size="small"
                fullWidth
                type='file'
                onChange={handle_change_local}
                name='docImpuesto'
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                color='info'
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
        <Box
          component="form"
          noValidate
          autoComplete="off"
          width='350px'
        >
          <p>Observación</p>
          <TextareaAutosize
            minRows={8}
            cols={153}
            onChange={on_input_change}
            name='observacion'
          />
        </Box>
      </Grid>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: '20px', mt: '20px' }}
      >
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Aceptar términos y condiciones" />
          <FormControlLabel control={<Checkbox />} label="Autorizar notificación por correo electrónico" />
        </FormGroup>
        <Button
          color='info'
          variant='contained'
          onClick={() => {}}
        >
        Enviar Solicitud
        </Button>
      </Stack>
    </>
  )
}
