/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, type SelectChangeEvent, TextField, Alert, Typography, ToggleButton } from "@mui/material";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAppDispatch } from "../../../../hooks";
import { obtener_estados } from "../thunks/Entradas";
import { Title } from "../../../../components/Title";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
interface IProps {
    is_modal_active: boolean,
    set_is_modal_active: Dispatch<SetStateAction<boolean>>,
    articulo_entrada: any,
    info_entrada: any
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const EntradaArticuloFijoComponent = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [detalle_complementario, set_detalle_complementario] = useState<any[]>([]);
    const [estados, set_estados] = useState<any[]>([]);
    const [estado, set_estado] = useState<string>("O");
    const [mensaje_error_estado, set_mensaje_error_estado] = useState<string>("");
    const [placa_serial, set_placa_serial] = useState<string>("");
    const [mensaje_error_placa_serial, set_mensaje_error_placa_serial] = useState<string>("");
    const [nro_elemento_bien, set_nro_elemento_bien] = useState<string>("");
    const [mensaje_error_nro_elemento_bien, set_mensaje_error_nro_elemento_bien] = useState<string>("");
    const [vida_util, set_vida_util] = useState<string>("");
    const [mensaje_error_vida_util, set_mensaje_error_vida_util] = useState<string>("");
    const [unidad_tiempo, set_unidad_tiempo] = useState<string>("");
    const [mensaje_error_unidad_tiempo, set_mensaje_error_unidad_tiempo] = useState<string>("");
    const [valor_residual, set_valor_residual] = useState<string>("");
    const [mensaje_error_valor_residual, set_mensaje_error_valor_residual] = useState<string>("");
    const [abrir_hdv, set_abrir_hdv] = useState<boolean>(false);

    useEffect(() => {
        obtener_estados_fc();
        console.log(props.articulo_entrada);
    }, [])

    const obtener_estados_fc: () => void = () => {
        dispatch(obtener_estados()).then((response: any) => {
            set_estados(response);
        })
    }

    const cambio_estado: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_estado(e.target.value);
    }
    const cambio_placa_serial: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_placa_serial(e.target.value);
    }
    const cambio_nro_elemento_bien: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_nro_elemento_bien(e.target.value);
    }
    const cambio_vida_util: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_vida_util(e.target.value);
    }
    const cambio_unidad_tiempo: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_unidad_tiempo(e.target.value);
    }
    const cambio_valor_residual: any = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_valor_residual(e.target.value);
    }

    const agregar_entradas = (): void => {

    }

    const guardar_entrada = (): void => {
        const values: any = {
            estado,
            placa_serial,
            nro_elemento_bien,
            vida_util,
            unidad_tiempo,
            valor_residual,
            abrir_hdv
        };
        set_detalle_complementario([...detalle_complementario, values]);
    }

    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <Dialog
            fullWidth
            maxWidth="lg"
            open={props.is_modal_active}
            onClose={() => { props.set_is_modal_active(false); }}
        >
            <DialogTitle>Entradas de activos fijos</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
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
                            <Alert sx={{ mb: '10px' }} severity="info">
                                <Typography variant="body1" gutterBottom>
                                    El articulo seleccionado es de tipo activo debe adicionar información complementaria según la cantidad a ingresar.
                                </Typography>
                            </Alert>
                            <Title title="Detalle complementario" />
                            <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <FormControl required size='small' fullWidth>
                                            <InputLabel>Estado</InputLabel>
                                            <Select
                                                label="Estado"
                                                value={estado}
                                                required
                                                onChange={cambio_estado}
                                                error={mensaje_error_estado !== ""}
                                            >
                                                {estados.map((te: any) => (
                                                    <MenuItem key={te.cod_estado} value={te.cod_estado}>
                                                        {te.nombre}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Placa/Serial"
                                            value={placa_serial}
                                            required
                                            type={'text'}
                                            size="small"
                                            fullWidth
                                            onChange={cambio_placa_serial}
                                            error={mensaje_error_placa_serial !== ""}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="N° elemento"
                                            value={nro_elemento_bien}
                                            required
                                            type={'text'}
                                            size="small"
                                            fullWidth
                                            onChange={cambio_nro_elemento_bien}
                                            error={mensaje_error_nro_elemento_bien !== ""}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={2}>
                                        <TextField
                                            label="Vida util"
                                            value={vida_util}
                                            type={'number'}
                                            required
                                            size="small"
                                            fullWidth
                                            onChange={cambio_vida_util}
                                            error={mensaje_error_vida_util !== ""}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <FormControl required size='small' fullWidth>
                                            <InputLabel>Unidad tiempo</InputLabel>
                                            <Select
                                                label="Unidad tiempo"
                                                value={unidad_tiempo}
                                                required
                                                onChange={cambio_unidad_tiempo}
                                                error={mensaje_error_unidad_tiempo !== ""}
                                            >
                                                {estados.map((te: any) => (
                                                    <MenuItem key={te.cod_tipo_entrada} value={te.cod_tipo_entrada}>
                                                        {te.nombre}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="Valor residual"
                                            value={valor_residual}
                                            required
                                            type={'number'}
                                            size="small"
                                            fullWidth
                                            onChange={cambio_valor_residual}
                                            error={mensaje_error_valor_residual !== ""}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <ToggleButton
                                            value="check"
                                            selected={abrir_hdv}
                                            onChange={() => {
                                                set_abrir_hdv(!abrir_hdv);
                                            }}
                                            size='small'
                                        >
                                            <CheckIcon />Abrir Hoja de vida
                                        </ToggleButton>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <Button
                                            color='primary'
                                            variant='contained'
                                            onClick={guardar_entrada}
                                            startIcon={<SaveIcon />}>Guardar entrada</Button>
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
                            <Title title="Registro de detalles" />
                            <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <div className="card">
                                            <DataTable
                                                value={detalle_complementario}
                                                sortField="nombre"
                                                stripedRows
                                                paginator
                                                rows={5}
                                                scrollable scrollHeight="flex"
                                                tableStyle={{ minWidth: '60rem' }}
                                                rowsPerPageOptions={[5, 10, 25, 50]}
                                                dataKey="id_programacion_mantenimiento"
                                            >
                                                <Column
                                                    field="item"
                                                    header="#"
                                                    style={{ width: '5%' }}
                                                ></Column>
                                                <Column
                                                    field="estado"
                                                    header="Estado"
                                                    style={{ width: '10%' }}
                                                ></Column>
                                                <Column
                                                    field="placa_serial"
                                                    header="Placa/Serial"
                                                    style={{ width: '10%' }}
                                                ></Column>
                                                <Column
                                                    field="nro_elemento_bien"
                                                    header="N° elemento"
                                                    style={{ width: '15%' }}
                                                ></Column>
                                                <Column
                                                    field="vida_util"
                                                    header="Vida útil"
                                                    style={{ width: '10%' }}
                                                ></Column>
                                                <Column
                                                    field="unidad_tiempo"
                                                    header="Tiempo"
                                                    style={{ width: '10%' }}
                                                ></Column>
                                                <Column
                                                    field="valor_residual"
                                                    header="Valor residual"
                                                    style={{ width: '15%' }}
                                                ></Column>
                                                <Column
                                                    field="abrir_hdv"
                                                    header="Hoja de vida"
                                                    style={{ width: '15%' }}
                                                ></Column>
                                                <Column header="Acciones" style={{ width: '10%' }} align={'center'} body={(rowData) => {
                                                    return <Button color="error" size="small" variant='contained' onClick={() => { console.log(rowData); }}><DeleteForeverIcon fontSize="small" /></Button>;
                                                }}></Column>
                                            </DataTable>
                                        </div>
                                    </Grid>
                                </Grid>

                            </Box>

                        </Grid>

                    </Grid>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    color='inherit'
                    variant='contained'
                    startIcon={<ClearIcon />}
                    onClick={() => { props.set_is_modal_active(false); }}>Cancelar</Button>
                <Button
                    color='primary'
                    variant='contained'
                    startIcon={<SaveIcon />}
                    onClick={agregar_entradas}>Agregar</Button>
            </DialogActions>
        </Dialog>
    )
}
// eslint-disable-next-line no-restricted-syntax
export default EntradaArticuloFijoComponent;