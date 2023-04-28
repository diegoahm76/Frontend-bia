/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import {
    Avatar,
    Box,
    Button,
    Fab,
    FormControl,
    Grid,
    IconButton,
    MenuItem,
    Select,
    type SelectChangeEvent,
    Stack,
    TextField,
    InputLabel,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
    // TextareaAutosize
} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { Title } from "../../../components"
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useRef, useState } from 'react';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
// // import { javascriptGenerator } from 'blockly/javascript';
// import { VisualBlockEditor } from "../components/visual-block-editor";
import { TransitionAlerts } from "../components/alert";
import { Modal } from "@material-ui/core";
import { Liquidator } from "../components/liquidador/liquidator";
import './LiquidacionScreen.css'
import { PruebasLiquidacionModal } from "../components/constructorLiquidador/modal/PruebasLiquidacionModal";
import { AddParametroModal } from "../components/constructorLiquidador/modal/AddParametroModal";


// eslint-disable-next-line @typescript-eslint/naming-convention
export const LiquidacionScreen: React.FC = () => {

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
                            console.log("params:", params)
                            const updatedRow = row.filter((item) => item.id !== params.id);
                            // const updatedVariables = variables.filter((item) => item === params.row.nombre)
                            setRow(updatedRow);
                            removeVariable(params.row.nombre)
                            console.log("variables: ", variables)
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
    ]

    const rowTest = [
        {
            id: 1,
            nombre: 'volprom',

        },
        {
            id: 2,
            nombre: 'rural',
        },
        {
            id: 3,
            nombre: 'estrato',
        },
    ]

    // TEST
    const [row, setRow] = useState(rowTest)
    const [formData, setFormData] = useState({ variable: '', nombre_liquidacion: '' });
    const [variables, setVariables] = useState<string[]>([]);
    const [configNotify, setConfigNotify] = useState({ open: false, message: '' });

    const [open, setOpen] = useState(false);

    const [enableTest, setEnableTest] = useState(false);

    const primaryWorkspace = useRef<any>();

    const setNotifications = (notification: any) => {
        setConfigNotify(notification);
        if (notification.type === 'error') {
            setEnableTest(false);
        }
    }

    const handleInputChange = (event: any) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    // const generateCode = () => {
    //     const code = javascriptGenerator.workspaceToCode(primaryWorkspace.current);
    //     setNotifications({ open: true, message: 'Se ha procesado', type: 'success' });
    //     return code
    // }

    const removeVariable = (variable: any) => {
        setVariables(variables.filter((v) => v !== variable));
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
        event.preventDefault();
        setFormData(prevState => ({
            ...prevState,
            variable: ''
        }));

        setVariables([
            ...Array.from(new Set([...variables, formData.variable]))
        ]);

        const newRow = {
            id: row.length + 1,
            parametros: formData.nombre_liquidacion,
            nombre: formData.variable,
            tipo: 'Tipo nuevo',
            opciones: '',
        };

        setRow([...row, newRow]);
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

    const [add_parametro, set_add_parametro] = useState<boolean>(false);
    const [modal_pruebas, set_modal_pruebas] = useState<boolean>(false);

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
                    <Title title="Liquidacion"></Title>
                    <Box
                        component='form'
                        sx={{ mt: '20px' }}
                        noValidate
                        autoComplete="off"
                    >
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    placeholder="Liquidacion de intereses por mora"
                                    size="small"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <IconButton size="large" color="primary">
                                    <FindInPageIcon fontSize="inherit" />
                                </IconButton>
                            </Grid>
                            <Stack
                                direction="row"
                                justifyContent="end"
                                spacing={2}
                                sx={{ mb: '20px' }}
                            >
                                <Button
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    onClick={() => {
                                        set_add_parametro(true);
                                    }}
                                >
                                    Añadir parametro
                                </Button>
                            </Stack>
                        </Grid>
                        {/* INICIO TEST */}
                        <Grid container spacing={2} sx={{ my: '10px' }}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Variable"
                                    name="variable"
                                    required
                                    autoComplete="off"
                                    value={formData.variable}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    disabled={!formData.variable}
                                    variant="outlined" color="primary" onClick={handleSubmit}>
                                    Agregar variable
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" onClick={handleSubmitProcess}>
                                    Procesar
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
                            {/* <VisualBlockEditor
                                variables={variables}
                                workspace={primaryWorkspace}
                                readOnly={false}
                            /> */}
                            <TransitionAlerts configNotify={configNotify} setNotifications={setNotifications} />
                        </Grid>
                    </Box>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        sx={{ my: '50px' }}
                    >
                        <Grid item xs={3}>
                            <TextField
                                label="Nombre Liquidacion"
                                name="nombre_liquidacion"
                                required
                                autoComplete="off"
                                onChange={handleInputChange}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                color='success'
                                variant='contained'
                            >
                                Guardar
                            </Button>
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>
            <AddParametroModal
                is_modal_active={add_parametro}
                set_is_modal_active={set_add_parametro}
            />
            <PruebasLiquidacionModal
                is_modal_active={modal_pruebas}
                set_is_modal_active={set_modal_pruebas}
            />
            {(enableTest && open) && (
                <Modal className='modal-container' open={open} onClose={() => { setOpen(false) }}>
                    <div className='modal'>
                        {/* <Liquidator
                            setNotifications={setNotifications}
                            variables={variables}
                            generateCode={generateCode}
                            preview
                        /> */}
                    </div>
                </Modal>
            )}
        </>
    )
}
