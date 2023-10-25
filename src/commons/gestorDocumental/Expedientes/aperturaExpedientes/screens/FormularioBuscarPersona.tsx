import { Grid, TextField, Box, Button, Stack, FormHelperText, ToggleButton, FormLabel, InputLabel, FormControl, Select, MenuItem, type SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { BuscadorPersonaDialog } from "../../../../almacen/gestionDeInventario/gestionHojaDeVida/mantenimiento/components/RegistroMantenimiento/RegistroMantenimientoGeneral/BuscadorPersonaDialog";
import SearchIcon from '@mui/icons-material/Search';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FormularioBuscarPersona: React.FC = () => {
    const [persona, set_persona] = useState<any>({});
    const [msj_error_persona, set_msj_error_persona] = useState<string>("");
    const [tipo_documento, set_tipo_documento] = useState<string>("");
    const [msj_error_tdoc, set_msj_error_tdoc] = useState<string>("");
    const [numero_documento, set_numero_documento] = useState<string>("");
    const [abrir_modal_persona, set_abrir_modal_persona] = useState<boolean>(false);

    const cambio_tipo_documento: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
        set_tipo_documento(e.target.value);
        if (e.target.value !== null && e.target.value !== "")
            set_msj_error_tdoc("");
    }

    useEffect(() => {
        if (persona !== null && persona !== undefined) {
            set_tipo_documento(persona.tipo_documento);
            set_numero_documento(persona.numero_documento);
            if ((persona.nombre_completo === null || persona.nombre_completo === undefined) && (persona.id_persona !== null && persona.id_persona !== undefined))
                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                persona.nombre_completo = persona.primer_nombre + (persona.segundo_nombre !== null ? (' ' + persona.segundo_nombre + ' ') : ' ') + persona.primer_apellido + (persona.segundo_apellido !== null ? (' ' + persona.segundo_apellido + ' ') : '');
            set_msj_error_persona("");
            set_msj_error_tdoc("");
        }
    }, [persona]);

    return (
        <>
            <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
                <Grid item container spacing={3}>
                    <Grid item xs={12} sm={3}>
                        <FormControl required size='small' fullWidth>
                            <InputLabel>Tipo de documento</InputLabel>
                            <Select
                                value={persona.tipo_documento ?? ""}
                                label="Tipo de documento"
                                onChange={cambio_tipo_documento}
                                error={msj_error_tdoc !== ""}
                                readOnly={true}
                            >
                                {[].map((tipos: any) => (
                                    <MenuItem key={tipos.value} value={tipos.value}>
                                        {tipos.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {(msj_error_tdoc !== "") && (<FormHelperText error >{msj_error_tdoc}</FormHelperText>)}
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Número documento"
                            type={'text'}
                            size="small"
                            fullWidth
                            value={persona.numero_documento ?? ""}
                            error={msj_error_persona !== ""}
                            InputLabelProps={{
                                shrink: true
                            }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        {(msj_error_persona !== "") && (<FormHelperText error >El campo Numero documento es obligatorio.</FormHelperText>)}
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Nombre"
                            type={'text'}
                            size="small"
                            fullWidth
                            value={persona.nombre_completo ?? ""}
                            error={msj_error_persona !== ""}
                            InputLabelProps={{
                                shrink: true
                            }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        {(msj_error_persona !== "") && (<FormHelperText error >{msj_error_persona}</FormHelperText>)}
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button
                            color='primary'
                            variant='contained'
                            startIcon={<SearchIcon />}
                            onClick={() => { set_abrir_modal_persona(true); }}
                        >
                            Buscar persona
                        </Button>
                        {abrir_modal_persona && (
                            <BuscadorPersonaDialog
                                is_modal_active={abrir_modal_persona}
                                set_is_modal_active={set_abrir_modal_persona}
                                title={"Busqueda de persona"}
                                set_persona={set_persona} />
                        )}
                    </Grid>
                </Grid>

            </Box>
        </>
    )
}