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
  IconButton,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Stack,
  TextField,
  InputLabel,
  Modal,
  // TextareaAutosize
} from "@mui/material"
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { type Dispatch, useEffect, useRef, useState, type SetStateAction } from 'react';
import { javascriptGenerator } from 'blockly/javascript';
import { VisualBlockEditor } from "../visual-block-editor";
import { TransitionAlerts } from "../alert";
import { Liquidator } from "../liquidador/liquidator";
import { PruebasLiquidacionModal } from "./modal/PruebasLiquidacionModal";
import type { OpcionLiquidacion } from "../../interfaces/liquidacion";
import { api } from "../../../../api/axios";
import { Add, Build, Save } from "@mui/icons-material";
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import { NotificationModal } from "../NotificationModal";
import Blockly from 'blockly';
import './AgregarEditarOpciones.css';

interface Rows {
  id: number;
  nombre: string;
}

interface IProps {
  opciones_liquidaciones: OpcionLiquidacion[];
  id_opcion_liquidacion: string;
  form_data: { variable: string, nombre_opcion_liquidacion: string, estado: string };
  set_id_opcion_liquidacion: Dispatch<SetStateAction<string>>;
  set_refresh_page: Dispatch<SetStateAction<boolean>>;
  set_form_data: Dispatch<SetStateAction<{ variable: string, nombre_opcion_liquidacion: string, estado: string }>>
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarEditarOpciones = ({
  opciones_liquidaciones,
  id_opcion_liquidacion, form_data,
  set_id_opcion_liquidacion,
  set_refresh_page, set_form_data
}: IProps): JSX.Element => {
  const [row, set_row] = useState<Rows[]>([]);
  const [variables, set_variables] = useState<string[]>([]);
  const [configNotify, setConfigNotify] = useState({ open: false, message: '' });
  const [open, setOpen] = useState(false);
  const [enableTest, setEnableTest] = useState(false);
  const [modal_pruebas, set_modal_pruebas] = useState<boolean>(false);
  const [open_notification_modal, set_open_notification_modal] = useState<boolean>(false);
  const [notification_info, set_notification_info] = useState({ type: '', message: '' });
  const primaryWorkspace = useRef<any>();

  useEffect(() => {
    if (id_opcion_liquidacion) {
      const opcion_liquidacion: OpcionLiquidacion = opciones_liquidaciones.filter(opc_liquidacion => opc_liquidacion.id === Number(id_opcion_liquidacion))[0];
      const new_rows: Rows[] = Object.keys(opcion_liquidacion?.variables).map((key, index) => ({
        id: index,
        nombre: key,
      }));
      set_row(new_rows);
      set_variables(Object.keys(opcion_liquidacion.variables));
      Blockly.serialization.workspaces.load(JSON.parse(opcion_liquidacion.bloques), primaryWorkspace.current);
    }
  }, [id_opcion_liquidacion]);

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

  const generateCode = () => {
    // console.log("primaryWorkspace.current:", primaryWorkspace.current)
    // const code = javascriptGenerator.workspaceToCode(primaryWorkspace.current);
    // const code = javascriptGenerator.statementToCode(primaryWorkspace.current, 'DO');
    // setNotifications({ open: true, message: 'Se ha procesado', type: 'success' });
    // return code

    let code = javascriptGenerator.workspaceToCode(primaryWorkspace.current);
    // Convertir el código en un arreglo de líneas
    let lines = code.split('\n');
    // Filtrar las líneas que contienen declaraciones de variables
    lines = lines.filter((line: any) => !line.includes('var'));
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
    if (variables.includes(form_data.variable)) {
      set_notification_info({ type: 'warning', message: `Ya existe la variable ${form_data.variable}` });
      set_open_notification_modal(true);
      return;
    }

    if (form_data.variable.includes('variable')) {
      set_notification_info({
        type: 'warning',
        message: `El nombre de la variable a agregar (${form_data.variable}) no debe incluir la palabra reservada variable.
        \nPor favor ingrese otro nombre diferente.`,
      });
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
    };

    set_row([...row, newRow]);
  };

  const handle_test_click = (event: any) => {
    event.preventDefault();
    if (variables.length === 0) {
      set_notification_info({ type: 'warning', message: 'No hay variables para procesar.' });
      set_open_notification_modal(true);
      setEnableTest(false);
      return;
    }

    if (primaryWorkspace?.current?.getAllBlocks()?.length === 0) {
      set_notification_info({ type: 'warning', message: 'No hay un diseño para procesar.' });
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
      set_notification_info({
        type: 'warning',
        message: `No hay variables.
        Asegúrese de agregar por lo menos una variable.`
      });
      set_open_notification_modal(true);
      return;
    }

    if (primaryWorkspace?.current?.getAllBlocks()?.length === 0) {
      set_notification_info({
        type: 'error',
        message: `No hay un diseño.
        Asegúrese de agregar una combinación de bloques.`
      });
      set_open_notification_modal(true);
      return;
    }

    if (!form_data.nombre_opcion_liquidacion || !form_data.estado) {
      set_notification_info({
        type: 'warning',
        message: `Estos campos no pueden estar vacíos.
        Asegúrese de escribir un nombre y de seleccionar un estado.`,
      });
      set_open_notification_modal(true);
      return;
    }

    const json = Blockly.serialization.workspaces.save(primaryWorkspace.current);
    api.post('recaudo/liquidaciones/opciones-liquidacion-base/', {
      nombre: form_data.nombre_opcion_liquidacion,
      funcion: generateCode(),
      estado: form_data.estado,
      variables: variables.reduce((acumulador, valor) => {
        return { ...acumulador, [valor]: '' };
      }, {}),
      bloques: JSON.stringify(json),
    })
      .then((response) => {
        console.log(response);
        set_notification_info({ type: 'success', message: `Se creó correctamente la opción de liquidación "${form_data.nombre_opcion_liquidacion}".` });
        set_open_notification_modal(true);
        set_refresh_page(true);
      })
      .catch((error) => {
        console.log(error);
        set_notification_info({ type: 'error', message: `Hubo un error.` });
        set_open_notification_modal(true);
      });
  }

  const column: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 200
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton
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
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <>
        {/* INICIO TEST */}
        <Grid container spacing={2} sx={{ my: '10px' }}>
          <Grid item xs={12} sm={4.5}>
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
          </Grid>
          <Grid item xs={12} sm={4.5}>
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
              disabled={!form_data.variable}
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
              color='primary'
              variant='contained'
              onClick={handle_post_opcion_liquidacion}
              startIcon={<Save />}
              fullWidth
            >
              Guardar opción liquidación
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
              generateCode={generateCode}
              preview
              handle_close={setOpen}
            />
          </div>
        </Modal>
      )}
      <NotificationModal
        open_notification_modal={open_notification_modal}
        set_open_notification_modal={set_open_notification_modal}
        notification_info={notification_info}
      />
    </>
  )
}