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
import { Title } from "../../../components";
import { useEffect, useRef, useState } from 'react';
import { javascriptGenerator } from 'blockly/javascript';
import { VisualBlockEditor } from "../components/visual-block-editor";
import { TransitionAlerts } from "../components/alert";
import { Liquidator } from "../components/liquidador/liquidator";
import { PruebasLiquidacionModal } from "../components/constructorLiquidador/modal/PruebasLiquidacionModal";
import type { OpcionLiquidacion } from "../interfaces/liquidacion";
import { api } from "../../../api/axios";
import { Add, Build, Save } from "@mui/icons-material";
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import { NotificationModal } from "../components/NotificationModal";
import Blockly from 'blockly';
import './LiquidacionScreen.css';

interface Rows {
  id: number;
  nombre: string;
}

const initial_rows = [
  {
    id: 1,
    nombre: 'numero1',
  },
  {
    id: 2,
    nombre: 'numero2',
  }
]

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LiquidacionScreen: React.FC = () => {
  const [opciones_liquidaciones, set_opciones_liquidaciones] = useState<OpcionLiquidacion[]>([]);
  const [id_opcion_liquidacion, set_id_opcion_liquidacion] = useState('');
  const [row, set_row] = useState<Rows[]>(initial_rows);
  const [variables, set_variables] = useState<string[]>(["numero1", "numero2"]);
  const [formData, setFormData] = useState({ variable: '', nombre_liquidacion: '' });
  const [configNotify, setConfigNotify] = useState({ open: false, message: '' });
  const [open, setOpen] = useState(false);
  const [enableTest, setEnableTest] = useState(false);
  const primaryWorkspace = useRef<any>();
  const [modal_pruebas, set_modal_pruebas] = useState<boolean>(false);
  const [open_notification_modal, set_open_notification_modal] = useState<boolean>(false);
  const [notification_info, set_notification_info] = useState({ type: '', message: '' });
  const [refresh_page, set_refresh_page] = useState<boolean>(false);

  useEffect(() => {
    api.get('recaudo/liquidaciones/opciones-liquidacion-base')
      .then((response) => {
        set_opciones_liquidaciones(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh_page]);

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

  const handle_select_change: (event: SelectChangeEvent) => void = (event: SelectChangeEvent) => {
    set_id_opcion_liquidacion(event.target.value);
  };

  const setNotifications = (notification: any) => {
    setConfigNotify(notification);
    if (notification.type === 'error') {
      setEnableTest(false);
    }
  }

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
    setNotifications({ open: true, message: 'Se ha procesado', type: 'success' });
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
    if (variables.includes(formData.variable)) {
      set_notification_info({ type: 'warning', message: `Ya existe la variable ${formData.variable}` });
      set_open_notification_modal(true);
      return;
    }

    if (formData.variable.includes('variable')) {
      set_notification_info({ 
        type: 'warning', 
        message: `El nombre de la variable a agregar (${formData.variable}) no debe incluir la palabra reservada variable.
        \nPor favor ingrese otro nombre diferente.`,
      });
      set_open_notification_modal(true);
      return;
    }

    event.preventDefault();
    setFormData(prevState => ({
      ...prevState,
      variable: ''
    }));

    set_variables([
      ...Array.from(new Set([...variables, formData.variable.replace(/\s/g, '_')]))
    ]);

    const newRow = {
      id: row.length + 1,
      parametros: formData.nombre_liquidacion,
      nombre: formData.variable.replace(/\s/g, '_'),
      tipo: 'Tipo nuevo',
      opciones: '',
    };

    set_row([...row, newRow]);
  };

  const handleSubmitProcess = (event: any) => {
    event.preventDefault();
    if (primaryWorkspace?.current?.getAllBlocks()?.length === 0) {
      setNotifications({ open: true, message: 'No hay diseño para procesar', type: 'error' });
      setEnableTest(false);
      return
    }
    if (variables.length === 0) {
      setNotifications({ open: true, message: 'No hay variables para procesar', type: 'error' });
      setEnableTest(false);
      return
    }

    setEnableTest(true);
    setOpen(true);

  }

  // POST Crear opción liquidación
  const handleSave = () => {
    // const data = {
    //     nombre_liquidacion: formData.nombre_liquidacion,
    //     variables,
    //     funcion: generateCode()
    // };
    // console.log("data", data);
    // // console.log("data stringfly", JSON.stringify(data));
    // console.log("generateCode(): ", generateCode())
    const json = Blockly.serialization.workspaces.save(primaryWorkspace.current);
    console.log(JSON.stringify(json));

    api.post('recaudo/liquidaciones/opciones-liquidacion-base/', {
      nombre: formData.nombre_liquidacion,
      funcion: generateCode(),
      variables: variables.reduce((acumulador, valor) => {
        return { ...acumulador, [valor]: '' };
      }, {}),
      bloques: JSON.stringify(json),
    })
      .then((response) => {
        console.log(response);
        set_refresh_page(true);
      })
      .catch((error) => {
        console.log(error);
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
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
          overflow: 'auto'
        }}
      >
        <Grid item xs={12}>
          <Title title="Liquidación"></Title>
          <Box
            component='form'
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            {/* INICIO TEST */}
            <Grid container spacing={2} sx={{ my: '10px' }}>
              <Grid item xs={12} sm={4.5}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Selecciona opción liquidación</InputLabel>
                  <Select
                    label='Selecciona opción liquidación'
                    value={id_opcion_liquidacion}
                    onChange={handle_select_change}
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
                  value={formData.variable}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  disabled={!formData.variable}
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
          </Box>
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
                onClick={handleSubmitProcess}
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
                label="Ingrese nombre liquidacion"
                name="nombre_liquidacion"
                required
                autoComplete="off"
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                color='primary'
                variant='contained'
                onClick={handleSave}
                startIcon={<Save />}
                fullWidth
              >
                Guardar opción liquidación
              </Button>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
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