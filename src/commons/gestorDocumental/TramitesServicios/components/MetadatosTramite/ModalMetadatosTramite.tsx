/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import {
    Dialog,
    DialogActions,
    DialogTitle,
    Stack,
    Button,
    TextField,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
    Grid,
    IconButton,
} from '@mui/material';
import { Title } from '../../../../../components/Title';
import FormKeywords from '../../../../../components/partials/form/FormKeywords';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close'; // Agregado: Importación de CloseIcon

interface IProps {
    is_modal_active: boolean;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

export const ModalMetadatosTramite = ({
    is_modal_active,
    set_is_modal_active,
}: IProps) => {
    // Estado para almacenar los valores del formulario
    const [form, setForm] = useState({
        categoriaArchivo: '',
        asunto: '',
        tieneReplicaFisica: false,
        origenArchivo: '',
        tieneTipologiaRelacionada: false,
        tipologiaRelacionada: '',
        descripcion: '',
    });

    // Función para manejar el cambio en los campos del formulario
    const handleInputChange = (field: string, value: any) => {
        setForm({
            ...form,
            [field]: value,
        });
    };

    // Función para limpiar el formulario
    const handleClearForm = () => {
        setForm({
            categoriaArchivo: '',
            asunto: '',
            tieneReplicaFisica: false,
            origenArchivo: '',
            tieneTipologiaRelacionada: false,
            tipologiaRelacionada: '',
            descripcion: '',
        });
    };

    // Función para cerrar el modal y mostrar los datos del formulario en la consola
    const handleCloseModal = (): void => {
        console.log(form); // Imprimir datos del formulario en la consola
        set_is_modal_active(false);
    };

    return (<>
        <Dialog maxWidth="xl" open={is_modal_active} onClose={handleCloseModal} fullWidth>
            <DialogTitle> <Title title="Agregar Metadatos" /></DialogTitle>

            {/* Contenedor principal del formulario */}
            <Grid container spacing={2} style={{ margin: '1rem' }}>
                <Grid item xs={12} md={4}>
                    {/* Campo: Categoría de archivo */}
                    <FormControl fullWidth>
                        <InputLabel id="categoriaArchivo-label">Categoría de archivo</InputLabel>
                        <Select
                            style={{ width: "100%" }}
                            labelId="categoriaArchivo-label"
                            id="categoriaArchivo"
                            size="small"
                            value={form.categoriaArchivo}
                            onChange={(e) => handleInputChange('categoriaArchivo', e.target.value as string)}
                        >
                            {/* Opciones del select */}
                            <MenuItem value="categoria1">Categoría 1</MenuItem>
                            <MenuItem value="categoria2">Categoría 2</MenuItem>
                            <MenuItem value="categoria3">Categoría 3</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>


                <Grid item xs={12} md={3}>
                    {/* Campo: Tiene réplica física */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={form.tieneReplicaFisica}
                                onChange={(e) => handleInputChange('tieneReplicaFisica', e.target.checked)}
                                name="tieneReplicaFisica"
                                color="primary"
                            />
                        }
                        label="¿Tiene réplica física?"
                    />
                </Grid>





                <Grid item xs={12} md={4}>
                    {/* Campo: Origen del archivo */}
                    <FormControl fullWidth>
                        <InputLabel id="origenArchivo-label">Origen del archivo</InputLabel>
                        <Select
                            size="small"
                            style={{ width: "100%" }}
                            labelId="origenArchivo-label"
                            id="origenArchivo"
                            value={form.origenArchivo}
                            onChange={(e) => handleInputChange('origenArchivo', e.target.value as string)}
                        >
                            {/* Opciones del select */}
                            <MenuItem value="interno">Interno</MenuItem>
                            <MenuItem value="externo">Externo</MenuItem>
                            <MenuItem value="otro">Otro</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>


                <Grid item xs={12} md={3}>
                    {/* Campo: ¿Tiene tipología relacionada? */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={form.tieneTipologiaRelacionada}
                                onChange={(e) =>
                                    handleInputChange('tieneTipologiaRelacionada', e.target.checked)
                                }
                                name="tieneTipologiaRelacionada"
                                color="primary"
                            />
                        }
                        label="¿Tiene tipología relacionada?"
                    />
                </Grid>

                {form.tieneTipologiaRelacionada && (
                    <Grid item xs={12} md={6}>
                        {/* Campo condicional: ¿Cual? */}
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            value={form.tipologiaRelacionada}
                            label="¿Cuál?"
                            onChange={(e) => handleInputChange('tipologiaRelacionada', e.target.value)}
                        />
                    </Grid>
                )}

                <Grid item xs={12} md={6}>
                    {/* Campo condicional: Tipología */}
                    {!form.tieneTipologiaRelacionada && (
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            label="Tipología"
                            onChange={(e) => handleInputChange('tipologiaRelacionada', e.target.value)}
                        />
                    )}
                </Grid>

                <Grid item xs={11}>
                    {/* Campo: Asunto */}
                    <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        value={form.asunto}
                        label="Asunto"
                        onChange={(e) => handleInputChange('asunto', e.target.value)}
                    />
                </Grid>

                <Grid item xs={11}>
                    {/* Campo: Descripción */}
                    <TextField
                        fullWidth
                        multiline
                        rows={3} // Ajusta el número de filas para una altura mayor
                        variant="outlined"
                        value={form.descripcion}
                        label="Descripción"
                        onChange={(e) => handleInputChange('descripcion', e.target.value)}
                    />
                </Grid>
                <Grid item xs={11}>
                    {/* Agrega el componente FormKeywords aquí */}
                    <FormKeywords
                        hidden_text={false} // Puedes ajustar este valor según tus necesidades
                        initial_values={[]} // Puedes pasar valores iniciales si es necesario
                        character_separator="," // Puedes ajustar este separador según tus necesidades
                        set_form={null} // Puedes pasar una función para actualizar el estado del formulario si es necesario
                        keywords="keywords" // Puedes ajustar el nombre de los keywords según tus necesidades
                        disabled={false} // Puedes ajustar este valor según tus necesidades
                    />
                </Grid>
            </Grid>





            <DialogActions>
                <Stack direction="row" spacing={2} sx={{ mr: '15px', mb: '10px', mt: '10px' }}>
                    <IconButton color="inherit" onClick={handleClearForm} aria-label="Limpiar formulario">
                        <ClearIcon />
                    </IconButton>
                    <IconButton color="error" onClick={handleCloseModal} aria-label="Cerrar">
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </DialogActions>
        </Dialog>
    </>
    );
};
