/* eslint-disable @typescript-eslint/naming-convention */
import {
  Box,
  Button,
  FormControl,
  Grid,
  Dialog,
  IconButton,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Stack,
  TextField,
  InputLabel,
  Modal,
} from '@mui/material';
import { DataGrid, GridRowId, type GridColDef } from '@mui/x-data-grid';
import {
  type Dispatch,
  useEffect,
  useRef,
  useState,
  type SetStateAction,
} from 'react';
import { javascriptGenerator } from 'blockly/javascript';
import { VisualBlockEditor } from '../visual-block-editor';
import { TransitionAlerts } from '../alert';
import { Liquidator } from '../liquidador/liquidator';
import { PruebasLiquidacionModal } from './modal/PruebasLiquidacionModal';
import type { OpcionLiquidacion } from '../../interfaces/liquidacion';
import { api } from '../../../../api/axios';
import { Add, Build, Save } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import Blockly from 'blockly';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import EditIcon from '@mui/icons-material/Edit';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import './AgregarEditarOpciones.css';
import { Title } from '../../../../components';
import { control_error, control_success } from '../../../../helpers';
import {
  ConfiguracionBasica,
  Rows,
  TipoCobro,
  TipoRenta,
  Variable,
} from './interfaces/AgregarEditarOpciones';

export interface IProps {
  borar: any;
  select_variable: any;
  opciones_liquidaciones: OpcionLiquidacion[];
  id_opcion_liquidacion: string;
  form_data: {
    variable: string;
    nombre_opcion_liquidacion: string;
    estado: string;
    nombre_variable?: string;
  };
  edit_opcion: boolean;

  set_id_opcion_liquidacion: Dispatch<SetStateAction<string>>;
  set_refresh_page: Dispatch<SetStateAction<boolean>>;
  set_form_data: Dispatch<
    SetStateAction<{
      variable: string;
      nombre_opcion_liquidacion: string;
      estado: string;
      nombre_variable: string;
    }>
  >;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarEditarOpciones = ({
  borar,
  select_variable,
  opciones_liquidaciones,
  id_opcion_liquidacion,
  form_data,
  edit_opcion,
  set_id_opcion_liquidacion,
  set_refresh_page,
  set_form_data,
}: IProps): JSX.Element => {
  const [variables, set_variables] = useState<string[]>([]);
  const [configNotify, setConfigNotify] = useState({
    open: false,
    message: '',
  });
  const [open, setOpen] = useState(false);
  const [enableTest, setEnableTest] = useState(false);
  const [modal_pruebas, set_modal_pruebas] = useState<boolean>(false);
  const [open_notification_modal, set_open_notification_modal] =
    useState<boolean>(false);
  const [valores, setvalores] = useState<Variable[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariableName, setSelectedVariableName] = useState('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [tiposRenta, setTiposRenta] = useState<TipoRenta[]>([]);
  const [tiposCobro, setTiposCobro] = useState<TipoCobro[]>([]);
  const [formValues, setFormValues] = useState<ConfiguracionBasica>({
    id_variables: '',
    nombre: '',
    tipo_cobro: '',
    tipo_renta: '',
    variable: '',
  });
  const primaryWorkspace = useRef<any>();
  const [row, set_row] = useState<Rows[]>([]);
  const [selectedVariables, setSelectedVariables] = useState<{
    [key: string]: string | null;
  }>(
    variables.reduce(
      (acc, variableName) => ({ ...acc, [variableName]: null }),
      {}
    )
  );

  const handle_estado_change: (event: SelectChangeEvent) => void = (
    event: SelectChangeEvent
  ) => {
    set_form_data({
      ...form_data,
      estado: event.target.value,
      nombre_variable: '',
    });
  };

  const setNotifications = (notification: any) => {
    setConfigNotify(notification);
    if (notification.type === 'error') {
      setEnableTest(false);
    }
  };

  const handle_input_change = (event: any) => {
    const { name, value } = event.target;

    if (name === 'variable') {
      try {
        // Intentamos parsear el valor solo si proviene del select
        const parsedValue = JSON.parse(value);
        set_form_data((prevState: any) => ({
          ...prevState,
          variable: parsedValue.valor,
          nombre_variable: parsedValue.nombre,
        }));
      } catch (error) {
        console.error('Invalid JSON:', error);
        // Si el valor no es un JSON válido (escribiendo en el TextField)
        set_form_data((prevState: any) => ({
          ...prevState,
          variable: value, // Permitimos que el usuario vea el valor en el TextField
          nombre_variable: null,
        }));
      }
    } else {
      set_form_data((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const generateCode = () => {
    let code = javascriptGenerator.workspaceToCode(primaryWorkspace.current);
    let lines = code.split('\n');
    lines.shift();
    code = lines.join('\n');
    code = code.replace(/\n/g, '');
    return code;
  };

  const removeVariable = (variable: any) => {
    set_variables(variables.filter((v) => v !== variable));
    /**
     * remove variable from workspace
     */
    if (primaryWorkspace.current) {
      const currentVar = primaryWorkspace.current.getVariable(variable);
      if (currentVar) {
        primaryWorkspace.current.deleteVariableById(currentVar.id_);
      }
    }
  };

  const handleSubmit = (event: any) => {
    if (/\b(var)\b/.test(form_data.variable)) {
      control_error(
        'El nombre de la variable var es una palabra reservada que no se debe usar. Por favor ingrese otro nombre diferente  '
      );
      set_open_notification_modal(true);
      return;
    }
    if (variables.includes(form_data.variable)) {
      // set_notification_info({ type: 'warning', message: `Ya existe la variable ${form_data.variable}` });
      control_error(`Ya existe la variable ${form_data.variable}`);
      set_open_notification_modal(true);
      return;
    }

    event.preventDefault();
    set_form_data((prevState) => ({
      ...prevState,
      variable: '',
    }));

    set_variables([
      ...Array.from(
        new Set([...variables, form_data.variable.replace(/\s/g, '_')])
      ),
    ]);

    const newRow = {
      id: row.length + 1,
      parametros: form_data.nombre_opcion_liquidacion,
      tipo: 'Tipo nuevo',
      opciones: '',
      variable: '',
      nombre: form_data.variable.replace(/\s/g, '_'),
      valor: form_data.nombre_variable,
    };
    set_row([...row, newRow]);
  };

  const handle_test_click = (event: any) => {
    event.preventDefault();
    if (variables.length === 0) {
      control_error('No hay variables para procesar. ');
      set_open_notification_modal(true);
      setEnableTest(false);
      return;
    }

    if (primaryWorkspace?.current?.getAllBlocks()?.length === 0) {
      control_error('No hay un diseño para procesar. ');
      set_open_notification_modal(true);
      setEnableTest(false);
      return;
    }

    setEnableTest(true);
    setOpen(true);
  };

  // POST Crear opción liquidación
  const transformRowToObject = (row: any[]) => {
    return row.reduce((accumulator: { [x: string]: any; }, current: { nombre: string | number; valor: any; }) => {
      accumulator[current.nombre] = current.valor;
      return accumulator;
    }, {});
  };
  
  const handle_post_opcion_liquidacion = () => {
    if (variables.length === 0) {
      control_error(
        'No hay variables. Asegúrese de agregar por lo menos una variable.'
      );
      set_open_notification_modal(true);
      return;
    }
    if (primaryWorkspace?.current?.getAllBlocks()?.length === 0) {
      control_error(`No hay un diseño.
      Asegúrese de agregar una combinación de bloques.`);

      set_open_notification_modal(true);
      return;
    }

    if (form_data.nombre_opcion_liquidacion === '' || form_data.estado === '') {
      control_error(`Estos campos no pueden estar vacíos.
      Asegúrese de escribir un nombre y de seleccionar un estado.`);
      set_open_notification_modal(true);
      return;
    }

    const json = Blockly.serialization.workspaces.save(
      primaryWorkspace.current
    );
    const variablesObject = transformRowToObject(row);
    if (edit_opcion) {
      api
        .put(
          `recaudo/liquidaciones/opciones-liquidacion-base/${id_opcion_liquidacion}/`,
          {
            nombre: form_data.nombre_opcion_liquidacion,
            funcion: generateCode(),
            estado: form_data.estado,
            variables: variablesObject,
            // Object.keys(selectedVariables).reduce(
            //   (acumulador, nombreVariable) => ({
            //     ...acumulador,
            //     [nombreVariable]: selectedVariables[nombreVariable],
            //   }),
            //   {}
            // ),
            tipo_renta: formValues.tipo_renta,
            tipo_cobro: formValues.tipo_cobro,
            bloques: JSON.stringify(json),
          }
        )
        .then((response) => {
          control_success(
            `Se editó correctamente la opción de liquidación "${form_data.nombre_opcion_liquidacion}".`
          );
          set_open_notification_modal(true);
          set_refresh_page(true);
        })
        .catch((error: any) => {
          control_error(error.response.data.detail);
          // control_error(error.response.data.detail);
          set_open_notification_modal(true);
        });
    } else {
      api
        .post('recaudo/liquidaciones/opciones-liquidacion-base/', {
          nombre: form_data.nombre_opcion_liquidacion,
          funcion: generateCode(),
          estado: form_data.estado,
          variables: variablesObject,
          // Object.keys(selectedVariables).reduce(
          //   (acumulador, nombreVariable) => ({
          //     ...acumulador,
          //     [nombreVariable]: selectedVariables[nombreVariable],
          //   }),
          //   {}
          // ),
          tipo_renta: formValues.tipo_renta,
          tipo_cobro: formValues.tipo_cobro,

          bloques: JSON.stringify(json),
        })
        .then((response) => {
          // set_notification_info({ type: 'success', message: `Se creó correctamente la opción de liquidación "${form_data.nombre_opcion_liquidacion}".` });
          control_success(
            ` Se creó correctamente la opción de liquidación ${form_data.nombre_opcion_liquidacion} `
          );
          set_open_notification_modal(true);
          set_refresh_page(true);
        })
        .catch((error: any) => {
          // set_notification_info({ type: 'error', message: error.response.data?.nombre[0] ?? 'Hubo un error' });
          control_error(error.response.data.detail);
          set_open_notification_modal(true);
        });
    }
  };

  const column: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 1,
    },
    {
      field: 'valor',
      headerName: 'Valor',
      flex: 1,
      editable: false, // Puedes hacer esta columna editable si lo deseas
    },

    {
      field: 'acciones',
      headerName: 'Acciones',
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            color="error"
            onClick={() => {
              const updatedRow = row.filter((item) => item.id !== params.id);
              set_row(updatedRow);
              removeVariable(params.row.nombre);
            }}
            disabled={borar}
          >
            <RemoveCircleOutlinedIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const fetchVariables = async () => {
    try {
      const res = await api.get(
        '/recaudo/configuracion_baisca/valoresvariables/get/'
      );
      setvalores(res.data.data);
    } catch (error) {
      console.error('Error al obtener las variables', error);
    }
  };

  const fetchTiposRenta = async () => {
    try {
      const res = await api.get('/recaudo/configuracion_baisca/tiporenta/get/');
      setTiposRenta(res.data.data);
    } catch (error) {
      console.error('Error al obtener los tipos de renta', error);
    }
  };

  const fetchTiposCobro = async () => {
    try {
      const res = await api.get('/recaudo/configuracion_baisca/tipoCobro/get/');
      setTiposCobro(res.data.data);
    } catch (error) {
      console.error('Error al obtener los tipos de renta', error);
    }
  };

  useEffect(() => {
    if (id_opcion_liquidacion) {
      const opcion_liquidacion: OpcionLiquidacion | undefined =
        opciones_liquidaciones.find(
          (opc) => opc.id === Number(id_opcion_liquidacion)
        );
      if (opcion_liquidacion) {
        const new_rows: Rows[] | any = Object.keys(
          opcion_liquidacion.variables
        ).map((key, index) => ({
          id: index,
          nombre: key,
          valor: opcion_liquidacion.variables[key],  
        }));
        set_row(new_rows);
        set_variables(Object.keys(opcion_liquidacion.variables));
        Blockly.serialization.workspaces.load(
          JSON.parse(opcion_liquidacion.bloques),
          primaryWorkspace.current
        );
      }
    }
  }, [id_opcion_liquidacion, opciones_liquidaciones]); // Asegura incluir todas las dependencias necesarias

  useEffect(() => {
    fetchTiposCobro();
    fetchTiposRenta();
    fetchVariables();
  }, []);

  useEffect(() => {
    setSelectedVariables(
      variables.reduce(
        (acc, variableName) => ({ ...acc, [variableName]: null }),
        {}
      )
    );
  }, [variables]);
  // const transformRowToObject = (row:any) => {
  //   return row.reduce((accumulator: { [x: string]: any; }, current: { nombre: string | number; valor: any; }) => {
  //     accumulator[current.nombre] = current.valor;
  //     return accumulator;
  //   }, {});
  // };

  useEffect(() => {
    const transformedObject = transformRowToObject(row);
    console.log(transformedObject); // { VH: "400000.00" }
  }, [row]);


  const consol = (): void => {
    const variables = Object.keys(selectedVariables).reduce(
      (acumulador, nombreVariable) => ({
        ...acumulador,
        [nombreVariable]: selectedVariables[nombreVariable],
      }),
      {}
    );
    console.log(variables);
    console.log(row);
    
  };
  return (
    <>
      {/* <Button
        color="success"
        variant="contained"
        startIcon={<SaveIcon />}
        onClick={consol}
      >
        co
      </Button> */}
      <>
        <Grid container spacing={2} sx={{ my: '10px' }}>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              required
              fullWidth
              size="small"
              variant="outlined"
              label="Tipo de renta"
              name="tipo_renta"
              onChange={handleInputChange}
              value={formValues.tipo_renta}
            >
              {tiposRenta.map((tipo) => (
                <MenuItem key={tipo.id_tipo_renta} value={tipo.id_tipo_renta}>
                  {tipo.nombre_tipo_renta}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              select
              required
              fullWidth
              size="small"
              variant="outlined"
              label="Tipo cobro"
              name="tipo_cobro"
              onChange={handleInputChange}
              value={formValues.tipo_cobro}
            >
              {tiposCobro
                .filter(
                  (tipoCobro) =>
                    tipoCobro.tipo_renta_asociado === formValues.tipo_renta
                ) // Filtrado basado en la selección de tipo_renta
                .map((tipoCobro) => (
                  <MenuItem
                    key={tipoCobro.id_tipo_cobro}
                    value={tipoCobro.id_tipo_cobro}
                  >
                    {tipoCobro.nombre_tipo_cobro}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              select
              required
              fullWidth
              size="small"
              variant="outlined"
              label="Variables"
              name="variable"
              onChange={handle_input_change}
              value={
                JSON.stringify({
                  nombre: form_data.nombre_variable,
                  valor: form_data.variable,
                }) || ''
              }
            >
              {valores
                .filter(
                  (variable) =>
                    variable.id_tipo_renta === formValues.tipo_renta &&
                    variable.id_tipo_cobro === formValues.tipo_cobro
                )
                .map((variable) => (
                  <MenuItem
                    key={variable.id_valores_variables}
                    value={JSON.stringify({
                      nombre: variable.valor,
                      valor: variable.nombre_variable,
                    })}
                  >
                    {variable.nombre_variable}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Ingresa una variable"
              name="variable"
              required
              autoComplete="off"
              value={form_data.variable || ''}
              onChange={handle_input_change}
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <Button
              disabled={!form_data.variable || borar}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              startIcon={<Add />}
              fullWidth
            >
              Agregar variable
            </Button>
          </Grid>
        </Grid>
        {/* FIN TEST */}
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <DataGrid
              density="standard"
              autoHeight
              rows={row}
              columns={column}
            />
          </Grid>
        </Grid>

        <Box
          display="flex"
          justifyContent="flex-start"
          sx={{
            margin: '5px',
            padding: '10px',
            height: '410px',
          }}
        >
          <Grid>
            <VisualBlockEditor
              variables={variables}
              workspace={primaryWorkspace}
              readOnly={false}
            />
            <TransitionAlerts
              configNotify={configNotify}
              setNotifications={setNotifications}
            />
          </Grid>
        </Box>
        <Stack
          direction="row"
          justifyContent="center"
          alignContent="center"
          sx={{
            margin: '30px 0',
          }}
        >
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handle_test_click}
              startIcon={<Build />}
              fullWidth
            >
              Probar las variables
            </Button>
          </Grid>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ my: '50px' }}
        >
          <Grid item xs={3}>
            <TextField
              label="Ingrese nombre opción liquidacion"
              name="nombre_opcion_liquidacion"
              value={form_data.nombre_opcion_liquidacion}
              required
              autoComplete="off"
              onChange={handle_input_change}
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl size="small" fullWidth>
              <InputLabel>Selecciona un estado</InputLabel>
              <Select
                label="Selecciona un estado"
                value={form_data.estado}
                onChange={handle_estado_change}
              >
                <MenuItem value={0}>En construcción</MenuItem>
                <MenuItem value={1}>Activa</MenuItem>
                <MenuItem value={2}>Inactiva</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Button
              color="success"
              variant="contained"
              onClick={handle_post_opcion_liquidacion}
              startIcon={edit_opcion ? <EditIcon /> : <Save />}
              fullWidth
            >
              {edit_opcion ? 'Editar ' : 'Guardar '}opción liquidación
            </Button>
          </Grid>
        </Stack>
      </>
      <PruebasLiquidacionModal
        is_modal_active={modal_pruebas}
        set_is_modal_active={set_modal_pruebas}
      />
      {enableTest && open && (
        <Modal
          className="modal-container-liquidacion"
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <div className="modal-liquidacion">
            <Liquidator
              setNotifications={setNotifications}
              variables={variables}
              selectedVariables={selectedVariables}
              generateCode={generateCode}
              preview
              handle_close={setOpen}
            />
          </div>
        </Modal>
      )}
    </>
  );
};
