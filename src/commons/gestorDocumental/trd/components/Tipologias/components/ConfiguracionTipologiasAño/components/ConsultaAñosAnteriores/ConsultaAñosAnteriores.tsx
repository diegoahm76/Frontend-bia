/* eslint-disable @typescript-eslint/naming-convention */
import { Button, FormControl, Grid, InputLabel, MenuItem, Dialog, Select, Tooltip, TextField } from "@mui/material"
import { Title } from "../../../../../../../../../components/Title"
import { useContext, useEffect, useState } from "react"
import { api } from "../../../../../../../../../api/axios";
import ClearIcon from "@mui/icons-material/Clear";
import CleanIcon from '@mui/icons-material/CleaningServices';
import RemoveIcon from '@mui/icons-material/Remove';
import { Knob } from "primereact/knob";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { v4 as uuidv4 } from 'uuid';
import { TipodeCeaccionContext } from "../../context/CreacionTipologuia";
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // Importa el ícono de tiempo
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { ConfiguracionAnoTipologia, defaultConfiguracionAnoTipologia } from "../../interfaces/ConfiguracionTipologuias";


export const ConsultaAñosAnteriores = () => {

    const year = new Date().getFullYear();

    const [consulta_año_configuracion, set_consulta_año_configuracion] = useState<ConfiguracionAnoTipologia[]>([defaultConfiguracionAnoTipologia]);
    const { Formulario_Empresa, Set_Formulario_Empresa } = useContext(TipodeCeaccionContext);
    const [tipologia_documental, set_tipologia_documental] = useState<any>([]);
    const [id_seleccionado, set_id_seleccionado] = useState<any>();
    const [value_año, set_Value_año] = useState(year);
    const [isModalOpen, setIsModalOpen] = useState(false);

 console.log(consulta_año_configuracion);

    const cantidadDigitos = (consulta_año_configuracion[0]?.cantidad_digitos !== undefined) ? consulta_año_configuracion[0]?.cantidad_digitos : 0;
    const valorInicial = (consulta_año_configuracion[0]?.consecutivo_inicial !== undefined) ? consulta_año_configuracion[0]?.consecutivo_inicial : 1;
    const tipoConfiguracion_selec =
        (consulta_año_configuracion[0]?.tipo_configuracion !== null && consulta_año_configuracion[0]?.tipo_configuracion !== "") ?
            consulta_año_configuracion[0]?.tipo_configuracion : "Ninguno";

    const array_edit = (consulta_año_configuracion !== undefined) ?
        consulta_año_configuracion.map(item => ({
            prefijo_consecutivo: item?.Prefijo_Consecutivo,
            cantidad_digitos: item?.cantidad_digitos,
            valor_inicial: item?.consecutivo_inicial,
            id_unidad_organizacional: item?.T247Id_UnidadOrganizacional
        })) : null;


// const datatatata = array_edit !== undefined ? [] : array_edit;


    const HandleCompletarDatos = (e: any) => {
        Set_Formulario_Empresa({
            ...Formulario_Empresa,
            actualizar: true,
            id_tipologia_documental: id_seleccionado,
            opcion_seleccionada: tipoConfiguracion_selec.toString(),
            cantidad_digitos: cantidadDigitos,
            valor_inicial: valorInicial,
            variables_iniciales: {
                tipo_configuracion: tipoConfiguracion_selec.toString(),
            },
            maneja_consecutivo: consulta_año_configuracion[0].maneja_consecutivo,
            variables_iniciales_dos: tipoConfiguracion_selec.toString(),
             configuracion_por_unidad: array_edit
        });
        setIsModalOpen(false);
    };



    const fetch_data_desplegable_no = async (): Promise<void> => {
        try {
            const url = `/gestor/plantillas/tipos_tipologia/get/`;
            const res: any = await api.get(url);
            const numero_consulta: any = res.data.data;
            set_tipologia_documental(numero_consulta);
            // //  console.log('')(numero_consulta);

        } catch (error) {
            console.error(error);
        }
    };


    const busqueda_avanzadaAño_configuracion = async (): Promise<void> => {
        try {
            let url = "/gestor/trd/configuracion-tipologia/consulta-años-anteriores/";

            if (value_año) { url += `?agno_tipologia=${value_año}`; }
            if (id_seleccionado) { url += `&id_tipologia_doc=${id_seleccionado}`; }

            const res: any = await api.get(url);
            const numero_consulta: any = res.data.data;
            set_consulta_año_configuracion(numero_consulta)

        } catch (error) {
            console.error(error);
        }
    };


    const formatDate = (dateString: string | null): string => {
        return dateString ? new Date(dateString).toISOString().split('T')[0] : "";
    };


    let columna_numero_1: { attribute: string; value: any }[] = [];
    let nombre_configuracion: string = "";

    switch (tipoConfiguracion_selec) {

        case "EM":

            columna_numero_1 = [
                { attribute: "Tipo Configuración", value: consulta_año_configuracion[0]?.id_config_tipologia_doc_agno || "" },
                { attribute: "Consecutivo Inicial", value: consulta_año_configuracion[0]?.consecutivo_inicial?.toString() || "" },
                { attribute: "Cantidad Digitos", value: consulta_año_configuracion[0]?.cantidad_digitos?.toString() || "" },
                { attribute: "Persona Ultima Configuración", value: consulta_año_configuracion[0]?.Persona_ult_config_implemen || "" },
                { attribute: "Fecha Ultima Configuración", value: formatDate(consulta_año_configuracion[0]?.T247fechaUltConfigImplemen) },
                { attribute: "Consecutivo Final", value: consulta_año_configuracion[0]?.consecutivo_final || "" },
                { attribute: "Fecha Consecutivo Final", value: formatDate(consulta_año_configuracion[0]?.fecha_consecutivo_final) },
            ];
            nombre_configuracion = "Empresa"
            break;

        case "Ninguno":


            columna_numero_1 = [
                { attribute: "Nombre Tipologuia", value: consulta_año_configuracion[0]?.nombre_tipologia || "" },
                { attribute: "Tipo Configuración", value: "Ninguno" },
            ];
            nombre_configuracion = "NINGUNO"
            break;

        case "SS":


            columna_numero_1 = consulta_año_configuracion.flatMap((item, index) => [
                // { attribute: "Elemento " + (index + 1), value: "", style: { fontWeight: 'bold', color: 'darkslategray', fontSize: '16px' } }, // Ajusta el tamaño de la letra aquí
                { attribute: "Tipo Configuración", value: item.id_config_tipologia_doc_agno || "" },
                { attribute: "Consecutivo Inicial", value: item.consecutivo_inicial?.toString() || "" },
                { attribute: "Cantidad Digitos", value: item.cantidad_digitos?.toString() || "" },
                { attribute: "Persona Ultima Configuración", value: item.Persona_ult_config_implemen || "" },
                { attribute: "Fecha Ultima Configuración", value: formatDate(item.T247fechaUltConfigImplemen) },
                { attribute: "Consecutivo Final", value: item.consecutivo_final || "" },
                { attribute: "Fecha Consecutivo Final", value: formatDate(item.fecha_consecutivo_final) },
            ]);
            nombre_configuracion = "Unidad Organizacional"
            break;
        default:
            // Acciones por defecto si el valor no coincide con ninguno de los casos anteriores
            //  console.log('')("Realizar acciones por defecto");
    }


    const limpiar_formulario_busqueda = () => {
        set_consulta_año_configuracion([defaultConfiguracionAnoTipologia]);
        set_Value_año(year),
            set_id_seleccionado([])
    };


    const incrementValue = () => {
        if (value_año < year) {
            set_Value_año(value_año + 1);
        }
    };

    const decrementValue = () => {
        if (year < value_año + 1) {
            set_Value_año(value_año - 1);
        }
    };

    const openModal = () => { setIsModalOpen(true); };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetch_data_desplegable_no().catch((error) => {
            console.error(error);
        });
    }, []);


    const columnsss: GridColDef[] = [
        {
            field: 'maneja_consecutivo', headerName: 'Consecutivo', flex: 1, align: 'center', headerAlign: 'center',
            renderCell: (params: any) => (
                params.value ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'red' }} />
            ),
        },
        { field: 'consecutivo_inicial', headerName: ' Inicial', flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'cantidad_digitos', headerName: 'Dígitos', flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'Prefijo_Consecutivo', headerName: 'Prefijo', flex: 1, headerAlign: 'center', align: 'center' },
        { field: 'Persona_ult_config_implemen', headerName: 'Persona Última Configuración', flex: 2, headerAlign: 'center', align: 'center' },
        { field: 'consecutivo_final', headerName: 'Consecutivo Final', flex: 2, headerAlign: 'center', align: 'center' },
        {
            field: 'fecha_consecutivo_final', headerName: 'Fecha Consecutivo Final', flex: 1, headerAlign: 'center', align: 'center',
            renderCell: (params: any) => (
                <Tooltip title={new Date(params.value).toLocaleString()} arrow>
                    <AccessTimeIcon />
                </Tooltip>
            ),
        },
    ];

    return (
        <>
            <Grid item xs={12} sm={5} md={3.6} lg={2.5}>
                <Button
                    startIcon={<SearchIcon/>}
                    fullWidth
                    style={{ width: "90%", marginTop: 15, backgroundColor: "orange" }}
                    variant="contained"
                    onClick={openModal}
                >
                    Consultar Años Anteriores
                </Button>
            </Grid>

            <Dialog open={isModalOpen} fullWidth maxWidth="md">
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
                        }}
                    >
                        <Grid item xs={12}>
                            <Title title="Consultar Años Anterires" />
                        </Grid>

                        <Grid container style={{ marginTop: 10 }} alignItems="center" justifyContent="center">
                            <Grid item xs={1.7} >
                                <Button onClick={decrementValue}
                                    startIcon={<RemoveIcon />}
                                    style={{ width: "100%" }}
                                    variant="contained"
                                    color="error"
                                    disabled={value_año === 1000}>menos</Button>
                            </Grid>

                            <Grid item style={{ margin: 8 }} >
                                <Knob
                                    value={value_año}
                                    size={100}
                                    min={year - 1}
                                    max={year}
                                    step={1}
                                    readOnly={true}
                                />
                            </Grid>


                            <Grid item xs={2} >
                                <Button startIcon={<AddIcon />}
                                    variant="contained"
                                    style={{ width: "80%" }}
                                    fullWidth
                                    color="success"
                                    onClick={incrementValue}
                                    disabled={value_año === 3000} >mas</Button>
                            </Grid>
                        </Grid>



                        <Grid container alignItems="center" justifyContent="center">

                            <Grid item xs={8} >
                                <FormControl fullWidth>
                                    <InputLabel id="choise-label">Selecciona tipología documental</InputLabel>
                                    <Select
                                        id="demo-simple-select-2"
                                        // name="id_tipologia_documental"
                                        style={{ width: "95%" }}
                                        label="Selecciona tipología documentall"
                                        value={id_seleccionado || ""}
                                        onChange={(e) => set_id_seleccionado(e.target.value)}
                                    >
                                        {tipologia_documental?.map((item: any, index: number) => (
                                            <MenuItem key={index} value={item.id_tipologia_documental}>
                                                {item.nombre}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>


                            <Grid item xs={2.2} container justifyContent="center">
                                <Button
                                    startIcon={<SearchIcon />}
                                    variant="contained"
                                    style={{ width: "95%", marginTop: 15 }}
                                    onClick={busqueda_avanzadaAño_configuracion}
                                >
                                    Buscar
                                </Button>
                            </Grid>



                            {(tipoConfiguracion_selec === "EM" || tipoConfiguracion_selec === "Ninguno") && (
                                <Grid container direction="column" alignItems="center">

                                    {consulta_año_configuracion[0].id_tipologia !== 0 ? (
                                        <> <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <DataGrid
                                                density="compact"
                                                style={{ marginTop: 15, width: "100%" }}
                                                autoHeight
                                                rows={columna_numero_1 || []}
                                                columns={[
                                                    { field: "attribute", headerName: "Atributo", flex: 1, align: "center", headerAlign: "center" },
                                                    { field: "value", headerName: "Valor", flex: 1, align: "center", headerAlign: "center" },
                                                ]}
                                                getRowId={(row) => uuidv4()}
                                            />
                                        </Grid>
                                            <Grid item xs={12} sm={4} md={2.4} lg={1.9} justifyContent="center">
                                                <Button
                                                    startIcon={<EditIcon />}
                                                    variant="contained"
                                                    style={{ marginTop: 15 }}
                                                    onClick={HandleCompletarDatos}
                                                >
                                                    Editar configuración
                                                </Button>
                                            </Grid>
                                        </>
                                    ) : (
                                        <h3>No hay datos para mostrar</h3>
                                    )}

                                </Grid>
                            )}

                            {tipoConfiguracion_selec === "SS" && (
                                <>

                                    <Grid item xs={6}>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            label="Tpo Configuracion"
                                            value={nombre_configuracion || ""}
                                            style={{ marginTop: 15, marginRight: 40 }}

                                        />
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            label="Seccion o Subseccion"
                                            value={consulta_año_configuracion[0].Seccion_Subseccion || ""}
                                            style={{ marginTop: 15, marginRight: 40 }}

                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        {consulta_año_configuracion[0].id_tipologia !== 0 ? (
                                            <DataGrid
                                                density="compact"
                                                style={{ marginTop: 15, width: "100%" }}
                                                autoHeight
                                                rows={consulta_año_configuracion || []}
                                                columns={columnsss}
                                                getRowId={(row) => uuidv4()}
                                            />
                                        ) : (
                                            <h3>No hay datos para mostrar</h3>
                                        )}
                                    </Grid>


                                    <Grid item xs={12} sm={4} md={2.4} lg={1.9} justifyContent="center">
                                        <Button
                                            startIcon={<EditIcon />}
                                            variant="contained"
                                            style={{ marginTop: 15 }}
                                            onClick={HandleCompletarDatos}
                                        >
                                            Editar configuración

                                        </Button>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Grid>



                    <Grid container justifyContent="flex-end"
                        sx={{
                            position: 'relative',
                            background: '#FAFAFA',
                            borderRadius: '15px',
                            p: '20px',
                            mb: '20px',
                            boxShadow: '0px 3px 6px #042F4A26',
                        }}
                    >


                        <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                            <Button color='primary' onClick={limpiar_formulario_busqueda} style={{ width: "90%", marginTop: 15 }} variant="outlined" fullWidth startIcon={<CleanIcon />}>
                                Limpiar
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={4} md={2.4} lg={1.9}>
                            <Button
                                startIcon={<ClearIcon />}
                                fullWidth
                                style={{ width: "90%", marginTop: 15 }}
                                variant="contained"
                                color="error"
                                onClick={closeModal}
                            >
                                Salir
                            </Button>
                        </Grid>
                    </Grid></>
            </Dialog >
        </>
    )
}
