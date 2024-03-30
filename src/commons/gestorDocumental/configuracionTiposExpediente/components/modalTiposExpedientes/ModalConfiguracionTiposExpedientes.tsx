/* eslint-disable @typescript-eslint/naming-convention */
import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import { Title } from '../../../../../components/Title';
import { api } from '../../../../../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import { Knob } from 'primereact/knob';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from '@mui/icons-material/Search';
import { control_error } from '../../../alertasgestor/utils/control_error_or_success';
import { v4 as uuidv4 } from 'uuid';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
interface TipoExpediente {
    id_config_tipo_expediente_agno: number;
    cod_tipo_expediente_display: string;
    agno_expediente: number;
    cod_tipo_expediente: string;
    consecutivo_inicial: number;
    cantidad_digitos: number;
    item_ya_usado: boolean;
    fecha_ult_config_implement: string;
    consecutivo_actual: number;
    fecha_consecutivo_actual: string | null;
    id_cat_serie_undorg_ccd: number;
    id_persona_ult_config_implement: number;
    id_persona_consecutivo_actual: number | null;
}

export function ModalConfiguracionTiposExpedientes() {
    const year = new Date().getFullYear();
    const [open, setOpen] = useState(false);
    const [seccionoSubseccion, set_seccionoSubseccion] = useState<any>([]);
    const [variable_choise_seccion, set_variable_choise_seccion] = useState<string>("");
    const [get_serie_subserie, set_get_serie_subserie] = useState<any>([]);
    const [variable_serie_subserie, set_variable_serie_subserie] = useState<any>(); // Inicializa variablex con un valor inicial en este caso, una cadena vacía.
    const [datos_tabla, set_datos_tabla] = useState<TipoExpediente[]>();
    const [value_año, set_Value_año] = useState(year);
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const fetch_choise_seccionsubseccion = async (): Promise<void> => {
        try {
            const url = `/gestor/configuracion-tipos-expendientes/seccion-subseccion/get/`;
            const res: any = await api.get(url);
            const numero_consulta: any = res.data.data;
            set_seccionoSubseccion(numero_consulta);
        } catch (error) {
          
        }
    };

    const fetch_dataw_get = async (): Promise<void> => {
        if (variable_choise_seccion === '') {
            return;
        }
        try {
            const url = `gestor/configuracion-tipos-expendientes/serie-subserie-unidad/get/${variable_choise_seccion}/`;
            const res: any = await api.get(url);
            const numero_consulta: any = res.data.data;
            set_get_serie_subserie(numero_consulta);
        } catch (error: any) {
            control_error(error.respose.detail);
        }
    };

    const get_tabla_historico = async (): Promise<void> => {
        try {
            if (!variable_serie_subserie) {
                set_datos_tabla([]);
                // Aquí puedes mostrar un mensaje de error o realizar alguna acción si variable_serie_subserie es undefined o nulo.
                return;
            }
            const url = `/gestor/configuracion-tipos-expendientes/configuracion-tipo-expediente-agno/get-serie-unidad/historico/${variable_serie_subserie}/${value_año}/`;
            const res: any = await api.get(url);
            if (res && res.data) {
                const numero_consulta: any = res.data.data;
                set_datos_tabla(numero_consulta);
            } else {
                // Mostrar un mensaje de error o realizar alguna acción si la respuesta no contiene la propiedad 'data'.
            }
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                set_datos_tabla([]);
            } else {
                control_error( error.response.data.detail );
            }
        }
    };

    const incrementValue = () => {
        if (value_año < 3000) {
            set_Value_año(value_año + 1);
        }
    };

    const decrementValue = () => {
        if (value_año > 1000) {
            set_Value_año(value_año - 1);
        }
    };
  
    useEffect(() => {
        fetch_choise_seccionsubseccion().catch((error) => {
            console.error(error);
        });
    }, []);
    useEffect(() => {
        fetch_dataw_get().catch((error) => {
            console.error(error);
        });
    }, [variable_choise_seccion]);

    return (
        <div >
            <Button startIcon={<CalendarMonthIcon/>} style={{ width: '100%' }}  variant="outlined" onClick={handleClickOpen}>
                Años Anteriores
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md" // Cambia el tamaño del diálogo a 'xl' para que sea más grande
                fullWidth={true} // Para que el diálogo ocupe todo el ancho disponible
            // Añade otras propiedades si es necesario, como 'sx' para el estilo personalizado

            >

                <DialogTitle id="responsive-dialog-title" >
                    <Grid item xs={12}>
                        <Title title="Seleccionar Archivos" />
                    </Grid>
                </DialogTitle>
                <DialogContent >



                    <Grid container style={{ marginTop: 10 }}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="choise-label">Seccion o Subseccion</InputLabel>
                                <Select
                                    id="demo-simple-select-2"
                                    label="Seccion o Subseccion"
                                    style={{ width: "95%" }}
                                    name="otras_tipologias"
                                    value={variable_choise_seccion || ""}
                                    onChange={(event) => set_variable_choise_seccion(event.target.value)}
                                >
                                    {seccionoSubseccion?.map((item: any, index: number) => (
                                        <MenuItem key={index} value={item.id_unidad_organizacional}>
                                            {item.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>



                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="choise-label">Serie-Subserie</InputLabel>
                                <Select
                                    id="demo-simple-select-2"
                                    style={{ width: "95%" }}
                                    label="Serie-Subserie"
                                    name="otras_tipologias"
                                    value={variable_serie_subserie || ""}
                                    onChange={(event) => set_variable_serie_subserie(event.target.value)}
                                >
                                    {get_serie_subserie?.map((item: any, index: number) => (
                                        <MenuItem key={index} value={item.id_catserie_unidadorg}>
                                            {item.nombre_serie_doc}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container style={{ marginTop: 10 }} alignItems="center" justifyContent="center">
                        <Grid item xs={2} >
                            <Button onClick={decrementValue}
                                startIcon={<   RemoveIcon
                                />}
                                style={{ width: "80%" }}
                                variant="contained"
                                color="error"
                                disabled={value_año === 1000}>menos</Button>
                        </Grid>

                        <Grid item xs={2} >
                            <Knob
                                value={value_año}
                                size={100}
                                min={year - 100}
                                max={year + 100}
                                step={1}
                                readOnly={true}
                            />
                        </Grid>

                        <Grid item xs={1.5} >
                            <Button startIcon={<AddIcon />}
                                variant="contained"
                                style={{ width: "80%" }}
                                fullWidth
                                color="success"
                                onClick={incrementValue}
                                disabled={value_año === 3000} >mas</Button>
                        </Grid>
                    </Grid>
                    <Grid container style={{ marginTop: 10 }} alignItems="center" justifyContent="center">
                        <Grid item xs={2} >
                            <Button onClick={get_tabla_historico}
                                startIcon={<SearchIcon />}
                                style={{ width: "100%" }}
                                variant="contained"
                                disabled={value_año === 1000}>Buscar</Button>
                        </Grid>
                    </Grid>




                    <Grid container alignItems="center" justifyContent="center">
                        <Box style={{ height: 'auto', width: '85%', marginTop: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                            {datos_tabla?.length !== 0 ? (
                                <DataGrid
                                    density="compact"
                                    autoHeight
                                    rows={[
                                        { attribute: "Tipo de Expediente", value: datos_tabla ? datos_tabla[0]?.cod_tipo_expediente_display : "" },
                                        { attribute: "Año de Expediente", value: datos_tabla ? datos_tabla[0]?.agno_expediente : "" },
                                        // { attribute: "Código de Expediente", value: datos_tabla ? datos_tabla[0]?.cod_tipo_expediente : "" },
                                        { attribute: "Consecutivo Inicial", value: datos_tabla ? datos_tabla[0]?.consecutivo_inicial : "" },
                                        { attribute: "Cantidad de Dígitos", value: datos_tabla ? datos_tabla[0]?.cantidad_digitos : "" },
                                        { attribute: "Item Ya Usado", value: datos_tabla ? (datos_tabla[0]?.item_ya_usado ? "Sí" : "No") : ""},
                                        { attribute: "Fecha Última Configuración",  value: datos_tabla ? new Date(datos_tabla[0]?.fecha_ult_config_implement).toLocaleDateString() : "" },
                                        { attribute: "Consecutivo Actual", value: datos_tabla ? datos_tabla[0]?.consecutivo_actual : "" },
                                        { attribute: "Fecha Consecutivo Actual",  value: datos_tabla && datos_tabla[0]?.fecha_consecutivo_actual ? new Date(datos_tabla[0].fecha_consecutivo_actual).toLocaleDateString() : "" },
                                        // { attribute: "ID Cat Serie", value: datos_tabla ? datos_tabla[0]?.id_cat_serie_undorg_ccd : "" },
                                        // { attribute: "ID Persona Última Configuración", value: datos_tabla ? datos_tabla[0]?.id_persona_ult_config_implement : "" },
                                        // { attribute: "ID Persona Consecutivo Actual", value: datos_tabla ? (datos_tabla[0]?.id_persona_consecutivo_actual || "N/A") : "" },
                                    ]||""}
                                    columns={[
                                        { field: "attribute", headerName: "Atributo", flex: 1, align: "center", headerAlign: "center" },
                                        { field: "value", headerName: "Valor", flex: 1, align: "center", headerAlign: "center" },
                                    ]}
                                    pageSize={13} // Ajusta según la cantidad de atributos
                                    getRowId={(row) => uuidv4()} />) :
                                (<h3>No hay datos para mostrar</h3>)}
                        </Box>
                    </Grid>

                </DialogContent>
                <DialogActions>

                    <Button variant="contained"
                        color="error"
                        onClick={handleClose}
                        autoFocus>
                        Salir
                    </Button>
                </DialogActions>

            </Dialog>
        </div>
    );
}
