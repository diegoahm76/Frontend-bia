import {
    useState
} from "react";
import { BuscadorPersona } from "../../../components/BuscadorPersona";
import type { DataPersonas, InfoPersona } from "../../../interfaces/globalModels";
import { Button, Divider, Grid, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { Title } from "../../../components/Title";
import CancelIcon from '@mui/icons-material/Cancel';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DialogHistorialDatosRestringidos } from "../components/DialogHistorialDatosRestringidos";
import { control_error } from "../../../helpers";
import { consultar_datos_persona } from "../request/Request";
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdministracionPersonasScreen: React.FC = () => {
    const [datos_persona, set_datos_persona] = useState<DataPersonas>();
    const [historico, set_historico] = useState<boolean>(false);
    const [persona, set_persona] = useState<InfoPersona>();
    const [datos_historico, set_datos_historico] = useState<InfoPersona>({
        id: 0,
        id_persona: 0,
        tipo_persona: "",
        tipo_documento: "",
        numero_documento: "",
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        nombre_completo: "",
        razon_social: "",
        nombre_comercial: "",
        tiene_usuario: false,
        digito_verificacion: "",
        cod_naturaleza_empresa: "",
    });

    const on_result = (info_persona: InfoPersona): void => {
        if (info_persona !== null || info_persona !== undefined || info_persona !== "") {
            set_persona(info_persona);
            console.log("Datos persona", info_persona)
        }
        console.log("Datos persona no encontrados")
    };
    const cancelar = (): void => {
        set_persona(undefined);
    };
    const get_datos_persona = async (): Promise<void> => {
        try {
            const id_persona: number | undefined = persona?.id_persona;
            const response = await consultar_datos_persona(id_persona);
            console.log("Datos completos", response)
            set_datos_persona(response);
        } catch (err) {
            control_error(err);
        }
    };


    const tipos_doc_comercial = [
        {
            value: 'NT',
            label: 'NIT',
        },
    ];
    const tipos_doc = [
        {
            value: 'CC',
            label: 'Cédula de ciudadanía'
        },
        {
            value: 'CE',
            label: 'Cédula extranjería',
        },
        {
            value: 'TI',
            label: 'Tarjeta de identidad',
        },
        {
            value: 'RC',
            label: 'Registro civil',
        },
        {
            value: 'NU',
            label: 'NUIP'
        },
        {
            value: 'PA',
            label: 'Pasaporte',
        },
        {
            value: 'PE',
            label: 'Permiso especial de permanencia',
        },
    ];
    const tipo_persona = [
        {
            value: 'N',
            label: 'Natural'
        },
        {
            value: 'J',
            label: 'Juridica',
        },
    ];
    const tipo_empresa = [
        {
            value: 'PU',
            label: 'Pública'
        },
        {
            value: 'PR',
            label: 'Privada',
        },
        {
            value: 'MI',
            label: 'Mixta',
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
                }}
            >
                <Grid item xs={12} spacing={2}>
                    <Title title="ADMINISTRADOR DE PERSONAS" />
                    <BuscadorPersona onResult={on_result} />
                    {(persona?.tipo_persona === "N") && (
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Title title="ITEM SELECCIONADO" />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        id="tipo_doc_natural"
                                        label="Tipo de Documento"
                                        select
                                        fullWidth
                                        size="small"
                                        margin="dense"
                                        required
                                        autoFocus
                                        defaultValue={persona?.tipo_documento}
                                        disabled
                                    >
                                        {tipos_doc.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Número Identificación"
                                        id="documento_natural"
                                        type="number"
                                        fullWidth
                                        size="small"
                                        margin="dense"
                                        required
                                        defaultValue={persona?.numero_documento}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Nombre Completo"
                                        type="text"
                                        fullWidth
                                        size="small"
                                        margin="dense"
                                        required
                                        autoFocus
                                        defaultValue={persona?.nombre_completo}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <Stack justifyContent="flex-end" sx={{ m: '10px 0 20px 0' }} direction="row" spacing={2}>
                                        <Button
                                            variant="outlined"
                                            startIcon={<CancelIcon />}
                                            onClick={() => {
                                                cancelar();
                                            }}>Cancelar
                                        </Button>
                                        <Button
                                            id="actualiza-natural"
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            // startIcon={
                                            //     loading_natural
                                            //         ? <CircularProgress size={20} key={1} className="align-middle ml-1" />
                                            //         : ""
                                            // }
                                            onClick={() => {
                                                void get_datos_persona()
                                            }}
                                            aria-label="Acaeptar"
                                            // disabled={loading_natural}
                                            size="large"
                                        >
                                            Acaeptar</Button>
                                        {/* <Button
                                            variant="outlined"
                                            startIcon={<RemoveRedEyeIcon />}
                                            onClick={() => {
                                                set_datos_historico(persona)
                                                handle_open_historico();
                                            }}>Historico
                                        </Button> */}
                                    </Stack>
                                </Grid>
                            </Grid>
                            {(datos_persona != null) && (
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Title title="DATOS DE IDENTIFICACIÓN" />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Tipo de Persona"
                                            select
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            required
                                            autoFocus
                                            defaultValue={datos_persona?.tipo_persona}
                                            disabled
                                        >
                                            {tipo_persona.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            id="tipo_doc_natural"
                                            label="Tipo de Documento"
                                            select
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            required
                                            autoFocus
                                            defaultValue={datos_persona?.tipo_documento}
                                            disabled
                                        >
                                            {tipos_doc.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            label="Número Identificación"
                                            id="documento_natural"
                                            type="number"
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            required
                                            defaultValue={datos_persona?.numero_documento}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Title title="DATOS PERSONALES" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Primer Nombre"
                                            type="text"
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            required
                                            autoFocus
                                            defaultValue={datos_persona?.primer_nombre}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Segundo Nombre"
                                            type="text"
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            autoFocus
                                            defaultValue={datos_persona?.segundo_nombre}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Primer Apeliido"
                                            type="text"
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            required
                                            autoFocus
                                            defaultValue={datos_persona?.primer_apellido}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Segundo Apeliido"
                                            type="text"
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            autoFocus
                                            defaultValue={datos_persona?.segundo_apellido}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="Fecha Nacimiento"
                                            type="text"
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            required
                                            autoFocus
                                            defaultValue={datos_persona?.fecha_nacimiento}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="País de nacimiento"
                                            type="text"
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            autoFocus
                                            defaultValue={datos_persona?.pais_nacimiento}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="Sexo"
                                            type="text"
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            required
                                            autoFocus
                                            defaultValue={datos_persona?.sexo}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            label="Estado Cívil"
                                            type="text"
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            autoFocus
                                            defaultValue={datos_persona?.estado_civil}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" fontWeight="bold">Lugar expedición del documento</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Departamento"
                                            type="text"
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            required
                                            autoFocus
                                            defaultValue={datos_persona?.cod_municipio_expedicion_id}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Ciudad"
                                            type="text"
                                            fullWidth
                                            size="small"
                                            margin="dense"
                                            autoFocus
                                            defaultValue={datos_persona?.cod_municipio_expedicion_id}
                                        />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Stack justifyContent="flex-end" sx={{ m: '10px 0 20px 0' }} direction="row" spacing={2}>
                                            <Button
                                                variant="outlined"
                                                startIcon={<CancelIcon />}
                                                onClick={() => {
                                                    cancelar();
                                                }}>Cancelar
                                            </Button>
                                            <Button
                                                id="actualiza-natural"
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                // startIcon={
                                                //     loading_natural
                                                //         ? <CircularProgress size={20} key={1} className="align-middle ml-1" />
                                                //         : ""
                                                // }
                                                aria-label="Actualizar"
                                                // disabled={loading_natural}
                                                size="large"
                                            >
                                                Actualizar</Button>
                                            {/* <Button
                                            variant="outlined"
                                            startIcon={<RemoveRedEyeIcon />}
                                            onClick={() => {
                                                set_datos_historico(persona)
                                                handle_open_historico();
                                            }}>Historico
                                        </Button> */}
                                        </Stack>
                                    </Grid>
                                </Grid>
                            )}
                        </>
                    )}
                    {(persona?.tipo_persona === "J") && (
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Title title="DATOS DE IDENTIFICACIÓN" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="tipo_doc_comercial"
                                    label="Tipo de Persona"
                                    select
                                    fullWidth
                                    size="small"
                                    margin="dense"
                                    required
                                    autoFocus
                                    defaultValue={persona?.tipo_persona}
                                    disabled
                                >
                                    {tipo_persona.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Tipo de Documento"
                                    select
                                    fullWidth
                                    size="small"
                                    margin="dense"
                                    required
                                    autoFocus
                                    disabled
                                    defaultValue={persona?.tipo_documento}
                                >
                                    {tipos_doc_comercial.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Número Identificación"
                                    id="documento_juridico"
                                    type="number"
                                    fullWidth
                                    size="small"
                                    margin="dense"
                                    required
                                    defaultValue={persona?.numero_documento}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Digito de verificación:"
                                    type="number"
                                    fullWidth
                                    size="small"
                                    margin="dense"
                                    required
                                    autoFocus
                                    defaultValue={persona?.digito_verificacion}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Title title="DATOS EMPRESARIALES" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Razón social"
                                    type="text"
                                    fullWidth
                                    size="small"
                                    margin="dense"
                                    required
                                    autoFocus
                                    defaultValue={persona?.razon_social}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Nombre comercial"
                                    type="text"
                                    fullWidth
                                    size="small"
                                    margin="dense"
                                    required
                                    autoFocus
                                    defaultValue={persona?.nombre_comercial}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Naturaleza de la empresa"
                                    select
                                    fullWidth
                                    size="small"
                                    margin="dense"
                                    required
                                    autoFocus
                                    defaultValue={persona?.cod_naturaleza_empresa}
                                    disabled
                                >
                                    {tipo_empresa.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack justifyContent="flex-end" sx={{ m: '10px 0 20px 0' }} direction="row" spacing={2}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<CancelIcon />}
                                        onClick={() => {
                                            cancelar();
                                        }}>Cancelar
                                    </Button>
                                    <Button
                                        id="actualiza-juridica"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        // startIcon={
                                        //     loading_juridica
                                        //         ? <CircularProgress size={20} key={1} className="align-middle ml-1" />
                                        //         : ""
                                        // }
                                        aria-label="Actualizar"
                                        // disabled={loading_juridica}
                                        size="large"
                                    >Actualizar</Button>
                                    {/* <Button
                                            variant="outlined"
                                            startIcon={<RemoveRedEyeIcon />}
                                            onClick={() => {
                                                set_datos_historico(persona)
                                                handle_open_historico();
                                            }}>Historico
                                        </Button> */}
                                </Stack>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
                <DialogHistorialDatosRestringidos
                    is_modal_active={historico}
                    set_is_modal_active={set_historico}
                    datos_historico={datos_historico}
                    set_datos_historico={set_datos_historico}
                />
            </Grid >
        </>
    );
};