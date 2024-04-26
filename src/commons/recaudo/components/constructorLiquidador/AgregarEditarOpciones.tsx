/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Avatar,
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
  Switch,
  // TextareaAutosize
} from "@mui/material"
import { DataGrid, GridRowId, type GridColDef } from "@mui/x-data-grid";
import { type Dispatch, useEffect, useRef, useState, type SetStateAction } from 'react';
import { javascriptGenerator } from 'blockly/javascript';
import { VisualBlockEditor } from "../visual-block-editor";
import { TransitionAlerts } from "../alert";
import { Liquidator } from "../liquidador/liquidator";
import { PruebasLiquidacionModal } from "./modal/PruebasLiquidacionModal";
import type { OpcionLiquidacion } from "../../interfaces/liquidacion";
import { api } from "../../../../api/axios";
import { Add, Build, Save } from "@mui/icons-material";
import SaveIcon from '@mui/icons-material/Save';
import { NotificationModal } from "../NotificationModal";
import Blockly from 'blockly';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import EditIcon from '@mui/icons-material/Edit';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

import './AgregarEditarOpciones.css';
import { Title } from "../../../../components";
import { control_error, control_success } from "../../../../helpers";
// import { control_success } from "../../../../helpers";
// import { control_error } from '../../../almacen/gestionDeInventario/movimientos/store/thunks/entregaThunks';

interface Rows {
  id: number;
  nombre: string;
  variable: any;
}
interface TipoCobro {
  id_tipo_cobro: number;
  nombre_tipo_cobro: string;
  tipo_renta_asociado: any;
}
interface TipoRenta {
  id_tipo_renta: number;
  nombre_tipo_renta: string;
  tipo_cobro_asociado: any;
  tipo_renta_asociado: any
}
interface ConfiguracionBasica {
  id_variables: any;
  nombre: any;
  tipo_cobro: any;
  tipo_renta: any;
}
interface Variable {
  id_valores_variables: number;
  variables: string;
  nombre_variable: string;
  tipo_cobro: number;
  tipo_renta: number;
  valor: any;
}
interface IProps {
  borar: any;
  select_variable: any;
  opciones_liquidaciones: OpcionLiquidacion[];
  id_opcion_liquidacion: string;
  form_data: { variable: string, nombre_opcion_liquidacion: string, estado: string };
  edit_opcion: boolean;

  set_id_opcion_liquidacion: Dispatch<SetStateAction<string>>;
  set_refresh_page: Dispatch<SetStateAction<boolean>>;
  set_form_data: Dispatch<SetStateAction<{ variable: string, nombre_opcion_liquidacion: string, estado: string }>>
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
  set_form_data

}: IProps): JSX.Element => {
  const [variables, set_variables] = useState<string[]>([]);
  const [configNotify, setConfigNotify] = useState({ open: false, message: '' });
  const [open, setOpen] = useState(false);
  const [enableTest, setEnableTest] = useState(false);
  const [modal_pruebas, set_modal_pruebas] = useState<boolean>(false);
  const [open_notification_modal, set_open_notification_modal] = useState<boolean>(false);
  const [notification_info, set_notification_info] = useState({ type: '', message: '' });
  const primaryWorkspace = useRef<any>();

  const [row, set_row] = useState<Rows[]>([]);
  const [selectedVariables, setSelectedVariables] = useState<{ [key: string]: string | null }>(
    variables.reduce((acc, variableName) => ({ ...acc, [variableName]: null }), {})
  );

  useEffect(() => {
    if (id_opcion_liquidacion) {
      const opcion_liquidacion: OpcionLiquidacion | undefined = opciones_liquidaciones.find(opc => opc.id === Number(id_opcion_liquidacion));
      if (opcion_liquidacion) {
        const new_rows: Rows[] | any = Object.keys(opcion_liquidacion.variables).map((key, index) => ({
          id: index,
          nombre: key,
          valor: opcion_liquidacion.variables[key],  // Asigna el valor existente o una cadena vacía si no hay valor
        }));
        set_row(new_rows);
        set_variables(Object.keys(opcion_liquidacion.variables));
        Blockly.serialization.workspaces.load(JSON.parse(opcion_liquidacion.bloques), primaryWorkspace.current);
      }
    }
  }, [id_opcion_liquidacion, opciones_liquidaciones]);  // Asegura incluir todas las dependencias necesarias


  const handle_id_opcion_change: (event: SelectChangeEvent) => void = (event: SelectChangeEvent) => {
    set_id_opcion_liquidacion(event.target.value);
  };

  const handle_estado_change: (event: SelectChangeEvent) => void = (event: SelectChangeEvent) => {
    set_form_data({ ...form_data, estado: event.target.value });
  };

  const setNotifications = (notification: any) => {
    setConfigNotify(notification);
    if (notification.type === 'error') {
      setEnableTest(false);
    }
  }

  const handle_input_change = (event: any) => {
    const { name, value } = event.target;
    set_form_data({ ...form_data, [name]: value });
  };

  const [formValues, setFormValues] = useState<ConfiguracionBasica>({
    id_variables: "",
    nombre: "",
    tipo_cobro: "",
    tipo_renta: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const generateCode = () => {
    // //  console.log('')("primaryWorkspace.current:", primaryWorkspace.current)
    // const code = javascriptGenerator.workspaceToCode(primaryWorkspace.current);
    // const code = javascriptGenerator.statementToCode(primaryWorkspace.current, 'DO');
    // setNotifications({ open: true, message: 'Se ha procesado', type: 'success' });
    // return code

    let code = javascriptGenerator.workspaceToCode(primaryWorkspace.current);
    // Convertir el código en un arreglo de líneas
    let lines = code.split('\n');
    // Filtrar las líneas que contienen declaraciones de variables
    lines.shift();
    // Unir las líneas filtradas para obtener el código final
    code = lines.join('\n');
    // Eliminar los saltos de línea del código final
    code = code.replace(/\n/g, '');
    // setNotifications({ open: true, message: 'Se ha procesado', type: 'success' });
    return code;
  }

  const removeVariable = (variable: any) => {
    set_variables(variables.filter((v) => v !== variable));
    /**
     * remove variable from workspace
     */
    if (primaryWorkspace.current) {
      const currentVar = primaryWorkspace.current.getVariable(variable);
      if (currentVar) {
        primaryWorkspace.current.deleteVariableById(currentVar.id_)
      }
    }
  }

  const handleSubmit = (event: any) => {
    if (/\b(var)\b/.test(form_data.variable)) {
      // set_notification_info({
      //   type: 'warning',
      //   message: `El nombre de la variable var es una palabra reservada que no se debe usar.
      //   Por favor ingrese otro nombre diferente.`,
      // });
      control_error("El nombre de la variable var es una palabra reservada que no se debe usar. Por favor ingrese otro nombre diferente  ")
      set_open_notification_modal(true);
      return;
    }

    if (variables.includes(form_data.variable)) {
      // set_notification_info({ type: 'warning', message: `Ya existe la variable ${form_data.variable}` });
      control_error(`Ya existe la variable ${form_data.variable}`)

      set_open_notification_modal(true);
      return;
    }

    event.preventDefault();
    set_form_data(prevState => ({
      ...prevState,
      variable: ''
    }));


    set_variables([
      ...Array.from(new Set([...variables, form_data.variable.replace(/\s/g, '_')]))
    ]);

    const newRow = {
      id: row.length + 1,
      parametros: form_data.nombre_opcion_liquidacion,
      nombre: form_data.variable.replace(/\s/g, '_'),
      tipo: 'Tipo nuevo',
      opciones: '',
      variable: ""
    };

    set_row([...row, newRow]);
  };

  const handle_test_click = (event: any) => {
    event.preventDefault();
    if (variables.length === 0) {
      // set_notification_info({ type: 'warning', message: 'No hay variables para procesar.' });
      control_error("No hay variables para procesar. ")
      set_open_notification_modal(true);
      setEnableTest(false);
      return;
    }

    if (primaryWorkspace?.current?.getAllBlocks()?.length === 0) {
      // set_notification_info({ type: 'warning', message: 'No hay un diseño para procesar.' });
      control_error("No hay un diseño para procesar. ")
      set_open_notification_modal(true);
      setEnableTest(false);
      return;
    }

    setEnableTest(true);
    setOpen(true);
  };

  // POST Crear opción liquidación
  const handle_post_opcion_liquidacion = () => {
    if (variables.length === 0) {
      // set_notification_info({
      //   type: 'warning',
      //   message: `No hay variables.
      //   Asegúrese de agregar por lo menos una variable.`

      // });
      control_error("No hay variables. Asegúrese de agregar por lo menos una variable.")
      set_open_notification_modal(true);
      return;
    }

    if (primaryWorkspace?.current?.getAllBlocks()?.length === 0) {
      // set_notification_info({
      //   type: 'error',
      //   message: `No hay un diseño.
      //   Asegúrese de agregar una combinación de bloques.`
      // });
      control_error(`No hay un diseño.
      Asegúrese de agregar una combinación de bloques.`)

      set_open_notification_modal(true);
      return;
    }

    if (form_data.nombre_opcion_liquidacion === '' || form_data.estado === '') {
      // set_notification_info({
      //   type: 'warning',
      //   message: `Estos campos no pueden estar vacíos.
      //   Asegúrese de escribir un nombre y de seleccionar un estado.`,
      // });
      control_error(`Estos campos no pueden estar vacíos.
      Asegúrese de escribir un nombre y de seleccionar un estado.`)
      set_open_notification_modal(true);
      return;
    }

    const json = Blockly.serialization.workspaces.save(primaryWorkspace.current);
    if (edit_opcion) {
      api.put(`recaudo/liquidaciones/opciones-liquidacion-base/${id_opcion_liquidacion}/`, {
        nombre: form_data.nombre_opcion_liquidacion,
        funcion: generateCode(),
        estado: form_data.estado,
        variables: Object.keys(selectedVariables).reduce((acumulador, nombreVariable) => ({
          ...acumulador,
          [nombreVariable]: selectedVariables[nombreVariable],
        }), {}),
        tipo_renta: formValues.tipo_renta,
        tipo_cobro: formValues.tipo_cobro,
        bloques: JSON.stringify(json),
      })
        .then((response) => {
          // set_notification_info({ type: 'success', message: `Se editó correctamente la opción de liquidación "${form_data.nombre_opcion_liquidacion}".` });
          control_success(`Se editó correctamente la opción de liquidación "${form_data.nombre_opcion_liquidacion}".`)
          set_open_notification_modal(true);
          set_refresh_page(true);
        })
        .catch((error: any) => {
          //  console.log('')(error);
          // set_notification_info({ type: 'error', message: `Hubo un error.` });
          control_error(error.response.data.detail);
          set_open_notification_modal(true);
        });
    } else {
      api.post('recaudo/liquidaciones/opciones-liquidacion-base/', {
        nombre: form_data.nombre_opcion_liquidacion,
        funcion: generateCode(),
        estado: form_data.estado,
        variables: Object.keys(selectedVariables).reduce((acumulador, nombreVariable) => ({
          ...acumulador,
          [nombreVariable]: selectedVariables[nombreVariable],
        }), {}),
        tipo_renta: formValues.tipo_renta,
        tipo_cobro: formValues.tipo_cobro,

        bloques: JSON.stringify(json),
      })
        .then((response) => {
          // set_notification_info({ type: 'success', message: `Se creó correctamente la opción de liquidación "${form_data.nombre_opcion_liquidacion}".` });
          control_success(` Se creó correctamente la opción de liquidación ${form_data.nombre_opcion_liquidacion} `)
          set_open_notification_modal(true);
          set_refresh_page(true);
        })
        .catch((error: any) => {
          // set_notification_info({ type: 'error', message: error.response.data?.nombre[0] ?? 'Hubo un error' });
          control_error(error.response.data.detail);
          set_open_notification_modal(true);
        });
    }
  }
  const [activeSwitches, setActiveSwitches] = useState<{ [key in GridRowId]: boolean }>({});

  const handleSwitchChange = (id: GridRowId, isChecked: boolean) => {
    if (isChecked) {
      setActiveSwitches({ [id]: true });
    } else {
      setActiveSwitches(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
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
              removeVariable(params.row.nombre)
            }}
            disabled={borar}
          >
            <RemoveCircleOutlinedIcon />
          </IconButton>


          {/* <IconButton

            onClick={() => {
              const updatedRow = row.filter((item) => item.id !== params.id);
              set_row(updatedRow);
              removeVariable(params.row.nombre)
            }}
          >
            <Avatar
              sx={{
                width: 24,
                height: 24,
                background: '#fff',
                border: '2px solid',
              }}
              variant="rounded"
            >
              <RemoveCircleOutlinedIcon
                color="error"
                sx={{ width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton> */}

          <IconButton
            color="primary"
            onClick={() => {
              handleOpenModal(params.row.nombre),
                handleSwitchChange(params.id, !activeSwitches[params.id])
              setIsModalOpen(true)
            }}
            aria-label="Ver"
          >

            <PlaylistAddCheckIcon />
          </IconButton>


        </>
      ),
    },
    {
      field: 'valor',
      headerName: 'Valor',
      flex: 1,
      editable: false,  // Puedes hacer esta columna editable si lo deseas
    },

    // {
    //   field: 'valor variable',
    //   headerName: 'valor variable',
    //   width: 400,
    //   renderCell: (params) => (
    //     <>
    //       {activeSwitches[params.id] ?
    //         <>
    //           <Grid container spacing={2} >
    //             <Grid item xs={12} sm={7}>
    //               <FormControl size="small" fullWidth>
    //                 <InputLabel>Valor variable</InputLabel>
    //                 <Select
    //                   value={searchTerm}
    //                   onChange={(event) => {
    //                     handleSelectChange(event);
    //                     setSearchTerm(event.target.value as string);
    //                   }}
    //                   label="Valor variable"
    //                 >
    //                   {valores.map((variable) => (
    //                     <MenuItem key={variable.id_valores_variables} value={variable.valor}>
    //                       {variable.nombre_variable}
    //                     </MenuItem>
    //                   ))}
    //                 </Select>
    //               </FormControl>
    //             </Grid>
    //             <Grid item >
    //               <Button color='success'
    //                 variant='contained'
    //                 startIcon={<SaveIcon />}
    //                 onClick={handleSave}>
    //               </Button>
    //             </Grid>
    //           </Grid>
    //         </> : ''}
    //     </>
    //   ),
    // },

  ];


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariableName, setSelectedVariableName] = useState("");


  const [selectedVariableNames, setSelectedVariableNames] = useState<string[]>([]);

  // const handleSave = () => {
  //   const updatedRows = row.map(r => {
  //     if (r.nombre === selectedVariableName) {  // Comprueba si el nombre de la variable coincide
  //       return { ...r, valor: selectedVariables[selectedVariableName] };  // Actualiza el valor de la variable
  //     }
  //     return r;
  //   });
  //   set_row(updatedRows);  // Establece el estado actualizado

  //   setActiveSwitches({ [0]: false });
  //   setSelectedVariableNames(prev => {
  //     if (!prev.includes(selectedVariableName)) {
  //       return [...prev, selectedVariableName];
  //     }
  //     return prev;
  //   });
  //   control_success("Variable asignada ");
  //   setIsModalOpen(false);
  // };
  const handleSave = () => {
    const updatedRows = row.map(r => {
      // Comprueba si el nombre de la variable coincide y si existe un valor seleccionado para actualizar
      if (r.nombre === selectedVariableName && selectedVariables[selectedVariableName] !== undefined) {
        return { ...r, valor: selectedVariables[selectedVariableName] };  // Actualiza el valor de la variable
      }
      return r;  // Devuelve la fila sin cambios si no es la variable seleccionada o no hay valor nuevo definido
    });

    set_row(updatedRows);  // Establece el estado actualizado de las filas

    setActiveSwitches({ [0]: false });
    setSelectedVariableNames(prev => {
      if (!prev.includes(selectedVariableName)) {
        return [...prev, selectedVariableName];
      }
      return prev;
    });
    control_success("Variable asignada");
    setIsModalOpen(false);
  };


  const handleOpenModal = (variableName: any) => {
    setSelectedVariableName(variableName); // Asumiendo que tienes una función para esto
    // setIsModalOpen(true);
  };


  const [valores, setvalores] = useState<Variable[]>([]);
  const [selectedVariable, setSelectedVariable] = useState<any>(null);



  useEffect(() => {
    setSelectedVariables(variables.reduce((acc, variableName) => ({ ...acc, [variableName]: null }), {}));
  }, [variables]);


  const handleSelectChange = (event: SelectChangeEvent) => {
    const value = event.target.value; // El valor que el usuario asigna a la variable seleccionada
    setSelectedVariables(prev => ({
      ...prev,
      [selectedVariableName]: value,
    }));
  };




  const fetchVariables = async () => {
    try {
      const res = await api.get("/recaudo/configuracion_baisca/valoresvariables/get/");
      setvalores(res.data.data);
    } catch (error) {
      console.error("Error al obtener las variables", error);
    }
  };

  useEffect(() => {
    fetchVariables();
  }, []);

  const handleClick = () => {
    console.log( borar);
    console.log("2222222");
 



  };

  const [is_buscar, set_is_buscar] = useState<boolean>(true);
  const handle_open_buscar = (): void => {
    set_is_buscar(true);
  };
  const handle_close = (): void => {
    set_is_buscar(false);
    setIsModalOpen(false)

    // control_success("Variable asignada ");

  };
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [tiposRenta, setTiposRenta] = useState<TipoRenta[]>([]);

  const fetchTiposRenta = async () => {
    try {
      const res = await api.get("/recaudo/configuracion_baisca/tiporenta/get/");
      setTiposRenta(res.data.data);
    } catch (error) {
      console.error("Error al obtener los tipos de renta", error);
    }
  };

  useEffect(() => {
    fetchTiposRenta();
  }, []);


  const [tiposCobro, setTiposCobro] = useState<TipoCobro[]>([]);

  const fetchTiposCobro = async () => {
    try {
      const res = await api.get("/recaudo/configuracion_baisca/tipoCobro/get/");
      setTiposCobro(res.data.data);
    } catch (error) {
      console.error("Error al obtener los tipos de renta", error);
    }
  };

  useEffect(() => {
    fetchTiposCobro();
  }, []);



  return (
    <>

      <>

        {/* <Button color='success'
          variant='contained'
          onClick={handleClick}>CONSOLE </Button> */}

        {/* INICIO TEST */}

        <Grid container spacing={2} sx={{ my: '10px' }}>

          <Dialog
            keepMounted
            aria-describedby="alert-dialog-slide-description"
            open={isModalOpen}
            onClose={handle_close}
            maxWidth="xl"
          >

            <Grid
              container spacing={2}
              sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26'
              }}
            >
              {/* <Grid item xs={12} sm={12}>
                <Title title="Asignar variable ${selectedVariableName}" />
              </Grid> */}
              <Grid item xs={12} sm={12}>
                <Title title={`Asignar variable ${selectedVariableName} `} />
              </Grid>

              {/* <h2>{selectedVariableName}</h2> */}
              <Grid item xs={12} sm={12}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Valor variable</InputLabel>
                  <Select
                    value={searchTerm}
                    onChange={(event) => {
                      handleSelectChange(event);
                      setSearchTerm(event.target.value as string);
                    }}
                    label="Valor variable"
                  >
                    {valores.map((variable) => (
                      <MenuItem key={variable.id_valores_variables} value={variable.valor}>
                        {variable.nombre_variable}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button color='success'
                  variant='contained'
                  startIcon={<SaveIcon />}
                  onClick={handleSave}>Guardar</Button>
              </Grid>

            </Grid>

          </Dialog>






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
                .filter(tipoCobro => tipoCobro.tipo_renta_asociado === formValues.tipo_renta) // Filtrado basado en la selección de tipo_renta
                .map((tipoCobro) => (
                  <MenuItem key={tipoCobro.id_tipo_cobro} value={tipoCobro.id_tipo_cobro}>
                    {tipoCobro.nombre_tipo_cobro}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
















          {/* <Grid item xs={12} sm={4.5}>
            <FormControl size="small" fullWidth>
              <InputLabel>Selecciona opción liquidación</InputLabel>
              <Select
                label='Selecciona opción liquidación'
                value={id_opcion_liquidacion}
                MenuProps={{
                  style: {
                    maxHeight: 224,
                  }
                }}
                onChange={handle_id_opcion_change}
              >
                {opciones_liquidaciones.map((opc_liquidacion) => (
                  <MenuItem
                    key={opc_liquidacion?.id}
                    value={opc_liquidacion?.id}
                  >
                    {opc_liquidacion?.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid> */}



          <Grid item xs={12} sm={4}>
            <TextField
              label="Ingresa una variable"
              name="variable"
              required
              autoComplete="off"
              value={form_data.variable}
              onChange={handle_input_change}
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
            
              disabled={!form_data.variable || borar }
              variant="contained" color="primary" onClick={handleSubmit}
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
            margin: "5px",
            padding: "10px",
            height: "410px",
          }}
        >
          <Grid>
            <VisualBlockEditor
              variables={variables}
              workspace={primaryWorkspace}
              readOnly={false}
            />
            <TransitionAlerts configNotify={configNotify} setNotifications={setNotifications} />
          </Grid>
        </Box>
        <Stack
          direction='row'
          justifyContent='center'
          alignContent='center'
          sx={{
            margin: '30px 0'
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
                label='Selecciona un estado'
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
              color='success'
              variant='contained'
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
      {(enableTest && open) && (
        <Modal className='modal-container-liquidacion' open={open} onClose={() => { setOpen(false) }}>
          <div className='modal-liquidacion'>
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
      {/* <NotificationModal
        open_notification_modal={open_notification_modal}
        set_open_notification_modal={set_open_notification_modal}
        notification_info={notification_info}
      /> */}




    </>
  )
}